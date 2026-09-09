// Deterministic demo data for the table examples. Ported from the reference `*.json` fixtures as
// TypeScript modules so that every avatar/logo can come from `@/utils/demo-assets` instead of a
// hotlinked image URL.
import type { BadgeColors } from "@/components/base/badges/badge-types";
import { AVATARS, LOGOS } from "@/utils/demo-assets";

export interface TeamMember {
    name: string;
    username: string;
    status: "active" | "inactive";
    role: string;
    email: string;
    teams: { name: string; color: BadgeColors }[];
    avatarUrl: string;
}

const allTeams: { name: string; color: BadgeColors }[] = [
    { name: "Design", color: "purple" },
    { name: "Product", color: "sky" },
    { name: "Marketing", color: "indigo" },
    { name: "Sales", color: "error" },
    { name: "Support", color: "success" },
    { name: "Engineering", color: "warning" },
    { name: "Finance", color: "orange" },
];

const roles = [
    "Product Designer",
    "Product Manager",
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "UX Designer",
    "UX Copywriter",
    "UI Designer",
    "Product Manager",
    "QA Engineer",
];

const teamCounts = [7, 7, 5, 4, 5, 5, 7, 7, 7, 5];

export const teamMembers: TeamMember[] = AVATARS.slice(0, 10).map((person, index) => ({
    name: person.name,
    username: person.username,
    status: "active",
    role: roles[index]!,
    email: person.email,
    teams: allTeams.slice(0, teamCounts[index]!),
    avatarUrl: person.src,
}));

export interface Customer {
    name: string;
    website: string;
    status: "Customer" | "Churned";
    aboutTitle: string;
    aboutDescription: string;
    licenseUse: number;
    logoUrl: string;
}

const customerDetails: Omit<Customer, "name" | "website" | "logoUrl">[] = [
    { status: "Customer", aboutTitle: "Content curating app", aboutDescription: "Brings all your news into one place", licenseUse: 70 },
    { status: "Churned", aboutTitle: "Design software", aboutDescription: "Super lightweight design app", licenseUse: 60 },
    { status: "Customer", aboutTitle: "Data prediction", aboutDescription: "AI and machine learning data", licenseUse: 30 },
    { status: "Customer", aboutTitle: "Productivity app", aboutDescription: "Time management and productivity", licenseUse: 80 },
    { status: "Churned", aboutTitle: "Web app integrations", aboutDescription: "Connect web apps seamlessly", licenseUse: 20 },
    { status: "Customer", aboutTitle: "Sales CRM", aboutDescription: "Web-based sales doc management", licenseUse: 10 },
    { status: "Customer", aboutTitle: "Automation and workflow", aboutDescription: "Time tracking, invoicing and expenses", licenseUse: 40 },
];

// The demo-asset set ships six logos, so the seventh row reuses the first mark under a distinct name
// to keep every row key unique.
const customerNames = [...LOGOS.map((logo) => logo.name), `${LOGOS[0].name} Labs`];

export const customers: Customer[] = customerDetails.map((details, index) => ({
    ...details,
    name: customerNames[index]!,
    website: `${customerNames[index]!.toLowerCase().replace(/\s+/g, "")}.com`,
    logoUrl: LOGOS[index % LOGOS.length]!.src,
}));

export interface Invoice {
    id: string;
    date: string;
    status: "paid" | "refunded" | "cancelled";
    customer: { name: string; email: string; avatarUrl: string };
    purchase: string;
}

const invoiceMeta: { id: string; date: string; status: Invoice["status"] }[] = [
    { id: "3066", date: "2025-01-06", status: "paid" },
    { id: "3065", date: "2025-01-06", status: "paid" },
    { id: "3064", date: "2025-01-06", status: "paid" },
    { id: "3063", date: "2025-01-05", status: "paid" },
    { id: "3062", date: "2025-01-05", status: "refunded" },
    { id: "3061", date: "2025-01-05", status: "refunded" },
    { id: "3060", date: "2025-01-04", status: "cancelled" },
    { id: "3059", date: "2025-01-03", status: "paid" },
    { id: "3058", date: "2025-01-03", status: "paid" },
    { id: "3057", date: "2025-01-03", status: "paid" },
];

export const invoices: Invoice[] = invoiceMeta.map((meta, index) => ({
    ...meta,
    customer: { name: AVATARS[index]!.name, email: AVATARS[index]!.email, avatarUrl: AVATARS[index]!.src },
    purchase: "Monthly subscription",
}));

export interface UploadedFile {
    name: string;
    size: string;
    uploadedAt: string;
    updatedAt: string;
    uploadedBy: string;
}

export const uploadedFiles: UploadedFile[] = [
    { name: "Tech requirements.pdf", size: "200 KB", uploadedAt: "Jan 4, 2025", updatedAt: "Jan 4, 2025", uploadedBy: AVATARS[0].name },
    { name: "Dashboard screenshot.jpg", size: "720 KB", uploadedAt: "Jan 4, 2025", updatedAt: "Jan 4, 2025", uploadedBy: AVATARS[1].name },
    { name: "Dashboard prototype recording.mp4", size: "16 MB", uploadedAt: "Jan 2, 2025", updatedAt: "Jan 2, 2025", uploadedBy: AVATARS[2].name },
    { name: "Dashboard prototype FINAL.fig", size: "4.2 MB", uploadedAt: "Jan 6, 2025", updatedAt: "Jan 6, 2025", uploadedBy: AVATARS[3].name },
    { name: "UX Design Guidelines.docx", size: "400 KB", uploadedAt: "Jan 8, 2025", updatedAt: "Jan 8, 2025", uploadedBy: AVATARS[4].name },
    { name: "Dashboard interaction.aep", size: "12 MB", uploadedAt: "Jan 6, 2025", updatedAt: "Jan 6, 2025", uploadedBy: AVATARS[5].name },
    { name: "Briefing call recording.mp3", size: "18.6 MB", uploadedAt: "Jan 4, 2025", updatedAt: "Jan 4, 2025", uploadedBy: AVATARS[6].name },
];
