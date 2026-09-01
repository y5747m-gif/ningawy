const products = [
  {
    name: "سماعات لاسلكية احترافية",
    price: 1299
  },

  {
    name: "حقيبة عصرية مميزة",
    price: 899
  },

  {
    name: "مصباح ذكي متعدد الألوان",
    price: 749
  },

  {
    name: "وحدة تحكم لاسلكية",
    price: 1499
  },

  {
    name: "ساعة ذكية أنيقة",
    price: 2199
  },

  {
    name: "لوحة مفاتيح للألعاب",
    price: 1099
  }
];



/* =========================
   CART DATA
========================= */

let cart = JSON.parse(
  localStorage.getItem("ninjawyCart") || "[]"
);



/* =========================
   SELECTORS
========================= */

const $ = selector =>
  document.querySelector(selector);


const $$ = selector =>
  [...document.querySelectorAll(selector)];



/* =========================
   SAVE CART
========================= */

function saveCart() {

  localStorage.setItem(
    "ninjawyCart",
    JSON.stringify(cart)
  );

}



/* =========================
   TOAST
========================= */

let toastTimer;

function toast(message) {

  const toastBox = $("#toast");

  if (!toastBox) return;

  toastBox.textContent = message;

  toastBox.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {

    toastBox.classList.remove("show");

  }, 2500);

}



/* =========================
   RENDER CART
========================= */

function renderCart() {

  const count = $("#cartCount");

  const items = $("#cartItems");

  const total = $("#cartTotal");


  if (!count || !items || !total) return;


  count.textContent = cart.length;


  if (cart.length === 0) {

    items.innerHTML = `
      <p class="empty">
        حقيبتك فارغة حاليًا.
      </p>
    `;

    total.textContent = "0";

    return;

  }


  items.innerHTML = cart.map((product, index) => {

    return `

      <div class="cart-item">

        <div>

          <strong>
            ${product.name}
          </strong>

          <br>

          <small>
            ${product.price.toLocaleString("ar-EG")} ج.م
          </small>

        </div>


        <button
          class="remove-item"
          data-index="${index}">

          حذف

        </button>

      </div>

    `;

  }).join("");



  const cartTotal = cart.reduce(
    (sum, product) => sum + product.price,
    0
  );


  total.textContent =
    cartTotal.toLocaleString("ar-EG");



  $$(".remove-item").forEach(button => {

    button.addEventListener("click", () => {

      const index =
        Number(button.dataset.index);

      cart.splice(index, 1);

      saveCart();

      renderCart();

      toast("تم حذف المنتج من الحقيبة");

    });

  });

}



/* =========================
   INITIAL RENDER
========================= */

renderCart();



/* =========================
   ADD PRODUCT
========================= */

$$(".add-btn").forEach(button => {

  button.addEventListener("click", () => {

    const productName =
      button.dataset.product;


    const product =
      products.find(item =>
        item.name === productName
      );


    if (!product) {

      toast("حدث خطأ في العثور على المنتج");

      return;

    }


    cart.push({

      name: product.name,

      price: product.price

    });


    saveCart();

    renderCart();


    toast(
      "تمت إضافة المنتج إلى حقيبة ننجاوي ⚔"
    );

  });

});



/* =========================
   OPEN CART
========================= */

const cartBtn =
  $("#cartBtn");

const cartPanel =
  $("#cartPanel");

const overlay =
  $("#overlay");

const closeCart =
  $("#closeCart");


if (cartBtn) {

  cartBtn.addEventListener("click", () => {

    cartPanel.classList.add("open");

    overlay.classList.add("show");

  });

}



function closeCartPanel() {

  cartPanel.classList.remove("open");

  overlay.classList.remove("show");

}



if (closeCart) {

  closeCart.addEventListener(
    "click",
    closeCartPanel
  );

}


if (overlay) {

  overlay.addEventListener(
    "click",
    closeCartPanel
  );

}



/* =========================
   CLEAR CART
========================= */

const clearCart =
  $("#clearCart");


if (clearCart) {

  clearCart.addEventListener("click", () => {

    if (cart.length === 0) {

      toast("الحقيبة فارغة بالفعل");

      return;

    }


    cart = [];


    saveCart();

    renderCart();


    toast("تم تفريغ حقيبة ننجاوي");

  });

}



/* =========================
   SEARCH
========================= */

const searchBtn =
  $("#searchBtn");

const searchBox =
  $("#searchBox");

const closeSearch =
  $("#closeSearch");

const searchInput =
  $("#searchInput");


if (searchBtn) {

  searchBtn.addEventListener("click", () => {

    searchBox.classList.add("show");

    searchInput.focus();

  });

}


if (closeSearch) {

  closeSearch.addEventListener("click", () => {

    searchBox.classList.remove("show");

  });

}


if (searchInput) {

  searchInput.addEventListener(
    "input",
    event => {

      const query =
        event.target.value
          .trim()
          .toLowerCase();


      $$(".product-card").forEach(card => {

        const name =
          card.dataset.name
            .toLowerCase();


        if (
          name.includes(query)
        ) {

          card.style.display = "";

        } else {

          card.style.display = "none";

        }

      });

    }
  );

}



/* =========================
   CATEGORY FILTER
========================= */

$$(".category").forEach(button => {

  button.addEventListener("click", () => {

    const category =
      button.dataset.category;


    $$(".category").forEach(item => {

      item.classList.remove("active");

    });


    button.classList.add("active");


    $$(".product-card").forEach(card => {

      const productCategory =
        card.dataset.category;


      if (
        category === "الكل" ||
        productCategory === category
      ) {

        card.style.display = "";

      } else {

        card.style.display = "none";

      }

    });


    document
      .querySelector("#products")
      .scrollIntoView({

        behavior: "smooth",

        block: "start"

      });

  });

});



/* =========================
   SHOW ALL PRODUCTS
========================= */

const showAll =
  $("#showAll");


if (showAll) {

  showAll.addEventListener("click", () => {

    $$(".category").forEach(
      category => {

        category.classList.remove("active");

      }
    );


    const allCategory =
      document.querySelector(
        '[data-category="الكل"]'
      );


    if (allCategory) {

      allCategory.classList.add("active");

    }


    $$(".product-card").forEach(card => {

      card.style.display = "";

    });


    $("#products").scrollIntoView({

      behavior: "smooth"

    });

  });

}



/* =========================
   MOBILE MENU
========================= */

const menuBtn =
  $("#menuBtn");

const navLinks =
  $("#navLinks");


if (menuBtn) {

  menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("open");

  });

}



/* CLOSE MENU AFTER CLICK */

$$(".nav-links a").forEach(link => {

  link.addEventListener("click", () => {

    navLinks.classList.remove("open");

  });

});



/* =========================
   NEWSLETTER
========================= */

const newsletterForm =
  $("#newsletterForm");


if (newsletterForm) {

  newsletterForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      toast(
        "تم تسجيل بريدك بنجاح ⚡ مرحبًا بك في ننجاوي"
      );


      newsletterForm.reset();

    }
  );

}



/* =========================
   OFFER BUTTON
========================= */

const offerBtn =
  $("#offerBtn");


if (offerBtn) {

  offerBtn.addEventListener("click", () => {

    $("#products").scrollIntoView({

      behavior: "smooth"

    });


    toast(
      "تم فتح المنتجات المشاركة في العروض 🔥"
    );

  });

}



/* =========================
   CHECKOUT
========================= */

const checkoutBtn =
  $("#checkoutBtn");


if (checkoutBtn) {

  checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

      toast(
        "أضف منتجًا أولًا إلى الحقيبة"
      );

      return;

    }


    const total =
      cart.reduce(
        (sum, product) =>
          sum + product.price,
        0
      );


    toast(
      `تم إنشاء طلب تجريبي بقيمة ${total.toLocaleString("ar-EG")} ج.م ⚔`
    );

  });

}



/* =========================
   FAVORITES
========================= */

$$(".favorite-btn").forEach(button => {

  button.addEventListener("click", () => {

    button.classList.toggle("active");


    if (
      button.classList.contains("active")
    ) {

      button.textContent = "♥";

      toast("تمت إضافة المنتج إلى المفضلة ❤️");

    } else {

      button.textContent = "♡";

      toast("تم حذف المنتج من المفضلة");

    }

  });

});



/* =========================
   ESCAPE KEY
========================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      searchBox?.classList.remove("show");

      closeCartPanel();

    }

  }
);
