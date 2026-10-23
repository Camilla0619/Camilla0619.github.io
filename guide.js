(() => {
 const root = document.querySelector('.kaemi-guide');
 if (!root) return;
 const launcher = root.querySelector('.kaemi-launcher');
 const panel = root.querySelector('#kaemi-panel');
 const close = root.querySelector('.guide-close');
 const options = [...root.querySelectorAll('[data-guide]')];
 const answers = {
  about: ["I work across growth, community, and creative work in tech. I've built an X audience from zero to 150K, and I like helping early-stage teams find their starting point.", [['Meet Kaemi ↗','index.html']]],
  work: ["Explore campaign strategy, community identity, launch storytelling, and things I've built with AI.", [['RouteX campaigns ↗','work.html#routex'],['Websites & video ↗','work.html#deepchatbi'],['Rabble Revolution ↗','work.html#rabble']]],
  experience: ["My background spans enterprise technology, crypto, and AI, with roles across growth strategy, creator partnerships, community, and product marketing.", [['Read Experience ↗','cv.html']]],
  contact: ["Open to remote work with a small, early-stage team. You can reach me by email or connect on LinkedIn.", [['Email ↗','mailto:Kaemi06@proton.me'],['LinkedIn ↗','https://www.linkedin.com/in/jing-zhu-137a18a4/']]]
 };
 function setOpen(open, restore = false) {
  panel.hidden = !open; launcher.setAttribute('aria-expanded',String(open));
  launcher.setAttribute('aria-label',open ? "Close Kaemi's site guide" : "Open Kaemi's site guide");
  if(open) close.focus(); else if(restore) launcher.focus();
 }
 launcher.addEventListener('click',()=>setOpen(panel.hidden));
 close.addEventListener('click',()=>setOpen(false,true));
 document.addEventListener('keydown',event=>{if(event.key==='Escape' && !panel.hidden)setOpen(false,true);});
 document.addEventListener('click',event=>{if(!panel.hidden && !root.contains(event.target))setOpen(false);});
 options.forEach(option=>option.addEventListener('click',()=>{
  options.forEach(item=>item.setAttribute('aria-pressed',String(item===option)));
  const [text, links] = answers[option.dataset.guide];
  root.querySelector('#guide-answer-text').textContent = text;
  root.querySelector('#guide-answer-links').replaceChildren(...links.map(([label,href])=>{
   const a=document.createElement('a');a.textContent=label;a.href=href;
   if(href.startsWith('https:')){a.target='_blank';a.rel='noopener noreferrer';}
   return a;
  }));
 }));
})();
