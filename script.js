const products = [
  ["سماعات لاسلكية احترافية",1299],
  ["حقيبة عصرية مميزة",899],
  ["مصباح ذكي متعدد الألوان",749],
  ["وحدة تحكم لاسلكية",1499],
  ["ساعة ذكية أنيقة",2199],
  ["لوحة مفاتيح للألعاب",1099]
];

let cart = JSON.parse(localStorage.getItem("ninjawyCart") || "[]");
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function save(){ localStorage.setItem("ninjawyCart", JSON.stringify(cart)); }
function toast(msg){ const t=$("#toast"); t.textContent=msg; t.classList.add("show"); setTimeout(()=>t.classList.remove("show"),2200); }

function renderCart(){
  $("#cartCount").textContent = cart.length;
  const items = $("#cartItems");
  if(!cart.length){ items.innerHTML='<p class="empty">حقيبتك فارغة حاليًا.</p>'; $("#cartTotal").textContent="0"; return; }
  items.innerHTML = cart.map((p,i)=>`<div class="cart-item"><div><strong>${p.name}</strong><br><small>${p.price.toLocaleString("ar-EG")} ج.م</small></div><button class="remove-item" data-i="${i}">حذف</button></div>`).join("");
  $("#cartTotal").textContent = cart.reduce((a,p)=>a+p.price,0).toLocaleString("ar-EG");
  $$(".remove-item").forEach(b=>b.onclick=()=>{cart.splice(+b.dataset.i,1);save();renderCart();});
}
renderCart();

$$(".add-btn").forEach(btn=>btn.addEventListener("click",()=>{
  const name=btn.dataset.product;
  const found=products.find(p=>p[0]===name);
  cart.push({name,price:found?found[1]:0});
  save(); renderCart(); toast("تمت إضافة المنتج إلى حقيبة ننجاوي ⚔");
}));

$("#cartBtn").onclick=()=>{ $("#cartPanel").classList.add("open"); $("#overlay").classList.add("show"); };
$("#closeCart").onclick=()=>{ $("#cartPanel").classList.remove("open"); $("#overlay").classList.remove("show"); };
$("#overlay").onclick=()=>{ $("#cartPanel").classList.remove("open"); $("#overlay").classList.remove("show"); };

$("#searchBtn").onclick=()=>{ $("#searchBox").classList.add("show"); $("#searchInput").focus(); };
$("#closeSearch").onclick=()=>$("#searchBox").classList.remove("show");
$("#searchInput").addEventListener("input",e=>{
 const q=e.target.value.trim().toLowerCase();
 $$(".product-card").forEach(card=>card.style.display=card.dataset.name.toLowerCase().includes(q)?"block":"none");
});

$$(".category").forEach(btn=>btn.onclick=()=>{
 $$(".category").forEach(x=>x.classList.remove("active")); btn.classList.add("active");
 const c=btn.dataset.category;
 $$(".product-card").forEach(card=>card.style.display=(c==="الكل"||card.dataset.category===c)?"block":"none");
});

$("#menuBtn").onclick=()=>$("#navLinks").classList.toggle("open");
$("#newsletterForm").onsubmit=e=>{e.preventDefault(); toast("تم تسجيل بريدك بنجاح ⚡ مرحبًا بك في ننجاوي"); e.target.reset();};
$("#offerBtn").onclick=()=>{document.querySelector("#products").scrollIntoView({behavior:"smooth"});toast("تم فتح المنتجات المشاركة في العروض 🔥");};
$("#checkoutBtn").onclick=()=>{
 if(!cart.length){toast("أضف منتجًا أولًا إلى الحقيبة");return;}
 toast("تم حفظ طلبك تجريبيًا. يمكنك ربط الدفع أو واتساب لاحقًا.");
};
$("#showAll").onclick=()=>{ $$(".category").forEach(x=>x.classList.remove("active")); document.querySelector('[data-category="الكل"]').classList.add("active"); $$(".product-card").forEach(c=>c.style.display="block"); window.scrollTo({top:document.querySelector("#products").offsetTop-70,behavior:"smooth"}); };
