import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const protect = async (req, res, next) => {
  try {
    const token = req.cookie.token;
    if (!token) {
      return res.status(404).json({ message: "Unauthorized!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "user not found!" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(404).json({message:`protected error ${error}`})
  }
};

export default protect;