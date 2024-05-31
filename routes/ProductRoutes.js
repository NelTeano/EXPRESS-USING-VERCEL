import express from "express";

// CONTROLLERS
import { getProducts, saveProduct } from '../controllers/productControllers.js'

const productRoute = express.Router();

productRoute.get('/shop-products', getProducts);
productRoute.post('/shop-add-product', saveProduct);

export default productRoute;