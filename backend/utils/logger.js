/**
 * Simple logger utility wrapping console.* so it's easy to swap later.
 * You can extend to use winston/pino and structured logs.
 */
export const logger = {
  info: (...args) => console.log("[INFO]", ...args),
  warn: (...args) => console.warn("[WARN]", ...args),
  error: (...args) => console.error("[ERROR]", ...args),
  debug: (...args) => {
    if (process.env.NODE_ENV !== "production") {
      console.debug("[DEBUG]", ...args);
    }
  },
};

export default logger;
