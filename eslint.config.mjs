import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {
        ignores: ["**/node_modules/**", "**/.next/**", "**/dist/**", "**/storybook-static/**", "docs/spec/reference/**"],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["**/*.{ts,tsx}"],
        plugins: { react, "react-hooks": reactHooks, "jsx-a11y": jsxA11y, "simple-import-sort": simpleImportSort, "unused-imports": unusedImports },
        settings: { react: { version: "detect" } },
        rules: {
            ...reactHooks.configs.recommended.rules,
            ...jsxA11y.configs.recommended.rules,
            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off",
            "unused-imports/no-unused-imports": "error",
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
            "@typescript-eslint/no-explicit-any": "warn",
            // House rules from docs/spec/00-foundation/05-component-conventions.md
            "no-restricted-syntax": [
                "error",
                {
                    selector: "ImportDeclaration[source.value='react-aria-components'] > ImportSpecifier[local.name!=/^Aria/]",
                    message: "Import with an Aria* alias: import { Button as AriaButton } from 'react-aria-components'.",
                },
            ],
        },
    },
    prettier,
);
