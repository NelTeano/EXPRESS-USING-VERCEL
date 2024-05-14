import ProductModel from "../models/Product.js";

const getProducts = async (req, res) => {

    try {
        const products = await ProductModel.find({});
        res.send(products);
        console.log("Get products Data Success");
    } catch (error) {
        console.log("Failed getting the products data", error);
        res.status(500).json({ message: "Error Get products", error });
    }
}

export { getProducts } 