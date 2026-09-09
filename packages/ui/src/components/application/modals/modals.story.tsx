import type { FC } from "react";
import * as Demos from "./modals.demo";

export default {
    title: "Application components/Modals",
    decorators: [
        (Story: FC) => (
            <div className="bg-secondary flex min-h-screen w-full items-center justify-center p-4 sm:p-8">
                <Story />
            </div>
        ),
    ],
};

export const ModalExample = () => <Demos.ModalExample />;
ModalExample.storyName = "Modal example";

export const StackedLeftAligned = () => <Demos.StackedLeftAligned />;
StackedLeftAligned.storyName = "Stacked left aligned";

export const WarningStackedLeftAligned = () => <Demos.WarningStackedLeftAligned />;
WarningStackedLeftAligned.storyName = "Warning stacked left aligned";

export const DestructiveStackedLeftAligned = () => <Demos.DestructiveStackedLeftAligned />;
DestructiveStackedLeftAligned.storyName = "Destructive stacked left aligned";

export const Horizontal = () => <Demos.Horizontal />;
Horizontal.storyName = "Horizontal";

export const WarningHorizontal = () => <Demos.WarningHorizontal />;
WarningHorizontal.storyName = "Warning horizontal";

export const DestructiveHorizontal = () => <Demos.DestructiveHorizontal />;
DestructiveHorizontal.storyName = "Destructive horizontal";

export const Login = () => <Demos.Login />;
Login.storyName = "Login";

export const Signup01 = () => <Demos.Signup01 />;
Signup01.storyName = "Signup 01";

export const Signup02 = () => <Demos.Signup02 />;
Signup02.storyName = "Signup 02";

export const Checkboxes = () => <Demos.Checkboxes />;
Checkboxes.storyName = "Checkboxes";

export const Toggles = () => <Demos.Toggles />;
Toggles.storyName = "Toggles";

export const LinkField = () => <Demos.LinkField />;
LinkField.storyName = "Link field";

export const Dropdown = () => <Demos.Dropdown />;
Dropdown.storyName = "Dropdown";

export const InputField = () => <Demos.InputField />;
InputField.storyName = "Input field";

export const Labels = () => <Demos.Labels />;
Labels.storyName = "Labels";

export const AccessRequest = () => <Demos.AccessRequest />;
AccessRequest.storyName = "Access request";

export const EmailInvite = () => <Demos.EmailInvite />;
EmailInvite.storyName = "Email invite";

export const UserInvite = () => <Demos.UserInvite />;
UserInvite.storyName = "User invite";

export const StackedWithTeam = () => <Demos.StackedWithTeam />;
StackedWithTeam.storyName = "Stacked with team";

export const StackedWithTeamAndLink = () => <Demos.StackedWithTeamAndLink />;
StackedWithTeamAndLink.storyName = "Stacked with team and link";

export const StackedWithTeamAndInvites = () => <Demos.StackedWithTeamAndInvites />;
StackedWithTeamAndInvites.storyName = "Stacked with team and invites";

export const VerificationCode = () => <Demos.VerificationCode />;
VerificationCode.storyName = "Verification code";

export const TwoFactorCode = () => <Demos.TwoFactorCode />;
TwoFactorCode.storyName = "Two-factor code";

export const PasswordPrompt = () => <Demos.PasswordPrompt />;
PasswordPrompt.storyName = "Password prompt";

export const CenteredPhoto = () => <Demos.CenteredPhoto />;
CenteredPhoto.storyName = "Centered photo";

export const CenteredPhotoCarousel = () => <Demos.CenteredPhotoCarousel />;
CenteredPhotoCarousel.storyName = "Centered photo carousel";

export const CenteredVideoCarousel = () => <Demos.CenteredVideoCarousel />;
CenteredVideoCarousel.storyName = "Centered video carousel";

export const PaymentDetails = () => <Demos.PaymentDetails />;
PaymentDetails.storyName = "Payment details";

export const PaymentDetailsWithImage = () => <Demos.PaymentDetailsWithImage />;
PaymentDetailsWithImage.storyName = "Payment details with image";

export const Plan01 = () => <Demos.Plan01 />;
Plan01.storyName = "Plan 01";

export const Plan02 = () => <Demos.Plan02 />;
Plan02.storyName = "Plan 02";

export const PaymentMethod = () => <Demos.PaymentMethod />;
PaymentMethod.storyName = "Payment method";

export const DatePicker = () => <Demos.DatePicker />;
DatePicker.storyName = "Date picker";

export const FileUpload = () => <Demos.FileUpload />;
FileUpload.storyName = "File upload";

export const ProfileSettings = () => <Demos.ProfileSettings />;
ProfileSettings.storyName = "Profile settings";

export const UserSelection = () => <Demos.UserSelection />;
UserSelection.storyName = "User selection";

export const Form01 = () => <Demos.Form01 />;
Form01.storyName = "Form 01";

export const Form02 = () => <Demos.Form02 />;
Form02.storyName = "Form 02";

export const ImageCrop = () => <Demos.ImageCrop />;
ImageCrop.storyName = "Image crop";

export const CalendarEvent = () => <Demos.CalendarEvent />;
CalendarEvent.storyName = "Calendar event";

export const BannerAppearance = () => <Demos.BannerAppearance />;
BannerAppearance.storyName = "Banner appearance";

export const AppearanceSettings = () => <Demos.AppearanceSettings />;
AppearanceSettings.storyName = "Appearance settings";

export const AIAssistant = () => <Demos.AIAssistant />;
AIAssistant.storyName = "AI assistant";

export const UserSettings = () => <Demos.UserSettings />;
UserSettings.storyName = "User settings";

export const NewProject = () => <Demos.NewProject />;
NewProject.storyName = "New project";

export const TextEditor = () => <Demos.TextEditor />;
TextEditor.storyName = "Text editor";

export const ShareProject = () => <Demos.ShareProject />;
ShareProject.storyName = "Share project";

export const CreateEvent = () => <Demos.CreateEvent />;
CreateEvent.storyName = "Create event";

export const Integration = () => <Demos.Integration />;
Integration.storyName = "Integration";

export const NewMessageEmptyState = () => <Demos.NewMessageEmptyState />;
NewMessageEmptyState.storyName = "New message empty state";

export const NewMessageFilled = () => <Demos.NewMessageFilled />;
NewMessageFilled.storyName = "New message filled";
