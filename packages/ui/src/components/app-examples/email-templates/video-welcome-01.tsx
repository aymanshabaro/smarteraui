import { Maximize01, Play, VolumeMax } from "@properui/icons";
import { cx, sortCx } from "../../../utils/cx";
import { IMAGES } from "../../../utils/demo-assets";
import { AppStoreButton, GooglePlayButton } from "../../base/buttons/app-store-buttons";
import { ProperLogo } from "../../foundations/logo/proper-logo";
import { PlayButtonIcon } from "../../foundations/play-button-icon";
import { Facebook, Instagram, X } from "../../foundations/social-icons";

const styles = sortCx({
    shell: "bg-secondary flex w-full justify-center",
    container: "w-full max-w-160 md:p-8",
    inlineLink:
        "text-brand-secondary outline-focus-ring hover:text-brand-secondary_hover rounded-xs underline focus-visible:outline-2 focus-visible:outline-offset-2",
    quietLink: "text-tertiary outline-focus-ring rounded-xs underline focus-visible:outline-2 focus-visible:outline-offset-2",
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

/** Welcome email built around an intro video still, closed by an app-download block and a social row. */
export const VideoWelcome01 = () => (
    <section className={styles.shell}>
        <div className={styles.container}>
            <div className="bg-primary flex justify-center p-6">
                <ProperLogo className="h-6" />
            </div>

            <div className="bg-primary px-6 py-8">
                <p className="text-tertiary md:text-md text-sm">
                    Hi Olivia,
                    <br />
                    <br />
                    Welcome to Proper UI! You&apos;re already on your way to creating beautiful visual products.
                    <br />
                    <br />
                    We&apos;ve created a quick intro video to get you up and running as soon as possible. If you have any questions,{" "}
                    <a href="/contact" className={styles.quietLink}>
                        please get in touch
                    </a>
                    .
                </p>

                <a href="/tutorials/getting-started" aria-label="Video tutorial on getting started" className={cx(styles.player, "mt-8")}>
                    <img src={IMAGES.landscape[3].src} alt="" className="aspect-video w-full object-cover" />

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

                <p className="text-tertiary md:text-md mt-8 text-sm">
                    Thanks,
                    <br />
                    The team
                </p>
            </div>

            <div className="bg-primary px-6 py-8 text-center">
                <p className="text-primary md:text-md text-sm font-semibold">Download the app</p>
                <p className="text-tertiary mt-2 text-sm">Get the most of Proper UI by installing our new mobile app.</p>

                <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <AppStoreButton href="https://www.apple.com/app-store/" size="md" />
                    <GooglePlayButton href="https://play.google.com/" size="md" />
                </div>

                <ul className="mt-8 flex items-center justify-center gap-4">
                    {socials.map(({ label, href, icon: Icon }) => (
                        <li key={label}>
                            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={styles.socialLink}>
                                <Icon aria-hidden="true" className="size-5" />
                            </a>
                        </li>
                    ))}
                </ul>

                <p className="text-tertiary mt-8 text-sm">
                    Proper UI is committed to sustainable building. This email was sent with 200% carbon offset. If you&apos;d prefer to not receive these
                    emails, please{" "}
                    <a href="/unsubscribe" className={styles.inlineLink}>
                        unsubscribe
                    </a>
                    .
                </p>
                <p className="text-tertiary mt-5 text-sm">
                    © 2077 Proper UI
                    <br />
                    100 Smith Street, Collingwood VIC 3066
                </p>
            </div>
        </div>
    </section>
);
