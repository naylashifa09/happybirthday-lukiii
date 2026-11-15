const $=id=>document.getElementById(id);
const esc=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
$("nm").textContent=C.nama;

/* ===== Daftar halaman (urutannya bisa kamu ubah) ===== */
const pages=[
  {kick:"Open the envelope",title:"A letter for you",nav:"The letter",
   html:`<p class="hw big">Dear ${esc(C.nama)},</p><p class="body">${esc(C.surat)}</p><p class="hw sign">With love, ${esc(C.from)}</p>`}
];
C.foto.forEach((f,i)=>pages.push({kick:"Our moments",title:"Our photos",nav:"Photo "+(i+1),
  html:`<div class="pic">${f.src?`<img src="${esc(f.src)}" alt="" onerror="this.outerHTML='📷'">`:"📷"}</div><p class="hw cap">${esc(f.cap)}</p>`}));
pages.push({kick:"Make a wish",title:"Blow the candles",nav:"The cake",cake:true,
  html:`<div class="cakebox"><div class="cake" id="cake"><span class="flame" id="flame">🔥</span><br>🎂</div><p class="hw" id="wish">Tap the cake 💗</p><button id="again" hidden>again? 🎊</button></div>`});

/* ===== Confetti ===== */
const cv=$("cv"),cx=cv.getContext("2d");let P=[],run=false;
function size(){cv.width=innerWidth;cv.height=innerHeight}size();addEventListener("resize",size);
function confetti(n=140){
  const col=["#d62a5a","#f9a8d4","#fbbf24","#a78bfa","#34d399","#fb7185"];
  for(let i=0;i<n;i++)P.push({x:cv.width/2,y:cv.height*.6,vx:(Math.random()-.5)*14,vy:-Math.random()*16-4,s:Math.random()*7+4,c:col[i%6],r:Math.random()*6});
  if(!run){run=true;loop()}
}
function loop(){
  cx.clearRect(0,0,cv.width,cv.height);
  P=P.filter(p=>p.y<cv.height+20);
  P.forEach(p=>{p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.r+=.2;cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6);cx.restore()});
  if(P.length)requestAnimationFrame(loop);else run=false;
}

/* ===== Navigasi halaman ===== */
let cur=0;
$("dots").innerHTML=pages.map(()=>"<i></i>").join("");
function show(i){
  cur=Math.max(0,Math.min(pages.length-1,i));
  const p=pages[cur];
  $("kick").textContent=p.kick;$("ttl").textContent=p.title;$("nt").textContent=p.nav;
  $("cnt").textContent=(cur+1)+"/"+pages.length;
  const st=$("stage");st.innerHTML=p.html;st.style.animation="none";st.offsetHeight;st.style.animation="";st.scrollTop=0;
  [...$("dots").children].forEach((d,k)=>d.classList.toggle("on",k===cur));
  $("prev").disabled=cur===0;$("next").disabled=cur===pages.length-1;
  if(p.cake)initCake();
}
function initCake(){
  let blown=false;
  $("cake").onclick=()=>{
    if(blown)return;blown=true;
    $("flame").classList.add("off");$("wish").textContent=C.doa;$("again").hidden=false;confetti(200);
  };
  $("again").onclick=()=>{blown=false;$("flame").classList.remove("off");$("wish").textContent="Tap the cake 💗";$("again").hidden=true;confetti(200)};
}
$("prev").onclick=()=>show(cur-1);
$("next").onclick=()=>show(cur+1);
addEventListener("keydown",e=>{if(e.key==="ArrowRight")show(cur+1);if(e.key==="ArrowLeft")show(cur-1)});
let sx=0;
$("stage").addEventListener("touchstart",e=>sx=e.touches[0].clientX,{passive:true});
$("stage").addEventListener("touchend",e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>60)show(cur+(d<0?1:-1))});

$("env").onclick=()=>{
  $("env").classList.add("open");
  setTimeout(()=>{$("gate").classList.add("gone");$("app").hidden=false;show(0);confetti()},900);
};
