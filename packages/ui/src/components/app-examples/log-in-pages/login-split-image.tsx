import { Button } from "@/components/base/buttons/button";
import { SocialButton } from "@/components/base/buttons/social-button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { SmarteraLogoMinimal } from "@/components/foundations/logo/smartera-logo-minimal";
import { IMAGES } from "@/utils/demo-assets";

/** Split log in page with a centred form on the left and a full-bleed decorative image on the right. */
export const LoginSplitImage = () => (
    <section className="bg-primary grid min-h-screen grid-cols-1 overflow-hidden lg:grid-cols-2">
        <div className="bg-primary flex flex-col">
            <div className="flex flex-1 justify-center px-4 py-12 md:items-center md:px-8">
                <div className="flex w-full flex-col gap-8 sm:max-w-90">
                    <div className="flex flex-col items-center gap-6 text-center">
                        <SmarteraLogoMinimal className="size-8 origin-center scale-[1.2]" />

                        <div className="flex flex-col gap-2 md:gap-3">
                            <h1 className="text-primary md:text-display-xs text-xl font-semibold">Welcome back</h1>
                            <p className="text-tertiary text-md">Welcome back! Please enter your details.</p>
                        </div>
                    </div>

                    <Form className="relative flex flex-col gap-6">
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
                <p className="text-tertiary text-sm">© Smartera UI 2077</p>
            </footer>
        </div>

        <div className="relative overflow-hidden max-lg:hidden">
            <img src={IMAGES.landscape[3].src} alt="" className="absolute inset-0 size-full object-cover" />
        </div>
    </section>
);
