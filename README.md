# jb-image-input

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jb-image-input)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/javadbat/jb-image-input/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/jb-image-input)](https://www.npmjs.com/package/jb-image-input)
![GitHub Created At](https://img.shields.io/github/created-at/javadbat/jb-image-input)

Image input web component that lets the user select an image, preview it, validate it, and connect selection to a custom upload/download bridge.

- Supports custom upload and download bridge functions.
- Shows empty, uploading, uploaded, and downloaded UI states.
- Can be used for instant upload or as a form-associated file picker that keeps the selected image until submit.
- Supports custom placeholder and overlay slots.
- Supports required and max file size validation through `jb-validation`.

## When to use

Use `jb-image-input` when the user must select an image and see an image preview inside the JB Design System UI.

Use [`jb-file-input`](https://github.com/javadbat/jb-file-input) for non-image files or when previewing the selected file as an image is not required.

## Demo

- [Storybook](https://javadbat.github.io/design-system/?path=/docs/components-form-elements-jbimageinput)
- [CodePen](https://codepen.io/javadbat/pen/XWpoEYY)

## Using With JS Frameworks

<a href="https://github.com/javadbat/jb-image-input/tree/main/react" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/React.js-jb--image--input%2Freact-000.svg?logo=react&logoColor=%2361DAFB" height="30" /></a>

Other integrations: <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#angular" target="_blank" rel="noopener noreferrer">Angular</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#vue" target="_blank" rel="noopener noreferrer">Vue</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#nuxt" target="_blank" rel="noopener noreferrer">Nuxt</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#svelte" target="_blank" rel="noopener noreferrer">Svelte</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#sveltekit" target="_blank" rel="noopener noreferrer">SvelteKit</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#solidjs" target="_blank" rel="noopener noreferrer">SolidJS</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#lit" target="_blank" rel="noopener noreferrer">Lit</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#nextjs" target="_blank" rel="noopener noreferrer">Next.js</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#astro" target="_blank" rel="noopener noreferrer">Astro</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#blazor" target="_blank" rel="noopener noreferrer">Blazor</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#server-rendered-templates" target="_blank" rel="noopener noreferrer">Server-rendered templates</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#wordpress" target="_blank" rel="noopener noreferrer">WordPress</a> · <a href="https://javadbat.github.io/design-system/?path=/docs/getting-started-framework-integration--docs#alpinejs-and-htmx" target="_blank" rel="noopener noreferrer">Alpine.js and HTMX</a>

## Installation

```sh
npm i jb-image-input
```

```js
import 'jb-image-input';
```

```html
<jb-image-input label="Profile image"></jb-image-input>
```

## API reference

### Attributes

| name | type | default | description |
| --- | --- | --- | --- |
| `name` | `string` | `""` | Form field name returned by the `name` property. |
| `label` | `string` | localized text | Placeholder title text and accessible aria label. |
| `message` | `string` | `""` | Helper text shown in the placeholder message area and exposed as aria description. |
| `required` | `boolean \| string` | `false` | Enables required validation. A string value is used as the required error message. See [required validation](#required-validation). |
| `multiple` | `boolean` | `false` | Lets the hidden native file input accept multiple files. The component still previews/uploads the first file. See [multi image selector](#multi-image-selector). |
| `disabled` | `boolean` | `false` | Disables file selection and overlay actions. |

### Properties

| name | type | readonly | description |
| --- | --- | --- | --- |
| `value` | `TValue \| null` | no | Canonical value and form value. When `bridge.uploader` resolves, `value` becomes the resolved upload result. Use `File`, `string`, `FormData`, or `null` when this value must be submitted by a native form. Setting a `File` previews that file; setting another value calls `bridge.downloader` to resolve a preview image. |
| `file` | `File \| null` | yes | Currently selected local file. |
| `imageBase64Value` | `string \| null` | no | Preview image data URL after the selected file is read or `bridge.downloader` resolves. |
| `acceptTypes` | `string` | no | Comma-separated MIME types assigned to the hidden native file input `accept` property. |
| `maxFileSize` | `number \| null` | no | Maximum accepted file size in bytes. See [max file size](#max-file-size). |
| `bridge` | `JBImageInputBridge<TValue>` | no | Upload/download bridge. See [upload and download bridge](#upload-and-download-bridge). |
| `config` | `JBImageInputConfig` | no | Developer-defined object passed to bridge functions. |
| `multiple` | `boolean` | no | Controls the hidden native file input `multiple` attribute. |
| `required` | `boolean` | no | Enables required validation. |
| `disabled` | `boolean` | no | Disables file selection and overlay actions, and sets disabled accessibility/custom state. |
| `status` | `'empty' \| 'uploading' \| 'uploaded' \| 'downloaded' \| null` | yes | Current visual state. |
| `form` | `HTMLFormElement \| null` | yes | Associated form from `ElementInternals`. |
| `selectedImageType` | `string \| undefined` | yes | MIME type of the selected file, or `undefined` before a file is selected. |
| `validation` | `ValidationHelper<ValidationValue<TValue>>` | yes | Validation helper from `jb-validation`; set `validation.list` for custom rules. |
| `validationMessage` | `string` | yes | Current native validation message from `ElementInternals`. |
| `initialValue` | `TValue \| null` | no | Baseline value used by `isDirty`. |
| `isDirty` | `boolean` | yes | `true` when current `value` differs from `initialValue`. |

### Methods

| name | returns | description |
| --- | --- | --- |
| `openImageSelector()` | `void` | Opens the hidden native file picker unless the component is disabled. |
| `selectImageByFile(file)` | `Promise<void>` | Injects a `File` as if the user selected it, validates it, previews it, and starts `bridge.uploader` when valid. |
| `checkValidity()` | `boolean` | Runs validation without showing the error message. Dispatches `invalid` when invalid. |
| `reportValidity()` | `boolean` | Runs validation and shows the first error message. Dispatches `invalid` when invalid. |
| `JBImageInputWebComponent.ExtractBase64ImageFromFile(file)` | `Promise<string>` | Static helper that reads a `File` and resolves its data URL. |

### Events

| event | detail | description |
| --- | --- | --- |
| `change` | none | Fired when a file is selected, upload resolves, or the selected image is deleted. |
| `imageSelected` | `{ files: FileList }` | Fired after the hidden native file input changes. Use this for multi-image flows. |
| `maxSizeExceed` | `{ file: File }` | Fired when the selected file is larger than `maxFileSize`. |
| `invalid` | none | Fired when `checkValidity()` or `reportValidity()` finds an invalid value. |

## Value, file, and preview

`file` is the selected local `File`.

`value` is the value your app stores and the value passed to `ElementInternals.setFormValue()`. By default the uploader resolves the selected `File`, so `value` is also the `File`. If you provide a custom `bridge.uploader`, `value` becomes whatever that promise resolves.

For native form submission, keep the resolved value compatible with `setFormValue`: `File`, `string`, `FormData`, or `null`. If your API returns an object, store a string id/URL for form submission or serialize the object before assigning it as `value`.

When you set `value` programmatically:

- If `value` is a `File`, the component reads it and shows a preview.
- If `value` is not a `File`, the component calls `bridge.downloader(value, config)` and expects a preview image data URL.

## Upload and download bridge

`jb-image-input` does not own your API request. It handles UI state and calls your bridge.

```js
const imageInput = document.querySelector('jb-image-input');

imageInput.bridge = {
  uploader(file, config, onProgressCallback) {
    const body = new FormData();
    body.append('file', file);

    return fetch(config.uploadUrl, {
      method: 'POST',
      body,
    }).then((response) => response.text());
  },
  downloader(value, config) {
    return fetch(value.url)
      .then((response) => response.blob())
      .then((blob) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }));
  },
};

imageInput.config = {
  uploadUrl: '/api/images',
};
```

| bridge argument | description |
| --- | --- |
| `file` | The `File` selected by the user. |
| `config` | Developer-defined config object stored on the component and passed to the bridge. |
| `onProgressCallback` | Optional callback for upload progress. |
| `value` | Current component value passed to `downloader`; commonly an id or URL. |

## Validation

`jb-image-input` uses [`jb-validation`](https://github.com/javadbat/jb-validation). Built-in validation covers `required` and `maxFileSize`; custom validations can be added with `validation.list`.

```js
const imageInput = document.querySelector('jb-image-input');

imageInput.validation.list = [
  {
    validator: ({ file }) => !file || file.size < 500 * 1024,
    message: 'Image must be smaller than 500KB',
  },
];

const isValid = imageInput.reportValidity();
```

### Required validation

```html
<jb-image-input required></jb-image-input>
<jb-image-input required="Please select an image"></jb-image-input>
```

### Max file size

Set `maxFileSize` in bytes:

```js
const imageInput = document.querySelector('jb-image-input');
imageInput.maxFileSize = 2 * 1024 * 1024;

imageInput.addEventListener('maxSizeExceed', (event) => {
  alert(`Selected image is ${event.detail.file.size} bytes`);
});
```

## Multi image selector

`jb-image-input` previews and uploads one image. To build a multi-image UI, set `multiple`, listen to `imageSelected`, render one component per extra file, and call `selectImageByFile(file)` on each new component.

```html
<jb-image-input multiple="true"></jb-image-input>
```

```js
const imageInputs = document.querySelector('#image-inputs');
const firstInput = imageInputs.querySelector('jb-image-input');

firstInput.addEventListener('imageSelected', (event) => {
  const [, ...extraFiles] = Array.from(event.detail.files);

  extraFiles.forEach((file) => {
    const input = document.createElement('jb-image-input');
    imageInputs.appendChild(input);
    input.selectImageByFile(file);
  });
});
```

## Image accept type

```js
document.querySelector('jb-image-input').acceptTypes = 'image/jpeg,image/jpg,image/png,image/svg+xml';
```

## Slots

| slot | description |
| --- | --- |
| `placeholder` | Custom content shown while the component status is `empty`. |
| `overlay` | Replaces the full image overlay shown over the preview image. |
| `overlay-content` | Replaces the default overlay controls while keeping the default overlay container. |

```html
<jb-image-input label="Profile image">
  <div slot="placeholder">
    Select profile image
  </div>
</jb-image-input>
```

## CSS parts and states

| part | description |
| --- | --- |
| `message` | Helper or validation message inside the default placeholder. |

| custom state | description |
| --- | --- |
| `disabled` | Applied when `disabled` is true. |

```css
jb-image-input::part(message) {
  font-weight: 600;
}

jb-image-input:state(disabled) {
  opacity: 0.5;
}
```

## Custom style

Set CSS variables in the parent scope of the component.

For complete styling guidance, live examples, official parts and states, and the full CSS variable reference, see [Styling](https://javadbat.github.io/design-system/?path=/docs/components-form-elements-jbimageinput-styling).

```css
jb-image-input.avatar-input {
  --jb-image-input-width: 10rem;
  --jb-image-input-height: 10rem;
  --jb-image-input-border-radius: 50%;
}
```

## Accessibility notes

- The shadow root uses `delegatesFocus`.
- The component is form-associated and passes `value` to `ElementInternals.setFormValue()`.
- `label` is exposed as the component aria label and default placeholder title.
- `message` is exposed as the component aria description.
- Validation state is synchronized with `ElementInternals` where the browser supports it.

## Related Docs

- See [`jb-image-input/react`](https://github.com/javadbat/jb-image-input/tree/main/react) if you want to use this component in React.
- See [All JB Design System Component List](https://javadbat.github.io/design-system/) for more components.
- Use [Contribution Guide](https://github.com/javadbat/design-system/blob/main/docs/contribution-guide.md) if you want to contribute to this component.

## AI agent notes

- Import `jb-image-input` once before using `<jb-image-input>`.
- Use `value` for the stored/submitted image value and `file` for the selected local `File`.
- Provide `bridge.uploader` and `bridge.downloader` when the stored `value` is not a `File`.
- Keep submitted values compatible with `ElementInternals.setFormValue()`: `File`, `string`, `FormData`, or `null`.
- Use `imageSelected` when implementing multi-image selection; the component itself previews/uploads the first selected file.
- Use `acceptTypes`, `maxFileSize`, `validation.list`, and `required` instead of custom file filtering logic when possible.
- This package includes [`custom-elements.json`](./custom-elements.json) and points to it with the package.json `customElements` field. The field is documented by the Custom Elements Manifest project in [Referencing manifests from npm packages](https://github.com/webcomponents/custom-elements-manifest#referencing-manifests-from-npm-packages).
- In `custom-elements.json`, `exports.kind: "js"` describes the JavaScript/TypeScript class export and `exports.kind: "custom-element-definition"` maps the `jb-image-input` tag name to that class.
