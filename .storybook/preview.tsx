import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/nextjs-vite";
import "../apps/docs/app/globals.css";

export const decorators = [withThemeByClassName({ themes: { light: "light-mode", dark: "dark-mode" }, defaultTheme: "light" })];

const preview: Preview = { parameters: { layout: "fullscreen" } };
export default preview;
