import { sortCx } from "../../../utils/cx";
import { CloseButton } from "../../base/buttons/close-button";

const styles = sortCx({
    counter: "ring-utility-brand-500_alt flex min-w-7 items-center justify-center rounded-md p-1 ring-1 ring-inset",
    counterValue: "text-primary_on-brand min-w-0 flex-1 text-center text-xs font-medium",
    counterUnit: "text-tertiary_on-brand text-sm",
});

/** Fixed so demos and screenshots stay deterministic. */
const timeLeft = [
    { value: 8, unit: "hrs" },
    { value: 16, unit: "mins" },
    { value: 24, unit: "secs" },
];

/** A promotional banner with an hours / minutes / seconds countdown readout. Brand palette, full-bleed layout. */
export const BannerCountdownBrandFullWidth = () => (
    <section className="border-brand_alt bg-brand-section_subtle md:border-brand relative border-t md:border-t-0 md:border-b">
        <div className="max-w-container mx-auto flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-center md:px-12 md:py-3">
            <div className="flex flex-col gap-0.5 md:flex-row md:items-center md:gap-2">
                <p className="text-primary_on-brand pe-8 text-sm font-semibold md:pe-0">30% off PRO ends soon</p>
                <hr className="hidden h-4 w-px border-none bg-white/20 md:block" />
                <p className="text-tertiary_on-brand text-sm">Lock in your annual plan today.</p>
            </div>

            <div className="flex items-center gap-2">
                {timeLeft.map(({ value, unit }) => (
                    <div key={unit} className="flex items-center gap-1.5">
                        <div className={styles.counter}>
                            <p className={styles.counterValue}>{value}</p>
                        </div>
                        <p className={styles.counterUnit}>{unit}</p>
                    </div>
                ))}
            </div>

            <div className="absolute end-2 top-2 flex shrink-0 items-center justify-center md:top-1/2 md:-translate-y-1/2">
                <CloseButton slot={null} size="sm" theme="dark" label="Dismiss" />
            </div>
        </div>
    </section>
);
