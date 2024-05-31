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

const saveUserAfterLogin = async (req, res) => {

    const user = new UserModel({
        subId: req.body.subId,
        full_name: req.body.name,
        email: req.body.email,
        product_liked: req.body.prod_liked,
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

export { getUsers, saveUserAfterLogin } 