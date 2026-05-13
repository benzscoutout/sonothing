# SoNothing HRM — Next.js admin template (mock data)

Production-style HR admin UI built for **template resale** (for example on [Lemon Squeezy](https://lemonsqueezy.com)). There is **no backend**: domain data lives in typed seeds under `lib/mock-data`, and every read goes through async facades in `lib/mock-api` so you can replace them with `fetch` calls later.

## Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) for the marketing landing, use **Live demo** to reach the mock sign-in, or go directly to [http://localhost:3000/login](http://localhost:3000/login).

## Folder map

| Path | Purpose |
|------|---------|
| [app/(marketing)](app/(marketing)) | Landing (`/`) and pricing calculator (`/pricing`) |
| [app/(auth)](app/(auth)) | Demo login shell (`/login`) — any credentials |
| [app/(dashboard)](app/(dashboard)) | HRM app routes: `/dashboard`, `/employees`, `/leave`, … |
| [lib/mock-data](lib/mock-data) | Types + static seed arrays |
| [lib/mock-api](lib/mock-api) | Async facades + `delay()` for realistic loading states |
| [components/dashboard](components/dashboard) | Sidebar, top bar, shell |
| [components/ui](components/ui) | Small Tailwind primitives |
| [components/hrm](components/hrm) | Feature sections with client-side demo state |
| [settings.ts](settings.ts) | Marketing + pricing calculator copy |

## Replacing mocks with a real API

1. Keep route components thin: they should call functions from `lib/mock-api`.
2. Implement the same function signatures against your HTTP client.
3. Move shared DTO types to a neutral module (for example `lib/types/hrm.ts`) if both client and server need them.

Interactive demos (leave request form, attendance punches, recruiting stage changes, settings toggles) intentionally use **local React state or `sessionStorage`** so the template works offline. Wire those actions to mutations when you add a backend.

## License

See [LICENSE](LICENSE) for the commercial template terms shipped with this product.

## Troubleshooting (dev server)

**“You cannot have two parallel pages that resolve to the same path” for `/(dashboard)/page` and `/(marketing)/page`.**  
Only the marketing group should define `/`. Delete `app/(dashboard)/page.tsx` if it exists (a redirect there conflicts with `app/(marketing)/page.tsx`).

**`Cannot find module './NNN.js'` or 404s on `/_next/static/...` after edits.**  
Stop the dev server, remove the build cache, and start again:

```bash
rm -rf .next
npm run dev
```
