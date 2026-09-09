import type { FC } from "react";
import { SmarteraLogo } from "@/components/foundations/logo/smartera-logo";
import { SmarteraLogoMinimal } from "@/components/foundations/logo/smartera-logo-minimal";

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

export const Logo = () => <SmarteraLogo />;

export const LogoMinimal = () => <SmarteraLogoMinimal />;
