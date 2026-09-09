import { IPhoneMockup } from "@/components/shared-assets/mockups/iphone-mockup";
import { IMAGES } from "@/utils/demo-assets";
import { SignUpFormColumn } from "./base-components/form-column";

/** Split sign up page pairing the form with an oversized mobile app mockup on a tinted panel. */
export const SignupSplitAppMockup = () => (
    <section className="bg-primary grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <SignUpFormColumn headerClassName="hidden p-8 md:block" footerClassName="hidden p-8 pt-11 lg:flex" />

        <div className="bg-secondary relative hidden items-center overflow-hidden pt-32 pb-8 lg:flex">
            <IPhoneMockup image={IMAGES.square[0].src} className="absolute start-[187px] w-100" />
        </div>
    </section>
);
