import mongoose from "mongoose";
import { Timestamp } from "mongodb";

const ProductSchemma = mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number,
    },
    organization_owner: {
        type: String,
    },
    description: {
        type: String,
    },
    sizes: {
        type: Array,
    },
})

const UserModel = mongoose.model("shop_products", ProductSchemma)

export default UserModel;