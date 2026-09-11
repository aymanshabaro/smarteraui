"use client";

import { SocialButton } from "./social-button";

export const SocialButtonsExample = () => {
    return (
        <div className="flex w-90 flex-col gap-3">
            <SocialButton social="google" theme="color">
                Sign in with Google
            </SocialButton>
            <SocialButton social="facebook" theme="brand">
                Sign in with Facebook
            </SocialButton>
            <SocialButton social="apple" theme="brand">
                Sign in with Apple
            </SocialButton>
        </div>
    );
};

export const GoogleSocialButtons = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col items-start gap-8 md:flex-row">
                <SocialButton social="google" theme="brand">
                    Sign in with Google
                </SocialButton>
                <SocialButton social="google" theme="brand" aria-label="Sign in with Google" />
            </div>
            <div className="flex flex-col items-start gap-8 md:flex-row">
                <SocialButton social="google" theme="color">
                    Sign in with Google
                </SocialButton>
                <SocialButton social="google" theme="color" aria-label="Sign in with Google" />
            </div>
            <div className="flex flex-col items-start gap-8 md:flex-row">
                <SocialButton social="google" theme="gray">
                    Sign in with Google
                </SocialButton>
                <SocialButton social="google" theme="gray" aria-label="Sign in with Google" />
            </div>
        </div>
    );
};

export const FacebookSocialButtons = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col items-start gap-8 md:flex-row">
                <SocialButton social="facebook" theme="brand">
                    Sign in with Facebook
                </SocialButton>
                <SocialButton social="facebook" theme="brand" aria-label="Sign in with Facebook" />
            </div>
            <div className="flex flex-col items-start gap-8 md:flex-row">
                <SocialButton social="facebook" theme="color">
                    Sign in with Facebook
                </SocialButton>
                <SocialButton social="facebook" theme="color" aria-label="Sign in with Facebook" />
            </div>
            <div className="flex flex-col items-start gap-8 md:flex-row">
                <SocialButton social="facebook" theme="gray">
                    Sign in with Facebook
                </SocialButton>
                <SocialButton social="facebook" theme="gray" aria-label="Sign in with Facebook" />
            </div>
        </div>
    );
};

export const AppleSocialButtons = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col items-start gap-8 md:flex-row">
                <SocialButton social="apple" theme="brand">
                    Sign in with Apple
                </SocialButton>
                <SocialButton social="apple" theme="brand" aria-label="Sign in with Apple" />
            </div>
            <div className="flex flex-col items-start gap-8 md:flex-row">
                <SocialButton social="apple" theme="color">
                    Sign in with Apple
                </SocialButton>
                <SocialButton social="apple" theme="color" aria-label="Sign in with Apple" />
            </div>
            <div className="flex flex-col items-start gap-8 md:flex-row">
                <SocialButton social="apple" theme="gray">
                    Sign in with Apple
                </SocialButton>
                <SocialButton social="apple" theme="gray" aria-label="Sign in with Apple" />
            </div>
        </div>
    );
};

export const TwitterSocialButtons = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col items-start gap-8 md:flex-row">
                <SocialButton social="twitter" theme="brand">
                    Sign in with X
                </SocialButton>
                <SocialButton social="twitter" theme="brand" aria-label="Sign in with X" />
            </div>
            <div className="flex flex-col items-start gap-8 md:flex-row">
                <SocialButton social="twitter" theme="color">
                    Sign in with X
                </SocialButton>
                <SocialButton social="twitter" theme="color" aria-label="Sign in with X" />
            </div>
            <div className="flex flex-col items-start gap-8 md:flex-row">
                <SocialButton social="twitter" theme="gray">
                    Sign in with X
                </SocialButton>
                <SocialButton social="twitter" theme="gray" aria-label="Sign in with X" />
            </div>
        </div>
    );
};

export const FigmaSocialButtons = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col items-start gap-8 md:flex-row">
                <SocialButton social="figma" theme="brand">
                    Sign in with Figma
                </SocialButton>
                <SocialButton social="figma" theme="brand" aria-label="Sign in with Figma" />
            </div>
            <div className="flex flex-col items-start gap-8 md:flex-row">
                <SocialButton social="figma" theme="color">
                    Sign in with Figma
                </SocialButton>
                <SocialButton social="figma" theme="color" aria-label="Sign in with Figma" />
            </div>
            <div className="flex flex-col items-start gap-8 md:flex-row">
                <SocialButton social="figma" theme="gray">
                    Sign in with Figma
                </SocialButton>
                <SocialButton social="figma" theme="gray" aria-label="Sign in with Figma" />
            </div>
        </div>
    );
};

export const DribbleSocialButtons = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col items-start gap-8 md:flex-row">
                <SocialButton social="dribble" theme="brand">
                    Sign in with Dribble
                </SocialButton>
                <SocialButton social="dribble" theme="brand" aria-label="Sign in with Dribble" />
            </div>
            <div className="flex flex-col items-start gap-8 md:flex-row">
                <SocialButton social="dribble" theme="color">
                    Sign in with Dribble
                </SocialButton>
                <SocialButton social="dribble" theme="color" aria-label="Sign in with Dribble" />
            </div>
            <div className="flex flex-col items-start gap-8 md:flex-row">
                <SocialButton social="dribble" theme="gray">
                    Sign in with Dribble
                </SocialButton>
                <SocialButton social="dribble" theme="gray" aria-label="Sign in with Dribble" />
            </div>
        </div>
    );
};

export const BrandSocialButtonsGroup = () => {
    return (
        <div className="flex w-90 flex-col gap-3">
            <SocialButton social="google" theme="brand">
                Sign in with Google
            </SocialButton>
            <SocialButton social="facebook" theme="brand">
                Sign in with Facebook
            </SocialButton>
            <SocialButton social="apple" theme="brand">
                Sign in with Apple
            </SocialButton>
        </div>
    );
};

export const IconsBrandSocialButtonsGroup = () => {
    return (
        <div className="grid w-90 grid-cols-3 gap-3">
            <SocialButton social="google" theme="brand" aria-label="Sign in with Google" />
            <SocialButton social="facebook" theme="brand" aria-label="Sign in with Facebook" />
            <SocialButton social="apple" theme="brand" aria-label="Sign in with Apple" />
        </div>
    );
};

export const ColorSocialButtonsGroup = () => {
    return (
        <div className="flex w-90 flex-col gap-3">
            <SocialButton social="google" theme="color">
                Sign in with Google
            </SocialButton>
            <SocialButton social="facebook" theme="color">
                Sign in with Facebook
            </SocialButton>
            <SocialButton social="apple" theme="color">
                Sign in with Apple
            </SocialButton>
        </div>
    );
};

export const IconsColorSocialButtonsGroup = () => {
    return (
        <div className="grid w-90 grid-cols-3 gap-3">
            <SocialButton social="google" theme="color" aria-label="Sign in with Google" />
            <SocialButton social="facebook" theme="color" aria-label="Sign in with Facebook" />
            <SocialButton social="apple" theme="color" aria-label="Sign in with Apple" />
        </div>
    );
};

export const GraySocialButtonsGroup = () => {
    return (
        <div className="flex w-90 flex-col gap-3">
            <SocialButton social="google" theme="gray">
                Sign in with Google
            </SocialButton>
            <SocialButton social="facebook" theme="gray">
                Sign in with Facebook
            </SocialButton>
            <SocialButton social="apple" theme="gray">
                Sign in with Apple
            </SocialButton>
        </div>
    );
};
