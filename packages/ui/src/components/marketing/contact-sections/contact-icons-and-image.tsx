import { MarkerPin01 } from "@properui/icons";
import { IMAGES } from "@/utils/demo-assets";

const offices = [
    { city: "Melbourne", address: "100 Flinders Street, Melbourne VIC 3000 AU" },
    { city: "Sydney", address: "100 George Street, Sydney NSW 2000 AU" },
];

/** Office list on a tinted band with a cover photo overlapping the section below. */
export const ContactIconsAndImage = () => (
    <div className="bg-primary">
        <section className="bg-secondary pt-16 pb-28 md:pt-24 md:pb-40">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-24">
                    <div className="flex w-full max-w-3xl flex-col">
                        <span className="text-brand-secondary md:text-md text-sm font-semibold">Contact us</span>
                        <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Chat to our friendly team</h2>
                        <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">We&apos;d love to hear from you! Please get in touch.</p>
                    </div>

                    <ul className="grid grid-cols-1 gap-10 md:gap-8">
                        {offices.map((office) => (
                            <li key={office.city} className="flex items-start gap-4">
                                <MarkerPin01 aria-hidden="true" className="text-icon-fg-brand size-6 pt-0.5" />
                                <div>
                                    <h3 className="text-primary text-lg font-semibold">{office.city}</h3>
                                    <p className="text-md text-tertiary mt-1 whitespace-pre md:whitespace-normal">{office.address}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>

        <section className="-mt-16 pb-16 md:-mt-24 md:pb-24">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <img
                    src={IMAGES.landscape[2].src}
                    alt="The Proper UI team discussing a topic"
                    className="shadow-3xl h-60 w-full object-cover md:h-120 lg:h-140"
                />
            </div>
        </section>
    </div>
);
