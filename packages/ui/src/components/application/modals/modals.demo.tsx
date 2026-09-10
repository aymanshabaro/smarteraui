"use client";

import type { ReactNode } from "react";
import { CalendarDate } from "@internationalized/date";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
    AlertTriangle,
    ArrowLeft,
    ArrowRight,
    Calendar as CalendarIcon,
    Check,
    ChevronLeft,
    ChevronRight,
    Clock,
    Copy01,
    CreditCard01,
    Crop01,
    Edit01,
    Image01,
    Key01,
    Link01,
    Lock01,
    Mail01,
    MarkerPin01,
    MessageSquare01,
    Monitor04,
    Moon01,
    Palette,
    Play,
    Plus,
    SearchLg,
    Send01,
    Settings01,
    Share04,
    Stars02,
    Sun,
    Trash01,
    UploadCloud01,
    User01,
    UserPlus01,
    Users01,
    Zap,
} from "@properui/icons";
import { Calendar } from "@/components/application/date-picker/calendar";
import { FileUpload as FileUploadBase } from "@/components/application/file-upload/file-upload-base";
import { Dialog } from "@/components/application/modals/modal";
import { ModalBody, ModalFooter, ModalHeader, ModalPanel } from "@/components/application/modals/modal-parts";
import { Avatar } from "@/components/base/avatar/avatar";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { AvatarProfilePhoto } from "@/components/base/avatar/avatar-profile-photo";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { CloseButton } from "@/components/base/buttons/close-button";
import { SocialButton } from "@/components/base/buttons/social-button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Input, InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { PaymentInput } from "@/components/base/input/input-payment";
import { InputTags } from "@/components/base/input/input-tags";
import { PinInput } from "@/components/base/input/pin-input";
import { RadioButton, RadioGroup } from "@/components/base/radio-buttons/radio-buttons";
import { Select } from "@/components/base/select/select";
import { Slider } from "@/components/base/slider/slider";
import { TextEditor as TextEditorField } from "@/components/base/text-editor/text-editor";
import { TextArea } from "@/components/base/textarea/textarea";
import { Toggle } from "@/components/base/toggle/toggle";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { FigmaIcon } from "@/components/foundations/integration-icons";
import { ProperLogo } from "@/components/foundations/logo/proper-logo";
import { MastercardIcon, VisaIcon } from "@/components/foundations/payment-icons";
import { cx } from "@/utils/cx";
import { AVATARS, IMAGES, VIDEO_POSTER, avatar } from "@/utils/demo-assets";

/* -------------------------------------------------------------------------------------------------
 * Local helpers shared by the examples below.
 * -----------------------------------------------------------------------------------------------*/

/** A person row: avatar, name, supporting line and an optional trailing action. */
const PersonRow = ({ index, subtitle, action, className }: { index: number; subtitle?: ReactNode; action?: ReactNode; className?: string }) => {
    const person = avatar(index);

    return (
        <div className={cx("flex items-center gap-3", className)}>
            <Avatar src={person.src} alt={person.alt} size="md" />
            <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-secondary truncate text-sm font-medium">{person.name}</p>
                <p className="text-tertiary truncate text-sm">{subtitle ?? person.email}</p>
            </div>
            {action}
        </div>
    );
};

/** The overlapping avatar row used by the "stacked with team" examples. */
const AvatarRow = ({ count = 5 }: { count?: number }) => (
    <div className="flex items-center -space-x-2">
        {AVATARS.slice(0, count).map((person) => (
            <Avatar key={person.src} src={person.src} alt={person.alt} size="md" contrastBorder />
        ))}
    </div>
);

/** Carousel pagination dots. The first dot is always the active one so the demo stays deterministic. */
const CarouselDots = ({ count = 4 }: { count?: number }) => (
    <div className="flex items-center justify-center gap-2">
        {Array.from({ length: count }, (_, index) => (
            <span key={index} className={cx("size-2.5 rounded-full", index === 0 ? "bg-fg-brand-primary" : "bg-quaternary")} />
        ))}
    </div>
);

/** A framed section title used inside the larger settings modals. */
const SectionLabel = ({ children }: { children: ReactNode }) => <p className="text-secondary text-sm font-semibold">{children}</p>;

/** A selectable card used by the plan, payment-method and template examples. */
const OptionCard = ({ value, title, description, trailing }: { value: string; title: ReactNode; description?: ReactNode; trailing?: ReactNode }) => (
    <RadioButton
        value={value}
        className="border-secondary selected:border-brand selected:bg-brand-primary w-full rounded-xl border p-4 [&>div:last-child]:flex-1"
        label={
            <span className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2">{title}</span>
                {trailing}
            </span>
        }
        hint={description}
    />
);

/* -------------------------------------------------------------------------------------------------
 * 1. Modal example — the hero preview (the AI assistant modal, as on the reference page).
 * -----------------------------------------------------------------------------------------------*/

export const ModalExample = () => <AIAssistant />;

/* -------------------------------------------------------------------------------------------------
 * 2–7. Alert modals: stacked / horizontal, in brand, warning and destructive colours.
 * -----------------------------------------------------------------------------------------------*/

export const StackedLeftAligned = () => (
    <ModalPanel>
        <Dialog aria-label="Update available">
            <ModalHeader
                icon={Zap}
                title="Update available"
                description="A new version of the workspace is ready. Updating takes about a minute and your work is saved automatically."
            />
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Later
                </Button>
                <Button size="lg">Update now</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const WarningStackedLeftAligned = () => (
    <ModalPanel>
        <Dialog aria-label="Leave without saving?">
            <ModalHeader
                icon={AlertTriangle}
                color="warning"
                title="Leave without saving?"
                description="You have unsaved changes in this document. If you leave now, those changes will be lost."
            />
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Keep editing
                </Button>
                <Button size="lg">Leave page</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const DestructiveStackedLeftAligned = () => (
    <ModalPanel>
        <Dialog aria-label="Delete project">
            <ModalHeader
                icon={Trash01}
                color="error"
                title="Delete project"
                description="Are you sure you want to delete this project? This action cannot be undone and every file inside it will be removed."
            />
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg" color="primary-destructive">
                    Delete
                </Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const Horizontal = () => (
    <ModalPanel width="sm">
        <Dialog aria-label="Update available">
            <ModalHeader
                layout="horizontal"
                icon={Zap}
                title="Update available"
                description="A new version of the workspace is ready. Updating takes about a minute and your work is saved automatically."
            />
            <ModalFooter align="end">
                <Button size="lg" color="secondary">
                    Later
                </Button>
                <Button size="lg">Update now</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const WarningHorizontal = () => (
    <ModalPanel width="sm">
        <Dialog aria-label="Leave without saving?">
            <ModalHeader
                layout="horizontal"
                icon={AlertTriangle}
                color="warning"
                title="Leave without saving?"
                description="You have unsaved changes in this document. If you leave now, those changes will be lost."
            />
            <ModalFooter align="end">
                <Button size="lg" color="secondary">
                    Keep editing
                </Button>
                <Button size="lg">Leave page</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const DestructiveHorizontal = () => (
    <ModalPanel width="sm">
        <Dialog aria-label="Delete project">
            <ModalHeader
                layout="horizontal"
                icon={Trash01}
                color="error"
                title="Delete project"
                description="Are you sure you want to delete this project? This action cannot be undone and every file inside it will be removed."
            />
            <ModalFooter align="end">
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg" color="primary-destructive">
                    Delete
                </Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

/* -------------------------------------------------------------------------------------------------
 * 8–10. Authentication modals.
 * -----------------------------------------------------------------------------------------------*/

export const Login = () => (
    <ModalPanel width="md">
        <Dialog aria-label="Log in to your account">
            <div className="relative flex flex-col gap-4 px-4 pt-4 sm:px-6 sm:pt-6">
                <ProperLogo className="h-8 w-max" />
                <div className="flex flex-col gap-1">
                    <h2 className="text-primary text-md font-semibold sm:text-lg">Log in to your account</h2>
                    <p className="text-tertiary text-sm">Welcome back! Please enter your details.</p>
                </div>
                <CloseButton size="sm" slot={null} className="absolute end-3 top-3" />
            </div>

            <ModalBody>
                <Input isRequired label="Email" type="email" placeholder="Enter your email" />
                <Input isRequired label="Password" type="password" placeholder="••••••••" />
                <div className="flex items-center justify-between gap-3">
                    <Checkbox label="Remember for 30 days" />
                    <Button color="link-color" size="md">
                        Forgot password
                    </Button>
                </div>
            </ModalBody>

            <div className="flex flex-col gap-3 px-4 pb-4 sm:px-6 sm:pb-6">
                <Button size="lg" className="w-full">
                    Sign in
                </Button>
                <SocialButton social="google" theme="color" className="w-full">
                    Sign in with Google
                </SocialButton>
                <p className="text-tertiary text-center text-sm">
                    Don’t have an account?{" "}
                    <Button color="link-color" size="md">
                        Sign up
                    </Button>
                </p>
            </div>
        </Dialog>
    </ModalPanel>
);

export const Signup01 = () => (
    <ModalPanel width="md">
        <Dialog aria-label="Create an account">
            <div className="relative flex flex-col gap-4 px-4 pt-4 sm:px-6 sm:pt-6">
                <ProperLogo className="h-8 w-max" />
                <div className="flex flex-col gap-1">
                    <h2 className="text-primary text-md font-semibold sm:text-lg">Create an account</h2>
                    <p className="text-tertiary text-sm">Start your 30-day free trial. No credit card required.</p>
                </div>
                <CloseButton size="sm" slot={null} className="absolute end-3 top-3" />
            </div>

            <ModalBody>
                <Input isRequired label="Name" placeholder="Enter your name" />
                <Input isRequired label="Email" type="email" placeholder="Enter your email" />
                <Input isRequired label="Password" type="password" placeholder="Create a password" hint="Must be at least 8 characters." />
            </ModalBody>

            <div className="flex flex-col gap-3 px-4 pb-4 sm:px-6 sm:pb-6">
                <Button size="lg" className="w-full">
                    Get started
                </Button>
                <SocialButton social="google" theme="color" className="w-full">
                    Sign up with Google
                </SocialButton>
                <p className="text-tertiary text-center text-sm">
                    Already have an account?{" "}
                    <Button color="link-color" size="md">
                        Log in
                    </Button>
                </p>
            </div>
        </Dialog>
    </ModalPanel>
);

export const Signup02 = () => (
    <ModalPanel width="md">
        <Dialog aria-label="Create your workspace">
            <ModalHeader
                icon={UserPlus01}
                title="Create your workspace"
                description="Invite your team later — you can always add people once the space is set up."
            />

            <ModalBody>
                <Input isRequired label="Workspace name" placeholder="Acme Inc." />
                <Input isRequired label="Work email" type="email" placeholder="you@acme.com" />
                <Input isRequired label="Password" type="password" placeholder="Create a password" hint="Must be at least 8 characters." />
                <Checkbox label="I agree to the Terms of Service and Privacy Policy" />
            </ModalBody>

            <div className="flex flex-col gap-3 px-4 pb-4 sm:px-6 sm:pb-6">
                <Button size="lg" className="w-full">
                    Create workspace
                </Button>
                <SocialButton social="google" theme="color" className="w-full">
                    Sign up with Google
                </SocialButton>
            </div>
        </Dialog>
    </ModalPanel>
);

/* -------------------------------------------------------------------------------------------------
 * 11–16. Modals with a single field or control group.
 * -----------------------------------------------------------------------------------------------*/

export const Checkboxes = () => (
    <ModalPanel>
        <Dialog aria-label="Email notifications">
            <ModalHeader icon={Mail01} title="Email notifications" description="Choose what we should email you about. You can change this at any time." />
            <ModalBody>
                <Checkbox defaultSelected label="Comments" hint="Someone comments on one of your documents." />
                <Checkbox defaultSelected label="Mentions" hint="Someone mentions you in a comment or a task." />
                <Checkbox label="Weekly digest" hint="A summary of what changed in your workspace." />
            </ModalBody>
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Save preferences</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const Toggles = () => (
    <ModalPanel>
        <Dialog aria-label="Workspace settings">
            <ModalHeader icon={Settings01} title="Workspace settings" description="Control how members join and what they can see by default." />
            <ModalBody>
                <Toggle size="md" defaultSelected label="Public profile" hint="Anyone with the link can view this workspace." />
                <Toggle size="md" label="Allow guest access" hint="Guests can open shared documents without an account." />
                <Toggle size="md" defaultSelected label="Weekly summary" hint="Send members a recap every Monday morning." />
            </ModalBody>
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Save changes</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const LinkField = () => (
    <ModalPanel>
        <Dialog aria-label="Share this project">
            <ModalHeader icon={Link01} title="Share this project" description="Anyone with this link can view the project in read-only mode." />
            <ModalBody>
                <InputGroup
                    label="Project link"
                    trailingAddon={
                        <Button color="secondary" iconLeading={Copy01}>
                            Copy
                        </Button>
                    }
                >
                    <InputBase readOnly value="proper.example/p/quarterly-review" />
                </InputGroup>
            </ModalBody>
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Done</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const Dropdown = () => (
    <ModalPanel>
        <Dialog aria-label="Move project">
            <ModalHeader icon={Users01} title="Move project" description="Pick the team this project should belong to." />
            <ModalBody>
                <Select label="Team" placeholder="Select a team" defaultSelectedKey="design">
                    <Select.Item id="design">Design</Select.Item>
                    <Select.Item id="engineering">Engineering</Select.Item>
                    <Select.Item id="marketing">Marketing</Select.Item>
                    <Select.Item id="operations">Operations</Select.Item>
                </Select>
            </ModalBody>
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Move project</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const InputField = () => (
    <ModalPanel>
        <Dialog aria-label="Rename project">
            <ModalHeader icon={Edit01} title="Rename project" description="Give this project a name your team will recognise." />
            <ModalBody>
                <Input aria-label="Project name" defaultValue="Quarterly review" placeholder="Project name" />
            </ModalBody>
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Rename</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const Labels = () => (
    <ModalPanel>
        <Dialog aria-label="Add a label">
            <ModalHeader icon={Edit01} title="Add a label" description="Labels help your team filter and group work across projects." />
            <ModalBody>
                <Input isRequired label="Label name" placeholder="e.g. Needs review" hint="Keep it under 24 characters." />
            </ModalBody>
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Create label</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

/* -------------------------------------------------------------------------------------------------
 * 17–22. People: access requests, invites and team rows.
 * -----------------------------------------------------------------------------------------------*/

export const AccessRequest = () => (
    <ModalPanel>
        <Dialog aria-label="Access request">
            <ModalHeader
                media={<Avatar src={avatar(0).src} alt={avatar(0).alt} size="lg" />}
                hasBackgroundPattern={false}
                title={`${avatar(0).name} requests access`}
                description="They asked to join “Quarterly review”. Approving gives them edit access to every file in the project."
            />
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Deny
                </Button>
                <Button size="lg">Approve</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const EmailInvite = () => (
    <ModalPanel>
        <Dialog aria-label="Invite team members">
            <ModalHeader icon={Mail01} title="Invite team members" description="Send an invite by email. They will get access as soon as they accept." />
            <ModalBody>
                <Input aria-label="Email address" type="email" icon={Mail01} placeholder="you@company.com" />
                <Button color="link-color" size="md" iconLeading={Plus}>
                    Add another
                </Button>
            </ModalBody>
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Send invites</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const UserInvite = () => (
    <ModalPanel width="md">
        <Dialog aria-label="Add people to Quarterly review">
            <ModalHeader icon={UserPlus01} title="Add people" description="Pick who should have access to “Quarterly review”." />
            <ModalBody>
                <Input aria-label="Search people" icon={SearchLg} placeholder="Search by name or email" />
                <ul className="flex flex-col gap-1">
                    {[0, 1, 2, 3].map((index) => (
                        <li key={index}>
                            <PersonRow
                                index={index}
                                className="rounded-lg p-2"
                                action={<Checkbox aria-label={`Select ${avatar(index).name}`} size="md" defaultSelected={index < 2} />}
                            />
                        </li>
                    ))}
                </ul>
            </ModalBody>
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Add people</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const StackedWithTeam = () => (
    <ModalPanel>
        <Dialog aria-label="Share with your team">
            <ModalHeader icon={Users01} title="Share with your team" description="Everyone below already has access to this workspace." />
            <ModalBody>
                <AvatarRow />
            </ModalBody>
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Share</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const StackedWithTeamAndLink = () => (
    <ModalPanel>
        <Dialog aria-label="Share with your team">
            <ModalHeader icon={Users01} title="Share with your team" description="Everyone below already has access to this workspace." />
            <ModalBody>
                <AvatarRow />
                <InputGroup
                    label="Share link"
                    trailingAddon={
                        <Button color="secondary" iconLeading={Copy01}>
                            Copy
                        </Button>
                    }
                >
                    <InputBase readOnly value="proper.example/p/quarterly-review" />
                </InputGroup>
            </ModalBody>
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Share</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const StackedWithTeamAndInvites = () => (
    <ModalPanel width="md">
        <Dialog aria-label="Share with your team">
            <ModalHeader icon={Users01} title="Share with your team" description="Everyone below already has access to this workspace." />
            <ModalBody>
                <AvatarRow />
                <div className="flex flex-col gap-3">
                    <Input aria-label="Invite by email" type="email" icon={Mail01} placeholder="you@company.com" />
                    <ul className="flex flex-col gap-3">
                        {[0, 1, 2].map((index) => (
                            <li key={index}>
                                <PersonRow
                                    index={index}
                                    action={
                                        <Badge size="sm" type="pill-color" color={index === 0 ? "brand" : "gray"}>
                                            {index === 0 ? "Owner" : "Can edit"}
                                        </Badge>
                                    }
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Send invites</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

/* -------------------------------------------------------------------------------------------------
 * 23–25. Codes and passwords.
 * -----------------------------------------------------------------------------------------------*/

export const VerificationCode = () => (
    <ModalPanel>
        <Dialog aria-label="Check your email">
            <ModalHeader icon={Mail01} title="Check your email" description={`We sent a 4-digit code to ${avatar(0).email}.`} />
            <ModalBody className="items-center">
                <PinInput size="md">
                    <PinInput.Group maxLength={4} pattern={REGEXP_ONLY_DIGITS} aria-label="Verification code">
                        <PinInput.Slot index={0} />
                        <PinInput.Slot index={1} />
                        <PinInput.Slot index={2} />
                        <PinInput.Slot index={3} />
                    </PinInput.Group>
                </PinInput>
            </ModalBody>
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Verify email</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const TwoFactorCode = () => (
    <ModalPanel width="sm">
        <Dialog aria-label="Two-factor authentication">
            <ModalHeader icon={Lock01} title="Two-factor authentication" description="Enter the 6-digit code from your authenticator app to continue." />
            <ModalBody className="items-center">
                <PinInput size="md">
                    <PinInput.Group maxLength={6} pattern={REGEXP_ONLY_DIGITS} aria-label="Two-factor code">
                        <PinInput.Slot index={0} />
                        <PinInput.Slot index={1} />
                        <PinInput.Slot index={2} />
                        <PinInput.Separator />
                        <PinInput.Slot index={3} />
                        <PinInput.Slot index={4} />
                        <PinInput.Slot index={5} />
                    </PinInput.Group>
                </PinInput>
                <p className="text-tertiary text-center text-sm">
                    Didn’t get a code?{" "}
                    <Button color="link-color" size="md">
                        Resend
                    </Button>
                </p>
            </ModalBody>
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Continue</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const PasswordPrompt = () => (
    <ModalPanel>
        <Dialog aria-label="Confirm your password">
            <ModalHeader icon={Key01} title="Confirm your password" description="For your security, please re-enter your password before continuing." />
            <ModalBody>
                <Input isRequired label="Password" type="password" placeholder="••••••••" />
            </ModalBody>
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Confirm</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

/* -------------------------------------------------------------------------------------------------
 * 26–28. Media modals.
 * -----------------------------------------------------------------------------------------------*/

export const CenteredPhoto = () => (
    <ModalPanel className="overflow-hidden">
        <Dialog aria-label="New in Proper UI">
            <div className="relative">
                <img src={IMAGES.landscape[0].src} alt="" className="h-45 w-full object-cover" />
                <CloseButton size="sm" theme="dark" slot={null} className="absolute end-3 top-3" />
            </div>
            <div className="flex flex-col gap-1 px-4 pt-4 text-center sm:px-6 sm:pt-6">
                <h2 className="text-primary text-md font-semibold sm:text-lg">Boards are here</h2>
                <p className="text-tertiary text-sm">Plan a sprint, group ideas or track a launch — all on a canvas your whole team can edit.</p>
            </div>
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Not now
                </Button>
                <Button size="lg">Try boards</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const CenteredPhotoCarousel = () => (
    <ModalPanel className="overflow-hidden">
        <Dialog aria-label="What’s new">
            <div className="relative">
                <img src={IMAGES.landscape[1].src} alt="" className="h-45 w-full object-cover" />
                <CloseButton size="sm" theme="dark" slot={null} className="absolute end-3 top-3" />
            </div>
            <div className="flex flex-col gap-1 px-4 pt-4 text-center sm:px-6 sm:pt-6">
                <h2 className="text-primary text-md font-semibold sm:text-lg">Faster search</h2>
                <p className="text-tertiary text-sm">Results now appear as you type, across every project you have access to.</p>
            </div>
            <div className="px-4 pt-5 sm:px-6">
                <CarouselDots />
            </div>
            <ModalFooter align="between">
                <Button size="lg" color="link-gray" iconLeading={ArrowLeft}>
                    Back
                </Button>
                <Button size="lg" iconTrailing={ArrowRight}>
                    Next
                </Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const CenteredVideoCarousel = () => (
    <ModalPanel width="md" className="overflow-hidden">
        <Dialog aria-label="Take the tour">
            <div className="bg-secondary relative">
                <img src={VIDEO_POSTER.src} alt="" className="h-60 w-full object-cover" />
                <CloseButton size="sm" theme="dark" slot={null} className="absolute end-3 top-3" />
                <Button
                    aria-label="Play the tour video"
                    color="secondary"
                    size="xl"
                    iconLeading={Play}
                    className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full rtl:translate-x-1/2"
                />
            </div>
            <div className="flex flex-col gap-1 px-4 pt-4 text-center sm:px-6 sm:pt-6">
                <h2 className="text-primary text-md font-semibold sm:text-lg">Take the 2-minute tour</h2>
                <p className="text-tertiary text-sm">See how projects, boards and reviews fit together before you invite the rest of your team.</p>
            </div>
            <div className="px-4 pt-5 sm:px-6">
                <CarouselDots count={3} />
            </div>
            <ModalFooter align="between">
                <Button size="lg" color="link-gray" iconLeading={ArrowLeft}>
                    Back
                </Button>
                <Button size="lg" iconTrailing={ArrowRight}>
                    Next
                </Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

/* -------------------------------------------------------------------------------------------------
 * 29–33. Billing.
 * -----------------------------------------------------------------------------------------------*/

export const PaymentDetails = () => (
    <ModalPanel width="sm">
        <Dialog aria-label="Payment details">
            <ModalHeader icon={CreditCard01} title="Payment details" description="Update the card we charge for your monthly subscription." />
            <ModalBody>
                <Input isRequired label="Name on card" placeholder={avatar(0).name} />
                <PaymentInput isRequired label="Card number" placeholder="0000 0000 0000 0000" />
                <div className="flex gap-3">
                    <Input isRequired label="Expiry" placeholder="MM / YY" className="flex-1" />
                    <Input isRequired label="CVV" placeholder="123" className="flex-1" />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Save card</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const PaymentDetailsWithImage = () => (
    <ModalPanel width="md" className="overflow-hidden">
        <Dialog aria-label="Confirm your purchase">
            <div className="relative">
                <img src={IMAGES.landscape[2].src} alt="" className="h-40 w-full object-cover" />
                <CloseButton size="sm" theme="dark" slot={null} className="absolute end-3 top-3" />
            </div>
            <div className="flex flex-col gap-1 px-4 pt-4 sm:px-6 sm:pt-6">
                <h2 className="text-primary text-md font-semibold sm:text-lg">Confirm your purchase</h2>
                <p className="text-tertiary text-sm">Proper UI Pro, billed annually at $120 per seat.</p>
            </div>
            <ModalBody>
                <Input isRequired label="Name on card" placeholder={avatar(0).name} />
                <PaymentInput isRequired label="Card number" placeholder="0000 0000 0000 0000" />
                <div className="flex gap-3">
                    <Input isRequired label="Expiry" placeholder="MM / YY" className="flex-1" />
                    <Input isRequired label="CVV" placeholder="123" className="flex-1" />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Pay $120.00</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const Plan01 = () => (
    <ModalPanel width="md">
        <Dialog aria-label="Change your plan">
            <ModalHeader icon={Zap} title="Change your plan" description="Upgrade or downgrade at any time. Changes take effect on your next invoice." />
            <ModalBody>
                <RadioGroup aria-label="Plan" defaultValue="pro" size="md" className="gap-3">
                    <OptionCard
                        value="basic"
                        title="Basic"
                        description="Up to 5 projects and 2 GB of storage."
                        trailing={<span className="text-secondary text-sm font-semibold">$10/mth</span>}
                    />
                    <OptionCard
                        value="pro"
                        title="Pro"
                        description="Unlimited projects and 100 GB of storage."
                        trailing={<span className="text-secondary text-sm font-semibold">$20/mth</span>}
                    />
                    <OptionCard
                        value="enterprise"
                        title="Enterprise"
                        description="Advanced controls, SSO and priority support."
                        trailing={<span className="text-secondary text-sm font-semibold">$40/mth</span>}
                    />
                </RadioGroup>
            </ModalBody>
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Confirm plan</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const Plan02 = () => (
    <ModalPanel width="md">
        <Dialog aria-label="Upgrade to Pro">
            <ModalHeader icon={Zap} title="Upgrade to Pro" description="Everything in Basic, plus the features your team keeps asking for." />
            <ModalBody>
                <div className="border-secondary flex items-baseline gap-2 rounded-xl border p-4">
                    <span className="text-primary text-display-sm font-semibold">$20</span>
                    <span className="text-tertiary text-sm">per seat, per month</span>
                </div>
                <ul className="flex flex-col gap-3">
                    {["Unlimited projects and boards", "100 GB of shared storage", "Advanced permissions and audit log", "Priority support within 4 hours"].map(
                        (feature) => (
                            <li key={feature} className="flex items-center gap-3">
                                <FeaturedIcon icon={Check} size="sm" color="success" theme="light" />
                                <span className="text-tertiary text-sm">{feature}</span>
                            </li>
                        ),
                    )}
                </ul>
            </ModalBody>
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Maybe later
                </Button>
                <Button size="lg">Upgrade now</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const PaymentMethod = () => (
    <ModalPanel width="md">
        <Dialog aria-label="Choose a payment method">
            <ModalHeader icon={CreditCard01} title="Payment method" description="Pick the card we should charge for this workspace." />
            <ModalBody>
                <RadioGroup aria-label="Payment method" defaultValue="visa" size="md" className="gap-3">
                    <OptionCard
                        value="visa"
                        title={
                            <>
                                <VisaIcon className="h-6 w-max" />
                                <span>Visa ending in 1234</span>
                            </>
                        }
                        description="Expiry 06/2028"
                    />
                    <OptionCard
                        value="mastercard"
                        title={
                            <>
                                <MastercardIcon className="h-6 w-max" />
                                <span>Mastercard ending in 5678</span>
                            </>
                        }
                        description="Expiry 11/2027"
                    />
                </RadioGroup>
                <Button color="link-color" size="md" iconLeading={Plus}>
                    Add new payment method
                </Button>
            </ModalBody>
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Save</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

/* -------------------------------------------------------------------------------------------------
 * 34–37. Pickers and lists.
 * -----------------------------------------------------------------------------------------------*/

export const DatePicker = () => (
    <ModalPanel className="w-max">
        <Dialog aria-label="Pick a date">
            <ModalHeader icon={CalendarIcon} title="Pick a date" description="Choose the day this project should go live." />
            <ModalBody>
                <Calendar aria-label="Launch date" defaultValue={new CalendarDate(2026, 9, 9)} defaultFocusedValue={new CalendarDate(2026, 9, 9)} />
            </ModalBody>
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Apply</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const FileUpload = () => (
    <ModalPanel width="md">
        <Dialog aria-label="Upload files">
            <ModalHeader icon={UploadCloud01} title="Upload files" description="Attach up to 10 files to this project." />
            <ModalBody>
                <FileUploadBase.Root>
                    <FileUploadBase.DropZone hint="SVG, PNG, JPG or GIF (max. 800×400px)" />
                    <FileUploadBase.List>
                        <FileUploadBase.ListItemProgressBar name="quarterly-review.pdf" size={1_200_000} progress={100} type="pdf" />
                        <FileUploadBase.ListItemProgressBar name="cover-image.png" size={720_000} progress={45} type="img" />
                    </FileUploadBase.List>
                </FileUploadBase.Root>
            </ModalBody>
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Attach files</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const ProfileSettings = () => (
    <ModalPanel width="lg" className="overflow-hidden">
        <Dialog aria-label="Profile settings">
            <div className="relative">
                <img src={IMAGES.landscape[3].src} alt="" className="h-30 w-full object-cover" />
                <CloseButton size="sm" theme="dark" slot={null} className="absolute end-3 top-3" />
            </div>

            <div className="-mt-9 flex flex-col gap-4 px-4 sm:px-6">
                <AvatarProfilePhoto size="sm" src={avatar(0).src} alt={avatar(0).alt} />
                <div className="flex flex-col gap-1">
                    <h2 className="text-primary text-md font-semibold sm:text-lg">Profile settings</h2>
                    <p className="text-tertiary text-sm">Update your photo and personal details here.</p>
                </div>
            </div>

            <ModalBody>
                <div className="flex flex-col gap-4 sm:flex-row">
                    <Input isRequired label="First name" defaultValue="Olivia" className="flex-1" />
                    <Input isRequired label="Last name" defaultValue="Rhye" className="flex-1" />
                </div>
                <Input isRequired label="Email" type="email" icon={Mail01} defaultValue={avatar(0).email} />
                <TextArea label="Bio" rows={3} defaultValue="Product designer working on the design system." hint="Write a short introduction." />
            </ModalBody>

            <ModalFooter align="end">
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Save changes</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const UserSelection = () => (
    <ModalPanel>
        <Dialog aria-label="Assign this task">
            <ModalHeader icon={User01} title="Assign this task" description="Only people with access to the project are listed." />
            <ModalBody>
                <RadioGroup aria-label="Assignee" defaultValue="0" size="md" className="gap-1">
                    {[0, 1, 2, 3].map((index) => (
                        <RadioButton
                            key={index}
                            value={String(index)}
                            className="hover:bg-primary_hover w-full flex-row-reverse rounded-lg p-2 [&>div:last-child]:flex-1"
                            label={
                                <AvatarLabelGroup
                                    size="md"
                                    src={avatar(index).src}
                                    alt={avatar(index).alt}
                                    title={avatar(index).name}
                                    subtitle={avatar(index).email}
                                />
                            }
                        />
                    ))}
                </RadioGroup>
            </ModalBody>
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Assign</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

/* -------------------------------------------------------------------------------------------------
 * 38–39. Forms.
 * -----------------------------------------------------------------------------------------------*/

export const Form01 = () => (
    <ModalPanel width="xl">
        <Dialog aria-label="Add a team member">
            <ModalHeader icon={UserPlus01} title="Add a team member" description="They will receive an email invite with the access you choose here." />
            <ModalBody>
                <div className="flex flex-col gap-4 sm:flex-row">
                    <Input isRequired label="First name" placeholder="Olivia" className="flex-1" />
                    <Input isRequired label="Last name" placeholder="Rhye" className="flex-1" />
                </div>
                <Input isRequired label="Email address" type="email" icon={Mail01} placeholder="you@company.com" />
                <div className="flex flex-col gap-4 sm:flex-row">
                    <Select label="Role" placeholder="Select a role" defaultSelectedKey="editor" className="flex-1">
                        <Select.Item id="viewer">Viewer</Select.Item>
                        <Select.Item id="editor">Editor</Select.Item>
                        <Select.Item id="admin">Admin</Select.Item>
                    </Select>
                    <Select label="Team" placeholder="Select a team" defaultSelectedKey="design" className="flex-1">
                        <Select.Item id="design">Design</Select.Item>
                        <Select.Item id="engineering">Engineering</Select.Item>
                        <Select.Item id="marketing">Marketing</Select.Item>
                    </Select>
                </div>
                <TextArea label="Personal note" rows={3} placeholder="Add a short note to the invite email." />
            </ModalBody>
            <ModalFooter align="end">
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Send invite</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const Form02 = () => (
    <ModalPanel width="xl">
        <Dialog aria-label="Report an issue">
            <ModalHeader icon={AlertTriangle} color="warning" title="Report an issue" description="Tell us what happened and we will look into it." />
            <ModalBody className="gap-6">
                <div className="flex flex-col gap-4">
                    <SectionLabel>What went wrong?</SectionLabel>
                    <Select label="Issue type" placeholder="Select an issue type" defaultSelectedKey="bug">
                        <Select.Item id="bug">Something is broken</Select.Item>
                        <Select.Item id="billing">Billing question</Select.Item>
                        <Select.Item id="feedback">Product feedback</Select.Item>
                    </Select>
                    <TextArea isRequired label="Description" rows={4} placeholder="Describe the issue in as much detail as you can." />
                </div>

                <div className="flex flex-col gap-4">
                    <SectionLabel>How urgent is it?</SectionLabel>
                    <RadioGroup aria-label="Priority" defaultValue="normal" className="gap-3">
                        <RadioButton value="low" label="Low" hint="Not blocking anyone right now." />
                        <RadioButton value="normal" label="Normal" hint="Annoying, but there is a workaround." />
                        <RadioButton value="high" label="High" hint="Blocking work for the whole team." />
                    </RadioGroup>
                    <Checkbox label="Email me when this is resolved" defaultSelected />
                </div>
            </ModalBody>
            <ModalFooter align="divided">
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Submit report</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

/* -------------------------------------------------------------------------------------------------
 * 40–43. Editing surfaces.
 * -----------------------------------------------------------------------------------------------*/

export const ImageCrop = () => (
    <ModalPanel width="md">
        <Dialog aria-label="Crop your photo">
            <ModalHeader icon={Crop01} title="Crop your photo" description="Drag to reposition, then use the slider to zoom." />
            <ModalBody>
                <div className="bg-secondary relative overflow-hidden rounded-xl">
                    <img src={IMAGES.square[0].src} alt="" className="h-70 w-full object-cover" />
                    <div className="ring-fg-white/70 pointer-events-none absolute start-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 rtl:translate-x-1/2" />
                </div>
                <Slider aria-label="Zoom" defaultValue={[40]} />
                <div className="flex items-center justify-center gap-2">
                    <ButtonUtility size="sm" color="tertiary" icon={ChevronLeft} tooltip="Rotate left" />
                    <ButtonUtility size="sm" color="tertiary" icon={ChevronRight} tooltip="Rotate right" />
                    <ButtonUtility size="sm" color="tertiary" icon={Image01} tooltip="Replace photo" />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Save photo</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const CalendarEvent = () => (
    <ModalPanel width="md">
        <Dialog aria-label="Design review">
            <ModalHeader
                icon={CalendarIcon}
                title="Design review"
                description="Weekly walkthrough of everything shipped since Monday."
                hasBackgroundPattern={false}
            />
            <ModalBody className="gap-5">
                <ul className="flex flex-col gap-3">
                    <li className="text-tertiary flex items-center gap-3 text-sm">
                        <Clock className="text-fg-quaternary size-5 shrink-0" aria-hidden="true" />
                        Wednesday, 9 September · 10:00 – 11:00
                    </li>
                    <li className="text-tertiary flex items-center gap-3 text-sm">
                        <MarkerPin01 className="text-fg-quaternary size-5 shrink-0" aria-hidden="true" />
                        Meeting room 3 · Also on video
                    </li>
                    <li className="text-tertiary flex items-center gap-3 text-sm">
                        <Users01 className="text-fg-quaternary size-5 shrink-0" aria-hidden="true" />6 people invited
                    </li>
                </ul>
                <AvatarRow count={6} />
            </ModalBody>
            <ModalFooter align="between">
                <Button size="lg" color="link-gray" iconLeading={Edit01}>
                    Edit event
                </Button>
                <Button size="lg">Join meeting</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const BannerAppearance = () => (
    <ModalPanel width="lg">
        <Dialog aria-label="Banner appearance">
            <ModalHeader icon={Palette} title="Banner appearance" description="Choose how the announcement banner looks to your members." />
            <ModalBody className="gap-5">
                <div className="border-secondary bg-secondary flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center">
                    <FeaturedIcon icon={Stars02} size="md" color="brand" theme="light" />
                    <div className="flex flex-1 flex-col">
                        <p className="text-secondary text-sm font-semibold">Boards are here</p>
                        <p className="text-tertiary text-sm">Plan a sprint on a canvas your whole team can edit.</p>
                    </div>
                    <Button size="sm" color="secondary">
                        Learn more
                    </Button>
                </div>

                <RadioGroup aria-label="Banner position" defaultValue="top" orientation="horizontal" className="flex-row gap-3">
                    <RadioButton value="top" label="Top of page" />
                    <RadioButton value="bottom" label="Bottom of page" />
                    <RadioButton value="floating" label="Floating" />
                </RadioGroup>

                <div className="flex flex-col gap-3">
                    <SectionLabel>Behaviour</SectionLabel>
                    <Toggle size="md" defaultSelected label="Dismissible" hint="Members can hide the banner." />
                    <Toggle size="md" label="Show on mobile" hint="Display the banner on small screens too." />
                </div>
            </ModalBody>
            <ModalFooter align="end">
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Save banner</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const AppearanceSettings = () => (
    <ModalPanel width="lg">
        <Dialog aria-label="Appearance">
            <ModalHeader icon={Palette} title="Appearance" description="Choose how this workspace looks and feels on your device." />
            <ModalBody className="gap-5">
                <RadioGroup aria-label="Theme" defaultValue="system" orientation="horizontal" size="md" className="flex-row gap-3">
                    <OptionCard
                        value="light"
                        title={
                            <>
                                <Sun className="text-fg-quaternary size-5" aria-hidden="true" />
                                <span>Light</span>
                            </>
                        }
                    />
                    <OptionCard
                        value="dark"
                        title={
                            <>
                                <Moon01 className="text-fg-quaternary size-5" aria-hidden="true" />
                                <span>Dark</span>
                            </>
                        }
                    />
                    <OptionCard
                        value="system"
                        title={
                            <>
                                <Monitor04 className="text-fg-quaternary size-5" aria-hidden="true" />
                                <span>System</span>
                            </>
                        }
                    />
                </RadioGroup>

                <div className="flex flex-col gap-3">
                    <SectionLabel>Interface</SectionLabel>
                    <Toggle size="md" defaultSelected label="Reduce motion" hint="Turn off non-essential animations." />
                    <Toggle size="md" label="Compact rows" hint="Fit more items on screen in lists and tables." />
                </div>
            </ModalBody>
            <ModalFooter align="end">
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Save appearance</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

/* -------------------------------------------------------------------------------------------------
 * 44–47. Assistants, settings and project creation.
 * -----------------------------------------------------------------------------------------------*/

export const AIAssistant = () => (
    <ModalPanel width="lg">
        <Dialog aria-label="Ask the assistant">
            <ModalHeader icon={Stars02} title="Ask the assistant" description="Describe what you need and the assistant will draft it inside this project." />
            <ModalBody className="gap-5">
                <TextArea
                    aria-label="Prompt"
                    rows={4}
                    defaultValue="Summarise the customer interviews from last week and pull out the three most common requests."
                />

                <div className="flex flex-col gap-3">
                    <SectionLabel>Try one of these</SectionLabel>
                    <div className="flex flex-wrap gap-2">
                        {["Write a project brief", "Summarise this thread", "Draft a release note", "Turn notes into tasks"].map((suggestion) => (
                            <Button key={suggestion} size="sm" color="secondary" iconLeading={Stars02}>
                                {suggestion}
                            </Button>
                        ))}
                    </div>
                </div>
            </ModalBody>
            <ModalFooter align="between">
                <p className="text-tertiary text-sm">The assistant can make mistakes. Check important details.</p>
                <Button size="lg" iconTrailing={Send01}>
                    Generate
                </Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const UserSettings = () => (
    <ModalPanel width="xl">
        <Dialog aria-label="Account settings">
            <ModalHeader
                media={<Avatar src={avatar(0).src} alt={avatar(0).alt} size="lg" />}
                hasBackgroundPattern={false}
                title="Account settings"
                description="Manage your personal details, notifications and security."
            />
            <ModalBody className="gap-6">
                <div className="flex flex-col gap-4">
                    <SectionLabel>Personal details</SectionLabel>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Input label="Full name" defaultValue={avatar(0).name} className="flex-1" />
                        <Input label="Username" defaultValue={avatar(0).username} className="flex-1" />
                    </div>
                    <Input label="Email" type="email" icon={Mail01} defaultValue={avatar(0).email} />
                </div>

                <div className="flex flex-col gap-4">
                    <SectionLabel>Notifications</SectionLabel>
                    <Toggle size="md" defaultSelected label="Product updates" hint="News about releases and improvements." />
                    <Toggle size="md" defaultSelected label="Mentions" hint="When someone mentions you in a comment." />
                    <Toggle size="md" label="Marketing emails" hint="Occasional tips and offers." />
                </div>

                <div className="flex flex-col gap-4">
                    <SectionLabel>Security</SectionLabel>
                    <div className="border-secondary flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center">
                        <FeaturedIcon icon={Lock01} size="md" color="gray" theme="light" />
                        <div className="flex flex-1 flex-col">
                            <p className="text-secondary text-sm font-medium">Two-factor authentication</p>
                            <p className="text-tertiary text-sm">Currently enabled with an authenticator app.</p>
                        </div>
                        <Button size="sm" color="secondary">
                            Manage
                        </Button>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter align="divided">
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Save changes</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const NewProject = () => (
    <ModalPanel width="lg">
        <Dialog aria-label="New project">
            <ModalHeader icon={Plus} title="New project" description="Projects hold your files, boards and reviews in one place." />
            <ModalBody className="gap-5">
                <Input isRequired label="Project name" placeholder="e.g. Website redesign" />
                <TextArea label="Description" rows={3} placeholder="What is this project for?" />
                <div className="flex flex-col gap-3">
                    <SectionLabel>Start from a template</SectionLabel>
                    <RadioGroup aria-label="Template" defaultValue="blank" size="md" className="gap-3">
                        <OptionCard value="blank" title="Blank project" description="Start with an empty workspace." />
                        <OptionCard value="sprint" title="Sprint board" description="Backlog, in progress and done columns." />
                        <OptionCard value="launch" title="Launch checklist" description="Everything you need before shipping." />
                    </RadioGroup>
                </div>
                <Toggle size="md" defaultSelected label="Add my team" hint="Everyone in Design gets access straight away." />
            </ModalBody>
            <ModalFooter align="end">
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Create project</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const TextEditor = () => (
    <ModalPanel width="xl">
        <Dialog aria-label="Write an update">
            <ModalHeader icon={Edit01} title="Write an update" description="Everyone following this project will get your update by email." />
            <ModalBody>
                <Input isRequired aria-label="Update title" placeholder="Title" />
                <TextEditorField aria-label="Update body" placeholder="Share what changed this week…">
                    <TextEditorField.Toolbar>
                        <TextEditorField.Group aria-label="Formatting">
                            <TextEditorField.Bold />
                            <TextEditorField.Italic />
                            <TextEditorField.Underline />
                            <TextEditorField.Separator />
                            <TextEditorField.AlignLeft />
                            <TextEditorField.AlignCenter />
                            <TextEditorField.BulletList />
                            <TextEditorField.Separator />
                            <TextEditorField.Link />
                        </TextEditorField.Group>
                    </TextEditorField.Toolbar>
                    <TextEditorField.Content className="h-50" />
                </TextEditorField>
            </ModalBody>
            <ModalFooter align="divided">
                <Button size="lg" color="secondary">
                    Save draft
                </Button>
                <Button size="lg" iconTrailing={Send01}>
                    Publish update
                </Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

/* -------------------------------------------------------------------------------------------------
 * 48–52. Sharing, scheduling, integrations and messages.
 * -----------------------------------------------------------------------------------------------*/

export const ShareProject = () => (
    <ModalPanel width="md">
        <Dialog aria-label="Share “Quarterly review”">
            <ModalHeader icon={Share04} title="Share “Quarterly review”" description="Invite people by email or send them the link." />
            <ModalBody className="gap-5">
                <Input aria-label="Invite by email" type="email" icon={Mail01} placeholder="you@company.com" />

                <ul className="flex flex-col gap-3">
                    {[0, 1, 2].map((index) => (
                        <li key={index}>
                            <PersonRow
                                index={index}
                                action={
                                    <Select
                                        aria-label={`Access for ${avatar(index).name}`}
                                        size="sm"
                                        className="w-32 shrink-0"
                                        defaultSelectedKey={index === 0 ? "owner" : "edit"}
                                    >
                                        <Select.Item id="owner">Owner</Select.Item>
                                        <Select.Item id="edit">Can edit</Select.Item>
                                        <Select.Item id="view">Can view</Select.Item>
                                    </Select>
                                }
                            />
                        </li>
                    ))}
                </ul>

                <InputGroup
                    label="Project link"
                    trailingAddon={
                        <Button color="secondary" iconLeading={Copy01}>
                            Copy
                        </Button>
                    }
                >
                    <InputBase readOnly value="proper.example/p/quarterly-review" />
                </InputGroup>
            </ModalBody>
            <ModalFooter align="end">
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Done</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const CreateEvent = () => (
    <ModalPanel width="lg">
        <Dialog aria-label="Create event">
            <ModalHeader icon={CalendarIcon} title="Create event" description="Invite your team and we will add it to everyone’s calendar." />
            <ModalBody className="gap-5">
                <Input isRequired label="Event name" placeholder="Design review" />
                <div className="flex flex-col gap-4 sm:flex-row">
                    <Input label="Date" icon={CalendarIcon} defaultValue="9 Sept 2026" className="flex-1" />
                    <Input label="Start time" icon={Clock} defaultValue="10:00" className="flex-1" />
                    <Input label="End time" icon={Clock} defaultValue="11:00" className="flex-1" />
                </div>
                <Input label="Location" icon={MarkerPin01} placeholder="Meeting room 3 or a video link" />
                <TextArea label="Description" rows={3} placeholder="What should people prepare?" />
                <div className="flex flex-col gap-3">
                    <SectionLabel>Guests</SectionLabel>
                    <AvatarRow count={4} />
                </div>
                <Toggle size="md" defaultSelected label="Send a reminder" hint="Guests get a notification 10 minutes before." />
            </ModalBody>
            <ModalFooter align="end">
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Create event</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const Integration = () => (
    <ModalPanel width="md">
        <Dialog aria-label="Connect Figma">
            <ModalHeader
                media={
                    <div className="border-secondary bg-primary flex size-12 items-center justify-center rounded-xl border shadow-xs">
                        <FigmaIcon className="size-7" />
                    </div>
                }
                hasBackgroundPattern={false}
                title="Connect Figma"
                description="Link a Figma team so designs stay in sync with this project."
            />
            <ModalBody>
                <ul className="flex flex-col gap-3">
                    {["Embed live frames in any document", "Get a comment when a file changes", "Search designs from the command menu"].map((item) => (
                        <li key={item} className="flex items-center gap-3">
                            <Check className="text-fg-success-primary size-5 shrink-0" aria-hidden="true" />
                            <span className="text-tertiary text-sm">{item}</span>
                        </li>
                    ))}
                </ul>
                <p className="text-tertiary text-sm">Proper UI will be able to read file names, thumbnails and comments. You can disconnect at any time.</p>
            </ModalBody>
            <ModalFooter>
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg">Connect</Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const NewMessageEmptyState = () => (
    <ModalPanel width="md">
        <Dialog aria-label="New message">
            <ModalHeader icon={MessageSquare01} title="New message" description="Start a conversation with anyone in your workspace." />
            <ModalBody>
                <Input aria-label="Recipients" icon={SearchLg} placeholder="Add people by name or email" />
                <div className="border-secondary flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-10 text-center">
                    <FeaturedIcon icon={Users01} size="lg" color="gray" theme="modern" />
                    <div className="flex flex-col gap-1">
                        <p className="text-secondary text-sm font-semibold">No recipients yet</p>
                        <p className="text-tertiary text-sm">Pick someone above and your message will appear here.</p>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter align="end">
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg" isDisabled iconTrailing={Send01}>
                    Send
                </Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);

export const NewMessageFilled = () => (
    <ModalPanel width="md">
        <Dialog aria-label="New message">
            <ModalHeader icon={MessageSquare01} title="New message" description="Start a conversation with anyone in your workspace." />
            <ModalBody>
                <InputTags aria-label="Recipients" placeholder="Add another person" defaultValue={[avatar(0).name, avatar(1).name, avatar(2).name]} />
                <TextArea
                    aria-label="Message"
                    rows={5}
                    defaultValue="Hi all — the quarterly review deck is ready for a first pass. Comments are open until Friday, then I will lock it for the board meeting."
                />
                <div className="flex items-center gap-2">
                    <ButtonUtility size="sm" color="tertiary" icon={Image01} tooltip="Attach an image" />
                    <ButtonUtility size="sm" color="tertiary" icon={Link01} tooltip="Insert a link" />
                </div>
            </ModalBody>
            <ModalFooter align="end">
                <Button size="lg" color="secondary">
                    Cancel
                </Button>
                <Button size="lg" iconTrailing={Send01}>
                    Send
                </Button>
            </ModalFooter>
        </Dialog>
    </ModalPanel>
);
