import { ArrowUpRight } from "@properui/icons";
import { IMAGES, avatar } from "../../../utils/demo-assets";
import { Avatar } from "../../base/avatar/avatar";
import { Button } from "../../base/buttons/button";

const authorHref = (username: string) => `/blog/authors/${username.replace("@", "")}`;

const posts = [
    {
        href: "/blog/ux-review-presentations",
        title: "UX review presentations",
        summary: "How do you create compelling presentations that wow your colleagues and impress your managers?",
        category: "Design",
        author: avatar(0),
        date: "20 Jan 2027",
        image: IMAGES.landscape[0],
    },
    {
        href: "/blog/migrating-to-linear-101",
        title: "Migrating to Linear 101",
        summary: "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
        category: "Product",
        author: avatar(1),
        date: "19 Jan 2027",
        image: IMAGES.landscape[1],
    },
    {
        href: "/blog/building-your-api-stack",
        title: "Building your API stack",
        summary: "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
        category: "Software Engineering",
        author: avatar(2),
        date: "18 Jan 2027",
        image: IMAGES.landscape[2],
    },
] as const;

/** A left-aligned intro with a desktop call to action beside it and a three-column grid of blog cards. */
export const BlogSectionSimpleLeftAligned01 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col items-start justify-between lg:flex-row">
                <div className="max-w-3xl">
                    <p className="text-brand-secondary md:text-md text-sm font-semibold">Our blog</p>
                    <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Latest blog posts</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">Tool and strategies modern teams need to help their companies grow.</p>
                </div>

                <div className="hidden gap-3 lg:flex">
                    <Button size="xl">View all posts</Button>
                </div>
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

                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <span className="text-brand-secondary text-sm font-semibold">{post.category}</span>

                                    <div className="flex flex-col gap-1">
                                        <a
                                            href={post.href}
                                            className="group/title text-primary outline-focus-ring flex justify-between gap-x-4 rounded-md text-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
                                        >
                                            {post.title}
                                            <ArrowUpRight
                                                aria-hidden="true"
                                                className="text-fg-quaternary group-hover/title:text-fg-quaternary_hover mt-0.5 size-6 shrink-0 transition duration-100 ease-linear"
                                            />
                                        </a>
                                        <p className="text-md text-tertiary line-clamp-2">{post.summary}</p>
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

            <div className="mt-12 flex flex-col gap-3 lg:hidden">
                <Button size="xl">View all posts</Button>
            </div>
        </div>
    </section>
);
