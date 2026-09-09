"use client";

import { ArrowUpRight, Mail01, SearchLg } from "@smarteraui/icons";
import { PaginationPageDefault } from "@/components/application/pagination/pagination";
import { Tab, TabList, TabPanel, Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { IMAGES, avatar } from "@/utils/demo-assets";

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
    {
        href: "/blog/pm-mental-models",
        title: "PM mental models",
        summary: "Mental models are simple expressions of complex processes or relationships.",
        category: "Product",
        author: avatar(3),
        date: "16 Jan 2027",
        image: IMAGES.landscape[3],
    },
    {
        href: "/blog/what-is-wireframing",
        title: "What is wireframing?",
        summary: "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
        category: "Design",
        author: avatar(4),
        date: "15 Jan 2027",
        image: IMAGES.landscape[4],
    },
    {
        href: "/blog/how-collaboration-makes-us-better-designers",
        title: "How collaboration makes us better designers",
        summary: "Collaboration can make our teams stronger, and our individual designs better.",
        category: "Design",
        author: avatar(5),
        date: "14 Jan 2027",
        image: IMAGES.landscape[5],
    },
    {
        href: "/blog/our-top-10-javascript-frameworks-to-use",
        title: "Our top 10 Javascript frameworks to use",
        summary: "JavaScript frameworks make development easy with extensive features and functionalities.",
        category: "Product",
        author: avatar(6),
        date: "13 Jan 2027",
        image: IMAGES.landscape[6],
    },
    {
        href: "/blog/podcast-creating-a-better-cx-community",
        title: "Podcast: Creating a better CX Community",
        summary: "Starting a community doesn't need to be complicated, but how do you get started?",
        category: "Customer Success",
        author: avatar(7),
        date: "12 Jan 2027",
        image: IMAGES.landscape[7],
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

const PostGrid = ({ items }: { items: readonly Post[] }) => (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-12 lg:grid-cols-3">
        {items.slice(0, 3).map((post) => (
            <PostCard key={post.title} post={post} />
        ))}

        <li>
            <form className="bg-secondary ring-secondary flex flex-col gap-8 self-start rounded-2xl p-6 shadow-xs ring-1 ring-inset md:p-8">
                <FeaturedIcon icon={Mail01} theme="modern" size="xl" color="gray" />

                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-primary text-xl font-semibold">Weekly newsletter</h2>
                        <p className="text-md text-tertiary">
                            No spam. Just the latest releases and tips, interesting articles, and exclusive interviews in your inbox every week.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Input
                            isRequired
                            size="lg"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            hint={
                                <span>
                                    Read about our{" "}
                                    <a
                                        href="/privacy"
                                        className="decoration-utility-neutral-300 outline-focus-ring rounded-xs underline underline-offset-3 focus-visible:outline-2 focus-visible:outline-offset-2"
                                    >
                                        privacy policy
                                    </a>
                                    .
                                </span>
                            }
                        />
                        <Button type="submit" size="xl">
                            Subscribe
                        </Button>
                    </div>
                </div>
            </form>
        </li>

        {items.slice(3).map((post) => (
            <PostCard key={post.title} post={post} />
        ))}
    </ul>
);

/** A centered blog header with search, category tabs, a sort select and a newsletter card in the grid. */
export const BlogHeaderSimple01 = () => (
    <div className="bg-primary">
        <section className="bg-primary py-16 md:py-24">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                    <span className="text-brand-secondary md:text-md text-sm font-semibold">Our blog</span>
                    <h2 className="text-display-md text-primary md:text-display-lg mt-3 font-semibold">The latest writings from our team</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">The latest industry news, interviews, technologies, and resources.</p>

                    <div className="mt-8 grid self-stretch sm:mt-12 sm:w-80 sm:self-center">
                        <Input isRequired size="lg" icon={SearchLg} placeholder="Search" wrapperClassName="md:py-0.5" />
                    </div>
                </div>
            </div>
        </section>

        <main className="max-w-container mx-auto flex w-full flex-col gap-12 px-4 pb-16 md:gap-16 md:px-8 md:pb-24">
            <Tabs defaultSelectedKey="all" className="gap-12 md:gap-16">
                <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                    <div className="-mx-4 -my-1 flex w-full overflow-auto px-4 py-1 md:-ml-8 md:pl-8">
                        <TabList type="button-minimal" size="md" aria-label="Blog categories">
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
                        <PostGrid items={category.id === "all" ? posts : posts.filter((post) => slugify(post.category) === category.id)} />
                    </TabPanel>
                ))}
            </Tabs>

            <PaginationPageDefault page={1} total={10} />
        </main>
    </div>
);
