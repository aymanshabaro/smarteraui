import { Passcode, Stars02, User01, UserPlus01 } from "@properui/icons";
import type { ProgressStepItem } from "@/components/application/progress-steps/progress-steps";

/** The four onboarding steps shared by the progress and sidebar progress sign up pages. */
export const signUpSteps: ProgressStepItem[] = [
    { id: "details", title: "Your details", description: "Name and email", icon: User01, status: "complete" },
    { id: "password", title: "Choose a password", description: "Choose a secure password", icon: Passcode, status: "current" },
    { id: "team", title: "Invite your team", description: "Start collaborating", icon: UserPlus01 },
    { id: "socials", title: "Add your socials", description: "Automatic sharing", icon: Stars02 },
];

/** The same four steps with the longer descriptions used by the wide layouts. */
export const signUpStepsVerbose: ProgressStepItem[] = [
    { id: "details", title: "Your details", description: "Please provide your name and email", icon: User01, status: "complete" },
    { id: "password", title: "Choose a password", description: "Choose a secure password", icon: Passcode, status: "current" },
    { id: "team", title: "Invite your team", description: "Start collaborating with your team", icon: UserPlus01 },
    { id: "socials", title: "Add your socials", description: "Share posts to your social accounts", icon: Stars02 },
];
