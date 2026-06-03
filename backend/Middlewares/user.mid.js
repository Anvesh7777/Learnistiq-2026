import jwt from "jsonwebtoken";
import config from "../config.js";

const userMiddleware = (
  req,
  res,
  next
) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith(
        "Bearer "
      )
    ) {
      return res.status(401).json({
        success: false,
        code: "NO_TOKEN",
        errors:
          "Authentication token is required",
      });
    }

    const token =
      authHeader.split(
        " "
      )[1];

    const decoded =
      jwt.verify(
        token,
        config.JWT_USER_PASSWORD
      );

    req.userId =
      decoded.id;

    next();
  } catch (error) {
    console.log(
      "Token verification error:",
      error.message
    );

    if (
      error.name ===
      "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        code: "TOKEN_EXPIRED",
        errors:
          "Session expired. Please login again.",
      });
    }

    if (
      error.name ===
      "JsonWebTokenError"
    ) {
      return res.status(401).json({
        success: false,
        code: "INVALID_TOKEN",
        errors:
          "Invalid authentication token",
      });
    }

    return res.status(401).json({
      success: false,
      code: "AUTH_ERROR",
      errors:
        "Authentication failed",
    });
  }
};

export default userMiddleware;