import express from "express";

// CONTROLLERS
import { getProducts } from '../controllers/productControllers.js'

const productRoute = express.Router();

productRoute.get('/shop-products', getProducts);

export default productRoute;