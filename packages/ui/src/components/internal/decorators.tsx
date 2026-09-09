import type { FC, ReactElement } from "react";
// Deviation from reference: the reference imports `StoryContext`/`StoryFn` from
// `@storybook/nextjs`, which is not a dependency of this monorepo (it uses
// `@storybook/nextjs-vite`). `storybook/internal/types` is the underlying,
// framework-agnostic source of those types and is already provided by the
// `storybook` devDependency declared at the workspace root.
import type { StoryContext, StoryFn } from "storybook/internal/types";

export declare type ImageSrc = {
    height: number;
    url: string;
    width: number;
};

export declare type Globals = {
    overlay: {
        active: boolean;
        visible: boolean;
        isDiffOn: boolean;
        image?: ImageSrc;
        opacity: number;
        isComparisonOn: boolean;
        threshold: number;
        viewport: Viewports;
    };
};

export type Viewports = "desktop" | "mobile";

type CustomRenderer = (Story: FC, context: StoryContext) => ReactElement;

export const withOverlayAware = (customRenderer?: CustomRenderer) => (Story: StoryFn, context: StoryContext) => {
    const { overlay } = context.globals as Globals;

    if (overlay?.visible) {
        return Story(context, context) as ReactElement;
    }

    if (customRenderer) {
        return customRenderer(Story as FC, context);
    }

    return Story(context, context) as ReactElement;
};
