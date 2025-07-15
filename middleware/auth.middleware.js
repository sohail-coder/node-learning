const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const authorize = (...permission) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(401).json({ msg: "Unauthorized: No token provided" });
      const token = authHeader.split(" ")[1];

      if (!token) {
        return res
          .status(401)
          .json({ message: "Unauthorized: Invalid token format" });
      }
      const decoded = jwt.verify(token, process.env.SECRET);
      if (
        typeof decoded === "object" &&
        decoded !== null &&
        "role" in decoded
      ) {
        if (permission && !permission.includes(decoded.role)) {
          return res.status(403).json({ message: "Forbidden: Access denied" });
        }
      }

      req.user = decoded;
      next();
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Invalid or expired token", err: err });
    }
  };
};
module.exports = authorize;
