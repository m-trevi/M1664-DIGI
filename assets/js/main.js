var side=document.getElementById('side');
document.getElementById('mb').onclick=function(){side.classList.toggle('open')};
side.addEventListener('click',function(e){if(e.target.tagName==='A')side.classList.remove('open')});
var r=document.documentElement;try{var s=localStorage.getItem('tema');if(s)r.dataset.theme=s}catch(e){}
document.getElementById('th').onclick=function(){var d=r.dataset.theme==='dark'||(!r.dataset.theme&&matchMedia('(prefers-color-scheme:dark)').matches);r.dataset.theme=d?'light':'dark';try{localStorage.setItem('tema',r.dataset.theme)}catch(e){}};
