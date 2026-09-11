"use client";

import { ArrowDown, ArrowUpRight, SearchLg } from "@properui/icons";
import { IMAGES, avatar } from "../../../utils/demo-assets";
import { Tab, TabList, TabPanel, Tabs } from "../../application/tabs/tabs";
import { Avatar } from "../../base/avatar/avatar";
import { BadgeGroup } from "../../base/badges/badge-groups";
import { Badge } from "../../base/badges/badges";
import { Button } from "../../base/buttons/button";
import { Input } from "../../base/input/input";

const slugify = (label: string) => label.toLowerCase().replace(/\s+/g, "-");
const authorHref = (username: string) => `/blog/authors/${username.replace("@", "")}`;
const categoryHref = (label: string) => `/blog/categories/${slugify(label)}`;

const categories = [
    { id: "all", label: "View all" },
    { id: "design", label: "Design" },
    { id: "product", label: "Product" },
    { id: "software-engineering", label: "Software Engineering" },
    { id: "customer-success", label: "Customer Success" },
];

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
        category: "Product",
        readingTime: "8 min read",
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
        category: "Software Engineering",
        readingTime: "8 min read",
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
        category: "Product",
        readingTime: "8 min read",
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
        category: "Product",
        readingTime: "8 min read",
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
        category: "Design",
        readingTime: "8 min read",
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
        category: "Design",
        readingTime: "8 min read",
        author: avatar(5),
        date: "14 Jan 2027",
        image: IMAGES.landscape[6],
        tags: [
            { label: "Design", color: "brand" },
            { label: "Research", color: "indigo" },
        ],
    },
] as const;

type Post = (typeof posts)[number];

const PostCard = ({ post }: { post: Post }) => (
    <li className="md:first:hidden">
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

/** A left-aligned subscribe header, a desktop-only featured post, category tabs and a search field. */
export const BlogHeaderAltLayout03 = () => (
    <div className="bg-primary">
        <section className="py-16 md:py-24">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="flex w-full max-w-3xl flex-col">
                    <span className="text-brand-secondary md:text-md text-sm font-semibold">Blog</span>
                    <h2 className="text-display-md text-primary md:text-display-lg mt-3 font-semibold">Resource library</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">
                        Subscribe to learn about new product features, the latest in technology, solutions, and updates.
                    </p>

                    <form className="mt-8 grid grid-cols-1 items-start gap-4 self-stretch sm:mt-12 sm:grid-cols-[335px_max-content]">
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

        <div className="max-w-container mx-auto hidden px-4 md:block md:px-8">
            <div className="flex flex-col gap-8 lg:flex-row xl:items-start">
                <a href={posts[0].href} tabIndex={-1} className="shrink-0 overflow-hidden rounded-2xl">
                    <img src={posts[0].image.src} alt={posts[0].title} className="aspect-[1.5] w-full object-cover lg:w-125 xl:h-103 xl:w-206" />
                </a>

                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <BadgeGroup color="brand" addonText={posts[0].category} iconTrailing={null}>
                            {posts[0].readingTime}
                        </BadgeGroup>

                        <div className="flex flex-col gap-2">
                            <a
                                href={posts[0].href}
                                className="text-primary outline-focus-ring md:text-display-xs flex justify-between gap-x-4 rounded-md text-xl font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                {posts[0].title}
                            </a>
                            <p className="text-md text-tertiary line-clamp-2 lg:line-clamp-none">{posts[0].summary}</p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <a href={authorHref(posts[0].author.username)} tabIndex={-1}>
                            <Avatar size="md" src={posts[0].author.src} alt={posts[0].author.name} focusable />
                        </a>
                        <div>
                            <p className="text-sm font-semibold">
                                <Button href={authorHref(posts[0].author.username)} size="sm" color="link-gray" className="text-primary">
                                    {posts[0].author.name}
                                </Button>
                            </p>
                            <p className="text-tertiary text-sm">{posts[0].date}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <main className="max-w-container mx-auto flex w-full flex-col gap-12 px-4 pb-16 md:gap-16 md:px-8 md:pt-16 md:pb-24">
            <Tabs defaultSelectedKey="all" className="gap-12">
                <div className="flex flex-col items-end gap-8 md:flex-row">
                    <div className="hidden flex-1 self-start overflow-auto md:flex md:self-auto">
                        <TabList type="button-brand" size="md" aria-label="Blog categories">
                            {categories.map((category) => (
                                <Tab key={category.id} id={category.id} label={category.label} />
                            ))}
                        </TabList>
                    </div>

                    <div className="flex w-full flex-col gap-1.5 md:w-70">
                        <Input size="lg" icon={SearchLg} placeholder="Search" />
                    </div>
                </div>

                {categories.map((category) => (
                    <TabPanel key={category.id} id={category.id}>
                        <ul className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2 xl:grid-cols-3">
                            {(category.id === "all" ? posts : posts.filter((post) => slugify(post.category) === category.id)).map((post) => (
                                <PostCard key={post.title} post={post} />
                            ))}
                        </ul>
                    </TabPanel>
                ))}
            </Tabs>

            <div className="flex w-full flex-col md:w-auto md:flex-row md:justify-center">
                <Button size="xl" color="secondary" iconLeading={ArrowDown}>
                    Load more
                </Button>
            </div>
        </main>
    </div>
);
