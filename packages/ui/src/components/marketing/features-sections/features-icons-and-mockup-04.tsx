import { ChartBreakoutSquare, MessageChatCircle, MessageSmileCircle, Zap } from "@properui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { BackgroundPattern } from "@/components/shared-assets/background-patterns";
import { IPhoneMockup } from "@/components/shared-assets/mockups/iphone-mockup";
import { IMAGES } from "@/utils/demo-assets";

const leadingFeatures = [
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
];

const trailingFeatures = [
    {
        title: "Manage your team with reports",
        subtitle: "Measure what matters with Proper's easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.",
        icon: ChartBreakoutSquare,
    },
    {
        title: "Connect with customers",
        subtitle: "Solve a problem or close a sale in real-time with chat. If no one is available, customers are seamlessly routed to email without confusion.",
        icon: MessageSmileCircle,
    },
];

const FeatureItem = ({ title, subtitle, icon }: (typeof leadingFeatures)[number]) => (
    <li>
        <div className="flex max-w-sm flex-col gap-4">
            <FeaturedIcon icon={icon} size="lg" color="gray" theme="modern" className="hidden md:inline-flex" />
            <FeaturedIcon icon={icon} size="md" color="gray" theme="modern" className="inline-flex md:hidden" />
            <div>
                <h3 className="text-primary text-lg font-semibold">{title}</h3>
                <p className="text-md text-tertiary mt-1">{subtitle}</p>
            </div>
        </div>
    </li>
);

export const FeaturesIconsAndMockup04 = () => (
    <section className="bg-primary overflow-hidden pt-16 lg:py-24">
        <div className="max-w-container mx-auto w-full px-4 md:px-8">
            <div className="mx-auto flex w-full flex-col md:text-center lg:max-w-3xl">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Features</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Cutting-edge features for advanced analytics</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
                </p>
            </div>

            <div className="z-10 mt-12 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-2 md:gap-16 lg:grid-cols-12 lg:items-start lg:gap-0">
                <ul className="grid grid-cols-1 gap-x-8 gap-y-10 md:gap-y-12 lg:col-span-3">
                    {leadingFeatures.map((feature) => (
                        <FeatureItem key={feature.title} {...feature} />
                    ))}
                </ul>

                <div className="relative order-last mt-2 flex h-90 w-full max-w-full items-center justify-center md:col-span-2 md:mt-0 md:h-160 md:overflow-visible lg:order-none lg:col-span-6 lg:overflow-hidden">
                    <IPhoneMockup
                        image={IMAGES.square[0].src}
                        className="drop-shadow-iphone-mockup absolute top-0 z-10 w-71 md:top-auto md:w-78.5 md:drop-shadow-none"
                    />
                    <BackgroundPattern pattern="circle" size="md" className="absolute top-20" />
                </div>

                <ul className="z-10 grid grid-cols-1 gap-x-8 gap-y-10 md:gap-y-12 lg:col-span-3">
                    {trailingFeatures.map((feature) => (
                        <FeatureItem key={feature.title} {...feature} />
                    ))}
                </ul>
            </div>
        </div>
    </section>
);
