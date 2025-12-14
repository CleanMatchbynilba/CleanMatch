import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { T } from "../lib/i18n";

export default function Profile({ ctx }){
  const t = T[ctx.lang];
  const user = ctx.session.user;

  const [role,setRole]=useState("homeowner");
  const [fullName,setFullName]=useState("");
  const [city,setCity]=useState("");
  const [areas,setAreas]=useState("");
  const [rate,setRate]=useState("");
  const [bio,setBio]=useState("");

  useEffect(()=>{
    (async ()=>{
      const { data } = await supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle();
      if (data){
        setRole(data.role || "homeowner");
        setFullName(data.full_name || "");
        setCity(data.city || "");
        setAreas((data.areas||[]).join(", "));
        setRate(data.hourly_rate ? String(data.hourly_rate) : "");
        setBio(data.bio || "");
      }
    })();
  },[user.id]);

  const save = async ()=>{
    const payload = {
      user_id: user.id,
      role,
      full_name: fullName,
      city,
      areas: areas.split(",").map(s=>s.trim()).filter(Boolean),
      hourly_rate: rate ? Number(rate) : null,
      bio
    };
    const { error } = await supabase.from("profiles").upsert(payload, { onConflict:"user_id" });
    if (error) alert(error.message);
    else alert("Saved.");
  };

  return (
    <div className="card">
      <div className="h1" style={{marginTop:0}}>{t.profile.title}</div>

      <div className="grid grid2">
        <div>
          <div className="small">{t.profile.role}</div>
          <select className="input" value={role} onChange={e=>setRole(e.target.value)}>
            <option value="homeowner">Homeowner</option>
            <option value="cleaner">Cleaner</option>
            <option value="agency">Agency</option>
          </select>
        </div>
        <div>
          <div className="small">{t.profile.fullName}</div>
          <input className="input" value={fullName} onChange={e=>setFullName(e.target.value)} />
        </div>
        <div>
          <div className="small">{t.profile.city}</div>
          <input className="input" value={city} onChange={e=>setCity(e.target.value)} />
        </div>
        <div>
          <div className="small">{t.profile.areas}</div>
          <input className="input" value={areas} onChange={e=>setAreas(e.target.value)} placeholder="Kansas City, Overland Park..." />
        </div>
        <div>
          <div className="small">{t.profile.rate}</div>
          <input className="input" value={rate} onChange={e=>setRate(e.target.value)} placeholder="45" />
        </div>
      </div>

      <div style={{height:12}}/>
      <div className="small">{t.profile.bio}</div>
      <textarea className="input" value={bio} onChange={e=>setBio(e.target.value)} />

      <div style={{height:14}}/>
      <button className="btn primary" onClick={save}>{t.profile.save}</button>
    </div>
  );
}
