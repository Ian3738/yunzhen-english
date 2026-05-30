
document.body.classList.add('ready');
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const tabs=[...document.querySelectorAll('.tab')];
const secs=[...document.querySelectorAll('.gradesec')];
const q=document.getElementById('q');
const empty=document.getElementById('empty');
const main=document.querySelector('main');
let active=tabs.find(t=>t.classList.contains('cur'))?.dataset.g||(tabs[0]&&tabs[0].dataset.g);
function showTab(g){
  active=g;
  tabs.forEach(t=>t.classList.toggle('cur',t.dataset.g===g));
  secs.forEach(s=>s.classList.toggle('show',s.dataset.grade===g));
}
function search(){
  const s=q.value.trim().toLowerCase();
  if(!s){ main.classList.remove('searching'); empty.classList.remove('show');
    secs.forEach(x=>x.querySelectorAll('.room').forEach(c=>c.style.display=''));
    secs.forEach(x=>x.querySelectorAll('.group').forEach(g=>g.style.display=''));
    showTab(active); return; }
  main.classList.add('searching'); let vis=0;
  secs.forEach(sec=>{ sec.classList.add('show');
    sec.querySelectorAll('.group').forEach(g=>{ let gv=0;
      g.querySelectorAll('.room').forEach(c=>{ const m=c.dataset.title.toLowerCase().includes(s);
        c.style.display=m?'':'none'; if(m){gv++;vis++;} });
      g.style.display=gv?'':'none'; });
  });
  empty.classList.toggle('show',!vis);
}
tabs.forEach(t=>t.addEventListener('click',()=>{q.value='';main.classList.remove('searching');empty.classList.remove('show');
  secs.forEach(x=>{x.querySelectorAll('.room').forEach(c=>c.style.display='');x.querySelectorAll('.group').forEach(g=>g.style.display='');});
  showTab(t.dataset.g); window.scrollTo({top:0,behavior:reduce?'auto':'smooth'});}));
q.addEventListener('input',search);
showTab(active);
document.addEventListener('click',e=>{const a=e.target.closest('a[data-nav]');if(!a)return;
  const url=a.getAttribute('href');if(!url||url.startsWith('#'))return;if(reduce)return;e.preventDefault();
  document.body.classList.add('leaving');setTimeout(()=>location.href=url,420);});
