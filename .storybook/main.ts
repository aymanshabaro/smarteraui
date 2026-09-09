import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
    stories: ["../packages/ui/src/**/*.story.@(ts|tsx)"],
    addons: ["@storybook/addon-themes"],
    staticDirs: ["../apps/docs/public"],
    framework: { name: "@storybook/nextjs-vite", options: {} },
};
export default config;
