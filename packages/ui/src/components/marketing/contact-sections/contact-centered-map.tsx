const columns = [
    {
        id: "apac",
        className: "grid grid-cols-1 gap-y-6 lg:gap-y-12",
        locations: [
            { city: "Melbourne", address: "100 Flinders Street\nMelbourne VIC 3000 AU" },
            { city: "Sydney", address: "100 George Street\nSydney NSW 2000 AU" },
            { city: "Byron Bay", address: "100 Jonson Street\nByron Bay NSW 2481 AU" },
        ],
    },
    {
        id: "emea-americas",
        className: "mt-6 grid grid-cols-1 gap-y-6 sm:mt-0 lg:gap-y-12",
        locations: [
            { city: "London", address: "100 Oxford Street\nLondon W1D 1LL UK" },
            { city: "San Francisco", address: "100 Market Street\nSan Francisco, CA 94105 USA" },
            { city: "Sweden", address: "Drottninggatan 100\n111 60 Stockholm SE" },
        ],
    },
];

/** Centered heading over two address columns flanking an embedded map. */
export const ContactCenteredMap = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="flex w-full max-w-3xl flex-col lg:mx-auto lg:items-center lg:text-center">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Our locations</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">Visit our stores</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">Say hello to our friendly team at one of these locations.</p>
            </div>

            <div className="mt-12 grid grid-cols-1 items-start md:mt-16 md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr] lg:gap-16">
                {columns.map((column) => (
                    <ul key={column.id} className={column.className}>
                        {column.locations.map((location) => (
                            <li key={location.city} className="flex max-w-sm flex-col lg:text-center">
                                <h3 className="text-primary text-lg font-semibold">{location.city}</h3>
                                <p className="text-md text-tertiary mt-1 whitespace-pre">{location.address}</p>
                            </li>
                        ))}
                    </ul>
                ))}

                <iframe
                    title="Our address"
                    src="https://snazzymaps.com/embed/451894"
                    className="mt-12 h-60 w-full border-none md:col-span-2 lg:col-auto lg:col-start-2 lg:row-start-1 lg:mt-0 lg:h-full lg:w-110 xl:w-140"
                />
            </div>
        </div>
    </section>
);
