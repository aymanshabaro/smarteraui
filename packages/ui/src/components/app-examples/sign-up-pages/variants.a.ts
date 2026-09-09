import { SignupCardCombined } from "./signup-card-combined";
import { SignupCardSeparated } from "./signup-card-separated";
import { SignupProgress01 } from "./signup-progress-01";
import { SignupProgress02 } from "./signup-progress-02";
import { SignupProgress03 } from "./signup-progress-03";
import { SignupSidebarProgress01 } from "./signup-sidebar-progress-01";
import { SignupSidebarProgress02 } from "./signup-sidebar-progress-02";
import { SignupSimple } from "./signup-simple";
import { SignupSimpleHeaderNavigation } from "./signup-simple-header-navigation";
import { SignupSimpleSocialLoginLeading } from "./signup-simple-social-login-leading";
import { SignupSimpleSocialLogins } from "./signup-simple-social-logins";
import { SignupSplitAppMockup } from "./signup-split-app-mockup";
import { SignupSplitArrow } from "./signup-split-arrow";
import { SignupSplitCarousel } from "./signup-split-carousel";
import { SignupSplitImage } from "./signup-split-image";
import { SignupSplitImageBackground } from "./signup-split-image-background";
import { SignupSplitMockup } from "./signup-split-mockup";
import { SignupSplitMockupQuote } from "./signup-split-mockup-quote";
import { SignupSplitQuoteCarousel } from "./signup-split-quote-carousel";
import { SignupSplitQuoteImage01 } from "./signup-split-quote-image-01";
import { SignupSplitQuoteImage02 } from "./signup-split-quote-image-02";

/** Part A of the sign up page variants, keyed by their docs route slug. */
export const variantsA = {
    "signup-simple": SignupSimple,
    "signup-simple-header-navigation": SignupSimpleHeaderNavigation,
    "signup-progress-01": SignupProgress01,
    "signup-split-mockup": SignupSplitMockup,
    "signup-split-image": SignupSplitImage,
    "signup-split-app-mockup": SignupSplitAppMockup,
    "signup-split-quote-carousel": SignupSplitQuoteCarousel,
    "signup-simple-social-logins": SignupSimpleSocialLogins,
    "signup-card-separated": SignupCardSeparated,
    "signup-progress-02": SignupProgress02,
    "signup-split-mockup-quote": SignupSplitMockupQuote,
    "signup-split-quote-image-01": SignupSplitQuoteImage01,
    "signup-split-arrow": SignupSplitArrow,
    "signup-sidebar-progress-01": SignupSidebarProgress01,
    "signup-simple-social-login-leading": SignupSimpleSocialLoginLeading,
    "signup-card-combined": SignupCardCombined,
    "signup-progress-03": SignupProgress03,
    "signup-split-carousel": SignupSplitCarousel,
    "signup-split-quote-image-02": SignupSplitQuoteImage02,
    "signup-split-image-background": SignupSplitImageBackground,
    "signup-sidebar-progress-02": SignupSidebarProgress02,
} as const;
