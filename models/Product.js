import mongoose from "mongoose";
import { Timestamp } from "mongodb";

const ProductSchemma = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    organization_owner: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    catergory: {
        type: String,
        required: true
    },
    variation: {
        type: Array,
        required: true
    },
})

const ProductModel = mongoose.model("shop_products", ProductSchemma)

export default ProductModel;