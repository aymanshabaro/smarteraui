import { sortCx } from "../../../utils/cx";
import { Button } from "../../base/buttons/button";
import { ProperLogo } from "../../foundations/logo/proper-logo";
import { Facebook, Instagram, X } from "../../foundations/social-icons";

const styles = sortCx({
    shell: "bg-secondary flex w-full justify-center",
    container: "bg-primary w-full max-w-160 md:p-8",
    inlineLink:
        "text-brand-secondary outline-focus-ring hover:text-brand-secondary_hover rounded-xs underline focus-visible:outline-2 focus-visible:outline-offset-2",
    navLink: "text-primary outline-focus-ring md:text-md rounded-xs text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2",
    socialLink:
        "text-fg-quaternary outline-focus-ring hover:text-fg-quaternary_hover flex rounded-xs transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
});

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Tutorial", href: "/tutorial" },
    { label: "Support", href: "/support" },
];

const socials = [
    { label: "X", href: "https://x.com/", icon: X },
    { label: "Facebook", href: "https://www.facebook.com/", icon: Facebook },
    { label: "Instagram", href: "https://www.instagram.com/", icon: Instagram },
];

/**
 * Welcome email laid out as a plain letter: logo and top navigation, a short greeting, one primary
 * action, and the legal footer with the logo and social links.
 */
export const SimpleWelcome01 = () => (
    <section className={styles.shell}>
        <div className={styles.container}>
            <div className="bg-primary p-6">
                <ProperLogo className="h-6" />

                <nav aria-label="Email" className="mt-8">
                    <ul className="flex flex-wrap items-center gap-4">
                        {navLinks.map(({ label, href }) => (
                            <li key={label}>
                                <a href={href} className={styles.navLink}>
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="px-6 py-8">
                <p className="text-tertiary md:text-md text-sm">
                    Hi Olivia,
                    <br />
                    <br />
                    We&apos;re glad to have you onboard! You&apos;re already on your way to creating beautiful visual products.
                    <br />
                    <br />
                    Whether you&apos;re here for your brand, for a cause, or just for fun, welcome! If there&apos;s anything you need, we&apos;ll be here every
                    step of the way.
                    <br />
                    <br />
                    Thanks,
                    <br />
                    The team
                </p>

                <Button href="/login" size="lg" className="mt-8">
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
