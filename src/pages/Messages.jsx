import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { T } from "../lib/i18n";

export default function Messages({ ctx }){
  const t = T[ctx.lang];
  const user = ctx.session.user;

  const [profiles,setProfiles]=useState([]);
  const [peer,setPeer]=useState("");
  const [text,setText]=useState("");
  const [items,setItems]=useState([]);

  useEffect(()=>{
    (async ()=>{
      const { data } = await supabase.from("profiles").select("user_id, full_name, role").neq("user_id", user.id).limit(50);
      setProfiles(data||[]);
    })();
  },[user.id]);

  useEffect(()=>{
    if(!peer) return;
    let sub;
    (async ()=>{
      const { data } = await supabase
        .from("messages")
        .select("*")
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${peer}),and(sender_id.eq.${peer},receiver_id.eq.${user.id})`)
        .order("created_at",{ascending:true});
      setItems(data||[]);

      sub = supabase
        .channel("messages-realtime")
        .on("postgres_changes",{event:"INSERT",schema:"public",table:"messages"},payload=>{
          const m = payload.new;
          const match =
            (m.sender_id===user.id && m.receiver_id===peer) ||
            (m.sender_id===peer && m.receiver_id===user.id);
          if(match) setItems(prev=>[...prev,m]);
        })
        .subscribe();
    })();
    return ()=> { if(sub) supabase.removeChannel(sub); };
  },[peer, user.id]);

  const send = async ()=>{
    if(!peer || !text.trim()) return;
    const { error } = await supabase.from("messages").insert({
      sender_id:user.id, receiver_id:peer, body:text.trim()
    });
    if(error) alert(error.message);
    setText("");
  };

  return (
    <div className="card">
      <div className="h1" style={{marginTop:0}}>{t.messages.title}</div>

      <div className="grid grid2">
        <div>
          <div className="small">Conversation</div>
          <select className="input" value={peer} onChange={e=>setPeer(e.target.value)}>
            <option value="">Select…</option>
            {profiles.map(p=>(
              <option key={p.user_id} value={p.user_id}>
                {(p.full_name||p.user_id.slice(0,6))} · {p.role}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{height:14}}/>
      <div className="card" style={{minHeight:240}}>
        {items.map(m=>(
          <div key={m.id} style={{marginBottom:10}}>
            <b>{m.sender_id===user.id ? "You" : "Them"}:</b>{" "}
            <span>{m.body}</span>
            <div className="small">{new Date(m.created_at).toLocaleString()}</div>
          </div>
        ))}
        {!peer && <div className="small">Pick someone to start messaging.</div>}
      </div>

      <div style={{height:12}}/>
      <div style={{display:"flex",gap:10}}>
        <input className="input" value={text} onChange={e=>setText(e.target.value)} placeholder={t.messages.placeholder}/>
        <button className="btn primary" onClick={send}>{t.messages.send}</button>
      </div>
    </div>
  );
}
