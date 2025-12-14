import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(
  "https://irvpebwfsyastdqdoczw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlydnBlYndmc3lhc3RkcWRvY3p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NTc0MTAsImV4cCI6MjA4MTIzMzQxMH0.qcnHP60VWj-DkeZl_wbU5o4hpPju2F6hAOOSly-ctZ0"
);

window.login = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) alert(error.message);
  else window.location.href = "/";
};

window.register = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) alert(error.message);
  else alert("Check your email");
};
