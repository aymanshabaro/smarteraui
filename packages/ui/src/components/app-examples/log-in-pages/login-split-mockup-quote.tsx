import { sortCx } from "../../../utils/cx";
import { AVATARS, IMAGES } from "../../../utils/demo-assets";
import { Button } from "../../base/buttons/button";
import { SocialButton } from "../../base/buttons/social-button";
import { Checkbox } from "../../base/checkbox/checkbox";
import { Form } from "../../base/form/form";
import { Input } from "../../base/input/input";
import { ProperLogo } from "../../foundations/logo/proper-logo";
import { ProperLogoMinimal } from "../../foundations/logo/proper-logo-minimal";
import { RatingStars } from "../../foundations/rating/rating-stars";

// TODO(orchestrator): candidate for components/shared-assets/mockups — the bezelled desktop screen
// frame is duplicated by `login-split-mockup` and by the marketing hero screen mockups.
const styles = sortCx({
    mockup: {
        outer: "bg-primary ring-secondary_alt absolute start-0 top-0 h-170.5 rounded-[9.03px] p-[0.9px] shadow-lg ring-[0.56px] ring-inset md:rounded-[26.95px] md:p-[4.5px] md:ring-[1.68px]",
        middle: "bg-primary shadow-modern-mockup-inner-md md:shadow-modern-mockup-inner-lg h-full rounded-[7.9px] p-0.5 md:rounded-[23.58px] md:p-1",
        screen: "bg-utility-neutral-50 ring-utility-neutral-200 relative h-full overflow-hidden rounded-[6.77px] ring-[0.56px] md:rounded-[20.21px] md:ring-[1.68px]",
    },
});

/** Split log in page pairing the form with a testimonial above a bleeding app screenshot. */
export const LoginSplitMockupQuote = () => (
    <section className="bg-primary grid min-h-screen grid-cols-1 lg:grid-cols-[640px_1fr]">
        <div className="bg-primary flex w-full flex-col lg:max-w-160">
            <div className="flex flex-1 justify-center px-4 py-12 md:items-center md:px-8 md:py-32">
                <div className="flex w-full flex-col gap-8 sm:max-w-90">
                    <div className="flex flex-col gap-6 md:gap-20">
                        <ProperLogo className="max-md:hidden" />
                        <ProperLogoMinimal className="size-8 origin-center scale-[1.2] md:hidden" />

                        <div className="flex flex-col gap-2 md:gap-3">
                            <h1 className="text-primary md:text-display-xs text-xl font-semibold">Log in</h1>
                            <p className="text-tertiary text-md">Welcome back! Please enter your details.</p>
                        </div>
                    </div>

                    <Form className="flex flex-col gap-6">
                        <div className="flex flex-col gap-5">
                            <Input isRequired size="lg" name="email" type="email" label="Email" placeholder="Enter your email" />
                            <Input
                                isRequired
                                size="lg"
                                name="password"
                                type="password"
                                label="Password"
                                placeholder="••••••••••••"
                                inputClassName="placeholder:text-placeholder/50"
                            />
                        </div>

                        <div className="flex items-center">
                            <Checkbox name="remember" label="Remember for 30 days" />
                            <Button href="/forgot-password" color="link-color" size="md" className="ms-auto">
                                Forgot password
                            </Button>
                        </div>

                        <div className="flex flex-col gap-4">
                            <Button type="submit" size="lg">
                                Sign in
                            </Button>
                            <SocialButton social="google" size="lg">
                                Sign in with Google
                            </SocialButton>
                        </div>
                    </Form>

                    <div className="flex justify-center gap-1 text-center">
                        <span className="text-tertiary text-sm">Don&apos;t have an account?</span>
                        <Button href="/signup" color="link-color" size="md">
                            Sign up
                        </Button>
                    </div>
                </div>
            </div>

            <footer className="hidden p-8 pt-11 lg:block">
                <p className="text-tertiary text-sm">© Proper UI 2077</p>
            </footer>
        </div>

        <div className="bg-tertiary relative hidden w-full gap-20 overflow-hidden ps-20 pe-16 pt-24 lg:flex lg:flex-col">
            <figure className="flex max-w-3xl flex-col gap-6">
                <blockquote>
                    <p className="text-display-sm text-primary font-medium">
                        Few things make me feel more powerful than setting up automations in Proper UI to make my life easier and more efficient.
                    </p>
                </blockquote>

                <figcaption className="flex items-start gap-3">
                    <div className="flex-1">
                        <p className="text-primary text-lg font-semibold">{AVATARS[8].name}</p>
                        <cite className="text-tertiary text-md font-medium not-italic">Founder, Layers.io</cite>
                    </div>

                    <RatingStars className="hidden gap-0.5 md:flex" starClassName="text-fg-primary" />
                </figcaption>
            </figure>

            <div className="relative">
                <div className={styles.mockup.outer}>
                    <div className={styles.mockup.middle}>
                        <div className={styles.mockup.screen}>
                            <img
                                src={IMAGES.landscape[0].src}
                                alt="Dashboard mockup showing the application interface"
                                className="h-full max-w-none object-cover object-left-top"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
