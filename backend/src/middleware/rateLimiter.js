import ratelimit from "../config/upstash.js";

export const rateLimiter = async (req, res, next) => {
  try {
    // Identify user by IP (works locally too)
    const identifier = req.headers["x-forwarded-for"]?.split(",")[0] || req.ip;

    const result = await ratelimit.limit(identifier);

    console.log("Rate limit result:", result); // remove later

    if (!result.success) {
      return res.status(429).json({
        message: "Too many requests",
      });
    }

    next();
  } catch (error) {
    console.error("rateLimiter error:", error);
    next(error);
  }
};
