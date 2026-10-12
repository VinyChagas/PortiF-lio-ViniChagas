export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const motionDuration = {
  micro: 0.4,
  element: 0.8,
  reveal: 1.15,
} as const;

export const revealTransition = {
  duration: motionDuration.element,
  ease: easeOutExpo,
};
