"use client";

import { useEffect, useRef } from "react";
import { CopyButton } from "./copy-button";
import { EXAMPLE_PROMPT, type GuideKey, SETUP_GUIDES } from "./setup-guides";

type SetupDialogProps = {
    guideKey: GuideKey;
    /**
     * Bumped on every "View step-by-step setup" click, including re-clicking the platform whose
     * guide is already loaded. A plain `guideKey` prop isn't enough to trigger a re-open: if the
     * dialog was closed (Escape, backdrop click, the × button) and the user clicks the *same*
     * platform's trigger again, `guideKey` doesn't change value, so an effect keyed on it alone
     * would never fire `showModal()` again. Keying the effect on this ever-incrementing counter
     * instead makes every click open the dialog, matching the supplied `script.js`'s unconditional
     * `setupDialog.showModal()` on every `[data-guide]` click.
     */
    openToken: number;
};

/**
 * Ports the supplied page's `<dialog id="setup-dialog">`: a single native `<dialog>` element
 * whose content is swapped for whichever platform's "View step-by-step setup" button was
 * pressed. Native `<dialog>` gives Escape-to-close, a focus trap, and the `::backdrop` styling
 * in `landing.css` for free — see `agent-platforms.tsx` for the trigger buttons.
 */
export function SetupDialog({ guideKey, openToken }: SetupDialogProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (openToken === 0) return; // initial render: nothing has been clicked yet
        const dialog = dialogRef.current;
        if (dialog && !dialog.open) dialog.showModal();
    }, [openToken]);

    const guide = SETUP_GUIDES[guideKey];

    return (
        // Click-outside-to-close, same as the supplied `script.js`: a click that lands on the
        // <dialog> element itself (not one of its children) hit the backdrop area, so close it.
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <dialog
            ref={dialogRef}
            className="setup-dialog"
            aria-labelledby="setup-title"
            onClick={(event) => {
                if (event.target === dialogRef.current) dialogRef.current?.close();
            }}
        >
            <button className="dialog-close" type="button" aria-label="Close setup guide" onClick={() => dialogRef.current?.close()}>
                ×
            </button>
            <div className="dialog-platform">
                <span className="platform-mark">
                    <img src={guide.logo} alt="" />
                </span>
                <div>
                    <small>{guide.name} setup</small>
                    <strong>{guide.name}</strong>
                </div>
            </div>
            <h2 id="setup-title">{guide.title}</h2>
            <p>{guide.intro}</p>
            <ol className="dialog-steps">
                {guide.steps.map((step) => (
                    <li key={step.title}>
                        <div>
                            <strong>{step.title}</strong>
                            <span>{step.description}</span>
                        </div>
                    </li>
                ))}
            </ol>
            <div className="dialog-copy-block">
                <span>{guide.copyLabel}</span>
                <div className="command">
                    <code>{guide.copyValue}</code>
                    <CopyButton value={guide.copyValue}>Copy</CopyButton>
                </div>
            </div>
            <div className="dialog-prompt">
                <span>Then ask your agent</span>
                <p>{EXAMPLE_PROMPT}</p>
                <CopyButton value={EXAMPLE_PROMPT} successLabel="Prompt copied">
                    Copy example prompt
                </CopyButton>
            </div>
        </dialog>
    );
}
