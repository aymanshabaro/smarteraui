import { Button } from "@/components/base/buttons/button";
import { ProperLogo } from "@/components/foundations/logo/proper-logo";
import { Facebook, Instagram, X } from "@/components/foundations/social-icons";
import { sortCx } from "@/utils/cx";

const styles = sortCx({
    shell: "bg-secondary flex w-full justify-center",
    container: "bg-primary w-full max-w-160 md:p-8",
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

/** Team-invitation email: one sentence of context and one accept action, nothing else. */
export const SimpleInvite = () => (
    <section className={styles.shell}>
        <div className={styles.container}>
            <div className="bg-primary p-6">
                <ProperLogo className="h-7 md:h-8" />
            </div>

            <div className="px-6 py-8">
                <p className="text-tertiary text-md">
                    Hi Olivia,
                    <br />
                    <br />
                    Lana has invited you to join the team on <span className="font-semibold">Proper</span>.
                </p>

                <Button href="/invites/accept" size="lg" className="my-6">
                    Accept the invite
                </Button>

                <p className="text-tertiary text-md">
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
