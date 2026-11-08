-- Gateway Construction Services Inc. — seguridad de candidatos
-- Tu tabla ya contiene folio y nip_hash. No recreamos columnas ni borramos datos.
ALTER TABLE public.candidatos ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.candidatos FROM anon, authenticated;
GRANT ALL ON TABLE public.candidatos TO service_role;

-- El NIP nunca se guarda en texto plano; Netlify guarda solamente nip_hash.
-- El acceso a la tabla se realiza desde funciones privadas de Netlify.
