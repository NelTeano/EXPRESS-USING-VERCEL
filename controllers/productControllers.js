import ProductModel from "../models/Product.js";


// GET ALL THE PRODUCTS
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

const getFilteredProducts = async (req, res) => {
    const { organization, category } = req.params;
    const limit = 12;
    
    const decodedOrganization = decodeURIComponent(organization);
    const decodedCategory = decodeURIComponent(category);

    try {
        let FilteredProducts;

        if (organization === 'all' && category === 'all') {
            FilteredProducts = await ProductModel.find({}).limit(limit);
        } else if (category === 'all') {
            FilteredProducts = await ProductModel.find({ organization_owner: decodedOrganization })
                .collation({ locale: 'en', strength: 2 })
                .limit(limit);
        } else if (organization === 'all') {
            FilteredProducts = await ProductModel.find({ catergory: decodedCategory })
                .collation({ locale: 'en', strength: 2 })
                .limit(limit);
        } else {
            FilteredProducts = await ProductModel.find({
                organization_owner: decodedOrganization,
                catergory: decodedCategory
            })
                .collation({ locale: 'en', strength: 2 })
                .limit(limit);
        }

        res.send(FilteredProducts);
        console.log("Get products Data Success", organization, category);
    } catch (error) {
        console.log("Failed getting the products data", error);
        res.status(500).json({ message: "Error getting products", error });
    }
};


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



export { getProducts, saveProduct, getFilteredProducts } 