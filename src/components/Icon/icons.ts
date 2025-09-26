export const ICON_NAMES = {
  SEARCH: 'search',
  CLOSE: 'close',
  SUN: 'sun',
  MOON: 'moon',
} as const;

export type IconName = typeof ICON_NAMES[keyof typeof ICON_NAMES];
