# jb-image-input

image input web component let user upload image and see what is uploaded

- ability multiple image upload

- can connect to your custom REST service bridge (you can have your own way of uploading image)

- show loading

- can be used in both instant upload or keep image and upload image on form submit

- customizable format

sample: <https://codepen.io/javadbat/pen/XWpoEYY>

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

### image accept type

tell webcomponent what image mimetype are acceptable

```js
 document.querySelectorAll('jb-image-input').acceptTypes = "image/jpeg,image/jpg,image/png,image/svg+xml"

```
### set bridge for upload and download image

`jb-image-input` do not upload and download image automatically. it just handle ui states.
you must provide 2 function `uploader` and `downloader` to component like this:

```javascript
document.querySelectorAll('jb-image-input').bridge = {
            uploader: function (file,config,uploadProgressCallbackFunction) { /*put your functionality here*/},
            downloader: function (value, config) { /*put your functionality here*/}
        };
```

you can create a class and pass class instance or create a simple object and pass it to component, depend on your need.
both uploader and downloader must return `Promise` and resolve it on task completed

| argumant variable name              | description                                                                                   |
| -------------                       | -------------                                                                                 |
| file                                | the file that user select from his computer                                                   |
| config                              | the config developer provided to component. most of the times projects has a one bridge instance for many image input so in this case you build only one bridge and pass it to all of your components and pass parameter like `url`, `method` , `fieldName`, ... in config so your bridge can decide how to upload and download app |
| uploadProgressCallbackFunction      | its a optional parameter you can use to tell component how much file uploaded currently                                     |
| value                               | value is a data that your uploader promise resolved for example if your uploader is: `uploader:()=>{upload().then(()=>{resolve({fileName:'img.jpg',path:'x.com/img.jpg',id:'10'})})}` then your value wil be `{fileName:'img.jpg',path:'x.com/img.jpg',id:'10'}`|

### set config

config is not something that our component use, it just the config you need in your bridge so you can set it however you want base on your need. we just keep it in component and send it to your uploader and downloader function so you can structure it your self. we just make a defualt structure as following object

```javascript
this.config = {
            uploadUrl: '',
            downloadUrl: '',
            // developer can add every config he want's to get on bridge functions
        };
```

