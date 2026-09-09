import { SmarteraLogoMinimal } from "@/components/foundations/logo/smartera-logo-minimal";
import { IMAGES } from "@/utils/demo-assets";
import { SignUpFormColumn } from "./base-components/form-column";
import { SocialProofRow } from "./base-components/page-parts";

/** Hand-drawn flourish that points from the marketing panel back at the sign up form. */
const CurvedArrow = ({ className }: { className?: string }) => (
    <svg aria-hidden="true" viewBox="0 0 288 258" fill="none" className={className}>
        <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M282 8C266 96 214 178 132 200C86 212 44 196 46 166C48 142 82 138 96 158C112 180 96 218 46 232C34 235 22 236 10 234" />
            <path d="M30 218L10 234L28 250" />
        </g>
    </svg>
);

/** Split sign up whose marketing half is a portrait, pitch copy and a rating proof row. */
export const SignupSplitArrow = () => (
    <section className="bg-primary grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <SignUpFormColumn
            className="relative"
            headerClassName="hidden p-8 md:block"
            footerClassName="hidden p-8 pt-11 lg:flex"
            innerClassName="md:gap-3"
            description={<p className="text-tertiary text-md md:hidden">Start turning your ideas into reality.</p>}
        >
            <CurvedArrow className="text-fg-brand-primary_alt absolute -end-[67px] bottom-23 z-50 w-72 max-lg:hidden" />
        </SignUpFormColumn>

        <div className="relative hidden items-end justify-center overflow-hidden lg:flex">
            <img src={IMAGES.square[3].src} alt={IMAGES.square[3].alt} className="absolute inset-0 size-full object-cover" />

            <div className="z-10 flex flex-col items-start justify-start gap-8 bg-linear-to-t from-black/40 to-black/0 px-16 py-24">
                <div className="dark-mode">
                    <SmarteraLogoMinimal className="size-20" />
                </div>

                <div className="flex flex-col gap-5">
                    <h2 className="text-display-xl font-semibold -tracking-[1.2px] text-white">Start turning your ideas into reality.</h2>
                    <p className="text-lg font-medium text-white">
                        Create a free account and get full access to all features for 30-days. No credit card needed. Get started in 2 minutes.
                    </p>
                </div>

                <SocialProofRow />
            </div>
        </div>
    </section>
);
