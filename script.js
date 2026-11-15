const $=id=>document.getElementById(id);
const fmt=d=>new Date(d+"T00:00:00").toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"});
$("nm").textContent=C.nama;$("from").textContent=C.dari;
$("msg").textContent=C.surat;$("sig").textContent="Dengan cinta, "+C.dari;
$("dateLine").textContent=fmt(C.tanggalUlangTahun);
$("sinceLine").textContent="Sejak "+fmt(C.jadianSejak);
$("reasons").innerHTML=C.alasan.map((t,i)=>`<div class="reason"><b>${i+1}</b><span>${t}</span></div>`).join("");
$("photos").innerHTML=C.foto.map(f=>`<div class="ph">${f.src?`<img src="${f.src}" alt="" onerror="this.outerHTML='<span>📷</span>'">`:"<span>📷</span>"}<div>${f.cap}</div></div>`).join("");

function tick(){
  const ms=Date.now()-new Date(C.jadianSejak+"T00:00:00");
  const d=Math.floor(ms/864e5),h=Math.floor(ms/36e5)%24,m=Math.floor(ms/6e4)%60;
  $("count").innerHTML=[[d,"hari"],[h,"jam"],[m,"menit"]].map(([v,l])=>`<div><b>${v}</b>${l}</div>`).join("");
}
tick();setInterval(tick,30000);

const cv=$("cv"),cx=cv.getContext("2d");let P=[],run=false;
function size(){cv.width=innerWidth;cv.height=innerHeight}size();addEventListener("resize",size);
function confetti(n=140){
  const col=["#ec4899","#f9a8d4","#fbbf24","#a78bfa","#34d399","#fb7185"];
  for(let i=0;i<n;i++)P.push({x:cv.width/2,y:cv.height*.6,vx:(Math.random()-.5)*14,vy:-Math.random()*16-4,s:Math.random()*7+4,c:col[i%6],r:Math.random()*6});
  if(!run){run=true;loop()}
}
function loop(){
  cx.clearRect(0,0,cv.width,cv.height);
  P=P.filter(p=>p.y<cv.height+20);
  P.forEach(p=>{p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.r+=.2;cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6);cx.restore()});
  if(P.length)requestAnimationFrame(loop);else run=false;
}

$("env").onclick=()=>{
  $("env").classList.add("open");
  setTimeout(()=>{$("gate").classList.add("gone");confetti()},900);
};

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show")}}),{threshold:.3});
document.querySelectorAll(".reason").forEach((el,i)=>{el.style.transitionDelay=i*.12+"s";io.observe(el)});

let blown=false;
$("cake").onclick=()=>{
  if(blown)return;blown=true;
  $("flame").classList.add("off");
  $("wish").textContent=C.doa;
  $("again").hidden=false;
  confetti(200);
};
$("again").onclick=()=>{
  blown=false;$("flame").classList.remove("off");$("wish").textContent="";$("again").hidden=true;confetti(200);
};
