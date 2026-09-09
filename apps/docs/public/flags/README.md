Flag SVGs go here, named by ISO 3166-1 alpha-2 code in uppercase: `US.svg`, `GB.svg`, `RO.svg`, …

`packages/ui/src/utils/countries.tsx` resolves every flag to `/flags/<ISO2>.svg`, so any app using
components that render flags (badges with flags, phone/country inputs, payment forms) must serve the
same set from its own public directory.

Suggested source: [`flag-icons`](https://github.com/lipis/flag-icons) (MIT) —
`cp node_modules/flag-icons/flags/4x3/*.svg apps/docs/public/flags/` then uppercase the filenames.
