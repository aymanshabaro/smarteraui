import { Button } from "@/components/base/buttons/button";
import { IMAGES } from "@/utils/demo-assets";

/** A rich-text column with two calls to action, balanced by a tall image on the end edge. */
export const ContentSectionSplitImage03 = () => (
    <section className="bg-primary py-16 md:py-24">
        <div className="max-w-container mx-auto grid w-full grid-cols-1 items-center gap-12 px-4 md:gap-16 md:px-8 lg:grid-cols-2">
            <div className="flex flex-col">
                <span className="text-brand-secondary md:text-md text-sm font-semibold">Our studio</span>
                <h2 className="text-display-sm text-primary md:text-display-md mt-3 font-semibold">People first. Design later.</h2>

                <div className="prose md:prose-lg mt-8 md:mt-12">
                    <p>
                        We are a twelve-person studio that takes on four projects a year. That constraint is deliberate: it is the only way we know to keep the
                        people who sold the work on the work itself.
                    </p>
                    <p>
                        Every engagement starts with two weeks of research that you own outright, whether or not you continue with us. If the answer at the end
                        of it is that you do not need a redesign, we would rather tell you that than bill for one.
                    </p>
                    <p>
                        The rest of the process is unremarkable on purpose. Weekly demos, a shared file everyone can open, and no deliverable that arrives as a
                        surprise. Good design work is mostly the absence of drama.
                    </p>
                    <p>
                        We work with founders, in-house teams and the occasional agency that needs a second pair of hands. If you are somewhere in there, the
                        first conversation costs nothing.
                    </p>
                </div>

                <div className="mt-8 flex flex-col-reverse gap-3 md:mt-12 md:flex-row">
                    <Button size="xl" color="secondary">
                        Get in touch
                    </Button>
                    <Button size="xl">Our process</Button>
                </div>
            </div>

            <div className="h-60 lg:h-163.5">
                <img src={IMAGES.landscape[1].src} className="size-full object-cover" alt="" />
            </div>
        </div>
    </section>
);
