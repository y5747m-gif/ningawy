/* ==========================================
   NINJAWY V2
   Store System & Interactive Features
========================================== */


/* ---------- PRODUCTS ---------- */

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


/* ---------- SELECTORS ---------- */

const $ = selector => document.querySelector(selector);

const $$ = selector =>
  [...document.querySelectorAll(selector)];


/* ---------- STORAGE ---------- */

let cart = JSON.parse(
  localStorage.getItem("ninjawyCart") || "[]"
);

let favorites = JSON.parse(
  localStorage.getItem("ninjawyFavorites") || "[]"
);


/* ---------- SAVE DATA ---------- */

function saveCart() {

  localStorage.setItem(
    "ninjawyCart",
    JSON.stringify(cart)
  );

}


function saveFavorites() {

  localStorage.setItem(
    "ninjawyFavorites",
    JSON.stringify(favorites)
  );

}


/* ---------- TOAST ---------- */

function toast(message) {

  const toastBox = $("#toast");

  toastBox.textContent = message;

  toastBox.classList.add("show");

  setTimeout(() => {

    toastBox.classList.remove("show");

  }, 2500);

}


/* ---------- FORMAT PRICE ---------- */

function formatPrice(price) {

  return price.toLocaleString("ar-EG");

}


/* ==========================================
   CART SYSTEM
========================================== */


/* ---------- ADD TO CART ---------- */

function addToCart(name) {

  const product = products.find(
    item => item.name === name
  );

  if (!product) return;


  const existingProduct = cart.find(
    item => item.name === name
  );


  if (existingProduct) {

    existingProduct.quantity++;

  }

  else {

    cart.push({
      name: product.name,
      price: product.price,
      quantity: 1
    });

  }


  saveCart();

  renderCart();

  toast(
    "تمت إضافة المنتج إلى حقيبة ننجاوي ⚔"
  );

}


/* ---------- REMOVE FROM CART ---------- */

function removeFromCart(index) {

  cart.splice(index, 1);

  saveCart();

  renderCart();

}


/* ---------- CHANGE QUANTITY ---------- */

function changeQuantity(index, amount) {

  cart[index].quantity += amount;


  if (cart[index].quantity <= 0) {

    removeFromCart(index);

    return;

  }


  saveCart();

  renderCart();

}


/* ---------- CLEAR CART ---------- */

function clearCart() {

  cart = [];

  saveCart();

  renderCart();

  toast("تم تفريغ حقيبة ننجاوي");

}


/* ---------- RENDER CART ---------- */

function renderCart() {

  const cartItems = $("#cartItems");

  const cartCount = $("#cartCount");

  const cartTotal = $("#cartTotal");


  const totalItems = cart.reduce(

    (total, item) =>
      total + item.quantity,

    0

  );


  cartCount.textContent = totalItems;


  if (!cart.length) {

    cartItems.innerHTML = `

      <p class="empty">
        حقيبتك فارغة حاليًا.
      </p>

    `;

    cartTotal.textContent = "0";

    return;

  }


  cartItems.innerHTML = cart.map(

    (item, index) => `

      <div class="cart-item">

        <div class="cart-item-info">

          <strong>
            ${item.name}
          </strong>

          <small>
            ${formatPrice(item.price)} ج.م
          </small>

        </div>


        <div class="cart-controls">

          <button
            class="quantity-btn"
            data-action="increase"
            data-index="${index}"
          >
            +
          </button>


          <span class="quantity">
            ${item.quantity}
          </span>


          <button
            class="quantity-btn"
            data-action="decrease"
            data-index="${index}"
          >
            −
          </button>

        </div>


        <button
          class="remove-item"
          data-action="remove"
          data-index="${index}"
        >
          حذف
        </button>

      </div>

    `

  ).join("");


  const totalPrice = cart.reduce(

    (total, item) =>

      total +
      item.price *
      item.quantity,

    0

  );


  cartTotal.textContent =
    formatPrice(totalPrice);


  /* CART BUTTONS */

  $$(".cart-item button").forEach(

    button => {

      button.addEventListener(
        "click",

        () => {

          const index =
            Number(
              button.dataset.index
            );


          const action =
            button.dataset.action;


          if (
            action === "increase"
          ) {

            changeQuantity(
              index,
              1
            );

          }


          if (
            action === "decrease"
          ) {

            changeQuantity(
              index,
              -1
            );

          }


          if (
            action === "remove"
          ) {

            removeFromCart(
              index
            );

          }

        }

      );

    }

  );

}


/* ==========================================
   PRODUCT BUTTONS
========================================== */


$$(".add-btn").forEach(

  button => {

    button.addEventListener(

      "click",

      () => {

        addToCart(
          button.dataset.product
        );

      }

    );

  }

);


/* ==========================================
   FAVORITES SYSTEM
========================================== */


function renderFavorites() {

  $$(".favorite-btn").forEach(

    button => {

      const productCard =
        button.closest(
          ".product-card"
        );


      const productName =
        productCard.dataset.name;


      if (
        favorites.includes(
          productName
        )
      ) {

        button.classList.add(
          "active"
        );

        button.textContent = "♥";

      }

      else {

        button.classList.remove(
          "active"
        );

        button.textContent = "♡";

      }

    }

  );

}


$$(".favorite-btn").forEach(

  button => {

    button.addEventListener(

      "click",

      () => {

        const card =
          button.closest(
            ".product-card"
          );


        const productName =
          card.dataset.name;


        if (
          favorites.includes(
            productName
          )
        ) {

          favorites =
            favorites.filter(

              item =>
                item !== productName

            );


          toast(
            "تمت إزالة المنتج من المفضلة"
          );

        }

        else {

          favorites.push(
            productName
          );


          toast(
            "تمت إضافة المنتج إلى المفضلة ♥"
          );

        }


        saveFavorites();

        renderFavorites();

      }

    );

  }

);


/* ==========================================
   CART PANEL
========================================== */


function openCart() {

  $("#cartPanel")
    .classList.add("open");


  $("#overlay")
    .classList.add("show");

}


function closeCart() {

  $("#cartPanel")
    .classList.remove("open");


  $("#overlay")
    .classList.remove("show");

}


$("#cartBtn").onclick =
  openCart;


$("#closeCart").onclick =
  closeCart;


$("#overlay").onclick =
  closeCart;


/* CLEAR CART */

$("#clearCart").onclick =
  clearCart;


/* ==========================================
   SEARCH SYSTEM
========================================== */


$("#searchBtn").onclick =
  () => {

    $("#searchBox")
      .classList.add("show");


    $("#searchInput")
      .focus();

  };


$("#closeSearch").onclick =
  () => {

    $("#searchBox")
      .classList.remove("show");

  };


$("#searchInput").addEventListener(

  "input",

  event => {

    const query =
      event.target.value
        .trim()
        .toLowerCase();


    $$(".product-card").forEach(

      card => {

        const productName =
          card.dataset.name
            .toLowerCase();


        card.style.display =
          productName.includes(query)
            ? "block"
            : "none";

      }

    );

  }

);


/* ==========================================
   CATEGORY FILTER
========================================== */


$$(".category").forEach(

  button => {

    button.onclick =
      () => {

        $$(".category").forEach(

          item =>

            item.classList.remove(
              "active"
            )

        );


        button.classList.add(
          "active"
        );


        const category =
          button.dataset.category;


        $$(".product-card").forEach(

          card => {

            const shouldShow =

              category === "الكل"

              ||

              card.dataset.category ===
              category;


            card.style.display =
              shouldShow
                ? "block"
                : "none";

          }

        );

      };

  }

);


/* ==========================================
   SHOW ALL PRODUCTS
========================================== */


$("#showAll").onclick =
  () => {

    $$(".category").forEach(

      item =>

        item.classList.remove(
          "active"
        )

    );


    document
      .querySelector(
        '[data-category="الكل"]'
      )
      .classList.add(
        "active"
      );


    $$(".product-card").forEach(

      card => {

        card.style.display =
          "block";

      }

    );


    $("#products")
      .scrollIntoView({

        behavior: "smooth"

      });

  };


/* ==========================================
   MOBILE MENU
========================================== */


$("#menuBtn").onclick =
  () => {

    $("#navLinks")
      .classList.toggle("open");

  };


/* ==========================================
   NEWSLETTER
========================================== */


$("#newsletterForm").onsubmit =
  event => {

    event.preventDefault();


    toast(
      "تم تسجيل بريدك بنجاح ⚡ مرحبًا بك في ننجاوي"
    );


    event.target.reset();

  };


/* ==========================================
   OFFERS
========================================== */


$("#offerBtn").onclick =
  () => {

    $("#products")
      .scrollIntoView({

        behavior: "smooth"

      });


    toast(
      "تم عرض المنتجات المشاركة في العروض 🔥"
    );

  };


/* ==========================================
   CHECKOUT
========================================== */


$("#checkoutBtn").onclick =
  () => {

    if (!cart.length) {

      toast(
        "أضف منتجًا أولًا إلى الحقيبة"
      );

      return;

    }


    toast(
      "تم حفظ طلبك تجريبيًا ⚔ سيتم تطوير نظام الطلب والدفع في NINJAWY V2"
    );

  };


/* ==========================================
   SCROLL NAVBAR
========================================== */


window.addEventListener(

  "scroll",

  () => {

    const navbar =
      $(".navbar");


    if (
      window.scrollY > 50
    ) {

      navbar.classList.add(
        "scrolled"
      );

    }

    else {

      navbar.classList.remove(
        "scrolled"
      );

    }

  }

);


/* ==========================================
   REVEAL ANIMATION
========================================== */


const observer =
  new IntersectionObserver(

    entries => {

      entries.forEach(

        entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "show"
            );


            observer.unobserve(
              entry.target
            );

          }

        }

      );

    },

    {

      threshold: 0.12

    }

  );


$$(".reveal").forEach(

  element =>

    observer.observe(
      element
    )

);


/* ==========================================
   ESCAPE KEY
========================================== */


document.addEventListener(

  "keydown",

  event => {

    if (
      event.key === "Escape"
    ) {

      closeCart();


      $("#searchBox")
        .classList.remove(
          "show"
        );

    }

  }

);


/* ==========================================
   INITIALIZE
========================================== */


renderCart();

renderFavorites();
