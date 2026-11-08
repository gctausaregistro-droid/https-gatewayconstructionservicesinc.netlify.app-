let currentLang='en';
function setLanguage(lang){currentLang=lang;document.documentElement.lang=lang;document.querySelectorAll('[data-en][data-es]').forEach(el=>{const value=el.dataset[lang];if(value!==undefined)el.textContent=value});document.querySelectorAll('.langbtn').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));}
document.querySelectorAll('.langbtn').forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.lang)));
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#nav');if(menu&&nav){menu.addEventListener('click',()=>nav.classList.toggle('open'));nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));}
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
const statusForm=document.getElementById('statusForm');
if(statusForm)statusForm.addEventListener('submit',async e=>{
 e.preventDefault();const button=statusForm.querySelector('button');const notice=document.getElementById('statusMessage');const f=new FormData(statusForm);
 button.disabled=true;button.textContent=currentLang==='es'?'Consultando…':'Checking…';notice.style.display='block';notice.textContent='';
 try{const response=await fetch('/.netlify/functions/lookup-candidate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({folio:f.get('folio'),nip:f.get('password')})});const result=await response.json();if(!response.ok)throw Error(result.error||'No se pudo consultar.');
 const c=result.candidate;notice.innerHTML='';notice.className='demo-message';notice.style.display='block';
 const title=document.createElement('strong');title.textContent=currentLang==='es'?'Resultado de consulta':'Lookup result';notice.append(title);
 const lines=[['Folio',c.folio], [currentLang==='es'?'Nombre':'Name',c.nombre_completo], [currentLang==='es'?'Estatus':'Status',c.estatus], [currentLang==='es'?'Última actualización':'Last updated',c.actualizado_en?new Date(c.actualizado_en).toLocaleString(currentLang==='es'?'es-MX':'en-US'):'—']];
 for(const [label,value] of lines){const p=document.createElement('p');p.style.margin='7px 0';p.textContent=label+': '+value;notice.append(p)}
 }catch(err){notice.textContent=err.message;notice.className='demo-message';notice.style.display='block'}finally{button.disabled=false;button.innerHTML=currentLang==='es'?'Consultar estatus':'Check status'}
});
