"use client";

import { BookOpen01 } from "@smarteraui/icons";
import { cx } from "@/utils/cx";
import {
    blogCategories,
    blogPosts,
    blogPostsCompact,
    companyItems,
    companyItemsCompact,
    companyItemsSlim,
    featureCard,
    footerLinks,
    getStartedLinks,
    productItems,
    referenceItems,
    resourceItemsCompact,
    resourcesItems,
    resourcesItemsShort,
    supportItems,
    tutorials,
    useCaseItems,
    useCaseItemsWide,
} from "./content";
import {
    NavMenuActionsFooter,
    NavMenuColumn,
    NavMenuFeatureCard,
    NavMenuFooter,
    NavMenuList,
    NavMenuPost,
    NavMenuSeeAllLink,
    NavMenuVideo,
    styles,
} from "./nav-menu";

/** A floating dropdown card. */
const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={cx(styles.card, className)}>{children}</div>;

/** A full-bleed dropdown panel spanning the header width. */
const FullPanel = ({ children }: { children: React.ReactNode }) => <div className={styles.fullPanel}>{children}</div>;

/* -------------------------------------------------------------------------- */
/*  Card menus                                                                */
/* -------------------------------------------------------------------------- */

/** One column of five resources. */
export const SimpleResourcesMenu = ({ withFooter = false }: { withFooter?: boolean }) => (
    <Card className="w-full md:w-80">
        <ul className="flex flex-col gap-1 p-2">
            <NavMenuList items={resourcesItems} />
        </ul>
        {withFooter && (
            <div className="border-secondary bg-secondary flex justify-center border-t py-2">
                <NavMenuSeeAllLink label="All resources" href="/resources" />
            </div>
        )}
    </Card>
);

/** Two columns of five resources. */
export const TwoColumnResourcesMenu = () => (
    <Card className="w-full md:w-[38rem]">
        <div className="grid gap-1 p-2 md:grid-cols-2">
            <ul className="flex flex-col gap-1">
                <NavMenuList items={resourcesItems} />
            </ul>
            <ul className="flex flex-col gap-1">
                <NavMenuList items={referenceItems} />
            </ul>
        </div>
    </Card>
);

/** Two headed columns of boxed product entries, closed by the wide footer strip. */
export const ProductsMenu = () => (
    <Card className="w-full md:w-[40rem]">
        <div className="grid gap-x-4 gap-y-2 p-2 md:grid-cols-2">
            <NavMenuColumn heading="Products">
                <NavMenuList items={productItems} variant="boxed" />
            </NavMenuColumn>
            <NavMenuColumn heading="Use cases">
                <NavMenuList items={useCaseItems} variant="boxed" />
            </NavMenuColumn>
        </div>
        <NavMenuFooter links={footerLinks.slice(1)} />
    </Card>
);

/** A titled menu with a text-link column, two resource columns and an actions footer. */
export const ResourcesWithLinksMenu = () => (
    <Card className="w-full md:w-[50rem]">
        <div className="flex flex-col gap-5 p-5">
            <div className="flex flex-col gap-1">
                <p className="text-primary text-sm font-semibold">Resources</p>
                <p className="text-tertiary text-sm">Get started and learn more about our products.</p>
            </div>

            <div className="grid gap-x-4 gap-y-6 md:grid-cols-3">
                <NavMenuColumn heading="Get started">
                    <NavMenuList items={getStartedLinks} variant="text" />
                </NavMenuColumn>
                <NavMenuColumn heading="Resources" className="-mx-3">
                    <NavMenuList items={resourcesItems.slice(0, 3)} />
                </NavMenuColumn>
                <NavMenuColumn heading="Support" className="-mx-3">
                    <NavMenuList items={supportItems} />
                </NavMenuColumn>
            </div>
        </div>

        <NavMenuActionsFooter
            secondaryLabel="Documentation"
            secondaryIcon={BookOpen01}
            secondaryHref="/docs"
            primaryLabel="View all resources"
            primaryHref="/resources"
        />
    </Card>
);

/** A resources column beside the latest blog posts. */
export const FeaturedPostsMenu = () => (
    <Card className="w-full md:w-[42rem]">
        <div className="grid md:grid-cols-2">
            <div className="p-2">
                <NavMenuColumn heading="Resources">
                    <NavMenuList items={resourcesItemsShort} />
                </NavMenuColumn>
            </div>
            <div className="border-secondary flex flex-col p-2 md:border-s">
                <p className={styles.columnHeading}>Latest blog posts</p>
                <ul className="flex flex-col gap-1">
                    {blogPosts.slice(0, 3).map((post) => (
                        <li key={post.title}>
                            <NavMenuPost {...post} />
                        </li>
                    ))}
                </ul>
                <NavMenuSeeAllLink label="All blog posts" href="/blog" className="mt-1" />
            </div>
        </div>
    </Card>
);

/** A resources column beside a promotional feature card. */
export const FeatureCardMenu = () => (
    <Card className="w-full md:w-[40rem]">
        <div className="grid md:grid-cols-2">
            <div className="p-2">
                <ul className="flex flex-col gap-1">
                    <NavMenuList items={resourcesItemsShort} />
                </ul>
            </div>
            <NavMenuFeatureCard {...featureCard} />
        </div>
    </Card>
);

/** Two resource columns beside a tutorials sidebar, closed by an actions footer. */
export const TwoColumnSidebarMenu = () => (
    <Card className="w-full md:w-[56rem]">
        <div className="grid md:grid-cols-3">
            <div className="p-2 md:col-span-2">
                <div className="grid gap-x-4 gap-y-6 md:grid-cols-2">
                    <NavMenuColumn heading="Resources">
                        <NavMenuList items={resourcesItemsShort} />
                    </NavMenuColumn>
                    <NavMenuColumn heading="Company">
                        <NavMenuList items={companyItems} />
                    </NavMenuColumn>
                </div>
            </div>

            <div className="bg-secondary flex flex-col p-2">
                <p className={styles.columnHeading}>Tutorials</p>
                <ul className="flex flex-col gap-1">
                    {tutorials.map((tutorial) => (
                        <li key={tutorial.title}>
                            <NavMenuVideo {...tutorial} />
                        </li>
                    ))}
                </ul>
                <div className="mt-auto pt-4">
                    <NavMenuActionsFooter
                        secondaryLabel="Documentation"
                        secondaryIcon={BookOpen01}
                        secondaryHref="/docs"
                        primaryLabel="View all posts"
                        primaryHref="/blog"
                    />
                </div>
            </div>
        </div>
    </Card>
);

/** A 3 × 3 grid of blog posts, closed by an actions footer. */
export const BlogPostsMenu = () => (
    <Card className="w-full md:w-[62rem]">
        <div className="grid gap-1 p-2 md:grid-cols-3">
            {blogPosts.map((post) => (
                <NavMenuPost key={post.title} {...post} />
            ))}
        </div>
        <NavMenuActionsFooter
            secondaryLabel="Documentation"
            secondaryIcon={BookOpen01}
            secondaryHref="/docs"
            primaryLabel="View all posts"
            primaryHref="/blog"
        />
    </Card>
);

/** A single row of four boxed company entries, closed by the wide footer strip. */
export const SlimCompanyMenu = ({ isCard = true }: { isCard?: boolean }) => {
    const content = (
        <>
            <ul className={cx("grid gap-1 md:grid-cols-4", isCard ? "p-2" : "max-w-container mx-auto w-full px-1 py-4 md:px-5 md:py-6")}>
                <NavMenuList items={companyItemsSlim} variant="boxed" />
            </ul>
            <NavMenuFooter links={footerLinks} />
        </>
    );

    return isCard ? <Card className="w-full md:w-[62rem]">{content}</Card> : <FullPanel>{content}</FullPanel>;
};

/* -------------------------------------------------------------------------- */
/*  Full-width menus                                                          */
/* -------------------------------------------------------------------------- */

/** Four headed columns of boxed entries, closed by the wide footer strip. */
export const FourColumnMenu = () => (
    <FullPanel>
        <div className={styles.fullPanelInner}>
            <div className="-mx-3 grid gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
                <NavMenuColumn heading="Products">
                    <NavMenuList items={productItems} variant="boxed" />
                </NavMenuColumn>
                <NavMenuColumn heading="Use cases">
                    <NavMenuList items={useCaseItems} variant="boxed" />
                </NavMenuColumn>
                <NavMenuColumn heading="Resources">
                    <NavMenuList items={resourceItemsCompact} variant="boxed" />
                </NavMenuColumn>
                <NavMenuColumn heading="Company">
                    <NavMenuList items={companyItemsCompact} variant="boxed" />
                </NavMenuColumn>
            </div>
        </div>
        <NavMenuFooter links={footerLinks} />
    </FullPanel>
);

/** Two headed columns beside a tutorials sidebar. */
export const TwoColumnSidebarFullMenu = () => (
    <FullPanel>
        <div className={cx(styles.fullPanelInner, "gap-8 lg:flex-row")}>
            <div className="-ms-3 grid flex-1 gap-x-4 gap-y-6 md:grid-cols-2">
                <NavMenuColumn heading="Resources">
                    <NavMenuList items={resourcesItemsShort} />
                </NavMenuColumn>
                <NavMenuColumn heading="Company">
                    <NavMenuList items={companyItems} />
                </NavMenuColumn>
            </div>

            <div className="bg-secondary flex flex-col rounded-2xl p-4 lg:w-[26rem]">
                <div className="flex items-center justify-between gap-4">
                    <p className={styles.columnHeading}>Tutorials</p>
                    <NavMenuSeeAllLink label="All video tutorials" href="/tutorials" />
                </div>
                <ul className="flex flex-col gap-1">
                    {tutorials.map((tutorial) => (
                        <li key={tutorial.title}>
                            <NavMenuVideo {...tutorial} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </FullPanel>
);

/** Three headed columns beside a "Get started" text-link column. */
export const TwoColumnLinksFullMenu = () => (
    <FullPanel>
        <div className={cx(styles.fullPanelInner, "gap-8 lg:flex-row")}>
            <div className="-ms-3 grid flex-1 gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
                <NavMenuColumn heading="Use cases">
                    <NavMenuList items={useCaseItemsWide} />
                </NavMenuColumn>
                <NavMenuColumn heading="Resources">
                    <NavMenuList items={resourcesItemsShort.slice(0, 3)} />
                </NavMenuColumn>
                <NavMenuColumn heading="Company">
                    <NavMenuList items={companyItems.slice(0, 3)} />
                </NavMenuColumn>
            </div>

            <div className="bg-secondary rounded-2xl p-4 lg:w-72">
                <NavMenuColumn heading="Get started">
                    <NavMenuList items={getStartedLinks} variant="text" />
                </NavMenuColumn>
            </div>
        </div>
    </FullPanel>
);

/** Three headed columns beside a promotional feature card. */
export const ThreeColumnSidebarFullMenu = () => (
    <FullPanel>
        <div className={cx(styles.fullPanelInner, "gap-8 lg:flex-row")}>
            <div className="-ms-3 grid flex-1 gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
                <NavMenuColumn heading="Use cases">
                    <NavMenuList items={useCaseItemsWide} />
                </NavMenuColumn>
                <NavMenuColumn heading="Resources">
                    <NavMenuList items={resourcesItemsShort.slice(0, 3)} />
                </NavMenuColumn>
                <NavMenuColumn heading="Company">
                    <NavMenuList items={companyItems.slice(0, 3)} />
                </NavMenuColumn>
            </div>

            <div className="overflow-hidden rounded-2xl lg:w-[26rem]">
                <NavMenuFeatureCard {...featureCard} />
            </div>
        </div>
    </FullPanel>
);

/** A 3 × 3 grid of blog posts, closed by the wide footer strip. */
export const BlogPostsFullMenu = () => (
    <FullPanel>
        <div className={cx(styles.fullPanelInner, "py-4 md:py-4")}>
            <div className="-mx-3 grid gap-1 md:grid-cols-2 lg:grid-cols-3">
                {blogPosts.map((post) => (
                    <NavMenuPost key={post.title} {...post} />
                ))}
            </div>
        </div>
        <NavMenuActionsFooter
            isFullBleed
            secondaryLabel="Documentation"
            secondaryIcon={BookOpen01}
            secondaryHref="/docs"
            primaryLabel="View all posts"
            primaryHref="/blog"
        />
    </FullPanel>
);

/** A blog-category column beside a two-column grid of posts. */
export const BlogPostsSidebarFullMenu = () => (
    <FullPanel>
        <div className={cx(styles.fullPanelInner, "gap-8 lg:flex-row")}>
            <div className="-ms-3 lg:w-56">
                <NavMenuColumn heading="Blog categories">
                    <NavMenuList items={blogCategories} variant="text" />
                </NavMenuColumn>
            </div>

            <div className="-me-3 grid flex-1 gap-1 md:grid-cols-2">
                {blogPostsCompact.map((post) => (
                    <NavMenuPost key={post.title} {...post} />
                ))}
            </div>
        </div>
    </FullPanel>
);
