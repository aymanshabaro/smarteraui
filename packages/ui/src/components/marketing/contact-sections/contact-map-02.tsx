import { Button } from "../../base/buttons/button";

/**
 * Coarse equirectangular land mask for the decorative dot map: `#` renders a dot, `.` is water.
 * 84 columns span -180°..180° of longitude, 33 rows span 80°N..-48°S.
 */
const LAND_ROWS = [
    "..............................#######...............................................",
    "...............###########....#######...............................................",
    "...######......###########....###................#####################..............",
    "...#########################..###..........###########################..............",
    "...#################....####..###..........###########################.....#########",
    "...#################....####..###.........##########################################",
    "...#################....####............############################################",
    ".........###########....####..............##########################################",
    ".............#############................################################..........",
    ".............#############..............#########...#..#####################........",
    ".............#############..............#.........###..#####################........",
    ".............#############............###.........######.......#############........",
    ".............#############............###.........######.......#############........",
    "................###...................############..####..#####..#########..........",
    "................###...................############..####..#####..#########..........",
    "................##########............############..####..#####..#########..........",
    "................########..............############..####..#####.########............",
    ".....................#########........##############......#####.########............",
    ".....................#########........##############......#####.########............",
    ".......................#######........##############............###..######.........",
    ".......................#######........##############............###..######.........",
    ".......................###########....##############............###..######.........",
    "........................##########...........#######............###..######.........",
    "........................##########...........#########..............##########......",
    "........................##########...........#########..............##########......",
    "........................##########...........#########..............##########......",
    ".........................######..............#####..##..............##########......",
    ".........................######..............#####..................##########......",
    ".........................######..............#####..................##########......",
    ".........................####.......................................##########...###",
    ".........................####....................................................###",
    ".........................####....................................................###",
    ".........................####.......................................................",
];

const DOT_SPACING = 8;
const MAP_COLUMNS = LAND_ROWS[0]?.length ?? 0;
const MAP_WIDTH = MAP_COLUMNS * DOT_SPACING;
const MAP_HEIGHT = LAND_ROWS.length * DOT_SPACING;

/** Office markers positioned on the same grid as the land mask. */
const MARKERS = [
    { label: "San Francisco", column: 13.5, row: 10.5 },
    { label: "New York", column: 24.7, row: 9.7 },
    { label: "London", column: 42, row: 7.3 },
    { label: "Berlin", column: 45, row: 7 },
    { label: "Dubai", column: 54.8, row: 13.7 },
    { label: "Singapore", column: 66.3, row: 19.7 },
    { label: "Sydney", column: 77.2, row: 28.5 },
    { label: "Melbourne", column: 75.8, row: 29.5 },
];

const channels = [
    { title: "Support", subtitle: "Our friendly team is here to help.", cta: "support@proper.example", href: "mailto:support@proper.example" },
    { title: "Sales", subtitle: "Questions or queries? Get in touch!", cta: "sales@proper.example", href: "mailto:sales@proper.example" },
    { title: "Phone", subtitle: "Mon-Fri from 8am to 5pm.", cta: "+1 (555) 000-0000", href: "tel:+15550000000" },
];

/** A dotted world map with office markers above three contact channels. */
export const ContactMap02 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Contact us</span>
                <h2 className="text-display-md text-primary md:text-display-lg mt-3 font-semibold">We&apos;d love to hear from you</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-6 md:text-xl">We have offices and teams all around the world.</p>
            </div>

            <div className="mt-16 flex flex-col gap-16 md:mt-24">
                <svg
                    viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                    fill="none"
                    aria-hidden="true"
                    className="text-border-secondary mx-auto hidden w-full max-w-5xl overflow-visible lg:block"
                >
                    {LAND_ROWS.map((line, rowIndex) =>
                        line
                            .split("")
                            .map((cell, columnIndex) =>
                                cell === "#" ? (
                                    <circle
                                        key={`${rowIndex}-${columnIndex}`}
                                        cx={columnIndex * DOT_SPACING + DOT_SPACING / 2}
                                        cy={rowIndex * DOT_SPACING + DOT_SPACING / 2}
                                        r={1.5}
                                        fill="currentColor"
                                    />
                                ) : null,
                            ),
                    )}

                    {MARKERS.map((marker) => (
                        <g key={marker.label} className="text-fg-brand-primary">
                            <circle
                                cx={marker.column * DOT_SPACING + DOT_SPACING / 2}
                                cy={marker.row * DOT_SPACING + DOT_SPACING / 2}
                                r={14}
                                fill="currentColor"
                                opacity={0.12}
                            />
                            <circle
                                cx={marker.column * DOT_SPACING + DOT_SPACING / 2}
                                cy={marker.row * DOT_SPACING + DOT_SPACING / 2}
                                r={7}
                                fill="currentColor"
                                opacity={0.2}
                            />
                            <circle
                                cx={marker.column * DOT_SPACING + DOT_SPACING / 2}
                                cy={marker.row * DOT_SPACING + DOT_SPACING / 2}
                                r={3}
                                fill="currentColor"
                            />
                        </g>
                    ))}
                </svg>

                <ul className="grid w-full grid-cols-1 justify-items-center gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                    {channels.map((channel) => (
                        <li key={channel.title} className="flex max-w-sm flex-col items-center text-center">
                            <h3 className="text-primary text-lg font-semibold">{channel.title}</h3>
                            <p className="text-md text-tertiary mt-1">{channel.subtitle}</p>
                            <Button href={channel.href} color="link-color" size="lg" className="mt-4 whitespace-pre md:mt-5">
                                {channel.cta}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
);
