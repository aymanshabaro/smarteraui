import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { IMAGES, avatar } from "@/utils/demo-assets";

const authorHref = (username: string) => `/blog/authors/${username.replace("@", "")}`;
const categoryHref = (label: string) => `/blog/categories/${label.toLowerCase().replace(/\s+/g, "-")}`;

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
] as const;

/** An intro column beside a stacked list of blog posts that turn horizontal on extra-large screens. */
export const BlogSectionSplitLayout02 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto flex flex-col gap-x-16 gap-y-12 px-4 md:px-8 lg:flex-row">
            <div className="w-full max-w-100">
                <h2 className="text-display-sm text-primary md:text-display-md font-semibold">From the blog</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5">The latest industry news, interviews, technologies, and resources.</p>

                <div className="mt-12 hidden flex-col gap-3 md:mt-8 md:flex md:flex-row">
                    <Button size="xl">View all posts</Button>
                </div>
            </div>

            <ul className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-12 lg:col-span-3 lg:grid-cols-1">
                {posts.map((post) => (
                    <li key={post.title}>
                        <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
                            <a href={post.href} tabIndex={-1} className="shrink-0 overflow-hidden rounded-2xl">
                                <img src={post.image.src} alt={post.title} className="h-60 w-full object-cover xl:h-50 xl:w-91.5" />
                            </a>

                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-start gap-2">
                                    <Button href={categoryHref(post.category)} size="sm" color="link-color">
                                        {post.category}
                                    </Button>

                                    <div className="flex flex-col gap-2">
                                        <a
                                            href={post.href}
                                            className="text-primary outline-focus-ring rounded-md text-xl font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 xl:text-lg"
                                        >
                                            {post.title}
                                        </a>
                                        <p className="text-md text-tertiary line-clamp-2">{post.summary}</p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <a href={authorHref(post.author.username)} tabIndex={-1} className="flex">
                                        <Avatar size="md" src={post.author.src} alt={post.author.name} focusable />
                                    </a>
                                    <div>
                                        <p className="text-sm font-semibold">
                                            <a
                                                href={authorHref(post.author.username)}
                                                className="text-primary outline-focus-ring block rounded-xs text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
                                            >
                                                {post.author.name}
                                            </a>
                                        </p>
                                        <p className="text-tertiary text-sm">{post.date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="flex flex-col gap-3 md:hidden">
                <Button size="xl">View all posts</Button>
            </div>
        </div>
    </section>
);
