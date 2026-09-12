---
"@properui/ui": patch
---

Removes the internal `DemoNativeSelect` duplicate. It existed as a placeholder until `NativeSelect`
was ported; the eight demo call sites now use `NativeSelect` from `base/select/select-native`.
`DemoNativeSelect` was never documented as public API.
