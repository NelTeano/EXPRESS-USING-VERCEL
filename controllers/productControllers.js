import ProductModel from "../models/Product.js";
import UserModel from "../models/User.js";
import OrderModel from "../models/Order.js";


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
            FilteredProducts = await ProductModel.find({});
        } else if (category === 'all') {
            FilteredProducts = await ProductModel.find({ organization_owner: decodedOrganization })
                .collation({ locale: 'en', strength: 2 })
                // .limit(limit);
        } else if (organization === 'all') {
            FilteredProducts = await ProductModel.find({ catergory: decodedCategory })
                .collation({ locale: 'en', strength: 2 })
                // .limit(limit);
        } else {
            FilteredProducts = await ProductModel.find({
                organization_owner: decodedOrganization,
                catergory: decodedCategory
            })
                .collation({ locale: 'en', strength: 2 })
                // .limit(limit);
        }

        res.send(FilteredProducts);
        console.log("Get products Data Success", organization, category);
    } catch (error) {
        console.log("Failed getting the products data", error);
        res.status(500).json({ message: "Error getting products", error });
    }
};


const likeProduct = async (req, res) => {
    
    const userEmail = req.params.email;
    const productId = req.params.prod_id;

    try {
        
        const findUser = await UserModel.findOne({ email: userEmail });

        if (!findUser) {
            return res.status(404).json({ message: 'No Exiting User or Login to Register Data' });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            findUser._id, 
            { $push: { product_liked: productId } },
            { new: true }
        );

        res.json({ message: 'User updated successfully', updatedData: updatedUser, oldData: findUser});
    } catch (err) {
        console.error(`Error: ${err}`);
        res.status(500).send({ success: false, message: "An error occurred while updating the product.", error: err });
    }
}

const addToCartProduct = async (req, res) => {
    
    const userEmail = req.params.email;
    const productId = req.params.prod_id;

    try {
        
        const findUser = await UserModel.findOne({ email: userEmail });

        if (!findUser) {
            return res.status(404).json({ message: 'No Exiting User or Login to Register Data' });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            findUser._id, 
            { $push: { cart: productId } },
            { new: true }
        );

        res.json({ message: 'Add to cart successfully', updatedData: updatedUser, oldData: findUser});
    } catch (err) {
        console.error(`Error: ${err}`);
        res.status(500).send({ success: false, message: "An error occurred while adding to cart the product.", error: err });
    }
}

const getLikedProduct = async (req, res) => {

    const userEmail = req.params.email;

    try {
        
        const findUser = await UserModel.findOne({ email: userEmail });

        if (!findUser) {
            return res.status(404).json({ message: 'No Exiting User or Login to Register Data' });
        }

        const findProductsLiked = await ProductModel.find({ _id: { "$in" : findUser.product_liked} });
        console.log("product liked _ids", findUser.product_liked); // array products _ids

        res.json({ message: 'get liked products successfully', Products: findProductsLiked});
    } catch (err) {
        console.error(`Error: ${err}`);
        res.status(500).send({ success: false, message: "An error occurred while updating the product.", error: err });
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


export { 
    getProducts,
    saveProduct, 
    getFilteredProducts, 
    likeProduct, 
    getLikedProduct, 
    addToCartProduct 
} 