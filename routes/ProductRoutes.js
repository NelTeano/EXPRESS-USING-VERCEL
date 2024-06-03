import express from "express";

// CONTROLLERS
import { getProducts, saveProduct, getFilteredProducts} from '../controllers/productControllers.js'

const productRoute = express.Router();

productRoute.get('/shop-products', getProducts);
productRoute.get('/filtered-products/:organization/:category', getFilteredProducts);
productRoute.post('/shop-add-product', saveProduct);


export default productRoute;