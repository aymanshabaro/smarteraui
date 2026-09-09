"use client";

import { TextArea } from "@/components/base/textarea/textarea";

/** Hero example shown at the top of the docs page. */
export const TextareaExample = () => {
    return <TextArea isRequired placeholder="This is a placeholder." label="Description" hint="This is a hint text to help user." rows={5} />;
};

export const Default = () => {
    return <TextArea isRequired placeholder="This is a placeholder." label="Description" hint="This is a hint text to help user." rows={5} />;
};

export const Disabled = () => {
    return <TextArea isRequired isDisabled placeholder="This is a placeholder." label="Description" hint="This is a hint text to help user." rows={5} />;
};

export const Invalid = () => {
    return <TextArea isRequired isInvalid placeholder="This is a placeholder." label="Description" hint="This is an error message." rows={5} />;
};
