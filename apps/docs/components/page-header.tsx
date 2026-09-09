import Link from "next/link";
import type { Frontmatter } from "~/lib/content";
import { cx } from "~/lib/cx";
import { githubSourceUrl } from "~/lib/site";
import type { NavSiblings } from "~/lib/site-nav";
import { ArrowLeft, ArrowRight } from "@smarteraui/icons";
import { GithubMark } from "./brand-icons";
import { CopyMenu } from "./copy-menu";
import { ResourceLink, utilityButtonClasses } from "./primitives";

/** H1 + Copy dropdown + prev/next arrows, description, resource links. */
export const PageHeader = ({ frontmatter, pathname, siblings }: { frontmatter: Frontmatter; pathname: string; siblings: NavSiblings }) => (
    <div className="mb-10">
        <div className="flex items-center gap-2 pb-3">
            <h1 className="text-primary md:text-display-xs max-w-3xl text-xl font-semibold text-balance md:text-wrap">{frontmatter.title}</h1>

            <div className="mt-0.5 ml-auto flex shrink-0 items-center gap-2">
                <CopyMenu pathname={pathname} title={frontmatter.title} />
                {siblings.prev && (
                    <Link href={siblings.prev.href} aria-label={siblings.prev.title} className={cx(utilityButtonClasses("outline"))}>
                        <ArrowLeft className="size-4" data-icon="true" />
                    </Link>
                )}
                {siblings.next && (
                    <Link href={siblings.next.href} aria-label={siblings.next.title} className={cx(utilityButtonClasses("outline"))}>
                        <ArrowRight className="size-4" data-icon="true" />
                    </Link>
                )}
            </div>
        </div>

        {frontmatter.description && <p className="text-md text-tertiary max-w-3xl whitespace-pre-line">{frontmatter.description}</p>}

        {(frontmatter.source || frontmatter.figma) && (
            <ul className="mt-6 flex items-center gap-2">
                {frontmatter.source && (
                    <li className="inline-flex">
                        <ResourceLink href={githubSourceUrl(frontmatter.source)} icon={GithubMark}>
                            GitHub
                        </ResourceLink>
                    </li>
                )}
                <li className="inline-flex">
                    <ResourceLink href="https://react-spectrum.adobe.com/react-aria/index.html">React Aria</ResourceLink>
                </li>
                {frontmatter.figma && (
                    <li className="inline-flex">
                        <ResourceLink href={frontmatter.figma}>Figma</ResourceLink>
                    </li>
                )}
            </ul>
        )}
    </div>
);
