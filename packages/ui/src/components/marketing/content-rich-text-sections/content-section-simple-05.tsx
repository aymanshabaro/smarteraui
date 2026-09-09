import { Avatar } from "@/components/base/avatar/avatar";
import { AVATARS } from "@/utils/demo-assets";

const author = AVATARS[0];

/** A single centered pull quote with an attributed author beneath it. */
export const ContentSectionSimple05 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto w-full px-4 md:px-8">
            <div className="mx-auto max-w-180">
                <figure>
                    <blockquote>
                        <p className="md:!text-display-xs text-center text-xl font-medium not-italic before:hidden after:hidden">
                            We replaced four spreadsheets and a weekly meeting with one shared definition of activation. Six months later nobody can remember
                            what we used to argue about, which is the highest praise a tool is ever going to get.
                        </p>
                    </blockquote>
                    <figcaption className="not-prose mt-6 flex flex-col items-center justify-center text-center md:mt-8">
                        <Avatar size="md" src={author.src} alt={author.name} />
                        <p className="text-md text-primary mt-3 font-semibold">{author.name}</p>
                        <cite className="text-md text-tertiary mt-0.5 not-italic">Product Designer</cite>
                    </figcaption>
                </figure>
            </div>
        </div>
    </section>
);
