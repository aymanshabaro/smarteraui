import { ArrowUpRight } from "@smarteraui/icons";
import { PaginationPageDefault } from "@/components/application/pagination/pagination";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { IMAGES, avatar } from "@/utils/demo-assets";

const categoryHref = (label: string) => `/blog/categories/${label.toLowerCase().replace(/\s+/g, "-")}`;

const posts = [
    {
        href: "/blog/ux-review-presentations",
        title: "UX review presentations",
        summary: "How do you create compelling presentations that wow your colleagues and impress your managers?",
        author: avatar(0),
        date: "20 Jan 2027",
        image: IMAGES.landscape[0],
        tags: [
            { label: "Design", color: "brand" },
            { label: "Research", color: "indigo" },
            { label: "Presentation", color: "pink" },
        ],
    },
    {
        href: "/blog/migrating-to-linear-101",
        title: "Migrating to Linear 101",
        summary: "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
        author: avatar(1),
        date: "19 Jan 2027",
        image: IMAGES.landscape[1],
        tags: [
            { label: "Product", color: "sky" },
            { label: "Tools", color: "pink" },
            { label: "SaaS", color: "pink" },
        ],
    },
    {
        href: "/blog/building-your-api-stack",
        title: "Building your API stack",
        summary: "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
        author: avatar(2),
        date: "18 Jan 2027",
        image: IMAGES.landscape[2],
        tags: [
            { label: "Software Development", color: "success" },
            { label: "Tools", color: "pink" },
        ],
    },
    {
        href: "/blog/bill-walsh-leadership-lessons",
        title: "Bill Walsh leadership lessons",
        summary: "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
        author: avatar(8),
        date: "17 Jan 2027",
        image: IMAGES.landscape[3],
        tags: [
            { label: "Leadership", color: "brand" },
            { label: "Management", color: "slate" },
        ],
    },
    {
        href: "/blog/pm-mental-models",
        title: "PM mental models",
        summary: "Mental models are simple expressions of complex processes or relationships.",
        author: avatar(3),
        date: "16 Jan 2027",
        image: IMAGES.landscape[4],
        tags: [
            { label: "Product", color: "sky" },
            { label: "Research", color: "indigo" },
            { label: "Frameworks", color: "orange" },
        ],
    },
    {
        href: "/blog/what-is-wireframing",
        title: "What is wireframing?",
        summary: "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
        author: avatar(4),
        date: "15 Jan 2027",
        image: IMAGES.landscape[5],
        tags: [
            { label: "Design", color: "brand" },
            { label: "Research", color: "indigo" },
        ],
    },
    {
        href: "/blog/how-collaboration-makes-us-better-designers",
        title: "How collaboration makes us better designers",
        summary: "Collaboration can make our teams stronger, and our individual designs better.",
        author: avatar(5),
        date: "14 Jan 2027",
        image: IMAGES.landscape[6],
        tags: [
            { label: "Design", color: "brand" },
            { label: "Research", color: "indigo" },
        ],
    },
    {
        href: "/blog/our-top-10-javascript-frameworks-to-use",
        title: "Our top 10 Javascript frameworks to use",
        summary: "JavaScript frameworks make development easy with extensive features and functionalities.",
        author: avatar(6),
        date: "13 Jan 2027",
        image: IMAGES.landscape[7],
        tags: [
            { label: "Software Development", color: "success" },
            { label: "Tools", color: "pink" },
            { label: "SaaS", color: "pink" },
        ],
    },
    {
        href: "/blog/podcast-creating-a-better-cx-community",
        title: "Podcast: Creating a better CX Community",
        summary: "Starting a community doesn't need to be complicated, but how do you get started?",
        author: avatar(7),
        date: "12 Jan 2027",
        image: IMAGES.landscape[0],
        tags: [
            { label: "Podcasts", color: "brand" },
            { label: "Customer Success", color: "slate" },
        ],
    },
] as const;

type Post = (typeof posts)[number];

const PostCard = ({ post }: { post: Post }) => (
    <li>
        <article className="flex flex-col gap-4">
            <a
                href={post.href}
                tabIndex={-1}
                className="before:ring-alpha-black/10 relative overflow-hidden rounded-2xl before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:ring-[0.5px] before:ring-inset"
            >
                <img src={post.image.src} alt={post.title} className="aspect-[1.5] w-full object-cover transition duration-100 ease-linear hover:scale-105" />
            </a>

            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-start gap-2">
                    <p className="text-brand-secondary text-sm font-semibold">
                        {post.author.name} • <time>{post.date}</time>
                    </p>

                    <div className="flex w-full flex-col gap-1">
                        <a
                            href={post.href}
                            className="text-primary outline-focus-ring flex justify-between gap-x-4 rounded-md text-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            {post.title}
                            <ArrowUpRight aria-hidden="true" className="text-fg-quaternary mt-0.5 size-5 shrink-0" />
                        </a>
                        <p className="text-md text-tertiary line-clamp-2">{post.summary}</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    {post.tags.map((tag) => (
                        <a
                            key={tag.label}
                            href={categoryHref(tag.label)}
                            className="outline-focus-ring rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            <Badge type="pill-color" color={tag.color}>
                                {tag.label}
                            </Badge>
                        </a>
                    ))}
                </div>
            </div>
        </article>
    </li>
);

const FeaturedPost = ({ post }: { post: Post }) => (
    <article className="flex flex-col gap-4">
        <a
            href={post.href}
            tabIndex={-1}
            className="before:ring-alpha-black/10 relative overflow-hidden rounded-2xl before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:ring-[0.5px] before:ring-inset"
        >
            <img src={post.image.src} alt={post.title} className="aspect-[1.5] w-full object-cover transition duration-100 ease-linear hover:scale-105" />
        </a>

        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start gap-2">
                <p className="text-brand-secondary text-sm font-semibold">
                    {post.author.name} • <time>{post.date}</time>
                </p>

                <div className="flex w-full flex-col gap-1">
                    <a
                        href={post.href}
                        className="text-primary outline-focus-ring lg:text-display-xs flex justify-between gap-x-4 rounded-md text-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 lg:font-semibold"
                    >
                        {post.title}
                        <ArrowUpRight aria-hidden="true" className="text-fg-quaternary mt-0.5 size-5 shrink-0" />
                    </a>
                    <p className="text-md text-tertiary line-clamp-2">{post.summary}</p>
                </div>
            </div>

            <div className="flex gap-2">
                {post.tags.map((tag) => (
                    <a
                        key={tag.label}
                        href={categoryHref(tag.label)}
                        className="outline-focus-ring rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        <Badge type="pill-color" color={tag.color}>
                            {tag.label}
                        </Badge>
                    </a>
                ))}
            </div>
        </div>
    </article>
);

/** A centered subscribe header, a full-width featured post and a three-column grid of tagged posts. */
export const BlogHeaderFeaturedPost03 = () => (
    <div className="bg-primary">
        <section className="bg-primary py-16 md:py-24">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                    <span className="text-brand-secondary md:text-md text-sm font-semibold">Our blog</span>
                    <h2 className="text-display-md text-primary md:text-display-lg mt-3 font-semibold">Resources and insights</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">The latest industry news, interviews, technologies, and resources.</p>

                    <form className="mt-8 grid w-full grid-cols-1 items-start gap-4 sm:mt-12 sm:w-auto sm:grid-cols-[335px_max-content]">
                        <div className="flex flex-col gap-1.5">
                            <Input isRequired size="lg" type="email" name="email" placeholder="Enter your email" wrapperClassName="py-0.5" />
                            <span className="text-tertiary self-start text-sm">
                                We care about your data in our{" "}
                                <a
                                    href="/privacy"
                                    className="outline-focus-ring rounded-xs underline underline-offset-3 focus-visible:outline-2 focus-visible:outline-offset-2"
                                >
                                    privacy policy
                                </a>
                                .
                            </span>
                        </div>

                        <Button type="submit" size="xl">
                            Get started
                        </Button>
                    </form>
                </div>
            </div>
        </section>

        <main className="max-w-container mx-auto flex w-full flex-col gap-y-12 px-4 pb-16 md:gap-y-16 md:px-8 md:pb-24">
            <FeaturedPost post={posts[0]} />

            <ul className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                {posts.slice(1, 7).map((post) => (
                    <PostCard key={post.title} post={post} />
                ))}
            </ul>

            <PaginationPageDefault page={1} total={10} />
        </main>
    </div>
);
