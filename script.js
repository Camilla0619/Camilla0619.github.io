const button = document.querySelector('#theme');
let saved;
try { saved = localStorage.getItem('kaemi-theme-v2'); } catch {}
const prefersDark = false;
document.body.classList.toggle('dark', saved ? saved === 'dark' : prefersDark);
function syncTheme() { button.setAttribute('aria-label', document.body.classList.contains('dark') ? 'Switch to light theme' : 'Switch to dark theme'); }
syncTheme();
button.addEventListener('click', () => {
  const dark = document.body.classList.toggle('dark');
  try { localStorage.setItem('kaemi-theme-v2', dark ? 'dark' : 'light'); } catch {}
  syncTheme();
});
document.querySelector('#year').textContent = new Date().getFullYear();
const clock = document.querySelector('#local-clock');
if (clock) {
  const updateClock = () => { clock.textContent = new Intl.DateTimeFormat('en-GB', { timeZone:'Asia/Shanghai', hour:'2-digit', minute:'2-digit', hourCycle:'h23' }).format(new Date()); };
  updateClock();
  setInterval(updateClock, 60000);
}
const currentPage = location.pathname.split('/').pop() || 'index.html';
for (const link of document.querySelectorAll('header nav a')) {
  if (link.getAttribute('href') === currentPage) link.setAttribute('aria-current', 'page');
}
const folders = [...document.querySelectorAll('.project-folder, .work-folder')];
document.querySelector('#collapse-folders')?.addEventListener('click', () => {
  for (const folder of folders) folder.open = false;
  for (const video of document.querySelectorAll('video')) video.pause();
});
document.querySelector('#expand-folders')?.addEventListener('click', () => {
  for (const folder of folders) folder.open = true;
});
for (const folder of folders) folder.addEventListener('toggle', () => {
  if (!folder.open) for (const video of folder.querySelectorAll('video')) video.pause();
});

function revealHashTarget() {
 const target = document.getElementById(location.hash.slice(1));
 if (!target) return;
 if (target.tagName === 'DETAILS') target.open = true;
 let node = target.parentElement;
 while (node) { if (node.tagName === 'DETAILS') node.open = true; node = node.parentElement; }
}
window.addEventListener('hashchange', revealHashTarget);
revealHashTarget();
const wardrobeToggle = document.querySelector('#wardrobe-toggle');
wardrobeToggle?.addEventListener('click', () => {
 const open=document.querySelector('.personal-avatar').classList.toggle('wardrobe-open');
 wardrobeToggle.setAttribute('aria-expanded',String(open));
 wardrobeToggle.textContent=open?'Less, please ↙':'Play dress-up ↗';
});
const moodButton=document.querySelector('#little-mood');
const littleMoods=['☕ probably having coffee','🌧 probably raining','🐈 probably petting lailai'];
let moodIndex=0;
if(moodButton){
 const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
 moodButton.setAttribute('aria-label','Current mood. Click to change.');
 const nextMood=()=>{
  moodIndex=(moodIndex+1)%littleMoods.length;
  moodButton.textContent=littleMoods[moodIndex];
  if(!reducedMotion.matches)moodButton.animate([{opacity:0,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:380,easing:'ease-out'});
 };
 moodButton.addEventListener('click',nextMood);
 setInterval(()=>{if(!document.hidden && !moodButton.matches(':hover, :focus'))nextMood();},4500);
}
