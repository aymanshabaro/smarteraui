import { ChartBreakoutSquare, MessageChatCircle, MessageSmileCircle, Zap } from "@properui/icons";
import { IMAGES } from "../../../utils/demo-assets";
import { FeaturedIcon } from "../../foundations/featured-icon/featured-icon";
import { IPhoneMockup } from "../../shared-assets/mockups/iphone-mockup";
import { ScreenMockup } from "./mockups.a";

const features = [
    {
        title: "Share team inboxes",
        subtitle: "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
        icon: MessageChatCircle,
    },
    {
        title: "Deliver instant answers",
        subtitle: "An all-in-one customer service platform that helps you balance everything your customers need to be happy.",
        icon: Zap,
    },
    {
        title: "Manage your team with reports",
        subtitle: "Measure what matters with Proper UI's easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.",
        icon: ChartBreakoutSquare,
    },
    {
        title: "Connect with customers",
        subtitle: "Solve a problem or close a sale in real-time with chat. If no one is available, customers are seamlessly routed to email without confusion.",
        icon: MessageSmileCircle,
    },
];

export const FeaturesIconsAndMockup01 = () => (
    <section className="bg-primary overflow-hidden pt-16 lg:py-24">
        <div className="max-w-container mx-auto w-full">
            <div className="flex w-full flex-col px-4 md:px-8 lg:max-w-210">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Features</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Overflowing with useful features</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
                </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-12 px-4 md:mt-16 md:gap-16 md:px-8 lg:grid-cols-2 lg:items-start">
                <ul className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-y-12">
                    {features.map((feature) => (
                        <li key={feature.title}>
                            <div className="flex max-w-sm flex-col gap-4">
                                <FeaturedIcon icon={feature.icon} size="lg" color="gray" theme="modern" className="hidden md:inline-flex" />
                                <FeaturedIcon icon={feature.icon} size="md" color="gray" theme="modern" className="inline-flex md:hidden" />
                                <div>
                                    <h3 className="text-primary text-lg font-semibold">{feature.title}</h3>
                                    <p className="text-md text-tertiary mt-1">{feature.subtitle}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Desktop: phone overlapping the desktop screen */}
                <div className="relative -ms-4 hidden w-screen md:ms-0 lg:flex lg:h-128 lg:w-full">
                    <div className="absolute -top-5 flex items-center">
                        <IPhoneMockup image={IMAGES.square[1].src} className="drop-shadow-iphone-mockup relative z-10 w-71" />
                        <ScreenMockup size="md" className="-ms-24 h-100 w-200 max-w-none">
                            <img src={IMAGES.landscape[1].src} alt={IMAGES.landscape[1].alt} className="size-full object-cover object-left-top" />
                        </ScreenMockup>
                    </div>
                </div>

                {/* Mobile and tablet: phone only */}
                <div className="relative flex h-90 w-full justify-center lg:hidden">
                    <IPhoneMockup image={IMAGES.square[1].src} className="drop-shadow-iphone-mockup absolute top-0 w-71" />
                </div>
            </div>
        </div>
    </section>
);
