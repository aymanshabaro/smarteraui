import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { Button } from "../../base/buttons/button";
import { Dialog, DialogTrigger, Modal, ModalOverlay } from "./modal";
import { ModalFooter, ModalHeader, ModalPanel } from "./modal-parts";
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

    it("closes the dialog when the header close button is clicked", () => {
        render(
            <DialogTrigger defaultOpen>
                <Button>Open</Button>
                <ModalOverlay>
                    <Modal>
                        <Dialog aria-label="Delete project">
                            <ModalHeader title="Delete project" description="Are you sure?" />
                            <ModalFooter>
                                <Button>Cancel</Button>
                            </ModalFooter>
                        </Dialog>
                    </Modal>
                </ModalOverlay>
            </DialogTrigger>,
        );

        expect(screen.getByRole("dialog", { name: "Delete project" })).toBeInTheDocument();
        fireEvent.click(screen.getByRole("button", { name: "Close" }));
        expect(screen.queryByRole("dialog")).toBeNull();
    });

    it("forwards `closeLabel` and `onClose` to the header close button", () => {
        const onClose = vi.fn();
        render(
            <ModalPanel>
                <Dialog aria-label="Archive project">
                    <ModalHeader title="Archive project" closeLabel="Dismiss" onClose={onClose} />
                </Dialog>
            </ModalPanel>,
        );

        const closeButton = screen.getByRole("button", { name: "Dismiss" });
        fireEvent.click(closeButton);
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
