import { sortCx } from "../../../utils/cx";
import { Button } from "../../base/buttons/button";
import { ProperLogo } from "../../foundations/logo/proper-logo";
import { Facebook, Instagram, X } from "../../foundations/social-icons";

const styles = sortCx({
    shell: "bg-secondary flex w-full justify-center",
    container: "bg-primary w-full max-w-160 md:p-8",
    inlineLink:
        "text-brand-secondary outline-focus-ring hover:text-brand-secondary_hover rounded-xs underline focus-visible:outline-2 focus-visible:outline-offset-2",
    digitFrame: "bg-border-brand rounded-[10px] p-0.5",
    digit: "bg-primary text-fg-brand-secondary text-display-md md:text-display-lg flex size-11 items-center justify-center rounded-lg font-medium md:size-[62px]",
    socialLink:
        "text-fg-quaternary outline-focus-ring hover:text-fg-quaternary_hover flex rounded-xs transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
});

const verificationCode = ["3", "0", "6", "6"];

const socials = [
    { label: "X", href: "https://x.com/", icon: X },
    { label: "Facebook", href: "https://www.facebook.com/", icon: Facebook },
    { label: "Instagram", href: "https://www.instagram.com/", icon: Instagram },
];

/** One-time-passcode email: the four code digits sit in brand-outlined tiles above a fallback verify link. */
export const SimpleVerification = () => (
    <section className={styles.shell}>
        <div className={styles.container}>
            <div className="bg-primary p-6">
                <ProperLogo className="h-7 md:h-8" />
            </div>

            <div className="px-6 py-8">
                <p className="text-tertiary text-sm/6">
                    Hi Olivia,
                    <br />
                    <br />
                    This is your verification code:
                </p>

                <p className="sr-only">Your verification code is {verificationCode.join(" ")}.</p>

                <div aria-hidden="true" className="mt-6 flex items-center gap-2">
                    {verificationCode.map((digit, index) => (
                        <div key={`${digit}-${index}`} className={styles.digitFrame}>
                            <div className={styles.digit}>{digit}</div>
                        </div>
                    ))}
                </div>

                <p className="text-tertiary md:text-md mt-6 text-sm">
                    This code will only be valid for the next 5 minutes. If the code does not work, you can use this login verification link:
                </p>

                <Button href="/verify" size="lg" className="mt-6">
                    Verify email
                </Button>

                <p className="text-tertiary md:text-md mt-6 text-sm">
                    Thanks,
                    <br />
                    The team
                </p>
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
