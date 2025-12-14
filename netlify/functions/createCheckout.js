import Stripe from "stripe";

export default async (req) => {
  try {
    const { planKey } = JSON.parse(req.body || "{}");
    const priceMap = {
      cleaner_basic: process.env.STRIPE_PRICE_CLEANER_BASIC,
      cleaner_pro: process.env.STRIPE_PRICE_CLEANER_PRO,
      homeowner_basic: process.env.STRIPE_PRICE_HOMEOWNER_BASIC,
      homeowner_pro: process.env.STRIPE_PRICE_HOMEOWNER_PRO,
      agency: process.env.STRIPE_PRICE_AGENCY
    };

    const price = priceMap[planKey];
    if (!price) return Response.json({ error: "Missing price ID" }, { status: 400 });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      subscription_data: { trial_period_days: 10 },
      success_url: `${process.env.SITE_URL}/profile?paid=1`,
      cancel_url: `${process.env.SITE_URL}/pricing?canceled=1`
    });

    return Response.json({ url: session.url }, { status: 200 });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
};
