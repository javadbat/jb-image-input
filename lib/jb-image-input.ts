import { ValidationHelper, type ValidationItem, type ValidationResult, type WithValidation } from "jb-validation";
import type { JBFormInputStandards } from 'jb-form';
import HTML from "./jb-image-input.html";
import CSS from "./ib-image-input.scss";
import {
  JBImageInputBridge,
  JBImageInputConfig,
  JBImagesImageInputElements,
  ValidationValue,
  ViewStatus,
} from "./types";
import { MouseEvent } from "react";
export * from './types.js';
export class JBImageInputWebComponent<TValue = File> extends HTMLElement implements WithValidation<ValidationValue<TValue>>, JBFormInputStandards<TValue> {
  static get formAssociated() {
    return true;
  }
  //TODO: this component need refactor for ui design to show better loading in download & upload and better effect for succeed upload and Download
  get value() {
    return this.#value;
  }
  set value(value) {
    this.#setValue(value);
  }

  #isAutoValidationDisabled = false;
  get isAutoValidationDisabled(): boolean {
    return this.#isAutoValidationDisabled;
  }
  set isAutoValidationDisabled(value: boolean) {
    this.#isAutoValidationDisabled = value;
  }
  #status: string | null = null;
  #virtualInputFile!: HTMLInputElement;
  #elements!: JBImagesImageInputElements;
  get selectedImageType() {
    return this.#file.type;
  }
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
  #value: TValue | null = null;
  #file: File | null = null;
  #uploadProgressPercent: number | null = null;
  get file() {
    return this.#file;
  }
  imageBase64Value: string | null = null;
  get maxFileSize() {
    return this.#maxFileSize;
  }
  /**
   * @description max file size in bytes
   */
  set maxFileSize(value) {
    if (value == null) {
      this.#maxFileSize = null;
    } else {
      if (!isNaN(value) && typeof value == "number") {
        this.#maxFileSize = value;
      }
    }
  }
  #disabled = false;
  get disabled() {
    return this.#disabled;
  }
  set disabled(value: boolean) {
    this.#disabled = value;
    if (value) {
      //TODO: remove as any when typescript support
      (this.#internals as any).states?.add("disabled");
    } else {
      (this.#internals as any).states?.delete("disabled");
    }
  }
  #required = false;
  set required(value: boolean) {
    this.#required = value;
    this.#validation.checkValidity(false);
  }
  get required() {
    return this.#required;
  }
  #internals?: ElementInternals;
  #validation = new ValidationHelper<ValidationValue<TValue>>(this.showValidationError.bind(this), this.clearValidationError.bind(this), () => ({ file: this.#file, value: this.#value }), () => this.fileName, this.#getInsideValidation.bind(this), this.#setValidationResult.bind(this));
  get validation() {
    return this.#validation;
  }
  get name() {
    return this.getAttribute('name') || '';
  }
  initialValue: TValue | null = null;
  get isDirty(): boolean {
    return this.#value !== this.initialValue;
  }

  constructor() {
    super();
    if (typeof this.attachInternals == "function") {
      //some browser dont support attachInternals
      this.#internals = this.attachInternals();
    }
    this.#initWebComponent();
    this.#initProp();
    this.#registerEventListener();
  }
  get fileName(): string {
    return this.#file.name;
  }
  #initWebComponent() {
    const shadowRoot = this.attachShadow({
      mode: "open",
      delegatesFocus: true
    });
    const html = `<style>${CSS}</style>` + "\n" + HTML;
    const element = document.createElement("template");
    element.innerHTML = html;
    shadowRoot.appendChild(element.content.cloneNode(true));
    this.#elements = {
      webComponent: shadowRoot.querySelector(".jb-image-input-web-component")!,
      placeHolderWrapper: shadowRoot.querySelector(".placeholder-wrapper")!,
      placeHolderTitle: shadowRoot.querySelector(".placeholder-title")!,
      placeHolderMessageBox: shadowRoot.querySelector(".message-box")!,
      image: shadowRoot.querySelector(".image-wrapper img")!,
      overlay: {
        container: shadowRoot.querySelector(".image-overlay")!,
        deleteButton: shadowRoot.querySelector(".image-overlay .delete-button")!,
        downloadButton: shadowRoot.querySelector(".image-overlay .download-button")!
      },
      errorOverlay: {
        container: shadowRoot.querySelector(".error-overlay"),
        message: shadowRoot.querySelector('.error-overlay .error-message')!
      }
    };
  }
  #multiple = false;
  config: JBImageInputConfig = {
    uploadUrl: "",
    downloadUrl: "",
    // developer can add every config he want to get on bridge functions
  };
  bridge: JBImageInputBridge<TValue> = {
    uploader: function (file: File) {
      return new Promise((resolve) => {
        resolve(file as TValue);
      });
    },
    downloader: function (value) {
      return new Promise((resolve, reject) => {
        if(typeof value == "string"){
          fetch(value).then(res=>res.blob()).then((value)=>{
            const reader = new window.FileReader();
            reader.readAsDataURL(value);
            reader.onload = function () {
              const imageDataUrl = reader.result;
              resolve(imageDataUrl as string);
            };
          }).catch(reject);
        }
        if (value instanceof File) {
          JBImageInputWebComponent.ExtractBase64ImageFromFile(value).then((base64: string) => {
            resolve(base64);
          }
          );
        }
        
      });
    },
  };
  #initProp() {
    this.acceptTypes = "image/jpeg,image/jpg,image/png,image/svg+xml";
    this.#setStatus("empty");
    this.#createVirtualInputFile();
  }
  #registerEventListener() {
    this.#elements.placeHolderWrapper.addEventListener("click", this.openImageSelector.bind(this));
    this.#elements.image.addEventListener("click", this.openImageSelector.bind(this));
    this.#elements.overlay.container.addEventListener("click", this.openImageSelector.bind(this));
    this.#elements.overlay.deleteButton.addEventListener("click", this.#onDeleteButtonClicked.bind(this));
    this.#elements.overlay.downloadButton.addEventListener("click", this.#onDownloadButtonClicked.bind(this));
  }
  #createVirtualInputFile() {
    this.#virtualInputFile = document.createElement("input");
    this.#virtualInputFile.type = "file";
    this.#virtualInputFile.accept = this.acceptTypes;
    this.#virtualInputFile.addEventListener("change", (e) =>
      this.#onImageSelected(e)
    );
  }
  /**
   * @public 
   * @description will open image selector
   */
  openImageSelector() {
    this.#virtualInputFile.click();
  }
  static get observedAttributes() {
    return ["required", "label", "multiple", "message"];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    // do something when an attribute has changed
    this.#onAttributeChange(name, newValue);
  }
  #onAttributeChange(name: string, value: string) {
    switch (name) {
      case "required":
        if (value === "" || value == "true") {
          this.required = true;
        } else {
          this.required = false;
        }
        break;
      case "label":
        if (this.#elements.placeHolderTitle) {
          this.#elements.placeHolderTitle.innerHTML = value;
        }
        break;
      case "multiple":
        this.multiple = value === "true";
        break;
      case "message":
        this.#elements.placeHolderMessageBox.innerHTML = value;
        break;
    }
  }
  #dispatchOnImagesSelected(files: FileList) {
    const event = new CustomEvent("imageSelected", {
      detail: {
        files: files,
      },
    });
    this.dispatchEvent(event);
  }
  #onImageSelected(e: Event) {
    const files = (e.target as HTMLInputElement).files;
    if (files && files?.length > 0) {
      //if user select file and not click on cancel
      //when user select a image from his computer but dont want to edit
      this.#dispatchOnImagesSelected(files);
      const file = files[0];
      //reset virtual input value so it can reselect image
      this.#virtualInputFile.value = null;
      this.selectImageByFile(file);
    }
  }
  /**
   * inject file to image uploader like when user select it
   * @public
   * @param {File} file
   */
  selectImageByFile(file: File) {
    const validationRes = this.validation.checkValidity(true, { file, value: null });
    const maxSizeExceed = this.maxFileSize ? file.size > this.maxFileSize : false;
    if (maxSizeExceed) {
      this.#dispatchMaxSizeExceedEvent(file);
    }
    if (validationRes.isAllValid) {
      this.#setImageToSelectedFile(file);
      this.#uploadImage(file);
    }
  }
  #setImageToSelectedFile(file: File) {
    //this function called when user select file and upload type is manual so we show image from local
    this.#file = file;
    this.#dispatchOnChangeEvent();
  }
  #dispatchMaxSizeExceedEvent(file: File) {
    const event = new CustomEvent("maxSizeExceed", { detail: { file }, cancelable: false });
    this.dispatchEvent(event);
  }
  static ExtractBase64ImageFromFile(file: File) {
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
  #uploadImage(file: File) {
    this.#setStatus("uploading");
    const promise = this.bridge.uploader(
      file,
      this.config,
      this.onProgressImageUpload.bind(this)
    );
    promise
      .then((data: TValue) => this.#onSuccessImageUpload(data))
      .catch(() => this.#onErrorImageUpload());
  }
  #onSuccessImageUpload(data: TValue) {
    this.#setStatus("uploaded");
    this.value = data;
    this.#dispatchOnChangeEvent();
  }
  #dispatchOnChangeEvent() {
    const event = new Event("change");
    this.dispatchEvent(event);
  }
  #onErrorImageUpload() {
    // //we reset our virtual input becuase selected image does not upload well
    if (this.value) {
      this.#setStatus("downloaded");
    } else {
      this.#setStatus("empty");
    }
    this.#virtualInputFile.value = "";
  }
  onProgressImageUpload(percent: number) {
    //TODO: add animation for upload
    this.#uploadProgressPercent = percent;
  }
  #onSuccessImageDownload(base64Image: string) {
    this.#setStatus("downloaded");
    this.imageBase64Value = base64Image;
    this.#elements.image.setAttribute("src", base64Image);
  }
  #setStatus(status: ViewStatus) {
    this.#elements.webComponent.setAttribute("status", status);
    this.#status = status;
  }
  showValidationError(message: string) {
    this.#elements.webComponent.classList.add("--has-error");
    if (this.#value) {
      this.#showOverlayError(message);
    } else {
      this.#elements.placeHolderMessageBox.innerHTML = message;
      this.#elements.placeHolderMessageBox.classList.add("error");
    }
  }
  clearValidationError() {
    this.#elements.webComponent.classList.remove("--has-error");
    this.#elements.placeHolderMessageBox.innerHTML = this.getAttribute("message") || "";
    this.#elements.placeHolderMessageBox.classList.remove("error");
  }
  #showOverlayError(message: string) {
    this.#elements.errorOverlay.message.innerHTML = message;
    this.#elements.errorOverlay.container.style.display = "flex";
    setTimeout(() => {
      this.#elements.errorOverlay.message.innerHTML = "";
      this.#elements.errorOverlay.container.style.display = "none";
    }, 2000);
  }
  #getInsideValidation() {
    const ValidationList: ValidationItem<ValidationValue<TValue>>[] = [];
    if (this.required) {
      const message = `تصویر حتما باید انتخاب شود`;
      ValidationList.push({
        validator: ({ file, value }) => {
          return file !== null || value != null;
        },
        message: message,
        stateType: "valueMissing",
      });
    }
    if (this.#maxFileSize) {
      ValidationList.push({
        validator: ({ file }) => {
          if (file == null) {
            return true;
          }
          return file.size <= this.#maxFileSize;
        },
        //TODO: convert max size to mb or kb and show it in message
        message: "حجم فایل بیشتر از حد مجاز است",
        stateType: "rangeOverflow",
      });
    }
    return ValidationList;
  }
  /**
 * @public
 * @description this method used to check for validity but doesn't show error to user and just return the result
 * this method used by #internal of component
 */
  checkValidity(): boolean {
    const validationResult = this.#validation.checkValidity(false);
    if (!validationResult.isAllValid) {
      const event = new CustomEvent('invalid');
      this.dispatchEvent(event);
    }
    return validationResult.isAllValid;
  }
  /**
  * @public
 * @description this method used to check for validity and show error to user
 */
  reportValidity(): boolean {
    const validationResult = this.#validation.checkValidity(true);
    if (!validationResult.isAllValid) {
      const event = new CustomEvent('invalid');
      this.dispatchEvent(event);
    }
    return validationResult.isAllValid;
  }
  /**
   * @description this method called on every checkValidity calls and update validation result of #internal
   */
  #setValidationResult(result: ValidationResult<ValidationValue<TValue>>) {
    if (result.isAllValid) {
      this.#internals.setValidity({}, '');
    } else {
      const states: ValidityStateFlags = {};
      let message = "";
      result.validationList.forEach((res) => {
        if (!res.isValid) {
          if (res.validation.stateType) { states[res.validation.stateType] = true; }
          if (message == '') { message = res.message; }
        }
      });
      this.#internals.setValidity(states, message);
    }
  }
  get validationMessage() {
    return this.#internals.validationMessage;
  }
  #onDeleteButtonClicked(e: MouseEvent) {
    e.stopPropagation();
    this.#setValue(null);
    this.#dispatchOnChangeEvent();
  }
  #onDownloadButtonClicked(e: MouseEvent) {
    e.stopPropagation();
    const base64String = this.#elements.image.getAttribute('src');
    const imageType = base64String.match(/[^:/]\w+(?=;|,)/)[0];
    const a = document.createElement("a");
    a.href = base64String;
    a.download = "Image." + imageType;
    a.click();
  }
  #setValue(value: TValue) {
    this.#value = value;
    if (value != null) {
      if (value instanceof File) {
        this.#file = value;
        JBImageInputWebComponent.ExtractBase64ImageFromFile(value).then(
          this.#onSuccessImageDownload.bind(this)
        );
      } else {
        this.bridge
          .downloader(value, this.config)
          .then(this.#onSuccessImageDownload.bind(this));
      }
    } else {
      this.#file = null;
      this.#setStatus("empty");
    }
  }
}
const myElementNotExists = !customElements.get("jb-image-input");
if (myElementNotExists) {
  window.customElements.define("jb-image-input", JBImageInputWebComponent);
}
