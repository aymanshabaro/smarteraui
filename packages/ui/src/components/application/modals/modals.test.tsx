import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Button } from "@/components/base/buttons/button";
import { Dialog, DialogTrigger, Modal, ModalOverlay } from "./modal";
import { ModalFooter, ModalPanel } from "./modal-parts";
import * as Demos from "./modals.demo";

describe("Modals", () => {
    for (const [name, Demo] of Object.entries(Demos)) {
        it(`${name} has no a11y violations`, async () => {
            const { container } = render(<Demo />);
            expect(await axe(container)).toHaveNoViolations();
        });
    }

    it("renders the dialog when the trigger is open", () => {
        render(
            <DialogTrigger defaultOpen>
                <Button>Open</Button>
                <ModalOverlay>
                    <Modal>
                        <Dialog aria-label="Delete project">
                            <p>Are you sure?</p>
                        </Dialog>
                    </Modal>
                </ModalOverlay>
            </DialogTrigger>,
        );

        expect(screen.getByRole("dialog", { name: "Delete project" })).toBeInTheDocument();
    });

    it("keeps the dialog out of the DOM while it is closed", () => {
        render(
            <DialogTrigger>
                <Button>Open</Button>
                <ModalOverlay>
                    <Modal>
                        <Dialog aria-label="Delete project">
                            <p>Are you sure?</p>
                        </Dialog>
                    </Modal>
                </ModalOverlay>
            </DialogTrigger>,
        );

        expect(screen.queryByRole("dialog")).toBeNull();
    });

    it("applies the width preset and the footer alignment to the panel", () => {
        const { container } = render(
            <ModalPanel width="lg">
                <ModalFooter align="end">
                    <Button>Done</Button>
                </ModalFooter>
            </ModalPanel>,
        );

        const panel = container.firstElementChild as HTMLElement;
        expect(panel.className).toContain("max-w-150");
        expect(panel.firstElementChild?.className).toContain("sm:justify-end");
    });

    it("labels the close button in the modal header", () => {
        render(<Demos.StackedLeftAligned />);
        expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
    });

    it("renders the destructive action for the delete modal", () => {
        render(<Demos.DestructiveStackedLeftAligned />);
        expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
    });
});
