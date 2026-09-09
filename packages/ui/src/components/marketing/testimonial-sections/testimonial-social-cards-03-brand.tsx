import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { VerifiedTick } from "@/components/base/avatar/base-components";
import { cx, sortCx } from "@/utils/cx";
import { AVATARS, LOGOS } from "@/utils/demo-assets";

const styles = sortCx({
    card: "flex flex-col gap-8 rounded-xl bg-brand-section_subtle p-6 shadow-xs lg:justify-between lg:gap-12 lg:p-8",
});

const columns = [
    {
        className: "lg:py-8",
        reviews: [
            {
                logo: LOGOS[0],
                quote: "Smartera has been a lifesaver for our team—everything we need is right at our fingertips, and it helps us jump right into new design projects.",
                author: AVATARS[0],
                role: `Product Designer, ${LOGOS[0].name}`,
            },
            {
                logo: LOGOS[1],
                quote: "We love Smartera! It's made the design process super streamlined.",
                author: AVATARS[1],
                role: `UI Designer, ${LOGOS[1].name}`,
            },
            {
                logo: LOGOS[2],
                quote: "Starting projects used to feel daunting, but Smartera simplifies everything. We've used it for both small and large projects, and it never disappoints.",
                author: AVATARS[2],
                role: `Founder, ${LOGOS[2].name}`,
            },
        ],
    },
    {
        className: "",
        reviews: [
            {
                logo: LOGOS[3],
                quote: "Smartera is our secret weapon for staying ahead of deadlines. It gives us everything we need to get started quickly.",
                author: AVATARS[3],
                role: `UX Designer, ${LOGOS[3].name}`,
            },
            {
                logo: LOGOS[4],
                quote: "Smartera is hands down the best design library we've used. It has literally everything we need to get started for any possible project.",
                author: AVATARS[4],
                role: `Web Designer, ${LOGOS[4].name}`,
            },
            {
                logo: LOGOS[5],
                quote: "With Smartera, we can focus more on design and less on the tedious setup work. Best money ever spent.",
                author: AVATARS[5],
                role: `CTO, ${LOGOS[5].name}`,
            },
        ],
    },
    {
        className: "lg:pt-10",
        reviews: [
            {
                logo: LOGOS[0],
                quote: "Our workflow has improved dramatically since we started using Smartera and it's become an integral part of our workflow. It's easy to use, and the resources are top-notch. I recommend it to everyone!",
                author: AVATARS[6],
                role: `Project Lead, ${LOGOS[0].name}`,
            },
            {
                logo: LOGOS[1],
                quote: "Smartera is an absolute game-changer for our projects. We can't imagine going back to how we used to work without it.",
                author: AVATARS[7],
                role: `UI/UX Designer, ${LOGOS[1].name}`,
            },
            {
                logo: LOGOS[2],
                quote: "Smartera has been a real time-saver for us. It's organized, efficient, and keeps us moving forward with every project.",
                author: AVATARS[8],
                role: `Product Designer, ${LOGOS[2].name}`,
            },
        ],
    },
] as const;

/** The staggered review columns on the brand-colored section background. */
export const TestimonialSocialCards03Brand = () => (
    <section className="bg-brand-section flex flex-col items-center gap-16 py-16 lg:py-24">
        <div className="max-w-container flex flex-col items-center gap-4 px-4 text-center lg:gap-5 lg:px-8">
            <h2 className="text-display-sm lg:text-display-md text-primary_on-brand font-semibold">Our reviews</h2>
            <p className="text-tertiary_on-brand text-lg lg:text-xl">Hear first-hand from our incredible community of customers.</p>
        </div>

        <div className="max-w-container grid grid-cols-1 gap-5 mask-b-from-[calc(100%-340px)] px-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:px-8">
            {columns.map((column, columnIndex) => (
                <div key={columnIndex} className={cx("flex flex-col gap-5 lg:gap-8", column.className)}>
                    {column.reviews.map((review) => (
                        <div key={review.author.name} className={styles.card}>
                            <div className="flex flex-col items-start gap-3">
                                {/* `invert` is a documented asset swap: the placeholder wordmarks ship as a single mono
                                    set instead of the reference's paired colour/white files. */}
                                <img src={review.logo.src} alt={review.logo.name} className="h-8 object-contain opacity-85 invert" />
                                <blockquote className="text-md text-tertiary_on-brand">{review.quote}</blockquote>
                            </div>

                            <AvatarLabelGroup
                                size="lg"
                                src={review.author.src}
                                alt={review.author.name}
                                avatarClassName="p-0 ring-0"
                                title={
                                    <span className="text-primary_on-brand relative flex items-center gap-1">
                                        {review.author.name}
                                        <VerifiedTick size="lg" />
                                    </span>
                                }
                                subtitle={<span className="text-tertiary_on-brand">{review.role}</span>}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </section>
);
