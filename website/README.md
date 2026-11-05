# Standout — homepage

Next.js 15 · React 19 · Tailwind CSS 4 · GSAP ScrollTrigger · Lenis · React Three Fiber · Zustand

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

Fonts (Funnel Display, Geist, Geist Mono) are loaded with `next/font/google`, so the first build needs internet access.

## What's in this build

Sections 1–4 run on one fixed WebGL field of 140 nodes. Each section registers a scroll "segment" that morphs the field into its own formation. From Lead flow down, the field settles to a quiet background grid and each section draws its own animation on a canvas inside the section, so it scrolls with its content and can never drift out of line:

| Section | Field formation | Interaction |
| --- | --- | --- |
| Opening | (page hidden) | `OpeningIntro`: once per visit, the STANDOUT wordmark fills the screen, the orange O starts large and high, zooms out into the word, then the mark shrinks and flies into the header logo and crosses over to it. The page is held hidden (`html.intro-wait`, set before first paint) until it lands; skipped with reduced motion |
| 1 · Hero | scatter / stand / converge | Auto slider: Pre-Event / At the Event / Post-Event loops every 6 s; the headline and support copy change per slide (`SLIDES` in `Hero.tsx`) with a progress bar on the active tab (holds while the tabs are hovered or the page is scrolled; picking a slide restarts its timer). Slide 2 lifts one orange node out of the stand; slide 3 sends one orange lead out of the channel. Cursor push and tilt; cursor push and tilt. Animated visitors walk the floor: they wander, gather at the stand and get scanned, then leave as orange leads. Hover anyone for their visitor tag |
| Intersection 1 | grid | Pinned (`HeroIntro`); headline clips away, the field goes dark, the "Who we are" statement (`AgencyIntro`, a layer in the stage) brightens in word by word from a dull glow, holds, and lifts away; the field returns as a grid, ready for Services. |
| Case studies (after Services) | dark | `CaseStudy`: two films side by side, each with a drifting poster and play button; one plays at a time, in place with native controls, and pauses when scrolled away. Under each: show, client, one line and one figure. Five portrait films in `public/video/` (Imtiaz launch, BCH:CLB, 3DB at the Desert Classic, two REFLO merch-tent clips); the homepage shows the ones flagged `home` in `lib/case-studies.ts`, the Case studies page shows all; lines and figures are drafts |
| 2 · How we work (after Case studies) | rest → grid | Pinned (`StoryIntro`); nodes fly from the service hubs into a grid, a solid ground fades in behind four solid cards; the orange border moves card to card on scroll. Each card has a line icon above its heading (`public/icons/how-*.png`, drawn as a CSS mask so it turns orange on hover) |

| 3 · Services | (field dark) | Layout F: a centred stack of ten cards, one per service (photograph, name, one line, "See the service"); each card sticks under the header and the next slides over it. Every card links to that service's page |
| Intersection 2 + Packages | 3 constellations | No pin. As the cards scroll in, the nine service hubs fly apart into three constellations inside the card windows; window centres are measured every frame and the nodes ride with the cards. 360 orbits; hovering a card turns its constellation orange. The field then settles to a quiet grid. Compare and build-your-own sheet |
| 5 · Lead flow | quiet grid behind; own stream canvas (`LeadStream`) | No pin. Stream, gates, labels and visitors share one stage box. Sliders drive the stream and the numbers; leads turn orange |
| 6 · CTA | own particle canvas (`CtaParticles`) | Particles gather round the button and turn orange as it reaches mid-screen. Magnetic button opens the brief form |
| Footer | quiet grid | Contact placeholders, big wordmark |

With reduced motion there are no pins, smooth scroll, canvas or auto-advance; every section stacks. Only the intro, Services and How we work pin; everything below scrolls normally at every screen size.

Copy, package inclusions and simulator defaults are placeholders to confirm. Contact details are in `CONTACT` in `lib/content.ts`.

## Homepage option 2

`/option-2` is a second homepage built to the "Website Design & Development Brief": a light, minimal editorial layout led by exhibition photography, with the six service categories from the brief (unnumbered; deliverables as pills), a short approach band, example results and a closing call to action. Motion: hero words rise on load, photographs wipe in and drift with parallax, images ease larger on hover, and the sector strip is a slow marquee (`components/option2/Reveal.tsx`). Native scroll, no WebGL; the brief form is shared with option 1. Photographs come from `PHOTOS` in `lib/assets.ts` (the same set as option 3; each service names its `src` in `lib/option2-content.ts`). `PhotoPlate` falls back to a captioned navy plate when no `src` is given. Copy outside the brief, the example figures and the sector list are drafts.

Single-file builds for review (output in `../prototype/build*`), run from this folder:

```bash
npx vite build --config tools/prototype-build/vite.config.ts                 # option 1
ENTRY=option2 npx vite build --config tools/prototype-build/vite.config.ts   # option 2
```

## Homepage option 3

`/option-3` is option 1 with the client's exhibition photography (`public/photos/`, served through `PHOTOS` in `lib/assets.ts`): the handshake dimmed behind the closing line, and the photographs on the Services cards and the case studies. It is the same `HomePage` component with `photos` on. Build the single file with `ENTRY=option3`.

## Services and service pages

Ten services (`lib/content.ts`), shown on the homepage as the card stack (`components/sections/ServicesF.tsx`; this is the chosen layout, the earlier A to E layouts and the review switch are gone). Each service has its own page at `/services/<slug>` (`app/(main)/services/[slug]/page.tsx`, rendering `components/ServicePage.tsx`): hero with the photograph and 3D icon, "What you get" (the deliverables and one figure), "How it works" in three steps, three related services, previous / next, and the brief form. Page copy lives in `lib/service-pages.ts` (slug, eyebrow, headline, intro, steps, stat, related). The service drawer (used from the packages) links to the full page.

In the single-file previews there is no server, so a service page opens in place from the hash (`#service-<slug>`, handled by `tools/prototype-build/App.tsx`), and the back button or the logo returns to the homepage. `lib/routes.ts` gives each link the right form for the Next site or the preview.

## Inner pages and navigation

Besides the homepage and the service pages there are four pages, each with the shared chrome in `components/PageShell.tsx` (header, footer, brief form, dark background field) and a Next route under `app/(main)/`:

- **Packages** (`/packages`, `components/pages/PackagesPage.tsx`): the three packages in full with a CTA each, a side-by-side table with a "My show" column that builds a custom selection, and four questions.
- **Case studies** (`/case-studies`, `components/pages/CaseStudiesPage.tsx`): all five films (portrait, in `public/video/`; in the single-file preview they are served beside the page from `prototype/build-option3/video/` rather than inlined), each with the client, show, one line and one figure. Data in `lib/case-studies.ts`, shared with the homepage section; lines and figures are drafts to confirm.
- **Insights** (`/insights` and `/insights/<slug>`, `components/pages/InsightsPage.tsx`): the blog listing with a featured piece and a topic filter, and one page per article. Six draft articles in `lib/insights.ts`; replace with the team's own writing.
- **About** (`/about`, `components/pages/AboutPage.tsx`): why Standout exists with the four figures, six reasons to choose Standout, six team members (portraits in `public/team/`, roster in `TEAM` in the page file), the office and a CTA. Copy is a draft.
- **Contact** (`/contact`, `components/pages/ContactPage.tsx`): the brief form on the page (`components/BriefForm.tsx`, also used by the bottom sheet), the office details with a Google Maps link, and what happens next.

The header (`components/SiteHeader.tsx`) has a **Services** dropdown grouped before / at / after the show, links to the five pages, and on phones a menu button that opens a full-screen list. In the previews the pages open from the hash (`#page-packages`, `#page-case-studies`, `#page-insights`, `#page-about`, `#page-contact`, `#insight-<slug>`), handled by `tools/prototype-build/App.tsx` through `lib/routes.ts`.

## File map

| File | Role |
| --- | --- |
| `app/layout.tsx` | Fonts and global CSS |
| `app/(main)/layout.tsx` | Option 1 only: persistent `FieldLayer`, `Cursor`, `SmoothScroll` |
| `app/option-2/page.tsx` | Homepage option 2 (`components/option2/*`) |
| `app/(main)/option-3/page.tsx` | Homepage option 3: `HomePage` with `photos` |
| `lib/photos-context.tsx` | The `photos` switch read by `FinalCTA` and the services layout switch |
| `app/globals.css` | Brand tokens (`@theme`), the Lift utility, stage layout, reduced-motion rules |
| `app/(main)/page.tsx` | Renders `HomePage` (option 1) |
| `components/HomePage.tsx` | Section order, overlays, scroll lock |
| `lib/field-store.ts` | Zustand store: hero formation, scroll segments (`resolveMorph`), hover state, measured DOM targets, simulator inputs |
| `lib/ui-store.ts` | Selected services, drawer / compare / contact state, Lenis instance, `scrollToId` |
| `lib/content.ts` | Services and packages copy (working draft) |
| `lib/option2-content.ts` | Option 2 copy: hero, six services, approach, example results |
| `lib/webgl.ts` | WebGL availability check; without it the field falls back to still constellations |
| `tools/prototype-build/` | Vite config and shims that bundle either homepage into one HTML file |
| `lib/formations.ts` | All formations, ray pairs, dim and ray strength. `GRID`, `HUB_Y`/`hubX`, `PIPE` are shared with the DOM |
| `components/field/NodeField.tsx` | Per-frame springs, cursor push, rays, tilt, orange lifted node |
| `components/field/FieldCanvas.tsx` | R3F canvas, reads the pointer from `document.body`, adaptive DPR |
| `components/field/FieldLayer.tsx` | Lazy-loads the canvas behind a static SVG poster |
| `components/SmoothScroll.tsx` | Lenis synced to the GSAP ticker and ScrollTrigger |
| `components/Cursor.tsx` | Orange ring cursor; grows into a label over `[data-cursor]` |
| `components/OpeningIntro.tsx` | Opening wordmark animation (plays once per session) |
| `components/SiteHeader.tsx` | Fixed header with wordmark (`data-site-logo`, the intro's landing target), nav and CTA |
| `components/sections/Hero.tsx` | Section 1 content and toggle state |
| `components/sections/PhaseToggle.tsx` | Accessible segmented control |
| `components/sections/StoryGrid.tsx` | Section 2: solid ground and the four step cards |
| `components/sections/HeroIntro.tsx` | The pinned scroll timeline for the hero and the "Who we are" statement |
| `components/sections/StoryIntro.tsx` | The pinned scroll timeline for How we work, placed after Case studies |
| `components/sections/AgencyIntro.tsx` | "Who we are" statement; a layer inside the pinned intro, driven by `HeroIntro` |
| `components/sections/CaseStudy.tsx` | Two video case studies (`CASES` holds the copy; films and posters in `CASE_STUDY_FILMS`, `lib/assets.ts`) |
| `components/sections/ServicesD.tsx` | Services layout D (option 3): photo billboards with overlapping offer cards and a sticky chapter bar |
| `components/sections/ServicesF.tsx` | Services: the centred card stack (the chosen layout) |
| `components/ServicePage.tsx` | A single service page; `lib/service-pages.ts` holds the copy, `lib/routes.ts` the link forms |
| `app/(main)/services/[slug]/page.tsx` | The ten service routes |
| `components/sections/Services.tsx` | Horizontal track, hub labels, live connection line; `photos` prop is layout E |
| `components/sections/Packages.tsx` | Package cards; tracks the card windows for the constellations |
| `components/sections/LeadFlow.tsx` | Simulator inputs, stage markers, results |
| `components/sections/FinalCTA.tsx` | Closing line and button |
| `components/SiteFooter.tsx` | Footer |
| `components/overlays/*` | Service drawer, compare sheet, contact sheet, selection tray |
| `components/ui/*` | Sheet (modal panel + scroll lock), magnetic button |
| `components/icons/ServiceIcon3D.tsx` | Rendered 3D service icons (layout A cards and the service drawer); float, lift on hover |
| `tools/service-renders/` | three.js models and script that render the nine 3D icons |
| `components/icons/ServiceIcon.tsx` | Nine custom service icons, one line system with an orange accent each |
| `components/people/Crowd.tsx` | Animated visitors on a 2D canvas (`mode="hero"` / `"flow"`) |
| `components/people/LeadStream.tsx` | Lead-flow particle stream, drawn inside its stage box |
| `components/people/Constellation.tsx` | Still constellation for reduced motion |
| `components/people/CtaParticles.tsx` | Particles that gather round the closing button |

## Tuning

- Spring feel: `STIFF` / `DAMP` in `NodeField.tsx`
- Pin lengths: `end: '+=125%'` in `HeroIntro.tsx`, `'+=130%'` in `StoryIntro.tsx`
- Grid density and inset: `GRID` in `formations.ts`.
- Copy is a working draft; swap in approved lines.

## Services (ten)

S/07 Exhibition hosts and hostesses was added as a tenth service, between Digital presentations and Photography. It has its own 3D icon (`hosts()` in `tools/service-renders/index.html`, rendered to `public/icons/services/svc-hosts.webp`), a photograph for layout E, a live vignette in layout B, and is a real service in the C and D chapters, so it can be added to a show plan like the others. `SERVICE_COUNT` in `lib/formations.ts` is 10, so the field draws ten hubs.
