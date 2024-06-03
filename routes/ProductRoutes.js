import express from "express";

// CONTROLLERS
import { getProducts, saveProduct, getFilteredProducts, likeProduct} from '../controllers/productControllers.js'

const productRoute = express.Router();

productRoute.get('/shop-products', getProducts);
productRoute.get('/filtered-products/:organization/:category', getFilteredProducts);
productRoute.post('/shop-add-product', saveProduct);
productRoute.put('/like-product/:email/:prod_id', likeProduct);

export default productRoute;