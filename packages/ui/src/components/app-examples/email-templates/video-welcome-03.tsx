"use client";

import { Maximize01, Play, PlayCircle, VolumeMax } from "@properui/icons";
import { sortCx } from "../../../utils/cx";
import { IMAGES } from "../../../utils/demo-assets";
import { Button } from "../../base/buttons/button";
import { ProperLogo } from "../../foundations/logo/proper-logo";
import { PlayButtonIcon } from "../../foundations/play-button-icon";

const styles = sortCx({
    shell: "bg-secondary flex w-full justify-center",
    container: "w-full max-w-160 md:p-8",
    inlineLink:
        "text-brand-secondary outline-focus-ring hover:text-brand-secondary_hover rounded-xs underline focus-visible:outline-2 focus-visible:outline-offset-2",
    legalLink: "text-tertiary outline-focus-ring hover:text-tertiary_hover rounded-xs text-sm underline focus-visible:outline-2 focus-visible:outline-offset-2",
    player: "group outline-focus-ring relative block overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2",
    playerBar: "absolute inset-x-0 bottom-0 flex items-center gap-3 px-4 pb-4 text-white",
});

const legalLinks = [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Cookies", href: "/cookies" },
    { label: "Contact us", href: "/contact" },
];

/** Video-led welcome: the intro still runs full bleed above a centered headline and a two-action row. */
export const VideoWelcome03 = () => (
    <section className={styles.shell}>
        <div className={styles.container}>
            <div className="bg-primary p-6">
                <ProperLogo className="h-7 md:h-8" />
            </div>

            <div className="bg-primary px-6 py-8">
                <a href="/tutorials/getting-started" aria-label="Video tutorial on getting started" className={styles.player}>
                    <img src={IMAGES.landscape[4].src} alt="" className="aspect-video w-full object-cover" />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <PlayButtonIcon isPlaying />
                    </div>

                    <div aria-hidden="true" className={styles.playerBar}>
                        <Play className="size-5 shrink-0" />
                        <VolumeMax className="size-5 shrink-0" />
                        <span className="text-sm font-medium">02:08</span>
                        <span className="h-1 flex-1 rounded-full bg-white/30">
                            <span className="block h-full w-1/4 rounded-full bg-white" />
                        </span>
                        <span className="text-sm font-medium">-06:18</span>
                        <Maximize01 className="size-5 shrink-0" />
                    </div>
                </a>

                <h1 className="text-primary text-display-xs mt-12 text-center font-semibold">Welcome to Proper UI!</h1>

                <p className="text-tertiary text-md mt-4 text-center md:text-lg">
                    Hi Olivia, thanks for checking out Proper UI. Here are a few tips to help you get up and running as soon as possible. If you have any
                    questions, just reply to this email—we&apos;ll be happy to hear from you!
                </p>

                <div className="mt-12 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                    <Button href="/tutorials/getting-started" size="lg" color="secondary" iconLeading={PlayCircle}>
                        Watch intro
                    </Button>
                    <Button href="/login" size="lg">
                        Log in
                    </Button>
                </div>
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
