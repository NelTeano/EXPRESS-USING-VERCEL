import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
    },
})

const UserModel = mongoose.model("users", UserSchema)

export default UserModel;