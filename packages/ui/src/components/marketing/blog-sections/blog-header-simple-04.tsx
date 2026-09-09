"use client";

import { ArrowDown, ArrowUpRight } from "@smarteraui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { IMAGES, avatar } from "@/utils/demo-assets";

const authorHref = (username: string) => `/blog/authors/${username.replace("@", "")}`;
const categoryHref = (label: string) => `/blog/categories/${label.toLowerCase().replace(/\s+/g, "-")}`;

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
        category: "Product",
        readingTime: "8 min read",
        author: avatar(1),
        date: "19 Jan 2027",
        image: IMAGES.landscape[1],
    },
    {
        href: "/blog/building-your-api-stack",
        title: "Building your API stack",
        summary: "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
        category: "Software Engineering",
        readingTime: "8 min read",
        author: avatar(2),
        date: "18 Jan 2027",
        image: IMAGES.landscape[2],
    },
    {
        href: "/blog/bill-walsh-leadership-lessons",
        title: "Bill Walsh leadership lessons",
        summary: "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
        category: "Product",
        readingTime: "8 min read",
        author: avatar(8),
        date: "17 Jan 2027",
        image: IMAGES.landscape[3],
    },
    {
        href: "/blog/pm-mental-models",
        title: "PM mental models",
        summary: "Mental models are simple expressions of complex processes or relationships.",
        category: "Product",
        readingTime: "8 min read",
        author: avatar(3),
        date: "16 Jan 2027",
        image: IMAGES.landscape[4],
    },
    {
        href: "/blog/what-is-wireframing",
        title: "What is wireframing?",
        summary: "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
        category: "Design",
        readingTime: "8 min read",
        author: avatar(4),
        date: "15 Jan 2027",
        image: IMAGES.landscape[5],
    },
    {
        href: "/blog/how-collaboration-makes-us-better-designers",
        title: "How collaboration makes us better designers",
        summary: "Collaboration can make our teams stronger, and our individual designs better.",
        category: "Design",
        readingTime: "8 min read",
        author: avatar(5),
        date: "14 Jan 2027",
        image: IMAGES.landscape[6],
    },
    {
        href: "/blog/our-top-10-javascript-frameworks-to-use",
        title: "Our top 10 Javascript frameworks to use",
        summary: "JavaScript frameworks make development easy with extensive features and functionalities.",
        category: "Product",
        readingTime: "8 min read",
        author: avatar(6),
        date: "13 Jan 2027",
        image: IMAGES.landscape[7],
    },
    {
        href: "/blog/podcast-creating-a-better-cx-community",
        title: "Podcast: Creating a better CX Community",
        summary: "Starting a community doesn't need to be complicated, but how do you get started?",
        category: "Customer Success",
        readingTime: "8 min read",
        author: avatar(7),
        date: "12 Jan 2027",
        image: IMAGES.landscape[0],
    },
] as const;

type Post = (typeof posts)[number];

const PostCard = ({ post }: { post: Post }) => (
    <li>
        <article className="flex flex-col gap-4">
            <div className="relative overflow-hidden">
                <a
                    href={post.href}
                    tabIndex={-1}
                    className="before:ring-alpha-black/10 relative w-full overflow-hidden before:pointer-events-none before:absolute before:inset-0 before:z-10 before:ring-[0.5px] before:ring-inset"
                >
                    <img
                        src={post.image.src}
                        alt={post.title}
                        className="aspect-[1.5] w-full object-cover transition duration-100 ease-linear hover:scale-105"
                    />
                </a>

                <div className="absolute inset-x-0 bottom-0 overflow-hidden bg-linear-to-b from-transparent to-black/40">
                    <div className="bg-alpha-white/30 before:bg-alpha-white/30 relative flex items-start justify-between p-4 backdrop-blur-md before:absolute before:inset-x-0 before:top-0 before:h-px md:p-5">
                        <div>
                            <a
                                href={authorHref(post.author.username)}
                                className="outline-focus-ring block rounded-xs text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                {post.author.name}
                            </a>
                            <time className="block text-sm text-white">{post.date}</time>
                        </div>

                        <a
                            href={categoryHref(post.category)}
                            className="outline-focus-ring rounded-xs text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            {post.category}
                        </a>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-start gap-5">
                <div className="flex flex-col gap-1">
                    <a
                        href={post.href}
                        className="text-primary outline-focus-ring flex justify-between gap-x-4 rounded-md text-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        {post.title}
                    </a>
                    <p className="text-md text-tertiary line-clamp-2">{post.summary}</p>
                </div>

                <Button href={post.href} size="lg" color="link-color" iconTrailing={ArrowUpRight}>
                    Read post
                </Button>
            </div>
        </article>
    </li>
);

/** A brand-section subscribe header above a three-column post grid and a load-more control. */
export const BlogHeaderSimple04 = () => (
    <div className="bg-primary">
        <section className="bg-brand-section py-16 md:py-24">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                    <span className="text-secondary_on-brand md:text-md text-sm font-semibold">Resources</span>
                    <h2 className="text-display-md text-primary_on-brand md:text-display-lg mt-3 font-semibold">Smartera blog</h2>
                    <p className="text-secondary_on-brand mt-4 text-lg md:mt-6 md:text-xl">
                        Tool and strategies modern teams need to help their companies grow.
                    </p>

                    <form className="mt-8 grid w-full grid-cols-1 items-start gap-4 sm:mt-12 sm:w-auto sm:grid-cols-[345px_max-content]">
                        <div className="flex flex-col gap-1.5">
                            <Input isRequired size="lg" type="email" name="email" placeholder="Enter your email" wrapperClassName="py-0.5" />
                            <span className="text-secondary_on-brand self-start text-sm">
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
                            Subscribe
                        </Button>
                    </form>
                </div>
            </div>
        </section>

        <main className="max-w-container mx-auto flex w-full flex-col gap-12 px-4 py-16 md:px-8 md:py-24 lg:gap-16">
            <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <PostCard key={post.title} post={post} />
                ))}
            </ul>

            <div className="flex w-full flex-col md:w-auto md:flex-row md:justify-center">
                <Button size="xl" color="secondary" iconLeading={ArrowDown}>
                    Load more
                </Button>
            </div>
        </main>
    </div>
);
