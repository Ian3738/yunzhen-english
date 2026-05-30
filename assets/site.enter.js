
document.body.classList.add('ready');
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
function openDoors(){document.body.classList.add('opened');}
if(reduce){document.body.classList.add('opened');}
else{ if(document.fonts&&document.fonts.ready){document.fonts.ready.then(()=>setTimeout(openDoors,180));} setTimeout(openDoors,700); }
// smooth page transition for internal links
document.addEventListener('click',e=>{
  const a=e.target.closest('a[data-nav]'); if(!a)return;
  const url=a.getAttribute('href'); if(!url||url.startsWith('#'))return;
  if(reduce)return; e.preventDefault();
  document.body.classList.add('leaving'); setTimeout(()=>location.href=url,460);
});
