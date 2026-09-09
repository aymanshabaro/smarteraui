import { Button } from "@/components/base/buttons/button";
import { avatar } from "@/utils/demo-assets";

/** The mosaic is laid out on a 12×12 grid; each portrait names its own `grid-area`. */
const collage = [
    { photo: avatar(8), area: "7 / 5 / 13 / 9" },
    { photo: avatar(9), area: "1 / 7 / 7 / 11" },
    { photo: avatar(0), area: "3 / 3 / 7 / 7" },
    { photo: avatar(3), area: "7 / 9 / 11 / 13" },
    { photo: avatar(10), area: "7 / 1 / 12 / 5" },
];

/** A left-aligned intro beside an overlapping collage of team portraits. */
export const TeamSectionImageCollage02 = () => (
    <section className="bg-primary py-16 lg:py-24">
        <div className="max-w-container mx-auto grid grid-cols-1 gap-16 overflow-hidden px-4 md:px-8 lg:grid-cols-2 lg:items-center">
            <div className="flex max-w-3xl flex-col items-start">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Join our team</span>
                <h2 className="text-display-sm md:text-display-md text-primary mt-3 font-semibold">We&apos;re just getting started</h2>
                <p className="text-tertiary mt-4 text-lg md:mt-5 md:text-xl">
                    Our philosophy is simple—hire a team of diverse, passionate people and foster a culture that empowers you to do your best work.
                </p>

                <div className="mt-8 flex w-full flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-start">
                    <Button size="xl" color="secondary">
                        Read our principles
                    </Button>
                    <Button size="xl">We&apos;re hiring!</Button>
                </div>
            </div>

            <div className="grid h-122 w-[150%] grid-cols-[repeat(12,1fr)] grid-rows-[repeat(12,1fr)] gap-2 justify-self-center sm:h-124 sm:w-[120%] md:w-auto md:gap-4">
                {collage.map((item) => (
                    <img key={item.photo.name} src={item.photo.src} alt={item.photo.name} className="size-full object-cover" style={{ gridArea: item.area }} />
                ))}
            </div>
        </div>
    </section>
);
