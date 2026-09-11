// TODO(orchestrator): candidate for components/shared-assets/mockups — the marketing hero and
// CTA sections inline the same three-layer bezel.
import { cx, sortCx } from "../../../../utils/cx";

const styles = sortCx({
    /** The three nested layers that make up a desktop device bezel. */
    frame: {
        outer: "ring-utility-neutral-300 bg-primary rounded-[9.03px] p-[0.9px] shadow-lg ring-[0.56px] ring-inset md:rounded-[26.95px] md:p-[4.5px] md:ring-[1px]",
        middle: "bg-primary shadow-modern-mockup-inner-md md:shadow-modern-mockup-inner-lg h-full rounded-[7.9px] p-0.5 md:rounded-[23.58px] md:p-1",
        screen: "bg-utility-neutral-50 ring-utility-neutral-200 relative h-full overflow-hidden rounded-[6.77px] ring-[0.56px] md:rounded-[20.21px] md:ring-[1.68px]",
    },
});

export interface ScreenMockupProps {
    /** The screenshot rendered inside the bezel. */
    src: string;
    /** The screenshot's alternative text. */
    alt: string;
    /** The class name applied to the outermost bezel layer. */
    className?: string;
    /** The class name applied to the screenshot itself. */
    imageClassName?: string;
}

/** A bezelled desktop app window used as the decorative half of the split sign up pages. */
export const ScreenMockup = ({ src, alt, className, imageClassName }: ScreenMockupProps) => (
    <div className={cx(styles.frame.outer, className)}>
        <div className={styles.frame.middle}>
            <div className={styles.frame.screen}>
                <img src={src} alt={alt} className={cx("max-w-none object-cover object-left-top", imageClassName)} />
            </div>
        </div>
    </div>
);
