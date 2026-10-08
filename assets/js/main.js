var side=document.getElementById('side');
document.getElementById('mb').onclick=function(){side.classList.toggle('open')};
side.addEventListener('click',function(e){if(e.target.tagName==='A')side.classList.remove('open')});
var r=document.documentElement;try{var s=localStorage.getItem('tema');if(s)r.dataset.theme=s}catch(e){}
document.getElementById('th').onclick=function(){var d=r.dataset.theme==='dark'||(!r.dataset.theme&&matchMedia('(prefers-color-scheme:dark)').matches);r.dataset.theme=d?'light':'dark';try{localStorage.setItem('tema',r.dataset.theme)}catch(e){}};

/* Visor d'imatges i infografies: clic (o Intro/Espai) per ampliar, Esc o clic fora per tancar */
(function(){
  var targets=document.querySelectorAll('figure img, figure svg');
  if(!targets.length||!window.HTMLDialogElement)return;
  var dlg=document.createElement('dialog');dlg.className='lb';
  dlg.innerHTML='<div class="lb-box"><button type="button" class="lb-x" aria-label="Tanca">&times;</button><div class="lb-body"></div></div>';
  document.body.appendChild(dlg);
  var body=dlg.querySelector('.lb-body');
  function open(el){
    body.innerHTML='';
    var c=el.cloneNode(true);
    c.removeAttribute('tabindex');c.removeAttribute('role');c.classList.remove('zoomable');
    if(c.tagName.toLowerCase()==='svg'){c.removeAttribute('style');}
    body.appendChild(c);
    dlg.showModal();
  }
  targets.forEach(function(el){
    el.classList.add('zoomable');
    el.setAttribute('tabindex','0');el.setAttribute('role','button');
    var l=el.getAttribute('aria-label')||el.getAttribute('alt')||'';
    if(el.tagName.toLowerCase()==='svg')el.setAttribute('aria-label',(l?l+'. ':'')+'Prem Intro per ampliar');
    el.title='Clica per ampliar';
    el.addEventListener('click',function(){open(el)});
    el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();open(el)}});
  });
  dlg.addEventListener('click',function(e){if(e.target===dlg||e.target.classList.contains('lb-x'))dlg.close()});
})();
