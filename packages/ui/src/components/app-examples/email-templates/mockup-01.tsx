"use client";

import { ArrowRight } from "@properui/icons";
import { cx, sortCx } from "../../../utils/cx";
import { IMAGES } from "../../../utils/demo-assets";
import { AppStoreButton, GooglePlayButton } from "../../base/buttons/app-store-buttons";
import { Button } from "../../base/buttons/button";
import { ProperLogo } from "../../foundations/logo/proper-logo";
import { Facebook, Instagram, X } from "../../foundations/social-icons";

const styles = sortCx({
    shell: "bg-secondary flex w-full justify-center",
    container: "w-full max-w-160 md:p-8",
    inlineLink:
        "text-brand-secondary outline-focus-ring hover:text-brand-secondary_hover rounded-xs underline focus-visible:outline-2 focus-visible:outline-offset-2",
    headerLink: "text-primary outline-focus-ring md:text-md rounded-xs text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2",
    headerSocialLink:
        "text-fg-primary outline-focus-ring flex rounded-xs transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
    // TODO(orchestrator): candidate for shared-assets/mockups — no screen/laptop mockup frame exists yet.
    mockupFrame: "ring-secondary overflow-hidden rounded-xl ring-1",
    socialLink:
        "text-fg-quaternary outline-focus-ring hover:text-fg-quaternary_hover flex rounded-xs transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
});

const socials = [
    { label: "X", href: "https://x.com/", icon: X },
    { label: "Facebook", href: "https://www.facebook.com/", icon: Facebook },
    { label: "Instagram", href: "https://www.instagram.com/", icon: Instagram },
];

/** Product-announcement email: a desktop screen mockup over a left-aligned pitch and an app-download block. */
export const Mockup01 = () => (
    <section className={styles.shell}>
        <div className={styles.container}>
            <div className="bg-primary flex items-center gap-4 p-6">
                <ProperLogo className="h-6" />

                <a href="/login" className={cx(styles.headerLink, "ms-auto")}>
                    Log in
                </a>

                <ul className="flex items-center gap-4">
                    {socials.map(({ label, href, icon: Icon }) => (
                        <li key={label}>
                            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={styles.headerSocialLink}>
                                <Icon aria-hidden="true" className="size-5" />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-primary px-6 py-8">
                <div className={styles.mockupFrame}>
                    <img src={IMAGES.landscape[0].src} alt="The Proper UI dashboard on a laptop" className="aspect-video w-full object-cover" />
                </div>

                <h1 className="text-primary text-display-xs mt-8 font-semibold">Introducing Proper UI</h1>

                <p className="text-tertiary md:text-md mt-4 text-sm">
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

                <Button href="/download" size="lg" iconTrailing={ArrowRight} className="mt-8">
                    Download now
                </Button>
            </div>

            <div className="bg-primary px-6 py-8">
                <p className="text-primary md:text-md text-sm font-semibold">Download the app</p>
                <p className="text-tertiary mt-2 text-sm">Get the most of Proper UI by installing our new mobile app.</p>

                <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                    <AppStoreButton href="https://www.apple.com/app-store/" size="md" />
                    <GooglePlayButton href="https://play.google.com/" size="md" />
                </div>

                <p className="text-tertiary mt-12 text-sm">
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
