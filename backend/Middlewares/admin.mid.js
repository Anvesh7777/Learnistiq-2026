import jwt from "jsonwebtoken";
import config from "../config.js";

function adminMiddleware(req, res, next){
    const authHeader=req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({errors: "No token provided "});
    }
    const token=authHeader.split(" ")[1];
    try {
      const decoded=jwt.verify(token,config.JWT_ADMIN_PASSWORD) ;     
        req.adminId = decoded.id;
        console.log("TOKEN:", token);
console.log(
  "JWT_ADMIN_PASSWORD:",
  config.JWT_ADMIN_PASSWORD
);
      next();
    } catch (error) {
        return res.status(401).json({ errors: "Invalid token or expired" });
        console.log(
  "VERIFY ERROR:",
  error.message
);
        console.log("Invalid token or expired token: " + error);
    }
}

export default adminMiddleware;

