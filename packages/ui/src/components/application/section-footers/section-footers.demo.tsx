"use client";

import type { ReactNode } from "react";
import { ButtonGroup, ButtonGroupItem } from "../../base/button-group/button-group";
import { Button } from "../../base/buttons/button";
// Aliased so the demo exports can use the example names from the spec (one of them is `SectionFooter`).
import { SectionFooter as Footer } from "./section-footers";

/** Matches the width the docs preview gives every section footer. Demo-only, not exported. */
const Wrapper = ({ children }: { children: ReactNode }) => <div className="w-full max-w-3xl">{children}</div>;

/** Section content above the footer so the rule reads as a divider. Demo-only, not exported. */
const SectionBody = () => (
    <div className="mb-5 flex flex-col gap-1">
        <h2 className="text-primary text-lg font-semibold">Team settings</h2>
        <p className="text-tertiary text-sm">Update how your team is billed and who can invite new members.</p>
    </div>
);

/** Card body above a card footer. Demo-only, not exported. */
const CardBody = () => (
    <div className="flex flex-col gap-1 px-4 py-5 md:px-6">
        <h2 className="text-primary text-lg font-semibold">Team settings</h2>
        <p className="text-tertiary text-sm">Update how your team is billed and who can invite new members.</p>
    </div>
);

/** Card shell for the two card-footer examples. Demo-only, not exported. */
const Card = ({ children }: { children: ReactNode }) => (
    <div className="bg-primary ring-secondary overflow-hidden rounded-xl shadow-sm ring-1 ring-inset">
        <CardBody />
        {children}
    </div>
);

/** Period filter shown on the start side of the row. Demo-only, not exported. */
const PeriodButtonGroup = () => (
    <ButtonGroup selectedKeys={["30-days"]}>
        <ButtonGroupItem id="12-months">12 months</ButtonGroupItem>
        <ButtonGroupItem id="30-days">30 days</ButtonGroupItem>
        <ButtonGroupItem id="7-days">7 days</ButtonGroupItem>
    </ButtonGroup>
);

/** Cancel plus a primary confirm — the canonical footer action pair. Demo-only, not exported. */
const FooterActions = () => (
    <>
        <Button color="secondary" size="md">
            Cancel
        </Button>
        <Button color="primary" size="md">
            Save changes
        </Button>
    </>
);

export const SectionFooterExample = () => (
    <Wrapper>
        <SectionBody />
        <Footer contentLeading={<PeriodButtonGroup />}>
            <Button color="tertiary" size="md">
                Cancel
            </Button>
            <Button color="secondary" size="md">
                Save draft
            </Button>
            <Button color="primary" size="md">
                Publish
            </Button>
        </Footer>
    </Wrapper>
);

export const SectionFooterButtonGroup = () => (
    <Wrapper>
        <SectionBody />
        <Footer contentLeading={<PeriodButtonGroup />}>
            <FooterActions />
        </Footer>
    </Wrapper>
);

export const SectionFooter = () => (
    <Wrapper>
        <SectionBody />
        <Footer>
            <FooterActions />
        </Footer>
    </Wrapper>
);

export const SectionFooterCardButtonGroup = () => (
    <Wrapper>
        <Card>
            <Footer type="card" contentLeading={<PeriodButtonGroup />}>
                <FooterActions />
            </Footer>
        </Card>
    </Wrapper>
);

export const SectionFooterCard = () => (
    <Wrapper>
        <Card>
            <Footer type="card">
                <FooterActions />
            </Footer>
        </Card>
    </Wrapper>
);
