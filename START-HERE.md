# STANDOUT: project handoff

This bundle holds everything from the working sessions on the Standout brand and homepage, up to 28 October 2026. To continue in another Claude account:

1. Start a new chat and attach this zip.
2. Paste the brief below as your first message.

---

## Paste this into your new chat

> I'm continuing a project from another session. The attached zip has everything. Read `START-HERE.md` first, then `website/README.md`, then `blueprint.md`. Open `prototype/standout-homepage-prototype.html` to see the current site.
>
> **Client:** STANDOUT is a one-stop exhibition marketing agency. It covers stand graphics, print, email, paid ads, landing pages, presentations, photo and video, lead capture and post-event nurture.
>
> **Logo (approved: Concept 01 "The Lift"):** a Funnel Display ExtraBold wordmark with hand-set spacing. The O is raised 18% of the cap height and coloured Signal Orange. The symbol is the raised O over a baseline bar. Final SVGs are in `logo/concept-01-final/`.
>
> **Palette:** Hall Black #050A18, Show Night #0A1633 (navy), Signal Orange #FF5A1F (the one accent), Mist #E3E8F4 (text), Steel #8C97B4 (quiet text). **Type:** Funnel Display (headlines), Geist (body), Geist Mono (labels).
>
> **Website:** Next.js 15, React 19, Tailwind 4, GSAP ScrollTrigger, Lenis, React Three Fiber and Zustand, in `website/`. The section order, top to bottom:
> 0. **Opening intro:** once per visit, a big STANDOUT wordmark with the orange O large and lifted; the O zooms out into the word, then the mark shrinks and flies into the header logo. Skipped with reduced motion.
> 1. **Hero:** an auto slider (Pre-Event / At the Event / Post-Event) that loops every 6 s. The headline and support line change per slide (slide 1: "Your Event Journey, Managed by One Team" with the agreed positioning text; slide 2: "Don’t just exhibit. Stand out."; slide 3: "The show closes. Your pipeline opens."), swapping with a clip reveal; `SLIDES` in `components/sections/Hero.tsx`. An orange progress bar runs under the active tab, it pauses on hover or scroll, and clicking a tab restarts the timer. A WebGL node field changes shape per slide. Slide 2 lifts one orange node out of the stand; slide 3 sends one orange "lead" dot out of the converging lines. Animated visitors walk the floor.
> 2. **Who we are:** inside the pinned intro, after the headline leaves, the node field goes dark and the agency statement ("We’re your all-in-one creative event team…") brightens in word by word from a dull glow, holds, then dissolves; the field returns as a grid.
> 3. **Services** (see 4), then **How we work:** its own pinned stage after Services: the field flies from the service hubs into a grid, four solid cards (Prepare, Promote, Perform, Profit) with line icons; the orange border moves card to card on scroll.
> 3a. **Case studies:** two films side by side (poster drifts, click to play in place), each with show, client, one line and one figure. Both films are placeholders cut from the photos; swap in the real films in `website/public/video/` and update `CASES` in `CaseStudy.tsx`.
> 3b. **Numbers band:** four figures that count up: 150+ events delivered, 50+ brands supported, 10+ years of experience, 360° event solutions. "Get in touch" is a quiet outline button.
> 4. **Services (ten, including S/07 Exhibition hosts and hostesses):** a centred stack of cards, one per service with its photograph, that overlap as you scroll (this is the chosen layout; the earlier A to E layouts and the review switch have been removed). Each card links to a **single service page** (`/services/<slug>`, `website/components/ServicePage.tsx`, copy in `lib/service-pages.ts`): hero, what you get, how it works, related services and the brief form. In the single-file previews these pages open in place from the hash.
> 5. **Packages:** no pin. The node field flies into constellations inside each card window. Window centres are measured every frame, so it works at any screen height.
> 6. **Lead flow:** sliders drive a particle stream on its own canvas inside the section, with no pin.
> 7. **Closing call to action:** particles gather round the orange "Plan your show" button, on their own canvas.
> 8. **Footer.**
>
> **Homepage option 2** (`website/app/option-2`, `prototype/build-option2/`): a light editorial alternative built to a separate brief, with the headline "Make Every Exhibition Count.", six service categories (stand branding, digital marketing, hosts and hostesses, photography and video, lead capture, post-event nurturing), an approach section, example results and a closing call to action. Photography uses the supplied show photographs (`website/public/photos/`), mapped per service in `lib/option2-content.ts`.
>
> **Homepage option 3** (`website/app/(main)/option-3`, `prototype/build-option3/`): option 1 with five client-supplied photographs (`website/public/photos/`) behind the closing line, plus three more Services layouts on the layout switch: **D** (promotional billboards with overlapping offer cards and a sticky chapter bar) **E** (layout A's pinned track with a photograph on each card instead of the code, phase tag and 3D icon) and **F** (a centred stack of service cards that overlap as you scroll).
>
> **Feedback I've already given (please keep to it):**
> - No glossy or neon effects.
> - No grid or check lines in the How we work section; solid cards, with a border highlight on scroll only.
> - Fewer dots behind the hero text.
> - Real photos were tried and reverted.
> - The service cards must not flip on hover.
> - Animations must work on short laptop screens and phones, so avoid pins that cut content off.
> - Don't overuse orange: secondary buttons are outlined.
> - Earlier I rejected an electric-blue palette, hand-drawn letters and plain off-the-shelf type.
>
> **Still placeholder:** service and package copy, package inclusions, the case studies (clients, figures, films), and simulator defaults. The contact form doesn't submit anywhere yet.
>
> Next I'd like to: [describe what you want to do next]

---

## What's in the bundle

| Path | What it is |
| --- | --- |
| `START-HERE.md` | This file |
| `prototype/standout-homepage-prototype.html` | The whole current site in one HTML file. Open it in Chrome; it needs internet for fonts |
| `website/` | Next.js source. Run `npm install`, then `npm run dev`. `website/README.md` has the section table, file map and tuning notes |
| `website/tools/service-renders/` | three.js models and render script for the nine 3D service icons |
| `previews/3d-service-icons.png` | All nine 3D service icons on navy |
| `blueprint.md` | The original homepage blueprint (concept, interactions, technical guide). Some sections have changed since; the README is the current truth |
| `diagrams/` | Blueprint diagrams (scroll journey, architecture) |
| `logo/concept-01-final/` | Approved logo: wordmark (colour, reversed, black, white) and symbol. Outlined vectors |
| `logo/explorations/` | Concepts 02 and 03, for reference only |

## Open questions for Standout

- Services layout A or B?
- Real figures for the numbers band and the lead-flow simulator defaults
- Which services belong in Essentials, Marketing and 360, and whether to show prices
- Approved copy, plus photography and video from past shows
- Where form submissions should go (CRM or inbox), and whether a CMS is needed
