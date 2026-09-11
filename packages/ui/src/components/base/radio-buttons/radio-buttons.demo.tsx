"use client";

import { Radio as AriaRadio, Text as AriaText } from "react-aria-components";
import { Bank, BarChartSquare01, LayersThree01, Package, Zap } from "@properui/icons";
import { cx } from "../../../utils/cx";
import { AVATARS } from "../../../utils/demo-assets";
import { FeaturedIcon } from "../../foundations/featured-icon/featured-icon";
import { MastercardIcon, PayPalIcon, StripeIcon, VisaIcon } from "../../foundations/payment-icons";
import { Avatar as AvatarPrimitive } from "../avatar/avatar";
import { CheckboxBase } from "../checkbox/checkbox";
import { RadioButtonBase, RadioButton as RadioButtonPrimitive, RadioGroup } from "./radio-buttons";

/* -----------------------------------------------------------------------------------------
 * Radio button examples (task B-radio-buttons)
 * ---------------------------------------------------------------------------------------*/

export const RadioButtonExample = () => (
    <RadioGroup aria-label="Pricing plans" defaultValue="basic">
        <RadioButtonPrimitive label="Basic plan" hint="Up to 10 users and 20 GB data." value="basic" />
        <RadioButtonPrimitive label="Business plan" hint="Up to 20 users and 40 GB data." value="business" />
        <RadioButtonPrimitive label="Enterprise plan" hint="Unlimited users and unlimited data." value="enterprise" />
    </RadioGroup>
);

export const WithLabel = () => (
    <RadioGroup aria-label="Pricing plans" defaultValue="basic">
        <RadioButtonPrimitive label="Basic plan" value="basic" />
        <RadioButtonPrimitive label="Business plan" value="business" />
        <RadioButtonPrimitive label="Enterprise plan" value="enterprise" />
    </RadioGroup>
);

export const WithLabelAndHint = () => (
    <RadioGroup aria-label="Pricing plans" defaultValue="basic">
        <RadioButtonPrimitive label="Basic plan" hint="Up to 10 users and 20 GB data." value="basic" />
        <RadioButtonPrimitive label="Business plan" hint="Up to 20 users and 40 GB data." value="business" />
        <RadioButtonPrimitive label="Enterprise plan" hint="Unlimited users and unlimited data." value="enterprise" />
    </RadioGroup>
);

export const Disabled = () => (
    <RadioGroup aria-label="Pricing plans" isDisabled defaultValue="basic">
        <RadioButtonPrimitive label="Basic plan" hint="Up to 10 users and 20 GB data." value="basic" />
        <RadioButtonPrimitive label="Business plan" hint="Up to 20 users and 40 GB data." value="business" />
        <RadioButtonPrimitive label="Enterprise plan" hint="Unlimited users and unlimited data." value="enterprise" />
    </RadioGroup>
);

export const DisabledIndividualOption = () => (
    <RadioGroup aria-label="Pricing plans" defaultValue="basic">
        <RadioButtonPrimitive label="Basic plan" hint="Up to 10 users and 20 GB data." value="basic" />
        <RadioButtonPrimitive label="Business plan" hint="Up to 20 users and 40 GB data." value="business" />
        <RadioButtonPrimitive isDisabled label="Enterprise plan" hint="Unlimited users and unlimited data." value="enterprise" />
    </RadioGroup>
);

export const Sizes = () => (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <RadioGroup aria-label="Pricing plans" defaultValue="basic">
            <RadioButtonPrimitive label="Basic plan" hint="Up to 10 users and 20 GB data." value="basic" />
            <RadioButtonPrimitive label="Business plan" hint="Up to 20 users and 40 GB data." value="business" />
            <RadioButtonPrimitive label="Enterprise plan" hint="Unlimited users and unlimited data." value="enterprise" />
        </RadioGroup>
        <RadioGroup aria-label="Pricing plans" defaultValue="basic" size="md">
            <RadioButtonPrimitive label="Basic plan" hint="Up to 10 users and 20 GB data." value="basic" />
            <RadioButtonPrimitive label="Business plan" hint="Up to 20 users and 40 GB data." value="business" />
            <RadioButtonPrimitive label="Enterprise plan" hint="Unlimited users and unlimited data." value="enterprise" />
        </RadioGroup>
    </div>
);

/* -----------------------------------------------------------------------------------------
 * Radio group examples (task B-radio-groups)
 *
 * The reference "radio groups" page composes the same primitives above into card-style
 * layouts, reusing `RadioButtonBase` (circular dot) for the "Radio button" example and
 * `CheckboxBase` (square check) from `base/checkbox` for the others, plus `FeaturedIcon`
 * and `Avatar`/payment brand icons for the leading visuals.
 * ---------------------------------------------------------------------------------------*/

const PLAN_ICONS = [Package, BarChartSquare01, Zap, LayersThree01, Bank] as const;

const PLANS = [
    { value: "basic", label: "Basic plan", price: "$10/month", hint: "Includes up to 10 users, 20 GB individual data and access to all features." },
    { value: "business", label: "Business plan", price: "$20/month", hint: "Includes up to 20 users, 40 GB individual data and access to all features." },
    { value: "enterprise", label: "Enterprise plan", price: "$40/month", hint: "Unlimited users, unlimited individual data and access to all features." },
    { value: "ultimate", label: "Ultimate plan", price: "$60/month", hint: "Unlimited users, unlimited individual data and access to all features." },
    { value: "secret", label: "Secret plan", price: "$80/month", hint: "Unlimited users, unlimited individual data and access to all features." },
] as const;

export const IconSimple = () => (
    <RadioGroup aria-label="Payment plans" defaultValue="basic" className="gap-3">
        {PLANS.map((plan, index) => (
            <AriaRadio
                key={plan.value}
                value={plan.value}
                className={({ isSelected }) =>
                    cx(
                        "bg-primary outline-focus-ring relative flex cursor-pointer items-start gap-1 rounded-xl p-4 ring-inset focus-visible:outline-2 focus-visible:outline-offset-2",
                        isSelected ? "ring-brand ring-2" : "ring-secondary ring-1",
                    )
                }
            >
                {({ isSelected }) => (
                    <div className="flex flex-1 gap-3">
                        <FeaturedIcon color="gray" theme="modern" size="sm" icon={PLAN_ICONS[index]} />
                        <div className="flex flex-col">
                            <span className="flex gap-1">
                                <span className="text-secondary text-sm font-medium">{plan.label}</span>
                                <span className="text-tertiary text-sm">{plan.price}</span>
                            </span>
                            <AriaText slot="description" className="text-tertiary text-sm">
                                {plan.hint}
                            </AriaText>
                        </div>
                        <CheckboxBase isSelected={isSelected} className="ms-auto" />
                    </div>
                )}
            </AriaRadio>
        ))}
    </RadioGroup>
);

const ICON_CARD_PLANS = [
    { value: "basic", label: "Basic plan", price: "$10", hint: "Includes up to 10 users, 20 GB individual data and access to all features.", badge: true },
    { value: "premium", label: "Premium plan", price: "$20", hint: "Includes up to 20 users, 40 GB individual data and access to all features.", badge: false },
    {
        value: "enterprise",
        label: "Enterprise plan",
        price: "$40",
        hint: "Unlimited users, unlimited individual data and access to all features.",
        badge: false,
    },
    { value: "ultimate", label: "Ultimate plan", price: "$60", hint: "Unlimited users, unlimited individual data and access to all features.", badge: false },
    { value: "secret", label: "Secret plan", price: "$80", hint: "Unlimited users, unlimited individual data and access to all features.", badge: false },
] as const;

export const IconCard = () => (
    <RadioGroup aria-label="Payment plans" defaultValue="basic" className="gap-3">
        {ICON_CARD_PLANS.map((plan, index) => (
            <AriaRadio
                key={plan.value}
                value={plan.value}
                className={({ isSelected }) =>
                    cx(
                        "bg-primary outline-focus-ring relative block cursor-pointer rounded-xl ring-inset focus-visible:outline-2 focus-visible:outline-offset-2",
                        isSelected ? "ring-brand ring-2" : "ring-secondary ring-1",
                    )
                }
            >
                {({ isSelected }) => (
                    <>
                        <div
                            className={cx(
                                "flex items-center gap-3 rounded-t-xl p-3 pe-5 ring-inset",
                                isSelected ? "ring-brand ring-2" : "ring-secondary ring-1",
                            )}
                        >
                            <FeaturedIcon color="gray" theme="modern" size="sm" icon={PLAN_ICONS[index]} />
                            <span className="text-md text-secondary me-1 font-semibold">{plan.label}</span>
                            <CheckboxBase isSelected={isSelected} className="ms-auto" />
                        </div>
                        <div className="flex flex-col gap-1 rounded-b-lg p-4">
                            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-1">
                                <p className="flex items-baseline gap-1">
                                    <span className="text-display-sm text-secondary font-semibold">{plan.price}</span>
                                    <span className="text-tertiary text-sm">per month</span>
                                </p>
                                {plan.badge && (
                                    <span className="text-secondary ring-primary flex size-max items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium whitespace-nowrap shadow-xs ring-1 ring-inset">
                                        <svg aria-hidden="true" className="text-utility-green-500" fill="currentColor" height="8" viewBox="0 0 8 8" width="8">
                                            <circle cx="4" cy="4" r="2.5" stroke="currentColor" />
                                        </svg>
                                        Limited time only
                                    </span>
                                )}
                            </div>
                            <AriaText slot="description" className="text-tertiary text-sm">
                                {plan.hint}
                            </AriaText>
                        </div>
                    </>
                )}
            </AriaRadio>
        ))}
    </RadioGroup>
);

const AVATAR_PLANS = [
    { avatar: AVATARS[0], role: "Product Manager, Integrations" },
    { avatar: AVATARS[1], role: "Frontend Developer, Payments" },
    { avatar: AVATARS[2], role: "Backend Developer, Payments" },
    { avatar: AVATARS[7], role: "Sales Manager, Enterprise" },
    { avatar: AVATARS[9], role: "Product Designer, Dashboard" },
] as const;

export const Avatar = () => (
    <RadioGroup aria-label="Users" defaultValue={AVATAR_PLANS[0].avatar.username} className="gap-3">
        {AVATAR_PLANS.map((person) => (
            <AriaRadio
                key={person.avatar.username}
                value={person.avatar.username}
                className={({ isSelected }) =>
                    cx(
                        "bg-primary outline-focus-ring relative flex cursor-pointer items-start gap-1 rounded-xl p-4 ring-inset focus-visible:outline-2 focus-visible:outline-offset-2",
                        isSelected ? "ring-brand ring-2" : "ring-secondary ring-1",
                    )
                }
            >
                {({ isSelected }) => (
                    <div className="flex flex-1 gap-3">
                        <AvatarPrimitive size="sm" src={person.avatar.src} alt={person.avatar.alt} />
                        <div className="flex flex-col">
                            <span className="flex gap-1">
                                <span className="text-secondary text-sm font-medium">{person.avatar.name}</span>
                                <span className="text-tertiary text-sm">{person.avatar.username}</span>
                            </span>
                            <AriaText slot="description" className="text-tertiary text-sm">
                                {person.role}
                            </AriaText>
                        </div>
                        <CheckboxBase isSelected={isSelected} className="ms-auto" />
                    </div>
                )}
            </AriaRadio>
        ))}
    </RadioGroup>
);

const PAYMENT_METHODS = [
    { value: "card-1", label: "Visa ending in 1234", icon: VisaIcon },
    { value: "card-2", label: "Mastercard ending in 1234", icon: MastercardIcon },
    { value: "card-3", label: "Visa ending in 1234", icon: VisaIcon },
    { value: "card-4", label: "Stripe (Visa ending 1234)", icon: StripeIcon },
    { value: "card-5", label: "PayPal (Visa ending 1234)", icon: PayPalIcon },
] as const;

export const PaymentIcon = () => (
    <RadioGroup aria-label="Payment options" className="gap-3">
        {PAYMENT_METHODS.map((method) => (
            <AriaRadio
                key={method.value}
                value={method.value}
                className={({ isSelected }) =>
                    cx(
                        "bg-primary outline-focus-ring relative flex cursor-pointer items-start gap-1 rounded-xl p-4 ring-inset focus-visible:outline-2 focus-visible:outline-offset-2",
                        isSelected ? "ring-brand ring-2" : "ring-secondary ring-1",
                    )
                }
            >
                {({ isSelected }) => (
                    <div className="flex flex-1 gap-3">
                        <span className="shrink-0">
                            <method.icon aria-hidden="true" className="h-6 w-8.5" />
                        </span>
                        <div className="flex flex-1 flex-col items-start">
                            <span className="flex flex-col">
                                <span className="text-secondary text-sm font-medium">{method.label}</span>
                                <AriaText slot="description" className="text-tertiary text-sm">
                                    Expiry 06/2028
                                </AriaText>
                            </span>
                            <div className="mt-2 flex gap-3">
                                <button
                                    type="button"
                                    className="text-tertiary hover:text-tertiary_hover text-sm font-semibold"
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    Set as default
                                </button>
                                <button
                                    type="button"
                                    className="text-brand-secondary hover:text-brand-secondary_hover text-sm font-semibold"
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                        <CheckboxBase isSelected={isSelected} className="ms-auto" />
                    </div>
                )}
            </AriaRadio>
        ))}
    </RadioGroup>
);

export const RadioButton = () => (
    <RadioGroup aria-label="Payment plans" defaultValue="basic" className="gap-3">
        {PLANS.map((plan) => (
            <AriaRadio
                key={plan.value}
                value={plan.value}
                className={({ isSelected }) =>
                    cx(
                        "bg-primary outline-focus-ring relative flex cursor-pointer gap-2 rounded-xl p-4 ring-inset focus-visible:outline-2 focus-visible:outline-offset-2",
                        isSelected ? "ring-brand ring-2" : "ring-secondary ring-1",
                    )
                }
            >
                {({ isSelected, isDisabled, isFocusVisible }) => (
                    <>
                        <RadioButtonBase isSelected={isSelected} isDisabled={isDisabled} isFocusVisible={isFocusVisible} className="mt-0.5" />
                        <div className="flex flex-col">
                            <span className="flex gap-1">
                                <span className="text-secondary text-sm font-medium">{plan.label}</span>
                                <span className="text-tertiary text-sm">{plan.price}</span>
                            </span>
                            <AriaText slot="description" className="text-tertiary text-sm">
                                {plan.hint}
                            </AriaText>
                        </div>
                    </>
                )}
            </AriaRadio>
        ))}
    </RadioGroup>
);

export const Checkbox = () => (
    <RadioGroup aria-label="Payment plans" defaultValue="basic" className="gap-3">
        {PLANS.map((plan) => (
            <AriaRadio
                key={plan.value}
                value={plan.value}
                className={({ isSelected }) =>
                    cx(
                        "bg-primary outline-focus-ring relative flex cursor-pointer items-start gap-2 rounded-xl p-4 ring-inset focus-visible:outline-2 focus-visible:outline-offset-2",
                        isSelected ? "ring-brand ring-2" : "ring-secondary ring-1",
                    )
                }
            >
                {({ isSelected }) => (
                    <>
                        <CheckboxBase isSelected={isSelected} className="mt-0.5" />
                        <div className="flex flex-col">
                            <span className="flex gap-1">
                                <span className="text-secondary text-sm font-medium">{plan.label}</span>
                                <span className="text-tertiary text-sm">{plan.price}</span>
                            </span>
                            <AriaText slot="description" className="text-tertiary text-sm">
                                {plan.hint}
                            </AriaText>
                        </div>
                    </>
                )}
            </AriaRadio>
        ))}
    </RadioGroup>
);
