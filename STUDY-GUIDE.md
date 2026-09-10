# 📘 Next.js Interview Study Guide

> **Your morning-revision ebook.** Read it top-to-bottom. Each topic has: the **idea** (plain English), an **analogy** to make it stick, the **code** we wrote, and the **interview angle** (what they'll actually ask).
>
> Kept up to date after every lesson. Last updated: **2026-07-25** · Next.js **16.2.10** (App Router).

---

## 🗺️ Progress tracker

**Week 1 — Rendering & data**
- [x] Day 1 — Server vs Client Components + hydration
- [x] Day 2 — Routing, layouts, navigation
- [x] Day 3 — Dynamic routes + `generateStaticParams`
- [x] Day 3½ — Static vs Dynamic vs ISR (the "when is the HTML made?" idea)
- [x] Day 4 — Data fetching & revalidation — ISR made real (`revalidate`), watched stale-while-revalidate live
- [x] Day 4½ — Revision: interview drill for Days 1–4 (Part 5 below)
- [ ] Day 5 — Rendering strategies recap (CSR / SSR / SSG / ISR / PPR)
- [ ] Day 6 — Streaming, Suspense, `loading.tsx`, `error.tsx`
- [ ] Day 7 — Review + mini mock

**Week 2 — Mutations, performance & hard questions**
- [ ] Day 8 — Server Actions & mutations
- [ ] Day 9 — The 4-layer caching model
- [ ] Day 10 — Performance (`next/image`, `next/font`, `next/dynamic`)
- [ ] Day 11 — Metadata/SEO, Route Handlers, Middleware→Proxy, Edge
- [ ] Day 12 — Hydration errors & gotchas
- [ ] Day 13 — Frontend system design with Next.js
- [ ] Day 14 — Full mock interview

---

## Part 1 — The Component Model

### 1.0 The zeroth concept — Next.js IS a server 🔑

**The idea.** Next.js is not a folder of frontend files. It's a **running program** — a pre-written **Node.js server** (Node.js = JavaScript running *outside* the browser, on any computer). When you run `npm run dev`, that terminal window IS the server, listening on port 3000 — exactly like `python manage.py runserver` starts Django on port 8000. Your components are the part *you* fill in; the server notices them in folders and runs them at the right time ("the framework calls you").

**The React you knew before (CSR — Client-Side Rendering):**
1. Browser downloads the code of **every** component (the JS bundle)
2. React runs **in the browser** → empty shell / spinner
3. `useEffect` fires → the **browser** calls the API
4. JSON arrives → UI renders

Everything happens in the browser; the only "thinking" server is the backend (Django/Express).

**The Next.js world — TWO servers:**
```
Browser ── asks for a page ──→ Next.js server (Node.js — RUNS your components,
                                  │             fetches data, builds the HTML)
                                  └── asks for JSON ──→ Django / any backend API
Browser just displays the finished page
```
The backend doesn't go away — it still owns the data. What's new: a thinking machine on the *frontend side* too. The fetching + rendering work **moved** — from the browser (after page load) to the Next.js server (before the response is sent).

| Backend person with Django | You with Next.js |
|---|---|
| Language: Python | Language: JavaScript/TypeScript |
| Framework = pre-written server: **Django** | Framework = pre-written server: **Next.js** |
| Start it: `manage.py runserver` → :8000 | Start it: `npm run dev` → :3000 |
| They write: view functions returning HTML/JSON | You write: components in folders |

**Analogy.** The backend API is a **warehouse** (holds the goods, speaks JSON). Old React: customers get a flat-pack kit + instructions (JS bundle) and assemble furniture at home (the browser), phoning the warehouse for missing parts (API calls) — hence the spinner. Next.js is a **workshop** between them: it picks parts from the warehouse, assembles the furniture, and delivers it **finished**.

**The payoff insight:** a Server Component is server-side code that runs when its URL is hit and produces HTML — *that's a backend view*. You've been writing backend code since Day 1, just in JSX. That's why Next.js is called a **full-stack framework**, and why Server Components can safely touch databases and hold API keys. A Client Component (`'use client'`) is the old React you already knew — shipped to the browser, runs there.

**Interview angle.** *"How does Next.js differ from plain React (CRA/Vite)?"* → Plain React is only files the browser runs (CSR). Next.js adds a Node.js server that renders components server-side — enabling SSR/SSG/ISR, server-side data fetching, and smaller bundles.

### 1.1 Server Components vs Client Components

**The idea.** In the App Router, every component is a **Server Component by default**. It runs on the server, and its JavaScript is **never sent to the browser**. To make a component interactive (state, clicks, browser stuff), you put `'use client'` at the very top of the file — that makes it a **Client Component**.

| | Server Component (default) | Client Component (`'use client'`) |
|---|---|---|
| Where its JS runs | Server only | Server (for first HTML) **and** browser |
| Ships JS to browser? | ❌ No → smaller bundle | ✅ Yes |
| Can use `useState`, `onClick`, `useEffect`? | ❌ No | ✅ Yes |
| Can read DB / secrets directly? | ✅ Yes | ❌ No |

**Analogy.** A Server Component is a **kitchen** — it cooks the meal but the customer never sees it. A Client Component is the **dining table** — it's out front, interactive, where the customer actually touches things.

**Code we wrote.**
```tsx
// page.tsx — Server Component (no 'use client'). Logs to the TERMINAL.
export default function Home() {
  console.log('🖥️ runs on the SERVER');
  return <Counter />;   // a Client island inside a Server page
}
```
```tsx
// Counter.tsx — Client Component. Logs to the BROWSER. Can use hooks.
'use client';
import { useState } from 'react';
export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**Interview angle.**
- *"What actually gets sent to the browser for a Server Component?"* → Not its JS. A serialized description of the UI (the "RSC payload") + HTML. Zero JS cost.
- *"Why can't you pass a function as a prop from a Server → Client Component?"* → The boundary is serialized; functions aren't serializable. (Server Actions are the exception.)

### 1.2 Hydration — the "renders twice" nuance

**The idea.** A Client Component is **not** browser-only. It renders **twice**:
1. On the **server**, to produce the initial HTML (so the page shows up fast, even before JS loads).
2. In the **browser**, where React re-runs it and attaches the click handlers / state. This second step is called **hydration**.

`'use client'` means *"this also ships JS and hydrates,"* **not** *"this skips the server."*

**Analogy.** The server sends a **printed photo of a TV remote** (looks real, but the buttons don't work yet). Hydration is React **wiring up the buttons** so they actually do something.

**Interview angle.**
- *"What is a hydration mismatch?"* → The server HTML and the first browser render disagree, so React throws a warning and re-renders. **Top cause:** using `Date.now()`, `Math.random()`, `localStorage`, or `typeof window` during render — the server and browser produce different output.

---

## Part 2 — Routing & Navigation

### 2.1 File-based routing

**The idea.** Folders = URLs. A folder with a `page.tsx` inside becomes a route. **The folder name is the URL.**

```
app/page.tsx          →  /
app/about/page.tsx     →  /about
app/blog/page.tsx      →  /blog
```

### 2.2 Dynamic routes — one file, many URLs

**The idea.** Wrap a folder name in `[brackets]` to capture a piece of the URL. `app/blog/[slug]/page.tsx` serves `/blog/anything`, and you read the captured value from `params`.

```tsx
// ⚠️ Next 15+/16: params is a PROMISE. You MUST await it. (Was a plain object in v14.)
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;   // <-- await!
  const post = await getPost(slug);
  if (!post) notFound();           // unknown slug → 404 page + real 404 status
  return <h1>{post.title}</h1>;
}
```

| Pattern | Matches |
|---|---|
| `[slug]` | `/blog/a` |
| `[...slug]` (catch-all) | `/shop/a/b/c` (not `/shop`) |
| `[[...slug]]` (optional catch-all) | `/shop` **and** `/shop/a/b` |
| `(group)` (route group) | organizes files, **no URL segment** |

### 2.3 Layouts — shared UI

**The idea.** `layout.tsx` wraps every page inside its folder. Put something there once (a nav bar, a footer) and it appears on **all** those pages. It receives `{children}` = the current page.

```tsx
export default function RootLayout({ children }) {
  return <body><Nav />{children}</body>;   // Nav shows on every page
}
```

### 2.4 Navigation — `<Link>` vs `<a>`

**The idea.** Use `<Link>` (from `next/link`) to move between pages. It does a **client-side transition** — swaps the page content without a full browser reload. A plain `<a>` does a **full reload** (white flash, all state wiped, everything re-downloads).

```tsx
'use client';                                  // needed: usePathname is a hook
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function Nav() {
  const pathname = usePathname();              // current URL, for highlighting active link
  return <Link href="/blog">Blog</Link>;       // Next 13+: no child <a> needed
}
```

**Interview angle.** *"`<Link>` vs `<a>`?"* → `<Link>` = SPA-style client transition + prefetching; `<a>` = full page reload. Prefetching only runs in production.

---

## Part 3 — Rendering & Data (the heart of every Next.js interview) ⭐

### 3.1 The one question: **WHEN does the HTML get made?**

Every page is ultimately HTML. The whole topic is just: *when* is that HTML created, and *can we refresh it later?* There are **three** answers.

Every page visit really has **two steps**:
1. 🧁 **Make the HTML** (server runs your code, fetches data, builds HTML)
2. 🚚 **Send the HTML to the browser** (the "download")

Step 🚚 happens every visit no matter what — same speed. **All the difference is in step 🧁.**

### 3.2 The three modes

| Mode | HTML made when? | Fresh? | Speed | Analogy |
|---|---|---|---|---|
| 🗞️ **Static** (`○`/`●`) | once, at **build time**, saved as a file | frozen until you rebuild | ⚡ instant | **newspaper** — pre-printed |
| 🧁 **ISR** | at build, **then re-baked on demand (≤ once / N sec)** | refreshes every N sec | ⚡ instant | **bakery** — pre-made, re-baked periodically |
| ☕ **Dynamic** (`ƒ`) | **every visit**, fresh | always current | 🐢 slower | **barista** — made to order |

- **Static:** server just hands over a ready file. No work. Fast. But to change it you must **rebuild + redeploy**.
- **Dynamic:** server re-runs your code (🧁) on *every* visit. Always fresh, but more work every time → slower and heavier under load.
- **The slowdown of dynamic is the server RE-DOING THE WORK (🧁), not the browser re-downloading (🚚).**

### 3.3 `generateStaticParams` — the shopping list

**The idea.** For a dynamic route like `[slug]`, Next doesn't know which pages exist. `generateStaticParams` **returns the list of which pages to pre-build**. It does **NOT** render anything — it's just a list.

```tsx
export async function generateStaticParams() {
  return [{ slug: 'hydration' }, { slug: 'rsc' }, { slug: 'caching' }];
  // → Next pre-bakes /blog/hydration, /blog/rsc, /blog/caching at build time
}
```
- Replaces the old Pages Router `getStaticPaths`.
- **Misspell it** (`generateStaticParam`, no `s`) → Next silently ignores it → no list → the route becomes **dynamic (`ƒ`)**. Nothing breaks; it just quietly gets slower. (We proved this: the build flipped `●` → `ƒ`.)

**Why is it exported but never imported/called by us?** → **The framework calls you, you don't call the framework.** Next.js scans your file for **labeled exports** it recognizes (`default`, `generateStaticParams`, `generateMetadata`, `loading`, `error`…) and runs them at the right time. The *name* is the config. This is "convention over configuration." (You never call your `Page` component either — same magic.)

### 3.4 ISR — the middle ground

**The idea.** Pure static is fast but frozen; the only way to update is rebuild the whole site (fine for 3 pages, terrible for 50,000). **ISR** keeps pages pre-made **and** re-bakes them automatically on a timer — no redeploy.

The rule: **"a page may re-bake at most once every N seconds, and only when someone visits."**
- No visitors → no re-baking (it's not a background clock).
- The visitor who triggers a re-bake **does not wait** — they get the current (slightly stale) page instantly; the fresh version is built in the background for the *next* visitors. (Fancy name: **stale-while-revalidate**.)

### 3.5 Where does the content live? (code vs CMS) — the key insight 🔑

ISR only helps if content can change **without a code change**. So *where* your content lives decides everything:

- 📇 **In your code** (like our hardcoded `posts.ts`) = a **recipe card**. To change the text you edit code → **rebuild + redeploy**. ISR does nothing here.
- 🥫 **In a database / CMS** (Strapi, Contentful, Sanity…) = a **pantry**. An editor changes content in a dashboard — no code, no redeploy. The server **re-fetches** on ISR's timer and picks up the new content.

> That's *why* real apps `fetch` data from a database/CMS instead of hardcoding it — so content can change without shipping code. (This is exactly what Day 4 is about.)

### 3.6 ISR in practice — the `revalidate` line (Day 4)

**The idea.** You turn a static page into an ISR page with **one line** at the top of `page.tsx`:
```tsx
export const revalidate = 10;   // re-bake at most once every 10 seconds, on demand
```

**⚠️ Two gotchas that bite everyone:**
1. **ISR only works in `next build` + `next start` (production).** In `next dev` the page is re-rendered every request — `revalidate` is ignored. Testing ISR in dev proves nothing.
2. **`fetch` is NOT cached by default** in Next 15/16 (it *was* in v14). Opt in with `fetch(url, { cache: 'force-cache' })` or `fetch(url, { next: { revalidate: 10 } })`.

**How to SEE it (what we did).** We stamped a post with its bake-time, set `revalidate = 10`, ran production, and sampled every 3s. The `x-nextjs-cache` response header tells the truth:

| Header | Meaning |
|---|---|
| `HIT` | served from cache → timestamp **frozen** (fast) |
| `STALE` | past the 10s window → serve the **old** value now, re-bake in the background |
| `MISS` | nothing cached → built from scratch |

```
t= 4s | HIT   | 10:50:05   ┐ frozen — proof it's cached, not re-rendered
t= 8s | HIT   | 10:50:05   ┘
t=11s | STALE | 10:50:05   ← triggering visitor STILL gets old value (no wait)...
t=15s | HIT   | 10:50:17   ← ...next visitor gets the fresh one = stale-while-revalidate
```

**Debugging lesson (as important as ISR itself):** our first run looked broken — timestamp changed every request. Cause wasn't the code: a **leftover `next dev` server** was squatting on port 3000 while `next start` silently failed (`EADDRINUSE`). A `200 OK` isn't proof you're testing the right thing — the `x-nextjs-cache` header and the server log were. *When results look wrong, check your assumptions before your code.*

**Interview angle.**
- *"Does `fetch` cache by default now?"* → **No** (v15+). Opt in explicitly. (Saying "yes" reveals outdated knowledge.)
- *"How do you do ISR?"* → `export const revalidate = N`, or per-fetch `next: { revalidate: N }`. Behavior = stale-while-revalidate.

---

## Part 4 — Cheat sheets

### 🔤 Build output symbols
| Symbol | Meaning |
|---|---|
| `○` Static | pre-rendered static content |
| `●` SSG | pre-rendered using `generateStaticParams` |
| `ƒ` Dynamic | server-rendered fresh, on demand |

### 💥 Next.js 16 breaking changes (great interview bait)
- **`params` (and `searchParams`) are now Promises** → `const { slug } = await params`. Was synchronous in v14.
- **`fetch` is NOT cached by default** (v15+). It *was* in v14. Opt in: `{ cache: 'force-cache' }` or `{ next: { revalidate: N } }`.
- **Middleware is renamed "Proxy"** → `proxy.ts` (not `middleware.ts`).
- **`<Link>` no longer needs a child `<a>`** (since v13).
- `generateStaticParams` replaces `getStaticPaths`.

### 🪄 Framework "magic" labels (export the name, Next runs it)
`default` (the page) · `generateStaticParams` · `generateMetadata` / `metadata` · `loading` · `error` · `not-found` · `layout`

### 📖 Glossary
- **Hydration** — the browser re-running a Client Component to wire up interactivity onto server-rendered HTML.
- **RSC payload** — the serialized description of the UI a Server Component sends (not raw JS).
- **SSG** — Static Site Generation (pre-build pages).
- **ISR** — Incremental Static Regeneration (pre-built + auto re-baked on a timer).
- **CSR / SSR** — Client-Side / Server-Side Rendering.
- **stale-while-revalidate** — serve the old cached page instantly while rebuilding a fresh one in the background.

---

## Part 5 — 🎯 Interview Drill — Days 1–4 revision

> **Test FIRST, read SECOND.** Re-reading the guide feels productive but proves nothing — the interview tests *recall under pressure*, so practice recall. For each question below: **say the answer OUT LOUD** (interviews are spoken, and saying it exposes fuzzy spots that silent nodding hides), *then* click the answer open. Mark yourself ✅/❌ — for every ❌, go re-read that one section in Parts 1–3. Skip re-reading everything you got right.

### 5.1 The two openers — practice as 60-second spoken monologues

Almost every Next.js interview starts with one of these. Don't memorize words — memorize the **4 beats** and improvise the rest.

**Opener A — *"Explain Server Components vs Client Components."***
1. In the App Router everything is a **Server Component by default** — its JS never ships to the browser, so the bundle stays small.
2. `'use client'` opts a component into interactivity (state, events) — but it **still renders on the server first** for the initial HTML, then **hydrates** in the browser.
3. The boundary between them is **serialized** (the RSC payload) — only serializable props can cross, which is why you can't pass a function down (Server Actions are the exception).
4. Mental model: a server-rendered page with small interactive **client islands** (our `page.tsx` + `Counter`).

**Opener B — *"Walk me through Next.js's rendering strategies — when would you pick each?"***
1. One question decides everything: **when is the HTML made?** Every visit = 🧁 make-the-HTML + 🚚 download; only 🧁 differs between modes.
2. **Static** — baked once at build (`○`/`●`). **ISR** — baked at build, re-baked at most once every N seconds on visit. **Dynamic** (`ƒ`) — baked fresh per request.
3. Choose by **how often content changes** and **whether it's personalized**: marketing page → static · blog / product catalog → ISR · dashboard / cart → dynamic.
4. Bonus point: say **"stale-while-revalidate"** out loud when describing ISR — the visitor who triggers the re-bake still gets the old page instantly.

### 5.2 Rapid-fire — component model

**Q1. What does the browser actually receive for a Server Component?**
<details><summary>Answer</summary>

HTML plus the **RSC payload** (a serialized description of the UI) — the component's own JS is **never** sent. That's the whole performance win.
</details>

**Q2. What does `'use client'` actually mark?**
<details><summary>Answer</summary>

A **boundary**, not just one file: that file **and everything it imports** becomes part of the client bundle. One directive at the top of the tree is enough — you don't repeat it in children.
</details>

**Q3. True or false: a `'use client'` component only runs in the browser.**
<details><summary>Answer</summary>

**False** — it renders on the **server too** for the initial HTML, then hydrates in the browser. We *proved* this: `next build` printed the Counter's "browser" `console.log` in the terminal.
</details>

**Q4. What is a hydration mismatch, and what are the top causes?**
<details><summary>Answer</summary>

Server HTML and the first browser render **disagree**, so React warns and re-renders. Top causes: `Date.now()`, `Math.random()`, `localStorage` / `typeof window` used **during render** — server and browser produce different output.
</details>

**Q5. Why can't you pass a function as a prop from a Server to a Client Component?**
<details><summary>Answer</summary>

Props crossing the boundary are **serialized** — functions aren't serializable. Exception: **Server Actions** (Day 8).
</details>

**Q6. Can a Client Component contain a Server Component?** *(classic senior probe)*
<details><summary>Answer</summary>

Not by **importing** it — importing a component into a client file drags it into the client bundle. But you **can** pass a Server Component **as `children`** (or any prop) *through* a Client Component: `<ClientWrapper><ServerThing /></ClientWrapper>`. The server renders `ServerThing` first and hands the result down.
</details>

### 5.3 Rapid-fire — routing & navigation

**Q7. What makes a folder become a URL?**
<details><summary>Answer</summary>

A `page.tsx` inside it. Folder name = URL segment. No `page.tsx` → no route.
</details>

**Q8. `[slug]` vs `[...slug]` vs `[[...slug]]` vs `(group)` — go.**
<details><summary>Answer</summary>

`[slug]` one segment · `[...slug]` catch-all, one-or-more segments (not the bare path) · `[[...slug]]` optional catch-all, zero-or-more (matches the bare path too) · `(group)` organizes files, adds **no** URL segment.
</details>

**Q9. How do you read the slug inside the page in this Next.js version?**
<details><summary>Answer</summary>

`const { slug } = await params` — since Next 15, **`params` is a Promise** (plain object in v14). Answering "just `params.slug`" flags outdated knowledge.
</details>

**Q10. `<Link>` vs `<a>` — what's actually different?**
<details><summary>Answer</summary>

`<Link>` does a **client-side transition** — swaps content, no full reload, state survives — and **prefetches** links (production only). `<a>` triggers a full browser reload: white flash, all JS state wiped, everything re-downloaded. We felt this by putting one deliberate `<a>` in the Nav.
</details>

**Q11. Why did our `Nav.tsx` need `'use client'`?**
<details><summary>Answer</summary>

It calls `usePathname()` — a **hook**, and hooks only work in Client Components. `<Link>` alone would *not* have required it.
</details>

**Q12. What happens to the layout when you navigate between pages?**
<details><summary>Answer</summary>

It **persists** — only the `{children}` (page) part swaps. The layout doesn't remount, so state inside it (e.g. text typed in a search box in the Nav) survives navigation. That's a key practical difference from a full reload.
</details>

### 5.4 Rapid-fire — rendering, SSG & ISR

**Q13. What does `generateStaticParams` do — and does it render anything?**
<details><summary>Answer</summary>

It returns **the list of slugs to pre-bake** at build time — nothing more. It renders nothing. And *you* never call it: Next.js scans for the labeled export and calls it ("the framework calls you"). It replaces the old `getStaticPaths`.
</details>

**Q14. You misspell `generateStaticParams`. What happens?**
<details><summary>Answer</summary>

**Nothing errors.** Next silently ignores the unknown export, gets no list, and the route quietly flips from `●` (SSG) to `ƒ` (dynamic) — same content, just slower and rebuilt per request. We proved this by misspelling it and rebuilding. Great example of "convention over configuration" biting.
</details>

**Q15. A visitor hits a slug that's NOT in your list. What happens?**
<details><summary>Answer</summary>

Two layers: in **our code**, `getPost` returns `undefined` → we call `notFound()` → real 404 page + 404 status (verified). Beyond that, Next's default is to try rendering unknown slugs **on demand** and cache the result — the `dynamicParams` config controls that (we haven't demoed this one yet; on the Day 5 list).
</details>

**Q16. `export const revalidate = 10` — describe the exact behavior.**
<details><summary>Answer</summary>

The page may re-bake **at most once every 10 seconds, and only when someone visits** — no visitors, no re-baking (it's not a background clock). The triggering visitor **doesn't wait**: they get the current (stale) page instantly; the fresh one bakes in the background for the *next* visitor. Name it: **stale-while-revalidate**. We watched this live via the frozen-then-jumping timestamp.
</details>

**Q17. Does `fetch` cache by default?**
<details><summary>Answer</summary>

**No — not since v15** (it did in v14). Opt in per-call: `{ cache: 'force-cache' }` or `{ next: { revalidate: N } }`. This is the single most common stale-knowledge trap in Next.js interviews right now.
</details>

**Q18. Why does ISR look broken in `next dev`?**
<details><summary>Answer</summary>

Dev re-renders **every request** and ignores `revalidate`. ISR only exists in production: `next build` + `next start`. Testing ISR in dev proves nothing.
</details>

**Q19. How do you PROVE a page came from the cache rather than being re-rendered?**
<details><summary>Answer</summary>

Evidence, not vibes: the **`x-nextjs-cache` response header** — `HIT` (served from cache), `STALE` (past the window; old page served, re-bake in background), `MISS` (built from scratch) — plus a bake-time timestamp that stays **frozen** across requests.
</details>

**Q20. Pick the mode: docs site · product listing page · bank dashboard.**
<details><summary>Answer</summary>

Docs → **static** (rarely changes, same for everyone). Product listing → **ISR** (changes hourly-ish, same for everyone, must be fast). Bank dashboard → **dynamic** (personalized + must be current — caching it would be a bug). The two axes: *change frequency* and *personalization*.
</details>

### 5.5 🪤 Trap questions — they're checking if your knowledge is current

| The bait | The correct response |
|---|---|
| "Just read `params.slug` directly" | Next 15+: `params` is a **Promise** — `await` it |
| "`fetch` is cached by default" | Not since v15 — you opt in explicitly |
| "`<Link>` needs an `<a>` child" | Not since v13 |
| "Add it to `middleware.ts`" | Renamed in v16: it's **Proxy** → `proxy.ts` |
| "`'use client'` skips the server" | No — server-renders first, then hydrates |
| "ISR re-bakes on a background timer" | No — only **on a visit** after the window expires |

### 5.6 The war story — behavioral-round gold

*"Tell me about a tricky bug you debugged"* — you already have a real one. Tell it in STAR shape:

- **Situation:** Testing ISR locally — the bake-timestamp changed on *every* request, as if caching didn't exist.
- **Task:** Decide: is the code wrong, or is the test wrong?
- **Action:** Didn't touch the code. Checked the evidence instead: the server log showed `next start` had actually **failed with `EADDRINUSE`** — a leftover `next dev` process was squatting on port 3000, so every request was hitting the dev server (which ignores `revalidate`). Found the listener PID with `netstat -ano`, killed it, re-ran production.
- **Result:** Caching worked all along. **Lesson (say this sentence):** *"A 200 OK doesn't prove you're talking to the server you think you are — I verify assumptions with headers and logs before changing code."* That last sentence is exactly what senior interviewers want to hear.

### 5.7 Prove-it-in-code — the Razorpay machine-coding rep

The real test of Days 1–4 is whether you can rebuild the pattern **cold**. Without peeking at `src/app/blog/`, build `/projects/[id]` from scratch — time-box: **25 minutes**:

1. `projects.ts` — mock array of 3 projects (`id`, `name`, `description`).
2. `/projects` index page (Server Component) linking to each project.
3. `[id]/page.tsx` — `await params`, look up the project, `notFound()` for unknown ids, `generateStaticParams` for the list.
4. Add `export const revalidate = 30` + a baked-at timestamp.

**Passing bar — observe all three, "it renders" is not enough:**
- [ ] `next build` shows `/projects/[id]` as `●` (SSG)
- [ ] Misspell `generateStaticParams`, rebuild → flips to `ƒ` (then fix it back!)
- [ ] `next build` + `next start`, hit the page twice within 30s → same timestamp + `x-nextjs-cache: HIT`

---

## ➡️ What's next
**Day 5 — Rendering strategies recap (CSR / SSR / SSG / ISR / PPR).** We'll put all the modes side by side — including the two we haven't formally named yet (plain client-side rendering, and Partial Prerendering) — so you can answer *"walk me through Next.js's rendering options and when you'd pick each"* cold. That's a near-guaranteed interview opener.
