import express from 'express';
import dotenv from "dotenv";

// DATABASE CONNECTION
import { initDatabase } from './database.js'

// ROUTES
import userRoutes from '../routes/UserRoutes.js'

const app = express();
dotenv.config();      // ACCESS .ENV 
initDatabase();


app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(3001, () => console.log("Server ready on port 3000."));

// USE ROUTES
app.use('/api', userRoutes);

export default app;