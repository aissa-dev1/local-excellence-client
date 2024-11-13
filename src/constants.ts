export const API_URL_VERSION = {
  root: "v1",
  users: "v1",
  auth: "v1",
  stores: "v1",
  products: "v1",
  sponsors: "v1",
} as const;

export const GAP_SIZE = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
} as const;

export const SPACING_Y_SIZE = {
  none: "space-y-0",
  xs: "space-y-1",
  sm: "space-y-2",
  md: "space-y-4",
  lg: "space-y-6",
  xl: "space-y-8",
  "2xl": "space-y-12",
} as const;

export const SPACING_X_SIZE = {
  none: "space-x-0",
  xs: "space-x-1",
  sm: "space-x-2",
  md: "space-x-4",
  lg: "space-x-6",
  xl: "space-x-8",
  "2xl": "space-x-12",
} as const;

export const CURRENCY = {
  DZD: {
    ltr: "DA",
    rtl: "د.ج",
  },
} as const;
