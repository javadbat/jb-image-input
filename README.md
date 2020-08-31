# jb-image-input
## instruction
### usage
```cmd
npm i jb-image-input
```
```html
<jb-image-input></jb-image-input>
```
### current status
you can access current image input status by `element.status`

### check validation

you can check is image input value meet your validation standad by `dom.triggerInputValidation(showError)`
the `showError` parameter is optional and its defualt is true but you cant set it false so if value is invalid component dont react and show error to user and just return validation object

### multi image selector

by defualt jb-image-input dont support multi image upload but in set of hack you can implement a system that user can select and upload multiple image
we have 4 step to help you implement multi image input

1- set `multiple` attribute to dom to let user select multiple image

```html
<jb-image-input multiple="true">
```
2- `imageSelected` event is fired on user select image and in `event.detail.files`you can get all files that user selected
3- create new `<jb-image-input>` dom by js with `document.createElement('jb-image-input')`
4- inject the files you get in step 2 into your component by a `selectImageByFile` function
```js
document.querySelector('jb-image-input').addEventListener('imageSelected',function(e){
    const files = e.detail.files;
    if (files.length > 1) {
            for (let i = 1; i < files.length; i++) {
                document.querySelectorAll('jb-image-input')[i].selectImageByFile(files[i])
            }
            this.addImageInput();
        }
    
});

```
remember first file is uploaded by orginal image input and you dont need to inject it to another input and thats why we start from index 1