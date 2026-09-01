const $ = selector =>
    document.querySelector(selector);

const $$ = selector =>
    [...document.querySelectorAll(selector)];


/* =========================
   PRODUCTS
========================= */

const products = {

    "سماعات لاسلكية احترافية": 1299,

    "ساعة ذكية أنيقة": 1999,

    "ماوس ألعاب احترافي": 799,

    "مجسم محارب النينجا": 599,

    "حقيبة ظهر عصرية": 1099

};


/* =========================
   CART
========================= */

let cart =
    JSON.parse(
        localStorage.getItem("ninjawyV2Cart")
        || "[]"
    );


function saveCart() {

    localStorage.setItem(
        "ninjawyV2Cart",
        JSON.stringify(cart)
    );

}


/* =========================
   TOAST
========================= */

function toast(message) {

    const toastBox =
        $("#toast");

    toastBox.textContent =
        message;

    toastBox.classList.add(
        "show"
    );


    setTimeout(() => {

        toastBox.classList.remove(
            "show"
        );

    }, 2500);

}


/* =========================
   RENDER CART
========================= */

function renderCart() {

    $("#cartCount").textContent =
        cart.length;


    const cartItems =
        $("#cartItems");


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price,
            0
        );


    $("#cartTotal").textContent =
        total.toLocaleString(
            "ar-EG"
        );


    if (!cart.length) {

        cartItems.innerHTML = `

            <p class="empty-cart">

                حقيبتك فارغة حاليًا

            </p>

        `;

        return;

    }


    cartItems.innerHTML =
        cart
            .map(
                (item, index) => `

                <div class="cart-item">

                    <div>

                        <strong>

                            ${item.name}

                        </strong>

                        <br>

                        <small>

                            ${item.price.toLocaleString("ar-EG")}
                            ج.م

                        </small>

                    </div>


                    <button
                        class="remove-item"
                        data-index="${index}">

                        حذف

                    </button>

                </div>

            `
            )
            .join("");


    $$(".remove-item")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    cart.splice(
                        index,
                        1
                    );


                    saveCart();

                    renderCart();


                    toast(
                        "تم حذف المنتج من الحقيبة"
                    );

                }
            );

        });

}


renderCart();


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


                const price =
                    Number(
                        button.dataset.price
                        ||
                        products[name]
                    );


                cart.push({

                    name,
                    price

                });


                saveCart();

                renderCart();


                toast(
                    "⚔ تمت إضافة المنتج إلى حقيبة ننجاوي"
                );

            }
        );

    });


/* =========================
   OPEN CART
========================= */

$("#cartBtn")
    .addEventListener(
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


/* =========================
   CLOSE CART
========================= */

function closeCart() {

    $("#cartPanel")
        .classList
        .remove("open");


    $("#overlay")
        .classList
        .remove("show");

}


$("#closeCart")
    .addEventListener(
        "click",
        closeCart
    );


$("#overlay")
    .addEventListener(
        "click",
        closeCart
    );


/* =========================
   CLEAR CART
========================= */

$("#clearCart")
    .addEventListener(
        "click",
        () => {

            if (!cart.length) {

                toast(
                    "الحقيبة فارغة بالفعل"
                );

                return;

            }


            cart = [];


            saveCart();

            renderCart();


            toast(
                "تم تفريغ حقيبة ننجاوي"
            );

        }
    );


/* =========================
   CHECKOUT
========================= */

$("#checkoutBtn")
    .addEventListener(
        "click",
        () => {

            if (!cart.length) {

                toast(
                    "أضف منتجًا أولًا إلى الحقيبة"
                );

                return;

            }


            toast(
                "⚔ تم حفظ طلبك بنجاح بشكل تجريبي"
            );

        }
    );


/* =========================
   SEARCH
========================= */

$("#searchBtn")
    .addEventListener(
        "click",
        () => {

            $("#searchBox")
                .classList
                .add("show");


            $("#searchInput")
                .focus();

        }
    );


$("#closeSearch")
    .addEventListener(
        "click",
        () => {

            $("#searchBox")
                .classList
                .remove("show");

        }
    );


$("#searchInput")
    .addEventListener(
        "input",
        event => {

            const query =
                event.target
                    .value
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


/* =========================
   CATEGORIES
========================= */

$$(".category-card")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                $$(".category-card")
                    .forEach(item =>
                        item.classList.remove(
                            "active"
                        )
                    );


                button.classList.add(
                    "active"
                );


                const category =
                    button.dataset.category;


                $$(".product-card")
                    .forEach(card => {

                        const show =

                            category === "الكل"

                            ||

                            card.dataset.category ===
                            category;


                        card.style.display =
                            show
                                ? "block"
                                : "none";

                    });


                document
                    .querySelector("#products")
                    .scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

            }
        );

    });


/* =========================
   SHOW ALL PRODUCTS
========================= */

$("#showAll")
    .addEventListener(
        "click",
        () => {

            $$(".category-card")
                .forEach(button =>
                    button.classList.remove(
                        "active"
                    )
                );


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


            $("#products")
                .scrollIntoView({

                    behavior: "smooth"

                });

        }
    );


/* =========================
   MOBILE MENU
========================= */

$("#menuBtn")
    .addEventListener(
        "click",
        () => {

            $("#navLinks")
                .classList
                .toggle("open");

        }
    );


/* =========================
   NEWSLETTER
========================= */

$("#newsletterForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();


            toast(
                "⚡ تم تسجيل بريدك بنجاح في ننجاوي"
            );


            event.target.reset();

        }
    );


/* =========================
   OFFERS BUTTON
========================= */

$("#offerBtn")
    .addEventListener(
        "click",
        () => {

            $("#products")
                .scrollIntoView({

                    behavior: "smooth"

                });


            toast(
                "🔥 تم فتح المنتجات والعروض المميزة"
            );

        }
    );


/* =========================
   FAVORITES
========================= */

$$(".favorite-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                if (
                    button.textContent.trim()
                    === "♡"
                ) {

                    button.textContent =
                        "♥";


                    button.style.color =
                        "#e52320";


                    toast(
                        "تمت الإضافة إلى المفضلة ♥"
                    );

                }

                else {

                    button.textContent =
                        "♡";


                    button.style.color =
                        "white";

                }

            }
        );

    });
