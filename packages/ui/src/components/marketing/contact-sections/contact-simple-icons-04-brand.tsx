const locations = [
    { city: "Melbourne", address: "100 Flinders Street\nMelbourne VIC 3000 AU" },
    { city: "Sydney", address: "100 George Street\nSydney NSW 2000 AU" },
    { city: "Byron Bay", address: "100 Jonson Street\nByron Bay NSW 2481 AU" },
    { city: "London", address: "100 Oxford Street\nLondon W1D 1LL UK" },
    { city: "San Francisco", address: "100 Market Street\nSan Francisco, CA 94105 USA" },
    { city: "Sweden", address: "Drottninggatan 100\n111 60 Stockholm SE" },
];

/** Six store addresses beside a heading, on the permanently branded section background. */
export const ContactSimpleIcons04Brand = () => (
    <section className="bg-brand-section py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
                <div className="w-full max-w-90">
                    <div className="text-tertiary_on-brand md:text-md text-sm font-semibold">Our locations</div>
                    <h2 className="text-display-sm text-primary_on-brand md:text-display-md mt-3 font-semibold">Visit our stores</h2>
                    <p className="text-tertiary_on-brand mt-4 text-lg md:mt-5 md:text-xl">Find us at these locations.</p>
                </div>

                <ul className="grid w-full grid-cols-1 gap-x-16 gap-y-6 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-3 md:gap-y-8 lg:grid-cols-2 lg:px-11">
                    {locations.map((location) => (
                        <li key={location.city} className="flex max-w-sm flex-col">
                            <h3 className="text-primary_on-brand text-lg font-semibold">{location.city}</h3>
                            <p className="text-md text-tertiary_on-brand mt-1 whitespace-pre">{location.address}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
);
