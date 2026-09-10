import { Button } from "@/components/base/buttons/button";
import { Form } from "@/components/base/form/form";
import { Input } from "@/components/base/input/input";
import { HeaderDropdownSimple } from "@/components/marketing/header-navigations/header-dropdown-simple";
import { IMAGES } from "@/utils/demo-assets";

const hint = (
    <span className="text-tertiary_on-brand">
        We care about your data in our{" "}
        <a href="/privacy" className="outline-focus-ring rounded-xs underline underline-offset-3 focus-visible:outline-2 focus-visible:outline-offset-2">
            privacy policy
        </a>
        .
    </span>
);

const Screenshot = ({ className }: { className?: string }) => (
    <div className={className}>
        <div className="relative rounded ring-6 ring-white/50 md:rounded-[10px] md:ring-8">
            <div className="md:shadow-3xl absolute inset-x-4 inset-y-0 h-full shadow-xl md:inset-x-7" />
            <img
                src={IMAGES.landscape[0].src}
                alt="Dashboard mockup showing the application interface"
                className="relative rounded object-cover md:rounded-[10px] lg:max-w-3xl"
            />
        </div>
    </div>
);

/** Brand-coloured card hero with an email capture form beside a framed app screenshot. */
export const HeroColorCard04 = () => (
    <div className="bg-primary relative overflow-hidden">
        <HeaderDropdownSimple />

        <section className="relative overflow-hidden pb-16 md:pt-8 md:pb-24">
            <div className="max-w-container mx-auto md:px-8">
                <div className="bg-brand-section grid w-full grid-cols-1 items-center overflow-hidden px-4 pt-16 pb-24 md:rounded-3xl md:px-8 md:pb-40 lg:grid-cols-2 lg:gap-16 lg:pt-0 lg:pb-0">
                    <div className="flex flex-col items-center text-center lg:block lg:ps-8 lg:text-start">
                        <h1 className="text-display-md text-primary_on-brand md:text-display-lg lg:text-display-2xl max-w-3xl font-semibold">
                            Grow your users.
                            <br className="md:hidden" /> <span className="text-secondary_on-brand">Smarter.</span>
                        </h1>
                        <p className="text-tertiary_on-brand mt-4 max-w-3xl text-lg text-balance md:mt-6 md:text-xl">
                            Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
                        </p>

                        <Form className="mt-10 flex w-full flex-col items-stretch gap-4 md:mt-12 md:max-w-120 md:flex-row md:items-start">
                            <Input
                                isRequired
                                size="lg"
                                name="email"
                                type="email"
                                wrapperClassName="py-0.5 not-focus:ring-transparent"
                                placeholder="Enter your email"
                                aria-label="Enter your email"
                                hint={hint}
                            />
                            <Button type="submit" size="xl">
                                Get started
                            </Button>
                        </Form>
                    </div>

                    <Screenshot className="hidden min-h-160 items-center ps-4 lg:flex" />
                </div>

                <Screenshot className="relative mx-auto -mt-8 w-max max-w-full px-4 md:-mt-24 md:px-8 lg:hidden" />
            </div>
        </section>
    </div>
);
