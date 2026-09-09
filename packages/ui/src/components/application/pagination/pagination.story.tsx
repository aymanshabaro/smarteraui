import type { FC } from "react";
import * as Pagination from "./pagination.demo";

export default {
    title: "Application components/Pagination",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary min-h-screen w-full p-8">
                <Story />
            </div>
        ),
    ],
};

export const PaginationExample = () => <Pagination.PaginationExample />;
PaginationExample.storyName = "Pagination example";

export const PageDefault = () => <Pagination.PageDefault />;
PageDefault.storyName = "Page default";

export const PageMinimalCenter = () => <Pagination.PageMinimalCenter />;
PageMinimalCenter.storyName = "Page minimal center";

export const CardDefault = () => <Pagination.CardDefault />;
CardDefault.storyName = "Card default";

export const CardMinimalRightAligned = () => <Pagination.CardMinimalRightAligned />;
CardMinimalRightAligned.storyName = "Card minimal right aligned";

export const CardMinimalCenterAligned = () => <Pagination.CardMinimalCenterAligned />;
CardMinimalCenterAligned.storyName = "Card minimal center aligned";

export const CardMinimalLeftAligned = () => <Pagination.CardMinimalLeftAligned />;
CardMinimalLeftAligned.storyName = "Card minimal left aligned";

export const ButtonGroupRightAligned = () => <Pagination.ButtonGroupRightAligned />;
ButtonGroupRightAligned.storyName = "Button group right aligned";

export const ButtonGroupCenterAligned = () => <Pagination.ButtonGroupCenterAligned />;
ButtonGroupCenterAligned.storyName = "Button group center aligned";

export const ButtonGroupLeftAligned = () => <Pagination.ButtonGroupLeftAligned />;
ButtonGroupLeftAligned.storyName = "Button group left aligned";

export const CardAdvanced = () => <Pagination.CardAdvanced />;
CardAdvanced.storyName = "Card advanced";

export const CardAdvancedCenter = () => <Pagination.CardAdvancedCenter />;
CardAdvancedCenter.storyName = "Card advanced center";

export const PaginationDot = () => <Pagination.PaginationDot />;
PaginationDot.storyName = "Pagination dot";

export const PaginationLine = () => <Pagination.PaginationLine />;
PaginationLine.storyName = "Pagination line";
