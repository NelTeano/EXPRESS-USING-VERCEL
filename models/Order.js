import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    
    orderId :{
        type: String,
        required:true,
    },
    customer_details :{
        type: Object,
        required:true,
    },
    shipping_details :{
        type: Object,
        required:true,
    },
    shipping_cost :{
        type: Object,
        required:true,
    },
    line_items :{
        type: Array,
        required:true,
    },
    amount_total :{
        type: Number,
        required:true,
    },
    payment_status :{
        type: String,
        required: true,
    },
    
});


const orderModel = mongoose.model('order-checkouts', orderSchema);

export default orderModel;