import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { T } from "../lib/i18n";

export default function Auth({ ctx }){
  const t = T[ctx.lang];
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [busy,setBusy]=useState(false);

  const login = async ()=>{
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) alert(error.message);
  };

  const signup = async ()=>{
    setBusy(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setBusy(false);
    if (error) alert(error.message);
    else alert(t.auth.tip);
  };

  return (
    <div className="card" style={{maxWidth:520}}>
      <div className="h1" style={{marginTop:0}}>{t.auth.title}</div>
      <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder={t.auth.email}/>
      <div style={{height:10}}/>
      <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder={t.auth.pass}/>
      <div style={{height:14}}/>
      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        <button className="btn primary" disabled={busy} onClick={login}>{t.auth.login}</button>
        <button className="btn" disabled={busy} onClick={signup}>{t.auth.signup}</button>
      </div>
    </div>
  );
}
