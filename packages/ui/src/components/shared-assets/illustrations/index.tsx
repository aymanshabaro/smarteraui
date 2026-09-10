"use client";

import type { HTMLAttributes, ReactElement } from "react";
import { BoxIllustration } from "./box";
import { CloudIllustration } from "./cloud";
import { CreditCardIllustration } from "./credit-card";
import { DocumentsIllustration } from "./documents";

const types = {
    box: BoxIllustration,
    cloud: CloudIllustration,
    documents: DocumentsIllustration,
    "credit-card": CreditCardIllustration,
};

export interface IllustrationProps extends HTMLAttributes<HTMLDivElement> {
    size?: "sm" | "md" | "lg";
    svgClassName?: string;
    childrenClassName?: string;
}

// `type` is spelled out as a literal union (instead of `keyof typeof types`) and the return type
// is explicit, so declaration emit never needs to describe `types` itself — each concrete
// illustration module declares its own private, unexported `IllustrationProps`, which TS cannot
// name in a `.d.ts` (TS4023) otherwise. Keep the union in sync with `types`'s keys.
export const Illustration = (props: IllustrationProps & { type: "box" | "cloud" | "documents" | "credit-card" }): ReactElement => {
    const { type } = props;

    const Component = types[type];

    return <Component {...props} />;
};
