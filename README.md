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

This package uses Tailwind-style utility classes in component markup. Ensure your app includes compatible utility CSS (for example, Tailwind CSS) so those classes render correctly.

## Package exports

| Subpath | Exports |
|---------|---------|
| `@hakistudio/hakiui` | Full public API (re-exports) |
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
