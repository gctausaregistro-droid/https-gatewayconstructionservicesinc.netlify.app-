export default async () => {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return new Response(JSON.stringify({error:'Faltan SUPABASE_URL y SUPABASE_ANON_KEY en Netlify.'}),{status:500,headers:{'Content-Type':'application/json'}});
  return new Response(JSON.stringify({url,anonKey}),{headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
};
