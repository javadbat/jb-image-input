# Changelog

## Unreleased

### Changed

- Made custom-element module evaluation SSR-safe by extending `JBBaseComponent` where needed and registering elements through the shared `defineWebComponent()` helper; raised the minimum `jb-core` version to `0.35.0`.
- Updated component color defaults to use the shared semantic content and surface tokens.

## [3.10.1] 2026-07-30

### Added

- Added Storybook interaction coverage for initial-value initialization, live-value precedence, explicit `null`, and native form reset.

### Fixed

- fix name assignment property

### Changed

- Updated `initialValue` to seed `value` only until the live value is explicitly set; native form reset restores the latest initial image and re-enables initialization.
- Updated the React wrapper so an omitted `value` does not overwrite `initialValue`, while explicit `null` still clears the live image.

## [3.10.0] 2026-07-19

### Added

- Added the standard `formResetCallback()` to restore `initialValue` and clear validation state.
- Added a Storybook styling guide with reusable style recipes for Carbon, Aurora, Forest, Sunset, Porcelain, Candy, Terminal, Material, Fluent, Bootstrap, Cupertino, and Ant Design examples.
- Added existing overlay background variables to the custom elements manifest so tooling can discover the full public styling API.

### Changed

- Image selection, preview, and reselection actions now use native buttons with keyboard focus styles, and disabled state is forwarded to every image action.
- Standardized `invalid` custom-state and `ariaInvalid` updates in validation display and cleanup callbacks.
- Added the React `initialValue` prop and forwarded `value` and `initialValue` directly as React 19 custom-element properties.
- Breaking: renamed `--jb-image-input-message-error-color` to `--jb-image-input-message-color-error`.
- Breaking: renamed `--jb-image-input-placeholder-p-color` to `--jb-image-input-placeholder-neutral-color`.
- Breaking: renamed `--jb-image-input-placeholder-sec-color` to `--jb-image-input-placeholder-primary-color`.
- Added public overlay background variables for default and error overlays.
- Standardized all custom theme recipes on `jb-image-input.<theme>-style` selectors without redundant component hook classes.

### Fixed

- Disabled image inputs now block file selection and overlay actions and expose the disabled state consistently.
