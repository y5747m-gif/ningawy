const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

let cart = JSON.parse(localStorage.getItem("ninjawyCart") || "[]");
let currentCategory = "الكل";
let currentSearch = "";

/* =========================
   حفظ السلة
========================= */

function saveCart() {
  localStorage.setItem("ninjawyCart", JSON.stringify(cart));
}


/* =========================
   رسائل التنبيه
========================= */

function toast(message) {
  const toastElement = $("#toast");

  toastElement.textContent = message;
  toastElement.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    toastElement.classList.remove("show");
  }, 2500);
}


/* =========================
   تنسيق السعر
========================= */

function formatPrice(price) {
  return Number(price).toLocaleString("ar-EG");
}


/* =========================
   عرض السلة
========================= */

function renderCart() {

  $("#cartCount").textContent = cart.length;

  const cartItems = $("#cartItems");

  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p class="empty">
        حقيبتك فارغة حاليًا.
      </p>
    `;

    $("#cartTotal").textContent = "0";

    return;
  }


  cartItems.innerHTML = cart
    .map((item, index) => {

      return `
        <div class="cart-item">

          <div class="cart-item-info">

            <strong>
              ${item.name}
            </strong>

            <small>
              ${formatPrice(item.price)} ج.م
            </small>

          </div>

          <button
            class="remove-item"
            data-index="${index}"
            aria-label="حذف المنتج">

            ×

          </button>

        </div>
      `;

    })
    .join("");


  const total = cart.reduce((sum, item) => {
    return sum + Number(item.price);
  }, 0);


  $("#cartTotal").textContent = formatPrice(total);


  $$(".remove-item").forEach((button) => {

    button.addEventListener("click", () => {

      const index = Number(button.dataset.index);

      const removedProduct = cart[index];

      cart.splice(index, 1);

      saveCart();
      renderCart();

      toast(`تم حذف ${removedProduct.name} من الحقيبة`);

    });

  });

}


/* =========================
   إضافة منتج للسلة
========================= */

$$(".add-btn").forEach((button) => {

  button.addEventListener("click", () => {

    const card = button.closest(".product-card");

    const name = button.dataset.product;

    const price = Number(card.dataset.price);


    cart.push({
      name,
      price
    });


    saveCart();
    renderCart();


    button.classList.add("added");

    const originalText = button.textContent;

    button.textContent = "✓ تمت الإضافة";


    setTimeout(() => {

      button.classList.remove("added");

      button.textContent = originalText;

    }, 1400);


    toast("تمت إضافة المنتج إلى حقيبة ننجاوي ⚔");

  });

});


/* =========================
   فتح وإغلاق السلة
========================= */

function openCart() {

  $("#cartPanel").classList.add("open");

  $("#overlay").classList.add("show");

  document.body.classList.add("no-scroll");

}


function closeCart() {

  $("#cartPanel").classList.remove("open");

  $("#overlay").classList.remove("show");

  document.body.classList.remove("no-scroll");

}


$("#cartBtn").addEventListener("click", openCart);

$("#closeCart").addEventListener("click", closeCart);

$("#overlay").addEventListener("click", closeCart);


/* =========================
   تفريغ السلة
========================= */

$("#clearCart").addEventListener("click", () => {

  if (cart.length === 0) {

    toast("الحقيبة فارغة بالفعل");

    return;

  }


  cart = [];

  saveCart();

  renderCart();

  toast("تم تفريغ حقيبة ننجاوي");

});


/* =========================
   البحث
========================= */

function updateProducts() {

  $$(".product-card").forEach((card) => {

    const category = card.dataset.category;

    const name = card.dataset.name.toLowerCase();


    const matchesCategory =
      currentCategory === "الكل" ||
      category === currentCategory;


    const matchesSearch =
      name.includes(currentSearch);


    if (matchesCategory && matchesSearch) {

      card.style.display = "";

      card.classList.remove("hidden-product");

    } else {

      card.style.display = "none";

      card.classList.add("hidden-product");

    }

  });

}


$("#searchBtn").addEventListener("click", () => {

  $("#searchBox").classList.add("show");

  setTimeout(() => {
    $("#searchInput").focus();
  }, 150);

});


$("#closeSearch").addEventListener("click", () => {

  $("#searchBox").classList.remove("show");

  $("#searchInput").value = "";

  currentSearch = "";

  updateProducts();

});


$("#searchInput").addEventListener("input", (event) => {

  currentSearch =
    event.target.value
      .trim()
      .toLowerCase();

  updateProducts();

});


/* =========================
   الأقسام
========================= */

$$(".category").forEach((button) => {

  button.addEventListener("click", () => {

    $$(".category").forEach((item) => {
      item.classList.remove("active");
    });


    button.classList.add("active");


    currentCategory =
      button.dataset.category;


    updateProducts();


    document
      .querySelector("#products")
      .scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

  });

});


/* =========================
   عرض جميع المنتجات
========================= */

$("#showAll").addEventListener("click", () => {

  currentCategory = "الكل";

  currentSearch = "";


  $("#searchInput").value = "";


  $$(".category").forEach((category) => {

    category.classList.remove("active");

  });


  $('[data-category="الكل"]')
    .classList.add("active");


  updateProducts();


  $("#products").scrollIntoView({
    behavior: "smooth"
  });

});


/* =========================
   القائمة للموبايل
========================= */

$("#menuBtn").addEventListener("click", () => {

  $("#navLinks").classList.toggle("open");

});


$$(".nav-links a").forEach((link) => {

  link.addEventListener("click", () => {

    $("#navLinks").classList.remove("open");

  });

});


/* =========================
   المفضلة
========================= */

$$(".favorite-btn").forEach((button) => {

  button.addEventListener("click", () => {

    button.classList.toggle("active");


    if (button.classList.contains("active")) {

      button.textContent = "♥";

      toast("تمت إضافة المنتج إلى المفضلة ♥");

    } else {

      button.textContent = "♡";

      toast("تمت إزالة المنتج من المفضلة");

    }

  });

});


/* =========================
   النشرة البريدية
========================= */

$("#newsletterForm").addEventListener("submit", (event) => {

  event.preventDefault();


  const email =
    event.target
      .querySelector("input")
      .value;


  if (!email) {

    toast("اكتب بريدك الإلكتروني أولًا");

    return;

  }


  toast("⚡ تم تسجيل بريدك بنجاح، أهلًا بك في ننجاوي");


  event.target.reset();

});


/* =========================
   زر العروض
========================= */

$("#offerBtn").addEventListener("click", () => {

  $("#products").scrollIntoView({
    behavior: "smooth"
  });


  toast("🔥 اكتشف المنتجات والعروض المميزة");

});


/* =========================
   إتمام الطلب
========================= */

$("#checkoutBtn").addEventListener("click", () => {

  if (cart.length === 0) {

    toast("أضف منتجًا واحدًا على الأقل إلى الحقيبة");

    return;

  }


  const total = cart.reduce((sum, item) => {
    return sum + Number(item.price);
  }, 0);


  toast(
    `تم تجهيز طلبك بقيمة ${formatPrice(total)} ج.م ⚔`
  );

});


/* =========================
   حركة ظهور العناصر
========================= */

const observer = new IntersectionObserver(

  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

      }

    });

  },

  {
    threshold: 0.12
  }

);


$$(".reveal").forEach((element) => {

  observer.observe(element);

});


/* =========================
   اختصارات لوحة المفاتيح
========================= */

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {

    closeCart();

    $("#searchBox").classList.remove("show");

  }


  if (
    (event.ctrlKey || event.metaKey) &&
    event.key.toLowerCase() === "k"
  ) {

    event.preventDefault();

    $("#searchBox").classList.add("show");

    $("#searchInput").focus();

  }

});


/* =========================
   تشغيل أولي
========================= */

renderCart();

updateProducts();
