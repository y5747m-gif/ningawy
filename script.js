/* =========================================
   NINJAWY V2 - MAIN SCRIPT
   Developed for NINJAWY
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     SETTINGS
  ========================================= */

  const WHATSAPP_NUMBER = "201141362626";

  /*
    بيانات دخول الإدارة المؤقتة

    يمكنك تغييرها لاحقًا من هنا
  */

  const ADMIN_USERNAME = "yaseen";
  const ADMIN_PASSWORD = "ninjawy2026";


  /* =========================================
     ELEMENTS
  ========================================= */

  const productsGrid = document.querySelector(".products-grid");

  const cartBtn = document.getElementById("cartBtn");
  const cartPanel = document.getElementById("cartPanel");
  const closeCart = document.getElementById("closeCart");

  const overlay = document.getElementById("overlay");

  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");

  const clearCart = document.getElementById("clearCart");
  const checkoutBtn = document.getElementById("checkoutBtn");

  const searchBtn = document.getElementById("searchBtn");
  const searchBox = document.getElementById("searchBox");
  const searchInput = document.getElementById("searchInput");
  const closeSearch = document.getElementById("closeSearch");

  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  const toast = document.getElementById("toast");

  const categories = document.querySelectorAll(".category");

  const showAll = document.getElementById("showAll");

  const newsletterForm = document.getElementById("newsletterForm");

  const offerBtn = document.getElementById("offerBtn");


  /* =========================================
     STORAGE
  ========================================= */

  const PRODUCTS_KEY = "ninjawy_products_v2";
  const CART_KEY = "ninjawy_cart_v2";


  function getSavedProducts() {

    try {

      return JSON.parse(
        localStorage.getItem(PRODUCTS_KEY)
      ) || [];

    } catch (error) {

      return [];

    }

  }


  function saveProducts(products) {

    localStorage.setItem(
      PRODUCTS_KEY,
      JSON.stringify(products)
    );

  }


  function getCart() {

    try {

      return JSON.parse(
        localStorage.getItem(CART_KEY)
      ) || [];

    } catch (error) {

      return [];

    }

  }


  function saveCart(cart) {

    localStorage.setItem(
      CART_KEY,
      JSON.stringify(cart)
    );

  }


  let cart = getCart();


  /* =========================================
     TOAST
  ========================================= */

  let toastTimer;


  function showToast(message) {

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

      toast.classList.remove("show");

    }, 2800);

  }


  /* =========================================
     FORMAT PRICE
  ========================================= */

  function formatPrice(price) {

    return Number(price).toLocaleString("ar-EG");

  }


  /* =========================================
     ESCAPE HTML
  ========================================= */

  function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text || "";

    return div.innerHTML;

  }


  /* =========================================
     GET PRODUCT FROM CARD
  ========================================= */

  function getProductFromCard(card) {

    return {

      id:
        card.dataset.id ||
        `default-${card.dataset.name}`,

      name:
        card.dataset.name ||
        card.querySelector("h3")?.textContent.trim() ||
        "منتج",

      price:
        Number(
          card.dataset.price ||
          0
        ),

      category:
        card.dataset.category ||
        "الكل",

      image:
        card.dataset.image ||
        "",

      description:
        card.dataset.description ||
        "",

      rating:
        card.dataset.rating ||
        "4.9"

    };

  }


  /* =========================================
     ADD TO CART
  ========================================= */

  function addToCart(product) {

    const existingProduct =
      cart.find(
        item => item.id === product.id
      );


    if (existingProduct) {

      existingProduct.quantity += 1;

    } else {

      cart.push({

        ...product,

        quantity: 1

      });

    }


    saveCart(cart);

    renderCart();

    showToast(
      `تمت إضافة ${product.name} إلى الحقيبة ⚔`
    );

  }


  /* =========================================
     REMOVE FROM CART
  ========================================= */

  function removeFromCart(id) {

    cart =
      cart.filter(
        item => item.id !== id
      );


    saveCart(cart);

    renderCart();

  }


  /* =========================================
     CHANGE QUANTITY
  ========================================= */

  function changeQuantity(id, amount) {

    const product =
      cart.find(
        item => item.id === id
      );


    if (!product) return;


    product.quantity += amount;


    if (product.quantity <= 0) {

      removeFromCart(id);

      return;

    }


    saveCart(cart);

    renderCart();

  }


  /* =========================================
     RENDER CART
  ========================================= */

  function renderCart() {

    if (!cartItems) return;


    const totalQuantity =
      cart.reduce(
        (total, item) =>
          total + item.quantity,
        0
      );


    const totalPrice =
      cart.reduce(
        (total, item) =>
          total +
          (
            Number(item.price) *
            item.quantity
          ),
        0
      );


    if (cartCount) {

      cartCount.textContent =
        totalQuantity;

    }


    if (cartTotal) {

      cartTotal.textContent =
        formatPrice(totalPrice);

    }


    if (cart.length === 0) {

      cartItems.innerHTML = `

        <p class="empty">

          حقيبتك فارغة حاليًا.

        </p>

      `;

      return;

    }


    cartItems.innerHTML =
      cart.map(item => `

        <div class="cart-item">

          <div class="cart-item-top">

            <div>

              <strong>
                ${escapeHTML(item.name)}
              </strong>

              <div class="cart-item-price">

                ${formatPrice(item.price)} ج.م

              </div>

            </div>


            <strong>

              ${formatPrice(
                item.price *
                item.quantity
              )}

              ج.م

            </strong>

          </div>


          <div class="quantity-control">

            <button
              class="quantity-btn"
              data-action="increase"
              data-id="${escapeHTML(item.id)}">

              +

            </button>


            <span>

              ${item.quantity}

            </span>


            <button
              class="quantity-btn"
              data-action="decrease"
              data-id="${escapeHTML(item.id)}">

              −

            </button>

          </div>


          <button
            class="remove-item"
            data-remove="${escapeHTML(item.id)}">

            إزالة المنتج

          </button>

        </div>

      `).join("");


    cartItems
      .querySelectorAll(".quantity-btn")
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            const id =
              button.dataset.id;

            const action =
              button.dataset.action;


            changeQuantity(

              id,

              action === "increase"
                ? 1
                : -1

            );

          }

        );

      });


    cartItems
      .querySelectorAll(".remove-item")
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            removeFromCart(
              button.dataset.remove
            );

          }

        );

      });

  }


  /* =========================================
     DEFAULT PRODUCT BUTTONS
  ========================================= */

  function bindProductButtons() {

    document
      .querySelectorAll(".add-btn")
      .forEach(button => {

        if (
          button.dataset.bound === "true"
        ) return;


        button.dataset.bound = "true";


        button.addEventListener(
          "click",
          () => {

            const card =
              button.closest(".product-card");


            if (!card) return;


            const product =
              getProductFromCard(card);


            addToCart(product);

          }

        );

      });


    document
      .querySelectorAll(".favorite-btn")
      .forEach(button => {

        if (
          button.dataset.bound === "true"
        ) return;


        button.dataset.bound = "true";


        button.addEventListener(
          "click",
          () => {

            button.classList.toggle(
              "active"
            );


            button.textContent =
              button.classList.contains("active")
                ? "♥"
                : "♡";

          }

        );

      });

  }


  /* =========================================
     CREATE PRODUCT CARD
  ========================================= */

  function createProductCard(product) {

    const article =
      document.createElement("article");


    article.className =
      "product-card reveal visible";


    article.dataset.id =
      product.id;

    article.dataset.name =
      product.name;

    article.dataset.price =
      product.price;

    article.dataset.category =
      product.category;

    article.dataset.description =
      product.description || "";

    article.dataset.rating =
      product.rating || "4.9";

    article.dataset.image =
      product.image || "";


    const imageContent =
      product.image

        ? `

          <img
            src="${product.image}"
            alt="${escapeHTML(product.name)}"
            class="custom-product-image">

        `

        : `

          <span class="product-icon">

            📦

          </span>

        `;


    article.innerHTML = `

      <div class="product-visual custom-product-visual">

        <button
          class="favorite-btn">

          ♡

        </button>


        ${imageContent}

      </div>


      <div class="product-info">

        <span class="product-category">

          ${escapeHTML(product.category)}

        </span>


        <h3>

          ${escapeHTML(product.name)}

        </h3>


        <p class="dynamic-description">

          ${escapeHTML(
            product.description ||
            "منتج مميز متوفر الآن في ننجاوي."
          )}

        </p>


        <div class="rating">

          ★★★★★

          <span>

            (${escapeHTML(
              product.rating || "4.9"
            )})

          </span>

        </div>


        <div class="price">

          ${formatPrice(product.price)}
          ج.م

          ${
            product.oldPrice

              ? `<del>
                  ${formatPrice(
                    product.oldPrice
                  )}
                </del>`

              : ""

          }

        </div>


        <button
          class="add-btn">

          أضف للسلة ⚔

        </button>

      </div>

    `;


    return article;

  }


  /* =========================================
     RENDER SAVED PRODUCTS
  ========================================= */

  function renderSavedProducts() {

    if (!productsGrid) return;


    productsGrid
      .querySelectorAll(
        ".dynamic-product"
      )
      .forEach(
        item => item.remove()
      );


    const products =
      getSavedProducts();


    products.forEach(product => {

      const card =
        createProductCard(product);


      card.classList.add(
        "dynamic-product"
      );


      productsGrid.appendChild(card);

    });


    bindProductButtons();

  }


  /* =========================================
     CART OPEN / CLOSE
  ========================================= */

  function openCart() {

    cartPanel?.classList.add("open");

    overlay?.classList.add("show");

  }


  function closeCartPanel() {

    cartPanel?.classList.remove("open");

    overlay?.classList.remove("show");

  }


  cartBtn?.addEventListener(
    "click",
    openCart
  );


  closeCart?.addEventListener(
    "click",
    closeCartPanel
  );


  overlay?.addEventListener(
    "click",
    () => {

      closeCartPanel();

      closeSearchBox();

    }
  );


  /* =========================================
     CLEAR CART
  ========================================= */

  clearCart?.addEventListener(
    "click",
    () => {

      if (cart.length === 0) {

        showToast(
          "الحقيبة فارغة بالفعل."
        );

        return;

      }


      cart = [];

      saveCart(cart);

      renderCart();

      showToast(
        "تم تفريغ الحقيبة."
      );

    }
  );


  /* =========================================
     SEARCH
  ========================================= */

  function openSearchBox() {

    searchBox?.classList.add("show");

    overlay?.classList.add("show");

    setTimeout(() => {

      searchInput?.focus();

    }, 200);

  }


  function closeSearchBox() {

    searchBox?.classList.remove("show");

    overlay?.classList.remove("show");

  }


  searchBtn?.addEventListener(
    "click",
    openSearchBox
  );


  closeSearch?.addEventListener(
    "click",
    closeSearchBox
  );


  searchInput?.addEventListener(
    "input",
    () => {

      const value =
        searchInput.value
          .trim()
          .toLowerCase();


      document
        .querySelectorAll(".product-card")
        .forEach(card => {

          const name =
            card.dataset.name
              ?.toLowerCase() || "";

          const category =
            card.dataset.category
              ?.toLowerCase() || "";


          const text =
            `${name} ${category}`;


          card.style.display =
            text.includes(value)
              ? ""
              : "none";

        });

    }
  );


  /* =========================================
     MOBILE MENU
  ========================================= */

  menuBtn?.addEventListener(
    "click",
    () => {

      navLinks?.classList.toggle(
        "open"
      );

    }
  );


  /* =========================================
     CATEGORIES
  ========================================= */

  categories.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const category =
          button.dataset.category;


        categories.forEach(item => {

          item.classList.remove(
            "active"
          );

        });


        button.classList.add(
          "active"
        );


        document
          .querySelectorAll(
            ".product-card"
          )
          .forEach(card => {

            const productCategory =
              card.dataset.category;


            card.style.display =
              category === "الكل" ||
              category === productCategory

                ? ""

                : "none";

          });


        document
          .getElementById("products")
          ?.scrollIntoView({

            behavior: "smooth"

          });

      }

    );

  });


  /* =========================================
     SHOW ALL
  ========================================= */

  showAll?.addEventListener(
    "click",
    () => {

      document
        .querySelectorAll(
          ".product-card"
        )
        .forEach(card => {

          card.style.display = "";

        });


      categories.forEach(
        item => {

          item.classList.remove(
            "active"
          );

        }
      );


      const allButton =
        document.querySelector(
          '[data-category="الكل"]'
        );


      allButton?.classList.add(
        "active"
      );


      document
        .getElementById("products")
        ?.scrollIntoView({

          behavior: "smooth"

        });

    }
  );


  /* =========================================
     NEWSLETTER
  ========================================= */

  newsletterForm?.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const input =
        newsletterForm.querySelector(
          'input[type="email"]'
        );


      if (!input?.value) return;


      showToast(
        "تم تسجيل بريدك الإلكتروني بنجاح ⚡"
      );


      newsletterForm.reset();

    }
  );


  /* =========================================
     OFFER BUTTON
  ========================================= */

  offerBtn?.addEventListener(
    "click",
    () => {

      document
        .getElementById("products")
        ?.scrollIntoView({

          behavior: "smooth"

        });

    }
  );


  /* =========================================
     CUSTOMER FORM
  ========================================= */

  function injectCustomerForm() {

    if (!cartPanel) return;


    if (
      document.getElementById(
        "customerOrderForm"
      )
    ) return;


    const form =
      document.createElement("div");


    form.className =
      "customer-order-form";


    form.id =
      "customerOrderForm";


    form.innerHTML = `

      <h4>

        بيانات استلام الطلب

      </h4>


      <input
        id="customerName"
        type="text"
        placeholder="الاسم بالكامل *"
        required>


      <input
        id="customerPhone"
        type="tel"
        placeholder="رقم الهاتف الأساسي *"
        required>


      <input
        id="customerPhone2"
        type="tel"
        placeholder="رقم هاتف إضافي (اختياري)">


      <input
        id="customerCity"
        type="text"
        placeholder="المحافظة / المدينة *"
        required>


      <textarea
        id="customerAddress"
        placeholder="العنوان بالتفصيل *"
        required></textarea>


      <textarea
        id="customerNotes"
        placeholder="ملاحظات إضافية (اختياري)"></textarea>

    `;


    const footer =
      cartPanel.querySelector(
        ".cart-footer"
      );


    if (footer) {

      footer.before(form);

    }

  }


  /* =========================================
     CHECKOUT WHATSAPP
  ========================================= */

  checkoutBtn?.addEventListener(
    "click",
    () => {

      if (cart.length === 0) {

        showToast(
          "أضف منتجًا واحدًا على الأقل قبل إتمام الطلب."
        );

        return;

      }


      const customerName =
        document
          .getElementById("customerName")
          ?.value
          .trim();


      const customerPhone =
        document
          .getElementById("customerPhone")
          ?.value
          .trim();


      const customerPhone2 =
        document
          .getElementById("customerPhone2")
          ?.value
          .trim();


      const customerCity =
        document
          .getElementById("customerCity")
          ?.value
          .trim();


      const customerAddress =
        document
          .getElementById("customerAddress")
          ?.value
          .trim();


      const customerNotes =
        document
          .getElementById("customerNotes")
          ?.value
          .trim();


      if (
        !customerName ||
        !customerPhone ||
        !customerCity ||
        !customerAddress
      ) {

        showToast(
          "من فضلك أكمل البيانات المطلوبة."
        );

        return;

      }


      const total =
        cart.reduce(
          (sum, item) =>

            sum +
            (
              Number(item.price) *
              item.quantity
            ),

          0
        );


      let message = `

🛍 *طلب جديد من متجر ننجاوي*

━━━━━━━━━━━━━━

👤 *اسم العميل:*
${customerName}

📱 *رقم الهاتف:*
${customerPhone}

${customerPhone2
  ? `📞 *رقم إضافي:*\n${customerPhone2}`
  : ""
}

📍 *المحافظة / المدينة:*
${customerCity}

🏠 *العنوان:*
${customerAddress}

${customerNotes
  ? `📝 *ملاحظات:*\n${customerNotes}`
  : ""
}

━━━━━━━━━━━━━━

📦 *المنتجات المطلوبة:*

`;


      cart.forEach(
        (item, index) => {

          message += `

${index + 1}. ${item.name}

الكمية: ${item.quantity}

السعر: ${formatPrice(
  item.price
)} ج.م

الإجمالي: ${formatPrice(
  item.price *
  item.quantity
)} ج.م

`;

        }
      );


      message += `

━━━━━━━━━━━━━━

💰 *إجمالي الطلب:*

${formatPrice(total)} ج.م

━━━━━━━━━━━━━━

تم إرسال الطلب من متجر NINJAWY ⚔

`;


      const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          message
        )}`;


      window.open(
        whatsappURL,
        "_blank"
      );

    }
  );


  /* =========================================
     ADMIN BUTTON
  ========================================= */

  function createAdminButton() {

    const button =
      document.createElement("button");


    button.id =
      "adminAccessBtn";


    button.innerHTML =
      "⚙ إدارة المتجر";


    button.style.position =
      "fixed";

    button.style.left =
      "20px";

    button.style.bottom =
      "20px";

    button.style.zIndex =
      "200";

    button.style.padding =
      "12px 18px";

    button.style.border =
      "1px solid rgba(255,255,255,.15)";

    button.style.borderRadius =
      "12px";

    button.style.background =
      "#173a24";

    button.style.color =
      "#ffffff";

    button.style.cursor =
      "pointer";

    button.style.fontFamily =
      "inherit";

    button.style.boxShadow =
      "0 10px 30px rgba(0,0,0,.3)";


    button.addEventListener(
      "click",
      openAdminLogin
    );


    document.body.appendChild(
      button
    );

  }


  /* =========================================
     ADMIN LOGIN
  ========================================= */

  function openAdminLogin() {

    const username =
      prompt(
        "اسم المستخدم:"
      );


    if (username === null) return;


    const password =
      prompt(
        "كلمة المرور:"
      );


    if (
      username === ADMIN_USERNAME &&
      password === ADMIN_PASSWORD
    ) {

      openAdminPanel();

    } else {

      showToast(
        "بيانات الدخول غير صحيحة."
      );

    }

  }


  /* =========================================
     ADMIN PANEL
  ========================================= */

  function openAdminPanel() {

    let panel =
      document.getElementById(
        "adminPanel"
      );


    if (panel) {

      panel.remove();

    }


    panel =
      document.createElement("div");


    panel.id =
      "adminPanel";


    panel.className =
      "admin-panel";


    panel.innerHTML = `

      <div class="admin-container">

        <div class="admin-header">

          <div>

            <span>
              لوحة تحكم ننجاوي
            </span>

            <h2>
              إدارة المنتجات
            </h2>

          </div>


          <button
            id="closeAdminPanel">

            ×

          </button>

        </div>


        <div class="admin-content">

          <section class="admin-add-product">

            <h3>

              إضافة منتج جديد

            </h3>


            <input
              id="adminProductName"
              type="text"
              placeholder="اسم المنتج">


            <input
              id="adminProductPrice"
              type="number"
              placeholder="السعر الحالي">


            <input
              id="adminProductOldPrice"
              type="number"
              placeholder="السعر القديم (اختياري)">


            <select
              id="adminProductCategory">

              <option value="إلكترونيات">
                إلكترونيات
              </option>

              <option value="أزياء">
                أزياء
              </option>

              <option value="منزل">
                منزل
              </option>

              <option value="ألعاب">
                ألعاب
              </option>

              <option value="إكسسوارات">
                إكسسوارات
              </option>

              <option value="أخرى">
                أخرى
              </option>

            </select>


            <input
              id="adminProductRating"
              type="number"
              min="1"
              max="5"
              step="0.1"
              value="4.9"
              placeholder="التقييم">


            <textarea
              id="adminProductDescription"
              placeholder="وصف المنتج"></textarea>


            <label
              class="image-upload-label">

              اختر صورة المنتج

              <input
                id="adminProductImage"
                type="file"
                accept="image/*">

            </label>


            <div
              id="imagePreview"
              class="image-preview">

              لا توجد صورة مختارة

            </div>


            <button
              id="saveProductBtn"
              class="admin-save-btn">

              إضافة المنتج إلى المتجر

            </button>

          </section>


          <section
            class="admin-products-list">

            <h3>

              المنتجات التي أضفتها

            </h3>


            <div
              id="adminProductsList">

            </div>

          </section>

        </div>

      </div>

    `;


    document.body.appendChild(
      panel
    );


    let selectedImage = "";


    const imageInput =
      document.getElementById(
        "adminProductImage"
      );


    const preview =
      document.getElementById(
        "imagePreview"
      );


    imageInput.addEventListener(
      "change",
      event => {

        const file =
          event.target.files[0];


        if (!file) return;


        if (
          file.size >
          2 * 1024 * 1024
        ) {

          showToast(
            "يرجى اختيار صورة أقل من 2MB."
          );

          imageInput.value = "";

          return;

        }


        const reader =
          new FileReader();


        reader.onload =
          event => {

            selectedImage =
              event.target.result;


            preview.innerHTML = `

              <img
                src="${selectedImage}"
                alt="معاينة المنتج">

            `;

          };


        reader.readAsDataURL(
          file
        );

      }
    );


    document
      .getElementById(
        "closeAdminPanel"
      )
      .addEventListener(
        "click",
        () => panel.remove()
      );


    document
      .getElementById(
        "saveProductBtn"
      )
      .addEventListener(
        "click",
        () => {

          const name =
            document
              .getElementById(
                "adminProductName"
              )
              .value
              .trim();


          const price =
            document
              .getElementById(
                "adminProductPrice"
              )
              .value;


          const oldPrice =
            document
              .getElementById(
                "adminProductOldPrice"
              )
              .value;


          const category =
            document
              .getElementById(
                "adminProductCategory"
              )
              .value;


          const rating =
            document
              .getElementById(
                "adminProductRating"
              )
              .value;


          const description =
            document
              .getElementById(
                "adminProductDescription"
              )
              .value
              .trim();


          if (
            !name ||
            !price
          ) {

            showToast(
              "اكتب اسم المنتج والسعر."
            );

            return;

          }


          const products =
            getSavedProducts();


          const product = {

            id:
              `product-${Date.now()}`,

            name,

            price:
              Number(price),

            oldPrice:
              oldPrice
                ? Number(oldPrice)
                : "",

            category,

            rating:
              rating || "4.9",

            description,

            image:
              selectedImage

          };


          products.push(
            product
          );


          try {

            saveProducts(
              products
            );

          } catch (error) {

            showToast(
              "تعذر حفظ المنتج. قد تكون الصورة كبيرة جدًا."
            );

            return;

          }


          renderSavedProducts();

          renderAdminProducts();

          showToast(
            "تم إضافة المنتج وظهر في المتجر بنجاح ⚔"
          );


          document
            .getElementById(
              "adminProductName"
            )
            .value = "";


          document
            .getElementById(
              "adminProductPrice"
            )
            .value = "";


          document
            .getElementById(
              "adminProductOldPrice"
            )
            .value = "";


          document
            .getElementById(
              "adminProductDescription"
            )
            .value = "";


          selectedImage = "";


          imageInput.value = "";


          preview.textContent =
            "لا توجد صورة مختارة";

        }
      );


    renderAdminProducts();

  }


  /* =========================================
     ADMIN PRODUCTS LIST
  ========================================= */

  function renderAdminProducts() {

    const list =
      document.getElementById(
        "adminProductsList"
      );


    if (!list) return;


    const products =
      getSavedProducts();


    if (products.length === 0) {

      list.innerHTML = `

        <p class="admin-empty">

          لم تقم بإضافة منتجات جديدة بعد.

        </p>

      `;

      return;

    }


    list.innerHTML =
      products.map(product => `

        <div
          class="admin-product-item">

          <div
            class="admin-product-info">

            ${
              product.image

                ? `

                  <img
                    src="${product.image}"
                    alt="${escapeHTML(product.name)}">

                `

                : "📦"

            }


            <div>

              <strong>

                ${escapeHTML(product.name)}

              </strong>


              <span>

                ${formatPrice(product.price)}
                ج.م

              </span>


              <small>

                ${escapeHTML(
                  product.category
                )}

              </small>

            </div>

          </div>


          <button
            class="delete-admin-product"
            data-id="${product.id}">

            حذف

          </button>

        </div>

      `).join("");


    document
      .querySelectorAll(
        ".delete-admin-product"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            const id =
              button.dataset.id;


            const confirmDelete =
              confirm(
                "هل تريد حذف هذا المنتج؟"
              );


            if (!confirmDelete) return;


            const products =
              getSavedProducts()
                .filter(
                  product =>
                    product.id !== id
                );


            saveProducts(
              products
            );


            renderSavedProducts();

            renderAdminProducts();

            showToast(
              "تم حذف المنتج."
            );

          }
        );

      });

  }


  /* =========================================
     REVEAL ANIMATION
  ========================================= */

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

          }

        });

      },

      {

        threshold: 0.1

      }

    );


  document
    .querySelectorAll(".reveal")
    .forEach(element => {

      observer.observe(
        element
      );

    });


  /* =========================================
     INITIALIZATION
  ========================================= */

  injectCustomerForm();

  bindProductButtons();

  renderSavedProducts();

  renderCart();

  createAdminButton();

});
