# Changelog

## Unreleased

### Added

- Added a Storybook styling guide with reusable style recipes for Carbon, Aurora, Forest, Sunset, Porcelain, Candy, Terminal, Material, Fluent, Bootstrap, Cupertino, and Ant Design examples.
- Added existing overlay background variables to the custom elements manifest so tooling can discover the full public styling API.

### Changed

- Breaking: renamed `--jb-image-input-message-error-color` to `--jb-image-input-message-color-error`.
- Breaking: renamed `--jb-image-input-placeholder-p-color` to `--jb-image-input-placeholder-neutral-color`.
- Breaking: renamed `--jb-image-input-placeholder-sec-color` to `--jb-image-input-placeholder-primary-color`.
- Added public overlay background variables for default and error overlays.
- Standardized all custom theme recipes on `jb-image-input.<theme>-style` selectors without redundant component hook classes.

### Fixed

- Disabled image inputs now block file selection and overlay actions and expose the disabled state consistently.
