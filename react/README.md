# jb-image-input React Component

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jb-image-input)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/javadbat/jb-image-input/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/jb-image-input-react)](https://www.npmjs.com/package/jb-image-input-react)
![GitHub Created At](https://img.shields.io/github/created-at/javadbat/jb-image-input)

React wrapper for `jb-image-input`. It registers the underlying web component and exposes React props/events for image selection, preview, validation, and externally managed upload flows.

## Demo

- [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--overview)
- [Bridge and value demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--bridge-and-value)
- [CodeSandbox preview](https://3f63dj.csb.app/samples/jb-image-input)
- [CodeSandbox editor](https://codesandbox.io/p/sandbox/jb-design-system-3f63dj?file=%2Fsrc%2Fsamples%2FJBImageInput.tsx)

## Installation

```sh
npm i jb-image-input
```

```jsx
import { JBImageInput } from 'jb-image-input/react';

<JBImageInput label="Profile image" />;
```

## When to use

Use `JBImageInput` when a React view needs the JB Design System image picker, image preview, and validation UI. Start with the [normal React usage demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--normal).

Use `jb-file-input` for non-image files.

## Props

| prop | type | description |
| --- | --- | --- |
| `value` | `TValue` | Stored and submitted component value. If it is not a `File`, `downloader` handles the preview or a string URL is loaded automatically. Use `File`, `string`, `FormData`, or `null` when this value must be submitted by a native form. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--bridge-and-value) |
| `file` | `File` | Injects a selected file by calling `selectImageByFile(file)`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--initial-value) |
| `downloader` | `JBImageInputDownloader<TValue>` | Optional function that converts a stored value to a preview image. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--bridge-and-value) |
| `config` | `JBImageInputConfig` | Developer-defined object passed to `downloader`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--bridge-and-value) |
| `accept` | `string` | Native file accept string forwarded to the hidden file input. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--multiple-selection) |
| `maxFileSize` | `number` | Maximum accepted file size in bytes. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--max-file-size) |
| `validationList` | `ValidationItem<ValidationValue<TValue>>[]` | Custom validation rules from `jb-validation`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--required-with-message) |
| `multiple` | `boolean` | Lets the hidden file input accept multiple files. The component still previews/uploads the first file. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--multiple-selection) |
| `name` | `string` | Sets the `name` attribute. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--normal) |
| `label` | `string` | Placeholder title and accessible aria label. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--normal) |
| `message` | `string` | Helper text shown in the placeholder message area. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--normal) |
| `required` | `boolean \| string` | Enables required validation. A string value is used as the required error message. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--required-with-message) |
| `uploadType` | `string` | Forwarded as `upload-type`; kept for compatibility. Uploading is managed by the application. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--bridge-and-value) |
| `isUploading` | `boolean` | Shows externally managed upload loading state. |
| `uploadPercent` | `number \| null` | Sets the externally managed upload progress percentage. |

## Events

| prop | event | description |
| --- | --- | --- |
| `onChange` | `change` | Fired when a file is selected or the selected image is deleted. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--bridge-and-value) |
| `onImageSelected` | `image-selected` | Fired with `event.detail.files` after the native file input changes. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--multiple-selection) |
| `onMaxSizeExceed` | `max-size-exceed` | Fired with `event.detail.file` when a selected file is larger than `maxFileSize`. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--max-file-size) |
| `onDownloadStart` | `download-start` | Fired before a stored value is converted into a preview; call `preventDefault()` to handle preview loading yourself. |
| `onLoad` | `load` | Wired by the wrapper for compatibility with lazy-loaded custom elements. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--normal) |
| `onInit` | `init` | Wired by the wrapper for compatibility with lazy-loaded custom elements. [Demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--normal) |

## Value and downloader

`value` is the value your app stores and submits through the form-associated web component. `file` is the selected local `File`. The [downloader demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--bridge-and-value) shows a stored string value transformed into a preview.

For native form submission, keep `value` compatible with `ElementInternals.setFormValue()`: `File`, `string`, `FormData`, or `null`.

```tsx
import { JBImageInput, type JBImageInputDownloader } from 'jb-image-input/react';

const downloader: JBImageInputDownloader<string> = (value) => {
    return fetch(value)
      .then((response) => response.blob())
      .then((blob) => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }));
};

<JBImageInput<string>
  downloader={downloader}
  onChange={(event) => console.log(event.target.value)}
/>;
```

## Validation

Use the [required validation demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--required-with-message) for required and custom validation messages, and the [max-size demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--max-file-size) for file-size rejection.

```jsx
const validationList = [
  {
    validator: ({ file }) => !file || file.size < 500 * 1024,
    message: 'Image must be smaller than 500KB',
  },
];

<JBImageInput required="Please select an image" validationList={validationList} />;
```

Use a ref when you need imperative validation; the [initial value demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--initial-value) also demonstrates imperative reset behavior:

```tsx
const imageRef = useRef(null);

<JBImageInput ref={imageRef} required />;

const isValid = imageRef.current.reportValidity();
```

## Multi image selector

Use `multiple` with `onImageSelected`, then render additional `JBImageInput` components and pass each extra file through `file` or `ref.current.selectImageByFile(file)`. See the [multiple selection demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--multiple-selection).

```jsx
<JBImageInput
  multiple
  onImageSelected={(event) => {
    const files = Array.from(event.detail.files);
    console.log(files);
  }}
/>
```

## Custom placeholder

Use the [custom placeholder demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--with-place-holder) to preview slot content.

```jsx
<JBImageInput label="Profile image">
  <div slot="placeholder">Select profile image</div>
</JBImageInput>
```

## Custom style

The React component uses the same CSS variables as the web component. See the [style gallery](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput-style--gallery) and shared [styling documentation](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput-styling--docs).

```css
.avatar-input {
  --jb-image-input-width: 10rem;
  --jb-image-input-height: 10rem;
  --jb-image-input-border-radius: 50%;
}
```

```jsx
<JBImageInput className="avatar-input" />
```

## CSS parts and states

The React wrapper exposes the same CSS parts, states, and slot names as the web component. Use JSX children with `slot="placeholder"` or other documented slot names for custom placeholder, upload, and overlay content. See the shared [CSS parts and states guidance](../README.md#css-parts-and-states).

```css
.avatar-input::part(image) {
  object-fit: cover;
}
```

## Accessibility notes

Set `label` so the image picker has a clear accessible name. Custom placeholder or overlay content should preserve a visible action label such as "Select image" or "Delete image"; the [normal demo](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput--normal) shows the labeled baseline.

## Shared Documentation

For web-component behavior, events, slots, CSS variables, and the full API, see the [`jb-image-input` README](../README.md) or its [component documentation](https://javadbat.github.io/design-system/?path=/story/components-form-elements-jbimageinput-readme--docs).

## Related Docs

- See [All JB Design System Component List](https://javadbat.github.io/design-system/) for more components.
- Use [Contribution Guide](https://github.com/javadbat/design-system/blob/main/docs/contribution-guide.md) if you want to contribute to this component.

## AI agent notes

- Import `JBImageInput` from `jb-image-input/react`; the wrapper imports and registers the underlying `jb-image-input` web component.
- Use `value` for stored/submitted image data and `file` when injecting a local `File`.
- Use `onChange` to upload the selected `File`, assign the returned stored value yourself, and use `downloader` to transform stored values into preview image data URLs.
- Keep submitted values compatible with `ElementInternals.setFormValue()`: `File`, `string`, `FormData`, or `null`.
- Use `onImageSelected` for multi-image flows; the component itself previews the first selected file.
- The default delete action uses `jb-icon-delete` and animates while hovered.
- Use `required`, `maxFileSize`, and `validationList` for validation.
