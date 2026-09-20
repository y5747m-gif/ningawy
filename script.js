/* =========================================
   NINJAWY STORE - CINEMATIC ANIMATED
   ========================================= */

const WHATSAPP_NUMBER = "201141362626";
const ADMIN_USERNAME = "yaseen";
const ADMIN_PASSWORD = "NINJAWY2026";

const PRODUCTS_STORAGE = "ninjawy_products";
const CART_STORAGE = "ninjawy_cart";
const FAVORITES_STORAGE = "ninjawy_favorites";
const ADMIN_SESSION = "ninjawy_admin_session";

const defaultProducts = [
  { id: 1, name: "سماعات لاسلكية احترافية", description: "صوت نقي وتصميم مريح للاستخدام اليومي.", category: "إلكترونيات", price: 1299, image: "", icon: "🎧" },
  { id: 2, name: "حقيبة عصرية مميزة", description: "تصميم أنيق وخامة مناسبة للاستخدام اليومي.", category: "أزياء", price: 899, image: "", icon: "👜" },
  { id: 3, name: "مصباح ذكي متعدد الألوان", description: "إضاءة ذكية تمنح منزلك أجواء مميزة.", category: "منزل", price: 749, image: "", icon: "💡" },
  { id: 4, name: "وحدة تحكم لاسلكية", description: "تحكم مريح واستجابة ممتازة للألعاب.", category: "ألعاب", price: 1499, image: "", icon: "🎮" },
  { id: 5, name: "ساعة ذكية أنيقة", description: "تصميم حديث مع خصائص ذكية متعددة.", category: "إكسسوارات", price: 2199, image: "", icon: "⌚" },
  { id: 6, name: "لوحة مفاتيح للألعاب", description: "تصميم عملي مناسب للألعاب والعمل.", category: "إلكترونيات", price: 1099, image: "", icon: "⌨️" }
];

let products = JSON.parse(localStorage.getItem(PRODUCTS_STORAGE)) || defaultProducts;
let cart = JSON.parse(localStorage.getItem(CART_STORAGE)) || [];
let favorites = JSON.parse(localStorage.getItem(FAVORITES_STORAGE)) || [];
let selectedCategory = "الكل";
let uploadedImage = "";

/* ELEMENTS */
const productsGrid = document.getElementById("productsGrid");
const cartPanel = document.getElementById("cartPanel");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const toast = document.getElementById("toast");
const navbar = document.getElementById("navbar");
const scrollProgress = document.getElementById("scrollProgress");
const pageLoader = document.getElementById("pageLoader");
const cursorDot = document.getElementById("cursorDot");
const cursorRing = document.getElementById("cursorRing");
const bgCanvas = document.getElementById("bgCanvas");

/* HELPERS */
function saveProducts(){ localStorage.setItem(PRODUCTS_STORAGE, JSON.stringify(products)); }
function saveCart(){ localStorage.setItem(CART_STORAGE, JSON.stringify(cart)); }
function saveFavorites(){ localStorage.setItem(FAVORITES_STORAGE, JSON.stringify(favorites)); }
function formatPrice(price){ return Number(price).toLocaleString("ar-EG"); }

function showToast(message){
  toast.textContent = message;
  toast.classList.add("show");
  // haptic micro animation
  toast.animate([{transform:"translateX(-50%) translateY(20px) scale(.9)",opacity:0},{transform:"translateX(-50%) translateY(0) scale(1)",opacity:1}],{duration:400,easing:"cubic-bezier(.34,1.56,.64,1)"});
  clearTimeout(showToast._t);
  showToast._t = setTimeout(()=> toast.classList.remove("show"), 2800);
}

/* ================= LOADER ================= */
function initLoader(){
  if(!pageLoader) return;
  const minTime = 1800;
  const start = Date.now();
  window.addEventListener("load", ()=>{
    const elapsed = Date.now()-start;
    const remaining = Math.max(0, minTime - elapsed);
    setTimeout(()=>{
      pageLoader.classList.add("hidden");
      document.body.style.overflow = "";
      // trigger hero animations
      document.querySelectorAll(".hero .reveal").forEach((el,i)=>{
        setTimeout(()=> el.classList.add("active"), i*120);
      });
    }, remaining);
  });
  // fallback if load already fired
  setTimeout(()=>{
    if(!pageLoader.classList.contains("hidden")){
      pageLoader.classList.add("hidden");
    }
  }, 2600);
}

/* ================= SCROLL PROGRESS & NAVBAR ================= */
function initScrollProgress(){
  let ticking = false;
  window.addEventListener("scroll", ()=>{
    if(!ticking){
      requestAnimationFrame(()=>{
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight>0 ? (scrollTop/docHeight)*100 : 0;
        if(scrollProgress) scrollProgress.style.width = progress + "%";
        if(navbar){
          if(scrollTop>20) navbar.classList.add("scrolled");
          else navbar.classList.remove("scrolled");
        }
        // parallax for glows
        const glows = document.querySelectorAll(".hero-glow");
        glows.forEach((g,i)=>{
          const speed = (i+1)*0.04;
          g.style.transform = `translateY(${scrollTop*speed}px) translateX(${Math.sin(scrollTop*0.001+i)*10}px)`;
        });
        const ninja = document.querySelector(".ninja-image");
        if(ninja){
          ninja.style.transform = `translateY(${scrollTop*0.08}px)`;
        }
        ticking=false;
      });
      ticking=true;
    }
  }, {passive:true});
}

/* ================= CUSTOM CURSOR ================= */
function initCustomCursor(){
  if(window.matchMedia("(pointer: coarse)").matches) return;
  if(!cursorDot || !cursorRing) return;
  let mouseX=0, mouseY=0, ringX=0, ringY=0;
  let isHovering=false;

  document.addEventListener("mousemove", (e)=>{
    mouseX=e.clientX; mouseY=e.clientY;
    cursorDot.style.left = mouseX+"px";
    cursorDot.style.top = mouseY+"px";
  });

  function animateRing(){
    ringX += (mouseX - ringX)*0.15;
    ringY += (mouseY - ringY)*0.15;
    cursorRing.style.left = ringX+"px";
    cursorRing.style.top = ringY+"px";
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverEls = document.querySelectorAll("a, button, .product-card, .category-card, input, textarea, select");
  hoverEls.forEach(el=>{
    el.addEventListener("mouseenter", ()=>{
      cursorRing.classList.add("hover");
      cursorDot.style.transform="translate(-50%,-50%) scale(1.5)";
    });
    el.addEventListener("mouseleave", ()=>{
      cursorRing.classList.remove("hover");
      cursorDot.style.transform="translate(-50%,-50%) scale(1)";
    });
  });

  document.addEventListener("mousedown", ()=>{
    cursorRing.classList.add("active");
    cursorDot.style.transform="translate(-50%,-50%) scale(.8)";
  });
  document.addEventListener("mouseup", ()=>{
    cursorRing.classList.remove("active");
    cursorDot.style.transform="translate(-50%,-50%) scale(1)";
  });

  // hide when leaving window
  document.addEventListener("mouseleave", ()=>{
    cursorDot.style.opacity="0"; cursorRing.style.opacity="0";
  });
  document.addEventListener("mouseenter", ()=>{
    cursorDot.style.opacity="1"; cursorRing.style.opacity="1";
  });
}

/* ================= PARTICLES CANVAS ================= */
function initParticles(){
  if(!bgCanvas) return;
  const canvas = bgCanvas;
  const ctx = canvas.getContext("2d");
  let particles=[];
  let mouse={x:null,y:null,radius:120};
  let w,h;

  function resize(){
    w=canvas.width=window.innerWidth;
    h=canvas.height=window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  window.addEventListener("mousemove", (e)=>{
    mouse.x=e.clientX; mouse.y=e.clientY;
  });
  window.addEventListener("mouseleave", ()=>{ mouse.x=null; mouse.y=null; });

  class Particle{
    constructor(){
      this.x=Math.random()*w;
      this.y=Math.random()*h;
      this.vx=(Math.random()-0.5)*0.6;
      this.vy=(Math.random()-0.5)*0.6;
      this.r=Math.random()*1.8+0.6;
      this.baseR=this.r;
      this.opacity=Math.random()*0.5+0.15;
    }
    update(){
      this.x+=this.vx; this.y+=this.vy;
      if(this.x<0||this.x>w) this.vx*=-1;
      if(this.y<0||this.y>h) this.vy*=-1;
      // mouse interaction
      if(mouse.x!==null){
        let dx=mouse.x-this.x; let dy=mouse.y-this.y;
        let dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<mouse.radius){
          let force=(mouse.radius-dist)/mouse.radius;
          this.x-=dx*force*0.02;
          this.y-=dy*force*0.02;
          this.r=this.baseR+force*2;
        } else {
          this.r+=(this.baseR-this.r)*0.1;
        }
      }
    }
    draw(){
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(100,217,157,${this.opacity})`;
      ctx.shadowBlur=8;
      ctx.shadowColor="rgba(100,217,157,0.5)";
      ctx.fill();
      ctx.shadowBlur=0;
    }
  }

  function init(){
    particles=[];
    const count = window.innerWidth<768? 35: 70;
    for(let i=0;i<count;i++) particles.push(new Particle());
  }
  init();

  function connect(){
    for(let a=0;a<particles.length;a++){
      for(let b=a+1;b<particles.length;b++){
        let dx=particles[a].x-particles[b].x;
        let dy=particles[a].y-particles[b].y;
        let dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<130){
          ctx.beginPath();
          ctx.strokeStyle=`rgba(100,217,157,${0.12*(1-dist/130)})`;
          ctx.lineWidth=0.6;
          ctx.moveTo(particles[a].x,particles[a].y);
          ctx.lineTo(particles[b].x,particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate(){
    ctx.clearRect(0,0,w,h);
    particles.forEach(p=>{p.update(); p.draw();});
    connect();
    requestAnimationFrame(animate);
  }
  animate();
}

/* ================= REVEAL ON SCROLL ================= */
function initReveal(){
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el=entry.target;
        const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
        setTimeout(()=> el.classList.add("active"), delay);
        observer.unobserve(el);
      }
    });
  }, {threshold:0.15, rootMargin:"0px 0px -40px 0px"});

  document.querySelectorAll(".reveal").forEach(el=> observer.observe(el));
}

/* ================= MAGNETIC BUTTONS ================= */
function initMagnetic(){
  if(window.matchMedia("(pointer: coarse)").matches) return;
  const btns = document.querySelectorAll(".magnetic-btn");
  btns.forEach(btn=>{
    btn.addEventListener("mousemove", (e)=>{
      const rect=btn.getBoundingClientRect();
      const x=e.clientX-rect.left-rect.width/2;
      const y=e.clientY-rect.top-rect.height/2;
      btn.style.transform=`translate(${x*0.18}px, ${y*0.35}px)`;
    });
    btn.addEventListener("mouseleave", ()=>{
      btn.style.transform="translate(0,0)";
    });
  });
}

/* ================= TILT EFFECT ================= */
function initTilt(){
  if(window.matchMedia("(pointer: coarse)").matches) return;
  const cards = document.querySelectorAll(".product-card, .category-card, .stat-box, .offer-section");
  cards.forEach(card=>{
    card.addEventListener("mousemove", (e)=>{
      const rect=card.getBoundingClientRect();
      const x=e.clientX-rect.left;
      const y=e.clientY-rect.top;
      const centerX=rect.width/2;
      const centerY=rect.height/2;
      const rotateX=(y-centerY)/18;
      const rotateY=(centerX-x)/18;
      if(card.classList.contains("product-card")){
        card.style.transform=`perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.01)`;
      } else if(card.classList.contains("category-card")){
        card.style.transform=`perspective(800px) rotateX(${rotateX*0.6}deg) rotateY(${rotateY*0.6}deg) translateY(-8px) scale(1.02)`;
      }
      // dynamic light
      const glowX = (x/rect.width)*100;
      const glowY = (y/rect.height)*100;
      card.style.setProperty("--mouse-x", glowX+"%");
      card.style.setProperty("--mouse-y", glowY+"%");
    });
    card.addEventListener("mouseleave", ()=>{
      card.style.transform="";
    });
  });
}

/* ================= COUNT UP ================= */
function initCountUp(){
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el=entry.target;
        const target = parseInt(el.dataset.count);
        if(!target) return;
        let current=0;
        const duration=1400;
        const stepTime=16;
        const steps=duration/stepTime;
        const increment=target/steps;
        const timer=setInterval(()=>{
          current+=increment;
          if(current>=target){
            current=target;
            clearInterval(timer);
          }
          if(el.textContent.includes("K")){
            // keep K format
          } else if(el.textContent.includes("%")){
            el.textContent=Math.floor(current)+"%";
          } else {
            // generic
            if(target>=1000) el.textContent="+"+Math.floor(current/1000)+"K";
            else el.textContent=Math.floor(current);
          }
        }, stepTime);
        observer.unobserve(el);
      }
    });
  },{threshold:0.5});
  document.querySelectorAll("[data-count]").forEach(el=> observer.observe(el));
}

/* ================= SMOOTH SCROLL & ACTIVE LINK ================= */
function initSmoothScroll(){
  const navLinks=document.querySelectorAll(".nav-link");
  const sections=document.querySelectorAll("section[id]");
  window.addEventListener("scroll", ()=>{
    let current="";
    sections.forEach(sec=>{
      const top=sec.offsetTop-120;
      if(window.scrollY>=top) current=sec.getAttribute("id");
    });
    navLinks.forEach(a=>{
      a.classList.remove("active");
      if(a.getAttribute("href")==="#"+current) a.classList.add("active");
    });
  });
}

/* ================= PRODUCTS RENDER ================= */
function renderProducts(){
  productsGrid.innerHTML="";
  let filteredProducts=products;
  if(selectedCategory!=="الكل"){
    filteredProducts=products.filter(p=>p.category===selectedCategory);
  }
  if(filteredProducts.length===0){
    productsGrid.innerHTML=`<div class="cart-empty" style="grid-column:1/-1">لا توجد منتجات في هذا القسم حاليًا.</div>`;
    return;
  }
  filteredProducts.forEach((product, index)=>{
    const isFavorite=favorites.includes(product.id);
    const imageContent=product.image?`<img src="${product.image}" class="product-image" alt="${product.name}" loading="lazy">`:`<div class="product-placeholder">${product.icon||"📦"}</div>`;
    const card=document.createElement("article");
    card.className="product-card reveal";
    card.dataset.delay = (index*60).toString();
    card.style.setProperty("--i", index);
    card.innerHTML=`
      <div class="product-image-box">
        ${imageContent}
        <span class="product-badge">${product.category}</span>
        <button class="favorite-btn ${isFavorite?"active":""}" data-favorite="${product.id}">${isFavorite?"♥":"♡"}</button>
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-price-row">
          <strong class="product-price">${formatPrice(product.price)} ج.م</strong>
        </div>
        <button class="add-btn magnetic-btn" data-add="${product.id}">
          <span class="btn-text">أضف للسلة ⚔</span>
          <span class="btn-shine"></span>
        </button>
      </div>
    `;
    productsGrid.appendChild(card);
  });
  // re-observe new reveals
  document.querySelectorAll(".product-card.reveal").forEach(el=>{
    if(!el.classList.contains("active")){
      el.style.opacity="0";
      el.style.transform="translateY(30px)";
      setTimeout(()=>{ el.classList.add("active"); }, parseInt(el.dataset.delay||0)+100);
    }
  });
  addProductEvents();
  // re-init tilt for new cards
  initTilt();
  initMagnetic();
}

function addProductEvents(){
  document.querySelectorAll("[data-add]").forEach(button=>{
    button.addEventListener("click", ()=>{
      const id=Number(button.dataset.add);
      addToCart(id, button);
      // burst effect
      createBurst(button);
    });
  });
  document.querySelectorAll("[data-favorite]").forEach(button=>{
    button.addEventListener("click", ()=>{
      const id=Number(button.dataset.favorite);
      toggleFavorite(id);
      button.animate([{transform:"scale(1)"},{transform:"scale(1.4)"},{transform:"scale(1)"}],{duration:400,easing:"cubic-bezier(.34,1.56,.64,1)"});
    });
  });
}

function createBurst(btn){
  const rect=btn.getBoundingClientRect();
  for(let i=0;i<6;i++){
    const dot=document.createElement("span");
    dot.style.position="fixed";
    dot.style.left=rect.left+rect.width/2+"px";
    dot.style.top=rect.top+rect.height/2+"px";
    dot.style.width="6px"; dot.style.height="6px";
    dot.style.background="var(--primary-light)";
    dot.style.borderRadius="50%";
    dot.style.pointerEvents="none";
    dot.style.zIndex="9999";
    dot.style.boxShadow="0 0 8px var(--primary-glow)";
    document.body.appendChild(dot);
    const angle=(Math.PI*2/6)*i;
    const dist=40+Math.random()*30;
    dot.animate([
      {transform:"translate(-50%,-50%) scale(1)", opacity:1},
      {transform:`translate(calc(-50% + ${Math.cos(angle)*dist}px), calc(-50% + ${Math.sin(angle)*dist}px)) scale(0)`, opacity:0}
    ],{duration:600+Math.random()*200, easing:"cubic-bezier(.2,.8,.2,1)"}).onfinish=()=> dot.remove();
  }
}

function toggleFavorite(id){
  if(favorites.includes(id)){
    favorites=favorites.filter(f=>f!==id);
  } else {
    favorites.push(id);
  }
  saveFavorites();
  renderProducts();
}

/* ================= CART ================= */
function addToCart(id, button){
  const product=products.find(item=>item.id===id);
  if(!product) return;
  const existingItem=cart.find(item=>item.id===id);
  if(existingItem){ existingItem.quantity+=1; }
  else { cart.push({...product, quantity:1}); }
  saveCart();
  renderCart();
  button.classList.remove("added");
  void button.offsetWidth;
  button.classList.add("added");
  setTimeout(()=> button.classList.remove("added"), 700);

  // cart button shake
  const cartBtn=document.getElementById("cartBtn");
  cartBtn.classList.remove("has-items");
  void cartBtn.offsetWidth;
  cartBtn.classList.add("has-items");
  cartBtn.animate([{transform:"translateY(0)"},{transform:"translateY(-4px)"},{transform:"translateY(0)"},{transform:"translateY(-2px)"},{transform:"translateY(0)"}],{duration:500,easing:"ease-out"});

  // cart count pop
  cartCount.animate([{transform:"scale(1)"},{transform:"scale(1.4)"},{transform:"scale(1)"}],{duration:350,easing:"cubic-bezier(.34,1.56,.64,1)"});

  showToast("تمت إضافة المنتج إلى السلة 🛍");
}

function renderCart(){
  cartItems.innerHTML="";
  if(cart.length===0){
    cartItems.innerHTML=`<div class="cart-empty">حقيبتك فارغة حاليًا 🥷</div>`;
    cartCount.textContent="0";
    cartTotal.textContent="0";
    document.getElementById("cartBtn").classList.remove("has-items");
    return;
  }
  let total=0, totalQuantity=0;
  cart.forEach((item, idx)=>{
    total+=item.price*item.quantity;
    totalQuantity+=item.quantity;
    const image=item.image?`<img src="${item.image}" class="cart-item-image" alt="${item.name}">`:`<div class="cart-item-image product-placeholder">${item.icon||"📦"}</div>`;
    const cartItem=document.createElement("div");
    cartItem.className="cart-item";
    cartItem.style.animationDelay=(idx*60)+"ms";
    cartItem.innerHTML=`
      ${image}
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <strong>${formatPrice(item.price)} ج.م</strong>
        <div class="cart-controls">
          <button class="qty-btn" data-increase="${item.id}">+</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" data-decrease="${item.id}">−</button>
          <button class="remove-cart-item" data-remove="${item.id}">حذف</button>
        </div>
      </div>
    `;
    cartItems.appendChild(cartItem);
  });
  cartCount.textContent=totalQuantity;
  cartTotal.textContent=formatPrice(total);
  document.getElementById("cartBtn").classList.add("has-items");
  cartEvents();
}

function cartEvents(){
  document.querySelectorAll("[data-increase]").forEach(button=>{
    button.onclick=()=> changeQuantity(Number(button.dataset.increase),1);
  });
  document.querySelectorAll("[data-decrease]").forEach(button=>{
    button.onclick=()=> changeQuantity(Number(button.dataset.decrease),-1);
  });
  document.querySelectorAll("[data-remove]").forEach(button=>{
    button.onclick=()=> removeFromCart(Number(button.dataset.remove));
  });
}

function changeQuantity(id, amount){
  const item=cart.find(p=>p.id===id);
  if(!item) return;
  item.quantity+=amount;
  if(item.quantity<=0){
    cart=cart.filter(p=>p.id!==id);
  }
  saveCart(); renderCart();
}

function removeFromCart(id){
  const el=document.querySelector(`[data-remove="${id}"]`)?.closest(".cart-item");
  if(el){
    el.animate([{transform:"translateX(0)",opacity:1},{transform:"translateX(40px)",opacity:0}],{duration:300,easing:"ease-in"}).onfinish=()=>{
      cart=cart.filter(item=>item.id!==id);
      saveCart(); renderCart();
    };
  } else {
    cart=cart.filter(item=>item.id!==id);
    saveCart(); renderCart();
  }
}

/* CART OPEN/CLOSE */
document.getElementById("cartBtn").addEventListener("click", ()=>{
  cartPanel.classList.remove("closing");
  cartPanel.classList.add("open");
  overlay.classList.add("show");
  document.body.style.overflow="hidden";
});
document.getElementById("closeCartBtn").addEventListener("click", closeCart);
overlay.addEventListener("click", ()=>{
  closeCart();
  closeAllModals();
});
function closeCart(){
  if(cartPanel.classList.contains("open")){
    cartPanel.classList.add("closing");
    cartPanel.classList.remove("open");
    setTimeout(()=>{
      cartPanel.classList.remove("closing");
    },400);
  }
  overlay.classList.remove("show");
  document.body.style.overflow="";
}

/* CLEAR CART */
document.getElementById("clearCartBtn").addEventListener("click", ()=>{
  if(cart.length===0) return;
  if(!confirm("هل تريد تفريغ السلة؟")) return;
  cartItems.querySelectorAll(".cart-item").forEach((el,i)=>{
    el.animate([{transform:"translateX(0)",opacity:1},{transform:"translateX(30px)",opacity:0}],{duration:250,delay:i*40,easing:"ease-in"});
  });
  setTimeout(()=>{
    cart=[]; saveCart(); renderCart(); showToast("تم تفريغ السلة");
  }, cart.length*40+260);
});

/* CATEGORIES */
document.querySelectorAll(".category-card").forEach(button=>{
  button.addEventListener("click", ()=>{
    document.querySelectorAll(".category-card").forEach(item=> item.classList.remove("active"));
    button.classList.add("active");
    selectedCategory=button.dataset.category;
    // pulse animation
    button.animate([{transform:"scale(1)"},{transform:"scale(1.08)"},{transform:"scale(1)"}],{duration:400,easing:"cubic-bezier(.34,1.56,.64,1)"});
    renderProducts();
    document.getElementById("products").scrollIntoView({behavior:"smooth", block:"start"});
  });
});

document.getElementById("showAllBtn").addEventListener("click", ()=>{
  selectedCategory="الكل";
  document.querySelectorAll(".category-card").forEach(item=> item.classList.remove("active"));
  document.querySelector('[data-category="الكل"]').classList.add("active");
  renderProducts();
});

/* SEARCH */
const searchModal=document.getElementById("searchModal");
const searchInput=document.getElementById("searchInput");
const searchResults=document.getElementById("searchResults");

document.getElementById("searchBtn").addEventListener("click", ()=>{
  searchModal.classList.add("show");
  overlay.classList.add("show");
  setTimeout(()=> searchInput.focus(), 100);
  searchModal.querySelector(".search-window").animate([{opacity:0,transform:"translateY(20px) scale(.97)"},{opacity:1,transform:"translateY(0) scale(1)"}],{duration:400,easing:"cubic-bezier(.2,.8,.2,1)"});
});
document.getElementById("closeSearchBtn").addEventListener("click", closeSearch);
function closeSearch(){
  searchModal.classList.remove("show");
  overlay.classList.remove("show");
  searchInput.value="";
  searchResults.innerHTML="";
}
searchInput.addEventListener("input", ()=>{
  const value=searchInput.value.trim().toLowerCase();
  searchResults.innerHTML="";
  if(!value) return;
  const results=products.filter(p=> p.name.toLowerCase().includes(value) || p.description.toLowerCase().includes(value));
  if(results.length===0){
    searchResults.innerHTML=`<div class="search-result">لا توجد نتائج.</div>`;
    return;
  }
  results.forEach((product,i)=>{
    const result=document.createElement("div");
    result.className="search-result";
    result.style.animationDelay=(i*50)+"ms";
    result.innerHTML=`<strong>${product.name}</strong> — ${formatPrice(product.price)} ج.م`;
    result.onclick=()=>{
      selectedCategory=product.category;
      renderProducts();
      closeSearch();
      document.getElementById("products").scrollIntoView({behavior:"smooth"});
      document.querySelectorAll(".category-card").forEach(c=> c.classList.toggle("active", c.dataset.category===product.category));
    };
    searchResults.appendChild(result);
    result.animate([{opacity:0,transform:"translateY(10px)"},{opacity:1,transform:"translateY(0)"}],{duration:300,delay:i*50,easing:"ease-out"});
  });
});

/* NEWSLETTER */
document.getElementById("newsletterForm").addEventListener("submit", e=>{
  e.preventDefault();
  const btn=e.target.querySelector("button");
  btn.animate([{transform:"scale(1)"},{transform:"scale(.95)"},{transform:"scale(1)"}],{duration:300});
  e.target.reset();
  showToast("تم الاشتراك بنجاح ⚡");
});

/* MOBILE MENU */
const mobileMenuBtn=document.getElementById("mobileMenuBtn");
const navLinksEl=document.getElementById("navLinks");
mobileMenuBtn.addEventListener("click", ()=>{
  navLinksEl.classList.toggle("show");
  mobileMenuBtn.classList.toggle("active");
  if(navLinksEl.classList.contains("show")){
    navLinksEl.animate([{opacity:0,transform:"translateY(-10px)"},{opacity:1,transform:"translateY(0)"}],{duration:300,easing:"ease-out"});
  }
});
document.querySelectorAll(".nav-links a").forEach(a=>{
  a.addEventListener("click", ()=>{
    navLinksEl.classList.remove("show");
    mobileMenuBtn.classList.remove("active");
  });
});

/* ADMIN LOGIN */
const adminLoginModal=document.getElementById("adminLoginModal");
const adminPanel=document.getElementById("adminPanel");

document.getElementById("adminOpenBtn").addEventListener("click", openAdmin);

function openAdmin(){
  const loggedIn=localStorage.getItem(ADMIN_SESSION);
  if(loggedIn==="true"){ openAdminPanel(); }
  else {
    adminLoginModal.classList.add("show");
    overlay.classList.add("show");
  }
}
document.getElementById("closeAdminLogin").addEventListener("click", ()=>{
  adminLoginModal.classList.remove("show");
  overlay.classList.remove("show");
});
document.getElementById("adminLoginForm").addEventListener("submit", e=>{
  e.preventDefault();
  const username=document.getElementById("adminUsername").value.trim();
  const password=document.getElementById("adminPassword").value;
  const loginError=document.getElementById("loginError");
  if(username===ADMIN_USERNAME && password===ADMIN_PASSWORD){
    localStorage.setItem(ADMIN_SESSION,"true");
    loginError.textContent="";
    adminLoginModal.classList.remove("show");
    overlay.classList.remove("show");
    openAdminPanel();
    e.target.reset();
    showToast("تم تسجيل الدخول بنجاح ✦");
  } else {
    loginError.textContent="بيانات الدخول غير صحيحة.";
    loginError.animate([{transform:"translateX(0)"},{transform:"translateX(-6px)"},{transform:"translateX(6px)"},{transform:"translateX(0)"}],{duration:300});
  }
});
function openAdminPanel(){
  adminPanel.classList.add("show");
  overlay.classList.add("show");
  renderAdminProducts();
  adminPanel.querySelector(".admin-dashboard").animate([{opacity:0,transform:"translateY(20px) scale(.97)"},{opacity:1,transform:"translateY(0) scale(1)"}],{duration:500,easing:"cubic-bezier(.34,1.56,.64,1)"});
}
document.getElementById("closeAdminPanel").addEventListener("click", ()=>{
  adminPanel.classList.remove("show");
  overlay.classList.remove("show");
});
document.getElementById("logoutAdminBtn").addEventListener("click", ()=>{
  localStorage.removeItem(ADMIN_SESSION);
  adminPanel.classList.remove("show");
  overlay.classList.remove("show");
  showToast("تم تسجيل الخروج");
});
function closeAllModals(){
  searchModal.classList.remove("show");
  adminLoginModal.classList.remove("show");
  adminPanel.classList.remove("show");
}

/* IMAGE UPLOAD */
document.getElementById("productImage").addEventListener("change", e=>{
  const file=e.target.files[0];
  if(!file) return;
  const reader=new FileReader();
  reader.onload=function(ev){
    uploadedImage=ev.target.result;
    const preview=document.getElementById("imagePreview");
    preview.innerHTML=`<img src="${uploadedImage}" alt="معاينة">`;
    preview.animate([{opacity:0,transform:"scale(.9)"},{opacity:1,transform:"scale(1)"}],{duration:400,easing:"ease-out"});
  };
  reader.readAsDataURL(file);
});

/* ADD PRODUCT */
document.getElementById("addProductForm").addEventListener("submit", e=>{
  e.preventDefault();
  const name=document.getElementById("productName").value.trim();
  const description=document.getElementById("productDescription").value.trim();
  const price=Number(document.getElementById("productPrice").value);
  const category=document.getElementById("productCategory").value;
  if(!name||!description||!price||!category){
    showToast("أكمل جميع بيانات المنتج."); return;
  }
  const newProduct={id:Date.now(), name, description, price, category, image:uploadedImage, icon:"📦"};
  products.unshift(newProduct);
  saveProducts();
  renderProducts();
  renderAdminProducts();
  e.target.reset();
  uploadedImage="";
  document.getElementById("imagePreview").textContent="معاينة الصورة";
  showToast("تمت إضافة المنتج بنجاح ✦");
});

/* ADMIN PRODUCTS */
function renderAdminProducts(){
  const list=document.getElementById("adminProductsList");
  list.innerHTML="";
  products.forEach((product,i)=>{
    const item=document.createElement("div");
    item.className="admin-product-item";
    item.style.animationDelay=(i*40)+"ms";
    const image=product.image?`<img src="${product.image}" alt="${product.name}">`:`<div class="cart-item-image product-placeholder">${product.icon||"📦"}</div>`;
    item.innerHTML=`
      ${image}
      <div class="admin-product-info"><h4>${product.name}</h4><span>${formatPrice(product.price)} ج.م</span></div>
      <button class="delete-product-btn" data-delete-product="${product.id}">حذف</button>
    `;
    list.appendChild(item);
  });
  document.querySelectorAll("[data-delete-product]").forEach(button=>{
    button.addEventListener("click", ()=>{
      const id=Number(button.dataset.deleteProduct);
      deleteProduct(id);
    });
  });
}
function deleteProduct(id){
  if(!confirm("هل تريد حذف هذا المنتج؟")) return;
  const el=document.querySelector(`[data-delete-product="${id}"]`)?.closest(".admin-product-item");
  const doDelete=()=>{
    products=products.filter(p=>p.id!==id);
    cart=cart.filter(p=>p.id!==id);
    saveProducts(); saveCart();
    renderProducts(); renderCart(); renderAdminProducts();
    showToast("تم حذف المنتج.");
  };
  if(el){
    el.animate([{transform:"translateX(0)",opacity:1},{transform:"translateX(30px)",opacity:0}],{duration:300}).onfinish=doDelete;
  } else doDelete();
}

/* WHATSAPP CHECKOUT */
document.getElementById("checkoutBtn").addEventListener("click", checkout);
function checkout(){
  if(cart.length===0){ showToast("السلة فارغة حاليًا."); return; }
  const name=document.getElementById("customerName").value.trim();
  const phone=document.getElementById("customerPhone").value.trim();
  const extraPhone=document.getElementById("customerExtraPhone").value.trim();
  const city=document.getElementById("customerCity").value.trim();
  const address=document.getElementById("customerAddress").value.trim();
  const notes=document.getElementById("customerNotes").value.trim();
  if(!name||!phone||!city||!address){ showToast("من فضلك أكمل بيانات العميل."); return; }

  // button loading animation
  const btn=document.getElementById("checkoutBtn");
  const originalHTML=btn.innerHTML;
  btn.innerHTML=`<span class="btn-text">جاري التحويل...</span> <span class="btn-icon">⏳</span>`;
  btn.disabled=true;

  let total=0;
  let message=`🥷 *طلب جديد من متجر ننجاوي*\n\n━━━━━━━━━━━━━━\n\n👤 *بيانات العميل*\n\nالاسم: ${name}\n\nرقم الهاتف: ${phone}\n\nرقم إضافي: ${extraPhone||"لا يوجد"}\n\nالمدينة: ${city}\n\nالعنوان: ${address}\n\nالملاحظات: ${notes||"لا توجد"}\n\n━━━━━━━━━━━━━━\n\n🛍 *المنتجات*\n\n`;
  cart.forEach((item,index)=>{
    const itemTotal=item.price*item.quantity;
    total+=itemTotal;
    message+=`\n${index+1}. ${item.name}\nالكمية: ${item.quantity}\nالسعر: ${formatPrice(item.price)} ج.م\nإجمالي المنتج: ${formatPrice(itemTotal)} ج.م\n\n`;
  });
  message+=`\n━━━━━━━━━━━━━━\n\n💰 *الإجمالي النهائي*\n\n${formatPrice(total)} ج.م\n\n━━━━━━━━━━━━━━\n\nشكراً لاختيارك ننجاوي ✦\n`;

  setTimeout(()=>{
    const url=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url,"_blank");
    btn.innerHTML=originalHTML;
    btn.disabled=false;
    showToast("تم فتح واتساب لإتمام الطلب 🟢");
  }, 900);
}

/* INITIALIZATION */
function init(){
  initLoader();
  initScrollProgress();
  initCustomCursor();
  initParticles();
  initReveal();
  initMagnetic();
  initTilt();
  initCountUp();
  initSmoothScroll();
  renderProducts();
  renderCart();
  // initial navbar state
  if(window.scrollY>20) navbar.classList.add("scrolled");
  // keyboard shortcuts
  document.addEventListener("keydown", (e)=>{
    if(e.key==="Escape"){
      closeCart();
      closeAllModals();
    }
  });
  // focus states animation
  document.querySelectorAll("input, textarea").forEach(inp=>{
    inp.addEventListener("focus", ()=> inp.parentElement?.classList.add("focused"));
    inp.addEventListener("blur", ()=> inp.parentElement?.classList.remove("focused"));
  });
}

init();
