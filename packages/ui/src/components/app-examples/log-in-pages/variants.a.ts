import { LoginCardCombined } from "./login-card-combined";
import { LoginCardSeparated } from "./login-card-separated";
import { LoginSimple } from "./login-simple";
import { LoginSimpleHeaderNavigation } from "./login-simple-header-navigation";
import { LoginSimpleIllustration } from "./login-simple-illustration";
import { LoginSimpleMinimal } from "./login-simple-minimal";
import { LoginSimpleSocialLoginLeading } from "./login-simple-social-login-leading";
import { LoginSimpleSocialLogins } from "./login-simple-social-logins";
import { LoginSplitCarousel } from "./login-split-carousel";
import { LoginSplitImage } from "./login-split-image";
import { LoginSplitMockup } from "./login-split-mockup";
import { LoginSplitMockupQuote } from "./login-split-mockup-quote";
import { LoginSplitQuote } from "./login-split-quote";
import { LoginSplitQuoteImage01 } from "./login-split-quote-image-01";
import { LoginSplitQuoteImage02 } from "./login-split-quote-image-02";
import { LoginSplitQuoteImage03 } from "./login-split-quote-image-03";

export const variantsA = {
    "login-simple": LoginSimple,
    "login-simple-minimal": LoginSimpleMinimal,
    "login-card-separated": LoginCardSeparated,
    "login-split-mockup": LoginSplitMockup,
    "login-split-quote": LoginSplitQuote,
    "login-split-quote-image-03": LoginSplitQuoteImage03,
    "login-simple-social-logins": LoginSimpleSocialLogins,
    "login-simple-header-navigation": LoginSimpleHeaderNavigation,
    "login-card-combined": LoginCardCombined,
    "login-split-mockup-quote": LoginSplitMockupQuote,
    "login-split-quote-image-01": LoginSplitQuoteImage01,
    "login-simple-social-login-leading": LoginSimpleSocialLoginLeading,
    "login-simple-illustration": LoginSimpleIllustration,
    "login-split-carousel": LoginSplitCarousel,
    "login-split-image": LoginSplitImage,
    "login-split-quote-image-02": LoginSplitQuoteImage02,
} as const;
