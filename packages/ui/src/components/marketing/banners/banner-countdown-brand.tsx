import { CloseButton } from "@/components/base/buttons/close-button";
import { sortCx } from "@/utils/cx";

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

/** A promotional banner with an hours / minutes / seconds countdown readout. Brand palette, floating card layout. */
export const BannerCountdownBrand = () => (
    <section className="border-brand_alt bg-brand-section_subtle relative mx-2 mb-4 flex flex-col gap-3 rounded-xl border-t p-4 shadow-lg md:m-0 md:flex-row md:items-center md:justify-center md:border-t-0 md:border-b md:px-12 md:py-4">
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
    </section>
);
