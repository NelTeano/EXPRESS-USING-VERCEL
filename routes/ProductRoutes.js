import express from "express";

// CONTROLLERS
import { 
    getProducts,
    saveProduct,
    getFilteredProducts,
    likeProduct,
    getLikedProduct,
    addToCartProduct
} from '../controllers/productControllers.js'

const productRoute = express.Router();

productRoute.get('/shop-products', getProducts);
productRoute.get('/filtered-products/:organization/:category', getFilteredProducts);
productRoute.get('/product-liked/:email', getLikedProduct);
productRoute.post('/shop-add-product', saveProduct);
productRoute.put('/like-product/:email/:prod_id', likeProduct);
productRoute.put('/add-product-cart/:email/:prod_id', addToCartProduct);

export default productRoute;