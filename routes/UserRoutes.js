import express from "express";

// CONTROLLERS
import { 
    getUsers, 
    getUserById, 
    saveUserAfterLogin
} from '../controllers/userControllers.js'

const userRoute = express.Router();

userRoute.get('/users', getUsers);
userRoute.get('/users/:id', getUserById);
userRoute.post('/save-user', saveUserAfterLogin);

export default userRoute;