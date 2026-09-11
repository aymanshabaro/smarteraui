import { cx, sortCx } from "../../../utils/cx";
import { AVATARS, LOGOS } from "../../../utils/demo-assets";
import { AvatarLabelGroup } from "../../base/avatar/avatar-label-group";
import { VerifiedTick } from "../../base/avatar/base-components";

const styles = sortCx({
    card: "flex flex-col gap-8 rounded-xl bg-primary_alt p-6 ring-1 ring-secondary ring-inset lg:justify-between lg:gap-12 lg:p-8",
});

const columns = [
    {
        className: "lg:py-8",
        cardClassName: "",
        reviews: [
            {
                logo: LOGOS[0],
                quote: "Proper UI has been a lifesaver for our team, everything we need is right at our fingertips, and it helps us jump right into new design projects.",
                author: AVATARS[0],
                role: `Product Designer, ${LOGOS[0].name}`,
            },
            {
                logo: LOGOS[1],
                quote: "We love Proper UI! It's made the design process super streamlined.",
                author: AVATARS[1],
                role: `UI Designer, ${LOGOS[1].name}`,
            },
            {
                logo: LOGOS[2],
                quote: "Starting projects used to feel daunting, but Proper UI simplifies everything. We've used it for both small and large projects, and it never disappoints.",
                author: AVATARS[2],
                role: `Founder, ${LOGOS[2].name}`,
            },
        ],
    },
    {
        className: "",
        cardClassName: "max-lg:hidden",
        reviews: [
            {
                logo: LOGOS[3],
                quote: "Proper UI is our secret weapon for staying ahead of deadlines. It gives us everything we need to get started quickly.",
                author: AVATARS[3],
                role: `UX Designer, ${LOGOS[3].name}`,
            },
            {
                logo: LOGOS[4],
                quote: "Proper UI is hands down the best design library we've used. It has literally everything we need to get started for any possible project.",
                author: AVATARS[4],
                role: `Web Designer, ${LOGOS[4].name}`,
            },
            {
                logo: LOGOS[5],
                quote: "With Proper UI, we can focus more on design and less on the tedious setup work. Best money ever spent.",
                author: AVATARS[5],
                role: `CTO, ${LOGOS[5].name}`,
            },
        ],
    },
    {
        className: "lg:pt-10 max-lg:hidden",
        cardClassName: "max-lg:hidden",
        reviews: [
            {
                logo: LOGOS[0],
                quote: "Our workflow has improved dramatically since we started using Proper UI and it's become an integral part of our workflow. It's easy to use, and the resources are top-notch. I recommend it to everyone!",
                author: AVATARS[6],
                role: `Project Lead, ${LOGOS[0].name}`,
            },
            {
                logo: LOGOS[1],
                quote: "Proper UI is an absolute game-changer for our projects. We can't imagine going back to how we used to work without it.",
                author: AVATARS[7],
                role: `UI/UX Designer, ${LOGOS[1].name}`,
            },
            {
                logo: LOGOS[2],
                quote: "Proper UI has been a real time-saver for us. It's organized, efficient, and keeps us moving forward with every project.",
                author: AVATARS[8],
                role: `Product Designer, ${LOGOS[2].name}`,
            },
        ],
    },
] as const;

/** Three staggered columns of logo-led reviews, faded out towards the bottom of the section. */
export const TestimonialSocialCards03 = () => (
    <section className="bg-primary flex flex-col items-center gap-16 py-16 lg:py-24">
        <div className="max-w-container flex flex-col items-center gap-4 px-4 text-center lg:gap-5 lg:px-8">
            <h2 className="text-display-sm lg:text-display-md text-primary font-semibold">Our reviews</h2>
            <p className="text-tertiary text-lg lg:text-xl">Hear first-hand from our incredible community of customers.</p>
        </div>

        <div className="max-w-container grid grid-cols-1 gap-5 mask-b-from-[calc(100%-340px)] px-4 lg:grid-cols-3 lg:gap-8 lg:px-8">
            {columns.map((column, columnIndex) => (
                <div key={columnIndex} className={cx("flex flex-col gap-5 lg:gap-8", column.className)}>
                    {column.reviews.map((review) => (
                        <div key={review.author.name} className={cx(styles.card, column.cardClassName)}>
                            <div className="flex flex-col items-start gap-3">
                                {/* `dark:invert` is a documented asset swap: the placeholder wordmarks ship as a single
                                    mono set instead of the reference's paired colour/white files. */}
                                <img src={review.logo.src} alt={review.logo.name} className="h-8 object-contain dark:invert" />
                                <blockquote className="text-md text-tertiary">{review.quote}</blockquote>
                            </div>

                            <AvatarLabelGroup
                                size="lg"
                                src={review.author.src}
                                alt={review.author.name}
                                avatarClassName="p-0 ring-0"
                                title={
                                    <span className="relative flex items-center gap-1">
                                        {review.author.name}
                                        <VerifiedTick size="lg" />
                                    </span>
                                }
                                subtitle={review.role}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </section>
);
