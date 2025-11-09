import jwt from "jsonwebtoken";
import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

export const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const db = getDB();
    const user = await db.collection("users").findOne({ _id: new ObjectId(decoded.id) });

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
};
