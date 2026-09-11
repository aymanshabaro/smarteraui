import type { FC } from "react";
import {
    AngelList,
    Apple,
    Clubhouse,
    Discord,
    Dribbble,
    Facebook,
    Figma,
    GitHub,
    Google,
    Instagram,
    Layers,
    LinkedIn,
    Pinterest,
    Reddit,
    Signal,
    Snapchat,
    Telegram,
    TikTok,
    Tumblr,
    Twitter,
    X,
    YouTube,
} from "./";

const icons = [
    { name: "Google", icon: Google },
    { name: "Apple", icon: Apple },
    { name: "Facebook", icon: Facebook },
    { name: "X", icon: X },
    { name: "Twitter", icon: Twitter },
    { name: "GitHub", icon: GitHub },
    { name: "LinkedIn", icon: LinkedIn },
    { name: "Instagram", icon: Instagram },
    { name: "Dribbble", icon: Dribbble },
    { name: "Figma", icon: Figma },
    { name: "Discord", icon: Discord },
    { name: "TikTok", icon: TikTok },
    { name: "YouTube", icon: YouTube },
    { name: "Pinterest", icon: Pinterest },
    { name: "Reddit", icon: Reddit },
    { name: "Telegram", icon: Telegram },
    { name: "Signal", icon: Signal },
    { name: "Snapchat", icon: Snapchat },
    { name: "Tumblr", icon: Tumblr },
    { name: "Clubhouse", icon: Clubhouse },
    { name: "AngelList", icon: AngelList },
    { name: "Layers", icon: Layers },
];

export default {
    title: "Foundations/Social Icons",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full overflow-auto p-8">
                <Story />
            </div>
        ),
    ],
};

export const SocialIcons = () => (
    <div className="flex flex-wrap gap-6">
        {icons.map(({ name, icon: Icon }) => (
            <div key={name} className="flex w-24 flex-col items-center gap-2">
                <Icon aria-hidden="true" className="text-fg-primary size-6" />
                <span className="text-tertiary text-center text-xs">{name}</span>
            </div>
        ))}
    </div>
);
