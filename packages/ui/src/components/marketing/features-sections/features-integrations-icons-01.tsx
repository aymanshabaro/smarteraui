"use client";

import type { FC, SVGProps } from "react";
import { PlayCircle } from "@smarteraui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { ChatGPTIcon, ClaudeIcon, FigmaIcon, GitHubIcon, NextjsIcon, ReactIcon, TailwindCSSIcon, ViteIcon } from "@/components/foundations/integration-icons";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    section: "bg-primary py-16 md:py-24",
    container: "mx-auto w-full max-w-container px-4 md:px-8",
    tile: "flex size-[68px] shrink-0 items-center justify-center rounded-lg bg-primary shadow-xs ring-1 ring-secondary ring-inset md:size-[88px] md:rounded-xl",
    tileIcon: "size-16 md:size-20",
});

const integrations: { name: string; icon: FC<SVGProps<SVGSVGElement>> }[] = [
    { name: "Figma", icon: FigmaIcon },
    { name: "GitHub", icon: GitHubIcon },
    { name: "Next.js", icon: NextjsIcon },
    { name: "React", icon: ReactIcon },
    { name: "Tailwind CSS", icon: TailwindCSSIcon },
    { name: "Vite", icon: ViteIcon },
    { name: "Claude", icon: ClaudeIcon },
    { name: "ChatGPT", icon: ChatGPTIcon },
];

/** A two-column integrations block: copy and calls to action beside a 4×2 grid of product logo tiles. */
export const FeaturesIntegrationsIcons01 = () => (
    <section className={styles.section}>
        <div className={styles.container}>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
                <div className="flex max-w-3xl flex-col items-start">
                    <Badge size="md" color="brand" className="flex md:hidden">
                        Integrations
                    </Badge>
                    <Badge size="lg" color="brand" className="hidden md:flex">
                        Integrations
                    </Badge>

                    <h2 className="text-display-sm text-primary md:text-display-md mt-4 font-semibold md:mt-3">Get more value from your tools</h2>
                    <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                        Connect your tools, connect your teams. With over 100 apps already available in our directory, your team&apos;s favorite tools are just
                        a click away.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 self-stretch sm:flex-row sm:self-start md:mt-8 lg:flex-row-reverse">
                        <Button size="xl" color="primary">
                            All integrations
                        </Button>
                        <Button size="xl" color="secondary" iconLeading={PlayCircle}>
                            Demo
                        </Button>
                    </div>
                </div>

                <ul className="grid grid-cols-4 gap-4 self-center px-3 md:gap-8 lg:px-14">
                    {integrations.map(({ name, icon: Icon }) => (
                        <li key={name} className={styles.tile}>
                            <Icon className={styles.tileIcon} aria-label={`${name} logo`} role="img" />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
);
