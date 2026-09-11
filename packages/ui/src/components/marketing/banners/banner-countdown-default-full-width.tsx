import { sortCx } from "../../../utils/cx";
import { CloseButton } from "../../base/buttons/close-button";

const styles = sortCx({
    counter: "bg-primary ring-primary flex min-w-7 items-center justify-center rounded-md p-1 shadow-xs ring-1 ring-inset",
    counterValue: "text-primary min-w-0 flex-1 text-center text-xs font-medium",
    counterUnit: "text-tertiary text-sm",
});

/** Fixed so demos and screenshots stay deterministic. */
const timeLeft = [
    { value: 8, unit: "hrs" },
    { value: 16, unit: "mins" },
    { value: 24, unit: "secs" },
];

/** A promotional banner with an hours / minutes / seconds countdown readout. Default palette, full-bleed layout. */
export const BannerCountdownDefaultFullWidth = () => (
    <section className="border-primary bg-secondary relative border-t md:border-t-0 md:border-b">
        <div className="max-w-container mx-auto flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-center md:px-12 md:py-3">
            <div className="flex flex-col gap-0.5 md:flex-row md:items-center md:gap-2">
                <p className="text-secondary pe-8 text-sm font-semibold md:pe-0">30% off PRO ends soon</p>
                <hr className="bg-border-secondary hidden h-4 w-px border-none md:block" />
                <p className="text-tertiary text-sm">Lock in your annual plan today.</p>
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
                <CloseButton slot={null} size="sm" label="Dismiss" />
            </div>
        </div>
    </section>
);
