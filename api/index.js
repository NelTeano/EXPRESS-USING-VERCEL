import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';


// DATABASE CONNECTION
import { initDatabase } from './database.js'

// ROUTES
import userRoutes from '../routes/UserRoutes.js';
import StripeRoutes from '../routes/StripeRoutes.js';
import productRoutes from '../routes/ProductRoutes.js'


const app = express();
dotenv.config();      // ACCESS .ENV 
initDatabase();

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
        if (req.originalUrl === '/api/webhook') {
            next();
        } else {
            express.json()(req, res, next);
        }
    }
);
app.use(express.static("public"));
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:3001/Home',
        'https://reward-funding-website.vercel.app/',
        'https://reward-funding-website.vercel.app/Home',
        'https://reward-funding-website.vercel.app',
        'https://deploy-express-vercel-ashy.vercel.app/api/users'
    ],  
    // THE HTTP(ORIGIN) THAT WILL ALLOW TO ACCESS THE ROUTES
    credentials: true,
}));

const PORT = 3001;

app.get("/", (req, res) => res.send(`Express on Vercel ${process.env.ENDPOINT_SECRET}`));

app.listen(PORT, () => console.log(`Server ready on port http://localhost:${PORT}`));


// USE ROUTES
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', StripeRoutes);

export default app;