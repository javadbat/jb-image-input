you can access current image input status by `element.status`

### check validation
you can check is image input value meet your validation standad by `dom.triggerInputValidation(showError)`
the `showError` parameter is optional and its defualt is true but you cant set it false so if value is invalid component dont react and show error to user and just return validation object