document.querySelectorAll('.mascot-play').forEach(button=>{
 button.addEventListener('click',()=>{
  if(button.classList.contains('pepe-play')){
   const active=button.getAttribute('aria-pressed')!=='true';
   button.setAttribute('aria-pressed',String(active));button.classList.toggle('playing',active);
   button.querySelector('small').textContent=active?'Gather them ↗':'Play the idea ↗';
  }else{
   button.classList.remove('playing');void button.offsetWidth;button.classList.add('playing');
   button.querySelector('small').textContent='Replay ↗';
  }
 });
});
