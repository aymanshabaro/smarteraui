"use client";

import { ArrowUpRight } from "@properui/icons";
import { PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";
import { Tab, TabList, TabPanel, Tabs } from "@/components/application/tabs/tabs";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { NativeSelect } from "@/components/base/select/select-native";
import { IMAGES, avatar } from "@/utils/demo-assets";

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

/** A two-column subscribe header with a mobile category select, desktop tabs and a two-column grid. */
export const BlogHeaderSimple05 = () => (
    <div className="bg-primary">
        <section className="bg-secondary py-16 md:py-24">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="text-brand-secondary md:text-md mb-3 text-sm font-semibold">Blog</div>

                <div className="grid grid-cols-[minmax(1fr,768px)] gap-x-16 lg:grid-cols-[2fr_1fr]">
                    <h2 className="text-display-md text-primary md:text-display-lg font-semibold">Resource library</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl lg:mt-3 lg:h-0 lg:w-120">
                        Subscribe to learn about new product features, the latest in technology, solutions, and updates.
                    </p>

                    <form className="mt-8 grid grid-cols-1 items-start gap-4 self-stretch sm:grid-cols-[335px_max-content]">
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
                            <span className="hidden md:inline">Get started</span>
                            <span className="inline md:hidden">Subscribe</span>
                        </Button>
                    </form>
                </div>
            </div>
        </section>

        <main className="max-w-container mx-auto flex w-full flex-col gap-12 px-4 py-16 md:px-8 md:py-24">
            <NativeSelect
                aria-label="Categories"
                className="md:hidden"
                defaultValue="all"
                options={categories.map((category) => ({ label: category.label, value: category.id }))}
            />

            <Tabs defaultSelectedKey="all" className="gap-12">
                <div className="-m-1 hidden flex-1 self-start overflow-auto p-1 md:flex md:self-auto">
                    <TabList type="button-gray" size="md" aria-label="Blog categories">
                        {categories.map((category) => (
                            <Tab key={category.id} id={category.id} label={category.label} />
                        ))}
                    </TabList>
                </div>

                {categories.map((category) => (
                    <TabPanel key={category.id} id={category.id}>
                        <ul className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-12">
                            {(category.id === "all" ? posts.slice(0, 8) : posts.slice(0, 8).filter((post) => slugify(post.category) === category.id)).map(
                                (post) => (
                                    <PostCard key={post.title} post={post} />
                                ),
                            )}
                        </ul>
                    </TabPanel>
                ))}
            </Tabs>

            <PaginationPageMinimalCenter page={1} total={10} />
        </main>
    </div>
);
