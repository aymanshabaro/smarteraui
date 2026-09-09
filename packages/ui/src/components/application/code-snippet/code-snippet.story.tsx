import type { FC } from "react";
import * as Demos from "./code-snippet.demo";

export default {
    title: "Application components/Code snippets",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-start justify-center p-8">
                <div className="w-full max-w-3xl">
                    <Story />
                </div>
            </div>
        ),
    ],
};

export const CodeSnippetExample = () => <Demos.CodeSnippetExample />;
CodeSnippetExample.storyName = "Code snippet example";

export const WithLineNumber = () => <Demos.WithLineNumber />;
WithLineNumber.storyName = "With line number";

export const WithoutLineNumber = () => <Demos.WithoutLineNumber />;
WithoutLineNumber.storyName = "Without line number";

export const ShowMore = () => <Demos.ShowMore />;
ShowMore.storyName = "Show more";

export const WithTabs = () => <Demos.WithTabs />;
WithTabs.storyName = "With tabs";
