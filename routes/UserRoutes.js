import express from "express";

// CONTROLLERS
import { getUsers } from '../controllers/userControllers.js'

const userRoute = express.Router();

userRoute.get('/users', getUsers);

export default userRoute;