import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SITE_URL } from "~/lib/site";
import { RouterProvider, ThemeProvider } from "@properui/ui/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
    // Set once here so every route resolves relative OG/canonical URLs against the real domain.
    metadataBase: new URL(SITE_URL),
    title: { default: "Proper UI", template: "%s | Proper UI" },
    description: "An open-source React component library built on React Aria Components and Tailwind CSS.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning className={inter.variable}>
            <head>
                <meta name="color-scheme" content="light dark" />
            </head>
            <body className="bg-primary text-primary antialiased">
                <ThemeProvider>
                    <RouterProvider>{children}</RouterProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
