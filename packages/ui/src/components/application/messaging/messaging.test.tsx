import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Message, MessageList } from "./messaging";
import * as Demos from "./messaging.demo";

describe("Messaging", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders every message as a list item of a labelled conversation", () => {
        const { getByRole, getAllByRole } = render(<Demos.MessagingExample />);

        expect(getByRole("list", { name: "Conversation with the design team" })).toBeTruthy();
        // Six messages plus the "Today" divider.
        expect(getAllByRole("listitem")).toHaveLength(7);
    });

    it("aligns outgoing messages to the end and drops their avatar", () => {
        const { container } = render(
            <MessageList>
                <Message direction="outgoing" name="You" time="Friday 2:20pm">
                    <Message.Bubble>Sure thing.</Message.Bubble>
                </Message>
            </MessageList>,
        );

        expect(container.querySelector("li")?.className).toContain("self-end");
        expect(container.querySelector("[data-avatar]")).toBeNull();
        expect(container.querySelector("li > article > div")?.className).toContain("rounded-se-none");
    });

    it("notches the bubble on the start side for incoming messages", () => {
        const { container } = render(
            <MessageList>
                <Message name="Phoenix Baker" time="Friday 2:20pm">
                    <Message.Bubble>Hey there.</Message.Bubble>
                </Message>
            </MessageList>,
        );

        expect(container.querySelector("li > article > div")?.className).toContain("rounded-ss-none");
    });

    it("exposes the timestamp as a machine readable time element", () => {
        const { container } = render(
            <MessageList>
                <Message name="Phoenix Baker" time="Friday 2:20pm" dateTime="2027-01-22T14:20">
                    <Message.Bubble>Hey there.</Message.Bubble>
                </Message>
            </MessageList>,
        );

        expect(container.querySelector("time")?.getAttribute("datetime")).toBe("2027-01-22T14:20");
    });

    it("labels the delivery indicator", () => {
        const { getByRole } = render(
            <MessageList>
                <Message direction="outgoing" name="You" time="Friday 2:20pm" delivery="failed">
                    <Message.Bubble>Hey there.</Message.Bubble>
                </Message>
            </MessageList>,
        );

        expect(getByRole("img", { name: "Not delivered" })).toBeTruthy();
    });

    it("renders one labelled button per message action", () => {
        const { getAllByRole } = render(<Demos.MessageSimple />);

        expect(getAllByRole("button", { name: "Generate with AI" })).toHaveLength(1);
        expect(getAllByRole("button", { name: "Copy" })).toHaveLength(1);
    });

    it("hides the reaction count when only one person reacted", () => {
        const { getByRole, queryByText } = render(<Demos.MessageReactions />);

        expect(getByRole("img", { name: "Red heart" })).toBeTruthy();
        expect(queryByText("1")).toBeNull();
        expect(queryByText("2")).toBeTruthy();
    });

    it("announces the typing indicator", () => {
        const { getByRole } = render(<Demos.MessageWriting />);

        expect(getByRole("status").textContent).toContain("is typing");
    });

    it("gives the minimal composer a labelled field and send button", () => {
        const { getByRole } = render(<Demos.MessageActionMinimal />);

        expect(getByRole("textbox", { name: "Message" })).toBeTruthy();
        expect(getByRole("button", { name: "Send" })).toBeTruthy();
    });

    it("renders the advanced composer footer tools as labelled buttons", () => {
        const { getByRole } = render(<Demos.MessageActionAdvanced />);

        expect(getByRole("button", { name: "Shortcuts" })).toBeTruthy();
        expect(getByRole("button", { name: "Attach" })).toBeTruthy();
        expect(getByRole("textbox", { name: "Message" })).toBeTruthy();
    });
});
