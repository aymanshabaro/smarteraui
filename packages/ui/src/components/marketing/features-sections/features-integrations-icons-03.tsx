"use client";

import type { FC, SVGProps } from "react";
import { ArrowRight } from "@smarteraui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ClaudeIcon, FigmaIcon, GitHubIcon, NextjsIcon, ReactIcon, TailwindCSSIcon } from "@/components/foundations/integration-icons";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    section: "bg-primary py-16 md:py-24",
    container: "mx-auto w-full max-w-container px-4 md:px-8",
    grid: "grid w-full grid-cols-1 justify-items-center gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-16",
    tile: "flex size-13 shrink-0 items-center justify-center rounded-lg bg-primary shadow-xs ring-1 ring-secondary ring-inset md:size-16 md:rounded-xl",
    tileIcon: "size-12 md:size-14",
});

const integrations: { name: string; icon: FC<SVGProps<SVGSVGElement>> }[] = [
    { name: "Figma", icon: FigmaIcon },
    { name: "GitHub", icon: GitHubIcon },
    { name: "Next.js", icon: NextjsIcon },
    { name: "React", icon: ReactIcon },
    { name: "Tailwind CSS", icon: TailwindCSSIcon },
    { name: "Claude", icon: ClaudeIcon },
];

/** A centered six-up integrations grid where every card links through to its integration page. */
export const FeaturesIntegrationsIcons03 = () => (
    <section className={styles.section}>
        <div className={styles.container}>
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <Badge size="md" color="brand" className="flex md:hidden">
                    Integrations
                </Badge>
                <Badge size="lg" color="brand" className="hidden md:flex">
                    Integrations
                </Badge>

                <h2 className="text-display-sm text-primary md:text-display-md mt-4 font-semibold">Get more value from your tools</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Connect your tools, connect your teams. With over 100 apps already available in our directory, your team&apos;s favorite tools are just a
                    click away.
                </p>
            </div>

            <div className="mt-12 md:mt-16">
                <ul className={styles.grid}>
                    {integrations.map(({ name, icon: Icon }) => (
                        <li key={name}>
                            <div className="flex max-w-sm flex-col items-center gap-4 text-center">
                                <span className={styles.tile}>
                                    <Icon className={styles.tileIcon} aria-hidden="true" />
                                </span>

                                <div className="flex flex-col items-center gap-4">
                                    <div>
                                        <h3 className="text-primary text-lg font-semibold">{name} integration</h3>
                                        <p className="text-md text-tertiary mt-1">
                                            Work faster and smarter by integrating directly with {name}, right in the app.
                                        </p>
                                    </div>

                                    <Button color="link-color" size="lg" href="#" iconTrailing={ArrowRight}>
                                        View integration
                                    </Button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
);
