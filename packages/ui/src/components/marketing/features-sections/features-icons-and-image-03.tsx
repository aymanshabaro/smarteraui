import { MessageChatCircle, Zap } from "@properui/icons";
import { VideoPlayer } from "@/components/base/video-player/video-player";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { VIDEO_POSTER, VIDEO_SRC } from "@/utils/demo-assets";

/** Empty WebVTT track — the placeholder clip has no dialogue, but WCAG 1.2.2 wants a track. */
const CAPTIONS = { src: "data:text/vtt;charset=utf-8,WEBVTT%0A%0A", srcLang: "en", label: "English" };

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
];

export const FeaturesIconsAndImage03 = () => (
    <section className="bg-primary">
        <div className="bg-secondary pt-16 pb-28 md:pt-24 md:pb-40">
            <div className="max-w-container mx-auto grid w-full grid-cols-1 gap-12 px-4 md:gap-16 md:px-8 lg:grid-cols-2 lg:gap-24">
                <div className="flex w-full flex-col">
                    <span className="text-brand-secondary md:text-md text-sm font-semibold">New feature</span>
                    <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Introducing team inboxes</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                        Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
                    </p>
                </div>

                <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-1">
                    {features.map((feature) => (
                        <li key={feature.title}>
                            <div className="flex max-w-140 gap-4">
                                <FeaturedIcon icon={feature.icon} size="lg" color="gray" theme="modern" className="hidden md:inline-flex" />
                                <FeaturedIcon icon={feature.icon} size="md" color="gray" theme="modern" className="inline-flex md:hidden" />
                                <div className="flex flex-col items-start gap-4">
                                    <div>
                                        <h3 className="text-primary mt-1.5 text-lg font-semibold md:mt-2.5">{feature.title}</h3>
                                        <p className="text-md text-tertiary mt-1">{feature.subtitle}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        <div className="max-w-container mx-auto -mt-16 flex w-full justify-center px-4 pb-16 md:-mt-24 md:px-8 md:pb-24">
            <VideoPlayer
                size="lg"
                src={VIDEO_SRC}
                poster={VIDEO_POSTER.src}
                captions={CAPTIONS}
                label="Product demo video"
                className="shadow-3xl w-full rounded-xl md:max-w-240"
            />
        </div>
    </section>
);
