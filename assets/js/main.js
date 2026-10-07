var side=document.getElementById('side');
document.getElementById('mb').onclick=function(){side.classList.toggle('open')};
side.addEventListener('click',function(e){if(e.target.tagName==='A')side.classList.remove('open')});
var r=document.documentElement;try{var s=localStorage.getItem('tema');if(s)r.dataset.theme=s}catch(e){}
document.getElementById('th').onclick=function(){var d=r.dataset.theme==='dark'||(!r.dataset.theme&&matchMedia('(prefers-color-scheme:dark)').matches);r.dataset.theme=d?'light':'dark';try{localStorage.setItem('tema',r.dataset.theme)}catch(e){}};

(function(){var last;
function close(){var l=document.querySelector('.lb');if(l){l.remove();document.body.style.overflow='';document.removeEventListener('keydown',key);if(last)last.focus()}}
function key(e){if(e.key==='Escape')close()}
function open(img){last=img;var l=document.createElement('div');l.className='lb';l.setAttribute('role','dialog');l.setAttribute('aria-modal','true');l.setAttribute('aria-label','Imatge ampliada');
l.innerHTML='<div class="bar2"><span>Clica la imatge per ampliar-la o reduir-la</span><button type="button">Tanca ✕</button></div><div class="stage"><img></div>';
var im=l.querySelector('img');im.src=img.dataset.full||img.src;im.alt=img.alt;
im.onclick=function(){l.classList.toggle('big')};
l.querySelector('button').onclick=close;
l.querySelector('.stage').onclick=function(e){if(e.target===this)close()};
document.body.appendChild(l);document.body.style.overflow='hidden';document.addEventListener('keydown',key);l.querySelector('button').focus()}
document.querySelectorAll('figure img').forEach(function(i){i.setAttribute('tabindex','0');i.setAttribute('role','button');i.title='Clica per ampliar';i.style.cursor='zoom-in';
i.onclick=function(){open(i)};i.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open(i)}}});
})();
