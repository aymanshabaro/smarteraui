import { withThemeByClassName } from "@storybook/addon-themes";
import type { Decorator, Preview } from "@storybook/nextjs-vite";
import "../apps/docs/app/globals.css";

/** Sets `dir` on the story container from the `direction` toolbar global — mirrors the theme switcher below, one attribute per global. */
const withDirection: Decorator = (Story, context) => {
    const dir = context.globals.direction === "rtl" ? "rtl" : "ltr";
    return (
        <div dir={dir} style={{ minHeight: "100%" }}>
            <Story />
        </div>
    );
};

export const decorators = [withThemeByClassName({ themes: { light: "light-mode", dark: "dark-mode" }, defaultTheme: "light" }), withDirection];

export const globalTypes = {
    direction: {
        description: "Text direction",
        defaultValue: "ltr",
        toolbar: {
            title: "Direction",
            icon: "direction",
            items: [
                { value: "ltr", title: "LTR" },
                { value: "rtl", title: "RTL" },
            ],
            dynamicTitle: true,
        },
    },
};

const preview: Preview = { parameters: { layout: "fullscreen" } };
export default preview;
