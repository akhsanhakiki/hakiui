# @hakistudio/hakiui

Dark-themed React UI components powered by CSS variables and Tailwind utility classes. Source is split per component under `src/components/ui/` for maintainability, granular installs, and tree-shaking-friendly subpath exports.

## Install

```bash
npm install @hakistudio/hakiui
```

Also install peer dependencies if your app does not already have them:

```bash
npm install react react-dom lucide-react
```

## Tailwind setup (required)

HakiUI components use Tailwind utility classes. To ensure those classes are generated in consuming apps, import the package stylesheet in your global CSS:

```css
@import "tailwindcss";
@import "@hakistudio/hakiui/styles.css";
```

### Framework quick setup

#### React + Vite

1. Install Tailwind v4 in your Vite app.
2. Add this to your global stylesheet:

```css
@import "tailwindcss";
@import "@hakistudio/hakiui/styles.css";
```

3. Wrap your app with `HakiProvider`.

#### Next.js (App Router)

1. Ensure your `app/globals.css` contains:

```css
@import "tailwindcss";
@import "@hakistudio/hakiui/styles.css";
```

2. Wrap your root layout body content (or a shared client boundary) with `HakiProvider`.

#### Astro

1. Install and configure `@astrojs/react`.
2. Enable Tailwind in Astro.
3. In your shared stylesheet:

```css
@import "tailwindcss";
@import "@hakistudio/hakiui/styles.css";
```

4. Render HakiUI React components inside `.tsx` React components and use `HakiProvider`.

## Usage (barrel import)

```tsx
import { HakiProvider, Button, Input } from "@hakistudio/hakiui";

export default function App() {
  return (
    <HakiProvider>
      <div className="p-6 space-y-4 bg-black min-h-screen">
        <Input placeholder="Email address" />
        <Button variant="solid">Continue</Button>
      </div>
    </HakiProvider>
  );
}
```

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

This package uses Tailwind utility classes and CSS variables. `HakiProvider` provides the `--ui-*` variables consumed by components, so it should wrap every area where you render HakiUI components.

## Package exports

| Subpath | Exports |
|---------|---------|
| `@hakistudio/hakiui` | Full public API (re-exports) |
| `@hakistudio/hakiui/styles.css` | Tailwind v4 source hints for HakiUI components |
| `@hakistudio/hakiui/theme-provider` | `HakiProvider`, `useTheme`, `defaultTheme`, types |
| `@hakistudio/hakiui/hex-to-rgb` | `hexToRgb` |
| `@hakistudio/hakiui/radius` | `getRadiusStyle`, `Radius` |
| `@hakistudio/hakiui/button` … `/modal` | Individual UI modules |

## Publish (maintainer)

```bash
npm login
npm publish --access public
```

Scoped package `@hakistudio/hakiui` publishes under the `hakistudio` npm org or user; ensure you are logged in as that account.
