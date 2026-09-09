import type { FC } from "react";
import * as Dropdowns from "./dropdown.demo";

export default {
    title: "Base components/Dropdowns",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-start justify-center p-8">
                <Story />
            </div>
        ),
    ],
};

export const DropdownExample = () => <Dropdowns.DropdownExample />;
DropdownExample.storyName = "Dropdown example";

export const ButtonSimple = () => <Dropdowns.ButtonSimple />;
ButtonSimple.storyName = "Button simple";

export const ButtonAdvanced = () => <Dropdowns.ButtonAdvanced />;
ButtonAdvanced.storyName = "Button advanced";

export const ButtonLink = () => <Dropdowns.ButtonLink />;
ButtonLink.storyName = "Button link";

export const IconSimple = () => <Dropdowns.IconSimple />;
IconSimple.storyName = "Icon simple";

export const IconAdvanced = () => <Dropdowns.IconAdvanced />;
IconAdvanced.storyName = "Icon advanced";

export const SearchSimple = () => <Dropdowns.SearchSimple />;
SearchSimple.storyName = "Search simple";

export const SearchAdvanced = () => <Dropdowns.SearchAdvanced />;
SearchAdvanced.storyName = "Search advanced";

export const Integrations = () => <Dropdowns.Integrations />;
Integrations.storyName = "Integrations";

export const AccountButton = () => <Dropdowns.AccountButton />;
AccountButton.storyName = "Account button";

export const Avatar = () => <Dropdowns.Avatar />;
Avatar.storyName = "Avatar";

export const AccountCardXs = () => <Dropdowns.AccountCardXs />;
AccountCardXs.storyName = "Account card (xs)";

export const AccountCardSm = () => <Dropdowns.AccountCardSm />;
AccountCardSm.storyName = "Account card (sm)";

export const AccountCardMd = () => <Dropdowns.AccountCardMd />;
AccountCardMd.storyName = "Account card (md)";

export const AccountBreadcrumb = () => <Dropdowns.AccountBreadcrumb />;
AccountBreadcrumb.storyName = "Account breadcrumb";
