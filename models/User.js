import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    subId: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    product_liked: {
        type: Array,
        required: true
    },
    cart: {
        type: Array,
        required: true
    },
    donated_charities: {
        type: Array,
        required: true
    },
    donated_orgs: {
        type: Array,
        required: true
    },
    isRegistered: {
        type: Boolean,
        required: true
    },
})

const UserModel = mongoose.model("users", UserSchema)

export default UserModel;