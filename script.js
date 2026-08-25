const PASSWORD="0809";
const START=new Date("2026-08-09T10:30:00+03:00");

const $=s=>document.querySelector(s);
const pages=[...document.querySelectorAll(".page")];
const site=$("#site"), login=$("#login"), pass=$("#password"), error=$("#error"), music=$("#music");

function startSite(){
  login.classList.add("hidden"); site.classList.remove("hidden");
  try{music.volume=.55; music.play().catch(()=>{});}catch(e){}
  showPage("page1");
  makeRepeats();
  makeHearts();
}
function check(){if(pass.value===PASSWORD){startSite()}else{error.textContent="Şifre yanlış... 🤍";pass.value="";pass.focus()}}
$("#enterBtn").addEventListener("click",check);
pass.addEventListener("keydown",e=>{if(e.key==="Enter")check()});

function showPage(id){
  pages.forEach(p=>p.classList.toggle("active-page",p.id===id));
  window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll(".next-btn[data-next]").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.next)));
$("#finishBtn").addEventListener("click",()=>showPage("page5"));

function updateCounter(){
  let diff=Math.max(0,Date.now()-START.getTime());
  const sec=Math.floor(diff/1000), days=Math.floor(sec/86400), hours=Math.floor(sec%86400/3600), mins=Math.floor(sec%3600/60), seconds=sec%60;
  $("#days").textContent=days;$("#hours").textContent=hours;$("#minutes").textContent=mins;$("#seconds").textContent=seconds;
}
updateCounter();setInterval(updateCounter,1000);

function makeRepeats(){
  const love=$("#love100"), heart=$("#heart100"), evil=$("#evil100");
  for(let i=0;i<100;i++){
    const a=document.createElement("span");a.textContent="Seni seviyorum 🤍";love.appendChild(a);
    const b=document.createElement("span");b.textContent="🤍";heart.appendChild(b);
    const c=document.createElement("span");c.textContent="🧿";evil.appendChild(c);
  }
}
let taps=0;
$("#gift").addEventListener("dblclick",()=>openGift());
$("#gift").addEventListener("touchend",e=>{ /* dblclick handles most mobile browsers */ });
function openGift(){
  $("#gift").style.display="none";$("#letter").classList.remove("hidden");
  for(let i=0;i<12;i++)setTimeout(()=>spawnHeart(),i*100);
}
function spawnHeart(){
 const h=document.createElement("div");h.className="float-heart";h.textContent=Math.random()>.35?"🤍":"🧿";
 h.style.left=Math.random()*100+"vw";h.style.animationDuration=(4+Math.random()*4)+"s";
 $(".floating-hearts").appendChild(h);setTimeout(()=>h.remove(),9000);
}
setInterval(()=>{if(!site.classList.contains("hidden"))spawnHeart()},1300);

// FOTOĞRAF YÜKLEME: photo1.jpg, photo2.jpg ... dosyalarını klasöre koy.
// Sayı arttıkça otomatik albüme eklenir.
(function loadPhotos(){
 const album=$("#album");
 let found=0;
 const extensions=["jpg","jpeg","png","webp"];
 for(let i=1;i<=30;i++){
   extensions.forEach(ext=>{
     const img=new Image();
     img.onload=()=>{
       if(found===0) album.innerHTML="";
       found++;
       const card=document.createElement("div");card.className="photo-card";
       card.style.setProperty("--r",(Math.random()*2-1).toFixed(2)+"deg");
       const real=new Image();real.src="photo"+i+"."+ext;real.alt="Bizim fotoğrafımız "+i;
       card.appendChild(real);album.appendChild(card);
     };
     img.src="photo"+i+"."+ext+"?x="+Date.now();
   });
 }
})();
