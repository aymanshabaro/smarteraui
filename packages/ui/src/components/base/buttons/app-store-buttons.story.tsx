import type { FC } from "react";
import * as Buttons from "./app-store-buttons.demo";

export default {
    title: "Base components/Mobile app store buttons",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full p-4">
                <Story />
            </div>
        ),
    ],
};

export const MobileAppStoreButtonsExample = () => <Buttons.MobileAppStoreButtonsExample />;
MobileAppStoreButtonsExample.storyName = "Mobile app store buttons example";

export const GooglePlayButtons = () => <Buttons.GooglePlayButtons />;
GooglePlayButtons.storyName = "Google play buttons";

export const AppStoreButtons = () => <Buttons.AppStoreButtons />;
AppStoreButtons.storyName = "App store buttons";

export const GalaxyStoreButtons = () => <Buttons.GalaxyStoreButtons />;
GalaxyStoreButtons.storyName = "Galaxy store buttons";

export const AppGalleryButtons = () => <Buttons.AppGalleryButtons />;
AppGalleryButtons.storyName = "App gallery buttons";

export const GooglePlayOutlineButtons = () => <Buttons.GooglePlayOutlineButtons />;
GooglePlayOutlineButtons.storyName = "Google play outline buttons";

export const AppStoreOutlineButtons = () => <Buttons.AppStoreOutlineButtons />;
AppStoreOutlineButtons.storyName = "App store outline buttons";

export const GalaxyStoreOutlineButtons = () => <Buttons.GalaxyStoreOutlineButtons />;
GalaxyStoreOutlineButtons.storyName = "Galaxy store outline buttons";

export const AppGalleryOutlineButtons = () => <Buttons.AppGalleryOutlineButtons />;
AppGalleryOutlineButtons.storyName = "App gallery outline buttons";
