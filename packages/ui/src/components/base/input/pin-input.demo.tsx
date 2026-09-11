"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { PinInput } from "./pin-input";

/** Hero example shown at the top of the docs page. */
export const VerificationCodeInputExample = () => {
    return (
        <PinInput size="sm">
            <PinInput.Label>Secure code</PinInput.Label>
            <PinInput.Group maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
                <PinInput.Slot index={0} />
                <PinInput.Slot index={1} />
                <PinInput.Slot index={2} />
                <PinInput.Separator />
                <PinInput.Slot index={3} />
                <PinInput.Slot index={4} />
                <PinInput.Slot index={5} />
            </PinInput.Group>
            <PinInput.Description>This is a hint text to help user.</PinInput.Description>
        </PinInput>
    );
};

export const FourDigits = () => {
    return (
        <PinInput>
            <PinInput.Label>Secure code</PinInput.Label>
            <PinInput.Group maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
                <PinInput.Slot index={0} />
                <PinInput.Slot index={1} />
                <PinInput.Slot index={2} />
                <PinInput.Slot index={3} />
            </PinInput.Group>
            <PinInput.Description>This is a hint text to help user.</PinInput.Description>
        </PinInput>
    );
};

export const WithSeparator = () => {
    return (
        <PinInput size="md">
            <PinInput.Label>Secure code</PinInput.Label>
            <PinInput.Group maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
                <PinInput.Slot index={0} />
                <PinInput.Slot index={1} />
                <PinInput.Slot index={2} />
                <PinInput.Separator />
                <PinInput.Slot index={3} />
                <PinInput.Slot index={4} />
                <PinInput.Slot index={5} />
            </PinInput.Group>
            <PinInput.Description>This is a hint text to help user.</PinInput.Description>
        </PinInput>
    );
};

export const InputOTP = () => {
    return (
        <div className="flex flex-col gap-8">
            {/* Small */}
            <PinInput size="xxxs">
                <PinInput.Label isRequired>Verification code</PinInput.Label>
                <PinInput.Group maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
                    <PinInput.Slot index={0} />
                    <PinInput.Slot index={1} />
                    <PinInput.Slot index={2} />
                    <PinInput.Slot index={3} />
                </PinInput.Group>
                <PinInput.Description>This is a hint text to help user.</PinInput.Description>
            </PinInput>

            {/* Medium */}
            <PinInput size="xxs">
                <PinInput.Label isRequired>Verification code</PinInput.Label>
                <PinInput.Group maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
                    <PinInput.Slot index={0} />
                    <PinInput.Slot index={1} />
                    <PinInput.Slot index={2} />
                    <PinInput.Slot index={3} />
                </PinInput.Group>
                <PinInput.Description>This is a hint text to help user.</PinInput.Description>
            </PinInput>

            {/* Large */}
            <PinInput size="xs">
                <PinInput.Label isRequired>Verification code</PinInput.Label>
                <PinInput.Group maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
                    <PinInput.Slot index={0} />
                    <PinInput.Slot index={1} />
                    <PinInput.Slot index={2} />
                    <PinInput.Slot index={3} />
                </PinInput.Group>
                <PinInput.Description>This is a hint text to help user.</PinInput.Description>
            </PinInput>
        </div>
    );
};

export const Disabled = () => {
    return (
        <PinInput disabled>
            <PinInput.Label>Secure code</PinInput.Label>
            <PinInput.Group maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
                <PinInput.Slot index={0} />
                <PinInput.Slot index={1} />
                <PinInput.Slot index={2} />
                <PinInput.Slot index={3} />
            </PinInput.Group>
            <PinInput.Description>This is a hint text to help user.</PinInput.Description>
        </PinInput>
    );
};

export const Sizes = () => {
    return (
        <div className="flex flex-col gap-8">
            <PinInput size="sm">
                <PinInput.Label>Secure code</PinInput.Label>
                <PinInput.Group maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
                    <PinInput.Slot index={0} />
                    <PinInput.Slot index={1} />
                    <PinInput.Slot index={2} />
                    <PinInput.Slot index={3} />
                </PinInput.Group>
                <PinInput.Description>This is a hint text to help user.</PinInput.Description>
            </PinInput>

            <PinInput size="md">
                <PinInput.Label>Secure code</PinInput.Label>
                <PinInput.Group maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
                    <PinInput.Slot index={0} />
                    <PinInput.Slot index={1} />
                    <PinInput.Slot index={2} />
                    <PinInput.Slot index={3} />
                </PinInput.Group>
                <PinInput.Description>This is a hint text to help user.</PinInput.Description>
            </PinInput>

            <PinInput size="lg">
                <PinInput.Label>Secure code</PinInput.Label>
                <PinInput.Group maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
                    <PinInput.Slot index={0} />
                    <PinInput.Slot index={1} />
                    <PinInput.Slot index={2} />
                    <PinInput.Slot index={3} />
                </PinInput.Group>
                <PinInput.Description>This is a hint text to help user.</PinInput.Description>
            </PinInput>
        </div>
    );
};
