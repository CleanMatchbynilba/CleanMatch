import React from "react";
import { T } from "../lib/i18n";

export default function Home({ ctx }){
  const t = T[ctx.lang];
  return (
    <div className="card">
      <div className="badge">CleanMatch</div>
      <div className="h1">{t.home.title}</div>
      <div className="p">{t.home.sub}</div>

      <div className="grid grid3" style={{marginTop:14}}>
        <div className="card">
          <b>Roles</b>
          <div className="small">Cleaner · Homeowner · Agency</div>
        </div>
        <div className="card">
          <b>Core</b>
          <div className="small">Booking · Messaging · Ratings</div>
        </div>
        <div className="card">
          <b>Payments</b>
          <div className="small">Stripe subscriptions + 10-day trial</div>
        </div>
      </div>
    </div>
  );
}
