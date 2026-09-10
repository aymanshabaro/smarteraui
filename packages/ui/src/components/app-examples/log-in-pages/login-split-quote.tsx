import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { SocialButton } from "@/components/base/buttons/social-button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { ProperLogo } from "@/components/foundations/logo/proper-logo";
import { ProperLogoMinimal } from "@/components/foundations/logo/proper-logo-minimal";
import { RatingStars } from "@/components/foundations/rating/rating-stars";
import { avatar } from "@/utils/demo-assets";

const author = avatar(2);

/** Split log in page with a centred customer testimonial on the left and the form on the right. */
export const LoginSplitQuote = () => (
    <section className="bg-primary grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="bg-secondary relative hidden items-center justify-between overflow-hidden lg:flex">
            <header className="absolute start-8 top-8">
                <ProperLogo />
            </header>

            <figure className="flex flex-col gap-8 px-20 text-center">
                <blockquote className="text-display-sm text-primary font-medium">
                    We&apos;ve been using Proper to kick start every new project and can&apos;t imagine working without it.
                </blockquote>

                <figcaption className="flex flex-col items-center gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Avatar size="lg" verified src={author.src} alt={author.alt} />

                        <div className="flex flex-col gap-1">
                            <p className="text-primary text-md font-semibold">{author.name}</p>
                            <cite className="text-tertiary text-sm font-medium not-italic">Head of Design, Layers</cite>
                        </div>
                    </div>

                    <RatingStars className="gap-1" />
                </figcaption>
            </figure>

            <footer className="absolute start-8 bottom-8">
                <p className="text-tertiary text-sm">© Proper UI 2077</p>
            </footer>
        </div>

        <div className="bg-primary flex flex-col">
            <div className="flex flex-1 justify-center px-4 py-12 md:items-center md:px-8">
                <div className="flex w-full flex-col gap-8 sm:max-w-90">
                    <div className="flex flex-col gap-6">
                        <ProperLogoMinimal className="size-8 origin-center scale-[1.2] lg:hidden" />

                        <div className="flex flex-col gap-2 md:gap-3">
                            <h1 className="text-primary md:text-display-xs text-xl font-semibold">Welcome back</h1>
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
        </div>
    </section>
);
