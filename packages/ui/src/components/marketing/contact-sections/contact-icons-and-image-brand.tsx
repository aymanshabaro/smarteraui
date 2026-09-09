import { MarkerPin01 } from "@smarteraui/icons";
import { IMAGES } from "@/utils/demo-assets";

const offices = [
    { city: "Melbourne", address: "100 Flinders Street, Melbourne VIC 3000 AU" },
    { city: "Sydney", address: "100 George Street, Sydney NSW 2000 AU" },
];

/** Branded intro band with two offices, over a photo that overlaps it from below. */
export const ContactIconsAndImageBrand = () => (
    <section className="bg-primary">
        <div className="bg-brand-section pt-16 pb-28 md:pt-24 md:pb-40">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-24">
                    <div className="flex w-full max-w-3xl flex-col">
                        <span className="text-tertiary_on-brand md:text-md text-sm font-semibold">Contact us</span>
                        <h2 className="text-display-sm text-primary_on-brand md:text-display-md mt-3 font-semibold">Chat to our friendly team</h2>
                        <p className="text-tertiary_on-brand mt-4 text-lg md:mt-5 md:text-xl">We&apos;d love to hear from you! Please get in touch.</p>
                    </div>

                    <ul className="grid grid-cols-1 gap-10 md:gap-8">
                        {offices.map((office) => (
                            <li key={office.city} className="flex items-start gap-4">
                                <MarkerPin01 className="text-primary_on-brand size-6 pt-0.5" aria-hidden="true" />

                                <div>
                                    <h3 className="text-primary_on-brand text-lg font-semibold">{office.city}</h3>
                                    <p className="text-md text-tertiary_on-brand mt-1">{office.address}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

        <div className="-mt-16 pb-16 md:-mt-24 md:pb-24">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <img
                    src={IMAGES.landscape[4].src}
                    alt="Two team members talking in the Smartera office"
                    className="h-60 w-full object-cover md:h-120 lg:h-140"
                />
            </div>
        </div>
    </section>
);
