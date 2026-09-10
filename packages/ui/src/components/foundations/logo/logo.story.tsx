import type { FC } from "react";
import { ProperLogo } from "@/components/foundations/logo/proper-logo";
import { ProperLogoMinimal } from "@/components/foundations/logo/proper-logo-minimal";

export default {
    title: "Foundations/Logo",
    decorators: [
        (Story: FC) => (
            <div className="bg-primary flex min-h-screen w-full flex-col items-start justify-center gap-8 overflow-auto p-8">
                <Story />
            </div>
        ),
    ],
};

export const Logo = () => <ProperLogo />;

export const LogoMinimal = () => <ProperLogoMinimal />;
