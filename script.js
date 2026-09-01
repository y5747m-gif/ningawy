/* =========================================
   NINJAWY STORE
   ========================================= */


/* =========================================
   SETTINGS
   ========================================= */

const WHATSAPP_NUMBER = "201141362626";


/*
  بيانات دخول الإدارة.

  غيّر كلمة المرور هنا فقط.
*/

const ADMIN_USERNAME = "yaseen";

const ADMIN_PASSWORD = "NINJAWY2026";


/* =========================================
   STORAGE
   ========================================= */

const PRODUCTS_STORAGE = "ninjawy_products";

const CART_STORAGE = "ninjawy_cart";

const FAVORITES_STORAGE = "ninjawy_favorites";

const ADMIN_SESSION = "ninjawy_admin_session";


/* =========================================
   DEFAULT PRODUCTS
   ========================================= */

const defaultProducts = [

  {
    id: 1,
    name: "سماعات لاسلكية احترافية",
    description:
      "صوت نقي وتصميم مريح للاستخدام اليومي.",
    category: "إلكترونيات",
    price: 1299,
    image: "",
    icon: "🎧"
  },

  {
    id: 2,
    name: "حقيبة عصرية مميزة",
    description:
      "تصميم أنيق وخامة مناسبة للاستخدام اليومي.",
    category: "أزياء",
    price: 899,
    image: "",
    icon: "👜"
  },

  {
    id: 3,
    name: "مصباح ذكي متعدد الألوان",
    description:
      "إضاءة ذكية تمنح منزلك أجواء مميزة.",
    category: "منزل",
    price: 749,
    image: "",
    icon: "💡"
  },

  {
    id: 4,
    name: "وحدة تحكم لاسلكية",
    description:
      "تحكم مريح واستجابة ممتازة للألعاب.",
    category: "ألعاب",
    price: 1499,
    image: "",
    icon: "🎮"
  },

  {
    id: 5,
    name: "ساعة ذكية أنيقة",
    description:
      "تصميم حديث مع خصائص ذكية متعددة.",
    category: "إكسسوارات",
    price: 2199,
    image: "",
    icon: "⌚"
  },

  {
    id: 6,
    name: "لوحة مفاتيح للألعاب",
    description:
      "تصميم عملي مناسب للألعاب والعمل.",
    category: "إلكترونيات",
    price: 1099,
    image: "",
    icon: "⌨️"
  }

];


/* =========================================
   STATE
   ========================================= */

let products =
  JSON.parse(
    localStorage.getItem(PRODUCTS_STORAGE)
  ) || defaultProducts;


let cart =
  JSON.parse(
    localStorage.getItem(CART_STORAGE)
  ) || [];


let favorites =
  JSON.parse(
    localStorage.getItem(FAVORITES_STORAGE)
  ) || [];


let selectedCategory = "الكل";


let uploadedImage = "";


/* =========================================
   ELEMENTS
   ========================================= */

const productsGrid =
  document.getElementById("productsGrid");


const cartPanel =
  document.getElementById("cartPanel");


const overlay =
  document.getElementById("overlay");


const cartItems =
  document.getElementById("cartItems");


const cartCount =
  document.getElementById("cartCount");


const cartTotal =
  document.getElementById("cartTotal");


const toast =
  document.getElementById("toast");


/* =========================================
   HELPERS
   ========================================= */

function saveProducts() {

  localStorage.setItem(
    PRODUCTS_STORAGE,
    JSON.stringify(products)
  );

}


function saveCart() {

  localStorage.setItem(
    CART_STORAGE,
    JSON.stringify(cart)
  );

}


function saveFavorites() {

  localStorage.setItem(
    FAVORITES_STORAGE,
    JSON.stringify(favorites)
  );

}


function formatPrice(price) {

  return Number(price)
    .toLocaleString("ar-EG");

}


function showToast(message) {

  toast.textContent = message;

  toast.classList.add("show");


  setTimeout(() => {

    toast.classList.remove("show");

  }, 2500);

}


/* =========================================
   PRODUCTS RENDER
   ========================================= */

function renderProducts() {

  productsGrid.innerHTML = "";


  let filteredProducts = products;


  if (selectedCategory !== "الكل") {

    filteredProducts =
      products.filter(
        product =>
          product.category === selectedCategory
      );

  }


  if (filteredProducts.length === 0) {

    productsGrid.innerHTML = `

      <div class="cart-empty">

        لا توجد منتجات في هذا القسم حاليًا.

      </div>

    `;

    return;

  }


  filteredProducts.forEach(product => {

    const isFavorite =
      favorites.includes(product.id);


    const imageContent =
      product.image
        ? `
          <img
            src="${product.image}"
            class="product-image"
            alt="${product.name}"
          >
        `
        : `
          <div class="product-placeholder">
            ${product.icon || "📦"}
          </div>
        `;


    const card = document.createElement("article");

    card.className = "product-card";


    card.innerHTML = `

      <div class="product-image-box">

        ${imageContent}


        <span class="product-badge">

          ${product.category}

        </span>


        <button
          class="favorite-btn ${isFavorite ? "active" : ""}"
          data-favorite="${product.id}"
        >

          ${isFavorite ? "♥" : "♡"}

        </button>


      </div>


      <div class="product-info">


        <span class="product-category">

          ${product.category}

        </span>


        <h3>

          ${product.name}

        </h3>


        <p class="product-description">

          ${product.description}

        </p>


        <div class="product-price-row">

          <strong class="product-price">

            ${formatPrice(product.price)} ج.م

          </strong>

        </div>


        <button
          class="add-btn"
          data-add="${product.id}"
        >

          أضف للسلة ⚔

        </button>


      </div>

    `;


    productsGrid.appendChild(card);

  });


  addProductEvents();

}


/* =========================================
   PRODUCT EVENTS
   ========================================= */

function addProductEvents() {


  document
    .querySelectorAll("[data-add]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const id =
            Number(
              button.dataset.add
            );


          addToCart(id, button);

        }
      );

    });



  document
    .querySelectorAll("[data-favorite]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const id =
            Number(
              button.dataset.favorite
            );


          toggleFavorite(id);

        }
      );

    });

}


/* =========================================
   FAVORITES
   ========================================= */

function toggleFavorite(id) {

  if (favorites.includes(id)) {

    favorites =
      favorites.filter(
        favoriteId =>
          favoriteId !== id
      );

  } else {

    favorites.push(id);

  }


  saveFavorites();

  renderProducts();

}


/* =========================================
   CART
   ========================================= */

function addToCart(id, button) {

  const product =
    products.find(
      item =>
        item.id === id
    );


  if (!product) {

    return;

  }


  const existingItem =
    cart.find(
      item =>
        item.id === id
    );


  if (existingItem) {

    existingItem.quantity += 1;

  } else {

    cart.push({

      ...product,

      quantity: 1

    });

  }


  saveCart();

  renderCart();


  /*
    أنيميشن جديد عند إضافة المنتج
  */

  button.classList.remove("added");

  void button.offsetWidth;

  button.classList.add("added");


  setTimeout(() => {

    button.classList.remove("added");

  }, 650);


  showToast(
    "تمت إضافة المنتج إلى السلة 🛍"
  );

}


function renderCart() {

  cartItems.innerHTML = "";


  if (cart.length === 0) {

    cartItems.innerHTML = `

      <div class="cart-empty">

        حقيبتك فارغة حاليًا 🥷

      </div>

    `;


    cartCount.textContent = "0";

    cartTotal.textContent = "0";

    return;

  }


  let total = 0;

  let totalQuantity = 0;


  cart.forEach(item => {

    total +=
      item.price *
      item.quantity;


    totalQuantity +=
      item.quantity;


    const image =
      item.image
        ? item.image
        : "";


    const imageHTML =
      image
        ? `
          <img
            src="${image}"
            class="cart-item-image"
            alt="${item.name}"
          >
        `
        : `
          <div class="cart-item-image product-placeholder">

            ${item.icon || "📦"}

          </div>
        `;


    const cartItem =
      document.createElement("div");


    cartItem.className =
      "cart-item";


    cartItem.innerHTML = `

      ${imageHTML}


      <div class="cart-item-info">


        <h4>

          ${item.name}

        </h4>


        <strong>

          ${formatPrice(item.price)} ج.م

        </strong>


        <div class="cart-controls">


          <button
            class="qty-btn"
            data-increase="${item.id}"
          >
            +
          </button>


          <span>

            ${item.quantity}

          </span>


          <button
            class="qty-btn"
            data-decrease="${item.id}"
          >
            −
          </button>


          <button
            class="remove-cart-item"
            data-remove="${item.id}"
          >

            حذف

          </button>


        </div>


      </div>

    `;


    cartItems.appendChild(cartItem);

  });


  cartCount.textContent =
    totalQuantity;


  cartTotal.textContent =
    formatPrice(total);


  cartEvents();

}


/* =========================================
   CART EVENTS
   ========================================= */

function cartEvents() {


  document
    .querySelectorAll("[data-increase]")
    .forEach(button => {

      button.onclick = () => {

        changeQuantity(

          Number(
            button.dataset.increase
          ),

          1

        );

      };

    });



  document
    .querySelectorAll("[data-decrease]")
    .forEach(button => {

      button.onclick = () => {

        changeQuantity(

          Number(
            button.dataset.decrease
          ),

          -1

        );

      };

    });



  document
    .querySelectorAll("[data-remove]")
    .forEach(button => {

      button.onclick = () => {

        removeFromCart(

          Number(
            button.dataset.remove
          )

        );

      };

    });

}


function changeQuantity(id, amount) {

  const item =
    cart.find(
      product =>
        product.id === id
    );


  if (!item) {

    return;

  }


  item.quantity += amount;


  if (item.quantity <= 0) {

    cart =
      cart.filter(
        product =>
          product.id !== id
      );

  }


  saveCart();

  renderCart();

}


function removeFromCart(id) {

  cart =
    cart.filter(
      item =>
        item.id !== id
    );


  saveCart();

  renderCart();

}


/* =========================================
   CART OPEN / CLOSE
   ========================================= */

document
  .getElementById("cartBtn")
  .addEventListener(
    "click",
    () => {

      cartPanel.classList.add("open");

      overlay.classList.add("show");

    }
  );


document
  .getElementById("closeCartBtn")
  .addEventListener(
    "click",
    closeCart
  );


overlay.addEventListener(
  "click",
  closeCart
);


function closeCart() {

  cartPanel.classList.remove("open");

  overlay.classList.remove("show");

}


/* =========================================
   CLEAR CART
   ========================================= */

document
  .getElementById("clearCartBtn")
  .addEventListener(
    "click",
    () => {

      cart = [];

      saveCart();

      renderCart();

      showToast(
        "تم تفريغ السلة"
      );

    }
  );


/* =========================================
   CATEGORIES
   ========================================= */

document
  .querySelectorAll(".category-card")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(".category-card")
          .forEach(item => {

            item.classList.remove("active");

          });


        button.classList.add("active");


        selectedCategory =
          button.dataset.category;


        renderProducts();


        document
          .getElementById("products")
          .scrollIntoView({

            behavior: "smooth"

          });

      }
    );

  });


/* =========================================
   SHOW ALL
   ========================================= */

document
  .getElementById("showAllBtn")
  .addEventListener(
    "click",
    () => {

      selectedCategory = "الكل";


      document
        .querySelectorAll(".category-card")
        .forEach(item => {

          item.classList.remove("active");

        });


      document
        .querySelector(
          '[data-category="الكل"]'
        )
        .classList.add("active");


      renderProducts();

    }
  );


/* =========================================
   SEARCH
   ========================================= */

const searchModal =
  document.getElementById(
    "searchModal"
  );


const searchInput =
  document.getElementById(
    "searchInput"
  );


const searchResults =
  document.getElementById(
    "searchResults"
  );


document
  .getElementById("searchBtn")
  .addEventListener(
    "click",
    () => {

      searchModal.classList.add("show");

      searchInput.focus();

    }
  );


document
  .getElementById("closeSearchBtn")
  .addEventListener(
    "click",
    () => {

      searchModal.classList.remove("show");

    }
  );


searchInput.addEventListener(
  "input",
  () => {

    const value =
      searchInput.value
        .trim()
        .toLowerCase();


    searchResults.innerHTML = "";


    if (!value) {

      return;

    }


    const results =
      products.filter(product =>

        product.name
          .toLowerCase()
          .includes(value)

        ||

        product.description
          .toLowerCase()
          .includes(value)

      );


    if (results.length === 0) {

      searchResults.innerHTML = `

        <div class="search-result">

          لا توجد نتائج.

        </div>

      `;

      return;

    }


    results.forEach(product => {

      const result =
        document.createElement("div");


      result.className =
        "search-result";


      result.innerHTML = `

        <strong>

          ${product.name}

        </strong>

        —

        ${formatPrice(product.price)} ج.م

      `;


      result.onclick = () => {

        selectedCategory =
          product.category;


        renderProducts();


        searchModal.classList.remove("show");


        document
          .getElementById("products")
          .scrollIntoView({

            behavior:"smooth"

          });

      };


      searchResults.appendChild(result);

    });

  }
);


/* =========================================
   NEWSLETTER
   ========================================= */

document
  .getElementById("newsletterForm")
  .addEventListener(
    "submit",
    event => {

      event.preventDefault();

      event.target.reset();

      showToast(
        "تم الاشتراك بنجاح ⚡"
      );

    }
  );


/* =========================================
   MOBILE MENU
   ========================================= */

document
  .getElementById("mobileMenuBtn")
  .addEventListener(
    "click",
    () => {

      document
        .getElementById("navLinks")
        .classList.toggle("show");

    }
  );


/* =========================================
   ADMIN LOGIN
   ========================================= */

const adminLoginModal =
  document.getElementById(
    "adminLoginModal"
  );


const adminPanel =
  document.getElementById(
    "adminPanel"
  );


document
  .getElementById("adminOpenBtn")
  .addEventListener(
    "click",
    openAdmin
  );


function openAdmin() {

  const loggedIn =
    localStorage.getItem(
      ADMIN_SESSION
    );


  if (loggedIn === "true") {

    openAdminPanel();

  } else {

    adminLoginModal
      .classList
      .add("show");

  }

}


document
  .getElementById("closeAdminLogin")
  .addEventListener(
    "click",
    () => {

      adminLoginModal
        .classList
        .remove("show");

    }
  );


document
  .getElementById("adminLoginForm")
  .addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const username =
        document
          .getElementById("adminUsername")
          .value
          .trim();


      const password =
        document
          .getElementById("adminPassword")
          .value;


      const loginError =
        document
          .getElementById("loginError");


      if (

        username === ADMIN_USERNAME

        &&

        password === ADMIN_PASSWORD

      ) {

        localStorage.setItem(
          ADMIN_SESSION,
          "true"
        );


        loginError.textContent = "";


        adminLoginModal
          .classList
          .remove("show");


        openAdminPanel();


        event.target.reset();


      } else {

        loginError.textContent =
          "بيانات الدخول غير صحيحة.";

      }

    }
  );


function openAdminPanel() {

  adminPanel
    .classList
    .add("show");


  renderAdminProducts();

}


document
  .getElementById("closeAdminPanel")
  .addEventListener(
    "click",
    () => {

      adminPanel
        .classList
        .remove("show");

    }
  );


document
  .getElementById("logoutAdminBtn")
  .addEventListener(
    "click",
    () => {

      localStorage.removeItem(
        ADMIN_SESSION
      );


      adminPanel
        .classList
        .remove("show");


      showToast(
        "تم تسجيل الخروج"
      );

    }
  );


/* =========================================
   IMAGE UPLOAD
   ========================================= */

document
  .getElementById("productImage")
  .addEventListener(
    "change",
    event => {

      const file =
        event.target.files[0];


      if (!file) {

        return;

      }


      const reader =
        new FileReader();


      reader.onload =
        function(e) {

          uploadedImage =
            e.target.result;


          document
            .getElementById("imagePreview")
            .innerHTML = `

              <img
                src="${uploadedImage}"
                alt="معاينة"
              >

            `;

        };


      reader.readAsDataURL(file);

    }
  );


/* =========================================
   ADD PRODUCT
   ========================================= */

document
  .getElementById("addProductForm")
  .addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const name =
        document
          .getElementById("productName")
          .value
          .trim();


      const description =
        document
          .getElementById("productDescription")
          .value
          .trim();


      const price =
        Number(
          document
            .getElementById("productPrice")
            .value
        );


      const category =
        document
          .getElementById("productCategory")
          .value;


      if (

        !name

        ||

        !description

        ||

        !price

        ||

        !category

      ) {

        showToast(
          "أكمل جميع بيانات المنتج."
        );

        return;

      }


      const newProduct = {

        id: Date.now(),

        name,

        description,

        price,

        category,

        image: uploadedImage,

        icon: "📦"

      };


      products.unshift(
        newProduct
      );


      saveProducts();


      renderProducts();

      renderAdminProducts();


      event.target.reset();


      uploadedImage = "";


      document
        .getElementById("imagePreview")
        .textContent =
        "معاينة الصورة";


      showToast(
        "تمت إضافة المنتج بنجاح ✦"
      );

    }
  );


/* =========================================
   ADMIN PRODUCTS
   ========================================= */

function renderAdminProducts() {

  const list =
    document.getElementById(
      "adminProductsList"
    );


  list.innerHTML = "";


  products.forEach(product => {

    const item =
      document.createElement("div");


    item.className =
      "admin-product-item";


    const image =
      product.image
        ? product.image
        : "";


    item.innerHTML = `

      ${
        image

          ?

          `
          <img
            src="${image}"
            alt="${product.name}"
          >
          `

          :

          `
          <div class="cart-item-image product-placeholder">

            ${product.icon || "📦"}

          </div>
          `

      }


      <div class="admin-product-info">

        <h4>

          ${product.name}

        </h4>


        <span>

          ${formatPrice(product.price)} ج.م

        </span>


      </div>


      <button
        class="delete-product-btn"
        data-delete-product="${product.id}"
      >

        حذف

      </button>

    `;


    list.appendChild(item);

  });


  document
    .querySelectorAll(
      "[data-delete-product]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const id =
            Number(
              button.dataset.deleteProduct
            );


          deleteProduct(id);

        }
      );

    });

}


function deleteProduct(id) {

  const confirmed =
    confirm(
      "هل تريد حذف هذا المنتج؟"
    );


  if (!confirmed) {

    return;

  }


  products =
    products.filter(
      product =>
        product.id !== id
    );


  cart =
    cart.filter(
      product =>
        product.id !== id
    );


  saveProducts();

  saveCart();


  renderProducts();

  renderCart();

  renderAdminProducts();


  showToast(
    "تم حذف المنتج."
  );

}


/* =========================================
   WHATSAPP CHECKOUT
   ========================================= */

document
  .getElementById("checkoutBtn")
  .addEventListener(
    "click",
    checkout
  );


function checkout() {


  if (cart.length === 0) {

    showToast(
      "السلة فارغة حاليًا."
    );

    return;

  }


  const name =
    document
      .getElementById("customerName")
      .value
      .trim();


  const phone =
    document
      .getElementById("customerPhone")
      .value
      .trim();


  const extraPhone =
    document
      .getElementById("customerExtraPhone")
      .value
      .trim();


  const city =
    document
      .getElementById("customerCity")
      .value
      .trim();


  const address =
    document
      .getElementById("customerAddress")
      .value
      .trim();


  const notes =
    document
      .getElementById("customerNotes")
      .value
      .trim();


  if (

    !name

    ||

    !phone

    ||

    !city

    ||

    !address

  ) {

    showToast(
      "من فضلك أكمل بيانات العميل."
    );

    return;

  }


  let total = 0;


  let message = `🥷 *طلب جديد من متجر ننجاوي*

━━━━━━━━━━━━━━

👤 *بيانات العميل*

الاسم: ${name}

رقم الهاتف: ${phone}

رقم إضافي: ${extraPhone || "لا يوجد"}

المدينة: ${city}

العنوان: ${address}

الملاحظات: ${notes || "لا توجد"}

━━━━━━━━━━━━━━

🛍 *المنتجات*

`;


  cart.forEach(
    (item, index) => {

      const itemTotal =
        item.price *
        item.quantity;


      total += itemTotal;


      message += `

${index + 1}. ${item.name}

الكمية: ${item.quantity}

السعر: ${formatPrice(item.price)} ج.م

إجمالي المنتج: ${formatPrice(itemTotal)} ج.م

`;

    }
  );


  message += `

━━━━━━━━━━━━━━

💰 *الإجمالي النهائي*

${formatPrice(total)} ج.م

━━━━━━━━━━━━━━

شكراً لاختيارك ننجاوي ✦
`;


  const url =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


  window.open(
    url,
    "_blank"
  );

}


/* =========================================
   INITIALIZATION
   ========================================= */

renderProducts();

renderCart();
