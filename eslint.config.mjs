import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",

    // Vendored agent/editor tooling. These are third-party skill definitions
    // and CommonJS helper scripts, not application source — linting them with
    // the app's TypeScript rules produces noise we cannot act on.
    ".agents/**",
    ".claude/**",
    ".cursor/**",
    ".cursor-plugin/**",
    "skills/**",
    "design-system/**",
  ]),
  {
    // `react-hooks/set-state-in-effect` fires on legitimate async patterns used
    // here: the mounted-guard in theme-toggle, and setState inside Firebase's
    // onAuthStateChanged callback and data-loading effects. Kept visible as a
    // warning rather than blocking CI on a refactor of working code.
    rules: {
      "react-hooks/set-state-in-effect": "warn",
    },
  },
]);

export default eslintConfig;
