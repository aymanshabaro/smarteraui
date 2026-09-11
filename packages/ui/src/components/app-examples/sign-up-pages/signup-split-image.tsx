import { IMAGES } from "../../../utils/demo-assets";
import { SignUpFormColumn } from "./base-components/form-column";

/** Split sign up page whose right half is a full-bleed photograph with a rounded inner corner. */
export const SignupSplitImage = () => (
    <section className="bg-primary grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <SignUpFormColumn
            headerClassName="hidden p-8 md:block"
            footerClassName="hidden p-8 pt-11 lg:flex"
            bodyClassName="md:py-0"
            passwordPlaceholder="••••••••••••"
        />

        <div className="relative hidden h-full flex-1 items-center justify-center overflow-hidden rounded-s-[80px] lg:flex">
            <img src={IMAGES.landscape[1].src} alt={IMAGES.landscape[1].alt} className="absolute inset-0 size-full object-cover" />
        </div>
    </section>
);
