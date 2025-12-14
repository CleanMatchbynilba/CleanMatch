import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { T } from "../lib/i18n";

export default function Ratings({ ctx }){
  const t = T[ctx.lang];
  const user = ctx.session.user;
  const [profiles,setProfiles]=useState([]);
  const [toUserId,setToUserId]=useState("");
  const [stars,setStars]=useState(5);
  const [comment,setComment]=useState("");

  useEffect(()=>{
    (async ()=>{
      const { data } = await supabase.from("profiles").select("user_id, full_name, role").neq("user_id", user.id).limit(50);
      setProfiles(data||[]);
    })();
  },[user.id]);

  const submit = async ()=>{
    if(!toUserId) return alert("Pick user");
    const { error } = await supabase.from("ratings").insert({
      from_user_id: user.id,
      to_user_id: toUserId,
      stars: Number(stars),
      comment
    });
    if(error) alert(error.message);
    else alert("Rating submitted.");
  };

  return (
    <div className="card">
      <div className="h1" style={{marginTop:0}}>{t.ratings.title}</div>

      <div className="grid grid2">
        <div>
          <div className="small">{t.ratings.who}</div>
          <select className="input" value={toUserId} onChange={e=>setToUserId(e.target.value)}>
            <option value="">Select…</option>
            {profiles.map(p=>(
              <option key={p.user_id} value={p.user_id}>
                {(p.full_name||p.user_id.slice(0,6))} · {p.role}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="small">{t.ratings.stars}</div>
          <select className="input" value={stars} onChange={e=>setStars(e.target.value)}>
            {[5,4,3,2,1].map(n=><option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      <div style={{height:12}}/>
      <div className="small">{t.ratings.comment}</div>
      <textarea className="input" value={comment} onChange={e=>setComment(e.target.value)} />

      <div style={{height:14}}/>
      <button className="btn primary" onClick={submit}>{t.ratings.submit}</button>
    </div>
  );
}
