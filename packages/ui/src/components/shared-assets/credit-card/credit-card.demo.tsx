import { CreditCard } from "@/components/shared-assets/credit-card/credit-card";

export const CreditCardExample = () => (
    <div className="flex items-center justify-center">
        <CreditCard type="brand-dark" company="Untitled." cardNumber="1234 1234 1234 1234" cardHolder="OLIVIA RHYE" cardExpiration="06/28" />
    </div>
);

export const CustomizationExample = () => (
    <div className="flex flex-col gap-8">
        <div className="flex items-center justify-center">
            <CreditCard type="brand-dark" company="Brex" cardNumber="5678 9012 3456 7890" cardHolder="PEDRO FRANCESCHI" cardExpiration="12/28" />
        </div>
        <div className="flex items-center justify-center">
            <CreditCard type="gradient-strip" company="Apple Inc." cardNumber="0987 6543 2109 8765" cardHolder="TIM COOK" cardExpiration="06/29" />
        </div>
    </div>
);

export const SizesExample = () => (
    <div className="flex flex-col items-center gap-8">
        <CreditCard type="brand-dark" width={240} />
        <CreditCard type="brand-dark" width={316} />
    </div>
);

// Normal types
export const Transparent = () => (
    <div className="flex items-center justify-center">
        <CreditCard type="transparent" />
    </div>
);

export const TransparentGradient = () => (
    <div className="flex items-center justify-center">
        <CreditCard type="transparent-gradient" />
    </div>
);

export const BrandDark = () => (
    <div className="flex items-center justify-center">
        <CreditCard type="brand-dark" />
    </div>
);

export const BrandLight = () => (
    <div className="flex items-center justify-center">
        <CreditCard type="brand-light" />
    </div>
);

export const GrayDark = () => (
    <div className="flex items-center justify-center">
        <CreditCard type="gray-dark" />
    </div>
);

export const GrayLight = () => (
    <div className="flex items-center justify-center">
        <CreditCard type="gray-light" />
    </div>
);

// Strip types
export const TransparentStrip = () => (
    <div className="flex items-center justify-center">
        <CreditCard type="transparent-strip" />
    </div>
);

export const GrayStrip = () => (
    <div className="flex items-center justify-center">
        <CreditCard type="gray-strip" />
    </div>
);

export const GradientStrip = () => (
    <div className="flex items-center justify-center">
        <CreditCard type="gradient-strip" />
    </div>
);

export const SalmonStrip = () => (
    <div className="flex items-center justify-center">
        <CreditCard type="salmon-strip" />
    </div>
);

// Vertical strip types
export const GrayStripVertical = () => (
    <div className="flex items-center justify-center">
        <CreditCard type="gray-strip-vertical" />
    </div>
);

export const GradientStripVertical = () => (
    <div className="flex items-center justify-center">
        <CreditCard type="gradient-strip-vertical" />
    </div>
);

export const SalmonStripVertical = () => (
    <div className="flex items-center justify-center">
        <CreditCard type="salmon-strip-vertical" />
    </div>
);
