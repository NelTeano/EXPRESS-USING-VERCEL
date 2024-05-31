import express from "express";

// CONTROLLERS
import { 
    getUsers, 
    getUserById, 
    saveUser,
    checkUserRegistered
} from '../controllers/userControllers.js'

const userRoute = express.Router();

userRoute.get('/users', getUsers);
userRoute.get('/users/:id', getUserById);
userRoute.get('/check-register/:email', checkUserRegistered);
userRoute.post('/save-user', saveUser);

export default userRoute;