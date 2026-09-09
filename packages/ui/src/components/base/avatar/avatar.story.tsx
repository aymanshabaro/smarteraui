import type { FC } from "react";
import * as Avatars from "@/components/base/avatar/avatar.demo";

export default {
    title: "Base components/Avatars",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full p-4">
                <Story />
            </div>
        ),
    ],
};

export const AvatarExample = () => <Avatars.AvatarExample />;
AvatarExample.storyName = "Avatar example";

export const Avatar = () => <Avatars.Avatar />;

export const BorderExample = () => <Avatars.BorderExample />;
BorderExample.storyName = "Border example";

export const StatusIndicatorExample = () => <Avatars.StatusIndicatorExample />;
StatusIndicatorExample.storyName = "Status indicator example";

export const CompanyLogoExample = () => <Avatars.CompanyLogoExample />;
CompanyLogoExample.storyName = "Company logo example";

export const VerifiedBadgeExample = () => <Avatars.VerifiedBadgeExample />;
VerifiedBadgeExample.storyName = "Verified badge example";

export const PlaceholderExample = () => <Avatars.PlaceholderExample />;
PlaceholderExample.storyName = "Placeholder example";

export const InitialsExample = () => <Avatars.InitialsExample />;
InitialsExample.storyName = "Initials example";

export const LabelGroupExample = () => <Avatars.LabelGroupExample />;
LabelGroupExample.storyName = "Label group example";

export const GroupExample = () => <Avatars.GroupExample />;
GroupExample.storyName = "Group example";

export const ProfilePhoto = () => <Avatars.ProfilePhoto />;
ProfilePhoto.storyName = "Profile photo";

export const ProfilePhotoPlaceholderExample = () => <Avatars.ProfilePhotoPlaceholderExample />;
ProfilePhotoPlaceholderExample.storyName = "Profile photo placeholder example";

export const ProfilePhotoInitialsExample = () => <Avatars.ProfilePhotoInitialsExample />;
ProfilePhotoInitialsExample.storyName = "Profile photo initials example";
