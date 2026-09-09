import type { FC } from "react";
import * as Buttons from "@/components/base/buttons/buttons.demo";

export default {
    title: "Base components/Buttons",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full p-4">
                <Story />
            </div>
        ),
    ],
};

export const ButtonExample = () => <Buttons.ButtonExample />;
ButtonExample.storyName = "Button example";

export const PrimaryButtons = () => <Buttons.PrimaryButtons />;
PrimaryButtons.storyName = "Primary buttons";

export const SecondaryButtons = () => <Buttons.SecondaryButtons />;
SecondaryButtons.storyName = "Secondary buttons";

export const TertiaryButtons = () => <Buttons.TertiaryButtons />;
TertiaryButtons.storyName = "Tertiary buttons";

export const LinkColorButtonsExample = () => <Buttons.LinkColorButtonsExample />;
LinkColorButtonsExample.storyName = "Link color buttons example";

export const LinkGrayButtons = () => <Buttons.LinkGrayButtons />;
LinkGrayButtons.storyName = "Link gray buttons";

export const IconLeadingButtonsExample = () => <Buttons.IconLeadingButtonsExample />;
IconLeadingButtonsExample.storyName = "Icon leading buttons example";

export const IconTrailingButtonsExample = () => <Buttons.IconTrailingButtonsExample />;
IconTrailingButtonsExample.storyName = "Icon trailing buttons example";

export const IconOnlyButtonsExample = () => <Buttons.IconOnlyButtonsExample />;
IconOnlyButtonsExample.storyName = "Icon only buttons example";

export const LoadingButtonsExample = () => <Buttons.LoadingButtonsExample />;
LoadingButtonsExample.storyName = "Loading buttons example";

export const DisabledButtonsExample = () => <Buttons.DisabledButtonsExample />;
DisabledButtonsExample.storyName = "Disabled buttons example";

export const PrimaryButtonsDestructiveExample = () => <Buttons.PrimaryButtonsDestructiveExample />;
PrimaryButtonsDestructiveExample.storyName = "Primary buttons destructive example";

export const SecondaryButtonsDestructive = () => <Buttons.SecondaryButtonsDestructive />;
SecondaryButtonsDestructive.storyName = "Secondary buttons destructive";

export const TertiaryButtonsDestructive = () => <Buttons.TertiaryButtonsDestructive />;
TertiaryButtonsDestructive.storyName = "Tertiary buttons destructive";
