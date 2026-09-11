"use client";

import { Maximize01, Play, PlayCircle, VolumeMax } from "@properui/icons";
import { cx, sortCx } from "../../../utils/cx";
import { IMAGES } from "../../../utils/demo-assets";
import { Button } from "../../base/buttons/button";
import { ProperLogo } from "../../foundations/logo/proper-logo";
import { PlayButtonIcon } from "../../foundations/play-button-icon";
import { Facebook, Instagram, X } from "../../foundations/social-icons";

const styles = sortCx({
    shell: "bg-secondary flex w-full justify-center",
    container: "w-full max-w-160 md:p-8",
    inlineLink:
        "text-brand-secondary outline-focus-ring hover:text-brand-secondary_hover rounded-xs underline focus-visible:outline-2 focus-visible:outline-offset-2",
    quietLink: "text-tertiary outline-focus-ring rounded-xs underline focus-visible:outline-2 focus-visible:outline-offset-2",
    headerLink: "text-primary outline-focus-ring md:text-md rounded-xs text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2",
    headerSocialLink:
        "text-fg-primary outline-focus-ring flex rounded-xs transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
    player: "group outline-focus-ring relative block overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2",
    playerBar: "absolute inset-x-0 bottom-0 flex items-center gap-3 px-4 pb-4 text-white",
    socialLink:
        "text-fg-quaternary outline-focus-ring hover:text-fg-quaternary_hover flex rounded-xs transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
});

const socials = [
    { label: "X", href: "https://x.com/", icon: X },
    { label: "Facebook", href: "https://www.facebook.com/", icon: Facebook },
    { label: "Instagram", href: "https://www.instagram.com/", icon: Instagram },
];

/** Centered video announcement: a utility bar on top, the intro still in the middle, and a watch action beneath it. */
export const VideoWelcome02 = () => (
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

            <div className="bg-primary px-6 py-8 text-center">
                <h1 className="text-primary text-display-xs font-semibold">How to get up and running</h1>

                <p className="text-tertiary md:text-md mt-4 text-sm">
                    We&apos;ve created a quick intro video to get you up and running as soon as possible. Don&apos;t hesitate to{" "}
                    <a href="/contact" className={styles.quietLink}>
                        get in touch
                    </a>
                    .
                </p>

                <a href="/tutorials/getting-started" aria-label="Video tutorial on getting started" className={cx(styles.player, "mt-8")}>
                    <img src={IMAGES.landscape[4].src} alt="" className="aspect-video w-full object-cover" />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <PlayButtonIcon />
                    </div>

                    <div aria-hidden="true" className={styles.playerBar}>
                        <Play className="size-5 shrink-0" />
                        <VolumeMax className="size-5 shrink-0" />
                        <span className="text-sm font-medium">00:00</span>
                        <span className="h-1 flex-1 rounded-full bg-white/30" />
                        <span className="text-sm font-medium">-08:24</span>
                        <Maximize01 className="size-5 shrink-0" />
                    </div>
                </a>

                <div className="mt-8 flex justify-center">
                    <Button href="/tutorials/getting-started" size="lg" iconLeading={PlayCircle}>
                        Watch video
                    </Button>
                </div>
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
