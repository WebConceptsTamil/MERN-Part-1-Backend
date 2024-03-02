import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";

const checkToken = expressAsyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.token;

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decodedToken.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Invalid token !");
    }
  } else {
    res.status(401);
    throw new Error("Unauthorized !");
  }
});

export { checkToken };
