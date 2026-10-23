(() => {
 const root=document.querySelector('.kaemi-guide');if(!root)return;
 const launcher=root.querySelector('.kaemi-launcher'),panel=root.querySelector('#kaemi-panel'),close=root.querySelector('.guide-close');
 function setOpen(open,restore=false){panel.hidden=!open;launcher.setAttribute('aria-expanded',String(open));launcher.setAttribute('aria-label',open?"Close Kaemi's site guide":"Open Kaemi's site guide");if(open)close.focus();else if(restore)launcher.focus();}
 launcher.addEventListener('click',()=>setOpen(panel.hidden));
 close.addEventListener('click',()=>setOpen(false,true));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden)setOpen(false,true);});
 document.addEventListener('click',e=>{if(!panel.hidden&&!root.contains(e.target))setOpen(false);});
})();
