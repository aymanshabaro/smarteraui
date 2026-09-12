"use client";

import { DescriptionList } from "./description-list";

export const DescriptionListExample = () => (
    <DescriptionList className="w-full max-w-md">
        <DescriptionList.Item>
            <DescriptionList.Term>Full name</DescriptionList.Term>
            <DescriptionList.Details>Jane Doe</DescriptionList.Details>
        </DescriptionList.Item>
        <DescriptionList.Item>
            <DescriptionList.Term>Email address</DescriptionList.Term>
            <DescriptionList.Details>jane.doe@example.com</DescriptionList.Details>
        </DescriptionList.Item>
        <DescriptionList.Item>
            <DescriptionList.Term>Role</DescriptionList.Term>
            <DescriptionList.Details>Workspace admin</DescriptionList.Details>
        </DescriptionList.Item>
    </DescriptionList>
);

export const Horizontal = () => (
    <DescriptionList layout="horizontal" dividers className="w-full max-w-lg">
        <DescriptionList.Item>
            <DescriptionList.Term>Plan</DescriptionList.Term>
            <DescriptionList.Details>Scale, billed annually</DescriptionList.Details>
        </DescriptionList.Item>
        <DescriptionList.Item>
            <DescriptionList.Term>Seats</DescriptionList.Term>
            <DescriptionList.Details>24 of 30 used</DescriptionList.Details>
        </DescriptionList.Item>
        <DescriptionList.Item>
            <DescriptionList.Term>Next invoice</DescriptionList.Term>
            <DescriptionList.Details>September 30, 2026</DescriptionList.Details>
        </DescriptionList.Item>
    </DescriptionList>
);

export const Stacked = () => (
    <DescriptionList layout="stacked" dividers className="w-full max-w-md">
        <DescriptionList.Item>
            <DescriptionList.Term>Shipping address</DescriptionList.Term>
            <DescriptionList.Details>1 Market Street, San Francisco, CA 94105</DescriptionList.Details>
        </DescriptionList.Item>
        <DescriptionList.Item>
            <DescriptionList.Term>Payment method</DescriptionList.Term>
            <DescriptionList.Details>Visa ending in 4242</DescriptionList.Details>
        </DescriptionList.Item>
    </DescriptionList>
);
