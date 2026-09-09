// Root PostCSS config so Storybook (run from the repo root) processes Tailwind v4 in
// apps/docs/app/globals.css. The docs app has its own identical config.
export default { plugins: { "@tailwindcss/postcss": {} } };
