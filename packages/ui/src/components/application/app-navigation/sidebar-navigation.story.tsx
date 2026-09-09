import type { FC } from "react";
import * as Demos from "./sidebar-navigation.demo";

export default {
    title: "Application components/Sidebar navigations",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full p-4">
                <Story />
            </div>
        ),
    ],
};

export const SidebarNavigationExample = () => <Demos.SidebarNavigationExample />;
SidebarNavigationExample.storyName = "Sidebar navigation example";

export const Simple = () => <Demos.Simple />;
Simple.storyName = "Simple";

export const DualTier = () => <Demos.DualTier />;
DualTier.storyName = "Dual-tier";

export const Slim = () => <Demos.Slim />;
Slim.storyName = "Slim";

export const SectionsDividers = () => <Demos.SectionsDividers />;
SectionsDividers.storyName = "Sections dividers";

export const SectionsSubheadings = () => <Demos.SectionsSubheadings />;
SectionsSubheadings.storyName = "Sections subheadings";

export const ProgressBar = () => <Demos.ProgressBar />;
ProgressBar.storyName = "Progress bar";

export const ProgressCircle = () => <Demos.ProgressCircle />;
ProgressCircle.storyName = "Progress circle";

export const Image = () => <Demos.Image />;
Image.storyName = "Image";

export const CookiePreferences = () => <Demos.CookiePreferences />;
CookiePreferences.storyName = "Cookie preferences";

export const ReferralLink = () => <Demos.ReferralLink />;
ReferralLink.storyName = "Referral link";

export const OnboardingSteps = () => <Demos.OnboardingSteps />;
OnboardingSteps.storyName = "Onboarding steps";

export const UpgradeCTA = () => <Demos.UpgradeCTA />;
UpgradeCTA.storyName = "Upgrade CTA";

export const SupportCTA = () => <Demos.SupportCTA />;
SupportCTA.storyName = "Support CTA";

export const EventCTA = () => <Demos.EventCTA />;
EventCTA.storyName = "Event CTA";

export const Message = () => <Demos.Message />;
Message.storyName = "Message";

export const CurrentProjects = () => <Demos.CurrentProjects />;
CurrentProjects.storyName = "Current projects";

export const FreeTrialCTA = () => <Demos.FreeTrialCTA />;
FreeTrialCTA.storyName = "Free trial CTA";

export const QRCode = () => <Demos.QRCode />;
QRCode.storyName = "QR code";
