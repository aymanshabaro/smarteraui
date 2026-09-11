"use client";

import type { ReactNode } from "react";
import {
    AlertTriangle,
    Bell01,
    Calendar,
    CheckCircle,
    Copy01,
    Edit01,
    FaceSmile,
    FilterLines,
    Link01,
    Mail01,
    MarkerPin01,
    MessageChatCircle,
    Paperclip,
    Plus,
    RefreshCcw02,
    Send01,
    Share07,
    Stars02,
    ThumbsDown,
    ThumbsUp,
    Trash01,
    UserPlus01,
    VideoRecorder,
} from "@properui/icons";
import { AVATARS, IMAGES, LOGOS, avatar } from "../../../utils/demo-assets";
import { Avatar } from "../../base/avatar/avatar";
import { AvatarLabelGroup } from "../../base/avatar/avatar-label-group";
import { Badge } from "../../base/badges/badges";
import { Button } from "../../base/buttons/button";
import { ButtonUtility } from "../../base/buttons/button-utility";
import { Checkbox } from "../../base/checkbox/checkbox";
import { Dropdown } from "../../base/dropdown/dropdown";
import { Input } from "../../base/input/input";
import { DemoNativeSelect } from "../../base/input/input-native-select";
import { PaymentInput } from "../../base/input/input-payment";
import { RadioButton, RadioGroup } from "../../base/radio-buttons/radio-buttons";
import { TextArea } from "../../base/textarea/textarea";
import { Toggle } from "../../base/toggle/toggle";
import { Dot } from "../../foundations/dot-icon";
import { FeaturedIcon } from "../../foundations/featured-icon/featured-icon";
import { MastercardIcon, VisaIcon } from "../../foundations/payment-icons";
import { FileUpload } from "../file-upload/file-upload-base";
import { Notification } from "../notifications/notifications";
import { SlideoutMenu } from "./slideout-menu";

/**
 * Shared demo scaffold: renders a trigger button on a neutral backdrop and opens the drawer
 * immediately (`defaultOpen`) so the docs preview shows real content without an interaction.
 */
const TriggerFrame = ({
    label = "Open drawer",
    color = "primary",
    children,
}: {
    label?: string;
    color?: "primary" | "secondary";
    children: (close: () => void) => ReactNode;
}) => (
    <div className="bg-secondary flex h-dvh w-full items-center justify-center p-8">
        <SlideoutMenu.Trigger defaultOpen>
            <Button size="md" color={color}>
                {label}
            </Button>
            <SlideoutMenu>{({ close }) => children(close)}</SlideoutMenu>
        </SlideoutMenu.Trigger>
    </div>
);

const DrawerTitle = ({ title, subtitle }: { title: ReactNode; subtitle?: ReactNode }) => (
    <>
        <p className="text-primary text-lg font-semibold">{title}</p>
        {subtitle && <p className="text-tertiary mt-1 text-sm">{subtitle}</p>}
    </>
);

/* -------------------------------------------------------------------------------------------------
 * 1. Drawer example
 * ---------------------------------------------------------------------------------------------- */

export const DrawerExample = () => (
    <TriggerFrame label="Open drawer">
        {(close) => (
            <>
                <SlideoutMenu.Header onClose={close}>
                    <DrawerTitle title="Drawer title" subtitle="This is a basic drawer with a header, body and footer." />
                </SlideoutMenu.Header>
                <SlideoutMenu.Content>
                    <p className="text-secondary text-sm">
                        Drawers slide in from the edge of the screen and are used for tasks that require focus without leaving the current page context.
                    </p>
                </SlideoutMenu.Content>
                <SlideoutMenu.Footer className="flex items-center justify-end gap-3">
                    <Button color="secondary" size="md" onClick={close}>
                        Cancel
                    </Button>
                    <Button size="md" onClick={close}>
                        Save
                    </Button>
                </SlideoutMenu.Footer>
            </>
        )}
    </TriggerFrame>
);

/* -------------------------------------------------------------------------------------------------
 * 2. Placeholder menu
 * ---------------------------------------------------------------------------------------------- */

export const PlaceholderMenu = () => (
    <TriggerFrame label="Open placeholder" color="secondary">
        {(close) => (
            <>
                <SlideoutMenu.Header onClose={close}>
                    <DrawerTitle title="Placeholder menu" />
                </SlideoutMenu.Header>
                <SlideoutMenu.Content>
                    <div className="border-secondary text-tertiary flex size-full min-h-64 flex-1 items-center justify-center rounded-xl border border-dashed text-sm">
                        Content placeholder
                    </div>
                </SlideoutMenu.Content>
                <SlideoutMenu.Footer className="flex items-center justify-end">
                    <Button color="secondary" size="md" onClick={close}>
                        Close
                    </Button>
                </SlideoutMenu.Footer>
            </>
        )}
    </TriggerFrame>
);

/* -------------------------------------------------------------------------------------------------
 * 3. User profile menu
 * ---------------------------------------------------------------------------------------------- */

export const UserProfileMenu = () => {
    const olivia = avatar(0);

    return (
        <TriggerFrame label="Open profile">
            {(close) => (
                <>
                    <SlideoutMenu.Header onClose={close}>
                        <div className="flex items-center gap-4">
                            <Avatar size="xl" src={olivia.src} alt={olivia.alt} status="online" />
                            <div>
                                <p className="text-primary text-lg font-semibold">{olivia.name}</p>
                                <p className="text-tertiary text-sm">{olivia.username} · Product designer</p>
                            </div>
                        </div>
                    </SlideoutMenu.Header>
                    <SlideoutMenu.Content>
                        <p className="text-secondary text-sm">
                            Olivia has been designing products for over 8 years, with a focus on accessibility and inclusive design systems.
                        </p>

                        <dl className="bg-secondary grid w-full grid-cols-3 gap-4 rounded-xl p-4">
                            <div className="flex flex-col gap-1">
                                <dt className="text-tertiary text-xs font-medium">Posts</dt>
                                <dd className="text-md text-primary font-semibold">128</dd>
                            </div>
                            <div className="flex flex-col gap-1">
                                <dt className="text-tertiary text-xs font-medium">Followers</dt>
                                <dd className="text-md text-primary font-semibold">3.2k</dd>
                            </div>
                            <div className="flex flex-col gap-1">
                                <dt className="text-tertiary text-xs font-medium">Following</dt>
                                <dd className="text-md text-primary font-semibold">412</dd>
                            </div>
                        </dl>

                        <div className="border-secondary flex w-full flex-col gap-3 border-t pt-4">
                            <div className="text-tertiary flex items-center gap-2 text-sm">
                                <Mail01 aria-hidden="true" className="size-4" />
                                {olivia.email}
                            </div>
                            <div className="text-tertiary flex items-center gap-2 text-sm">
                                <MarkerPin01 aria-hidden="true" className="size-4" />
                                San Francisco, US
                            </div>
                        </div>
                    </SlideoutMenu.Content>
                    <SlideoutMenu.Footer className="flex items-center justify-end gap-3">
                        <Button color="secondary" size="md" onClick={close}>
                            Message
                        </Button>
                        <Button size="md" onClick={close}>
                            Follow
                        </Button>
                    </SlideoutMenu.Footer>
                </>
            )}
        </TriggerFrame>
    );
};

/* -------------------------------------------------------------------------------------------------
 * 4. Messages menu
 * ---------------------------------------------------------------------------------------------- */

const conversations = [
    { name: avatar(1).name, avatar: avatar(1), snippet: "Sounds good, let's sync tomorrow morning.", time: "2m", unread: true },
    { name: avatar(2).name, avatar: avatar(2), snippet: "I've attached the updated invoice for June.", time: "1h", unread: true },
    { name: avatar(3).name, avatar: avatar(3), snippet: "Thanks for the quick turnaround on this!", time: "3h", unread: false },
    { name: avatar(4).name, avatar: avatar(4), snippet: "Can you review the latest mockups?", time: "1d", unread: false },
    { name: avatar(5).name, avatar: avatar(5), snippet: "Let's push the launch to next Friday.", time: "2d", unread: false },
];

export const MessagesMenu = () => (
    <TriggerFrame label="Open messages">
        {(close) => (
            <>
                <SlideoutMenu.Header onClose={close}>
                    <DrawerTitle title="Messages" />
                    <Input aria-label="Search messages" placeholder="Search messages" icon={MessageChatCircle} size="sm" className="mt-4" />
                </SlideoutMenu.Header>
                <SlideoutMenu.Content className="gap-0 px-0 md:px-0">
                    <ul className="flex w-full flex-col">
                        {conversations.map((conversation) => (
                            <li key={conversation.name} className="border-secondary flex items-start gap-3 border-b px-4 py-4 md:px-6">
                                <Avatar size="md" src={conversation.avatar.src} alt={conversation.avatar.alt} />
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-primary truncate text-sm font-semibold">{conversation.name}</p>
                                        <span className="text-tertiary shrink-0 text-xs">{conversation.time}</span>
                                    </div>
                                    <p className="text-tertiary mt-0.5 truncate text-sm">{conversation.snippet}</p>
                                </div>
                                {conversation.unread && <Dot size="sm" className="text-fg-brand-primary mt-1.5 shrink-0" aria-hidden="true" />}
                            </li>
                        ))}
                    </ul>
                </SlideoutMenu.Content>
                <SlideoutMenu.Footer>
                    <Button size="md" color="secondary" iconLeading={Plus} className="w-full">
                        New message
                    </Button>
                </SlideoutMenu.Footer>
            </>
        )}
    </TriggerFrame>
);

/* -------------------------------------------------------------------------------------------------
 * 5. Message chat menu
 * ---------------------------------------------------------------------------------------------- */

export const MessageChatMenu = () => {
    const phoenix = avatar(1);
    const bubbles = [
        { fromMe: false, text: "Hey! Do you have the latest design files ready?" },
        { fromMe: true, text: "Yes, just finished exporting them. Sending now." },
        { fromMe: false, text: "Perfect, thank you! I'll review them this afternoon." },
    ];

    return (
        <TriggerFrame label="Open chat">
            {(close) => (
                <>
                    <SlideoutMenu.Header onClose={close}>
                        <div className="flex items-center gap-3">
                            <Avatar size="md" src={phoenix.src} alt={phoenix.alt} status="online" />
                            <div>
                                <p className="text-md text-primary font-semibold">{phoenix.name}</p>
                                <p className="text-tertiary text-sm">Active now</p>
                            </div>
                        </div>
                    </SlideoutMenu.Header>
                    <SlideoutMenu.Content>
                        <ul className="flex w-full flex-col gap-3">
                            {bubbles.map((bubble, index) => (
                                <li key={index} className={cxJustify(bubble.fromMe)}>
                                    <p
                                        className={
                                            bubble.fromMe
                                                ? "bg-brand-solid max-w-[80%] rounded-2xl rounded-se-sm px-4 py-2.5 text-sm text-white"
                                                : "bg-secondary text-secondary max-w-[80%] rounded-2xl rounded-ss-sm px-4 py-2.5 text-sm"
                                        }
                                    >
                                        {bubble.text}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </SlideoutMenu.Content>
                    <SlideoutMenu.Footer className="flex items-center gap-2">
                        <ButtonUtility tooltip="Attach a file" size="sm" color="tertiary" icon={Paperclip} />
                        <Input aria-label="Type a message" placeholder="Type a message..." size="md" wrapperClassName="flex-1" />
                        <ButtonUtility tooltip="Add emoji" size="sm" color="tertiary" icon={FaceSmile} />
                        <Button size="md" iconLeading={Send01} onClick={close}>
                            Send
                        </Button>
                    </SlideoutMenu.Footer>
                </>
            )}
        </TriggerFrame>
    );
};

const cxJustify = (fromMe: boolean) => (fromMe ? "flex justify-end" : "flex justify-start");

/* -------------------------------------------------------------------------------------------------
 * 6. Payment method menu
 * ---------------------------------------------------------------------------------------------- */

export const PaymentMethodMenu = () => (
    <TriggerFrame label="Open payment methods">
        {(close) => (
            <>
                <SlideoutMenu.Header onClose={close}>
                    <DrawerTitle title="Payment methods" subtitle="Choose which card to use for your subscription." />
                </SlideoutMenu.Header>
                <SlideoutMenu.Content>
                    <RadioGroup aria-label="Payment method" defaultValue="visa" className="w-full gap-3">
                        <RadioButton
                            value="visa"
                            size="md"
                            label={
                                <span className="flex items-center gap-2">
                                    <VisaIcon className="h-6 w-auto shrink-0" />
                                    Visa ending in 4242
                                    <Badge size="sm" color="brand">
                                        Default
                                    </Badge>
                                </span>
                            }
                            hint="Expires 04/2029"
                        />
                        <RadioButton
                            value="mastercard"
                            size="md"
                            label={
                                <span className="flex items-center gap-2">
                                    <MastercardIcon className="h-6 w-auto shrink-0" />
                                    Mastercard ending in 8410
                                </span>
                            }
                            hint="Expires 09/2027"
                        />
                    </RadioGroup>

                    <Button color="secondary" size="md" iconLeading={Plus} className="w-full">
                        Add payment method
                    </Button>
                </SlideoutMenu.Content>
                <SlideoutMenu.Footer className="flex items-center justify-end gap-3">
                    <Button color="secondary" size="md" onClick={close}>
                        Cancel
                    </Button>
                    <Button size="md" onClick={close}>
                        Save
                    </Button>
                </SlideoutMenu.Footer>
            </>
        )}
    </TriggerFrame>
);

/* -------------------------------------------------------------------------------------------------
 * 7. Payment details menu
 * ---------------------------------------------------------------------------------------------- */

export const PaymentDetailsMenu = () => (
    <TriggerFrame label="Add card">
        {(close) => (
            <>
                <SlideoutMenu.Header onClose={close}>
                    <DrawerTitle title="Payment details" subtitle="Add a new card to your account." />
                </SlideoutMenu.Header>
                <SlideoutMenu.Content>
                    <Input label="Name on card" placeholder="Olivia Rhye" size="md" />
                    <PaymentInput label="Card number" placeholder="1234 1234 1234 1234" size="md" />
                    <div className="grid w-full grid-cols-2 gap-4">
                        <Input label="Expiry date" placeholder="MM/YY" size="md" />
                        <Input label="CVC" placeholder="123" size="md" />
                    </div>
                    <Checkbox label="Set as default payment method" defaultSelected />
                </SlideoutMenu.Content>
                <SlideoutMenu.Footer className="flex items-center justify-end gap-3">
                    <Button color="secondary" size="md" onClick={close}>
                        Cancel
                    </Button>
                    <Button size="md" onClick={close}>
                        Save card
                    </Button>
                </SlideoutMenu.Footer>
            </>
        )}
    </TriggerFrame>
);

/* -------------------------------------------------------------------------------------------------
 * 8. Plan menu
 * ---------------------------------------------------------------------------------------------- */

const plans = [
    { id: "basic", name: "Basic", price: "$10/mo", features: ["1 workspace", "Up to 3 members", "Community support"] },
    { id: "pro", name: "Pro", price: "$30/mo", features: ["5 workspaces", "Up to 20 members", "Priority support", "Advanced analytics"] },
    { id: "enterprise", name: "Enterprise", price: "$80/mo", features: ["Unlimited workspaces", "Unlimited members", "Dedicated support"] },
];

export const PlanMenu = () => (
    <TriggerFrame label="Change plan">
        {(close) => (
            <>
                <SlideoutMenu.Header onClose={close}>
                    <DrawerTitle title="Choose a plan" subtitle="Upgrade or downgrade your subscription at any time." />
                </SlideoutMenu.Header>
                <SlideoutMenu.Content>
                    <RadioGroup aria-label="Subscription plan" defaultValue="pro" className="w-full gap-3">
                        {plans.map((plan) => (
                            <RadioButton
                                key={plan.id}
                                value={plan.id}
                                size="md"
                                label={
                                    <span className="flex w-full items-center justify-between gap-2">
                                        <span className="text-primary font-semibold">{plan.name}</span>
                                        <span className="text-tertiary text-sm">{plan.price}</span>
                                    </span>
                                }
                                hint={
                                    <ul className="mt-1 flex flex-col gap-1">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-1.5">
                                                <CheckCircle aria-hidden="true" className="text-fg-success-primary size-3.5 shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                }
                            />
                        ))}
                    </RadioGroup>
                </SlideoutMenu.Content>
                <SlideoutMenu.Footer className="flex items-center justify-end gap-3">
                    <Button color="secondary" size="md" onClick={close}>
                        Cancel
                    </Button>
                    <Button size="md" onClick={close}>
                        Confirm plan
                    </Button>
                </SlideoutMenu.Footer>
            </>
        )}
    </TriggerFrame>
);

/* -------------------------------------------------------------------------------------------------
 * 9. Team members menu
 * ---------------------------------------------------------------------------------------------- */

const teamMembers = [
    { ...avatar(0), role: "Owner" },
    { ...avatar(6), role: "Admin" },
    { ...avatar(7), role: "Member" },
];

export const TeamMembersMenu = () => (
    <TriggerFrame label="Manage team">
        {(close) => (
            <>
                <SlideoutMenu.Header onClose={close}>
                    <DrawerTitle title="Team members" subtitle={`${teamMembers.length} members`} />
                </SlideoutMenu.Header>
                <SlideoutMenu.Content>
                    <div className="flex w-full items-center gap-3">
                        <Input aria-label="Invite by email" placeholder="Email address" size="md" wrapperClassName="flex-1" />
                        <Button size="md" iconLeading={UserPlus01}>
                            Invite
                        </Button>
                    </div>

                    <ul className="flex w-full flex-col gap-4">
                        {teamMembers.map((member) => (
                            <li key={member.username} className="flex items-center justify-between gap-3">
                                <AvatarLabelGroup size="md" src={member.src} alt={member.alt} title={member.name} subtitle={member.email} />
                                <div className="flex shrink-0 items-center gap-3">
                                    <Badge size="sm" color={member.role === "Owner" ? "brand" : "gray"}>
                                        {member.role}
                                    </Badge>
                                    {member.role !== "Owner" && (
                                        <Dropdown.Root>
                                            <Dropdown.DotsButton />
                                            <Dropdown.Popover className="w-44">
                                                <Dropdown.Menu>
                                                    <Dropdown.Item>Change role</Dropdown.Item>
                                                    <Dropdown.Item>Remove member</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown.Popover>
                                        </Dropdown.Root>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </SlideoutMenu.Content>
                <SlideoutMenu.Footer className="flex items-center justify-end">
                    <Button size="md" onClick={close}>
                        Done
                    </Button>
                </SlideoutMenu.Footer>
            </>
        )}
    </TriggerFrame>
);

/* -------------------------------------------------------------------------------------------------
 * 10. Filters menu
 * ---------------------------------------------------------------------------------------------- */

export const FiltersMenu = () => (
    <TriggerFrame label="Open filters" color="secondary">
        {(close) => (
            <>
                <SlideoutMenu.Header onClose={close}>
                    <div className="flex items-center justify-between gap-2">
                        <DrawerTitle title="Filters" />
                        <Button color="link-color" size="sm" className="me-8">
                            Clear all
                        </Button>
                    </div>
                </SlideoutMenu.Header>
                <SlideoutMenu.Content>
                    <fieldset className="flex w-full flex-col gap-3">
                        <legend className="text-primary text-sm font-semibold">Status</legend>
                        <Checkbox label="Active" defaultSelected />
                        <Checkbox label="Completed" />
                        <Checkbox label="Archived" />
                    </fieldset>

                    <fieldset className="border-secondary flex w-full flex-col gap-3 border-t pt-4">
                        <legend className="text-primary text-sm font-semibold">Category</legend>
                        <Checkbox label="Design" defaultSelected />
                        <Checkbox label="Engineering" defaultSelected />
                        <Checkbox label="Marketing" />
                    </fieldset>

                    <div className="border-secondary flex w-full flex-col gap-3 border-t pt-4">
                        <p className="text-primary text-sm font-semibold">Price range</p>
                        <div className="grid grid-cols-2 gap-4">
                            <Input aria-label="Minimum price" placeholder="Min" size="md" />
                            <Input aria-label="Maximum price" placeholder="Max" size="md" />
                        </div>
                    </div>
                </SlideoutMenu.Content>
                <SlideoutMenu.Footer className="flex items-center justify-end gap-3">
                    <Button color="secondary" size="md" onClick={close}>
                        Cancel
                    </Button>
                    <Button size="md" onClick={close}>
                        Apply filters
                    </Button>
                </SlideoutMenu.Footer>
            </>
        )}
    </TriggerFrame>
);

/* -------------------------------------------------------------------------------------------------
 * 11. Filters advanced empty state menu
 * ---------------------------------------------------------------------------------------------- */

export const FiltersAdvancedEmptyStateMenu = () => (
    <TriggerFrame label="Open advanced filters" color="secondary">
        {(close) => (
            <>
                <SlideoutMenu.Header onClose={close}>
                    <DrawerTitle title="Advanced filters" />
                </SlideoutMenu.Header>
                <SlideoutMenu.Content className="items-center justify-center text-center">
                    <FeaturedIcon icon={FilterLines} color="gray" theme="modern" size="lg" />
                    <div>
                        <p className="text-md text-primary font-semibold">No filters applied</p>
                        <p className="text-tertiary mt-1 text-sm">Add your first filter to narrow down the results.</p>
                    </div>
                    <Button size="md" iconLeading={Plus}>
                        Add filter
                    </Button>
                </SlideoutMenu.Content>
                <SlideoutMenu.Footer className="flex items-center justify-end gap-3">
                    <Button color="secondary" size="md" onClick={close}>
                        Cancel
                    </Button>
                    <Button size="md" onClick={close}>
                        Apply filters
                    </Button>
                </SlideoutMenu.Footer>
            </>
        )}
    </TriggerFrame>
);

/* -------------------------------------------------------------------------------------------------
 * 12. Filters advanced active menu
 * ---------------------------------------------------------------------------------------------- */

const fieldOptions = [
    { label: "Status", value: "status" },
    { label: "Assignee", value: "assignee" },
    { label: "Priority", value: "priority" },
];
const operatorOptions = [
    { label: "is", value: "is" },
    { label: "is not", value: "is-not" },
];

export const FiltersAdvancedActiveMenu = () => (
    <TriggerFrame label="Open advanced filters" color="secondary">
        {(close) => (
            <>
                <SlideoutMenu.Header onClose={close}>
                    <div className="flex items-center gap-2">
                        <DrawerTitle title="Advanced filters" />
                        <Badge size="sm" color="brand">
                            2 applied
                        </Badge>
                    </div>
                </SlideoutMenu.Header>
                <SlideoutMenu.Content>
                    <RadioGroup aria-label="Match type" defaultValue="all" orientation="horizontal" className="w-full flex-row gap-6">
                        <RadioButton value="all" label="Match all" />
                        <RadioButton value="any" label="Match any" />
                    </RadioGroup>

                    <div className="flex w-full flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <DemoNativeSelect aria-label="Field" options={fieldOptions} defaultValue="status" size="sm" className="flex-1" />
                            <DemoNativeSelect aria-label="Operator" options={operatorOptions} defaultValue="is" size="sm" className="w-28" />
                            <Input aria-label="Value" placeholder="In progress" size="sm" wrapperClassName="flex-1" />
                            <ButtonUtility tooltip="Remove filter" size="sm" color="tertiary" icon={Trash01} />
                        </div>
                        <div className="flex items-center gap-2">
                            <DemoNativeSelect aria-label="Field" options={fieldOptions} defaultValue="assignee" size="sm" className="flex-1" />
                            <DemoNativeSelect aria-label="Operator" options={operatorOptions} defaultValue="is" size="sm" className="w-28" />
                            <Input aria-label="Value" placeholder="Olivia Rhye" size="sm" wrapperClassName="flex-1" />
                            <ButtonUtility tooltip="Remove filter" size="sm" color="tertiary" icon={Trash01} />
                        </div>
                    </div>

                    <Button color="link-color" size="md" iconLeading={Plus}>
                        Add filter
                    </Button>
                </SlideoutMenu.Content>
                <SlideoutMenu.Footer className="flex items-center justify-end gap-3">
                    <Button color="secondary" size="md" onClick={close}>
                        Clear all
                    </Button>
                    <Button size="md" onClick={close}>
                        Apply filters
                    </Button>
                </SlideoutMenu.Footer>
            </>
        )}
    </TriggerFrame>
);

/* -------------------------------------------------------------------------------------------------
 * 13. File upload menu
 * ---------------------------------------------------------------------------------------------- */

export const FileUploadMenu = () => (
    <TriggerFrame label="Upload files" color="secondary">
        {(close) => (
            <>
                <SlideoutMenu.Header onClose={close}>
                    <DrawerTitle title="Upload files" subtitle="Attach supporting documents to this record." />
                </SlideoutMenu.Header>
                <SlideoutMenu.Content>
                    <FileUpload.DropZone hint="SVG, PNG, JPG or GIF (max. 800x400px)" />
                    <FileUpload.List>
                        <FileUpload.ListItemProgressFill
                            key="tech-design-requirements"
                            name="Tech design requirements.pdf"
                            size={720 * 1024}
                            type="pdf"
                            progress={100}
                        />
                        <FileUpload.ListItemProgressFill key="brand-guidelines" name="Brand guidelines.pdf" size={1024 * 1024} type="pdf" progress={60} />
                    </FileUpload.List>
                </SlideoutMenu.Content>
                <SlideoutMenu.Footer className="flex items-center justify-end gap-3">
                    <Button color="secondary" size="md" onClick={close}>
                        Cancel
                    </Button>
                    <Button size="md" onClick={close}>
                        Upload
                    </Button>
                </SlideoutMenu.Footer>
            </>
        )}
    </TriggerFrame>
);

/* -------------------------------------------------------------------------------------------------
 * 14. Labels menu
 * ---------------------------------------------------------------------------------------------- */

const labelColors = [
    { name: "Bug", color: "bg-utility-red-500", count: 12 },
    { name: "Feature", color: "bg-utility-blue-500", count: 24 },
    { name: "Design", color: "bg-utility-purple-500", count: 8 },
    { name: "Urgent", color: "bg-utility-orange-500", count: 3 },
];

export const LabelsMenu = () => (
    <TriggerFrame label="Manage labels" color="secondary">
        {(close) => (
            <>
                <SlideoutMenu.Header onClose={close}>
                    <DrawerTitle title="Labels" subtitle="Organize your issues with custom labels." />
                </SlideoutMenu.Header>
                <SlideoutMenu.Content>
                    <div className="flex w-full items-center gap-3">
                        <Input aria-label="New label name" placeholder="New label name" size="md" wrapperClassName="flex-1" />
                        <Button size="md" iconLeading={Plus}>
                            Add
                        </Button>
                    </div>

                    <ul className="flex w-full flex-col gap-1">
                        {labelColors.map((label) => (
                            <li key={label.name} className="hover:bg-primary_hover flex items-center justify-between gap-3 rounded-lg px-2 py-2.5">
                                <div className="flex items-center gap-2.5">
                                    <span aria-hidden="true" className={`size-2.5 shrink-0 rounded-full ${label.color}`} />
                                    <p className="text-secondary text-sm font-medium">{label.name}</p>
                                    <span className="text-tertiary text-sm">{label.count}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <ButtonUtility tooltip="Edit label" size="sm" color="tertiary" icon={Edit01} />
                                    <ButtonUtility tooltip="Delete label" size="sm" color="tertiary" icon={Trash01} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </SlideoutMenu.Content>
                <SlideoutMenu.Footer className="flex items-center justify-end">
                    <Button size="md" onClick={close}>
                        Done
                    </Button>
                </SlideoutMenu.Footer>
            </>
        )}
    </TriggerFrame>
);

/* -------------------------------------------------------------------------------------------------
 * 15. Project details menu
 * ---------------------------------------------------------------------------------------------- */

const statusOptions = [
    { label: "Planning", value: "planning" },
    { label: "In progress", value: "in-progress" },
    { label: "Completed", value: "completed" },
];

export const ProjectDetailsMenu = () => (
    <TriggerFrame label="Open project">
        {(close) => (
            <>
                <SlideoutMenu.Header onClose={close}>
                    <div className="flex items-center justify-between gap-2">
                        <DrawerTitle title="Project details" />
                        <Dropdown.Root>
                            <Dropdown.DotsButton className="me-8" />
                            <Dropdown.Popover className="w-44">
                                <Dropdown.Menu>
                                    <Dropdown.Item>Duplicate</Dropdown.Item>
                                    <Dropdown.Item>Archive</Dropdown.Item>
                                    <Dropdown.Item>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown.Popover>
                        </Dropdown.Root>
                    </div>
                </SlideoutMenu.Header>
                <SlideoutMenu.Content>
                    <Input label="Project name" defaultValue="Website redesign" size="md" />
                    <TextArea label="Description" defaultValue="Redesign the marketing site to reflect the new brand guidelines." rows={3} />
                    <DemoNativeSelect label="Status" options={statusOptions} defaultValue="in-progress" size="md" />

                    <div className="flex w-full items-center justify-between">
                        <div>
                            <p className="text-secondary text-sm font-medium">Owner</p>
                            <AvatarLabelGroup
                                size="sm"
                                className="mt-1.5"
                                src={avatar(0).src}
                                alt={avatar(0).alt}
                                title={avatar(0).name}
                                subtitle={avatar(0).username}
                            />
                        </div>
                        <div>
                            <p className="text-secondary text-sm font-medium">Team</p>
                            <div className="mt-1.5 flex items-center -space-x-2">
                                {[1, 2, 3].map((i) => (
                                    <Avatar key={i} size="sm" src={avatar(i).src} alt={avatar(i).alt} border />
                                ))}
                                <div className="bg-tertiary text-secondary ring-bg-primary flex size-8 items-center justify-center rounded-full text-xs font-medium ring-2">
                                    +2
                                </div>
                            </div>
                        </div>
                    </div>
                </SlideoutMenu.Content>
                <SlideoutMenu.Footer className="flex items-center justify-end gap-3">
                    <Button color="secondary" size="md" onClick={close}>
                        Cancel
                    </Button>
                    <Button size="md" onClick={close}>
                        Save changes
                    </Button>
                </SlideoutMenu.Footer>
            </>
        )}
    </TriggerFrame>
);

/* -------------------------------------------------------------------------------------------------
 * 16. Notification settings checkbox menu
 * ---------------------------------------------------------------------------------------------- */

export const NotificationSettingsCheckboxMenu = () => (
    <TriggerFrame label="Notification settings" color="secondary">
        {(close) => (
            <>
                <SlideoutMenu.Header onClose={close}>
                    <DrawerTitle title="Notification settings" subtitle="Choose how you want to be notified." />
                </SlideoutMenu.Header>
                <SlideoutMenu.Content>
                    <div className="flex w-full flex-col gap-4">
                        <Checkbox label="Email notifications" hint="Receive a summary of activity by email." defaultSelected />
                        <Checkbox label="Push notifications" hint="Get notified on your devices in real time." defaultSelected />
                        <Checkbox label="SMS notifications" hint="Receive urgent alerts by text message." />
                        <Checkbox label="Weekly digest" hint="A weekly roundup of what you missed." defaultSelected />
                    </div>
                </SlideoutMenu.Content>
                <SlideoutMenu.Footer className="flex items-center justify-end gap-3">
                    <Button color="secondary" size="md" onClick={close}>
                        Cancel
                    </Button>
                    <Button size="md" onClick={close}>
                        Save
                    </Button>
                </SlideoutMenu.Footer>
            </>
        )}
    </TriggerFrame>
);

/* -------------------------------------------------------------------------------------------------
 * 17. Notification settings button menu
 * ---------------------------------------------------------------------------------------------- */

const toggleSettings = [
    { label: "Comments", hint: "When someone comments on your work.", defaultSelected: true },
    { label: "Mentions", hint: "When someone mentions you directly.", defaultSelected: true },
    { label: "Task updates", hint: "When a task you follow changes status.", defaultSelected: false },
    { label: "Weekly digest", hint: "A weekly summary of account activity.", defaultSelected: true },
];

export const NotificationSettingsButtonMenu = () => (
    <TriggerFrame label="Notification preferences" color="secondary">
        {(close) => (
            <>
                <SlideoutMenu.Header onClose={close}>
                    <DrawerTitle title="Notification preferences" />
                </SlideoutMenu.Header>
                <SlideoutMenu.Content>
                    <ul className="flex w-full flex-col gap-5">
                        {toggleSettings.map((setting) => (
                            <li key={setting.label} className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-secondary text-sm font-medium">{setting.label}</p>
                                    <p className="text-tertiary mt-0.5 text-sm">{setting.hint}</p>
                                </div>
                                <Toggle aria-label={setting.label} defaultSelected={setting.defaultSelected} />
                            </li>
                        ))}
                    </ul>
                </SlideoutMenu.Content>
                <SlideoutMenu.Footer className="flex items-center justify-end">
                    <Button size="md" onClick={close}>
                        Save preferences
                    </Button>
                </SlideoutMenu.Footer>
            </>
        )}
    </TriggerFrame>
);

/* -------------------------------------------------------------------------------------------------
 * 18. Notifications menu
 * ---------------------------------------------------------------------------------------------- */

export const NotificationsMenu = () => (
    <TriggerFrame label="Open notifications" color="secondary">
        {(close) => (
            <>
                <SlideoutMenu.Header onClose={close}>
                    <div className="flex items-center justify-between gap-2">
                        <DrawerTitle title="Notifications" />
                        <Button color="link-color" size="sm" className="me-8">
                            Mark all as read
                        </Button>
                    </div>
                </SlideoutMenu.Header>
                <SlideoutMenu.Content className="gap-4">
                    <Notification
                        title="Your export is ready"
                        description="The report you requested has finished processing."
                        time="2 mins ago"
                        icon={CheckCircle}
                        color="success"
                    />
                    <Notification
                        title="Storage almost full"
                        description="You're using 92% of your available storage."
                        time="1 hour ago"
                        icon={AlertTriangle}
                        color="warning"
                    />
                    <Notification
                        title={`${avatar(2).name} mentioned you`}
                        description="“Can you take a look at this before Friday?”"
                        time="3 hours ago"
                        avatar={{ src: avatar(2).src, alt: avatar(2).alt }}
                    />
                    <Notification
                        title="New feature available"
                        description="Advanced filters are now available on all plans."
                        time="1 day ago"
                        icon={Bell01}
                        color="brand"
                    />
                </SlideoutMenu.Content>
                <SlideoutMenu.Footer className="flex items-center justify-end">
                    <Button color="secondary" size="md" className="w-full" onClick={close}>
                        View all notifications
                    </Button>
                </SlideoutMenu.Footer>
            </>
        )}
    </TriggerFrame>
);

/* -------------------------------------------------------------------------------------------------
 * 19. Order summary menu
 * ---------------------------------------------------------------------------------------------- */

const orderItems = [
    { name: "Wireless keyboard", qty: 1, price: 89, image: IMAGES.square[0] },
    { name: "Ergonomic mouse", qty: 2, price: 45, image: IMAGES.square[1] },
    { name: "USB-C dock", qty: 1, price: 129, image: IMAGES.square[2] },
];

export const OrderSummaryMenu = () => {
    const subtotal = orderItems.reduce((sum, item) => sum + item.qty * item.price, 0);
    const shipping = 12;
    const tax = Math.round(subtotal * 0.08);
    const total = subtotal + shipping + tax;

    return (
        <TriggerFrame label="View order">
            {(close) => (
                <>
                    <SlideoutMenu.Header onClose={close}>
                        <DrawerTitle title="Order summary" subtitle="Order #38291" />
                    </SlideoutMenu.Header>
                    <SlideoutMenu.Content>
                        <ul className="flex w-full flex-col gap-4">
                            {orderItems.map((item) => (
                                <li key={item.name} className="flex items-center gap-3">
                                    <img src={item.image.src} alt="" className="ring-secondary_alt size-14 shrink-0 rounded-lg object-cover ring-1" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-primary truncate text-sm font-medium">{item.name}</p>
                                        <p className="text-tertiary text-sm">Qty {item.qty}</p>
                                    </div>
                                    <p className="text-primary shrink-0 text-sm font-medium">${item.qty * item.price}</p>
                                </li>
                            ))}
                        </ul>

                        <dl className="border-secondary flex w-full flex-col gap-2 border-t pt-4 text-sm">
                            <div className="flex items-center justify-between">
                                <dt className="text-tertiary">Subtotal</dt>
                                <dd className="text-secondary">${subtotal}</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-tertiary">Shipping</dt>
                                <dd className="text-secondary">${shipping}</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-tertiary">Tax</dt>
                                <dd className="text-secondary">${tax}</dd>
                            </div>
                            <div className="border-secondary text-md flex items-center justify-between border-t pt-2 font-semibold">
                                <dt className="text-primary">Total</dt>
                                <dd className="text-primary">${total}</dd>
                            </div>
                        </dl>
                    </SlideoutMenu.Content>
                    <SlideoutMenu.Footer>
                        <Button size="md" className="w-full" onClick={close}>
                            Proceed to checkout
                        </Button>
                    </SlideoutMenu.Footer>
                </>
            )}
        </TriggerFrame>
    );
};

/* -------------------------------------------------------------------------------------------------
 * 20. Calendar event menu
 * ---------------------------------------------------------------------------------------------- */

export const CalendarEventMenu = () => (
    <TriggerFrame label="View event">
        {(close) => (
            <>
                <SlideoutMenu.Header onClose={close}>
                    <DrawerTitle title="Design team sync" />
                </SlideoutMenu.Header>
                <SlideoutMenu.Content>
                    <div className="flex items-start gap-3">
                        <Calendar aria-hidden="true" className="text-fg-quaternary mt-0.5 size-5 shrink-0" />
                        <p className="text-secondary text-sm">Mon, 12 Jan · 10:00 - 11:00 AM</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <MarkerPin01 aria-hidden="true" className="text-fg-quaternary mt-0.5 size-5 shrink-0" />
                        <p className="text-secondary text-sm">Conference room 2B</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <VideoRecorder aria-hidden="true" className="text-fg-quaternary mt-0.5 size-5 shrink-0" />
                        <div className="flex flex-1 items-center justify-between gap-2">
                            <p className="text-brand-secondary truncate text-sm">meet.proper.example/design-sync</p>
                            <ButtonUtility tooltip="Copy link" size="sm" color="tertiary" icon={Copy01} />
                        </div>
                    </div>

                    <div className="border-secondary flex w-full flex-col gap-2 border-t pt-4">
                        <p className="text-secondary text-sm font-medium">Attendees</p>
                        <div className="flex items-center -space-x-2">
                            {[0, 1, 2, 3].map((i) => (
                                <Avatar key={i} size="sm" src={avatar(i).src} alt={avatar(i).alt} border />
                            ))}
                            <div className="bg-tertiary text-secondary ring-bg-primary flex size-8 items-center justify-center rounded-full text-xs font-medium ring-2">
                                +2
                            </div>
                        </div>
                    </div>

                    <p className="border-secondary text-secondary w-full border-t pt-4 text-sm">
                        Weekly sync to review design progress, blockers and upcoming priorities.
                    </p>
                </SlideoutMenu.Content>
                <SlideoutMenu.Footer className="flex items-center justify-end gap-3">
                    <Button color="secondary" size="md" onClick={close}>
                        Edit event
                    </Button>
                    <Button size="md" iconLeading={VideoRecorder} onClick={close}>
                        Join meeting
                    </Button>
                </SlideoutMenu.Footer>
            </>
        )}
    </TriggerFrame>
);

/* -------------------------------------------------------------------------------------------------
 * 21. User settings menu
 * ---------------------------------------------------------------------------------------------- */

export const UserSettingsMenu = () => {
    const olivia = avatar(0);

    return (
        <TriggerFrame label="Account settings">
            {(close) => (
                <>
                    <SlideoutMenu.Header onClose={close}>
                        <DrawerTitle title="Account settings" />
                    </SlideoutMenu.Header>
                    <SlideoutMenu.Content>
                        <div className="flex items-center gap-4">
                            <Avatar size="xl" src={olivia.src} alt={olivia.alt} />
                            <Button color="secondary" size="sm">
                                Change photo
                            </Button>
                        </div>

                        <Input label="Full name" defaultValue={olivia.name} size="md" />
                        <Input label="Email address" type="email" defaultValue={olivia.email} size="md" />

                        <div className="border-secondary flex w-full flex-col gap-4 border-t pt-4">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-secondary text-sm font-medium">Two-factor authentication</p>
                                    <p className="text-tertiary mt-0.5 text-sm">Add an extra layer of security to your account.</p>
                                </div>
                                <Toggle aria-label="Two-factor authentication" defaultSelected />
                            </div>
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-secondary text-sm font-medium">Marketing emails</p>
                                    <p className="text-tertiary mt-0.5 text-sm">Receive product updates and offers.</p>
                                </div>
                                <Toggle aria-label="Marketing emails" />
                            </div>
                        </div>
                    </SlideoutMenu.Content>
                    <SlideoutMenu.Footer className="flex items-center justify-end gap-3">
                        <Button color="secondary" size="md" onClick={close}>
                            Cancel
                        </Button>
                        <Button size="md" onClick={close}>
                            Save changes
                        </Button>
                    </SlideoutMenu.Footer>
                </>
            )}
        </TriggerFrame>
    );
};

/* -------------------------------------------------------------------------------------------------
 * 22. AI assistant menu
 * ---------------------------------------------------------------------------------------------- */

export const AIAssistantMenu = () => (
    <TriggerFrame label="Open AI assistant">
        {(close) => (
            <>
                <SlideoutMenu.Header onClose={close}>
                    <div className="flex items-center gap-3">
                        <FeaturedIcon icon={Stars02} color="brand" theme="gradient" size="md" />
                        <DrawerTitle title="AI Assistant" />
                    </div>
                </SlideoutMenu.Header>
                <SlideoutMenu.Content>
                    <div className="flex justify-start">
                        <p className="bg-secondary text-secondary max-w-[85%] rounded-2xl rounded-ss-sm px-4 py-2.5 text-sm">
                            Hi! I can help you summarize documents, draft replies or answer questions about this project. What would you like to do?
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button color="secondary" size="sm">
                            Summarize this thread
                        </Button>
                        <Button color="secondary" size="sm">
                            Draft a reply
                        </Button>
                        <Button color="secondary" size="sm">
                            Find related files
                        </Button>
                    </div>
                </SlideoutMenu.Content>
                <SlideoutMenu.Footer className="flex items-center gap-2">
                    <Input aria-label="Ask anything" placeholder="Ask anything..." size="md" wrapperClassName="flex-1" />
                    <Button size="md" iconLeading={Send01} onClick={close}>
                        Send
                    </Button>
                </SlideoutMenu.Footer>
            </>
        )}
    </TriggerFrame>
);

/* -------------------------------------------------------------------------------------------------
 * 23. AI assistant message menu
 * ---------------------------------------------------------------------------------------------- */

export const AIAssistantMessageMenu = () => (
    <TriggerFrame label="View AI response">
        {(close) => (
            <>
                <SlideoutMenu.Header onClose={close}>
                    <DrawerTitle title="AI response" />
                </SlideoutMenu.Header>
                <SlideoutMenu.Content>
                    <div className="flex items-start gap-3">
                        <FeaturedIcon icon={Stars02} color="brand" theme="gradient" size="sm" />
                        <div className="bg-secondary text-secondary flex-1 rounded-2xl rounded-ss-sm px-4 py-3 text-sm">
                            Here's a summary of the thread: the team agreed to ship the redesign on the 12th, pending final review from design and QA. Two open
                            questions remain about the onboarding flow.
                        </div>
                    </div>
                    <div className="flex items-center gap-1 ps-11">
                        <ButtonUtility tooltip="Copy" size="sm" color="tertiary" icon={Copy01} />
                        <ButtonUtility tooltip="Regenerate" size="sm" color="tertiary" icon={RefreshCcw02} />
                        <ButtonUtility tooltip="Good response" size="sm" color="tertiary" icon={ThumbsUp} />
                        <ButtonUtility tooltip="Bad response" size="sm" color="tertiary" icon={ThumbsDown} />
                    </div>
                </SlideoutMenu.Content>
                <SlideoutMenu.Footer className="flex items-center gap-2">
                    <Input aria-label="Ask a follow-up" placeholder="Ask a follow-up..." size="md" wrapperClassName="flex-1" />
                    <Button size="md" iconLeading={Send01} onClick={close}>
                        Send
                    </Button>
                </SlideoutMenu.Footer>
            </>
        )}
    </TriggerFrame>
);

/* -------------------------------------------------------------------------------------------------
 * 24. Share project menu
 * ---------------------------------------------------------------------------------------------- */

const roleOptions = [
    { label: "Can view", value: "view" },
    { label: "Can edit", value: "edit" },
];

const sharedWith = [
    { ...avatar(0), role: "Owner" },
    { ...avatar(3), role: "Can edit" },
    { ...avatar(4), role: "Can view" },
];

export const ShareProjectMenu = () => (
    <TriggerFrame label="Share project">
        {(close) => (
            <>
                <SlideoutMenu.Header onClose={close}>
                    <DrawerTitle title="Share project" />
                </SlideoutMenu.Header>
                <SlideoutMenu.Content>
                    <div className="flex w-full items-center gap-2">
                        <Input aria-label="Add people by email" placeholder="Add people by email" icon={Mail01} size="md" wrapperClassName="flex-1" />
                        <DemoNativeSelect aria-label="Permission" options={roleOptions} defaultValue="view" size="md" className="w-32" />
                        <Button size="md">Invite</Button>
                    </div>

                    <ul className="flex w-full flex-col gap-4">
                        {sharedWith.map((person) => (
                            <li key={person.username} className="flex items-center justify-between gap-3">
                                <AvatarLabelGroup size="sm" src={person.src} alt={person.alt} title={person.name} subtitle={person.email} />
                                <Badge size="sm" color={person.role === "Owner" ? "brand" : "gray"}>
                                    {person.role}
                                </Badge>
                            </li>
                        ))}
                    </ul>

                    <div className="border-secondary flex w-full items-start justify-between gap-4 border-t pt-4">
                        <div className="flex items-start gap-2">
                            <Share07 aria-hidden="true" className="text-fg-quaternary mt-0.5 size-5 shrink-0" />
                            <div>
                                <p className="text-secondary text-sm font-medium">Anyone with the link</p>
                                <p className="text-tertiary mt-0.5 text-sm">Anyone with the link can view this project.</p>
                            </div>
                        </div>
                        <Toggle aria-label="Anyone with the link can view" />
                    </div>

                    <div className="flex w-full items-center gap-2">
                        <Input
                            aria-label="Shareable link"
                            value="https://proper.example.com/p/website-redesign"
                            isReadOnly
                            size="md"
                            wrapperClassName="flex-1"
                        />
                        <ButtonUtility tooltip="Copy link" size="sm" color="secondary" icon={Link01} />
                    </div>
                </SlideoutMenu.Content>
                <SlideoutMenu.Footer className="flex items-center justify-end">
                    <Button size="md" onClick={close}>
                        Done
                    </Button>
                </SlideoutMenu.Footer>
            </>
        )}
    </TriggerFrame>
);

/* -------------------------------------------------------------------------------------------------
 * 25. Create event menu
 * ---------------------------------------------------------------------------------------------- */

export const CreateEventMenu = () => (
    <TriggerFrame label="Create event">
        {(close) => (
            <>
                <SlideoutMenu.Header onClose={close}>
                    <DrawerTitle title="Create event" />
                </SlideoutMenu.Header>
                <SlideoutMenu.Content>
                    <Input label="Event title" placeholder="Design team sync" size="md" />
                    <div className="grid w-full grid-cols-3 gap-4">
                        <Input label="Date" type="date" size="md" className="col-span-3 md:col-span-1" />
                        <Input label="Start time" type="time" size="md" />
                        <Input label="End time" type="time" size="md" />
                    </div>
                    <Input label="Location" placeholder="Conference room 2B" icon={MarkerPin01} size="md" />
                    <Input label="Invite guests" placeholder="Add guests by email" icon={UserPlus01} size="md" />
                    <TextArea label="Description" placeholder="Add a description or agenda..." rows={3} />
                </SlideoutMenu.Content>
                <SlideoutMenu.Footer className="flex items-center justify-end gap-3">
                    <Button color="secondary" size="md" onClick={close}>
                        Cancel
                    </Button>
                    <Button size="md" onClick={close}>
                        Create event
                    </Button>
                </SlideoutMenu.Footer>
            </>
        )}
    </TriggerFrame>
);

/* -------------------------------------------------------------------------------------------------
 * 26. Integration menu
 * ---------------------------------------------------------------------------------------------- */

export const IntegrationMenu = () => {
    const integration = LOGOS[3];
    const account = AVATARS[0];

    return (
        <TriggerFrame label="Manage integration" color="secondary">
            {(close) => (
                <>
                    <SlideoutMenu.Header onClose={close}>
                        <div className="flex items-center gap-3">
                            <div className="bg-secondary ring-secondary_alt flex size-10 shrink-0 items-center justify-center rounded-lg ring-1">
                                <img src={integration.src} alt="" className="size-6" />
                            </div>
                            <DrawerTitle title={`${integration.name} integration`} />
                        </div>
                    </SlideoutMenu.Header>
                    <SlideoutMenu.Content>
                        <p className="text-secondary text-sm">Automatically sync records between this workspace and {integration.name} in both directions.</p>

                        <div className="border-secondary flex w-full items-center justify-between border-t pt-4">
                            <p className="text-secondary text-sm font-medium">Enable integration</p>
                            <Toggle aria-label="Enable integration" defaultSelected />
                        </div>

                        <fieldset className="border-secondary flex w-full flex-col gap-3 border-t pt-4">
                            <legend className="text-primary text-sm font-semibold">Permissions</legend>
                            <Checkbox label="Read records" defaultSelected />
                            <Checkbox label="Write records" defaultSelected />
                            <Checkbox label="Manage settings" />
                        </fieldset>

                        <div className="border-secondary flex w-full items-center justify-between gap-3 border-t pt-4">
                            <AvatarLabelGroup size="sm" src={account.src} alt={account.alt} title={`Connected as ${account.name}`} subtitle={account.email} />
                            <Button color="link-destructive" size="sm">
                                Disconnect
                            </Button>
                        </div>
                    </SlideoutMenu.Content>
                    <SlideoutMenu.Footer className="flex items-center justify-end gap-3">
                        <Button color="secondary" size="md" onClick={close}>
                            Cancel
                        </Button>
                        <Button size="md" onClick={close}>
                            Save
                        </Button>
                    </SlideoutMenu.Footer>
                </>
            )}
        </TriggerFrame>
    );
};
