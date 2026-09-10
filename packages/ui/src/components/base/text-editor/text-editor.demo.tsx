"use client";

import { TextEditor } from "./text-editor";

const paragraphs = [
    "Proper UI ships every component as readable source that you can paste straight into your own repository. Nothing is hidden behind a runtime, so the markup you review in the documentation is exactly the markup that renders in production, right down to the last utility class.",
    "Each component is built on React Aria primitives, styled with semantic Tailwind tokens, and verified against the same accessibility checks in both light and dark mode before it ever ships.",
    "That means you can restyle a button, swap the brand ramp, or fork an entire section without fighting a wrapper library. Read the code, keep the parts you need, and delete the rest — the design system is yours from the moment you install it, and every example on this page is a real component that you can copy today.",
];

/** Paragraphs separated by empty ones, which is what the editing commands produce. */
const sampleContent = paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("<p><br></p>");

const selectionSampleContent =
    "<p>Select any run of text inside this editor and a formatting toolbar appears directly above it, anchored to the selection so the controls stay within reach of the caret.</p>";

/** The hint counts down from this against the plain-text length of `sampleContent`. */
const characterBudget = 1744;

const CompactToolbar = () => (
    <TextEditor.Toolbar>
        <TextEditor.Group aria-label="Formatting">
            <TextEditor.Bold />
            <TextEditor.Italic />
            <TextEditor.Underline />
            <TextEditor.Separator />
            <TextEditor.TextColor />
            <TextEditor.Separator />
            <TextEditor.AlignLeft />
            <TextEditor.AlignCenter />
            <TextEditor.BulletList />
        </TextEditor.Group>
    </TextEditor.Toolbar>
);

const FullToolbarGroup = () => (
    <TextEditor.Group aria-label="Formatting">
        <TextEditor.Bold />
        <TextEditor.Italic />
        <TextEditor.Underline />
        <TextEditor.Separator />
        <TextEditor.TextColor />
        <TextEditor.Separator />
        <TextEditor.AlignLeft />
        <TextEditor.AlignCenter />
        <TextEditor.BulletList />
        <TextEditor.Separator />
        <TextEditor.Link />
        <TextEditor.Image />
        <TextEditor.Separator />
        <TextEditor.Generate />
    </TextEditor.Group>
);

export const TextEditorExample = () => (
    <div className="mx-auto w-full max-w-128">
        <TextEditor aria-label="Note" placeholder="Write something...">
            <CompactToolbar />
            <TextEditor.Content className="h-37.5" />
        </TextEditor>
    </div>
);

export const DefaultSm = () => (
    <div className="mx-auto w-full max-w-lg">
        <TextEditor size="sm" aria-label="Article body" defaultValue={sampleContent} maxLength={characterBudget}>
            <CompactToolbar />
            <TextEditor.Content className="h-87" />
            <TextEditor.Hint />
        </TextEditor>
    </div>
);

export const DefaultMd = () => (
    <div className="mx-auto w-full max-w-180">
        <TextEditor aria-label="Article body" defaultValue={sampleContent} maxLength={characterBudget}>
            <TextEditor.Toolbar>
                <TextEditor.Group aria-label="Typography">
                    <TextEditor.FontFamily />
                    <TextEditor.FontSize />
                </TextEditor.Group>
                <FullToolbarGroup />
            </TextEditor.Toolbar>
            <TextEditor.Content className="h-108" />
            <TextEditor.Hint />
        </TextEditor>
    </div>
);

export const FloatingToolbarSm = () => (
    <div className="mx-auto w-full max-w-lg">
        <TextEditor size="sm" aria-label="Article body" defaultValue={sampleContent} maxLength={characterBudget}>
            <TextEditor.Toolbar isFloating>
                <TextEditor.Group aria-label="Formatting">
                    <TextEditor.Bold />
                    <TextEditor.Italic />
                    <TextEditor.Underline />
                    <TextEditor.Separator />
                    <TextEditor.TextColor />
                    <TextEditor.Separator />
                    <TextEditor.AlignLeft />
                    <TextEditor.AlignCenter />
                    <TextEditor.BulletList />
                </TextEditor.Group>
            </TextEditor.Toolbar>
            <TextEditor.Content className="h-87" />
            <TextEditor.Hint />
        </TextEditor>
    </div>
);

export const FloatingToolbarMd = () => (
    <div className="mx-auto w-full max-w-180">
        <TextEditor aria-label="Article body" defaultValue={sampleContent} maxLength={characterBudget}>
            <TextEditor.Toolbar isFloating>
                <FullToolbarGroup />
            </TextEditor.Toolbar>
            <TextEditor.Content className="h-108" />
            <TextEditor.Hint />
        </TextEditor>
    </div>
);

export const WithTooltip = () => (
    <div className="mx-auto w-full max-w-lg">
        <TextEditor aria-label="Article body" defaultValue={selectionSampleContent}>
            <TextEditor.SelectionToolbar>
                <TextEditor.Bold />
                <TextEditor.Italic />
                <TextEditor.Underline />
                <TextEditor.Separator />
                <TextEditor.TextColor />
                <TextEditor.Separator />
                <TextEditor.AlignLeft />
                <TextEditor.AlignCenter />
                <TextEditor.BulletList />
            </TextEditor.SelectionToolbar>
            <TextEditor.Content className="h-87 p-4" />
            <TextEditor.Hint>Select a text to show a tooltip.</TextEditor.Hint>
        </TextEditor>
    </div>
);
