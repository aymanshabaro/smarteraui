"use client";

import { MarkerPin01 } from "@properui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

const offices = [
    { city: "Melbourne", address: "100 Flinders Street, Melbourne VIC 3000 AU" },
    { city: "Sydney", address: "100 George Street, Sydney NSW 2000 AU" },
];

/** Two offices on the branded section background, with an embedded map overlapping it from below. */
export const ContactIconsAndMap02Brand = () => (
    <section className="bg-primary">
        <div className="bg-brand-section pt-16 pb-28 md:pt-24 md:pb-40">
            <div className="max-w-container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-24">
                    <div className="flex w-full max-w-3xl flex-col">
                        <span className="text-tertiary_on-brand md:text-md text-sm font-semibold">Contact us</span>
                        <h2 className="text-display-sm text-primary_on-brand md:text-display-md mt-3 font-semibold">Our locations</h2>
                        <p className="text-tertiary_on-brand mt-4 text-lg md:mt-5 md:text-xl">Come visit our friendly team at one of our offices.</p>
                    </div>

                    <ul className="grid grid-cols-1 gap-10 md:gap-8">
                        {offices.map((office) => (
                            <li key={office.city} className="flex items-start gap-4">
                                <FeaturedIcon icon={MarkerPin01} size="md" color="brand" theme="dark" className="flex md:hidden" />
                                <FeaturedIcon icon={MarkerPin01} size="lg" color="brand" theme="dark" className="hidden md:flex" />

                                <div className="pt-1.5 md:pt-2.5">
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
                <iframe title="Our address" src="https://snazzymaps.com/embed/451871" className="h-60 w-full border-none md:h-129" />
            </div>
        </div>
    </section>
);
