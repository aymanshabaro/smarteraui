import { ArrowUpRight } from "@properui/icons";
import { IMAGES, avatar } from "../../../utils/demo-assets";
import { Avatar } from "../../base/avatar/avatar";
import { BadgeGroup } from "../../base/badges/badge-groups";
import { Button } from "../../base/buttons/button";

const authorHref = (username: string) => `/blog/authors/${username.replace("@", "")}`;

const posts = [
    {
        href: "/blog/ux-review-presentations",
        title: "UX review presentations",
        summary: "How do you create compelling presentations that wow your colleagues and impress your managers?",
        category: "Design",
        readingTime: "8 min read",
        author: avatar(0),
        date: "20 Jan 2027",
        image: IMAGES.landscape[0],
    },
    {
        href: "/blog/migrating-to-linear-101",
        title: "Migrating to Linear 101",
        summary: "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
        category: "Design",
        readingTime: "8 min read",
        author: avatar(1),
        date: "19 Jan 2027",
        image: IMAGES.landscape[1],
    },
] as const;

/** A sticky intro column beside two blog cards that carry a category badge group and reading time. */
export const BlogSectionSplitLayout01 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto flex flex-col gap-x-16 gap-y-12 px-4 md:px-8 lg:flex-row">
            <div className="w-full max-w-100">
                <p className="text-brand-secondary md:text-md text-sm font-semibold">Latest</p>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">From the blog</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5">The latest industry news, interviews, technologies, and resources.</p>

                <div className="mt-12 hidden flex-col gap-3 md:mt-8 md:flex md:flex-row">
                    <Button size="xl">View all posts</Button>
                </div>
            </div>

            <ul className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:col-span-3">
                {posts.map((post) => (
                    <li key={post.title} className="flex flex-col gap-5">
                        <article className="flex flex-col gap-4">
                            <a
                                href={post.href}
                                tabIndex={-1}
                                className="before:ring-alpha-black/10 relative overflow-hidden before:pointer-events-none before:absolute before:inset-0 before:z-10 before:ring-[0.5px] before:ring-inset"
                            >
                                <img
                                    src={post.image.src}
                                    alt={post.title}
                                    className="aspect-[1.5] w-full object-cover transition duration-100 ease-linear hover:scale-105"
                                />
                            </a>

                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col items-start gap-3">
                                    <BadgeGroup color="brand" addonText={post.category} iconTrailing={null} className="pe-3">
                                        {post.readingTime}
                                    </BadgeGroup>

                                    <div className="flex flex-col gap-1">
                                        <a
                                            href={post.href}
                                            className="text-primary outline-focus-ring flex justify-between gap-x-4 rounded-md text-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
                                        >
                                            {post.title}
                                            <ArrowUpRight aria-hidden="true" className="text-fg-quaternary mt-0.5 size-6 shrink-0" />
                                        </a>
                                        <p className="text-md text-tertiary line-clamp-2 md:line-clamp-none">{post.summary}</p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <a href={authorHref(post.author.username)} tabIndex={-1} className="flex">
                                        <Avatar size="md" src={post.author.src} alt={post.author.name} border focusable />
                                    </a>
                                    <div>
                                        <a
                                            href={authorHref(post.author.username)}
                                            className="text-primary outline-focus-ring block rounded-xs text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
                                        >
                                            {post.author.name}
                                        </a>
                                        <time className="text-tertiary block text-sm">{post.date}</time>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </li>
                ))}
            </ul>

            <div className="flex flex-col gap-3 md:hidden">
                <Button size="xl">View all posts</Button>
            </div>
        </div>
    </section>
);
