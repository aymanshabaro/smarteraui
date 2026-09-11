import { sortCx } from "../../../utils/cx";
import { IMAGES } from "../../../utils/demo-assets";
import { Button } from "../../base/buttons/button";
import { ProperLogo } from "../../foundations/logo/proper-logo";
import { Facebook, Instagram, X } from "../../foundations/social-icons";

const styles = sortCx({
    shell: "bg-secondary flex w-full justify-center",
    container: "bg-primary w-full max-w-160 md:p-8",
    inlineLink:
        "text-brand-secondary outline-focus-ring hover:text-brand-secondary_hover rounded-xs underline focus-visible:outline-2 focus-visible:outline-offset-2",
    resourceLink:
        "text-brand-secondary outline-focus-ring hover:text-brand-secondary_hover md:text-md rounded-xs text-sm font-semibold underline focus-visible:outline-2 focus-visible:outline-offset-2",
    rule: "border-secondary my-6 w-20 border-t",
    socialLink:
        "text-fg-quaternary outline-focus-ring hover:text-fg-quaternary_hover flex rounded-xs transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
});

const resources = [
    { label: "Proper UI changelog →", href: "/changelog", description: "Weekly new updates and improvements to Proper UI." },
    { label: "Follow us on X →", href: "https://x.com/", description: "Stay up-to-date with the latest announcements and jobs." },
    { label: "Why we're building Proper UI →", href: "/about", description: "Proper UI is a new standard of design system and UI kit." },
];

const socials = [
    { label: "X", href: "https://x.com/", icon: X },
    { label: "Facebook", href: "https://www.facebook.com/", icon: Facebook },
    { label: "Instagram", href: "https://www.instagram.com/", icon: Instagram },
];

/** Long-form welcome: a hero photo, then a short reading list separated by hairline rules, then one action. */
export const SimpleWelcome02 = () => (
    <section className={styles.shell}>
        <div className={styles.container}>
            <div className="bg-primary p-6">
                <ProperLogo className="h-7 md:h-8" />
            </div>

            <div className="px-6 py-8">
                <img src={IMAGES.landscape[5].src} alt="" className="aspect-video w-full object-cover" />

                <h1 className="text-primary text-display-xs mt-12 font-semibold">Welcome to Proper UI</h1>

                <p className="text-tertiary md:text-md mt-4 text-sm">
                    We&apos;re excited to welcome you to Proper UI and we&apos;re even more excited about what we&apos;ve got planned. You&apos;re already on
                    your way to creating beautiful visual products.
                    <br />
                    <br />
                    Whether you&apos;re here for your brand, for a cause, or just for fun—welcome! If there&apos;s anything you need, we&apos;ll be here every
                    step of the way.
                </p>

                {resources.map(({ label, href, description }) => (
                    <div key={label}>
                        <hr className={styles.rule} />

                        <a href={href} className={styles.resourceLink}>
                            {label}
                        </a>
                        <p className="text-tertiary md:text-md mt-2 text-sm">{description}</p>
                    </div>
                ))}

                <hr className={styles.rule} />

                <p className="text-tertiary md:text-md text-sm">
                    Thanks for signing up. If you have any questions, send us a message at{" "}
                    <a href="mailto:hi@proper.example" className={styles.inlineLink}>
                        hi@proper.example
                    </a>{" "}
                    or on{" "}
                    <a href="https://x.com/" className={styles.inlineLink}>
                        X
                    </a>
                    . We&apos;d love to hear from you.
                    <br />
                    <br />— The team
                </p>

                <Button href="/login" size="md" className="mt-12">
                    Get started
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
