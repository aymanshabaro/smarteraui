import { GithubMark } from "~/components/brand-icons";
import { CodeSnippet } from "@smarteraui/ui/components/application/code-snippet/code-snippet";
import { BadgeGroup } from "@smarteraui/ui/components/base/badges/badge-groups";
import { Button } from "@smarteraui/ui/components/base/buttons/button";
import { BackgroundPattern } from "@smarteraui/ui/components/shared-assets/background-patterns/index";
import { INSTALL_COMMAND, REPO_URL } from "./content";

/**
 * Hero.
 *
 * Composed from `marketing/hero-header-sections/hero-card-mockup-01` — the grid background
 * pattern, the centred badge/headline/actions stack and its spacing scale are that section's.
 * The credit-card mockup it ends on is replaced by the install command, which is what this
 * product's "mockup" actually is. The section's header renders above it as a page-level
 * banner landmark rather than inside the hero.
 */
export const LandingHero = () => (
    <div className="bg-primary relative overflow-hidden">
        <BackgroundPattern pattern="grid" size="md" className="absolute -top-2 left-1/2 z-0 hidden max-w-none -translate-x-1/2 md:block" />
        <BackgroundPattern pattern="grid" size="sm" className="absolute top-0 left-1/2 z-0 max-w-none -translate-x-1/2 md:hidden" />

        <section className="relative pt-16 pb-10 md:pt-24 md:pb-12">
            <div className="max-w-container mx-auto w-full px-4 md:px-8">
                <div className="mx-auto flex max-w-5xl flex-col md:items-center md:text-center">
                    <a
                        href={REPO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="outline-focus-ring rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        <BadgeGroup size="lg" color="brand" theme="modern" addonText="MIT licensed" className="hidden md:flex">
                            Built for AI-generated code
                        </BadgeGroup>
                        <BadgeGroup size="md" color="brand" theme="modern" addonText="MIT licensed" className="md:hidden">
                            Built for AI-generated code
                        </BadgeGroup>
                    </a>

                    <h1 className="text-display-md text-primary md:text-display-lg lg:text-display-xl mt-4 font-semibold text-balance">
                        Vibecode the UI. Ship code you would merge.
                    </h1>
                    <p className="text-tertiary mt-4 max-w-3xl text-lg text-balance md:mt-6 md:text-xl">
                        Smartera UI is an open-source React component library designed for the way code gets written now — by an agent, at speed. Your assistant
                        fetches real source from a machine-readable registry instead of recalling it, and accessibility, dark mode and right-to-left come from
                        the token layer rather than the prompt.
                    </p>

                    <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center md:mt-10">
                        <Button size="xl" color="secondary" href="/components">
                            Browse components
                        </Button>
                        <Button size="xl" href="/docs/installation">
                            Get started
                        </Button>
                    </div>

                    <div className="mt-8 flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center md:mt-10">
                        <CodeSnippet code={INSTALL_COMMAND} language="bash" aria-label="Install command" className="w-full sm:w-auto sm:min-w-72" />
                        <Button
                            size="lg"
                            color="link-gray"
                            href={REPO_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            iconLeading={<GithubMark className="size-5" data-icon="true" />}
                            className="justify-center sm:justify-start"
                        >
                            View the source on GitHub
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    </div>
);
