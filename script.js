/* =========================================
   NINJAWY V2
   SCRIPT
   ========================================= */


/* PRODUCTS */

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


/* WHATSAPP */

const WHATSAPP_NUMBER = "201141362626";


/* SELECTORS */

const $ = selector =>
  document.querySelector(selector);


const $$ = selector =>
  [...document.querySelectorAll(selector)];


/* CART */

let cart = JSON.parse(
  localStorage.getItem("ninjawyCart") || "[]"
);


/* SAVE CART */

function saveCart(){

  localStorage.setItem(
    "ninjawyCart",
    JSON.stringify(cart)
  );

}


/* TOAST */

function toast(message){

  const element = $("#toast");

  element.textContent = message;

  element.classList.add("show");


  setTimeout(() => {

    element.classList.remove("show");

  }, 2500);

}


/* GET PRODUCT */

function getProduct(name){

  return products.find(
    product => product.name === name
  );

}


/* ADD PRODUCT */

function addToCart(name){

  const product = getProduct(name);

  if(!product) return;


  const existingProduct = cart.find(
    item => item.name === name
  );


  if(existingProduct){

    existingProduct.quantity += 1;

  }else{

    cart.push({

      name: product.name,

      price: product.price,

      quantity: 1

    });

  }


  saveCart();

  renderCart();

  toast("تمت إضافة المنتج إلى حقيبة ننجاوي ⚔");

}


/* REMOVE PRODUCT */

function removeFromCart(index){

  cart.splice(index, 1);

  saveCart();

  renderCart();

}


/* UPDATE QUANTITY */

function updateQuantity(index, change){

  cart[index].quantity += change;


  if(cart[index].quantity <= 0){

    removeFromCart(index);

    return;

  }


  saveCart();

  renderCart();

}


/* CLEAR CART */

function clearCart(){

  if(!cart.length){

    toast("الحقيبة فارغة بالفعل");

    return;

  }


  cart = [];

  saveCart();

  renderCart();

  toast("تم تفريغ الحقيبة");

}


/* CART TOTAL */

function getCartTotal(){

  return cart.reduce(
    (total, product) => {

      return total +
        (product.price * product.quantity);

    },
    0
  );

}


/* CART COUNT */

function getCartCount(){

  return cart.reduce(
    (total, product) => {

      return total +
        product.quantity;

    },
    0
  );

}


/* RENDER CART */

function renderCart(){

  const cartItems = $("#cartItems");

  const cartCount = $("#cartCount");

  const cartTotal = $("#cartTotal");


  cartCount.textContent =
    getCartCount();


  if(!cart.length){

    cartItems.innerHTML = `

      <p class="empty">
        حقيبتك فارغة حاليًا.
      </p>

    `;


    cartTotal.textContent = "0";

    return;

  }


  cartItems.innerHTML =
    cart.map(
      (product, index) => `

      <div class="cart-item">


        <div class="cart-item-top">


          <div>


            <div class="cart-item-name">
              ${product.name}
            </div>


            <div class="cart-item-price">
              ${product.price.toLocaleString("ar-EG")} ج.م
            </div>


          </div>


          <button
            class="remove-item"
            data-index="${index}">

            حذف

          </button>


        </div>



        <div class="quantity-row">


          <div class="quantity-controls">


            <button
              class="qty-btn"
              data-action="increase"
              data-index="${index}">

              +

            </button>


            <span class="qty-number">

              ${product.quantity}

            </span>


            <button
              class="qty-btn"
              data-action="decrease"
              data-index="${index}">

              −

            </button>


          </div>



          <span class="item-total">

            الإجمالي:

            ${(product.price * product.quantity)
              .toLocaleString("ar-EG")}

            ج.م

          </span>


        </div>


      </div>

      `
    )
    .join("");


  cartTotal.textContent =
    getCartTotal()
      .toLocaleString("ar-EG");


  /* REMOVE BUTTONS */

  $$(".remove-item").forEach(button => {

    button.addEventListener(
      "click",
      () => {

        removeFromCart(
          Number(
            button.dataset.index
          )
        );

      }
    );

  });


  /* QUANTITY BUTTONS */

  $$(".qty-btn").forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const index =
          Number(
            button.dataset.index
          );


        const action =
          button.dataset.action;


        if(action === "increase"){

          updateQuantity(
            index,
            1
          );

        }


        if(action === "decrease"){

          updateQuantity(
            index,
            -1
          );

        }

      }
    );

  });

}


/* ADD BUTTONS */

$$(".add-btn").forEach(button => {

  button.addEventListener(
    "click",
    () => {

      addToCart(
        button.dataset.product
      );

    }
  );

});


/* FAVORITES */

$$(".favorite-btn").forEach(button => {

  button.addEventListener(
    "click",
    () => {

      button.classList.toggle("active");


      button.textContent =
        button.classList.contains("active")
          ? "♥"
          : "♡";


      toast(
        button.classList.contains("active")
          ? "تمت الإضافة إلى المفضلة ❤️"
          : "تمت الإزالة من المفضلة"
      );

    }
  );

});


/* OPEN CART */

$("#cartBtn").addEventListener(
  "click",
  () => {

    $("#cartPanel")
      .classList
      .add("open");


    $("#overlay")
      .classList
      .add("show");

  }
);


/* CLOSE CART */

function closeCart(){

  $("#cartPanel")
    .classList
    .remove("open");


  $("#overlay")
    .classList
    .remove("show");

}


$("#closeCart").addEventListener(
  "click",
  closeCart
);


$("#overlay").addEventListener(
  "click",
  closeCart
);


/* CLEAR CART */

$("#clearCart").addEventListener(
  "click",
  clearCart
);


/* SEARCH */

$("#searchBtn").addEventListener(
  "click",
  () => {

    $("#searchBox")
      .classList
      .add("show");


    setTimeout(() => {

      $("#searchInput")
        .focus();

    }, 100);

  }
);


$("#closeSearch").addEventListener(
  "click",
  () => {

    $("#searchBox")
      .classList
      .remove("show");

  }
);


/* SEARCH PRODUCTS */

$("#searchInput").addEventListener(
  "input",
  event => {

    const query =
      event.target.value
        .trim()
        .toLowerCase();


    $$(".product-card")
      .forEach(card => {


        const productName =
          card.dataset.name
            .toLowerCase();


        card.style.display =
          productName.includes(query)
            ? "block"
            : "none";


      });

  }
);


/* CATEGORY FILTER */

$$(".category").forEach(button => {

  button.addEventListener(
    "click",
    () => {


      $$(".category")
        .forEach(item => {

          item.classList
            .remove("active");

        });


      button.classList
        .add("active");


      const category =
        button.dataset.category;


      $$(".product-card")
        .forEach(card => {


          const cardCategory =
            card.dataset.category;


          card.style.display =
            category === "الكل" ||
            cardCategory === category
              ? "block"
              : "none";


        });


      document
        .querySelector("#products")
        .scrollIntoView({

          behavior: "smooth"

        });


    }
  );

});


/* SHOW ALL */

$("#showAll").addEventListener(
  "click",
  () => {


    $$(".category")
      .forEach(button => {

        button.classList
          .remove("active");

      });


    document
      .querySelector(
        '[data-category="الكل"]'
      )
      .classList
      .add("active");


    $$(".product-card")
      .forEach(card => {

        card.style.display =
          "block";

      });


    document
      .querySelector("#products")
      .scrollIntoView({

        behavior: "smooth"

      });


  }
);


/* MOBILE MENU */

$("#menuBtn").addEventListener(
  "click",
  () => {

    $("#navLinks")
      .classList
      .toggle("open");

  }
);


/* CLOSE MENU */

$$(".nav-links a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        $("#navLinks")
          .classList
          .remove("open");

      }
    );

  });


/* NEWSLETTER */

$("#newsletterForm")
  .addEventListener(
    "submit",
    event => {

      event.preventDefault();

      toast(
        "تم تسجيل بريدك بنجاح ⚡ مرحبًا بك في ننجاوي"
      );

      event.target.reset();

    }
  );


/* OFFER BUTTON */

$("#offerBtn")
  .addEventListener(
    "click",
    () => {

      document
        .querySelector("#products")
        .scrollIntoView({

          behavior: "smooth"

        });


      toast(
        "تم فتح المنتجات المشاركة في العروض 🔥"
      );

    }
  );


/* CHECKOUT */

$("#checkoutBtn")
  .addEventListener(
    "click",
    () => {


      /* CHECK CART */

      if(!cart.length){

        toast(
          "أضف منتجًا أولًا إلى الحقيبة"
        );

        return;

      }


      /* CUSTOMER DATA */

      const customerName =
        $("#customerName")
          .value
          .trim();


      const customerPhone =
        $("#customerPhone")
          .value
          .trim();


      const customerPhone2 =
        $("#customerPhone2")
          .value
          .trim();


      const customerCity =
        $("#customerCity")
          .value
          .trim();


      const customerAddress =
        $("#customerAddress")
          .value
          .trim();


      const customerNotes =
        $("#customerNotes")
          .value
          .trim();


      /* VALIDATION */

      if(!customerName){

        toast(
          "من فضلك اكتب الاسم بالكامل"
        );

        $("#customerName")
          .focus();

        return;

      }


      if(!customerPhone){

        toast(
          "من فضلك اكتب رقم الهاتف"
        );

        $("#customerPhone")
          .focus();

        return;

      }


      if(!customerCity){

        toast(
          "من فضلك اكتب المحافظة أو المدينة"
        );

        $("#customerCity")
          .focus();

        return;

      }


      if(!customerAddress){

        toast(
          "من فضلك اكتب عنوان التوصيل"
        );

        $("#customerAddress")
          .focus();

        return;

      }


      /* PRODUCTS MESSAGE */

      let productsMessage = "";


      cart.forEach(
        (product, index) => {


          const productTotal =
            product.price *
            product.quantity;


          productsMessage +=

`🛍 المنتج ${index + 1}

الاسم: ${product.name}

الكمية: ${product.quantity}

سعر القطعة: ${product.price.toLocaleString("ar-EG")} ج.م

إجمالي المنتج: ${productTotal.toLocaleString("ar-EG")} ج.م

━━━━━━━━━━━━━━

`;


        }
      );


      /* TOTAL */

      const total =
        getCartTotal();


      /* WHATSAPP MESSAGE */

      const message =

`⚔ *طلب جديد - متجر ننجاوي*

━━━━━━━━━━━━━━

👤 *بيانات العميل*

الاسم:
${customerName}

📞 رقم الهاتف:
${customerPhone}

📱 رقم إضافي:
${customerPhone2 || "غير متوفر"}

📍 المحافظة / المدينة:
${customerCity}

🏠 عنوان التوصيل:
${customerAddress}

📝 ملاحظات العميل:
${customerNotes || "لا توجد ملاحظات"}

━━━━━━━━━━━━━━

📦 *المنتجات المطلوبة*

${productsMessage}

💰 *إجمالي الطلب*

${total.toLocaleString("ar-EG")} ج.م

━━━━━━━━━━━━━━

⚔ تم إرسال الطلب من موقع NINJAWY`;


      /* WHATSAPP URL */

      const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


      toast(
        "جارٍ تجهيز طلبك وتحويلك إلى واتساب..."
      );


      setTimeout(
        () => {

          window.open(
            whatsappURL,
            "_blank"
          );

        },
        700
      );


    }
  );


/* INITIAL RENDER */

renderCart();
