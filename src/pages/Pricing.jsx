import React from "react";
import { T } from "../lib/i18n";
import { PLANS } from "../lib/stripe";

export default function Pricing({ ctx }){
  const t = T[ctx.lang];

  const start = async (planKey)=>{
    const res = await fetch("/.netlify/functions/createCheckout", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ planKey, lang: ctx.lang })
    });
    const data = await res.json();
    if (!res.ok) return alert(data?.error || "Stripe error");
    window.location.href = data.url;
  };

  const cards = [
    "homeowner_basic","homeowner_pro",
    "cleaner_basic","cleaner_pro",
    "agency"
  ];

  return (
    <div className="card">
      <div className="h1" style={{marginTop:0}}>{t.pricing.title}</div>
      <div className="badge">{t.pricing.trial}</div>

      <div className="grid grid3" style={{marginTop:14}}>
        {cards.map(k=>{
          const p = PLANS[k];
          return (
            <div key={k} className="card">
              <b>{p.name[ctx.lang]}</b>
              <div className="small">${p.usd}/month</div>
              <div style={{height:12}}/>
              <button className="btn primary" onClick={()=>start(k)}>{t.pricing.start}</button>
              <div className="small" style={{marginTop:10}}>
                Trial handled in Stripe Price settings.
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
