import React from "react";
import { Navigate } from "react-router-dom";

export default function Protected({ ctx, children }){
  if (!ctx.session) return <Navigate to="/auth" replace />;
  return children;
}
