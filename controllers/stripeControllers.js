import stripe from "stripe"
import dotenv from "dotenv";

dotenv.config();      // ACCESS .ENV 

const stripePackage = stripe(
    process.env.STRIPE_SECRET_KEY,
);


// GET ALL PROUCTS WITH PRICES AND LIMIT
const GetAllProducts = async (req, res) => {

    const getLimit = req.params.limit;

    try {
        const ProductList = await stripePackage.products.list(
            {
                limit: getLimit,
                active: true,
                expand: ['data.default_price'],
            }, 
        );

        res.send(ProductList);
        console.log("Get Products Data Success");
    } catch (error) {
        console.log("Failed to GET the products:", error);
    }
};


// GET ALL TRANSACTIONS WITH LIMIT
const GetAllTransactions = async (req, res) => {


    try {  
        const transactions = await stripePackage.issuing.transactions.list({
            limit: 3,
    });

        res.send(transactions);
        console.log("Get Transactions Data Success");
    } catch (error) {
        console.log("Failed to GET the Transactions:", error);
    }
};


// GET ORDERS
const GetAllOrders =  async (req, res) => {


    try {  
        const orders = await stripePackage.climate.orders.retrieve(
            'climorder_1PDNhXP6tCIebvjyJWTDheYp'
        );

        res.send(orders);
        console.log("Get orders Data Success");
    } catch (error) {
        console.log("Failed to GET the orders:", error);
    }
};



// GET LIST CHECKOUT SESSIONS
const GetAllSessions = async  (req, res) => {


    try {  
        const sessions = await stripePackage.checkout.sessions.list({
            limit: 3,
        });

        res.send(sessions);
        console.log("Get sessions Data Success");
    } catch (error) {
        console.log("Failed to GET the sessions:", error);
    }
};


const storeItems = new Map([
    [1, { priceInCents: 10000, name: "Learn React Today" }],
    [2, { priceInCents: 20000, name: "Learn CSS Today" }],
])


// CREATE CHECKOUT SESSION
const createCheckout = async (req, res) => {
    try {
        const session = await stripePackage.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(parseInt(item.id));

                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name,
                            description: `Size: ${item.size}`,  // Add size to description
                        },
                        unit_amount: storeItem.priceInCents,
                    },
                    quantity: item.quantity,
                };
            }),
            success_url: 'https://reward-funding-website.vercel.app/',
            cancel_url: 'https://reward-funding-website.vercel.app/Home',
        });
        res.json({ url: session.url });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};









// CREATE A PRODUCT
const createProduct = async (req, res) => {

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
};



// ACTIVATE PAYMENT LINK OF A PRODUCT
const createPaymentLink = async  (req, res) => {

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
};



export { 
    GetAllProducts,
    GetAllTransactions,
    GetAllOrders,
    GetAllSessions,
    createCheckout,
    createProduct,
    createPaymentLink
}

