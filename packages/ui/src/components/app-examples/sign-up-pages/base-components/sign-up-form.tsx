"use client";

// TODO(orchestrator): candidate for components/internal — the log in / forgot password page
// examples build the same credential form from the same primitives.
import { CheckCircle } from "@properui/icons";
import { cx } from "../../../../utils/cx";
import { Button } from "../../../base/buttons/button";
import { SocialButton } from "../../../base/buttons/social-button";
import { Form } from "../../../base/form/form";
import { Input } from "../../../base/input/input";

/** The two rules the reference sign up pages enforce on a new password. */
const passwordRules = ["Must be at least 8 characters", "Must contain one special character"];

/** A single unmet password rule: a neutral filled circle with a white tick. */
const PasswordRule = ({ children }: { children: string }) => (
    <span className="flex gap-2">
        <span aria-hidden="true" className="bg-utility-neutral-300 text-fg-white flex size-5 items-center justify-center rounded-full">
            <svg viewBox="0 0 10 8" fill="none" className="size-2.5">
                <path d="M8.33333 1.5L3.74999 6.08333L1.66666 4" stroke="currentColor" strokeWidth="1.6666" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </span>
        <span className="text-tertiary text-sm">{children}</span>
    </span>
);

/** The inline "Must be at least 8 characters." hint rendered under the password field. */
export const passwordHintText = (
    <span className="flex items-center gap-1">
        <CheckCircle aria-hidden="true" className="text-fg-quaternary size-4 stroke-[2.25px]" />
        Must be at least 8 characters.
    </span>
);

export interface SignUpFormProps {
    /**
     * Whether the fields carry a visible label. Unlabelled fields fall back to the
     * placeholder as their accessible name.
     *
     * @default true
     */
    hasLabels?: boolean;
    /**
     * What is rendered below the password field.
     *
     * @default "hint"
     */
    passwordHint?: "hint" | "checklist" | "none";
    /**
     * The password field's placeholder.
     *
     * @default "Create a password"
     */
    passwordPlaceholder?: string;
    /**
     * Whether a "Sign up with Google" button follows the submit button.
     *
     * @default true
     */
    hasGoogle?: boolean;
    /**
     * The submit button's label.
     *
     * @default "Get started"
     */
    submitLabel?: string;
    /** The class name applied to the form element. */
    className?: string;
}

/**
 * The name / email / password form shared by nearly every sign up page example.
 * It is presentational — submitting it does nothing.
 */
export const SignUpForm = ({
    hasLabels = true,
    passwordHint = "hint",
    passwordPlaceholder = "Create a password",
    hasGoogle = true,
    submitLabel = "Get started",
    className,
}: SignUpFormProps) => (
    <Form className={cx("flex flex-col gap-6", className)}>
        <div className="flex flex-col gap-5">
            <Input isRequired size="lg" name="name" type="text" label={hasLabels ? "Name" : undefined} placeholder="Enter your name" />
            <Input isRequired size="lg" name="email" type="email" label={hasLabels ? "Email" : undefined} placeholder="Enter your email" />
            <Input
                isRequired
                size="lg"
                minLength={8}
                name="password"
                type="password"
                label={hasLabels ? "Password" : undefined}
                placeholder={passwordPlaceholder}
                hint={passwordHint === "hint" ? passwordHintText : undefined}
                inputClassName={passwordPlaceholder.startsWith("•") ? "placeholder:text-placeholder/50" : undefined}
            />

            {passwordHint === "checklist" && (
                <div className="flex flex-col gap-3">
                    {passwordRules.map((rule) => (
                        <PasswordRule key={rule}>{rule}</PasswordRule>
                    ))}
                </div>
            )}
        </div>

        <div className="flex flex-col gap-4">
            <Button type="submit" size="lg">
                {submitLabel}
            </Button>
            {hasGoogle && (
                <SocialButton social="google" size="lg">
                    Sign up with Google
                </SocialButton>
            )}
        </div>
    </Form>
);

export interface SetPasswordFormProps {
    /**
     * Whether the first field carries the "Must be at least 8 characters." hint.
     *
     * @default false
     */
    hasHint?: boolean;
    /** The class name applied to the form element. */
    className?: string;
}

/**
 * The "choose a password" step of the multi-step sign up flows: a new password and its
 * confirmation, followed by a single Continue button.
 */
export const SetPasswordForm = ({ hasHint = false, className }: SetPasswordFormProps) => (
    <Form className={cx("flex flex-col gap-6", className)}>
        <div className="flex flex-col gap-5">
            <Input
                isRequired
                size="lg"
                minLength={8}
                name="password"
                type="password"
                aria-label="Password"
                placeholder="Create a password"
                hint={hasHint ? passwordHintText : undefined}
            />
            <Input isRequired size="lg" name="password_confirm" type="password" aria-label="Confirm password" placeholder="Confirm password" />
        </div>

        <div className="flex flex-col gap-4">
            <Button type="submit" size="lg">
                Continue
            </Button>
        </div>
    </Form>
);
