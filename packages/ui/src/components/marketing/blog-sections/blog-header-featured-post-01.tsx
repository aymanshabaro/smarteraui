"use client";

import { ArrowUpRight } from "@properui/icons";
import { IMAGES, avatar } from "../../../utils/demo-assets";
import { PaginationPageDefault } from "../../application/pagination/pagination";
import { Tab, TabList, TabPanel, Tabs } from "../../application/tabs/tabs";
import { Avatar } from "../../base/avatar/avatar";
import { Select } from "../../base/select/select";

const slugify = (label: string) => label.toLowerCase().replace(/\s+/g, "-");
const authorHref = (username: string) => `/blog/authors/${username.replace("@", "")}`;

const categories = [
    { id: "all", label: "View all" },
    { id: "design", label: "Design" },
    { id: "product", label: "Product" },
    { id: "software-engineering", label: "Software Engineering" },
    { id: "customer-success", label: "Customer Success" },
];

const sortOptions = [
    { id: "recent", label: "Most recent" },
    { id: "popular", label: "Most popular" },
    { id: "viewed", label: "Most viewed" },
];

const featuredPost = {
    href: "/blog/improve-your-design-skills",
    title: 'Improve your design skills: Develop an "eye" for design',
    summary: 'Tools and trends change, but good design is timeless. Learn how to quickly develop an "eye" for design.',
    category: "Design",
    author: avatar(9),
    date: "10 April 2027",
    image: IMAGES.landscape[3],
    tags: ["Design", "Research", "Presentation"],
};

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
            <a
                href={post.href}
                tabIndex={-1}
                className="before:ring-alpha-black/10 relative overflow-hidden rounded-2xl before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:ring-[0.5px] before:ring-inset"
            >
                <img src={post.image.src} alt={post.title} className="aspect-[1.5] w-full object-cover transition duration-100 ease-linear hover:scale-105" />
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
);

/** A large featured post above category tabs, a sort select and a three-column post grid. */
export const BlogHeaderFeaturedPost01 = () => (
    <div className="bg-primary">
        <section className="bg-primary py-16 md:py-24">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="flex w-full max-w-3xl flex-col">
                    <span className="text-brand-secondary md:text-md text-sm font-semibold">Our blog</span>
                    <h2 className="text-display-md text-primary md:text-display-lg mt-3 font-semibold">Resources and insights</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">The latest industry news, interviews, technologies, and resources.</p>
                </div>
            </div>
        </section>

        <main className="max-w-container mx-auto flex w-full flex-col gap-12 px-4 pb-16 md:gap-16 md:px-8 md:pb-24">
            <a
                href={featuredPost.href}
                className="outline-focus-ring relative hidden w-full overflow-hidden rounded-2xl select-none focus-visible:outline-2 focus-visible:outline-offset-4 md:block md:h-145 lg:h-180"
            >
                <img
                    src={featuredPost.image.src}
                    alt={featuredPost.title}
                    className="outline-alpha-black/10 absolute inset-0 size-full rounded-[inherit] object-cover outline-[0.5px] -outline-offset-[0.5px]"
                />

                <div className="absolute inset-x-0 bottom-0 w-full bg-linear-to-t from-black/40 to-transparent pt-24">
                    <div className="flex w-full flex-col gap-6 p-8">
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-4">
                                <p className="text-display-xs flex-1 font-semibold text-white">{featuredPost.title}</p>
                                <ArrowUpRight aria-hidden="true" className="text-fg-white size-6 shrink-0" />
                            </div>
                            <p className="text-md line-clamp-2 text-white/80">{featuredPost.summary}</p>
                        </div>

                        <div className="flex gap-6">
                            <div className="flex flex-1 gap-8">
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-semibold text-white">Written by</p>
                                    <div className="flex items-center gap-2">
                                        <Avatar size="md" src={featuredPost.author.src} alt={featuredPost.author.name} border className="bg-primary" />
                                        <p className="text-sm font-semibold text-white">{featuredPost.author.name}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-semibold text-white">Published on</p>
                                    <div className="flex h-10 items-center">
                                        <p className="text-md font-semibold text-white">{featuredPost.date}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-semibold text-white">File under</p>
                                <ul className="flex h-10 items-center gap-2">
                                    {featuredPost.tags.map((tag) => (
                                        <li
                                            key={tag}
                                            className="text-fg-white rounded-full bg-transparent px-2 py-0.5 text-xs font-medium ring-1 ring-white/30 ring-inset"
                                        >
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </a>

            <div className="md:hidden">
                <article className="flex flex-col gap-4">
                    <a
                        href={featuredPost.href}
                        tabIndex={-1}
                        className="before:ring-alpha-black/10 relative overflow-hidden rounded-2xl before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:ring-[0.5px] before:ring-inset"
                    >
                        <img
                            src={featuredPost.image.src}
                            alt={featuredPost.title}
                            className="aspect-[1.5] w-full object-cover transition duration-100 ease-linear hover:scale-105"
                        />
                    </a>

                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <span className="text-brand-secondary text-sm font-semibold">{featuredPost.category}</span>

                            <div className="flex flex-col gap-1">
                                <a
                                    href={featuredPost.href}
                                    className="group/title text-primary outline-focus-ring flex justify-between gap-x-4 rounded-md text-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
                                >
                                    {featuredPost.title}
                                    <ArrowUpRight
                                        aria-hidden="true"
                                        className="text-fg-quaternary group-hover/title:text-fg-quaternary_hover mt-0.5 size-6 shrink-0 transition duration-100 ease-linear"
                                    />
                                </a>
                                <p className="text-md text-tertiary line-clamp-2">{featuredPost.summary}</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <a href={authorHref(featuredPost.author.username)} tabIndex={-1} className="flex">
                                <Avatar size="md" src={featuredPost.author.src} alt={featuredPost.author.name} border focusable />
                            </a>
                            <div>
                                <a
                                    href={authorHref(featuredPost.author.username)}
                                    className="text-primary outline-focus-ring block rounded-xs text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
                                >
                                    {featuredPost.author.name}
                                </a>
                                <time className="text-tertiary block text-sm">{featuredPost.date}</time>
                            </div>
                        </div>
                    </div>
                </article>
            </div>

            <Tabs defaultSelectedKey="all" className="gap-12 md:gap-16">
                <div className="flex flex-col items-end gap-8 md:flex-row">
                    <div className="flex w-full overflow-auto">
                        <TabList type="underline" size="md" aria-label="Blog categories" className="w-full">
                            {categories.map((category) => (
                                <Tab key={category.id} id={category.id} label={category.label} />
                            ))}
                        </TabList>
                    </div>

                    <div className="relative w-full md:max-w-44">
                        <Select aria-label="Sort by" size="sm" defaultSelectedKey="recent" items={sortOptions}>
                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                        </Select>
                    </div>
                </div>

                {categories.map((category) => (
                    <TabPanel key={category.id} id={category.id}>
                        <ul className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-12 lg:grid-cols-3">
                            {(category.id === "all" ? posts : posts.filter((post) => slugify(post.category) === category.id)).map((post) => (
                                <PostCard key={post.title} post={post} />
                            ))}
                        </ul>
                    </TabPanel>
                ))}
            </Tabs>

            <PaginationPageDefault page={1} total={10} />
        </main>
    </div>
);
