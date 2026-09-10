import { AppStoreButton, GooglePlayButton } from "@/components/base/buttons/app-store-buttons";
import { ProperLogo } from "@/components/foundations/logo/proper-logo";
import { IPhoneMockup } from "@/components/shared-assets/mockups/iphone-mockup";
import { sortCx } from "@/utils/cx";
import { IMAGES } from "@/utils/demo-assets";

const styles = sortCx({
    shell: "bg-secondary flex w-full justify-center",
    container: "w-full max-w-160 md:p-8",
    inlineLink:
        "text-brand-secondary outline-focus-ring hover:text-brand-secondary_hover rounded-xs underline focus-visible:outline-2 focus-visible:outline-offset-2",
    legalLink: "text-tertiary outline-focus-ring hover:text-tertiary_hover rounded-xs text-sm underline focus-visible:outline-2 focus-visible:outline-offset-2",
    mockupFrame: "bg-secondary flex h-64 justify-center overflow-hidden rounded-xl pt-8 md:h-80",
});

const legalLinks = [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Cookies", href: "/cookies" },
    { label: "Contact us", href: "/contact" },
];

/** Mobile-app announcement: a pair of phone mockups above a centered pitch and the two store badges. */
export const Mockup02 = () => (
    <section className={styles.shell}>
        <div className={styles.container}>
            <div className="bg-primary flex justify-center p-6">
                <ProperLogo className="h-6" />
            </div>

            <div className="bg-primary px-6 py-8">
                <div className={styles.mockupFrame}>
                    <div className="flex items-start gap-4">
                        <IPhoneMockup image={IMAGES.landscape[1].src} className="mt-10 w-36 shrink-0 md:w-44" />
                        <IPhoneMockup image={IMAGES.landscape[2].src} className="w-36 shrink-0 md:w-44" />
                    </div>
                </div>

                <h1 className="text-primary text-display-xs mt-8 text-center font-semibold">Welcome to Proper UI!</h1>

                <p className="text-tertiary text-md mt-4 text-center md:text-lg">
                    Hi Olivia, thanks for checking out Proper. Get the most of Proper by installing our new mobile app.
                </p>

                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <AppStoreButton href="https://www.apple.com/app-store/" size="md" />
                    <GooglePlayButton href="https://play.google.com/" size="md" />
                </div>

                <p className="text-tertiary text-md mt-8 text-center md:text-lg">
                    If you have any questions, just reply to this email—we&apos;ll be happy to hear from you!
                </p>
            </div>

            <div className="bg-primary px-6 py-8">
                <hr className="border-secondary border-t" />

                <p className="text-tertiary mt-8 text-center text-sm">
                    You&apos;re receiving this email because you subscribed to receive marketing emails. If you&apos;d prefer to not receive these emails,
                    please{" "}
                    <a href="/unsubscribe" className={styles.inlineLink}>
                        unsubscribe
                    </a>
                    .
                </p>

                <ul className="mt-8 flex flex-wrap items-center justify-center gap-6">
                    {legalLinks.map(({ label, href }) => (
                        <li key={label}>
                            <a href={href} className={styles.legalLink}>
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>

                <p className="text-tertiary mt-8 text-center text-sm">
                    © 2077 Proper UI
                    <br />
                    100 Smith Street, Collingwood VIC 3066
                </p>
            </div>
        </div>
    </section>
);
