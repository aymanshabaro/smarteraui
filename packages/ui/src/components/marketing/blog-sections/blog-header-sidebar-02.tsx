"use client";

import { ArrowUpRight, SearchLg } from "@properui/icons";
import { PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";
import { Tab, TabList, TabPanel, Tabs } from "@/components/application/tabs/tabs";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeGroup } from "@/components/base/badges/badge-groups";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { NativeSelect } from "@/components/base/select/select-native";
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

const sidebarCategories = [
    { id: "all", label: "View all" },
    { id: "design", label: "Design" },
    { id: "product", label: "Product" },
    { id: "software-engineering", label: "Software Development" },
    { id: "customer-success", label: "Customer Success" },
    { id: "leadership", label: "Leadership" },
    { id: "management", label: "Management" },
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
    <li className="flex flex-col gap-6 md:gap-8">
        <article className="flex flex-col gap-4">
            <a
                href={post.href}
                tabIndex={-1}
                className="before:ring-alpha-black/10 relative overflow-hidden before:pointer-events-none before:absolute before:inset-0 before:z-10 before:ring-[0.5px] before:ring-inset"
            >
                <img src={post.image.src} alt={post.title} className="aspect-[1.5] w-full object-cover transition duration-100 ease-linear hover:scale-105" />
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
);

const FeaturedPostCard = ({ post }: { post: Post }) => (
    <li className="flex flex-col gap-6 md:gap-8 lg:col-span-2 lg:flex-row">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start xl:gap-8">
            <a href={post.href} tabIndex={-1} className="shrink-0 overflow-hidden">
                <img src={post.image.src} alt={post.title} className="aspect-[1.5] w-full object-cover lg:w-105 xl:w-140" />
            </a>

            <div className="flex flex-col gap-5 lg:gap-6">
                <div className="flex flex-col gap-3 lg:gap-4">
                    <BadgeGroup color="brand" addonText={post.category} iconTrailing={null}>
                        {post.readingTime}
                    </BadgeGroup>

                    <div className="flex flex-col gap-1 xl:gap-3">
                        <a
                            href={post.href}
                            className="text-primary outline-focus-ring md:text-display-xs flex justify-between gap-x-4 rounded-md text-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            {post.title}
                        </a>
                        <p className="text-md text-tertiary line-clamp-2 xl:line-clamp-4">{post.summary}</p>
                    </div>
                </div>

                <div className="flex max-h-10 gap-2">
                    <a href={authorHref(post.author.username)} tabIndex={-1}>
                        <Avatar size="md" src={post.author.src} alt={post.author.name} focusable />
                    </a>
                    <div>
                        <p className="text-sm font-semibold">
                            <Button href={authorHref(post.author.username)} size="sm" color="link-gray" className="text-primary">
                                {post.author.name}
                            </Button>
                        </p>
                        <p className="text-tertiary text-sm">{post.date}</p>
                    </div>
                </div>
            </div>
        </div>
    </li>
);

/** A search-and-category sidebar beside a post grid led by a full-width featured article. */
export const BlogHeaderSidebar02 = () => (
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
            <Tabs defaultSelectedKey="all" orientation="vertical" className="flex-col gap-12 md:flex-row md:gap-16">
                <div className="flex w-full flex-col items-stretch md:max-w-70 md:gap-8">
                    <Input size="lg" icon={SearchLg} placeholder="Search" wrapperClassName="hidden md:flex" />

                    <div className="flex flex-col gap-5">
                        <p className="text-brand-secondary hidden text-sm font-semibold md:block">Blog categories</p>

                        <NativeSelect
                            aria-label="Categories"
                            className="md:hidden"
                            defaultValue="all"
                            options={categories.map((category) => ({ label: category.label, value: category.id }))}
                        />

                        <div className="hidden w-full flex-1 self-start overflow-auto md:flex md:self-auto">
                            <TabList type="button-gray" size="md" orientation="vertical" aria-label="Blog categories" className="w-full py-0">
                                {sidebarCategories.map((category) => (
                                    <Tab key={category.id} id={category.id} label={category.label} />
                                ))}
                            </TabList>
                        </div>
                    </div>
                </div>

                {sidebarCategories.map((category) => {
                    const shown = category.id === "all" ? posts : posts.filter((post) => slugify(post.category) === category.id);

                    return (
                        <TabPanel key={category.id} id={category.id} className="w-full">
                            <ul className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2">
                                {shown.map((post, index) =>
                                    index === 0 ? <FeaturedPostCard key={post.title} post={post} /> : <PostCard key={post.title} post={post} />,
                                )}
                            </ul>
                        </TabPanel>
                    );
                })}
            </Tabs>

            <PaginationPageMinimalCenter page={1} total={10} />
        </main>
    </div>
);
