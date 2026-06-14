# Plan: A polished, on-brand UI

1. Tokens first: define colour, type, spacing, and radius as `:root` custom
   properties in `styles.css`; load Space Grotesk and JetBrains Mono in
   `index.html`.
2. Shell: restyle the top bar with the lime caret mark, a mono wordmark, and
   mono nav with an active state.
3. List: build the loading, empty, and populated states; row = mono id, title,
   status pill, assignee chip or assign action, mono date; status edge on hover.
4. Form: one panel, labeled fields, dark inputs with a lime focus ring, a
   primary action and a cancel link, validation in danger.
5. Quality floor: focus-visible rings, responsive to 360px, reduced-motion.
6. Verify against the acceptance criteria; change no component logic.
