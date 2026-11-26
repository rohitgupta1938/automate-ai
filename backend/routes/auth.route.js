import express from 'express'
import { login, logout, me } from '../controllers/auth.controller.js';
import protect from '../middleware/protect.js'
const authRoute=express.Router();

authRoute.post("/login",login);
authRoute.post("/logout",logout);
authRoute.get("/me",protect,me);

export default authRoute;