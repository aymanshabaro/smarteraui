"use client";

import { AppGalleryButton, AppStoreButton, GalaxyStoreButton, GooglePlayButton } from "@/components/base/buttons/app-store-buttons";
import {
    AppGalleryButton as AppGalleryButtonOutline,
    AppStoreButton as AppStoreButtonOutline,
    GalaxyStoreButton as GalaxyStoreButtonOutline,
    GooglePlayButton as GooglePlayButtonOutline,
} from "@/components/base/buttons/app-store-buttons-outline";

export const MobileAppStoreButtonsExample = () => {
    return (
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-center">
            <GooglePlayButton size="md" />
            <AppStoreButton size="md" />
            <GalaxyStoreButton size="md" />
        </div>
    );
};

export const GooglePlayButtons = () => {
    return (
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-center">
            <GooglePlayButton size="md" />
            <GooglePlayButton size="lg" />
        </div>
    );
};

export const AppStoreButtons = () => {
    return (
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-center">
            <AppStoreButton size="md" />
            <AppStoreButton size="lg" />
        </div>
    );
};

export const GalaxyStoreButtons = () => {
    return (
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-center">
            <GalaxyStoreButton size="md" />
            <GalaxyStoreButton size="lg" />
        </div>
    );
};

export const AppGalleryButtons = () => {
    return (
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-center">
            <AppGalleryButton size="md" />
            <AppGalleryButton size="lg" />
        </div>
    );
};

export const GooglePlayOutlineButtons = () => {
    return (
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-center">
            <GooglePlayButtonOutline size="md" />
            <GooglePlayButtonOutline size="lg" />
        </div>
    );
};

export const AppStoreOutlineButtons = () => {
    return (
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-center">
            <AppStoreButtonOutline size="md" />
            <AppStoreButtonOutline size="lg" />
        </div>
    );
};

export const GalaxyStoreOutlineButtons = () => {
    return (
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-center">
            <GalaxyStoreButtonOutline size="md" />
            <GalaxyStoreButtonOutline size="lg" />
        </div>
    );
};

export const AppGalleryOutlineButtons = () => {
    return (
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-center">
            <AppGalleryButtonOutline size="md" />
            <AppGalleryButtonOutline size="lg" />
        </div>
    );
};
