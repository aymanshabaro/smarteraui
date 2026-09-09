import { ArrowUpRight } from "@smarteraui/icons";
import { PaginationPageDefault } from "@/components/application/pagination/pagination";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeGroup } from "@/components/base/badges/badge-groups";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { IMAGES, avatar } from "@/utils/demo-assets";

const authorHref = (username: string) => `/blog/authors/${username.replace("@", "")}`;

const posts = [
    {
        href: "/blog/ux-review-presentations",
        title: "UX review presentations",
        summary: "How do you create compelling presentations that wow your colleagues and impress your managers?",
        author: avatar(0),
        date: "20 Jan 2027",
        image: IMAGES.landscape[0],
    },
    {
        href: "/blog/migrating-to-linear-101",
        title: "Migrating to Linear 101",
        summary: "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
        author: avatar(1),
        date: "19 Jan 2027",
        image: IMAGES.landscape[1],
    },
    {
        href: "/blog/building-your-api-stack",
        title: "Building your API stack",
        summary: "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
        author: avatar(2),
        date: "18 Jan 2027",
        image: IMAGES.landscape[2],
    },
    {
        href: "/blog/bill-walsh-leadership-lessons",
        title: "Bill Walsh leadership lessons",
        summary: "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
        author: avatar(8),
        date: "17 Jan 2027",
        image: IMAGES.landscape[3],
    },
    {
        href: "/blog/pm-mental-models",
        title: "PM mental models",
        summary: "Mental models are simple expressions of complex processes or relationships.",
        author: avatar(3),
        date: "16 Jan 2027",
        image: IMAGES.landscape[4],
    },
    {
        href: "/blog/what-is-wireframing",
        title: "What is wireframing?",
        summary: "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
        author: avatar(4),
        date: "15 Jan 2027",
        image: IMAGES.landscape[5],
    },
    {
        href: "/blog/how-collaboration-makes-us-better-designers",
        title: "How collaboration makes us better designers",
        summary: "Collaboration can make our teams stronger, and our individual designs better.",
        author: avatar(5),
        date: "14 Jan 2027",
        image: IMAGES.landscape[6],
    },
    {
        href: "/blog/our-top-10-javascript-frameworks-to-use",
        title: "Our top 10 Javascript frameworks to use",
        summary: "JavaScript frameworks make development easy with extensive features and functionalities.",
        author: avatar(6),
        date: "13 Jan 2027",
        image: IMAGES.landscape[7],
    },
    {
        href: "/blog/podcast-creating-a-better-cx-community",
        title: "Podcast: Creating a better CX Community",
        summary: "Starting a community doesn't need to be complicated, but how do you get started?",
        author: avatar(7),
        date: "12 Jan 2027",
        image: IMAGES.landscape[0],
    },
] as const;

/** A subscribe header on the secondary background with a grid of posts that overlaps it. */
export const BlogHeaderSimple02 = () => (
    <div className="bg-primary">
        <section className="bg-secondary pt-16 pb-32 md:pt-24 md:pb-40">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                    <span className="text-brand-secondary md:text-md text-sm font-semibold">Blog</span>
                    <h2 className="text-display-md text-primary md:text-display-lg mt-3 font-semibold">Resource library</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">
                        Subscribe to learn about new product features, the latest in technology, solutions, and updates.
                    </p>

                    <form className="mt-8 grid w-full grid-cols-1 items-start gap-4 sm:mt-12 sm:w-auto sm:grid-cols-[345px_max-content]">
                        <div className="flex flex-col gap-1.5 text-start">
                            <Input isRequired size="lg" type="email" name="email" placeholder="Enter your email" wrapperClassName="py-0.5" />
                            <span className="text-tertiary flex w-full text-sm">
                                We care about your data in our&nbsp;
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

        <main className="max-w-container mx-auto -mt-16 flex w-full flex-col gap-12 px-4 pb-16 md:-mt-24 md:px-8 md:pb-24 lg:gap-16">
            <ul className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-12 lg:grid-cols-3">
                {posts.map((post) => (
                    <li key={post.title}>
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
                                    <BadgeGroup color="brand" addonText="Design" iconTrailing={null} className="pr-3">
                                        8 min read
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

            <PaginationPageDefault page={1} total={10} />
        </main>
    </div>
);
