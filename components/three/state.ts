/**
 * Tiny shared stores for pointer + scroll state.
 * Written by the DOM layer, read inside the render loop — no React
 * re-renders while the mouse moves or the page scrolls.
 */

export const pointerState = { x: 0, y: 0 };

export const scrollState = {
  /** 0 → 1 across the first viewport (drives the astronaut exit). */
  hero: 0,
  /** 0 → 1 across the whole document. */
  page: 0,
};
