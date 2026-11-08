GATEWAY CONSTRUCTION SERVICES INC. — PORTAL SEGURO
====================================================

ESTRUCTURA
- index.html / assets / styles.css: sitio público original, conservado.
- admin.html: panel privado con acceso por correo y contraseña.
- netlify/functions: funciones del servidor para registro, listado, actualización y consulta.
- supabase-secure-setup.sql: migración SQL para proteger la tabla.
- package.json / netlify.toml: dependencias y configuración de Netlify.

ANTES DE USAR CON SOLICITANTES REALES
1) En Supabase > SQL Editor, ejecuta TODO el archivo supabase-secure-setup.sql.
2) En Supabase > Authentication > Users, crea el usuario administrativo con el correo que usarás para entrar a admin.html. Define ahí su contraseña; no la compartas por chat.
3) En Netlify > Site configuration > Environment variables, agrega estas variables (usa los valores de tu proyecto):
   SUPABASE_URL = https://thlhvzghmmbnhftarnva.supabase.co
   SUPABASE_ANON_KEY = la clave anon/public del proyecto
   SUPABASE_SERVICE_ROLE_KEY = la clave service_role/secret del proyecto
   ADMIN_EMAIL = el mismo correo creado en Supabase Authentication
   Puedes conservar las variables VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY que ya habías creado; el código también las acepta para URL y clave pública, pero NO sustituyen SUPABASE_SERVICE_ROLE_KEY ni ADMIN_EMAIL.
4) MUY IMPORTANTE: SUPABASE_SERVICE_ROLE_KEY es secreta. Solo se configura en Netlify como variable de entorno. Nunca la pegues en HTML, JavaScript público, GitHub público ni la compartas por chat.
5) Vuelve a desplegar el contenido de este ZIP en Netlify. Debe desplegarse la carpeta raíz del ZIP, incluyendo netlify/functions y package.json. Netlify instalará @supabase/supabase-js.
6) Abre https://gatewayconstructionservicesinc.netlify.app/admin.html e inicia sesión con el correo y contraseña administrativos.
7) Registra un candidato de prueba. Guarda el folio y NIP que aparecen una sola vez. En el sitio público, consulta con ambos datos.
8) Comprueba que una consulta con folio/NIP incorrectos no muestre datos y que un solicitante no pueda entrar a /admin.html sin autenticarse.

FUNCIONAMIENTO
- Tú registras manualmente al solicitante desde el panel.
- El sistema genera folio y NIP aleatorios. El NIP se almacena como hash con sal, no como texto legible.
- El solicitante introduce folio + NIP en la sección de consulta pública y solo recibe nombre, estatus y fecha de actualización.
- El panel requiere autenticación Supabase y valida además que el correo coincida exactamente con ADMIN_EMAIL.
- Las funciones de servidor usan la clave service_role; la tabla no concede acceso directo a anon/authenticated.
- Los solicitantes no pueden editar expedientes ni descargar documentos desde la consulta pública.

SEGURIDAD / LIMITACIONES
- No cargues documentos sensibles en esta versión: el portal actual administra datos básicos y estatus, no un repositorio documental.
- Usa una contraseña administrativa fuerte y activa MFA en Supabase si está disponible.
- No compartas folios/NIP en grupos. Entrega cada par directamente al solicitante.
- La consulta pública no debe considerarse lista para producción hasta completar la prueba de extremo a extremo. Añade protección contra intentos automatizados/rate limiting en Netlify antes de publicar ampliamente.
- No elimines ni pegues la service_role key en el navegador.
- Si tu tabla existente tiene restricciones NOT NULL adicionales o tipos distintos, la primera alta de prueba puede requerir ajustar el INSERT a su esquema.


ADAPTACIÓN A TU TABLA REAL (8 NOV 2026)
La aplicación usa id (bigint autoincremental), full_name, email, phone, status, observations, created_at, folio y nip_hash. No usa identificador, nombre_completo, correo, telefono, estatus ni actualizado_en para guardar registros. El NIP se muestra una sola vez al administrador y en la consulta el solicitante debe capturarlo.
