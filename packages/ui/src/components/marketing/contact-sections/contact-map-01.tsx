import { MarkerPin01 } from "@properui/icons";
import { Button } from "@/components/base/buttons/button";

const locations = [
    {
        title: "Retail store",
        hours: "Mon-Sat 9am to 5pm.",
        address: "150 Brunswick Street\nFitzroy VIC 3065 AU",
        href: "https://maps.google.com/?q=150+Brunswick+Street+Fitzroy+VIC+3065",
    },
    {
        title: "Showroom",
        hours: "Mon-Fri 9am to 5pm.",
        address: "50 Flinders Street\nMelbourne VIC 3000 AU",
        href: "https://maps.google.com/?q=50+Flinders+Street+Melbourne+VIC+3000",
    },
    {
        title: "Head office",
        hours: "Mon-Fri 9am to 5pm.",
        address: "100 Smith Street\nCollingwood VIC 3066 AU",
        href: "https://maps.google.com/?q=100+Smith+Street+Collingwood+VIC+3066",
    },
];

/** Full-width embedded map above a row of store addresses. */
export const ContactMap01 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Contact us</span>
                <h2 className="text-display-md text-primary md:text-display-lg mt-3 font-semibold">Our locations</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">Come visit our friendly team at one of our offices.</p>
            </div>

            <div className="mt-16 flex flex-col gap-12 md:mt-24 md:gap-16">
                <iframe title="Our address" src="https://snazzymaps.com/embed/451894" className="h-80 w-full border-none md:h-100" />

                <ul className="grid w-full grid-cols-1 justify-items-center gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                    {locations.map((location) => (
                        <li key={location.title} className="flex max-w-sm flex-col items-center text-center">
                            <MarkerPin01 aria-hidden="true" className="text-icon-fg-brand size-6" />
                            <h3 className="text-primary mt-3 text-lg font-semibold md:mt-4">{location.title}</h3>
                            <p className="text-md text-tertiary mt-1">{location.hours}</p>
                            <Button href={location.href} color="link-color" size="lg" className="mt-3 whitespace-pre md:mt-4">
                                {location.address}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
);
