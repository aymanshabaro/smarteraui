"use client";

import type { ComponentPropsWithRef } from "react";
import { Children, createContext, isValidElement, useContext } from "react";
import { cx, sortCx } from "../../../utils/cx";
import { Avatar as AvatarBase, type AvatarProps } from "../../base/avatar/avatar";

const styles = sortCx({
    root: {
        // The horizontal padding lives on the root so every slot (breadcrumbs, content,
        // footer) lines up; only the banner breaks out of it again.
        root: "flex w-full flex-col gap-5",
        gutter: "px-4 md:px-8",
        align: { start: "", center: "items-center text-center" },
    },
    banner: {
        root: "h-32 w-auto self-stretch overflow-hidden bg-tertiary md:h-40",
        image: "size-full object-cover",
    },
    content: {
        root: "flex w-full gap-4",
        align: { start: "flex-col md:flex-row md:flex-wrap md:items-center", center: "flex-col items-center" },
    },
    heading: {
        root: "flex min-w-0 flex-col gap-1",
        align: { start: "md:flex-1", center: "items-center" },
    },
    avatar: {
        root: "flex shrink-0",
        // Over a banner the avatar overlaps the cover…
        banner: "-mt-12",
        // …and takes a line of its own once the content row kicks in.
        align: { start: "md:basis-full", center: "" },
    },
    actions: {
        // Reversed on mobile so the primary action stays on top of the stack.
        root: "flex flex-col-reverse gap-3 md:flex-row md:items-center",
        align: { start: "md:ms-auto", center: "" },
    },
    footer: { root: "w-full self-stretch" },
    title: { root: "text-display-xs text-primary font-semibold md:text-display-sm" },
    description: { root: "text-md text-tertiary" },
});

/** The horizontal alignment shared by every slot of a page header. */
export type PageHeaderAlign = keyof typeof styles.root.align;

const PageHeaderContext = createContext<{ align: PageHeaderAlign; hasBanner: boolean; gutter: boolean }>({ align: "start", hasBanner: false, gutter: true });

export interface PageHeaderBannerProps extends ComponentPropsWithRef<"div"> {
    /** Source of the cover image. Omit it to render a custom cover through `children`. */
    src?: string;
    /** Alt text of the cover image — leave empty for a purely decorative cover. */
    alt?: string;
    /** The class name applied to the cover image. */
    imageClassName?: string;
}

const Banner = ({ src, alt = "", imageClassName, className, children, ...props }: PageHeaderBannerProps) => {
    // The banner breaks out of the root's horizontal gutter with a negative margin — there's
    // nothing to break out of once `gutter={false}` removes that padding.
    const { gutter } = useContext(PageHeaderContext);

    return (
        <div {...props} className={cx(styles.banner.root, gutter && "-mx-4 md:-mx-8", className)}>
            {src && <img src={src} alt={alt} className={cx(styles.banner.image, imageClassName)} />}
            {children}
        </div>
    );
};

const Content = ({ className, ...props }: ComponentPropsWithRef<"div">) => {
    const { align } = useContext(PageHeaderContext);

    return <div {...props} className={cx(styles.content.root, styles.content.align[align], className)} />;
};

const Heading = ({ className, ...props }: ComponentPropsWithRef<"div">) => {
    const { align } = useContext(PageHeaderContext);

    return <div {...props} className={cx(styles.heading.root, styles.heading.align[align], className)} />;
};

const Title = ({ className, ...props }: ComponentPropsWithRef<"h1">) => (
    // eslint-disable-next-line jsx-a11y/heading-has-content -- content is always supplied by callers via {...props}.children
    <h1 {...props} className={cx(styles.title.root, className)} />
);

const Description = ({ className, ...props }: ComponentPropsWithRef<"p">) => <p {...props} className={cx(styles.description.root, className)} />;

export interface PageHeaderAvatarProps extends AvatarProps {
    /** The class name applied to the wrapper that positions the avatar. */
    wrapperClassName?: string;
}

const PageHeaderAvatar = ({ size, border, wrapperClassName, ...props }: PageHeaderAvatarProps) => {
    const { align, hasBanner } = useContext(PageHeaderContext);

    return (
        <div className={cx(styles.avatar.root, hasBanner && styles.avatar.banner, hasBanner && styles.avatar.align[align], wrapperClassName)}>
            <AvatarBase {...props} size={size ?? (hasBanner ? "2xl" : "lg")} border={border ?? hasBanner} />
        </div>
    );
};

const Actions = ({ className, ...props }: ComponentPropsWithRef<"div">) => {
    const { align } = useContext(PageHeaderContext);

    return <div {...props} className={cx(styles.actions.root, styles.actions.align[align], className)} />;
};

const Footer = ({ className, ...props }: ComponentPropsWithRef<"div">) => <div {...props} className={cx(styles.footer.root, className)} />;

export interface PageHeaderProps extends ComponentPropsWithRef<"header"> {
    /**
     * The horizontal alignment of the header content.
     *
     * @default "start"
     */
    align?: PageHeaderAlign;
    /**
     * Whether the header applies its own horizontal gutter (`px-4 md:px-8`). Set to `false` when
     * the parent layout already supplies side padding, so the header doesn't double it up.
     *
     * @default true
     */
    gutter?: boolean;
}

const PageHeaderRoot = ({ align = "start", gutter = true, className, children, ...props }: PageHeaderProps) => {
    // A banner changes how the avatar is positioned, so the root announces it to the slots.
    const hasBanner = Children.toArray(children).some((child) => isValidElement(child) && child.type === Banner);

    return (
        <PageHeaderContext.Provider value={{ align, hasBanner, gutter }}>
            <header {...props} className={cx(styles.root.root, gutter && styles.root.gutter, styles.root.align[align], className)}>
                {children}
            </header>
        </PageHeaderContext.Provider>
    );
};

const PageHeader = PageHeaderRoot as typeof PageHeaderRoot & {
    Banner: typeof Banner;
    Content: typeof Content;
    Heading: typeof Heading;
    Title: typeof Title;
    Description: typeof Description;
    Avatar: typeof PageHeaderAvatar;
    Actions: typeof Actions;
    Footer: typeof Footer;
};

PageHeader.Banner = Banner;
PageHeader.Content = Content;
PageHeader.Heading = Heading;
PageHeader.Title = Title;
PageHeader.Description = Description;
PageHeader.Avatar = PageHeaderAvatar;
PageHeader.Actions = Actions;
PageHeader.Footer = Footer;

export { PageHeader };
