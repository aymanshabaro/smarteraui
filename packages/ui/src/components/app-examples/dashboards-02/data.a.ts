// Deterministic demo data for the `dashboards-02` page examples. Every series is a literal so the
// pages render identically in Storybook, the docs previews and the a11y smoke tests.
// TODO(orchestrator): candidate for components/internal if other page examples need the same series.
import { AVATARS, LOGOS, avatar } from "../../../utils/demo-assets";

/** Twelve month labels used as the x-axis of every "12 months" chart on this page. */
export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

export interface SeriesDatum {
    month: string;
    A: number;
    B: number;
    C: number;
}

const series = (a: number[], b: number[], c: number[]): SeriesDatum[] => MONTHS.map((month, index) => ({ month, A: a[index]!, B: b[index]!, C: c[index]! }));

/** A steadily climbing pair of lines — the "site traffic"/"balance over time" shape. */
export const trendSeries = series(
    [520, 545, 560, 590, 610, 640, 690, 720, 760, 800, 845, 900],
    [180, 205, 240, 260, 300, 330, 360, 400, 450, 500, 560, 620],
    [90, 110, 130, 145, 170, 190, 220, 250, 280, 310, 350, 400],
);

/** A three-part stack — the "how do you acquire users" / "store traffic" shape. */
export const stackedSeries = series(
    [300, 320, 240, 300, 260, 340, 300, 320, 290, 330, 350, 280],
    [220, 260, 180, 230, 190, 270, 230, 250, 210, 260, 280, 200],
    [120, 150, 90, 130, 100, 160, 120, 140, 110, 150, 170, 110],
);

/** A denser 30-point series for the "30 days" charts. */
export const dailySeries = Array.from({ length: 30 }, (_, index) => ({
    day: String(index + 1),
    A: 400 + index * 14 + ((index * 37) % 11) * 12,
    B: 240 + index * 8 + ((index * 23) % 7) * 10,
    C: 120 + index * 5 + ((index * 17) % 5) * 8,
}));

/** Donut/pie breakdown of sessions by country. */
export const countrySessions = [
    { name: "United States", value: 50, className: "text-utility-brand-600" },
    { name: "India", value: 30, className: "text-utility-brand-500" },
    { name: "United Kingdom", value: 20, className: "text-utility-brand-400" },
    { name: "Australia", value: 10, className: "text-utility-brand-300" },
    { name: "Canada", value: 10, className: "text-utility-neutral-200" },
];

/** Donut breakdown of monthly spending by category. */
export const spendCategories = [
    { name: "Subscriptions", value: 148.4, className: "text-utility-brand-600" },
    { name: "Groceries", value: 642.48, className: "text-utility-brand-400" },
    { name: "Food and dining", value: 614.16, className: "text-utility-pink-500" },
    { name: "Investing", value: 290.0, className: "text-utility-green-500" },
    { name: "Mortgage", value: 824.28, className: "text-utility-orange-500" },
    { name: "Other", value: 48.44, className: "text-utility-neutral-300" },
];

/** Weekday radar used by the traffic-source charts. */
export const trafficRadar = [
    { subject: "Mon", A: 800, B: 400, C: 600 },
    { subject: "Tue", A: 600, B: 1000, C: 800 },
    { subject: "Wed", A: 600, B: 200, C: 400 },
    { subject: "Thu", A: 200, B: 600, C: 800 },
    { subject: "Fri", A: 400, B: 200, C: 600 },
    { subject: "Sat", A: 1000, B: 800, C: 600 },
    { subject: "Sun", A: 400, B: 1000, C: 800 },
];

/** Vendor tier radar used by the "vendor breakdown" cards. */
export const vendorRadar = [
    { subject: "Tier 1", A: 800, B: 400, C: 600 },
    { subject: "Tier 2", A: 600, B: 1000, C: 800 },
    { subject: "Tier 3", A: 600, B: 200, C: 400 },
    { subject: "Tier 4", A: 200, B: 600, C: 800 },
    { subject: "Tier 5", A: 400, B: 200, C: 600 },
    { subject: "Tier 6", A: 1000, B: 800, C: 600 },
    { subject: "Tier 7", A: 400, B: 1000, C: 800 },
];

/** A short upward sparkline for the small metric cards. */
export const sparkUp = [12, 16, 14, 20, 22, 19, 26, 30, 28, 34, 38, 44].map((value, index) => ({ value, name: MONTHS[index]! }));

/** A short downward sparkline for the small metric cards. */
export const sparkDown = [44, 40, 42, 36, 34, 37, 30, 26, 28, 22, 18, 14].map((value, index) => ({ value, name: MONTHS[index]! }));

/** Two-series sparkline for the comparison metric cards. */
export const sparkComparison = sparkUp.map((point, index) => ({ value: point.value, comparisonValue: sparkDown[index]!.value }));

export interface MemberRow {
    name: string;
    src: string;
    since: string;
    online: boolean;
}

/** "Top members" list used by the analytics dashboards. */
export const topMembers: MemberRow[] = AVATARS.slice(1, 11).map((person, index) => ({
    name: person.name,
    src: person.src,
    since: `Member since ${["Feb", "Jan", "Mar", "Feb", "Mar", "Apr", "Apr", "Jan", "Feb", "Mar"][index]} 2026`,
    online: index < 3 || index > 5,
}));

export interface PurchaseRow {
    name: string;
    src: string;
    product: string;
    time: string;
    online: boolean;
}

const products = [
    "Webflow 101",
    "SEO Masterclass",
    "Figma Mockups",
    "Webflow 101",
    "SEO Masterclass",
    "SEO Masterclass",
    "The Ultimate Guide to Backlinks",
    "The Figma Dashboard Bundle",
    "The Figma Dashboard Bundle",
    "The Design Handbook",
    "Phone 13 Mockups",
    "SEO Masterclass",
    "Figma Mockups",
    "The Ultimate Guide to Backlinks",
];

/** "Recent activity" feed used by the sales dashboards. */
export const recentPurchases: PurchaseRow[] = products.map((product, index) => ({
    name: avatar(index + 3).name,
    src: avatar(index + 3).src,
    product,
    time: `${Math.min(3 + Math.floor(index / 3), 6)} hours ago`,
    online: index < 3,
}));

export interface TransactionRow {
    merchant: string;
    initials: string;
    amount: string;
    incoming: boolean;
    category: "Subscriptions" | "Food and dining" | "Income" | "Groceries";
    card: "Visa" | "Mastercard";
    time: string;
}

/** Bank transaction history shared by the banking and cards dashboards. */
export const transactions: TransactionRow[] = [
    { merchant: "Spotify", initials: "SP", amount: "18.99", incoming: false, category: "Subscriptions", card: "Visa", time: "Wed 1:00pm" },
    { merchant: "A Coffee", initials: "AC", amount: "4.50", incoming: false, category: "Food and dining", card: "Visa", time: "Wed 7:20am" },
    { merchant: "Stripe", initials: "ST", amount: "88.00", incoming: true, category: "Income", card: "Mastercard", time: "Wed 2:45am" },
    { merchant: "Figma", initials: "FI", amount: "15.00", incoming: false, category: "Subscriptions", card: "Visa", time: "Tue 6:10pm" },
    { merchant: "TBF Bakery", initials: "TB", amount: "12.50", incoming: false, category: "Food and dining", card: "Visa", time: "Tue 7:52am" },
    { merchant: "Fresh F&V", initials: "FV", amount: "40.20", incoming: false, category: "Groceries", card: "Visa", time: "Tue 12:15pm" },
    { merchant: "Stripe", initials: "S2", amount: "88.00", incoming: true, category: "Income", card: "Mastercard", time: "Tue 5:40am" },
];

export interface VendorRow {
    name: string;
    website: string;
    logo: string;
    rating: number;
    change: string;
    trend: "positive" | "negative";
    lastAssessed: string;
    categories: string[];
    extra: number;
    active: boolean;
}

/** Vendor security ratings used by the vendor/organization dashboards. */
export const vendors: VendorRow[] = [
    { rating: 60, change: "5%", trend: "positive", lastAssessed: "22 Jan 2027", categories: ["Customer data", "Admin"], extra: 4, active: true },
    { rating: 72, change: "4%", trend: "negative", lastAssessed: "20 Jan 2027", categories: ["Business data", "Admin"], extra: 4, active: true },
    { rating: 78, change: "6%", trend: "positive", lastAssessed: "24 Jan 2027", categories: ["Customer data", "Financials"], extra: 0, active: true },
    { rating: 38, change: "8%", trend: "positive", lastAssessed: "26 Jan 2027", categories: ["Database access", "Admin"], extra: 0, active: true },
    { rating: 42, change: "1%", trend: "negative", lastAssessed: "18 Jan 2027", categories: ["Salesforce", "Admin"], extra: 4, active: true },
    { rating: 66, change: "6%", trend: "negative", lastAssessed: "28 Jan 2027", categories: ["Business data", "Admin"], extra: 4, active: true },
    { rating: 91, change: "2%", trend: "positive", lastAssessed: "16 Jan 2027", categories: ["Customer data", "Financials"], extra: 0, active: false },
].map((row, index) => {
    const logo = LOGOS[index % LOGOS.length]!;
    // There are more rows than placeholder logos, so the list wraps. Suffix the repeats: the table
    // keys its rows (and its default selection) by `name`, which must stay unique.
    const cycle = Math.floor(index / LOGOS.length);
    const name = cycle === 0 ? logo.name : `${logo.name} ${["", "Labs", "Group", "Studio"][cycle] ?? `0${cycle}`}`;

    return {
        ...row,
        trend: row.trend as "positive" | "negative",
        name,
        website: `${name.toLowerCase().replace(/\s+/g, "")}.com`,
        logo: logo.src,
    };
});

export interface OrderRow {
    id: string;
    date: string;
    amount: string;
    rating: number;
    name: string;
    email: string;
    src: string;
}

/** Ecommerce orders used by the ecommerce dashboard. */
export const orders: OrderRow[] = [
    { id: "#26678", date: "Jan 16, 2027", amount: "$100.14", rating: 5 },
    { id: "#26677", date: "Jan 16, 2027", amount: "$96.32", rating: 4.5 },
    { id: "#26676", date: "Jan 15, 2027", amount: "$104.24", rating: 5 },
    { id: "#26675", date: "Jan 14, 2027", amount: "$88.48", rating: 5 },
    { id: "#26674", date: "Jan 14, 2027", amount: "$96.32", rating: 4.5 },
    { id: "#26673", date: "Jan 14, 2027", amount: "$107.10", rating: 5 },
    { id: "#26672", date: "Jan 14, 2027", amount: "$82.04", rating: 4 },
].map((row, index) => ({ ...row, name: avatar(index).name, email: avatar(index).email, src: avatar(index).src }));

export interface PageRow {
    page: string;
    sessions: string;
    avgTime: string;
    share: number;
    percent: string;
}

/** "Pages and screens" rows used by the site-traffic dashboard. */
export const sitePages: PageRow[] = [
    { page: "proper.example", sessions: "4,288", avgTime: "1m 24s", share: 62.4, percent: "62.4%" },
    { page: "proper.example/free-icons", sessions: "582", avgTime: "1m 8s", share: 8.2, percent: "8.2%" },
    { page: "proper.example/icons", sessions: "464", avgTime: "1m 12s", share: 7.6, percent: "7.6%" },
    { page: "proper.example/components", sessions: "446", avgTime: "2m 22s", share: 7.2, percent: "7.2%" },
    { page: "proper.example/pricing", sessions: "382", avgTime: "48s", share: 7.0, percent: "7.0%" },
    { page: "proper.example/faqs", sessions: "326", avgTime: "56s", share: 6.4, percent: "6.4%" },
    { page: "proper.example/blog", sessions: "262", avgTime: "1m 14s", share: 5.4, percent: "5.4%" },
];

export interface FanRow {
    name: string;
    username: string;
    src: string;
    likes: number;
}

/** "Biggest fans" / "Favorite designers" lists used by the profile stats dashboard. */
export const biggestFans: FanRow[] = [24, 22, 22, 20, 18, 16, 12].map((likes, index) => ({
    likes,
    name: avatar(index + 1).name,
    username: avatar(index + 1).username,
    src: avatar(index + 1).src,
}));

export const favoriteDesigners: FanRow[] = [46, 40, 36, 34, 30, 28, 28].map((likes, index) => ({
    likes,
    name: avatar(index + 8).name,
    username: avatar(index + 8).username,
    src: avatar(index + 8).src,
}));

export interface CustomerRow {
    name: string;
    username: string;
    email: string;
    src: string;
    date: string;
    amount: string;
}

/** Customer rows used by the analytics dashboards' bottom table. */
export const customerRows: CustomerRow[] = [
    { date: "Jan 16, 2027", amount: "$100.14" },
    { date: "Jan 16, 2027", amount: "$96.32" },
    { date: "Jan 15, 2027", amount: "$104.24" },
    { date: "Jan 14, 2027", amount: "$88.48" },
    { date: "Jan 14, 2027", amount: "$96.32" },
    { date: "Jan 14, 2027", amount: "$107.10" },
    { date: "Jan 14, 2027", amount: "$82.04" },
].map((row, index) => ({
    ...row,
    name: avatar(index).name,
    username: avatar(index).username,
    email: avatar(index).email,
    src: avatar(index).src,
}));

/** Country traffic split used by the "active users right now" panel. */
export const countryTraffic = [
    { code: "US", name: "United States", share: 50 },
    { code: "IN", name: "India", share: 30 },
    { code: "GB", name: "United Kingdom", share: 20 },
    { code: "AU", name: "Australia", share: 10 },
    { code: "CA", name: "Canada", share: 10 },
];
