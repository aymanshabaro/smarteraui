import { Button } from "@/components/base/buttons/button";
import { ProperLogo } from "@/components/foundations/logo/proper-logo";
import { Facebook, Instagram, X } from "@/components/foundations/social-icons";
import { sortCx } from "@/utils/cx";
import { IMAGES } from "@/utils/demo-assets";

const styles = sortCx({
    shell: "bg-secondary flex w-full justify-center",
    container: "w-full max-w-160 md:p-8",
    inlineLink:
        "text-brand-secondary outline-focus-ring hover:text-brand-secondary_hover rounded-xs underline focus-visible:outline-2 focus-visible:outline-offset-2",
    socialLink:
        "text-fg-quaternary outline-focus-ring hover:text-fg-quaternary_hover flex rounded-xs transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
});

const socials = [
    { label: "X", href: "https://x.com/", icon: X },
    { label: "Facebook", href: "https://www.facebook.com/", icon: Facebook },
    { label: "Instagram", href: "https://www.instagram.com/", icon: Instagram },
];

/** Welcome email opened by a full-width photo, followed by a personal greeting and a single action. */
export const ImageWelcome = () => (
    <section className={styles.shell}>
        <div className={styles.container}>
            <div className="bg-primary p-6">
                <ProperLogo className="h-7 md:h-8" />
            </div>

            <div className="bg-primary px-6 py-8">
                <img src={IMAGES.landscape[6].src} alt="" className="h-80 w-full object-cover" />

                <h1 className="text-primary text-display-xs mt-12 font-semibold">Hi Olivia,</h1>

                <p className="text-tertiary text-md mt-4 md:text-lg">
                    We&apos;re glad to have you onboard! You&apos;re already on your way to creating beautiful visual products.
                    <br />
                    <br />
                    Whether you&apos;re here for your brand, for a cause, or just for fun—welcome! If there&apos;s anything you need, we&apos;ll be here every
                    step of the way.
                    <br />
                    <br />
                    Thanks,
                    <br />
                    The team
                </p>

                <Button href="/login" size="lg" className="mt-12">
                    Log in
                </Button>
            </div>

            <div className="bg-primary px-6 py-8">
                <p className="text-tertiary text-sm">
                    This email was sent to{" "}
                    <a href="mailto:olivia@proper.example" className={styles.inlineLink}>
                        olivia@proper.example
                    </a>
                    . If you&apos;d rather not receive this kind of email, you can{" "}
                    <a href="/unsubscribe" className={styles.inlineLink}>
                        unsubscribe
                    </a>{" "}
                    or{" "}
                    <a href="/email-preferences" className={styles.inlineLink}>
                        manage your email preferences
                    </a>
                    .
                </p>
                <p className="text-tertiary mt-5 text-sm">© 2077 Proper UI, 100 Smith Street, Collingwood VIC 3066</p>

                <div className="mt-12 flex items-center justify-between gap-4">
                    <ProperLogo className="h-6" />

                    <ul className="flex items-center gap-4">
                        {socials.map(({ label, href, icon: Icon }) => (
                            <li key={label}>
                                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={styles.socialLink}>
                                    <Icon aria-hidden="true" className="size-5" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </section>
);
