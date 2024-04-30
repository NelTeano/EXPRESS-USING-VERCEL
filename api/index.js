import express from 'express';
import dotenv from "dotenv";

// DATABASE CONNECTION
import { initDatabase } from './database.js'

const app = express();
dotenv.config();      // ACCESS .ENV 
initDatabase();


app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(3001, () => console.log("Server ready on port 3000."));

export default app;