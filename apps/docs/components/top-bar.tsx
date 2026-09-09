import Link from "next/link";
import { cx } from "~/lib/cx";
import { GITHUB_URL, SIGN_IN_URL } from "~/lib/site";
import type { Crumb, SiteNavGroup } from "~/lib/site-nav";
import { ChevronRight } from "@smarteraui/icons";
import { GithubMark } from "./brand-icons";
import { Logo } from "./logo";
import { buttonClasses } from "./primitives";
import { MobileNav } from "./sidebar";
import { ThemeToggle } from "./theme-toggle";

/** Fixed top bar: breadcrumb on the left, theme + GitHub + auth actions on the right. */
export const TopBar = ({ crumbs, nav }: { crumbs: Crumb[]; nav: SiteNavGroup[] }) => (
    <header className="bg-primary before:bg-border-secondary_alt fixed top-0 right-0 left-0 z-50 flex items-center justify-center before:absolute before:inset-x-0 before:-bottom-px before:h-px lg:left-62">
        <div className="flex size-full flex-1 items-center py-4 pr-3 pl-4 lg:px-5 lg:py-2.5">
            <Link href="/" className="lg:hidden">
                <Logo />
            </Link>

            <nav aria-label="Breadcrumbs" className="min-w-0 max-lg:hidden">
                <ol className="relative flex gap-0.5 md:gap-1">
                    {crumbs.map((crumb, index) => {
                        const isLast = index === crumbs.length - 1;
                        const content = (
                            <span
                                className={cx(
                                    "transition-inherit-all px-1 text-sm font-semibold whitespace-nowrap",
                                    isLast ? "text-fg-tertiary_hover truncate" : "text-quaternary group-hover:text-tertiary_hover",
                                )}
                            >
                                {crumb.title}
                            </span>
                        );
                        const wrapper =
                            "group inline-flex items-center justify-center gap-1 rounded-md p-1 outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2";

                        return (
                            <li key={`${crumb.title}-${index}`} className="flex items-center gap-0.5 md:gap-1">
                                {crumb.href && !isLast ? (
                                    <Link href={crumb.href} className={cx(wrapper, "hover:bg-primary_hover")}>
                                        {content}
                                    </Link>
                                ) : (
                                    <span aria-current={isLast ? "page" : undefined} className={cx(wrapper, isLast && "bg-primary_hover")}>
                                        {content}
                                    </span>
                                )}
                                {!isLast && <ChevronRight className="text-fg-quaternary size-4 shrink-0" />}
                            </li>
                        );
                    })}
                </ol>
            </nav>

            <div className="ml-auto hidden items-center gap-3 lg:flex">
                <div className="flex items-center gap-0.5">
                    <ThemeToggle />
                    <a
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Star on GitHub"
                        className="group text-secondary outline-focus-ring hover:bg-primary_hover hover:text-tertiary_hover inline-flex h-max items-center justify-center gap-1 rounded-lg px-1.5 py-1 text-sm font-semibold transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        <GithubMark className="text-fg-quaternary size-4" />
                        <span className="px-0.5">GitHub</span>
                    </a>
                </div>

                <div className="flex gap-2.5">
                    <a href={SIGN_IN_URL} className={buttonClasses("secondary")}>
                        <span className="px-0.5">Sign in</span>
                    </a>
                    <Link href="/components" className={buttonClasses("primary")}>
                        <span className="px-0.5">Get started</span>
                    </Link>
                </div>
            </div>

            <MobileNav nav={nav} />
        </div>
    </header>
);
