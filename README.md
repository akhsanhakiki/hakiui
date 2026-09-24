# @hakistudio/hakiui

Pixel-orange UI components for React, Svelte, and plain HTML. Every delivery path shares the same CSS-variable theme, including light (warm paper-white) and dark (warm charcoal) modes.

## Quick start (React)

Requires an existing React 18 or 19 app and Tailwind CSS v4.

### 1. Install

```bash
npm install @hakistudio/hakiui
```

`lucide-react` is installed with HakiUI. Your React app already provides `react` and `react-dom`.

### 2. Import styles

Add these lines to your global CSS, in this order:

```css
@import "tailwindcss";
@import "@hakistudio/hakiui/styles.css";
```

### 3. Use a component

```tsx
import { Button } from "@hakistudio/hakiui";

export default function App() {
  return <Button variant="primary">Continue</Button>;
}
```

The stylesheet supplies the default theme. No wrapper is required. To paint the whole page with the theme background, set the root background to `var(--bg)`.

For Svelte, install HakiUI in an existing Svelte 4.2+ or 5 project and use the Svelte entry point below.

## Using HakiUI with an AI coding agent

The package ships [`llms.txt`](./llms.txt) — the complete prop reference for every component plus the setup checklist, written for AI agents. Point your agent at it before it writes any code:

```
Read node_modules/@hakistudio/hakiui/llms.txt (or https://hakiui.akhsanhakiki.com/llms.txt) first, then build …
```

## Tailwind setup (Tailwind v4)

HakiUI components use Tailwind utility classes. Import the package stylesheet in your global CSS, **after** Tailwind:

```css
@import "tailwindcss";
@import "@hakistudio/hakiui/styles.css";
```

`styles.css` carries an `@source` that makes your Tailwind build scan the compiled components. If you skip it, none of the components' utility classes are generated — inputs show the browser's default black focus outline, buttons lose their height and padding.

No Tailwind in your app? Use the prebuilt bundle instead (it cannot be tree-shaken):

```css
@import "@hakistudio/hakiui/hakiui.css";
```

## Font (recommended)

The default theme is `'IBM Plex Mono', monospace` but the package does not load the font. Either load it:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
```

or pass a font you already ship via `initialTheme={{ ...defaultTheme, fontFamily: "'Inter', sans-serif" }}`.

### Framework quick setup

#### React + Vite

1. Install Tailwind v4 in your Vite app.
2. Add this to your global stylesheet:

```css
@import "tailwindcss";
@import "@hakistudio/hakiui/styles.css";
```

3. Import and use components directly. No provider is required.

#### Svelte / SvelteKit

1. Add the prebuilt stylesheet to your global CSS (Svelte does not require
   Tailwind to use Haki UI):

```css
@import "@hakistudio/hakiui/hakiui.css";
```

2. Import components from the Svelte-only subpath. It contains every public
   Haki UI component and has no React dependency:

```svelte
<script lang="ts">
  import { HakiProvider, Button, Input, Progress } from "@hakistudio/hakiui/svelte";

  let email = "";
</script>

<HakiProvider primary="#F05423" radius={4} mode="light">
  <main class="app">
    <Input label="Email" bind:value={email} placeholder="Email address" />
    <Progress value={64} label="Profile complete" />
    <Button on:click={() => console.log(email)}>Continue</Button>
  </main>
</HakiProvider>
```

`HakiProvider` scopes optional token overrides to its children. The component
set is exported one-for-one from `@hakistudio/hakiui/svelte`; structural
components accept a slot and an `as` prop, while form components expose native
Svelte bindings such as `bind:value` and `bind:checked`.

#### Next.js (App Router)

1. Ensure your `app/globals.css` contains:

```css
@import "tailwindcss";
@import "@hakistudio/hakiui/styles.css";
```

2. Import and use components in client files. No provider is required.

#### Astro

1. Install and configure `@astrojs/react`.
2. Enable Tailwind in Astro.
3. In your shared stylesheet:

```css
@import "tailwindcss";
@import "@hakistudio/hakiui/styles.css";
```

4. Render HakiUI React components inside `.tsx` React components.

## Usage (barrel import)

```tsx
import { Button, Input } from "@hakistudio/hakiui";

export default function App() {
  return (
    <div className="p-6 space-y-4 min-h-screen" style={{ background: "var(--bg)" }}>
      <Input label="Email" placeholder="Email address" />
      <Button variant="primary">Continue</Button>
    </div>
  );
}
```

### Light / dark mode

`HakiProvider` ships two built-in neutral palettes and applies one based on `theme.mode` (`"light"` by default). Toggle at runtime with `useTheme`:

```tsx
import { useTheme } from "@hakistudio/hakiui";

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() =>
        setTheme({ ...theme, mode: theme.mode === "dark" ? "light" : "dark" })
      }
    >
      Toggle mode
    </button>
  );
};
```

The default brand theme is pixel orange (`#F05423`) on a warm white background with `IBM Plex Mono` and a 4px radius. Every token can be overridden via `initialTheme` or `setTheme`.

## Usage (per-component import, best for bundle size)

Each component is a separate entry so bundlers can include only what you import:

```tsx
import { HakiProvider } from "@hakistudio/hakiui/theme-provider";
import { Button } from "@hakistudio/hakiui/button";
import { Input } from "@hakistudio/hakiui/input";
```

Utilities:

```ts
import { hexToRgb } from "@hakistudio/hakiui/hex-to-rgb";
import { getRadiusStyle, type Radius } from "@hakistudio/hakiui/radius";
```

## Copy-paste (shadcn-style)

You can copy individual files from this repo into your app, for example:

- `src/components/ui/Button.tsx` → your `components/ui/button.tsx`
- `src/lib/radius.ts`, `src/lib/hex-to-rgb.ts` as needed
- `src/components/theme-provider.tsx` for `HakiProvider` / `useTheme`

Adjust import paths to match your project aliases.

## Styling note

This package uses Tailwind utility classes and CSS variables. The stylesheet defines default `--ui-*` brand variables and neutral tokens (`--bg`, `--bg-soft`, `--surface`, `--border`, `--input`, `--text`, `--text-muted`, `--hover`) on `:root`. No React wrapper is needed. Override the variables in CSS to customize a theme, or use the optional `HakiProvider` and `useTheme` for runtime theme state.

## Package exports

| Subpath | Exports |
|---------|---------|
| `@hakistudio/hakiui` | Full public API (re-exports) |
| `@hakistudio/hakiui/styles.css` | Tailwind v4 `@source` + tokens + `.haki-*` classes (use with your own Tailwind build) |
| `@hakistudio/hakiui/hakiui.css` | Prebuilt, self-contained stylesheet (no Tailwind needed) |
| `@hakistudio/hakiui/llms.txt` | Full component/prop reference for AI coding agents |
| `@hakistudio/hakiui/theme-provider` | `HakiProvider`, `useTheme`, `defaultTheme`, types |
| `@hakistudio/hakiui/hex-to-rgb` | `hexToRgb` |
| `@hakistudio/hakiui/radius` | `getRadiusStyle`, `Radius` |
| `@hakistudio/hakiui/button` … `/breadcrumbs` | Individual UI modules |
| `@hakistudio/hakiui/prompt-input`, `/model-selector`, `/chat-message`, `/sidebar`, `/thinking-steps`, `/tool-calls`, `/prompt-suggestions`, `/chip`, `/kbd`, `/menu`, `/otp-input` | AI-app components (v2.3) — see `llms.txt` |

## Publish (maintainer)

Releases are published to npm via [Trusted Publishing](https://docs.npmjs.com/trusted-publishers/) (OIDC) from GitHub Actions — no long-lived `NPM_TOKEN` required.

1. On [npm package settings](https://www.npmjs.com/package/@hakistudio/hakiui/access), add a Trusted Publisher:
   - Organization or user: `akhsanhakiki`
   - Repository: `hakiui`
   - Workflow filename: `publish.yml`
   - Environment name: leave blank
   - Allowed actions: `npm publish`
2. Bump `version` in `package.json`, commit, then tag and push:

```bash
# after bumping package.json "version" (e.g. 2.0.1)
git tag v2.0.1
git push origin v2.0.1
```

The `.github/workflows/publish.yml` workflow runs on `v*` tags and publishes `@hakistudio/hakiui`.

Manual fallback (local):

```bash
npm login
npm publish --access public
```
