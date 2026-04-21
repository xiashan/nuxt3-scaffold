import { getMethod, setResponseStatus } from "h3";

export default defineEventHandler((event) => {
  const method = getMethod(event).toUpperCase();
  const {
    security: { allowOptionsMethod = false },
  } = useRuntimeConfig();

  if (method === "TRACE" || method === "TRACK") {
    setResponseStatus(event, 405);
    return {
      success: false,
      message: "Method not allowed",
    };
  }

  if (method === "OPTIONS" && !allowOptionsMethod) {
    setResponseStatus(event, 405);
    return {
      success: false,
      message: "Method disabled",
    };
  }
});
