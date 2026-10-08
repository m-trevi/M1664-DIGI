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

/* Impressió / PDF: botó a cada tema + versió neta per a paper */
(function(){
  var isTema=/\bra\d\b/.test(document.body.className);
  var art=document.querySelector('main article')||document.querySelector('main');
  if(!isTema||!art)return;
  var h1=art.querySelector('h1');if(!h1)return;
  var btn=document.createElement('button');
  btn.type='button';btn.className='print-btn sans';
  btn.innerHTML='&#128424;&#65039; Imprimeix o desa en PDF';
  btn.title='Obre la versió per a imprimir; tria «Desa com a PDF» com a destinació';
  btn.addEventListener('click',function(){window.print()});
  var lead=art.querySelector('p.lead');
  (lead||h1).insertAdjacentElement('afterend',btn);
  var ph=document.createElement('div');ph.className='pr-head sans';
  ph.textContent='MP1664 · Digitalització aplicada als sectors productius · CFGM SMX — '+h1.textContent.trim();
  art.insertBefore(ph,art.firstChild);
  var theme=null,reopen=[];
  window.addEventListener('beforeprint',function(){
    var r=document.documentElement;theme=r.getAttribute('data-theme');r.setAttribute('data-theme','light');
    reopen=[];document.querySelectorAll('details').forEach(function(d){if(!d.open){d.open=true;reopen.push(d)}});
  });
  window.addEventListener('afterprint',function(){
    var r=document.documentElement;
    if(theme===null)r.removeAttribute('data-theme');else r.setAttribute('data-theme',theme);
    reopen.forEach(function(d){d.open=false});
  });
})();
