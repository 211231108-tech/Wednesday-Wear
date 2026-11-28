const C={"Off White":"#FAF8F4","Dusty Blue":"#8FA3B8","Sand":"#D8C3A5","Olive":"#6B6B3A","Black":"#1A1A1A","Mocha":"#7B5E4B","Navy":"#1F2A44","Charcoal":"#333333","Dusty Rose":"#C9A0A0"};
const products=[
["Relaxed Oversized Shirt","Relaxed Tops",["Off White","Dusty Blue"],"Potongan longgar yang proporsional dan tetap rapi."],
["Minimalist Loose Blouse","Relaxed Tops",["Sand","Olive"],"Blouse minimalis dengan detail sederhana yang modern."],
["Wide-Leg Tailored Pants","Relaxed Bottoms",["Black","Mocha"],"Siluet jatuh dan rapi, nyaman untuk duduk lama."],
["Casual Sleeveless Vest","Modern Outerwear",["Navy","Sand"],"Layering ringan untuk tampilan lebih profesional tanpa kaku."],
["Relaxed Shirt Dress","One-Piece",["Mocha","Off White"],"Praktis, sopan, dan siap untuk kantor maupun semi-formal."],
["Basic Knit Top","Essential",["Charcoal","Dusty Rose"],"Basic yang mudah dipadukan untuk banyak kombinasi outfit."]];
const cats=[
["Relaxed Tops","Atasan longgar proporsional untuk keseharian kantor."],
["Relaxed Bottoms","Bawahan yang memberi ruang gerak tanpa kehilangan kesan profesional."],
["Modern Outerwear","Layering ringan yang tidak kaku."],
["One-Piece Collection","Outfit praktis tanpa repot memadukan atasan dan bawahan."],
["Essential Collection","Basic pelengkap wardrobe untuk banyak kombinasi."]];
const looks=[
["Meeting Pagi","Relaxed Oversized Shirt (Off White) + Wide-Leg Tailored Pants (Mocha)",["relaxed-oversized-shirt-off-white","wide-leg-tailored-pants-mocha"]],
["Hybrid Day","Minimalist Loose Blouse (Sand) + Casual Sleeveless Vest (Navy)",["minimalist-loose-blouse-sand","casual-sleeveless-vest-navy"]],
["After Hours","Relaxed Shirt Dress (Mocha) + Basic Knit Top (Charcoal) sebagai layer",["relaxed-shirt-dress-mocha","basic-knit-top-charcoal"]]];
const slug=t=>t.toLowerCase().replace(/\s+/g,"-");
const img=(f,alt)=>`<img class="pimg" src="assets/products/${f}.jpg" alt="${alt}" width="400" height="480" loading="lazy" style="object-fit:cover">`;
document.getElementById("products").innerHTML=products.map((p,i)=>`<article data-i="${i}">${img(slug(p[0])+"-"+slug(p[2][0]),p[0]+" warna "+p[2][0])}<h3>${p[0]}</h3><p>${p[3]}</p><div class="chips">${p[2].map((n,j)=>`<button type="button" aria-pressed="${j==0}" data-c="${n}"><span class="dot" style="background:${C[n]}"></span>${n}</button>`).join("")}</div><p class="note">Ukuran S–XXL · Harga segera hadir</p></article>`).join("");
document.getElementById("products").onclick=e=>{const k=e.target.closest("button");if(!k)return;const a=k.closest("article"),p=products[a.dataset.i];
a.querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x==k));const im=a.querySelector("img");im.src=`assets/products/${slug(p[0])}-${slug(k.dataset.c)}.jpg`;im.alt=p[0]+" warna "+k.dataset.c};
document.getElementById("cats").innerHTML=cats.map(c=>`<article><h3>${c[0]}</h3><p>${c[1]}</p></article>`).join("");
document.getElementById("looks").innerHTML=looks.map(l=>`<article><div class="pair">${l[2].map(f=>img(f,l[0])).join("")}</div><h3>${l[0]}</h3><p>${l[1]}</p></article>`).join("");
const sw=(id,a)=>document.getElementById(id).innerHTML=a.map(n=>`<div><span style="background:${C[n]}"></span>${n}</div>`).join("");
sw("primary",["Sand","Mocha","Olive","Navy"]);sw("support",["Off White","Dusty Blue","Dusty Rose","Charcoal"]);
const b=document.querySelector(".burger"),m=document.getElementById("menu");
b.onclick=()=>{const o=m.classList.toggle("open");b.setAttribute("aria-expanded",o)};
m.onclick=e=>{if(e.target.tagName==="A"){m.classList.remove("open");b.setAttribute("aria-expanded",false)}};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
// Muat semua foto warna lebih dulu supaya ganti warna langsung tampil
products.forEach(p=>p[2].forEach(n=>{const i=new Image();i.src=`assets/products/${slug(p[0])}-${slug(n)}.jpg`;}));

// Mix & Match: model berganti outfit sesuai pilihan
(function(){
  const atasan=[["Relaxed Oversized Shirt",["Off White","Dusty Blue"]],["Minimalist Loose Blouse",["Sand","Olive"]],["Basic Knit Top",["Charcoal","Dusty Rose"]]];
  const celana=["Black","Mocha"];
  const box=document.getElementById("mix");if(!box)return;
  const img=document.getElementById("mix-img"),elA=document.getElementById("mix-atasan"),elW=document.getElementById("mix-warna"),elC=document.getElementById("mix-celana");
  let a=0,w=0,c=0;
  const file=(ai,wi,ci)=>`assets/mix/${slug(atasan[ai][0])}-${slug(atasan[ai][1][wi])}_${slug(celana[ci])}.jpg`;
  atasan.forEach((x,ai)=>x[1].forEach((_,wi)=>celana.forEach((_,ci)=>{const i=new Image();i.src=file(ai,wi,ci);})));
  const chip=(n,on,k)=>`<button type="button" aria-pressed="${on}" data-${k}="${n}"><span class="dot" style="background:${C[n]}"></span>${n}</button>`;
  function tampil(){
    elA.innerHTML=atasan.map((x,i)=>`<button type="button" aria-pressed="${i==a}" data-a="${i}"><img src="assets/products/${slug(x[0])}-${slug(x[1][i==a?w:0])}.jpg" alt="" loading="lazy">${x[0]}</button>`).join("");
    elW.innerHTML=atasan[a][1].map((n,i)=>chip(n,i==w,"w")).join("");
    elC.innerHTML=celana.map((n,i)=>chip(n,i==c,"c")).join("");
    document.getElementById("mix-warna-nama").textContent="· "+atasan[a][1][w];
    document.getElementById("mix-celana-nama").textContent="· "+celana[c];
    const teks=`${atasan[a][0]} (${atasan[a][1][w]}) + Wide-Leg Tailored Pants (${celana[c]})`;
    document.getElementById("mix-ringkas").textContent=teks;
    const src=file(a,w,c);
    if(img.getAttribute("src")!==src){img.classList.add("ganti");const n=new Image();n.onload=()=>{img.src=src;img.alt="Model memakai "+teks;img.classList.remove("ganti")};n.src=src;}
  }
  box.addEventListener("click",e=>{
    const b=e.target.closest("button");if(!b)return;
    if(b.dataset.a!==undefined){a=+b.dataset.a;w=0;}
    else if(b.dataset.w!==undefined){w=atasan[a][1].indexOf(b.dataset.w);}
    else if(b.dataset.c!==undefined){c=celana.indexOf(b.dataset.c);}
    else if(b.id==="mix-acak"){let na,nw,nc;do{na=Math.floor(Math.random()*3);nw=Math.floor(Math.random()*2);nc=Math.floor(Math.random()*2);}while(na==a&&nw==w&&nc==c);a=na;w=nw;c=nc;}
    else return;
    tampil();
  });
  tampil();
})();
