"use client";

import { CodeSnippet } from "./code-snippet";

const schemaSnippet = `// Imports
import mongoose, { Schema } from 'mongoose'

// Collection name
export const collection = 'Design'

// Schema
const schema = new Schema({
  name: {
    type: String,
    required: true
  },

  description: {
    type: String
  }
}, {timestamps: true})

// Model
export default mongoose.model(collection, schema, collection)`;

const colorsSnippet = `export const colors = {
  current: "currentColor",
  transparent: "transparent",
  white: "rgb(var(--colors-white) / <alpha-value>)",
  black: "rgb(var(--colors-black) / <alpha-value>)",

  // These will be inverted in dark mode.
  "alpha-white": "rgb(var(--colors-alpha-white) / <alpha-value>)",
  "alpha-black": "rgb(var(--colors-alpha-black) / <alpha-value>)",
  brand: {
    25: "rgb(var(--colors-brand-25) / <alpha-value>)",
    50: "rgb(var(--colors-brand-50) / <alpha-value>)",
    100: "rgb(var(--colors-brand-100) / <alpha-value>)",
    200: "rgb(var(--colors-brand-200) / <alpha-value>)",
    300: "rgb(var(--colors-brand-300) / <alpha-value>)",
    400: "rgb(var(--colors-brand-400) / <alpha-value>)",
    500: "rgb(var(--colors-brand-500) / <alpha-value>)",
    600: "rgb(var(--colors-brand-600) / <alpha-value>)",
    700: "rgb(var(--colors-brand-700) / <alpha-value>)",
    800: "rgb(var(--colors-brand-800) / <alpha-value>)",
    900: "rgb(var(--colors-brand-900) / <alpha-value>)",
    950: "rgb(var(--colors-brand-950) / <alpha-value>)",
  },
  neutral: {
    25: "rgb(var(--colors-neutral-25) / <alpha-value>)",
    50: "rgb(var(--colors-neutral-50) / <alpha-value>)",
    100: "rgb(var(--colors-neutral-100) / <alpha-value>)",
    200: "rgb(var(--colors-neutral-200) / <alpha-value>)",
    300: "rgb(var(--colors-neutral-300) / <alpha-value>)",
    400: "rgb(var(--colors-neutral-400) / <alpha-value>)",
    500: "rgb(var(--colors-neutral-500) / <alpha-value>)",
    600: "rgb(var(--colors-neutral-600) / <alpha-value>)",
    700: "rgb(var(--colors-neutral-700) / <alpha-value>)",
    800: "rgb(var(--colors-neutral-800) / <alpha-value>)",
    900: "rgb(var(--colors-neutral-900) / <alpha-value>)",
    950: "rgb(var(--colors-neutral-950) / <alpha-value>)",
  },
};`;

const installTabs = [
    { id: "npm", label: "npm", code: "npm install @properui/components", language: "bash" as const },
    { id: "yarn", label: "yarn", code: "yarn add @properui/components", language: "bash" as const },
    { id: "bun", label: "bun", code: "bun add @properui/components", language: "bash" as const },
];

export const CodeSnippetExample = () => (
    <div className="w-full">
        <CodeSnippet code={schemaSnippet} language="javascript" showLineNumbers aria-label="Mongoose schema" />
    </div>
);

export const WithLineNumber = () => (
    <div className="w-full">
        <CodeSnippet code={schemaSnippet} language="javascript" showLineNumbers aria-label="Mongoose schema with line numbers" />
    </div>
);

export const WithoutLineNumber = () => (
    <div className="w-full">
        <CodeSnippet code={schemaSnippet} language="javascript" isFramed aria-label="Mongoose schema without line numbers" />
    </div>
);

export const ShowMore = () => (
    <div className="w-full">
        <CodeSnippet code={colorsSnippet} language="javascript" isFramed collapsedHeight={350} aria-label="Colour tokens" />
    </div>
);

export const WithTabs = () => (
    <div className="w-full">
        <CodeSnippet.Tabs items={installTabs} defaultSelectedKey="npm" aria-label="Package manager" />
    </div>
);
