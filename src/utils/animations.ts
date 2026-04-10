import type { Variants, Transition } from 'motion/react';

// ─── Text reveal (word by word) ─────────────────────────────────────────────
export const wordRevealContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 30, rotateX: -40, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 80, damping: 20 },
  },
};

// ─── Line reveal (line by line) ─────────────────────────────────────────────
export const lineRevealContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

export const lineReveal: Variants = {
  hidden: { opacity: 0, y: 60, skewY: 2 },
  show: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Entrance variants ──────────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 70, damping: 20, duration: 0.8 },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 80, damping: 22 },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Container stagger ──────────────────────────────────────────────────────
export function stagger(delay = 0, staggerChildren = 0.08): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren, delayChildren: delay } },
  };
}

// ─── Reusable transitions ───────────────────────────────────────────────────
export const spring: Transition = { type: 'spring', stiffness: 70, damping: 20 };
export const springFast: Transition = { type: 'spring', stiffness: 200, damping: 28 };
export const smoothEase: Transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

// ─── Card hover preset ──────────────────────────────────────────────────────
export const cardHover = {
  y: -8,
  scale: 1.03,
  transition: { type: 'spring', stiffness: 300, damping: 25 },
};
export const cardTap = { scale: 0.97 };

// ─── Number reveal ──────────────────────────────────────────────────────────
export const numberReveal: Variants = {
  hidden: { opacity: 0, scale: 0.5, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 60, damping: 15, duration: 1 },
  },
};
