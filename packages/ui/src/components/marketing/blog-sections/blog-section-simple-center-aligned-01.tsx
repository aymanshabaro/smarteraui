import { ArrowUpRight } from "@smarteraui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
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
] as const;

/** A centered eyebrow, heading and intro above a three-column grid of tagged blog cards. */
export const BlogSectionSimpleCenterAligned01 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto max-w-3xl text-center">
                <p className="text-brand-secondary md:text-md text-sm font-semibold">Latest posts</p>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Smartera blog</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">Interviews, tips, guides, industry best practices, and news.</p>
            </div>

            <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:mt-16 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
                {posts.map((post) => (
                    <li key={post.title}>
                        <article className="flex flex-col gap-4">
                            <a
                                href={post.href}
                                tabIndex={-1}
                                className="before:ring-alpha-black/10 relative overflow-hidden rounded-2xl before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:ring-[0.5px] before:ring-inset"
                            >
                                <img
                                    src={post.image.src}
                                    alt={post.title}
                                    className="aspect-[1.5] w-full object-cover transition duration-100 ease-linear hover:scale-105"
                                />
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
                ))}
            </ul>

            <div className="mt-12 flex flex-col justify-center gap-3 md:mt-16 md:flex-row">
                <Button size="xl">View all posts</Button>
            </div>
        </div>
    </section>
);
