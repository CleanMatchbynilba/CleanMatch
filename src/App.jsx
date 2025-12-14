import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { supabase } from "./lib/supabase";
import Layout from "./components/Layout";
import Protected from "./components/Protected";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Pricing from "./pages/Pricing";
import Booking from "./pages/Booking";
import Messages from "./pages/Messages";
import Ratings from "./pages/Ratings";
import Support from "./pages/Support";

export default function App(){
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  const [session, setSession] = useState(null);

  useEffect(()=>{
    localStorage.setItem("lang", lang);
  },[lang]);

  useEffect(()=>{
    supabase.auth.getSession().then(({data})=>setSession(data.session ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e,s)=>setSession(s ?? null));
    return ()=> sub?.subscription?.unsubscribe();
  },[]);

  const ctx = useMemo(()=>({ lang, setLang, session }),[lang, session]);

  return (
    <Routes>
      <Route element={<Layout ctx={ctx}/>}>
        <Route index element={<Home ctx={ctx}/>}/>
        <Route path="/auth" element={<Auth ctx={ctx}/>}/>
        <Route path="/pricing" element={<Pricing ctx={ctx}/>}/>
        <Route path="/profile" element={<Protected ctx={ctx}><Profile ctx={ctx}/></Protected>}/>
        <Route path="/booking" element={<Protected ctx={ctx}><Booking ctx={ctx}/></Protected>}/>
        <Route path="/messages" element={<Protected ctx={ctx}><Messages ctx={ctx}/></Protected>}/>
        <Route path="/ratings" element={<Protected ctx={ctx}><Ratings ctx={ctx}/></Protected>}/>
        <Route path="/support" element={<Support ctx={ctx}/>}/>
      </Route>
    </Routes>
  );
}
