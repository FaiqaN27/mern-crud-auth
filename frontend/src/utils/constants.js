// API base URL - automatically handles dev/prod
export const API_BASE_URL = import.meta.env.VITE_API_URL || "";

// Development check
export const IS_DEV = import.meta.env.DEV;
