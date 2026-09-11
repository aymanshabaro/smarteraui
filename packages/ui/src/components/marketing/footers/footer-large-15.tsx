import { sortCx } from "../../../utils/cx";
import { Button } from "../../base/buttons/button";
import { ProperLogo } from "../../foundations/logo/proper-logo";

const styles = sortCx({
    legalLink:
        "text-quaternary outline-focus-ring hover:text-tertiary rounded-xs text-sm transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2",
});

const navItems = ["Overview", "Features", "Pricing", "Careers", "Help", "Privacy"];
const legalItems = ["Terms", "Privacy", "Cookies"];

/**
 * A centred single-row footer: the logo above a six-up inline navigation, with the copyright
 * and legal links split across a divider underneath.
 */
export const FooterLarge15 = () => {
    return (
        <footer className="bg-primary py-12 md:pt-16">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="flex flex-col gap-8 md:items-center">
                    <ProperLogo className="h-7 w-min shrink-0" />

                    <nav>
                        <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-[repeat(6,max-content)]">
                            {navItems.map((item) => (
                                <li key={item} className="flex">
                                    <Button href="#" size="md" color="link-gray" className="max-h-5">
                                        {item}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className="border-secondary mt-12 flex flex-col-reverse justify-between gap-4 border-t pt-8 md:mt-16 md:flex-row md:gap-6">
                    <p className="text-quaternary text-sm">© 2077 Proper UI. All rights reserved.</p>

                    <ul className="flex gap-3">
                        {legalItems.map((item) => (
                            <li key={item}>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- placeholder href for a marketing section */}
                                <a href="#" className={styles.legalLink}>
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
};
