import type { ReactNode } from "react";
import { cx, sortCx } from "@/utils/cx";

/**
 * TODO(orchestrator): candidate for `components/shared-assets/mockups/screen-mockup.tsx`.
 * The `F-foundations` task only shipped `iphone-mockup.tsx`, so the layered desktop/browser
 * frame that several features sections need lives here. The `.a` suffix keeps it from
 * colliding with the other `M-features-sections` part agents working in this folder.
 */
const styles = sortCx({
    sizes: {
        sm: {
            root: "shadow-modern-mockup-outer-md md:rounded-[20.08px] md:p-0.5 md:shadow-modern-mockup-outer-lg md:ring-[1.25px]",
            inner: "md:rounded-[17.57px] md:p-[3.5px] md:shadow-modern-mockup-inner-lg",
            screen: "md:rounded-[15.06px] md:ring-[1.25px]",
        },
        md: {
            root: "shadow-lg md:rounded-[26.95px] md:p-[3.5px] md:ring-[1.68px]",
            inner: "md:rounded-[23.58px] md:p-1 md:shadow-modern-mockup-inner-lg",
            screen: "bg-utility-neutral-50 md:rounded-[20.21px] md:ring-[1.68px]",
        },
        lg: {
            root: "shadow-lg md:rounded-[32px] md:p-1 md:ring-[2px]",
            inner: "md:rounded-[28px] md:p-[5.4px] md:shadow-modern-mockup-inner-lg",
            screen: "bg-utility-neutral-50 md:rounded-[24px] md:ring-[2px]",
        },
    },
});

interface ScreenMockupProps {
    /** Bezel scale of the frame. */
    size?: keyof typeof styles.sizes;
    /** The screen content — usually an `<img>`. */
    children: ReactNode;
    /** Classes merged onto the outer bezel. */
    className?: string;
    /** Classes merged onto the clipped screen area. */
    screenClassName?: string;
}

/** The layered "modern mockup" bezel used by the desktop screenshots in features sections. */
export const ScreenMockup = ({ size = "sm", children, className, screenClassName }: ScreenMockupProps) => (
    <div
        className={cx("bg-primary ring-utility-neutral-300 size-full rounded-[9.03px] p-[0.9px] ring-[0.56px] ring-inset", styles.sizes[size].root, className)}
    >
        <div className={cx("bg-primary shadow-modern-mockup-inner-md size-full rounded-[7.9px] p-0.5", styles.sizes[size].inner)}>
            <div
                className={cx(
                    "ring-utility-neutral-200 relative size-full overflow-hidden rounded-[6.77px] ring-[0.56px]",
                    styles.sizes[size].screen,
                    screenClassName,
                )}
            >
                {children}
            </div>
        </div>
    </div>
);
