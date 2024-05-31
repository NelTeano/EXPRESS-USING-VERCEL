import express from "express";

// CONTROLLERS
import { getUsers, saveUserAfterLogin } from '../controllers/userControllers.js'

const userRoute = express.Router();

userRoute.get('/users', getUsers);
userRoute.post('/save-user', saveUserAfterLogin);

export default userRoute;