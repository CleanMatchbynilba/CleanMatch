import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { T } from "../lib/i18n";

export default function Booking({ ctx }){
  const t = T[ctx.lang];
  const user = ctx.session.user;

  const [profiles,setProfiles]=useState([]);
  const [toUserId,setToUserId]=useState("");
  const [date,setDate]=useState("");
  const [time,setTime]=useState("");
  const [notes,setNotes]=useState("");

  useEffect(()=>{
    (async ()=>{
      const { data } = await supabase.from("profiles").select("user_id, full_name, role").neq("user_id", user.id).limit(50);
      setProfiles(data || []);
    })();
  },[user.id]);

  const submit = async ()=>{
    if(!toUserId || !date || !time) return alert("Pick user/date/time");
    const { error } = await supabase.from("bookings").insert({
      requester_id: user.id,
      provider_id: toUserId,
      date,
      time,
      notes,
      status: "requested"
    });
    if (error) alert(error.message);
    else alert("Booking requested.");
  };

  return (
    <div className="card">
      <div className="h1" style={{marginTop:0}}>{t.booking.title}</div>

      <div className="grid grid2">
        <div>
          <div className="small">To (Cleaner/Homeowner/Agency)</div>
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
          <div className="small">{t.booking.date}</div>
          <input className="input" type="date" value={date} onChange={e=>setDate(e.target.value)} />
        </div>
        <div>
          <div className="small">{t.booking.time}</div>
          <input className="input" type="time" value={time} onChange={e=>setTime(e.target.value)} />
        </div>
      </div>

      <div style={{height:12}}/>
      <div className="small">{t.booking.notes}</div>
      <textarea className="input" value={notes} onChange={e=>setNotes(e.target.value)} />

      <div style={{height:14}}/>
      <button className="btn primary" onClick={submit}>{t.booking.submit}</button>
    </div>
  );
}
