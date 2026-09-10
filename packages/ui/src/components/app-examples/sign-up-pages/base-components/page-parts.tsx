// TODO(orchestrator): candidate for components/internal — every authentication page example
// repeats these three fragments.
import { Mail01 } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";
import { RatingStars } from "@/components/foundations/rating/rating-stars";
import { cx } from "@/utils/cx";
import { avatar } from "@/utils/demo-assets";

/** The five faces shown in the "from 200+ reviews" social proof row. */
const proofAvatars = [avatar(0), avatar(1), avatar(2), avatar(3), avatar(4)];

/** "Already have an account? Log in" — the footer of the form column. */
export const LogInPrompt = ({ className }: { className?: string }) => (
    <div className={cx("flex justify-center gap-1 text-center", className)}>
        <span className="text-tertiary text-sm">Already have an account?</span>
        <Button href="/login" color="link-color" size="md">
            Log in
        </Button>
    </div>
);

export interface SupportFooterProps {
    /** Whether the footer sits on the brand-coloured panel and needs the on-brand ink. */
    onBrand?: boolean;
    /** The class name applied to the footer element. */
    className?: string;
}

/** The copyright / support address footer pinned to the bottom of the form column. */
export const SupportFooter = ({ onBrand, className }: SupportFooterProps) => (
    <footer className={cx("flex justify-between", className)}>
        <p className={cx("text-sm", onBrand ? "text-tertiary_on-brand" : "text-tertiary")}>© Proper UI 2077</p>
        <a
            href="mailto:help@proper.example"
            className={cx(
                "outline-focus-ring flex items-center gap-2 rounded text-sm focus-visible:outline-2 focus-visible:outline-offset-2",
                onBrand ? "text-tertiary_on-brand" : "text-tertiary",
            )}
        >
            <Mail01 aria-hidden="true" className={cx("size-4", onBrand ? "text-tertiary_on-brand" : "text-fg-quaternary")} />
            help@proper.example
        </a>
    </footer>
);

export interface SocialProofRowProps {
    /** The class name applied to the row. */
    className?: string;
    /** The class name applied to the rating value and review count. */
    textClassName?: string;
}

/** Overlapping customer avatars beside a five-star rating and the review count. */
export const SocialProofRow = ({ className, textClassName = "text-white" }: SocialProofRowProps) => (
    <div className={cx("flex items-center gap-4", className)}>
        <div className="flex -space-x-3">
            {proofAvatars.map((person) => (
                <img key={person.src} src={person.src} alt={person.name} className="size-10 rounded-full object-cover ring-1 ring-white/30 ring-inset" />
            ))}
        </div>

        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
                <RatingStars rating={5} className="gap-1" />
                <p className={cx("text-md font-semibold", textClassName)}>5.0</p>
            </div>
            <p className={cx("text-sm font-medium", textClassName)}>from 200+ reviews</p>
        </div>
    </div>
);
