import type { FC } from "react";
import * as SlideoutMenus from "./slideout-menus.demo";

export default {
    title: "Application components/Drawers",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full items-center justify-center">
                <Story />
            </div>
        ),
    ],
};

export const DrawerExample = () => <SlideoutMenus.DrawerExample />;
DrawerExample.storyName = "Drawer example";

export const PlaceholderMenu = () => <SlideoutMenus.PlaceholderMenu />;
PlaceholderMenu.storyName = "Placeholder menu";

export const UserProfileMenu = () => <SlideoutMenus.UserProfileMenu />;
UserProfileMenu.storyName = "User profile menu";

export const MessagesMenu = () => <SlideoutMenus.MessagesMenu />;
MessagesMenu.storyName = "Messages menu";

export const MessageChatMenu = () => <SlideoutMenus.MessageChatMenu />;
MessageChatMenu.storyName = "Message chat menu";

export const PaymentMethodMenu = () => <SlideoutMenus.PaymentMethodMenu />;
PaymentMethodMenu.storyName = "Payment method menu";

export const PaymentDetailsMenu = () => <SlideoutMenus.PaymentDetailsMenu />;
PaymentDetailsMenu.storyName = "Payment details menu";

export const PlanMenu = () => <SlideoutMenus.PlanMenu />;
PlanMenu.storyName = "Plan menu";

export const TeamMembersMenu = () => <SlideoutMenus.TeamMembersMenu />;
TeamMembersMenu.storyName = "Team members menu";

export const FiltersMenu = () => <SlideoutMenus.FiltersMenu />;
FiltersMenu.storyName = "Filters menu";

export const FiltersAdvancedEmptyStateMenu = () => <SlideoutMenus.FiltersAdvancedEmptyStateMenu />;
FiltersAdvancedEmptyStateMenu.storyName = "Filters advanced empty state menu";

export const FiltersAdvancedActiveMenu = () => <SlideoutMenus.FiltersAdvancedActiveMenu />;
FiltersAdvancedActiveMenu.storyName = "Filters advanced active menu";

export const FileUploadMenu = () => <SlideoutMenus.FileUploadMenu />;
FileUploadMenu.storyName = "File upload menu";

export const LabelsMenu = () => <SlideoutMenus.LabelsMenu />;
LabelsMenu.storyName = "Labels menu";

export const ProjectDetailsMenu = () => <SlideoutMenus.ProjectDetailsMenu />;
ProjectDetailsMenu.storyName = "Project details menu";

export const NotificationSettingsCheckboxMenu = () => <SlideoutMenus.NotificationSettingsCheckboxMenu />;
NotificationSettingsCheckboxMenu.storyName = "Notification settings checkbox menu";

export const NotificationSettingsButtonMenu = () => <SlideoutMenus.NotificationSettingsButtonMenu />;
NotificationSettingsButtonMenu.storyName = "Notification settings button menu";

export const NotificationsMenu = () => <SlideoutMenus.NotificationsMenu />;
NotificationsMenu.storyName = "Notifications menu";

export const OrderSummaryMenu = () => <SlideoutMenus.OrderSummaryMenu />;
OrderSummaryMenu.storyName = "Order summary menu";

export const CalendarEventMenu = () => <SlideoutMenus.CalendarEventMenu />;
CalendarEventMenu.storyName = "Calendar event menu";

export const UserSettingsMenu = () => <SlideoutMenus.UserSettingsMenu />;
UserSettingsMenu.storyName = "User settings menu";

export const AIAssistantMenu = () => <SlideoutMenus.AIAssistantMenu />;
AIAssistantMenu.storyName = "AI assistant menu";

export const AIAssistantMessageMenu = () => <SlideoutMenus.AIAssistantMessageMenu />;
AIAssistantMessageMenu.storyName = "AI assistant message menu";

export const ShareProjectMenu = () => <SlideoutMenus.ShareProjectMenu />;
ShareProjectMenu.storyName = "Share project menu";

export const CreateEventMenu = () => <SlideoutMenus.CreateEventMenu />;
CreateEventMenu.storyName = "Create event menu";

export const IntegrationMenu = () => <SlideoutMenus.IntegrationMenu />;
IntegrationMenu.storyName = "Integration menu";
