import stripe from "stripe"
import express from "express";
import dotenv from "dotenv";

dotenv.config();      // ACCESS .ENV 

const stripePackage = stripe(
    process.env.STRIPE_SECRET_KEY,
);


const StripeRoute = express.Router();

StripeRoute.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
        const sig = request.headers['stripe-signature'];
    
        let event;
    
        try {
        event = stripePackage.webhooks.constructEvent(request.body, sig, process.env.ENDPOINT_SECRET);
        } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
        }
        
        
        // Handle the event
        switch (event.type) {
        case 'charge.refunded':
            const chargeRefunded = event.data.object;
            // Then define and call a function to handle the event charge.refunded
            break;
        case 'charge.succeeded':
            const chargeSucceeded = event.data.object;
            // Then define and call a function to handle the event charge.succeeded
            break;
        case 'charge.updated':
            const chargeUpdated = event.data.object;
            // Then define and call a function to handle the event charge.updated
            break;
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object;
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
        }
    
        // Return a 200 response to acknowledge receipt of the event
        response.send();
});


StripeRoute.get('/products', async (req, res) => {

    try {
        const ProductList = await stripePackage.products.list(
        {
            limit: 3
        }, 
    );

        res.send(ProductList);
        console.log("Get Products Data Success");
    } catch (error) {
        console.log("Failed to GET the products:", error);
    }
});

export default StripeRoute;