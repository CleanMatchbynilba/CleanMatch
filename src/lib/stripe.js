export const PLANS = {
  cleaner_basic: { name:{en:"Cleaner Basic", es:"Limpiador Básico"}, usd:4, priceId: import.meta.env.VITE_STRIPE_PRICE_CLEANER_BASIC },
  cleaner_pro:   { name:{en:"Cleaner Pro", es:"Limpiador Pro"}, usd:12, priceId: import.meta.env.VITE_STRIPE_PRICE_CLEANER_PRO },
  agency:        { name:{en:"Agency", es:"Agencia"}, usd:29, priceId: import.meta.env.VITE_STRIPE_PRICE_AGENCY },
  homeowner_basic:{ name:{en:"Homeowner Basic", es:"Propietario Básico"}, usd:4, priceId: import.meta.env.VITE_STRIPE_PRICE_HOMEOWNER_BASIC },
  homeowner_pro:  { name:{en:"Homeowner Pro", es:"Propietario Pro"}, usd:12, priceId: import.meta.env.VITE_STRIPE_PRICE_HOMEOWNER_PRO }
};
