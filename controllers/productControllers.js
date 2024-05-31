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

const saveProduct = async (req, res) => {

    const product = new ProductModel({
        name: req.body.name,
        price: req.body.price,
        organization_owner: req.body.org,
        description: req.body.description,
        image: req.body.img,
        catergory: req.body.category,
        variation: req.body.var,
    })


    try {
        const addProduct = await product.save();
        res.send(addProduct);
        console.log("Add product Success");
    } catch (error) {
        console.log("Failed adding the product data", error);
        res.status(400).json({ message: "Error adding products", error });
    }
}

export { getProducts, saveProduct } 