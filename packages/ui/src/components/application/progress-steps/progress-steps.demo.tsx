"use client";

import { Flag05, Stars02, User01, UsersPlus } from "@smarteraui/icons";
import { type ProgressStepItem, type ProgressStepStatus, ProgressSteps } from "@/components/application/progress-steps/progress-steps";

const titles = ["Your details", "Company details", "Invite your team", "Add your socials"];
const shortDescriptions = ["Name and email", "Website and location", "Start collaborating", "Automatic sharing"];
const longDescriptions = [
    "Please provide your name and email",
    "A few details about your company",
    "Start collaborating with your team",
    "Share posts to your social accounts",
];
const icons = [User01, Flag05, UsersPlus, Stars02];
const ids = ["details", "company", "team", "socials"];

const defaultStatuses: ProgressStepStatus[] = ["complete", "current", "incomplete", "incomplete"];

const buildSteps = (options: { descriptions: string[]; statuses?: ProgressStepStatus[]; withIcons?: boolean }): ProgressStepItem[] =>
    ids.map((id, index) => ({
        id,
        title: titles[index],
        description: options.descriptions[index],
        status: (options.statuses ?? defaultStatuses)[index],
        icon: options.withIcons ? icons[index] : undefined,
    }));

const wideSteps = buildSteps({ descriptions: shortDescriptions });
const narrowSteps = buildSteps({ descriptions: longDescriptions });
const wideIconSteps = buildSteps({ descriptions: shortDescriptions, withIcons: true });

/** The featured icon layout highlights the current step only — every other step is dimmed. */
const featuredIconStatuses: ProgressStepStatus[] = ["incomplete", "current", "incomplete", "incomplete"];

export const ProgressStepsExample = () => (
    <div className="w-full">
        <div className="max-md:hidden">
            <ProgressSteps aria-label="Setup steps" type="number" connector="dashed" items={wideSteps} />
        </div>
        <div className="md:hidden">
            <ProgressSteps aria-label="Setup steps, compact" type="number" connector="dashed" orientation="vertical" items={narrowSteps} />
        </div>
    </div>
);

export const IconCentered = () => (
    <div className="w-full">
        <div className="max-md:hidden">
            <ProgressSteps aria-label="Setup steps" items={wideSteps} />
        </div>
        <div className="md:hidden">
            <ProgressSteps aria-label="Setup steps, compact" orientation="vertical" items={narrowSteps} />
        </div>
    </div>
);

export const IconCenteredWithNumber = () => (
    <div className="w-full">
        <div className="max-md:hidden">
            <ProgressSteps aria-label="Setup steps" type="number" connector="dashed" items={wideSteps} />
        </div>
        <div className="md:hidden">
            <ProgressSteps aria-label="Setup steps, compact" type="number" connector="dashed" orientation="vertical" items={narrowSteps} />
        </div>
    </div>
);

export const FeaturedIconCentered = () => (
    <div className="w-full">
        <div className="max-md:hidden">
            <ProgressSteps aria-label="Setup steps" type="featured-icon" items={wideIconSteps} />
        </div>
        <div className="md:hidden">
            <ProgressSteps
                aria-label="Setup steps, compact"
                type="featured-icon"
                orientation="vertical"
                items={buildSteps({ descriptions: longDescriptions, statuses: featuredIconStatuses, withIcons: true })}
            />
        </div>
    </div>
);

export const IconWithText = () => (
    <div className="w-full max-w-xs">
        <ProgressSteps aria-label="Setup steps" orientation="vertical" items={narrowSteps} />
    </div>
);

export const IconWithNumber = () => (
    <div className="w-full max-w-xs">
        <ProgressSteps aria-label="Setup steps" type="number" connector="dashed" orientation="vertical" items={narrowSteps} />
    </div>
);

export const FeaturedIconWithText = () => (
    <div className="w-full max-w-xs">
        <ProgressSteps
            aria-label="Setup steps"
            type="featured-icon"
            orientation="vertical"
            items={buildSteps({ descriptions: longDescriptions, statuses: featuredIconStatuses, withIcons: true })}
        />
    </div>
);

export const MinimalIcons = () => <ProgressSteps.Minimal aria-label="Setup steps" label="Step 1 of 4" items={defaultStatuses} />;

export const MinimalIconsConnected = () => <ProgressSteps.Minimal aria-label="Setup steps" connector="solid" items={defaultStatuses} />;

export const TextWithLine = () => (
    <div className="w-full">
        <div className="max-md:hidden">
            <ProgressSteps aria-label="Setup steps" type="line" connector="none" items={wideSteps} />
        </div>
        <div className="md:hidden">
            <ProgressSteps aria-label="Setup steps, compact" type="line" connector="none" orientation="vertical" items={narrowSteps} />
        </div>
    </div>
);
