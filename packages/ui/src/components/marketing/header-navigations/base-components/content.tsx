"use client";

import {
    BarChart12,
    BarChartSquare02,
    BookOpen01,
    CheckCircle,
    Codepen,
    CurrencyDollar,
    CurrencyDollarCircle,
    FileCode01,
    Flag05,
    Folder,
    LayersThree01,
    LifeBuoy01,
    MessageChatCircle,
    MessageSmileCircle,
    Monitor04,
    PieChart03,
    PlayCircle,
    Signal01,
    Stars01,
    TrendUp02,
    Users01,
    Zap,
} from "@properui/icons";
import { IMAGES } from "../../../../utils/demo-assets";
import { BadgeWithDot } from "../../../base/badges/badges";
import type { NavMenuLinkType } from "./nav-menu";

const hiringBadge = (
    <BadgeWithDot size="sm" type="modern" color="success">
        We&apos;re hiring!
    </BadgeWithDot>
);

const newBadge = <span className="bg-primary text-secondary ring-primary rounded-md px-1.5 py-0.5 text-xs font-medium shadow-xs ring-1 ring-inset">New</span>;

/** The five-entry "Resources" menu used by the simple dropdowns. */
export const resourcesItems: NavMenuLinkType[] = [
    { label: "Blogs", href: "/blog", icon: BookOpen01, description: "The latest industry new and guides curated by our expert team." },
    { label: "Customer stories", href: "/customers", icon: Stars01, description: "Learn how our customers are using Proper UI to 10x their growth." },
    { label: "Video tutorials", href: "/tutorials", icon: PlayCircle, description: "Get up and running on our newest features and in-depth guides." },
    { label: "Documentation", href: "/docs", icon: FileCode01, description: "In-depth articles on our tools and technologies to empower teams." },
    { label: "Help and support", href: "/support", icon: LifeBuoy01, description: "Need help with something? Our expert team is here to help 24/7." },
];

/** The four-entry variant of the resources menu. */
export const resourcesItemsShort: NavMenuLinkType[] = [
    { label: "Blog", href: "/blog", icon: BookOpen01, description: "The latest industry new and guides curated by our expert team." },
    { label: "Customer stories", href: "/customers", icon: Stars01, description: "Learn how our customers are using Proper UI to 10x their growth." },
    { label: "Video tutorials", href: "/tutorials", icon: PlayCircle, description: "Get up and running on our newest features and in-depth guides." },
    { label: "Documentation", href: "/docs", icon: FileCode01, description: "In-depth articles on our tools and technologies to empower teams." },
];

/** The second column of the two-column resources menu. */
export const referenceItems: NavMenuLinkType[] = [
    { label: "API reference", href: "/api", icon: Codepen, description: "In-depth reference doc and helpful guides for our dashboard API." },
    { label: "Setup 101", href: "/setup", icon: Zap, description: "Get up and running as fast as possible with our 101 guide." },
    { label: "Podcast", href: "/podcast", icon: Signal01, description: "Interviews and discussion about the industry and the latest tech." },
    { label: "University", href: "/university", icon: BookOpen01, description: "Master your craft with our free video courses and in-depth articles." },
    { label: "Changelog", href: "/changelog", icon: LayersThree01, description: "Check out the latest updates and releases from our team." },
];

/** The "Support" column of the three-column resources menu. */
export const supportItems: NavMenuLinkType[] = [
    { label: "Documentation", href: "/docs", icon: FileCode01, description: "In-depth articles on our tools and technologies to empower teams." },
    { label: "Help and support", href: "/support", icon: LifeBuoy01, description: "Need help with something? Our expert team is here to help 24/7." },
    { label: "API reference", href: "/api", icon: Codepen, description: "In-depth reference doc and helpful guides for our API." },
];

/** The "Products" column. */
export const productItems: NavMenuLinkType[] = [
    { label: "Interactive reports", href: "/products/reports", icon: BarChartSquare02, description: "Learn about your users." },
    { label: "Team dashboard", href: "/products/dashboard", icon: Monitor04, description: "Monitor your metrics." },
    { label: "Limitless segmentation", href: "/products/segmentation", icon: PieChart03, description: "Surface hidden trends." },
    { label: "Group analytics", href: "/products/group-analytics", icon: BarChart12, description: "Measure B2B account health." },
];

/** The compact "Use cases" column. */
export const useCaseItems: NavMenuLinkType[] = [
    { label: "Convert", href: "/use-cases/convert", icon: CheckCircle, description: "Analyze conversion rates." },
    { label: "Engage", href: "/use-cases/engage", icon: MessageSmileCircle, description: "Measure active usage." },
    { label: "Retain", href: "/use-cases/retain", icon: CurrencyDollarCircle, description: "Find retention drivers." },
    { label: "Grow", href: "/use-cases/grow", icon: TrendUp02, description: "Grow your user base faster.", badge: newBadge },
];

/** The roomier "Use cases" column used by the full-width menus. */
export const useCaseItemsWide: NavMenuLinkType[] = [
    { label: "Convert", href: "/use-cases/convert", icon: CheckCircle, description: "Analyze conversion rates and improve your sales." },
    { label: "Engage", href: "/use-cases/engage", icon: MessageSmileCircle, description: "Measure active usage and target areas of improvement." },
    { label: "Retain", href: "/use-cases/retain", icon: CurrencyDollarCircle, description: "Find retention drivers and make your customers smile." },
];

/** The compact "Resources" column used by the four-column menu. */
export const resourceItemsCompact: NavMenuLinkType[] = [
    { label: "Blog", href: "/blog", icon: BookOpen01, description: "The latest industry news." },
    { label: "Customer stories", href: "/customers", icon: Stars01, description: "Learn how our customers." },
    { label: "Video tutorials", href: "/tutorials", icon: PlayCircle, description: "New features and techniques." },
    { label: "Documentation", href: "/docs", icon: FileCode01, description: "All the boring stuff." },
];

/** The compact "Company" column used by the four-column menu. */
export const companyItemsCompact: NavMenuLinkType[] = [
    { label: "About us", href: "/about", icon: Flag05, description: "Learn about our story." },
    { label: "Press", href: "/press", icon: MessageChatCircle, description: "News and press resources." },
    { label: "Careers", href: "/careers", icon: Users01, description: "Join our remote team!", badge: hiringBadge },
    { label: "Legal", href: "/legal", icon: Folder, description: "Licensing, terms, and privacy." },
];

/** The roomier "Company" column used by the full-width menus. */
export const companyItems: NavMenuLinkType[] = [
    { label: "About us", href: "/about", icon: Flag05, description: "Learn about the company, our team, and what we're working towards." },
    { label: "Press", href: "/press", icon: MessageChatCircle, description: "News and writings, press releases, and press resources." },
    { label: "Careers", href: "/careers", icon: Users01, description: "We're always looking for talented people. Join our remote team!", badge: hiringBadge },
    { label: "Legal", href: "/legal", icon: Folder, description: "Our company information, licensing information, terms, and privacy." },
];

/** The single-row "slim" company menu. */
export const companyItemsSlim: NavMenuLinkType[] = [
    { label: "About us", href: "/about", icon: Flag05, description: "Learn about our team and what we're working towards." },
    { label: "Press", href: "/press", icon: MessageChatCircle, description: "News and writings, press releases, and resources." },
    { label: "Careers", href: "/careers", icon: Users01, description: "We're always looking for talented people. Join our team!", badge: hiringBadge },
    { label: "Legal", href: "/legal", icon: Folder, description: "Licensing and reseller docs, terms, and privacy policy." },
];

/** The "Get started" text-link column. */
export const getStartedLinks: NavMenuLinkType[] = [
    { label: "Setup 101", href: "/setup" },
    { label: "Adding users", href: "/setup/users" },
    { label: "Video tutorials", href: "/tutorials" },
    { label: "Libraries and SDKs", href: "/sdks" },
    { label: "Adding plugins", href: "/plugins" },
    { label: "Dashboard templates", href: "/templates" },
];

/** The blog category text-link column. */
export const blogCategories: NavMenuLinkType[] = [
    { label: "Design", href: "/blog/design" },
    { label: "Product", href: "/blog/product" },
    { label: "Data analytics", href: "/blog/data-analytics" },
    { label: "Marketing & growth", href: "/blog/marketing" },
    { label: "Customer success", href: "/blog/customer-success" },
    { label: "Team collaboration", href: "/blog/team-collaboration" },
];

/** The links in the wide "Ready to get started?" footer strip. */
export const footerLinks: NavMenuLinkType[] = [
    { label: "Pricing", href: "/pricing", icon: CurrencyDollar },
    { label: "Watch demo", href: "/demo", icon: PlayCircle },
    { label: "Chat to sales", href: "/contact", icon: MessageChatCircle },
];

export interface PostType {
    title: string;
    summary: string;
    href: string;
    imageSrc: string;
}

/** Nine blog posts for the blog-post menus. */
export const blogPosts: PostType[] = [
    {
        title: "Auto Layout explained",
        summary: "Jump right in—get an overview of the basics and fundamentals of auto-layout so you can build faster.",
        href: "/blog/auto-layout-explained",
        imageSrc: IMAGES.landscape[0].src,
    },
    {
        title: "Top techniques to level up your product design",
        summary: "The latest best practices and tips from the best in the industry. Learn how to level up your craft.",
        href: "/blog/level-up-product-design",
        imageSrc: IMAGES.landscape[1].src,
    },
    {
        title: "Sythesize data like a pro through affinity diagramming",
        summary: "Synthesis is the mysterious rabbit hole that all data scientists have to learn eventually.",
        href: "/blog/affinity-diagramming",
        imageSrc: IMAGES.landscape[2].src,
    },
    {
        title: "Streamline your user research process",
        summary: "As a user research team of 5 UX researchers, we quickly realized that we'll need a better process.",
        href: "/blog/streamline-user-research",
        imageSrc: IMAGES.landscape[3].src,
    },
    {
        title: "How to embrace inclusivity in UX research",
        summary: "In user experience research, your main job is to consider the user—every user, regardless of ability.",
        href: "/blog/inclusivity-in-ux-research",
        imageSrc: IMAGES.landscape[4].src,
    },
    {
        title: "The anatomy of great storytelling",
        summary: "Storytelling is everywhere, but great storytelling is rare. Here's how to master it.",
        href: "/blog/anatomy-of-storytelling",
        imageSrc: IMAGES.landscape[5].src,
    },
    {
        title: "How to write copy that converts",
        summary: "Improve your conversion rates and close more sales with these five copywriting techniques.",
        href: "/blog/copy-that-converts",
        imageSrc: IMAGES.landscape[6].src,
    },
    {
        title: "How to create a powerful design presentation",
        summary: "How to create a powerful design presentation that gets everyone in the room on your side.",
        href: "/blog/design-presentations",
        imageSrc: IMAGES.landscape[7].src,
    },
    {
        title: "How to communicate the value of design",
        summary: "How do you measure and communicate the impact and value of the design work your team ships?",
        href: "/blog/value-of-design",
        imageSrc: IMAGES.square[0].src,
    },
];

/** Six blog posts for the sidebar layout. */
export const blogPostsCompact: PostType[] = blogPosts.slice(0, 6);

/** The two tutorial videos used by the sidebar menus. */
export const tutorials: PostType[] = [
    {
        title: "How to get started",
        summary: "Jump right in—get an overview of the basics and get started on building.",
        href: "/tutorials/getting-started",
        imageSrc: IMAGES.landscape[1].src,
    },
    {
        title: "Advanced features",
        summary: "Once you're ready, learn more about advanced analytics, features and shortcuts.",
        href: "/tutorials/advanced-features",
        imageSrc: IMAGES.landscape[3].src,
    },
];

/** The promo card shown by the "feature card" menus. */
export const featureCard = {
    title: "We've just released an update!",
    description: "Check out the all new dashboard view. Pages now load up to 3x faster.",
    imageSrc: IMAGES.landscape[2].src,
    confirmLabel: "Changelog",
    confirmHref: "/changelog",
};
