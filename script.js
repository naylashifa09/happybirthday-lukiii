const $=id=>document.getElementById(id);
const esc=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
$("nm").textContent=C.nama;

const pages=[
  {kick:"Open the envelope",title:"A letter for you",nav:"The letter",
   html:`<p class="hw big">Dear ${esc(C.nama)},</p><p class="body">${esc(C.surat)}</p><p class="hw sign">With love, ${esc(C.from)}</p>`}
];
C.foto.forEach((f,i)=>pages.push({kick:"Our moments",title:"Our photos",nav:"Photo "+(i+1),
  html:`<div class="pic">${f.src?`<img src="${esc(f.src)}" alt="" onerror="this.outerHTML='📷'">`:"📷"}</div><p class="hw cap">${esc(f.cap)}</p>`}));
function cakeSVG(){
  const cols=["#ffd36e","#9fdcc0","#f9a8d4","#b79ae0","#ffd36e"],xs=[100,125,150,175,200];
  const mac=(x,y,c)=>`<ellipse cx="${x}" cy="${y+3}" rx="11" ry="5" fill="${c}"/><rect x="${x-10}" y="${y}" width="20" height="2.6" fill="#fff" opacity=".85"/><ellipse cx="${x}" cy="${y-1}" rx="11" ry="6" fill="${c}"/>`;
  let v=`<svg viewBox="0 50 300 285" class="cakesvg"><defs><radialGradient id="gl"><stop offset="0" stop-color="#ffe9a8" stop-opacity=".9"/><stop offset="1" stop-color="#ffd36e" stop-opacity="0"/></radialGradient></defs>`;
  v+=`<ellipse cx="150" cy="322" rx="52" ry="7" fill="#d8d2da"/><rect x="141" y="294" width="18" height="28" fill="#e6e1e8"/><ellipse cx="150" cy="290" rx="112" ry="17" fill="#f4f1f5" stroke="#dcd6de"/>`;
  v+=`<rect x="48" y="212" width="204" height="74" rx="16" fill="#c4abe6"/><ellipse cx="150" cy="214" rx="102" ry="11" fill="#d6c3f0"/>`;
  for(let x=60;x<=240;x+=12)v+=`<circle cx="${x}" cy="283" r="5" fill="#a98ad8"/>`;
  const sc=["#ffd36e","#ff8fb1","#9fdcc0","#fff","#8ec5ff"];
  for(let i=0;i<34;i++){const x=62+(i*53)%176,y=232+(i*37)%38;v+=`<rect x="${x}" y="${y}" width="7" height="2.4" rx="1.2" fill="${sc[i%5]}" transform="rotate(${(i*47)%180} ${x} ${y})"/>`}
  v+=`<rect x="78" y="132" width="144" height="84" rx="14" fill="#f7a3c2"/><ellipse cx="150" cy="134" rx="72" ry="10" fill="#fff"/>`;
  for(let x=88;x<=206;x+=19)v+=`<rect x="${x}" y="134" width="13" height="${16+(x*7)%20}" rx="6.5" fill="#fff"/>`;
  v+=mac(72,208,"#9fdcc0")+mac(100,204,"#ffc2a8")+mac(200,204,"#9fdcc0")+mac(228,208,"#ffc2a8");
  xs.forEach((x,i)=>{
    v+=`<rect x="${x-4}" y="92" width="8" height="42" rx="2" fill="${cols[i]}"/><path d="M${x-4} 104l8-4M${x-4} 116l8-4M${x-4} 128l8-4" stroke="#fff" stroke-opacity=".7" stroke-width="2"/>`;
    v+=`<path class="sm" id="s${i}" d="M${x} 80q-6-9 0-17q6-8 0-16" stroke="#fff" fill="none" stroke-width="3" stroke-linecap="round"/>`;
    v+=`<g class="fl" id="f${i}"><circle cx="${x}" cy="82" r="18" fill="url(#gl)"/><ellipse cx="${x}" cy="82" rx="4.6" ry="8" fill="#ffb347"/><ellipse cx="${x}" cy="84" rx="2.4" ry="4.6" fill="#fff3b0"/></g>`;
  });
  v+=`<path d="M150 136C128 122 136 106 150 116C164 106 172 122 150 136Z" fill="#e63946"/>`;
  v+=mac(110,128,"#ffc2a8")+mac(190,128,"#9fdcc0");
  return v+`</svg>`;
}
pages.push({kick:"Make a wish",title:"Blow the candles",nav:"The candles",cake:true,
  html:`<div class="scene"><div class="glow"></div>${cakeSVG()}<div class="card"><div class="cn" id="cn"><i></i><i></i><i></i><i></i><i></i></div><small>Make a wish</small><h2 id="ct">Blow out the candles</h2><div id="ctl"><div class="btns"><button id="mic">🎤 Microphone</button><button id="hold">≋ Hold</button></div><p class="note" id="note">The microphone only listens for your breath, right here on your device. Nothing is recorded.</p></div></div></div>`});

/* ===== Halaman terakhir: balon umur ===== */
const fl=document.createElement("link");fl.rel="stylesheet";fl.href="https://fonts.googleapis.com/css2?family=Fredoka:wght@700&display=swap";document.head.appendChild(fl);
function umur(){
  if(C.umur)return C.umur;
  if(!C.tanggalUlangTahun)return "";
  return Math.round((Date.now()-new Date(C.tanggalUlangTahun+"T00:00:00"))/31557600000);
}
function balloonSVG(t){
  return `<svg viewBox="0 0 260 230" class="bal"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd9d1"/><stop offset=".5" stop-color="#f6a79d"/><stop offset="1" stop-color="#ffcdc4"/></linearGradient><filter id="bs" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="8" stdDeviation="7" flood-color="#d9776b" flood-opacity=".35"/></filter></defs><path d="M115 152Q108 190 114 225M145 152Q152 190 146 225" stroke="#e7b3ab" fill="none" stroke-width="1.2"/><g filter="url(#bs)"><text x="130" y="150" text-anchor="middle" class="bt" fill="url(#bg)" stroke="#f9b9b0" stroke-width="5">${t}</text></g><text x="127" y="146" text-anchor="middle" class="bt" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="2">${t}</text></svg>`;
}
pages.push({kick:"",title:"",nav:"The wish",fin:true,
  html:`<div class="fin">${balloonSVG(umur())}<small class="fk">Make a wish</small><h2 class="ft">Happy birthday, <b>${esc(C.nama)}</b>!</h2>${C.doa?`<p class="fd">${esc(C.doa)}</p>`:""}<p class="hw fs">With all my love,<br>${esc(C.from)}</p><p class="love"><span>❤️</span> + <span>💙</span> = <span>💜</span></p><button id="rep">↻ Watch again</button></div>`});

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
  stopAll();$("app").classList.toggle("cakepg",!!pages[cur].cake);$("app").classList.toggle("finpg",!!pages[cur].fin);
  const p=pages[cur];
  $("kick").textContent=p.kick;$("ttl").textContent=p.title;$("nt").textContent=p.nav;
  $("cnt").textContent=(cur+1)+"/"+pages.length;
  const st=$("stage");st.innerHTML=p.html;st.style.animation="none";st.offsetHeight;st.style.animation="";st.scrollTop=0;
  [...$("dots").children].forEach((d,k)=>d.classList.toggle("on",k===cur));
  $("prev").disabled=cur===0;$("next").disabled=cur===pages.length-1;
  if(p.cake)initCake();
  if(p.fin){$("rep").onclick=()=>show(0);confetti(140)}
}
let lit=[],mic=null,holdT=null;
function stopAll(){
  clearInterval(holdT);holdT=null;
  if(mic){clearInterval(mic.t);mic.stream.getTracks().forEach(t=>t.stop());try{mic.ctx.close()}catch(e){}mic=null}
}
function snuff(){
  const i=lit.indexOf(true);if(i<0)return;
  lit[i]=false;$("f"+i).classList.add("out");$("s"+i).classList.add("go");
  $("cn").children[i].classList.add("off");
  if(!lit.includes(true))finish();
}
function finish(){
  stopAll();confetti(220);
  $("ct").textContent="Yay! Happy birthday 🎉";
  $("ctl").innerHTML=`<p class="hw wishtxt">${esc(C.doa)}</p><button id="again">again? 🎊</button>`;
  $("again").onclick=()=>show(cur);
  setTimeout(()=>{if(pages[cur].cake)show(cur+1)},1800);
}
async function startMic(){
  if(mic)return;
  try{
    const stream=await navigator.mediaDevices.getUserMedia({audio:true});
    const ctx=new (window.AudioContext||window.webkitAudioContext)();
    const an=ctx.createAnalyser();an.fftSize=1024;
    ctx.createMediaStreamSource(stream).connect(an);
    const buf=new Uint8Array(an.fftSize);let last=0;
    const t=setInterval(()=>{
      an.getByteTimeDomainData(buf);let sum=0;
      for(const x of buf){const d=(x-128)/128;sum+=d*d}
      if(Math.sqrt(sum/buf.length)>0.1&&Date.now()-last>550){last=Date.now();snuff()}
    },80);
    mic={stream,ctx,t};
    $("mic").classList.add("on");$("note").textContent="Listening… blow gently into your mic 🌬️";
  }catch(e){$("note").textContent="Mic can’t be used here, try the Hold button instead 💗"}
}
function initCake(){
  lit=[true,true,true,true,true];
  const h=$("hold");
  h.onpointerdown=e=>{e.preventDefault();if(holdT)return;snuff();holdT=setInterval(snuff,650)};
  const end=()=>{clearInterval(holdT);holdT=null};
  h.onpointerup=h.onpointerleave=h.onpointercancel=end;
  h.oncontextmenu=e=>e.preventDefault();
  $("mic").onclick=startMic;
}
$("prev").onclick=()=>show(cur-1);
$("next").onclick=()=>show(cur+1);
addEventListener("keydown",e=>{if(e.key==="ArrowRight")show(cur+1);if(e.key==="ArrowLeft")show(cur-1)});
let sx=0;
$("stage").addEventListener("touchstart",e=>sx=e.touches[0].clientX,{passive:true});
$("stage").addEventListener("touchend",e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>60)show(cur+(d<0?1:-1))});

/* ===== Musik (YouTube atau file mp3) ===== */
let ytp=null,audio=null,wantPlay=false,musOn=false;
function setIcon(on){musOn=on;const b=$("mus");if(b)b.textContent=on?"🔊":"🔇"}
function playMusic(){
  wantPlay=true;
  if(audio)audio.play().then(()=>setIcon(true)).catch(()=>setIcon(false));
  else if(ytp&&ytp.playVideo)ytp.playVideo();
}
function pauseMusic(){
  wantPlay=false;
  if(audio){audio.pause();setIcon(false)}else if(ytp&&ytp.pauseVideo)ytp.pauseVideo();
}
function initMusic(){
  if(C.lagu){audio=new Audio(C.lagu);audio.loop=true;audio.volume=.8}
  else if(C.youtube){
    const d=document.createElement("div");d.id="yt";
    d.style.cssText="position:fixed;left:-10px;top:-10px;width:1px;height:1px;opacity:0;pointer-events:none";
    document.body.appendChild(d);
    const sc=document.createElement("script");sc.src="https://www.youtube.com/iframe_api";document.head.appendChild(sc);
    window.onYouTubeIframeAPIReady=()=>{ytp=new YT.Player("yt",{height:"1",width:"1",videoId:C.youtube,
      playerVars:{playsinline:1,loop:1,playlist:C.youtube},
      events:{onReady:()=>{if(wantPlay)ytp.playVideo()},onStateChange:e=>setIcon(e.data===1)}})};
  }else return;
  const b=document.createElement("button");b.id="mus";b.hidden=true;b.setAttribute("aria-label","Musik");b.textContent="🔇";
  b.onclick=()=>musOn?pauseMusic():playMusic();
  $("app").appendChild(b);
}
initMusic();

$("env").onclick=()=>{
  playMusic();if($("mus"))$("mus").hidden=false;
  $("env").classList.add("open");
  setTimeout(()=>{$("gate").classList.add("gone");$("app").hidden=false;show(0);confetti()},900);
};
