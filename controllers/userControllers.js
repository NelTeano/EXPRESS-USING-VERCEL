import UserModel from "../models/User.js";

const getUsers = async (req, res) => {

    try {
        const usersData = await UserModel.find({});
        res.send(usersData);
        console.log("Get Users Data Success");
    } catch (error) {
        console.log("Failed getting the data", error);
        res.status(500).json({ message: "Error Get Contacts", error });
    }
}

const getUserByEmail = async (req, res) => {

    const userEmail = req.params.id

    try {
        const userData = await UserModel.find({email: userEmail})
        res.send(userData);
        console.log("Get User by Email Data Success");
    } catch (error) {
        console.log("Failed getting User by ID data", error);
        res.status(500).json({ message: "Error User by ID", error });
    }
}

const saveUser = async (req, res) => {

    const user = new UserModel({
        subId: req.body.subId,
        full_name: req.body.name,
        email: req.body.email,
        product_liked: req.body.prod_liked,
        cart: req.body.user_cart,
        donated_charities: req.body.charities,
        donated_orgs: req.body.orgs,
        isRegistered: req.body.isRegistered,
    })


    try {
        const saveUser = await user.save();
        res.send(saveUser);
        console.log("save user success");
    } catch (error) {
        console.log("Failed save user data", error);
        res.status(400).json({ message: "Error save user: ", error });
    }
}

const checkUserRegistered = async (req, res) => {
    const userEmail = req.params.email;

    try {
        const user = await UserModel.findOne({ email: userEmail });
        
        if (user) {
            res.status(200).json(true);
        } else {
            res.status(200).json(false);
        }
    } catch (error) {
        console.error("Failed checkUserRegistered function:", error);
        res.status(400).json({ message: "Error in checkUserRegistered function", error: error.message });
    }
}


export { getUsers, getUserByEmail, saveUser, checkUserRegistered } 