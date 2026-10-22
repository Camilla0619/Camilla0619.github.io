(() => {
 const root=document.querySelector('.personal-avatar');if(!root)return;
 const stage=root.querySelector('.avatar-stage'),image=root.querySelector('.personal-character'),pause=root.querySelector('#orbit-toggle'),status=root.querySelector('#outfit-status');
 const objects=[...root.querySelectorAll('[data-part]')],buttons=[...root.querySelectorAll('[data-mode]')];
 const modes={casual:{outfit:'black',hair:'loose',hand:'none',pose:''},work:{outfit:'white',hair:'loose',hand:'coffee',pose:'work'},training:{outfit:'sport',hair:'pony',hand:'gloves',pose:''},petting:{outfit:'black',hair:'loose',hand:'cat',pose:''}};
 const names={black:'Black tank & denim',white:'White tank & denim',sport:'Training clothes',loose:'hair down',pony:'ponytail',none:'',mac:'MacBook',gloves:'pink gloves',coffee:'coffee',cat:'Time with 涞涞',work:'MacBook'};
 let state={...modes.casual},revision=0;const cache=new Map();
 function source(s){if(s.outfit==='sport'){if(s.hair==='pony'&&s.hand==='gloves')return 'assets/avatar-mode-training.png';return `assets/avatar-sport-${s.hair}${s.hand==='none'?'':'-'+s.hand}-v2.png`;}if(s.hand==='cat'&&s.outfit==='black'&&s.hair==='loose')return 'assets/avatar-petting.png';if(s.pose==='work')return 'assets/avatar-work-coffee.png';if(s.hand==='none')return `assets/avatar-${s.outfit}-${s.hair}.png`;if(s.outfit==='white'&&s.hair==='loose'&&s.hand==='mac')return 'assets/avatar-mode-work.png';if(s.outfit==='sport'&&s.hair==='pony'&&s.hand==='gloves')return 'assets/avatar-mode-training.png';return `assets/avatar-${s.outfit}-${s.hair}-${s.hand}.png`;}
 async function render(){const rev=++revision,snapshot={...state},src=source(snapshot);root.setAttribute('aria-busy','true');status.textContent='Changing…';
 for(const b of objects)b.setAttribute('aria-pressed',String((state[b.dataset.part]===b.dataset.value||(state.pose==='work'&&b.dataset.value==='mac'))));
 for(const b of buttons)b.setAttribute('aria-pressed',String(Object.keys(state).every(k=>state[k]===modes[b.dataset.mode][k])));
 try{if(!cache.has(src)){const im=new Image();im.src=src;cache.set(src,im);}await cache.get(src).decode();if(rev!==revision)return;image.src=src;image.alt=`Kaemi: ${Object.values(snapshot).map(v=>names[v]).filter(Boolean).join(', ')}`;status.textContent=Object.values(snapshot).map(v=>names[v]).filter(Boolean).join(' · ');}catch{if(rev===revision)status.textContent='This look could not load. Please try again.';}finally{if(rev===revision)root.setAttribute('aria-busy','false');}}
 for(const b of buttons)b.addEventListener('click',()=>{state={...modes[b.dataset.mode]};render();});
 for(const b of objects)b.addEventListener('click',()=>{const {part,value}=b.dataset;if(part!=='hand'&&state[part]===value)return;if(state.pose==='work'&&part==='hand'&&(value==='coffee'||value==='mac')){state.pose='';state.hand=value==='coffee'?'mac':'coffee';}else{state.pose='';state[part]=part==='hand'&&state[part]===value?'none':value;}render();});
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let paused=reduced.matches,hover=false,focused=false,angle=-.7,last=0;
 function label(){pause.textContent=paused?'Play orbit':'Pause orbit';pause.setAttribute('aria-pressed',String(paused));}
 pause.addEventListener('click',()=>{paused=!paused;label();});stage.addEventListener('pointerenter',()=>hover=true);stage.addEventListener('pointerleave',()=>hover=false);stage.addEventListener('focusin',()=>focused=true);stage.addEventListener('focusout',e=>focused=stage.contains(e.relatedTarget));reduced.addEventListener('change',()=>{paused=reduced.matches;label();});
 function frame(t){const dt=Math.min(t-last||0,40);last=t;if(!paused&&!hover&&!focused&&!document.hidden)angle+=dt*.00013;
 const w=stage.clientWidth,h=stage.clientHeight,r=Math.min(w*.38,155);
 objects.forEach((b,i)=>{const a=angle+i*Math.PI*2/objects.length,tilt=.31,roll=-.36;const x=r*Math.cos(a),y=r*Math.sin(a)*Math.sin(tilt),z=r*Math.sin(a)*Math.cos(tilt);const perspective=550/(550-z);const px=(x*Math.cos(roll)-y*Math.sin(roll))*perspective,py=(x*Math.sin(roll)+y*Math.cos(roll))*perspective;const scale=perspective*.92;b.style.transform=`translate(${w/2+px-28}px,${h*.52+py-28}px) scale(${scale})`;b.style.zIndex=z>0?'30':'10';b.style.opacity=String(.78+.22*(z/r+1)/2);});requestAnimationFrame(frame);}
 label();render();requestAnimationFrame(frame);
})();
