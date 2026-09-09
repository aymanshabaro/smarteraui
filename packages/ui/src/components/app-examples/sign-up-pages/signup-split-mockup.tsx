import { IMAGES } from "@/utils/demo-assets";
import { SignUpFormColumn } from "./base-components/form-column";
import { ScreenMockup } from "./base-components/screen-mockup";

/** Split sign up whose right half bleeds a bezelled desktop app window off the page edge. */
export const SignupSplitMockup = () => (
    <section className="bg-primary grid min-h-screen grid-cols-1 lg:grid-cols-[640px_1fr]">
        <SignUpFormColumn headerClassName="hidden pt-8 ps-8 lg:block" footerClassName="hidden px-8 pt-4 pb-8 lg:flex" bodyClassName="md:py-0" />

        <div className="bg-tertiary relative hidden items-center overflow-hidden ps-24 lg:flex">
            <ScreenMockup src={IMAGES.landscape[0].src} alt="Smartera dashboard" imageClassName="max-h-168.5" />
        </div>
    </section>
);
