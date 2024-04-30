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

export { getUsers } 