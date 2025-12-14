import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { T } from "../lib/i18n";
import { supabase } from "../lib/supabase";

export default function Layout({ ctx }){
  const t = T[ctx.lang];
  const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL || "cleanmatchbynilba@gmail.com";

  return (
    <>
      <div className="topbar">
        <div className="topbarInner">
          <div className="brand">
            <span className="logoDot" />
            <span>CleanMatch</span>
            <span className="badge">US-ready</span>
          </div>

          <div className="nav">
            <NavLink to="/" end className={({isActive})=>isActive?"active":""}>{t.nav.home}</NavLink>
            <NavLink to="/pricing" className={({isActive})=>isActive?"active":""}>{t.nav.pricing}</NavLink>
            <NavLink to="/booking" className={({isActive})=>isActive?"active":""}>{t.nav.booking}</NavLink>
            <NavLink to="/messages" className={({isActive})=>isActive?"active":""}>{t.nav.messages}</NavLink>
            <NavLink to="/ratings" className={({isActive})=>isActive?"active":""}>{t.nav.ratings}</NavLink>
            <NavLink to="/support" className={({isActive})=>isActive?"active":""}>{t.nav.support}</NavLink>
            {ctx.session && <NavLink to="/profile" className={({isActive})=>isActive?"active":""}>{t.nav.profile}</NavLink>}
          </div>

          <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",justifyContent:"flex-end"}}>
            <button className="btn" onClick={()=>ctx.setLang(ctx.lang==="en"?"es":"en")}>{ctx.lang==="en"?"ES":"EN"}</button>

            {ctx.session ? (
              <>
                <span className="badge">{ctx.session.user.email}</span>
                <button className="btn primary" onClick={()=>supabase.auth.signOut()}>Logout</button>
              </>
            ) : (
              <NavLink to="/auth" className="btn primary">{t.nav.auth}</NavLink>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        <Outlet />
        <div className="footer">
          Support: <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
        </div>
      </div>
    </>
  );
}
