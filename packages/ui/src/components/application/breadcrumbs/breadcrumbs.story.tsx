import type { FC } from "react";
import * as Breadcrumbs from "./breadcrumbs.demo";

export default {
    title: "Application components/Breadcrumbs",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-center justify-center p-8">
                <Story />
            </div>
        ),
    ],
};

export const BreadcrumbsExample = () => <Breadcrumbs.BreadcrumbsExample />;
BreadcrumbsExample.storyName = "Breadcrumbs example";

export const BreadcrumbsText = () => <Breadcrumbs.BreadcrumbsText />;
BreadcrumbsText.storyName = "Breadcrumbs text";

export const BreadcrumbsTextWithLine = () => <Breadcrumbs.BreadcrumbsTextWithLine />;
BreadcrumbsTextWithLine.storyName = "Breadcrumbs text with line";

export const BreadcrumbsButton = () => <Breadcrumbs.BreadcrumbsButton />;
BreadcrumbsButton.storyName = "Breadcrumbs button";

export const AccountButtonChevron = () => <Breadcrumbs.AccountButtonChevron />;
AccountButtonChevron.storyName = "Account button chevron";

export const AccountButtonSlash = () => <Breadcrumbs.AccountButtonSlash />;
AccountButtonSlash.storyName = "Account button slash";
