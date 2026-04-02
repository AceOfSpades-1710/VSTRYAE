import jwt from "jsonwebtoken";

export default function handler(req, res) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    return res.status(200).json({ user });

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}