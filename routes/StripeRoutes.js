import stripe from "stripe"
import express from "express";
import dotenv from "dotenv";

import {
    GetAllProducts,
    GetAllTransactions,
    GetAllOrders,
    GetAllSessions,
    createCheckout,
    createProduct,
    createPaymentLink,
} from '../controllers/stripeControllers.js'

dotenv.config();      // ACCESS .ENV 

const stripePackage = stripe(
    process.env.STRIPE_SECRET_KEY,
);


const StripeRoute = express.Router();




StripeRoute.post('/webhook', express.raw({type: 'application/json'}), async (request, response) => {
        const sig = request.headers['stripe-signature'];
    
        let event;
    
        try {
            event = await stripePackage.webhooks.constructEvent(request.body, sig, process.env.ENDPOINT_SECRET);
        } catch (err) {
            console.log(`❌ Error message: ${err.message}`);
            response.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }
        
        
        // Handle the event
        switch (event.type) {
        case 'checkout.session.completed':
            const checkoutSessionCompleted = event.data.object;

            try {

                const lineItems = await stripePackage.checkout.sessions.listLineItems(
                    checkoutSessionCompleted.id
                );

                console.log("Success! Checkout session completed.");
                console.log("Checkout Session:", checkoutSessionCompleted);
                console.log("Line of Items :", lineItems);
            } catch (err) {
                console.log(`❌ Error retrieving payment method: ${err.message}`);
            }
            break;

        // ... handle other event types
        case 'checkout.session.async_payment_failed':
            const checkoutSessionAsyncPaymentFailed = event.data.object;
            // Then define and call a function to handle the event checkout.session.async_payment_failed
            break;
        case 'checkout.session.async_payment_succeeded':
            const checkoutSessionAsyncPaymentSucceeded = event.data.object;
            // Then define and call a function to handle the event checkout.session.async_payment_succeeded
        break;
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
        response.json({received: true});
});


StripeRoute.get('/products/:limit', GetAllProducts);

StripeRoute.get('/transactions', GetAllTransactions);

StripeRoute.get('/orders', GetAllOrders);

StripeRoute.get('/checkout-sessions', GetAllSessions);

StripeRoute.post("/create-checkout-session", createCheckout);

StripeRoute.post('/create-product', createProduct);

StripeRoute.post('/payment_links/:id', createPaymentLink);


export default StripeRoute;