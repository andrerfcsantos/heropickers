import path from "node:path";

import { defineConfig } from "vite-plus";

const root = import.meta.dirname;

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(root, "src"),
    },
  },
  build: {
    // Every HTML entry has to be listed explicitly: Vite only follows links
    // from `index.html`, and `404.html` is reached by the server on a miss
    // rather than by a link, so it would otherwise never be emitted.
    rollupOptions: {
      input: {
        index: path.resolve(root, "index.html"),
        "404": path.resolve(root, "404.html"),
      },
    },
  },
  lint: {
    plugins: ["oxc", "typescript", "unicorn"],
    categories: {
      correctness: "warn",
    },
    env: {
      builtin: true,
    },
    ignorePatterns: ["dist/**"],
    rules: {
      "no-unused-vars": "error",
      "no-var": "error",
      "prefer-const": "error",
      "@typescript-eslint/no-explicit-any": "error",
    },
    overrides: [
      {
        files: ["scripts/**/*.mts", "*.config.*"],
        env: {
          node: true,
        },
      },
    ],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {
    semi: true,
    singleQuote: false,
    trailingComma: "all",
    tabWidth: 2,
    printWidth: 80,
    sortPackageJson: false,
    ignorePatterns: [],
  },
});
