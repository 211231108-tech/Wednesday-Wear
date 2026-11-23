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
const img=(f,alt)=>`<img class="pimg" src="assets/products/${f}.svg" alt="${alt}" width="400" height="480" loading="lazy">`;
document.getElementById("products").innerHTML=products.map((p,i)=>`<article data-i="${i}">${img(slug(p[0])+"-"+slug(p[2][0]),p[0]+" warna "+p[2][0])}<h3>${p[0]}</h3><p>${p[3]}</p><div class="chips">${p[2].map((n,j)=>`<button type="button" aria-pressed="${j==0}" data-c="${n}"><span class="dot" style="background:${C[n]}"></span>${n}</button>`).join("")}</div><p class="note">Ukuran S–XXL · Harga segera hadir</p></article>`).join("");
document.getElementById("products").onclick=e=>{const k=e.target.closest("button");if(!k)return;const a=k.closest("article"),p=products[a.dataset.i];
a.querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x==k));const im=a.querySelector("img");im.src=`assets/products/${slug(p[0])}-${slug(k.dataset.c)}.svg`;im.alt=p[0]+" warna "+k.dataset.c};
document.getElementById("cats").innerHTML=cats.map(c=>`<article><h3>${c[0]}</h3><p>${c[1]}</p></article>`).join("");
document.getElementById("looks").innerHTML=looks.map(l=>`<article><div class="pair">${l[2].map(f=>img(f,l[0])).join("")}</div><h3>${l[0]}</h3><p>${l[1]}</p></article>`).join("");
const sw=(id,a)=>document.getElementById(id).innerHTML=a.map(n=>`<div><span style="background:${C[n]}"></span>${n}</div>`).join("");
sw("primary",["Sand","Mocha","Olive","Navy"]);sw("support",["Off White","Dusty Blue","Dusty Rose","Charcoal"]);
const b=document.querySelector(".burger"),m=document.getElementById("menu");
b.onclick=()=>{const o=m.classList.toggle("open");b.setAttribute("aria-expanded",o)};
m.onclick=e=>{if(e.target.tagName==="A"){m.classList.remove("open");b.setAttribute("aria-expanded",false)}};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
