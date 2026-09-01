const products = [
  ["سماعات لاسلكية احترافية", 1299],
  ["حقيبة عصرية مميزة", 899],
  ["مصباح ذكي متعدد الألوان", 749],
  ["وحدة تحكم لاسلكية", 1499],
  ["ساعة ذكية أنيقة", 2199],
  ["لوحة مفاتيح للألعاب", 1099]
];

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

let cart = JSON.parse(
  localStorage.getItem("ninjawyCart") || "[]"
);


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

function toast(message) {

  const element = $("#toast");

  element.textContent = message;

  element.classList.add("show");

  clearTimeout(element.toastTimer);

  element.toastTimer = setTimeout(() => {
    element.classList.remove("show");
  }, 2500);

}


/* =========================
   CART
========================= */

function getCartQuantity() {

  return cart.reduce(
    (total, product) =>
      total + product.quantity,
    0
  );

}


function getCartTotal() {

  return cart.reduce(
    (total, product) =>
      total + product.price * product.quantity,
    0
  );

}


function renderCart() {

  $("#cartCount").textContent =
    getCartQuantity();

  const itemsContainer =
    $("#cartItems");


  if (!cart.length) {

    itemsContainer.innerHTML = `
      <p class="empty">
        حقيبتك فارغة حاليًا 🥷
      </p>
    `;

    $("#cartTotal").textContent = "0";

    return;
  }


  itemsContainer.innerHTML =
    cart.map((product, index) => `

      <div class="cart-item">

        <div class="cart-item-top">

          <div>

            <strong>
              ${product.name}
            </strong>

            <br>

            <small>
              ${product.price.toLocaleString("ar-EG")}
              ج.م
            </small>

          </div>

          <strong>
            ${(product.price * product.quantity)
              .toLocaleString("ar-EG")}
            ج.م
          </strong>

        </div>


        <div class="quantity-control">

          <button
            class="increase-quantity"
            data-index="${index}">
            +
          </button>

          <span>
            ${product.quantity}
          </span>

          <button
            class="decrease-quantity"
            data-index="${index}">
            −
          </button>

        </div>


        <button
          class="remove-item"
          data-index="${index}">

          حذف المنتج

        </button>

      </div>

    `).join("");


  $("#cartTotal").textContent =
    getCartTotal()
      .toLocaleString("ar-EG");


  $$(".increase-quantity")
    .forEach(button => {

      button.onclick = () => {

        const index =
          Number(button.dataset.index);

        cart[index].quantity++;

        saveCart();

        renderCart();

      };

    });


  $$(".decrease-quantity")
    .forEach(button => {

      button.onclick = () => {

        const index =
          Number(button.dataset.index);

        if (cart[index].quantity > 1) {

          cart[index].quantity--;

        } else {

          cart.splice(index, 1);

        }

        saveCart();

        renderCart();

      };

    });


  $$(".remove-item")
    .forEach(button => {

      button.onclick = () => {

        const index =
          Number(button.dataset.index);

        cart.splice(index, 1);

        saveCart();

        renderCart();

        toast("تم حذف المنتج من الحقيبة");

      };

    });

}


/* =========================
   ADD TO CART
========================= */

$$(".add-btn")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const name =
          button.dataset.product;

        const found =
          products.find(
            product =>
              product[0] === name
          );


        if (!found) return;


        const existing =
          cart.find(
            product =>
              product.name === name
          );


        if (existing) {

          existing.quantity++;

        } else {

          cart.push({

            name: name,

            price: found[1],

            quantity: 1

          });

        }


        saveCart();

        renderCart();

        toast(
          "تمت إضافة المنتج إلى حقيبة ننجاوي ⚔"
        );

      }
    );

  );


/* =========================
   CART OPEN / CLOSE
========================= */

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


/* =========================
   CLEAR CART
========================= */

$("#clearCart").onclick =
  () => {

    if (!cart.length) {

      toast("الحقيبة فارغة بالفعل");

      return;

    }


    cart = [];

    saveCart();

    renderCart();

    toast("تم تفريغ حقيبة ننجاوي");

  };


/* =========================
   SEARCH
========================= */

$("#searchBtn").onclick =
  () => {

    $("#searchBox")
      .classList.add("show");

    setTimeout(() => {
      $("#searchInput").focus();
    }, 150);

  };


$("#closeSearch").onclick =
  () => {

    $("#searchBox")
      .classList.remove("show");

  };


$("#searchInput")
  .addEventListener(
    "input",
    event => {

      const query =
        event.target.value
          .trim()
          .toLowerCase();


      $$(".product-card")
        .forEach(card => {

          const name =
            card.dataset.name
              .toLowerCase();

          const category =
            card.dataset.category
              .toLowerCase();


          const match =
            name.includes(query) ||
            category.includes(query);


          card.style.display =
            match ? "block" : "none";

        });

    }
  );


/* =========================
   CATEGORIES
========================= */

$$(".category")
  .forEach(button => {

    button.onclick =
      () => {

        $$(".category")
          .forEach(item =>
            item.classList
              .remove("active")
          );


        button.classList
          .add("active");


        const selected =
          button.dataset.category;


        $$(".product-card")
          .forEach(card => {

            const show =
              selected === "الكل" ||
              card.dataset.category ===
              selected;


            card.style.display =
              show ? "block" : "none";

          });


        document
          .querySelector("#products")
          .scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

      };

  );


/* =========================
   SHOW ALL PRODUCTS
========================= */

$("#showAll").onclick =
  () => {

    $$(".category")
      .forEach(item =>
        item.classList
          .remove("active")
      );


    $(
      '[data-category="الكل"]'
    ).classList.add("active");


    $$(".product-card")
      .forEach(card => {

        card.style.display =
          "block";

      });


    $("#products")
      .scrollIntoView({
        behavior: "smooth",
        block: "start"
      });


    toast(
      "تم عرض جميع منتجات ننجاوي ⚔"
    );

  };


/* =========================
   MOBILE MENU
========================= */

$("#menuBtn").onclick =
  () => {

    $("#navLinks")
      .classList.toggle("open");

  };


$$(".nav-links a")
  .forEach(link => {

    link.onclick =
      () => {

        $("#navLinks")
          .classList.remove("open");

      };

  });


/* =========================
   FAVORITES
========================= */

$$(".favorite-btn")
  .forEach(button => {

    button.onclick =
      () => {

        button.classList
          .toggle("active");


        if (
          button.classList
            .contains("active")
        ) {

          button.textContent = "♥";

          toast(
            "تمت إضافة المنتج إلى المفضلة ❤️"
          );

        } else {

          button.textContent = "♡";

          toast(
            "تمت إزالة المنتج من المفضلة"
          );

        }

      };

  });


/* =========================
   NEWSLETTER
========================= */

$("#newsletterForm")
  .onsubmit =
  event => {

    event.preventDefault();

    toast(
      "تم تسجيل بريدك بنجاح ⚡ مرحبًا بك في ننجاوي"
    );

    event.target.reset();

  };


/* =========================
   OFFERS
========================= */

$("#offerBtn").onclick =
  () => {

    $("#products")
      .scrollIntoView({
        behavior: "smooth"
      });


    toast(
      "تم فتح المنتجات المشاركة في العروض 🔥"
    );

  };


/* =========================
   CHECKOUT
========================= */

$("#checkoutBtn").onclick =
  () => {

    if (!cart.length) {

      toast(
        "أضف منتجًا أولًا إلى الحقيبة"
      );

      return;

    }


    toast(
      "تم تجهيز طلبك تجريبيًا ⚔ سيتم ربط الدفع لاحقًا"
    );

  };


/* =========================
   SCROLL ANIMATION
========================= */

const observer =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (
          entry.isIntersecting
        ) {

          entry.target
            .classList
            .add("visible");

          observer.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: .12
    }

  );


$$(".reveal")
  .forEach(element =>
    observer.observe(element)
  );


/* =========================
   START
========================= */

renderCart();
