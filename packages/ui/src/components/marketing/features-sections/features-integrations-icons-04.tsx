import type { FC, SVGProps } from "react";
import { ClaudeIcon, FigmaIcon, GitHubIcon, NextjsIcon, ReactIcon, TailwindCSSIcon } from "@/components/foundations/integration-icons";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    section: "bg-primary py-16 md:py-24",
    container: "mx-auto w-full max-w-container px-4 md:px-8",
    grid: "grid w-full grid-cols-1 justify-items-center gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-16",
    card: "mt-6 flex max-w-sm flex-col items-center gap-4 rounded-2xl bg-secondary px-6 pb-8 text-center",
    tile: "-mt-[26px] flex size-13 shrink-0 items-center justify-center rounded-lg bg-primary shadow-xs ring-1 ring-secondary ring-inset md:-mt-8 md:size-16 md:rounded-xl",
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

/** A centered six-up integrations grid of tinted cards, each with its logo tile hanging over the top edge. */
export const FeaturesIntegrationsIcons04 = () => (
    <section className={styles.section}>
        <div className={styles.container}>
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Integrations</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Get more value from your tools</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Connect your tools, connect your teams. With over 100 apps already available in our directory, your team&apos;s favorite tools are just a
                    click away.
                </p>
            </div>

            <div className="mt-12 md:mt-16">
                <ul className={styles.grid}>
                    {integrations.map(({ name, icon: Icon }) => (
                        <li key={name}>
                            <div className={styles.card}>
                                <span className={styles.tile}>
                                    <Icon className={styles.tileIcon} aria-hidden="true" />
                                </span>

                                <div>
                                    <h3 className="text-primary text-lg font-semibold">{name} integration</h3>
                                    <p className="text-md text-tertiary mt-1">Work faster and smarter by integrating directly with {name}, right in the app.</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
);
