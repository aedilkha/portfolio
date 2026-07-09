// year
var y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();

// mobile menu
var menuBtn=document.getElementById('menuBtn'),navLinks=document.getElementById('navLinks');
if(menuBtn&&navLinks){
  menuBtn.addEventListener('click',function(){navLinks.classList.toggle('open');});
  navLinks.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){navLinks.classList.remove('open');});});
}

// nav scramble + glitch hover
var chars="!<>-_\\/[]{}=+*^?#01ABCDEF";
document.querySelectorAll('.nav-links a[data-text]').forEach(function(link){
  var label=link.childNodes[link.childNodes.length-1];
  var final=link.getAttribute('data-text');
  var raf,frame;
  link.addEventListener('mouseenter',function(){
    link.classList.add('glitch');
    var total=final.length;frame=0;
    cancelAnimationFrame(raf);
    (function run(){
      var out="";
      for(var i=0;i<total;i++){out+= i<frame/2 ? final[i] : chars[Math.floor(Math.random()*chars.length)];}
      label.textContent=out;frame++;
      if(frame<total*2+2){raf=requestAnimationFrame(run);}else{label.textContent=final;}
    })();
  });
  link.addEventListener('mouseleave',function(){link.classList.remove('glitch');cancelAnimationFrame(raf);label.textContent=final;});
});

// reveal on scroll
var obs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:.12});
document.querySelectorAll('.reveal').forEach(function(el,i){el.style.transitionDelay=(i%3*0.07)+'s';obs.observe(el);});

// matrix rain (only where #matrix exists)
(function(){
  var c=document.getElementById('matrix'); if(!c) return;
  var x=c.getContext('2d'),hero=c.parentElement,cols,drops,fs=14;
  function size(){c.width=hero.offsetWidth;c.height=hero.offsetHeight;cols=Math.floor(c.width/fs);drops=Array(cols).fill(1);}
  size();window.addEventListener('resize',size);
  var glyphs="01<>[]{}#$%&*+=/\\ABCDEF".split("");
  setInterval(function(){
    x.fillStyle="rgba(7,7,9,0.09)";x.fillRect(0,0,c.width,c.height);
    x.font=fs+"px monospace";
    for(var i=0;i<cols;i++){
      x.fillStyle=Math.random()>0.985?"#ff2b39":"#00ff88";
      x.fillText(glyphs[Math.floor(Math.random()*glyphs.length)],i*fs,drops[i]*fs);
      if(drops[i]*fs>c.height&&Math.random()>0.975)drops[i]=0;
      drops[i]++;
    }
  },60);
})();

// ---- anti-copy / anti-save (deterrent) ----
['contextmenu','dragstart','selectstart','copy','cut'].forEach(function(ev){
  document.addEventListener(ev,function(e){e.preventDefault();},{capture:true});
});
document.addEventListener('keydown',function(e){
  var k=(e.key||'').toLowerCase();
  if((e.ctrlKey||e.metaKey)&&['s','u','c','a','p'].indexOf(k)>-1){e.preventDefault();}
  if(k==='f12'){e.preventDefault();}
},{capture:true});
