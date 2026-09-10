import { RatingStars } from "@/components/foundations/rating/rating-stars";
import { IMAGES, LOGOS, avatar } from "@/utils/demo-assets";
import { SignUpFormColumn } from "./base-components/form-column";
import { ScreenMockup } from "./base-components/screen-mockup";

const author = avatar(3);

/** Split sign up whose wide right panel stacks a customer quote above a bleeding app window. */
export const SignupSplitMockupQuote = () => (
    <section className="bg-primary grid min-h-screen grid-cols-1 lg:grid-cols-[640px_1fr]">
        <SignUpFormColumn className="w-full flex-1" headerClassName="hidden p-8 lg:block" footerClassName="hidden p-8 pt-11 lg:flex" bodyClassName="md:py-0" />

        <div className="bg-tertiary hidden flex-1 gap-20 overflow-hidden ps-20 pe-16 pt-24 lg:flex lg:flex-col">
            <figure className="flex max-w-3xl flex-col gap-6">
                <blockquote>
                    <p className="text-display-sm text-primary font-medium">
                        Few things make me feel more powerful than setting up automations in Proper UI to make my life easier and more efficient.
                    </p>
                </blockquote>

                <figcaption className="flex items-start gap-3">
                    <div className="flex-1">
                        <p className="text-primary text-lg font-semibold">— {author.name}</p>
                        <cite className="text-tertiary text-md font-medium not-italic">Founder, {LOGOS[0].name}</cite>
                    </div>

                    <RatingStars rating={5} starClassName="text-fg-primary" className="gap-0.5" />
                </figcaption>
            </figure>

            <div className="relative">
                <ScreenMockup src={IMAGES.landscape[2].src} alt="Proper UI dashboard" className="absolute start-0 top-0 h-170.5" imageClassName="h-full" />
            </div>
        </div>
    </section>
);
