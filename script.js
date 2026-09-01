/* ===============================
   NINJAWY V3 - MAIN JAVASCRIPT
================================= */


/* ===============================
   PRODUCTS DATABASE
================================= */

const products = [
    {
        name: "سماعات لاسلكية احترافية",
        price: 1299,
        category: "إلكترونيات"
    },
    {
        name: "حقيبة عصرية مميزة",
        price: 899,
        category: "أزياء"
    },
    {
        name: "مصباح ذكي متعدد الألوان",
        price: 749,
        category: "منزل"
    },
    {
        name: "وحدة تحكم لاسلكية",
        price: 1499,
        category: "ألعاب"
    },
    {
        name: "ساعة ذكية أنيقة",
        price: 2199,
        category: "إكسسوارات"
    },
    {
        name: "لوحة مفاتيح للألعاب",
        price: 1099,
        category: "إلكترونيات"
    }
];


/* ===============================
   SELECTORS
================================= */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) =>
    [...document.querySelectorAll(selector)];


/* ===============================
   CART
================================= */

let cart = JSON.parse(
    localStorage.getItem("ninjawyCart")
) || [];


/* ===============================
   FAVORITES
================================= */

let favorites = JSON.parse(
    localStorage.getItem("ninjawyFavorites")
) || [];


/* ===============================
   SAVE DATA
================================= */

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


/* ===============================
   TOAST NOTIFICATIONS
================================= */

function showToast(message) {

    const toast = $("#toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* ===============================
   CART COUNT
================================= */

function updateCartCount() {

    const count = $("#cartCount");

    if (!count) return;

    count.textContent = cart.length;

}


/* ===============================
   FORMAT PRICE
================================= */

function formatPrice(price) {

    return price.toLocaleString("ar-EG");

}


/* ===============================
   RENDER CART
================================= */

function renderCart() {

    const cartItems = $("#cartItems");

    const cartTotal = $("#cartTotal");

    if (!cartItems || !cartTotal) return;


    updateCartCount();


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty">
                حقيبتك فارغة حاليًا.
            </p>
        `;

        cartTotal.textContent = "0";

        return;

    }


    cartItems.innerHTML = cart
        .map((product, index) => {

            return `

                <div class="cart-item">

                    <div class="cart-item-info">

                        <strong>
                            ${product.name}
                        </strong>

                        <span>
                            ${formatPrice(product.price)} ج.م
                        </span>

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


    const total = cart.reduce(
        (sum, product) => sum + product.price,
        0
    );


    cartTotal.textContent = formatPrice(total);


    $$(".remove-item").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const index =
                    Number(button.dataset.index);

                cart.splice(index, 1);

                saveCart();

                renderCart();

                showToast("تم حذف المنتج من الحقيبة");

            }
        );

    });

}


/* ===============================
   ADD TO CART
================================= */

$$(".add-btn").forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const productName =
                button.dataset.product;


            let product =
                products.find(
                    item =>
                        item.name === productName
                );


            /*
              دعم المنتجات التي تعتمد
              على data-name و data-price
            */

            if (!product) {

                const card =
                    button.closest(
                        ".product-card"
                    );


                if (card) {

                    product = {

                        name:
                            card.dataset.name,

                        price:
                            Number(
                                card.dataset.price
                            ) || 0,

                        category:
                            card.dataset.category

                    };

                }

            }


            if (!product) {

                showToast(
                    "حدث خطأ في العثور على المنتج"
                );

                return;

            }


            cart.push(product);

            saveCart();

            renderCart();


            button.classList.add(
                "added"
            );


            setTimeout(() => {

                button.classList.remove(
                    "added"
                );

            }, 500);


            showToast(
                "تمت إضافة المنتج إلى حقيبة ننجاوي ⚔"
            );

        }
    );

});


/* ===============================
   OPEN CART
================================= */

const cartButton =
    $("#cartBtn");

const cartPanel =
    $("#cartPanel");

const overlay =
    $("#overlay");

const closeCart =
    $("#closeCart");


if (cartButton) {

    cartButton.addEventListener(
        "click",
        () => {

            cartPanel?.classList.add(
                "open"
            );

            overlay?.classList.add(
                "show"
            );

        }
    );

}


if (closeCart) {

    closeCart.addEventListener(
        "click",
        () => {

            cartPanel?.classList.remove(
                "open"
            );

            overlay?.classList.remove(
                "show"
            );

        }
    );

}


if (overlay) {

    overlay.addEventListener(
        "click",
        () => {

            cartPanel?.classList.remove(
                "open"
            );

            overlay.classList.remove(
                "show"
            );

        }
    );

}


/* ===============================
   CLEAR CART
================================= */

const clearCart =
    $("#clearCart");


if (clearCart) {

    clearCart.addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                showToast(
                    "الحقيبة فارغة بالفعل"
                );

                return;

            }


            cart = [];

            saveCart();

            renderCart();

            showToast(
                "تم تفريغ حقيبة ننجاوي"
            );

        }
    );

}


/* ===============================
   CHECKOUT
================================= */

const checkoutButton =
    $("#checkoutBtn");


if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                showToast(
                    "أضف منتجًا أولًا إلى الحقيبة"
                );

                return;

            }


            showToast(
                "تم حفظ الطلب تجريبيًا ⚡"
            );

        }
    );

}


/* ===============================
   SEARCH
================================= */

const searchButton =
    $("#searchBtn");

const searchBox =
    $("#searchBox");

const searchInput =
    $("#searchInput");

const closeSearch =
    $("#closeSearch");


if (searchButton) {

    searchButton.addEventListener(
        "click",
        () => {

            searchBox?.classList.add(
                "show"
            );

            setTimeout(() => {

                searchInput?.focus();

            }, 100);

        }
    );

}


if (closeSearch) {

    closeSearch.addEventListener(
        "click",
        () => {

            searchBox?.classList.remove(
                "show"
            );

            if (searchInput) {

                searchInput.value = "";

            }

            showAllProducts();

        }
    );

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        (event) => {

            const query =
                event.target.value
                    .trim()
                    .toLowerCase();


            $$(".product-card").forEach(
                card => {

                    const name =
                        (
                            card.dataset.name ||
                            ""
                        )
                        .toLowerCase();


                    if (
                        name.includes(query)
                    ) {

                        card.style.display =
                            "";

                    } else {

                        card.style.display =
                            "none";

                    }

                }
            );

        }
    );

}


/* ===============================
   ESC CLOSE
================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            cartPanel?.classList.remove(
                "open"
            );

            overlay?.classList.remove(
                "show"
            );

            searchBox?.classList.remove(
                "show"
            );

        }

    }
);


/* ===============================
   CATEGORY FILTER
================================= */

$$(".category").forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const category =
                    button.dataset.category;


                $$(".category").forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                $$(".product-card").forEach(
                    card => {

                        const productCategory =
                            card.dataset.category;


                        if (
                            category === "الكل" ||
                            productCategory === category
                        ) {

                            card.style.display =
                                "";

                        } else {

                            card.style.display =
                                "none";

                        }

                    }
                );

            }
        );

    }
);


/* ===============================
   SHOW ALL PRODUCTS
================================= */

function showAllProducts() {

    $$(".product-card").forEach(
        card => {

            card.style.display = "";

        }
    );


    $$(".category").forEach(
        category => {

            category.classList.remove(
                "active"
            );

        }
    );


    const allCategory =
        document.querySelector(
            '[data-category="الكل"]'
        );


    if (allCategory) {

        allCategory.classList.add(
            "active"
        );

    }

}


const showAllButton =
    $("#showAll");


if (showAllButton) {

    showAllButton.addEventListener(
        "click",
        () => {

            showAllProducts();


            const productsSection =
                $("#products");


            if (productsSection) {

                productsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

}


/* ===============================
   FAVORITES
================================= */

$$(".favorite-btn").forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const card =
                    button.closest(
                        ".product-card"
                    );


                if (!card) return;


                const productName =
                    card.dataset.name;


                const index =
                    favorites.indexOf(
                        productName
                    );


                if (index === -1) {

                    favorites.push(
                        productName
                    );


                    button.classList.add(
                        "active"
                    );


                    button.textContent =
                        "♥";


                    showToast(
                        "تمت إضافة المنتج إلى المفضلة ♥"
                    );

                } else {

                    favorites.splice(
                        index,
                        1
                    );


                    button.classList.remove(
                        "active"
                    );


                    button.textContent =
                        "♡";


                    showToast(
                        "تمت إزالة المنتج من المفضلة"
                    );

                }


                saveFavorites();

            }
        );

    }
);


/* ===============================
   LOAD FAVORITES
================================= */

function loadFavorites() {

    $$(".product-card").forEach(
        card => {

            const productName =
                card.dataset.name;


            if (
                favorites.includes(
                    productName
                )
            ) {

                const button =
                    card.querySelector(
                        ".favorite-btn"
                    );


                if (button) {

                    button.classList.add(
                        "active"
                    );

                    button.textContent =
                        "♥";

                }

            }

        }
    );

}


/* ===============================
   MOBILE MENU
================================= */

const menuButton =
    $("#menuBtn");

const navLinks =
    $("#navLinks");


if (menuButton) {

    menuButton.addEventListener(
        "click",
        () => {

            navLinks?.classList.toggle(
                "open"
            );

        }
    );

}


$$(".nav-links a").forEach(
    link => {

        link.addEventListener(
            "click",
            () => {

                navLinks?.classList.remove(
                    "open"
                );

            }
        );

    }
);


/* ===============================
   NEWSLETTER
================================= */

const newsletterForm =
    $("#newsletterForm");


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const input =
                newsletterForm.querySelector(
                    "input"
                );


            if (!input.value.trim()) {

                showToast(
                    "اكتب بريدك الإلكتروني أولًا"
                );

                return;

            }


            showToast(
                "تم تسجيل بريدك بنجاح ⚡ مرحبًا بك في ننجاوي"
            );


            newsletterForm.reset();

        }
    );

}


/* ===============================
   OFFER BUTTON
================================= */

const offerButton =
    $("#offerBtn");


if (offerButton) {

    offerButton.addEventListener(
        "click",
        () => {

            const productsSection =
                $("#products");


            productsSection?.scrollIntoView({
                behavior: "smooth"
            });


            showToast(
                "اكتشف أحدث عروض ننجاوي 🔥"
            );

        }
    );

}


/* ===============================
   SCROLL ANIMATION
================================= */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
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
    element => {

        observer.observe(
            element
        );

    }
);


/* ===============================
   INITIAL LOAD
================================= */

renderCart();

loadFavorites();


console.log(
    "⚔ NINJAWY V3 READY"
);
