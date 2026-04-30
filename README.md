# Vercel Swag Store

A production-style e-commerce storefront for Vercel swag. It connects to a catalog API, supports search and discovery, product detail with live inventory, and a session-backed shopping cart—all built with modern Next.js patterns.

---

## Overview

This application is a reference implementation that emphasizes **fast first paint**, **streaming UI**, and **reliable data**: catalog content is cached and revalidated thoughtfully, while stock levels and cart state stay fresh. The interface is fully responsive and includes accessibility-minded navigation, promotional content, and SEO metadata.

---

## Features

- **Home** — Hero, promotional banner, and a curated featured-products grid.
- **Product detail** — Rich product pages with images, descriptions, and **live stock** streamed after the static shell.
- **Search** — Full-text search with category filters, URL-driven state (shareable links), debounced input, and clear loading and empty states.
- **Cart** — Slide-out drawer with line items, quantity updates, removal, and subtotal; backed by a secure session cookie and server actions.
- **Observability** — [Vercel Analytics](https://vercel.com/docs/analytics) and [Speed Insights](https://vercel.com/docs/speed-insights) in the root layout.
- **SEO** — Per-route metadata, dynamic Open Graph image, `sitemap.xml`, and `robots.txt`.

---

## Pages

| Route                   | Description                                                                                                       |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **`/`**                 | Landing page: hero, promotion (streamed where applicable), and featured products.                                 |
| **`/products/[param]`** | Product detail (API accepts slug or id); static product data with stock and add-to-cart streamed inside Suspense. |
| **`/search`**           | Search results with query and category in the URL; debounced search after three characters, plus explicit submit. |
| **`/maintenance`**      | Clean maintenance screen with messaging for planned downtime.                                                     |

Global chrome includes a **header** (navigation, cart trigger), **footer**, and **cart drawer** on every page.

---

## Tech stack

| Area           | Technology                                                                                                                                                                                                                  |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework**  | [Next.js 16](https://nextjs.org/) (App Router, [Turbopack](https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack) for dev/build)                                                                        |
| **UI**         | [React 19](https://react.dev/)                                                                                                                                                                                              |
| **Language**   | [TypeScript](https://www.typescriptlang.org/) (strict)                                                                                                                                                                      |
| **Styling**    | [Tailwind CSS v4](https://tailwindcss.com/) with [`clsx`](https://github.com/lukeed/clsx) / [`tailwind-merge`](https://github.com/dcastil/tailwind-merge) for class composition                                             |
| **Validation** | [Zod](https://zod.dev/) — environment variables, API responses, and server-action inputs                                                                                                                                    |
| **Caching**    | Next.js [Cache Components](https://nextjs.org/docs/app/building-your-application/caching) (`cacheComponents: true`), `cacheLife` / `cacheTag`, plus [`babel-plugin-react-compiler`](https://react.dev/learn/react-compiler) |
| **Images**     | [`next/image`](https://nextjs.org/docs/app/building-your-application/optimizing/images) with remote patterns for Vercel Blob                                                                                                |
| **Analytics**  | `@vercel/analytics`, `@vercel/speed-insights`                                                                                                                                                                               |
| **Linting**    | ESLint 9 (flat config) with `typescript-eslint`                                                                                                                                                                             |

Configuration highlights live in [`next.config.ts`](next.config.ts): cache components, React Compiler, typed routes, and image `remotePatterns`.

---

## Getting started

### Prerequisites

- **Node.js** (LTS recommended; the platform default for new Vercel projects is Node 24 LTS)
- **npm** (or your preferred package manager)

### Environment

Copy the example file and adjust if your API or site URL changes:

```bash
cp .env.example .env.local
```

| Variable                   | Required | Purpose                                                                                                  |
| -------------------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | Yes      | Base URL of the store API                                                                                |
| `API_BYPASS_TOKEN`         | Yes      | Server-only token sent as `x-vercel-protection-bypass` to bypass deployment protection on the upstream   |
| `NEXT_PUBLIC_SITE_URL`     | No       | Canonical site URL (Open Graph, sitemap, links) — defaults to `http://localhost:3000`                    |
| `APP_STATE`                | No       | Toggles the maintenance proxy in `src/proxy.ts`. Set to `maintenance` to redirect all routes to `/maintenance` |
| `VERCEL_OIDC_TOKEN`        | No       | Auto-injected by Vercel for OIDC-based auth to upstream services; not read directly by the app          |

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Development server                   |
| `npm run build`     | Production build                     |
| `npm run start`     | Serve the production build           |
| `npm run lint`      | Run ESLint                           |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`)    |
| `npm run analyze`   | Next.js experimental bundle analysis |

---

## Architecture (for contributors)

- **Data layer** — Typed API modules under `src/lib/api/` with `'use cache'`, `cacheLife`, and `cacheTag` where appropriate; stock and cart use uncached or short-lived paths.
- **Schemas** — Shared Zod models in `src/lib/schemas/` for API and form safety.
- **Cart** — Session cookie + server actions in `src/lib/cart/` (e.g. `cart/actions/`); mutations refresh cart tags and relevant paths.
- **UI** — Atomic-design layout under `src/components/` (`atoms`, `icons`, `molecules`, `organisms`, `templates`) with co-located styles, types, constants, and hooks per component.
- **Suspense** — Cart badge, drawer payload, promotions, search results, and product stock stream inside `<Suspense>` so the static shell ships immediately.
- **Maintenance mode** — `src/proxy.ts` (Next.js proxy/middleware) reads `APP_STATE` and redirects traffic to `/maintenance` when enabled.

For a deeper walkthrough of caching choices and server actions, see inline documentation and comments in the API and cart modules.

---

## Project layout

```
src/
├── app/                    # App Router: pages, layout, metadata, OG image, sitemap, robots
│   ├── products/[param]/   # Product detail (slug or id)
│   ├── search/             # Search results
│   ├── maintenance/        # Maintenance screen
│   ├── layout.tsx          # Root layout (analytics, providers, chrome)
│   ├── globals.css         # Tailwind v4 global styles
│   ├── error.tsx           # Global error boundary
│   ├── not-found.tsx       # 404
│   ├── loading.tsx         # Root loading UI
│   ├── robots.ts           # robots.txt
│   └── sitemap.ts          # sitemap.xml
├── components/             # Atomic-design UI
│   ├── atoms/              # Button, Input, Select, IconButton, CartQuantityStepper
│   ├── icons/              # SVG icon components
│   ├── molecules/          # AddToCartForm, CartButton, ProductCard, Pagination, skeletons, …
│   ├── organisms/          # CartDrawer, Header, Footer, HomeHero, SearchResultsSection, …
│   └── templates/          # Page-level shells (HomePage, ProductDetailPage, SearchPage, …)
├── context/                # Client context (cart UI/state)
├── providers/              # Server/client providers and cart hydrators
├── lib/                    # API clients, schemas, env, cart, metadata, search URL, utilities
│   ├── api/                # Typed API modules (products, stock, cart, categories, promotions, …)
│   ├── cart/               # Server actions and session helpers
│   ├── schemas/            # Shared Zod models
│   ├── metadata/           # Per-route metadata builders
│   ├── searchUrl/          # URL-state helpers for the search page
│   ├── env.ts              # Zod-validated env loader
│   └── cache-tags.ts       # Centralized cache-tag keys
├── constants/              # Routes, global app constants, app-state enum
├── hooks/                  # Shared React hooks (useEscapeKey, useBodyScrollLock)
├── types/                  # Shared TS type helpers
├── assets/                 # Static assets (default Open Graph image)
└── proxy.ts                # Maintenance-mode proxy keyed on APP_STATE
```

---

## License

This project is private (`"private": true` in `package.json`). Use and distribution follow your organization’s policies.
