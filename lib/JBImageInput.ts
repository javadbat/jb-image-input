import HTML from "./JBImageInput.html";
import CSS from "./JBImageInput.scss";
import {
  JBImageInputBridge,
  JBImageInputConfig,
  JBImageInputValidationErrorTypes,
  JBImagesImageInputElements,
} from "./Types";
export class JBImageInputWebComponent extends HTMLElement {
  get value() {
    return this.#value;
  }
  set value(value) {
    this.#value = value;
    if (value != null) {
      if (this.uploadType == "AUTO") {
        this.bridge
          .downloader(value, this.config)
          .then(this.onSuccessImageDownload.bind(this));
      } else {
        this.Extractbase64ImageFromFile(value).then(
          this.onSuccessImageDownload.bind(this)
        );
      }
    }
  }
  #status: string | null = null;
  #virtualInputFile!: HTMLInputElement;
  #elements!: JBImagesImageInputElements;
  selectedImageType: null | string = null;
  get status() {
    //it is read only variable
    return this.#status;
  }
  get multiple() {
    return this.#multiple;
  }
  set multiple(value) {
    this.#multiple = value;
    if (this.#multiple) {
      this.#virtualInputFile.setAttribute("multiple", "multiple");
    } else {
      this.#virtualInputFile.removeAttribute("multiple");
    }
  }
  #acceptType = "image/jpeg,image/jpg,image/png,image/svg+xml";
  get acceptTypes() {
    return this.#acceptType;
  }
  set acceptTypes(value) {
    this.#acceptType = value;
    if (this.#virtualInputFile) {
      this.#virtualInputFile.accept = value;
    }
  }
  #maxFileSize: number | null = null;
  #value: any = null;
  imageBase64Value: string | null = null;
  get maxFileSize() {
    return this.#maxFileSize;
  }
  set maxFileSize(value) {
    if (value == null) {
      this.#maxFileSize = null;
    } else {
      if (!isNaN(value) && typeof value == "number") {
        this.#maxFileSize = value;
      }
    }
  }
  constructor() {
    super();
    this.initWebComponent();
    this.initProp();
    this.registerEventListener();
  }
  initWebComponent() {
    const shadowRoot = this.attachShadow({
      mode: "open",
    });
    const html = `<style>${CSS}</style>` + "\n" + HTML;
    const element = document.createElement("template");
    element.innerHTML = html;
    shadowRoot.appendChild(element.content.cloneNode(true));
    this.#elements = {
      webComponent: shadowRoot.querySelector(".jb-image-input-web-component")!,
      placeHolderWrapper: shadowRoot.querySelector(".placeholder-wrapper")!,
      placeHolderTitle: shadowRoot.querySelector(".placeholder-title")!,
      image: shadowRoot.querySelector(".image-wrapper img")!,
    };
  }
  uploadType = "AUTO";
  #multiple = false;
  config: JBImageInputConfig = {
    uploadUrl: "",
    downloadUrl: "",
    // developer can add every config he want to get on bridge functions
  };
  bridge: JBImageInputBridge = {
    uploader: function () {
      console.error(
        "you must set uploader function by bridge to component for upload functionality"
      );
      return Promise.reject();
    },
    downloader: function () {
      console.error(
        "you must set downloader function by bridge to component for download functionality"
      );
      return Promise.reject();
    },
  };
  required = false;
  initProp() {
    this.acceptTypes = "image/jpeg,image/jpg,image/png,image/svg+xml";
    this.setStatus("empty");
    this.createVirtualInputFile();
  }
  registerEventListener() {
    this.#elements.placeHolderWrapper.addEventListener(
      "click",
      this.openImageSelector.bind(this)
    );
    this.#elements.image.addEventListener(
      "click",
      this.openImageSelector.bind(this)
    );
  }
  createVirtualInputFile() {
    this.#virtualInputFile = document.createElement("input");
    this.#virtualInputFile.type = "file";
    this.#virtualInputFile.accept = this.acceptTypes;
    this.#virtualInputFile.addEventListener("change", (e) =>
      this.onImageSelected(e)
    );
  }
  openImageSelector() {
    this.#virtualInputFile.click();
  }
  static get observedAttributes() {
    return ["required", "placeholder-title", "upload-type", "multiple"];
  }
  attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    // do something when an attribute has changed
    this.onAttributeChange(name, newValue);
  }
  onAttributeChange(name:string, value:string) {
    switch (name) {
      case "required":
        if (value === "" || value == "true") {
          this.required = true;
        } else {
          this.required = false;
        }
        break;
      case "placeholder-title":
        if (this.#elements.placeHolderTitle) {
          this.#elements.placeHolderTitle.innerHTML = value;
        }
        break;
      case "upload-type":
        if (value == "AUTO" || value == "MANUAL") {
          this.uploadType = value;
        } else {
          console.error("please set valid upload-type for jb-image-input");
        }
        break;
      case "multiple":
        this.multiple = value === "true";
        break;
    }
  }
  callOnImageSelected(files:FileList) {
    const event = new CustomEvent("imageSelected", {
      detail: {
        files: files,
      },
    });
    this.dispatchEvent(event);
  }
  onImageSelected(e:Event) {
    const files = (e.target as HTMLInputElement).files;
    if (files && files?.length > 0) {
      //if user select file and not click on cancel
      //when user select a image from his computer but dont want to edit
      this.callOnImageSelected(files);
      const file = files[0];
      this.selectImageByFile(file);
    }
  }
  /**
   * inject file to image uploader like when user select it
   * @public
   * @param {File} file
   */
  selectImageByFile(file:File) {
    //this function is public too and can be used outside of component so external resource can inject file in component to upload and show
    if (this.maxFileSize && file.size > this.maxFileSize) {
      this.dispatchMaxSizeExceedEvent(file);
    } else {
      if (this.uploadType == "MANUAL") {
        this.setImageToSelectedFile(file);
      }
      if (this.uploadType == "AUTO") {
        this.uploadImage(file);
      }

      this.selectedImageType = file.type;
    }
  }
  setImageToSelectedFile(file:File) {
    //this function called when user select file and upload type is manual so we show image from local
    this.value = file;
    this.triggerOnChangeEvent();
  }
  dispatchMaxSizeExceedEvent(file:File) {
    const event = new CustomEvent("maxSizeExceed", { detail: { file } });
    this.dispatchEvent(event);
  }
  Extractbase64ImageFromFile(file:File) {
    return new Promise((resolved, rejected) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const mainImageSource = e.target?.result;
        if (mainImageSource) {
          resolved(mainImageSource);
        } else {
          rejected(e);
        }
      };
      reader.readAsDataURL(file);
    });
  }
  uploadImage(file:File) {
    this.setStatus("uploading");
    const promise = this.bridge.uploader(
      file,
      this.config,
      this.onProgressImageUpload.bind(this)
    );
    promise
      .then((data:any) => this.onSuccessImageUpload(data))
      .catch(() => this.onErrorImageUpload());
  }
  onSuccessImageUpload(data:any) {
    this.setStatus("uploaded");
    this.value = data;
    this.triggerOnChangeEvent();
  }
  triggerOnChangeEvent() {
    const event = new CustomEvent("change");
    this.dispatchEvent(event);
  }
  onErrorImageUpload() {
    // //we reset our virtual input becuase selected image does not upload well
    if (this.value) {
      this.setStatus("downloaded");
    } else {
      this.setStatus("empty");
    }
    this.#virtualInputFile.value = "";
  }
  onProgressImageUpload() {
    //TODO: add animation for upload
    // this.progressPercent = e;
    // if(this.props.onProgress){
    //     this.props.onProgress(e);
    // }
  }
  onSuccessImageDownload(base64Image:string) {
    this.setStatus("downloaded");
    this.imageBase64Value = base64Image;
    this.#elements.image.setAttribute("src", base64Image);
  }
  setStatus(status:string) {
    this.#elements.webComponent.setAttribute("status", status);
    this.#status = status;
  }
  /**
   *
   * @param {boolean} showError will show error in component ui. false value will just return result and not show eeror to user
   * @return {Object}
   */
  triggerInputValidation(showError = true) {
    // this method is public and used outside of component to check if field validity param are met

    let errorType: JBImageInputValidationErrorTypes = "";
    let requiredValid = true;
    if (this.required) {
      requiredValid = this.value != null;
      if (!requiredValid) {
        errorType = "REQUIRED";
      }
    }
    const isAllValid = requiredValid; //& other validation if they added
    if (isAllValid) {
      this.clearValidationError();
    } else if (showError) {
      this.showValidationError(errorType);
    }
    return {
      isAllValid,
    };
  }
  showValidationError(errorType: JBImageInputValidationErrorTypes) {
    if (errorType == "REQUIRED") {
      this.#elements.webComponent.classList.add("--has-error");
    }
  }
  clearValidationError() {
    this.#elements.webComponent.classList.remove("--has-error");
  }
}
const myElementNotExists = !customElements.get("jb-image-input");
if (myElementNotExists) {
  window.customElements.define("jb-image-input", JBImageInputWebComponent);
}
