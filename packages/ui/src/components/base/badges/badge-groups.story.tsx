import type { FC } from "react";
import * as BadgeGroups from "./badge-groups.demo";

export default {
    title: "Base components/Badge groups",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex h-screen w-full p-4">
                <Story />
            </div>
        ),
    ],
};

export const BadgeGroupExample = () => <BadgeGroups.BadgeGroupExample />;
BadgeGroupExample.storyName = "Badge group example";

export const PillColorLeadingGray = () => <BadgeGroups.PillColorLeadingGray />;
PillColorLeadingGray.storyName = "Pill color leading gray";

export const PillColorLeadingBrand = () => <BadgeGroups.PillColorLeadingBrand />;
PillColorLeadingBrand.storyName = "Pill color leading brand";

export const PillColorLeadingError = () => <BadgeGroups.PillColorLeadingError />;
PillColorLeadingError.storyName = "Pill color leading error";

export const PillColorLeadingWarning = () => <BadgeGroups.PillColorLeadingWarning />;
PillColorLeadingWarning.storyName = "Pill color leading warning";

export const PillColorLeadingSuccess = () => <BadgeGroups.PillColorLeadingSuccess />;
PillColorLeadingSuccess.storyName = "Pill color leading success";

export const PillColorTrailingGray = () => <BadgeGroups.PillColorTrailingGray />;
PillColorTrailingGray.storyName = "Pill color trailing gray";

export const PillColorTrailingBrand = () => <BadgeGroups.PillColorTrailingBrand />;
PillColorTrailingBrand.storyName = "Pill color trailing brand";

export const PillColorTrailingError = () => <BadgeGroups.PillColorTrailingError />;
PillColorTrailingError.storyName = "Pill color trailing error";

export const PillColorTrailingWarning = () => <BadgeGroups.PillColorTrailingWarning />;
PillColorTrailingWarning.storyName = "Pill color trailing warning";

export const PillColorTrailingSuccess = () => <BadgeGroups.PillColorTrailingSuccess />;
PillColorTrailingSuccess.storyName = "Pill color trailing success";

export const ModernLeadingGray = () => <BadgeGroups.ModernLeadingGray />;
ModernLeadingGray.storyName = "Modern leading gray";

export const ModernLeadingBrand = () => <BadgeGroups.ModernLeadingBrand />;
ModernLeadingBrand.storyName = "Modern leading brand";

export const ModernLeadingError = () => <BadgeGroups.ModernLeadingError />;
ModernLeadingError.storyName = "Modern leading error";

export const ModernLeadingWarning = () => <BadgeGroups.ModernLeadingWarning />;
ModernLeadingWarning.storyName = "Modern leading warning";

export const ModernLeadingSuccess = () => <BadgeGroups.ModernLeadingSuccess />;
ModernLeadingSuccess.storyName = "Modern leading success";

export const ModernTrailingGray = () => <BadgeGroups.ModernTrailingGray />;
ModernTrailingGray.storyName = "Modern trailing gray";

export const ModernTrailingBrand = () => <BadgeGroups.ModernTrailingBrand />;
ModernTrailingBrand.storyName = "Modern trailing brand";

export const ModernTrailingError = () => <BadgeGroups.ModernTrailingError />;
ModernTrailingError.storyName = "Modern trailing error";

export const ModernTrailingWarning = () => <BadgeGroups.ModernTrailingWarning />;
ModernTrailingWarning.storyName = "Modern trailing warning";

export const ModernTrailingSuccess = () => <BadgeGroups.ModernTrailingSuccess />;
ModernTrailingSuccess.storyName = "Modern trailing success";
