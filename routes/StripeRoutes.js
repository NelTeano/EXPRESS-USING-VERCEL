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


// GET ALL PROUCTS WITH LIMIT
StripeRoute.get('/products/:limit', async (req, res) => {

    const getLimit = req.params.limit;

    try {
        const ProductList = await stripePackage.products.list(
        {
            limit: getLimit
        }, 
    );

        res.send(ProductList);
        console.log("Get Products Data Success");
    } catch (error) {
        console.log("Failed to GET the products:", error);
    }
});






// CREATE A PRODUCT
StripeRoute.post('/create-product', async (req, res) => {

    const name = req.body.name;
    const description = req.body.description;
    const product_price = req.body.price;
    const images =  req.body.images;

    try {

        const product = await stripePackage.products.create({
            name: name,
            description: description,
            images: images,
            active: true,
            default_price_data: {
                currency: 'php',
                unit_amount: product_price
            }
        });

        res.status(200).send('Product Create Successfully!'); // Sending success message
    } catch(error) {
        res.status(400).send('Failed to POST product: ' + error); // Sending error message
    }
});



// ACTIVATE PAYMENT LINK OF A PRODUCT
StripeRoute.post('/payment_links/:id', async (req, res) => {

    const product_id = req.params.id; // Accessing id parameter from URL
    const quantity = req.body.quantity;

    try {
        const paymentLink = await stripePackage.paymentLinks.create({
            line_items: [
                {
                    price: product_id,
                    quantity: quantity,
                },
            ],
            after_completion: {
                type: 'redirect',
                redirect: {
                    url: 'https://reward-funding-website.vercel.app/',
                },
            },
        });

        res.status(200).send('Product Link Created Successfully! Here is the payment link : ' + JSON.stringify(paymentLink.url) + ' Object : ' + JSON.stringify(paymentLink)); // Sending success message
    } catch(error) {
        res.status(400).send('Failed to create payment link: ' + error.message); // Sending error message
    }
});




export default StripeRoute;