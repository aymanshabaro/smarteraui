import { ChartBreakoutSquare, MessageChatCircle, Zap } from "@smarteraui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

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
        subtitle: "Measure what matters with Smartera's easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.",
        icon: ChartBreakoutSquare,
    },
];

export const FeaturesSimpleIcons01Brand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <ul className="grid w-full grid-cols-1 justify-items-center gap-x-8 gap-y-10 sm:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
                {features.map((feature) => (
                    <li key={feature.title}>
                        <div className="flex max-w-sm flex-col items-center gap-4 text-center">
                            <FeaturedIcon icon={feature.icon} size="lg" color="brand" theme="dark" className="hidden md:inline-flex" />
                            <FeaturedIcon icon={feature.icon} size="md" color="brand" theme="dark" className="inline-flex md:hidden" />
                            <div>
                                <h3 className="text-primary_on-brand text-lg font-semibold">{feature.title}</h3>
                                <p className="text-md text-tertiary_on-brand mt-1">{feature.subtitle}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </section>
);
