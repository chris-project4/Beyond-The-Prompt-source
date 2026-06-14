# Spec: A polished, on-brand UI

## Intent
The issue tracker should look like a considered product, not a generic
AI-generated dashboard. This is a visual layer over the existing features; no
behavior changes. The look is the book's identity, Signal Lime: near-black
surfaces, a lime accent, an orange secondary, and a grotesk + mono type system.

## What "not generic" means here (anti-patterns to avoid)
- No Inter or default system-sans as the primary face; no purple/indigo accent.
- No gradient buttons, no card drop-shadows floating on a flat grey page.
- No emoji used as icons.
- Colour is functional, not decorative: lime marks the primary action and
  focus, orange marks an assignee. Nothing is coloured just to fill space.

## Design tokens
- Colour: bg #0A0A0F, surface #14141B, border rgba(244,247,250,0.08),
  text #F4F7FA, muted #9A9AA6, lime #A3E635 (primary), orange #FB923C
  (assignee), danger #F87171.
- Type: Space Grotesk for display and UI; JetBrains Mono for data (issue ids,
  dates, status, labels, nav). Mono-for-data is the engineered signature.
- Spacing on a 4px scale; radius 8 to 10px; hairline borders instead of shadows.
- Signature: the lime caret ">" from the book cover, used as the product mark
  and as the empty-state hero.

## User journey (unchanged behavior, new surface)
The list reads as a scannable register: a mono id, the title, a status pill, an
assignee chip or an "Assign to me" action, and a date. Empty and loading states
are first-class. The create form is a single calm panel with a clear primary
action.

## Acceptance criteria
1. Every colour and font in the UI comes from the tokens above; there are no
   one-off hex values or stray font families in component templates.
2. The list has distinct, designed states for loading, empty, and populated;
   the empty state offers the primary action.
3. Open and closed issues are distinguishable without reading the status text
   (status edge and pill), and an assigned issue shows its assignee as an
   orange chip.
4. Interactive elements have a visible keyboard focus ring (lime), and the
   layout is usable down to a 360px-wide screen.
5. Motion is subtle and respects prefers-reduced-motion.
6. No behavior changed: the same service calls, the same routes, the same data.

## Anchors & reuse
Restyle the existing components and `styles.css`; do not rebuild the logic, the
service, or the routes. By this point the project is brownfield, so this is an
anchoring job: the tokens live in `styles.css` and every component draws from
them.

## Open questions
None. Dark is the only mode for now.
