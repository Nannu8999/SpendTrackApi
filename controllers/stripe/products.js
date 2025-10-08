const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


const getPlans = async (req, res) => {
    try {
        const products = await stripe.products.list({ active: true });

        const plans = await Promise.all(
            products.data.map(async (product) => {

                const prices = await stripe.prices.list({ product: product.id, active: true });

                return {
                    productId: product.id,
                    name: product.name,
                    description: product.description,
                    images: product.images,
                    prices: prices.data.map((price) => ({
                        priceId: price.id,
                        currency: price.currency,
                        unitAmount: price.unit_amount,
                        interval: price.recurring?.interval,
                    })),
                };
            })
        );

        res.status(200).json(plans);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = { getPlans };
