import HTML from './JBImageInput.html';
import CSS from './JBImageInput.scss';

class JBImageInputWebComponent extends HTMLElement {
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
        if (value != null) {
            if(this.uploadType == "AUTO"){
                this.bridge.downloader(value, this.config).then(this.onSuccessImageDownload.bind(this));
            }else{
                this.Extractbase64ImageFromFile(value).then(this.onSuccessImageDownload.bind(this));
            }
           
        }
    }
    get status() {
        //it is read only variable
        return this._status;
    }
    constructor() {
        super();
        this.initWebComponent();
        this.initProp();
        this.registerEventListener();
    }
    initWebComponent() {
        this._shadowRoot = this.attachShadow({
            mode: 'open'
        });
        this._html = `<style>${CSS}</style>` + '\n' + HTML
        this._element = document.createElement('template');
        this._element.innerHTML = this._html;
        this._shadowRoot.appendChild(this._element.content.cloneNode(true));
        this._webComponentElement = this._shadowRoot.querySelector('.jb-image-input-web-component');
        this._placeholderWrapperElement = this._shadowRoot.querySelector('.placeholder-wrapper');
    }
    initProp() {
        this.acceptTypes = "image/jpeg,image/jpg,image/png,image/svg+xml";
        this.setStatus("empty");
        this.createVirtualInputFile();
        this._value = null;
        this.imageBase64Value = null;
        this.uploadType = "AUTO";
        this.config = {
            uploadUrl: '',
            downloadUrl: '',
            // developer can add every config he want to get on bridge functions
        }
        this.bridge = {
            uploader: function () { console.error('you must set uploader function by bridge to component for upload functionality') },
            downloader: function () { console.error('you must set downloader function by bridge to component for download functionality') }
        }
        this.required = false;
    }
    registerEventListener() {
        this._placeholderWrapperElement.addEventListener('click', this.openImageSelector.bind(this));
        this._shadowRoot.querySelector('.image-wrapper img').addEventListener('click', this.openImageSelector.bind(this));
    }
    createVirtualInputFile() {
        this._virtualInputFile = document.createElement('input');
        this._virtualInputFile.type = "file";
        this._virtualInputFile.accept = this.acceptTypes;
        this._virtualInputFile.addEventListener('change', (e) => this.onImageSelected(e));
    }
    openImageSelector() {
        this._virtualInputFile.click();
    }
    static get observedAttributes() {
        return ['required', 'placeholder-title', 'upload-type'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        // do something when an attribute has changed
        this.onAttributeChange(name, newValue);
    }
    onAttributeChange(name, value) {
        switch (name) {
            case 'required':
                if (value === "" || value == "true" || value == true) {
                    this.required = true;
                } else {
                    this.required = false;
                }
                break;
            case 'placeholder-title':
                this.shadowRoot.querySelector('.placeholder-title').innerHTML = value;
                break;
            case 'upload-type':
                if (value == 'AUTO' || value == "MANUAL") {
                    this.uploadType = value;
                } else {
                    console.error('please set valid upload-type for jb-image-input');
                }

                break;
        }
    }
    onImageSelected(e) {
        if (e.target.files.length > 0) {
            //if user select file and not click on cancel
            //when user select a image from his computer but dont want to edit
            let file = e.target.files[0];
            if(this.uploadType == "MANUAL"){
                this.setImageToSelectedFile(file);
            }
            if(this.uploadType == "AUTO"){
                this.uploadImage(file);
            }
            
            this.selectedImageType = e.target.files[0].type;
        }
    }
    setImageToSelectedFile(file){
        //this function called when user select file and upload type is manual so we show image from local
        this.value = file;
        this.triggerOnChangeEvent();
       
    }
    Extractbase64ImageFromFile(file){
        return new Promise ((resolved, rejected)=>{
            var reader = new FileReader();
            reader.onload = e => {
                const mainImageSource =  e.target.result;
                resolved(mainImageSource);
            };
            reader.readAsDataURL(file);
        });
    }
    uploadImage(file) {
        this.setStatus("uploading");
        const promise = this.bridge.uploader(file, this.config, this.onProgressImageUpload.bind(this));
        promise.then((data) => this.onSuccessImageUpload(data)).catch((e) => this.onErrorImageUpload(e));
    }
    onSuccessImageUpload(data) {
        this.setStatus("uploaded");
        this.value = data;
        this.triggerOnChangeEvent();
    }
    triggerOnChangeEvent(){
        const event = new CustomEvent('change');
        this.dispatchEvent(event);
    }
    onErrorImageUpload(e) {
        // //we reset our virtual input becuase selected image does not upload well
        if (this.value) {
            this.setStatus('downloaded');
        } else {
            this.setStatus('empty')
        }
        this._virtualInputFile.value = '';
    }
    onProgressImageUpload(e) {
        //TODO: add animation for upload
        // this.progressPercent = e;
        // if(this.props.onProgress){
        //     this.props.onProgress(e);
        // }
    }
    onSuccessImageDownload(base64Image) {
        this.setStatus('downloaded');
        this.imageBase64Value = base64Image;
        this._shadowRoot.querySelector('.image-wrapper img').setAttribute('src', base64Image);
    }
    setStatus(status) {
        this._webComponentElement.setAttribute('status', status)
        this._status = status;
    }
    triggerInputValidation(showError = true) {
        // this method is public and used outside of component to check if field validity param are met

        let errorType = '';
        let requiredValid = true;
        if (this.required) {

            requiredValid = this.value != null;
            if (!requiredValid) {
                errorType = 'REQUIRED';
            }
        }
        let isAllValid = requiredValid; //& other validation if they added
        if (isAllValid) {
            this.clearValidationError();
        } else if (showError) {
            this.showValidationError(errorType);
        }
        return {
            isAllValid
        };
    }
    showValidationError(errorType) {
        if (errorType == 'REQUIRED') {
            this._webComponentElement.classList.add('--has-error')
        }
    }
    clearValidationError(errorType) {
        this._webComponentElement.classList.remove('--has-error')
    }
}

window.customElements.define('jb-image-input', JBImageInputWebComponent);