import React, { useState } from "react";
import { T } from "../lib/i18n";

export default function Support({ ctx }){
  const t = T[ctx.lang];
  const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL || "cleanmatchbynilba@gmail.com";

  const [email,setEmail]=useState("");
  const [topic,setTopic]=useState("");
  const [message,setMessage]=useState("");

  const send = ()=>{
    const subject = encodeURIComponent(`[CleanMatch] ${topic || "Support"}`);
    const body = encodeURIComponent(`From: ${email}\n\n${message}`);
    window.location.href = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="card">
      <div className="h1" style={{marginTop:0}}>{t.support.title}</div>
      <div className="small">Support email: {supportEmail}</div>

      <div style={{height:12}}/>
      <div className="grid grid2">
        <div>
          <div className="small">{t.support.email}</div>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <div className="small">{t.support.topic}</div>
          <input className="input" value={topic} onChange={e=>setTopic(e.target.value)} />
        </div>
      </div>

      <div style={{height:12}}/>
      <div className="small">{t.support.message}</div>
      <textarea className="input" value={message} onChange={e=>setMessage(e.target.value)} />

      <div style={{height:14}}/>
      <button className="btn primary" onClick={send}>{t.support.send}</button>
    </div>
  );
}
