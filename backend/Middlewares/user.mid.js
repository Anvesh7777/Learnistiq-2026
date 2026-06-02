import jwt from "jsonwebtoken";
import config from "../config.js";

function userMiddleware(req, res, next){
    const authHeader=req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("No token provided");
        return res.status(401).json({errors: "No token provided "});
    }
    const token=authHeader.split(" ")[1];
    try {
      const decoded=jwt.verify(token,config.JWT_USER_PASSWORD);     
      req.userId=decoded.id;
      next();
    } catch (error) {
        console.log("Token verification error:", error.message);
        return res.status(401).json({errors: "Invalid token or expired"});
    }
}

export default userMiddleware;
