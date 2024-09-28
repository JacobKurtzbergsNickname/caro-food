import js from "@eslint/js";
import path from "path";
import { fileURLToPath } from "url";

// Import ESLint plugins and configs
import astroPlugin from "eslint-plugin-astro";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import airbnbConfig from "eslint-config-airbnb";
import airbnbHooksConfig from "eslint-config-airbnb/hooks";
import importPlugin from "eslint-plugin-import";

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Export the flat config array
export default [
  // Base ESLint recommended rules
  js.configs.recommended,

  // Astro plugin configuration
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: "astro-eslint-parser",
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
        ecmaFeatures: {
          jsx: true,
        },
        project: path.resolve(__dirname, "./tsconfig.json"),
      },
    },
    plugins: {
      astro: astroPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...astroPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      "prettier/prettier": "error",
      // Add any Astro-specific rules here
    },
  },

  // Add the missing comma here

  // JavaScript and TypeScript files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
        ecmaFeatures: {
          jsx: true,
        },
        project: path.resolve(__dirname, "./tsconfig.json"),
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@typescript-eslint": typescriptPlugin,
      prettier: prettierPlugin,
      import: importPlugin,
    },
    rules: {
      // Extend Airbnb configs
      ...airbnbConfig.rules,
      ...airbnbHooksConfig.rules,
      // Extend TypeScript plugin recommended rules
      ...typescriptPlugin.configs.recommended.rules,
      // Extend Prettier rules
      ...prettierConfig.rules,
      "prettier/prettier": "error",

      // Your custom rules
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "react/jsx-filename-extension": [1, { extensions: [".tsx", ".jsx"] }],
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never",
          tsx: "never",
          js: "never",
          jsx: "never",
        },
      ],
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": ["error"],
    },
    settings: {
      react: {
        version: "detect",
      },
      // Add import resolver settings if needed
    },
  },
];
