"use client";

import { useState } from "react";
import { AlertCircle, Calendar, Check, CheckCircle, Copy01, Lock03, Mail01 } from "@properui/icons";
import { useClipboard } from "../../../hooks/use-clipboard";
import { cx } from "../../../utils/cx";
import { Button } from "../buttons/button";
import { NativeSelect } from "../select/select-native";
import { HintText } from "./hint-text";
import { Input, InputBase, TextField } from "./input";
import { InputDate } from "./input-date";
import { InputFile } from "./input-file";
import { InputGroup } from "./input-group";
import { InputNumber } from "./input-number";
import { PaymentInput as PaymentInputField } from "./input-payment";
import { InputTags } from "./input-tags";
import { InputTagsOuter } from "./input-tags-outer";
import { Label } from "./label";

/** Hero example shown at the top of the docs page. */
export const InputExample = () => {
    return (
        <Input
            isRequired
            icon={Mail01}
            label="Email"
            hint="This is a hint text to help user."
            placeholder="olivia@proper.example"
            tooltip="This is a tooltip"
        />
    );
};

export const Default = () => {
    return <Input isRequired label="Email" hint="This is a hint text to help user." placeholder="olivia@proper.example" tooltip="This is a tooltip" />;
};

export const Disabled = () => {
    return (
        <Input isRequired isDisabled label="Email" hint="This is a hint text to help user." placeholder="olivia@proper.example" tooltip="This is a tooltip" />
    );
};

export const Invalid = () => {
    return <Input isRequired isInvalid label="Email" hint="This is an error message." placeholder="olivia@proper.example" tooltip="This is a tooltip" />;
};

export const Sizes = () => {
    return (
        <div className="flex flex-col gap-8">
            <Input
                isRequired
                size="sm"
                label="Email"
                hint="This is a hint text to help user."
                placeholder="olivia@proper.example"
                tooltip="This is a tooltip"
            />
            <Input
                isRequired
                size="md"
                label="Email"
                hint="This is a hint text to help user."
                placeholder="olivia@proper.example"
                tooltip="This is a tooltip"
            />
            <Input
                isRequired
                size="lg"
                label="Email"
                hint="This is a hint text to help user."
                placeholder="olivia@proper.example"
                tooltip="This is a tooltip"
            />
        </div>
    );
};

export const LeadingIcon = () => {
    return (
        <Input
            isRequired
            icon={Mail01}
            label="Email"
            hint="This is a hint text to help user."
            placeholder="olivia@proper.example"
            tooltip="This is a tooltip"
        />
    );
};

export const LeadingDropdown = () => {
    return (
        <InputGroup
            isRequired
            label="Phone number"
            hint="This is a hint text to help user."
            leadingAddon={
                <NativeSelect
                    aria-label="Country"
                    options={[
                        { value: "US", label: "US" },
                        { value: "CA", label: "CA" },
                        { value: "EU", label: "EU" },
                    ]}
                />
            }
        >
            <InputBase type="tel" placeholder="+1 (555) 000-0000" tooltip="This is a tooltip" />
        </InputGroup>
    );
};

export const TrailingDropdown = () => {
    return (
        <InputGroup
            isRequired
            prefix="$"
            label="Sale amount"
            hint="This is a hint text to help user."
            trailingAddon={
                <NativeSelect
                    aria-label="Currency"
                    options={[
                        { value: "USD", label: "USD" },
                        { value: "CAD", label: "CAD" },
                        { value: "EUR", label: "EUR" },
                    ]}
                />
            }
        >
            <InputBase type="tel" placeholder="1,000.00" tooltip="This is a tooltip" />
        </InputGroup>
    );
};

export const LeadingText = () => {
    return (
        <InputGroup isRequired label="Website" hint="This is a hint text to help user." leadingAddon={<InputGroup.Prefix>https://</InputGroup.Prefix>}>
            <InputBase placeholder="www.proper.example" tooltip="This is a tooltip" />
        </InputGroup>
    );
};

export const PaymentInput = () => {
    return (
        <PaymentInputField
            isRequired
            label="Card number"
            placeholder="0000 0000 0000 0000"
            hint="This is a hint text to help user."
            tooltip="This is a tooltip"
        />
    );
};

export const TrailingButton = () => {
    const { copy, copied } = useClipboard();
    const [value, setValue] = useState("");

    return (
        <InputGroup
            isRequired
            label="Website"
            hint="This is a hint text to help user."
            onChange={setValue}
            trailingAddon={
                <Button color="secondary" iconLeading={copied ? Check : Copy01} onClick={() => copy(value || "www.proper.example")}>
                    Copy
                </Button>
            }
        >
            <InputBase placeholder="www.proper.example" tooltip="This is a tooltip" />
        </InputGroup>
    );
};

export const FileUpload = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (files: FileList | null) => {
        if (!files || files.length === 0) return;
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 3000);
    };

    return <InputFile isRequired size="sm" label="Upload file" hint="SVG, PNG, JPG or GIF (max. 800x400px)." onChange={handleChange} isLoading={isLoading} />;
};

export const PasswordInput = () => {
    const [password, setPassword] = useState("");

    return (
        <TextField isRequired minLength={8} name="password" autoComplete="new-password" onChange={setPassword}>
            <Label>Password</Label>
            <InputBase icon={Lock03} type="password" placeholder="••••••••••••" />
            <HintText className="flex items-center gap-1">
                <CheckCircle
                    className={cx(
                        "text-fg-quaternary size-4 stroke-[2.25px] transition duration-100 ease-linear in-invalid:hidden",
                        password.length >= 8 && "text-fg-success-primary",
                    )}
                />
                <AlertCircle className="text-fg-error-secondary hidden size-4 stroke-[2.25px] in-invalid:inline-block" />
                Must be at least 8 characters.
            </HintText>
        </TextField>
    );
};

export const DateInput = () => {
    return (
        <InputDate
            isRequired
            label="Date"
            hint="This is a hint text to help user."
            placeholder="Select a date"
            tooltip="This is a tooltip"
            granularity="minute"
            icon={Calendar}
        />
    );
};

export const NumberInputHorizontal = () => {
    return <InputNumber isRequired orientation="horizontal" label="Number" hint="This is a hint text to help user." placeholder="100" />;
};

export const NumberInputVertical = () => {
    return <InputNumber isRequired label="Number" hint="This is a hint text to help user." placeholder="100" />;
};

export const TagInput = () => {
    return (
        <InputTags
            isRequired
            label="Tags"
            hint="This is a hint text to help user."
            tooltip="This is a tooltip."
            placeholder="Type and press Enter"
            defaultValue={["Design", "Engineering"]}
        />
    );
};

export const TagInputOuter = () => {
    return (
        <InputTagsOuter
            isRequired
            label="Tags"
            hint="This is a hint text to help user."
            tooltip="This is a tooltip."
            placeholder="Add tag"
            defaultValue={["Design", "Marketing"]}
        />
    );
};
