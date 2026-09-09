"use client";

import { BadgeGroup } from "./badge-groups";

export const BadgeGroupExample = () => {
    return (
        <div className="flex flex-col items-start gap-4">
            <BadgeGroup addonText="New feature" color="brand" theme="modern" align="leading" size="md">
                We've just released a new feature
            </BadgeGroup>
            <BadgeGroup addonText="New feature" color="brand" theme="modern" align="leading" size="lg">
                We've just released a new feature
            </BadgeGroup>
        </div>
    );
};

export const PillColorLeadingGray = () => {
    return (
        <div className="flex flex-col items-start gap-4">
            <BadgeGroup addonText="New feature" color="gray" theme="light" align="leading" size="md">
                We've just released a new feature
            </BadgeGroup>
            <BadgeGroup addonText="New feature" color="gray" theme="light" align="leading" size="lg">
                We've just released a new feature
            </BadgeGroup>
        </div>
    );
};

export const PillColorLeadingBrand = () => {
    return (
        <div className="flex flex-col items-start gap-4">
            <BadgeGroup addonText="New feature" color="brand" theme="light" align="leading" size="md">
                We've just released a new feature
            </BadgeGroup>
            <BadgeGroup addonText="New feature" color="brand" theme="light" align="leading" size="lg">
                We've just released a new feature
            </BadgeGroup>
        </div>
    );
};

export const PillColorLeadingError = () => {
    return (
        <div className="flex flex-col items-start gap-4">
            <BadgeGroup addonText="Error" color="error" theme="light" align="leading" size="md">
                There was a problem with that action
            </BadgeGroup>
            <BadgeGroup addonText="Error" color="error" theme="light" align="leading" size="lg">
                There was a problem with that action
            </BadgeGroup>
        </div>
    );
};

export const PillColorLeadingWarning = () => {
    return (
        <div className="flex flex-col items-start gap-4">
            <BadgeGroup addonText="Warning" color="warning" theme="light" align="leading" size="md">
                Just to let you know this might be a problem
            </BadgeGroup>
            <BadgeGroup addonText="Warning" color="warning" theme="light" align="leading" size="lg">
                Just to let you know this might be a problem
            </BadgeGroup>
        </div>
    );
};

export const PillColorLeadingSuccess = () => {
    return (
        <div className="flex flex-col items-start gap-4">
            <BadgeGroup addonText="Success" color="success" theme="light" align="leading" size="md">
                You've updated your profile and details
            </BadgeGroup>
            <BadgeGroup addonText="Success" color="success" theme="light" align="leading" size="lg">
                You've updated your profile and details
            </BadgeGroup>
        </div>
    );
};

export const PillColorTrailingGray = () => {
    return (
        <div className="flex flex-col items-start gap-4">
            <BadgeGroup addonText="New feature" color="gray" theme="light" align="trailing" size="md">
                We've just released a new feature
            </BadgeGroup>
            <BadgeGroup addonText="New feature" color="gray" theme="light" align="trailing" size="lg">
                We've just released a new feature
            </BadgeGroup>
        </div>
    );
};

export const PillColorTrailingBrand = () => {
    return (
        <div className="flex flex-col items-start gap-4">
            <BadgeGroup addonText="New feature" color="brand" theme="light" align="trailing" size="md">
                We've just released a new feature
            </BadgeGroup>
            <BadgeGroup addonText="New feature" color="brand" theme="light" align="trailing" size="lg">
                We've just released a new feature
            </BadgeGroup>
        </div>
    );
};

export const PillColorTrailingError = () => {
    return (
        <div className="flex flex-col items-start gap-4">
            <BadgeGroup addonText="Error" color="error" theme="light" align="trailing" size="md">
                There was a problem with that action
            </BadgeGroup>
            <BadgeGroup addonText="Error" color="error" theme="light" align="trailing" size="lg">
                There was a problem with that action
            </BadgeGroup>
        </div>
    );
};

export const PillColorTrailingWarning = () => {
    return (
        <div className="flex flex-col items-start gap-4">
            <BadgeGroup addonText="Warning" color="warning" theme="light" align="trailing" size="md">
                Just to let you know this might be a problem
            </BadgeGroup>
            <BadgeGroup addonText="Warning" color="warning" theme="light" align="trailing" size="lg">
                Just to let you know this might be a problem
            </BadgeGroup>
        </div>
    );
};

export const PillColorTrailingSuccess = () => {
    return (
        <div className="flex flex-col items-start gap-4">
            <BadgeGroup addonText="Success" color="success" theme="light" align="trailing" size="md">
                You've updated your profile and details
            </BadgeGroup>
            <BadgeGroup addonText="Success" color="success" theme="light" align="trailing" size="lg">
                You've updated your profile and details
            </BadgeGroup>
        </div>
    );
};

export const ModernLeadingGray = () => {
    return (
        <div className="flex flex-col items-start gap-4">
            <BadgeGroup addonText="New feature" color="gray" theme="modern" align="leading" size="md">
                We've just released a new feature
            </BadgeGroup>
            <BadgeGroup addonText="New feature" color="gray" theme="modern" align="leading" size="lg">
                We've just released a new feature
            </BadgeGroup>
        </div>
    );
};

export const ModernLeadingBrand = () => {
    return (
        <div className="flex flex-col items-start gap-4">
            <BadgeGroup addonText="New feature" color="brand" theme="modern" align="leading" size="md">
                We've just released a new feature
            </BadgeGroup>
            <BadgeGroup addonText="New feature" color="brand" theme="modern" align="leading" size="lg">
                We've just released a new feature
            </BadgeGroup>
        </div>
    );
};

export const ModernLeadingError = () => {
    return (
        <div className="flex flex-col items-start gap-4">
            <BadgeGroup addonText="Error" color="error" theme="modern" align="leading" size="md">
                There was a problem with that action
            </BadgeGroup>
            <BadgeGroup addonText="Error" color="error" theme="modern" align="leading" size="lg">
                There was a problem with that action
            </BadgeGroup>
        </div>
    );
};

export const ModernLeadingWarning = () => {
    return (
        <div className="flex flex-col items-start gap-4">
            <BadgeGroup addonText="Warning" color="warning" theme="modern" align="leading" size="md">
                Just to let you know this might be a problem
            </BadgeGroup>
            <BadgeGroup addonText="Warning" color="warning" theme="modern" align="leading" size="lg">
                Just to let you know this might be a problem
            </BadgeGroup>
        </div>
    );
};

export const ModernLeadingSuccess = () => {
    return (
        <div className="flex flex-col items-start gap-4">
            <BadgeGroup addonText="Success" color="success" theme="modern" align="leading" size="md">
                You've updated your profile and details
            </BadgeGroup>
            <BadgeGroup addonText="Success" color="success" theme="modern" align="leading" size="lg">
                You've updated your profile and details
            </BadgeGroup>
        </div>
    );
};

export const ModernTrailingGray = () => {
    return (
        <div className="flex flex-col items-start gap-4">
            <BadgeGroup addonText="New feature" color="gray" theme="modern" align="trailing" size="md">
                We've just released a new feature
            </BadgeGroup>
            <BadgeGroup addonText="New feature" color="gray" theme="modern" align="trailing" size="lg">
                We've just released a new feature
            </BadgeGroup>
        </div>
    );
};

export const ModernTrailingBrand = () => {
    return (
        <div className="flex flex-col items-start gap-4">
            <BadgeGroup addonText="New feature" color="brand" theme="modern" align="trailing" size="md">
                We've just released a new feature
            </BadgeGroup>
            <BadgeGroup addonText="New feature" color="brand" theme="modern" align="trailing" size="lg">
                We've just released a new feature
            </BadgeGroup>
        </div>
    );
};

export const ModernTrailingError = () => {
    return (
        <div className="flex flex-col items-start gap-4">
            <BadgeGroup addonText="Error" color="error" theme="modern" align="trailing" size="md">
                There was a problem with that action
            </BadgeGroup>
            <BadgeGroup addonText="Error" color="error" theme="modern" align="trailing" size="lg">
                There was a problem with that action
            </BadgeGroup>
        </div>
    );
};

export const ModernTrailingWarning = () => {
    return (
        <div className="flex flex-col items-start gap-4">
            <BadgeGroup addonText="Warning" color="warning" theme="modern" align="trailing" size="md">
                Just to let you know this might be a problem
            </BadgeGroup>
            <BadgeGroup addonText="Warning" color="warning" theme="modern" align="trailing" size="lg">
                Just to let you know this might be a problem
            </BadgeGroup>
        </div>
    );
};

export const ModernTrailingSuccess = () => {
    return (
        <div className="flex flex-col items-start gap-4">
            <BadgeGroup addonText="Success" color="success" theme="modern" align="trailing" size="md">
                You've updated your profile and details
            </BadgeGroup>
            <BadgeGroup addonText="Success" color="success" theme="modern" align="trailing" size="lg">
                You've updated your profile and details
            </BadgeGroup>
        </div>
    );
};
