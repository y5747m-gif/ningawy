/*********************************
 *
 * NINJAWY V2
 * STORE SYSTEM
 *
 *********************************/


const STORE_KEY = "ninjawyProductsV2";
const CART_KEY = "ninjawyCartV2";
const FAVORITES_KEY = "ninjawyFavoritesV2";


/*
    كلمة مرور لوحة الإدارة.

    قم بتغييرها لاحقًا.
*/

const ADMIN_PASSWORD = "Ninjawy2026";


/*
    رقم واتساب صاحب المتجر
*/

const WHATSAPP_NUMBER = "201141362626";


/*********************************
 *
 * HELPERS
 *
 *********************************/

const $ = selector =>
    document.querySelector(selector);

const $$ = selector =>
    [...document.querySelectorAll(selector)];


function formatPrice(price){

    return Number(price)
        .toLocaleString("ar-EG");

}


function toast(message){

    const element = $("#toast");

    element.textContent = message;

    element.classList.add("show");

    clearTimeout(
        window.toastTimer
    );

    window.toastTimer =
        setTimeout(() => {

            element.classList.remove(
                "show"
            );

        }, 2600);

}


function saveProducts(){

    localStorage.setItem(
        STORE_KEY,
        JSON.stringify(products)
    );

}


function saveCart(){

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

}


function saveFavorites(){

    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(favorites)
    );

}


/*********************************
 *
 * DEFAULT PRODUCTS
 *
 *********************************/

const defaultProducts = [

    {
        id: 1,

        name:
            "سماعات لاسلكية احترافية",

        category:
            "إلكترونيات",

        description:
            "سماعات لاسلكية بجودة صوت عالية، تصميم مريح وبطارية تدوم لفترة طويلة.",

        price: 1299,

        oldPrice: 1599,

        rating: 4.9,

        badge: "عرض",

        image: ""
    },


    {
        id: 2,

        name:
            "حقيبة عصرية مميزة",

        category:
            "أزياء",

        description:
            "حقيبة عصرية بتصميم أنيق مناسبة للاستخدام اليومي والسفر.",

        price: 899,

        oldPrice: "",

        rating: 4.8,

        badge: "",

        image: ""
    },


    {
        id: 3,

        name:
            "مصباح ذكي متعدد الألوان",

        category:
            "منزل",

        description:
            "مصباح ذكي يمنح غرفتك أجواء مختلفة مع ألوان متعددة.",

        price: 749,

        oldPrice: "",

        rating: 4.7,

        badge: "جديد",

        image: ""
    },


    {
        id: 4,

        name:
            "وحدة تحكم لاسلكية",

        category:
            "ألعاب",

        description:
            "وحدة تحكم لاسلكية مريحة وسريعة الاستجابة لعشاق الألعاب.",

        price: 1499,

        oldPrice: "",

        rating: 4.9,

        badge:
            "الأكثر طلبًا",

        image: ""
    },


    {
        id: 5,

        name:
            "ساعة ذكية أنيقة",

        category:
            "إكسسوارات",

        description:
            "ساعة ذكية أنيقة لمتابعة الوقت والأنشطة اليومية.",

        price: 2199,

        oldPrice: 2499,

        rating: 4.8,

        badge: "عرض",

        image: ""
    },


    {
        id: 6,

        name:
            "لوحة مفاتيح للألعاب",

        category:
            "إلكترونيات",

        description:
            "لوحة مفاتيح مخصصة للألعاب مع تجربة كتابة واستجابة مميزة.",

        price: 1099,

        oldPrice: "",

        rating: 4.7,

        badge: "",

        image: ""
    }

];


/*********************************
 *
 * LOAD DATA
 *
 *********************************/

let products =
    JSON.parse(
        localStorage.getItem(
            STORE_KEY
        )
    ) || defaultProducts;


let cart =
    JSON.parse(
        localStorage.getItem(
            CART_KEY
        )
    ) || [];


let favorites =
    JSON.parse(
        localStorage.getItem(
            FAVORITES_KEY
        )
    ) || [];


let activeCategory = "الكل";


let currentImage = "";


/*********************************
 *
 * PRODUCT ICONS
 *
 *********************************/

function categoryIcon(category){

    const icons = {

        "الكل": "✦",

        "إلكترونيات": "⌘",

        "أزياء": "◈",

        "منزل": "⌂",

        "ألعاب": "◉",

        "إكسسوارات": "✧",

        "أخرى": "◆"

    };

    return icons[category] || "◆";

}


function productPlaceholder(category){

    const icons = {

        "إلكترونيات": "🎧",

        "أزياء": "👜",

        "منزل": "🏠",

        "ألعاب": "🎮",

        "إكسسوارات": "⌚",

        "أخرى": "📦"

    };

    return icons[category] || "📦";

}


/*********************************
 *
 * RENDER CATEGORIES
 *
 *********************************/

function renderCategories(){

    const container =
        $("#categoriesContainer");

    const categories = [
        "الكل",
        ...new Set(
            products.map(
                product =>
                    product.category
            )
        )
    ];


    container.innerHTML =
        categories.map(category => `

            <button
                class="category
                ${activeCategory === category ? "active" : ""}"

                data-category="${category}">

                <span class="category-icon">

                    ${categoryIcon(category)}

                </span>

                <span>

                    ${category}

                </span>

            </button>

        `).join("");


    $$(".category")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    activeCategory =
                        button.dataset.category;

                    renderCategories();

                    renderProducts();

                }
            );

        });

}


/*********************************
 *
 * RENDER PRODUCTS
 *
 *********************************/

function renderProducts(){

    const grid =
        $("#productsGrid");

    const empty =
        $("#emptyProducts");


    const searchValue =
        $("#searchInput")
            ? $("#searchInput")
                .value
                .trim()
                .toLowerCase()
            : "";


    const filtered =
        products.filter(product => {

            const categoryMatch =
                activeCategory === "الكل"
                ||
                product.category ===
                activeCategory;


            const searchMatch =
                product.name
                    .toLowerCase()
                    .includes(
                        searchValue
                    )
                ||
                product.description
                    .toLowerCase()
                    .includes(
                        searchValue
                    );


            return
                categoryMatch
                &&
                searchMatch;

        });


    grid.innerHTML = "";


    if(!filtered.length){

        empty.classList.remove(
            "hidden"
        );

        return;

    }


    empty.classList.add(
        "hidden"
    );


    grid.innerHTML =
        filtered.map(product => {

            const isFavorite =
                favorites.includes(
                    product.id
                );


            const imageHTML =
                product.image
                ?
                `
                <img
                    src="${product.image}"
                    alt="${product.name}">
                `
                :
                `
                <div class="product-placeholder">

                    ${productPlaceholder(
                        product.category
                    )}

                </div>
                `;


            return `

                <article
                    class="product-card"
                    data-id="${product.id}">

                    <div class="product-image">

                        ${imageHTML}


                        ${product.badge
                            ?
                            `
                            <span class="badge">

                                ${product.badge}

                            </span>
                            `
                            :
                            ""
                        }


                        <button
                            class="favorite-btn
                            ${isFavorite ? "active" : ""}"

                            data-favorite="${product.id}">

                            ${isFavorite ? "♥" : "♡"}

                        </button>

                    </div>


                    <div class="product-info">

                        <span
                            class="product-category">

                            ${product.category}

                        </span>


                        <h3>

                            ${product.name}

                        </h3>


                        <p
                            class="product-description">

                            ${product.description}

                        </p>


                        <div class="rating">

                            ★★★★★

                            <span>

                                (${product.rating})

                            </span>

                        </div>


                        <div
                            class="product-bottom">


                            <div
                                class="price">

                                <strong>

                                    ${formatPrice(
                                        product.price
                                    )}

                                    ج.م

                                </strong>


                                ${product.oldPrice
                                    ?
                                    `
                                    <del>

                                        ${formatPrice(
                                            product.oldPrice
                                        )}

                                        ج.م

                                    </del>
                                    `
                                    :
                                    ""
                                }

                            </div>


                            <div
                                class="product-actions">


                                <button
                                    class="small-btn
                                    details-btn"

                                    data-details="${product.id}">

                                    ⓘ

                                </button>


                                <button
                                    class="add-btn"

                                    data-add="${product.id}">

                                    أضف ⚔

                                </button>

                            </div>

                        </div>

                    </div>

                </article>

            `;

        }).join("");


    $$(".add-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    addToCart(
                        Number(
                            button.dataset.add
                        )
                    );

                }
            );

        });


    $$(".details-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    showProductDetails(
                        Number(
                            button.dataset.details
                        )
                    );

                }
            );

        });


    $$(".favorite-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    toggleFavorite(
                        Number(
                            button.dataset.favorite
                        )
                    );

                }
            );

        });


    $$(".product-card")
        .forEach(card => {

            card.addEventListener(
                "dblclick",
                () => {

                    showProductDetails(
                        Number(
                            card.dataset.id
                        )
                    );

                }
            );

        });

}


/*********************************
 *
 * FAVORITES
 *
 *********************************/

function toggleFavorite(id){

    if(
        favorites.includes(id)
    ){

        favorites =
            favorites.filter(
                favoriteId =>
                    favoriteId !== id
            );

        toast(
            "تمت إزالة المنتج من المفضلة"
        );

    }

    else{

        favorites.push(id);

        toast(
            "تمت إضافة المنتج إلى المفضلة ♥"
        );

    }


    saveFavorites();

    renderProducts();

}


/*********************************
 *
 * PRODUCT DETAILS
 *
 *********************************/

function showProductDetails(id){

    const product =
        products.find(
            product =>
                product.id === id
        );


    if(!product){

        return;

    }


    const image =
        product.image
        ?
        `<img src="${product.image}" alt="${product.name}">`
        :
        `
        <div class="product-placeholder">

            ${productPlaceholder(
                product.category
            )}

        </div>
        `;


    $("#productDetails")
        .innerHTML = `

        <div
            class="product-details-image">

            ${image}

        </div>


        <div
            class="product-details-content">

            <span
                class="product-category">

                ${product.category}

            </span>


            <h2>

                ${product.name}

            </h2>


            <div class="rating">

                ★★★★★

                <span>

                    (${product.rating})

                </span>

            </div>


            <p
                class="product-details-description">

                ${product.description}

            </p>


            <div
                class="product-details-price">

                ${formatPrice(
                    product.price
                )}

                ج.م

            </div>


            <button
                class="btn btn-primary"
                id="detailsAddBtn">

                🛍 أضف إلى الحقيبة

            </button>

        </div>

    `;


    $("#productModal")
        .classList.add(
            "show"
        );


    $("#detailsAddBtn")
        .onclick = () => {

            addToCart(id);

            closeModal(
                "productModal"
            );

        };

}


/*********************************
 *
 * CART
 *
 *********************************/

function addToCart(id){

    const product =
        products.find(
            product =>
                product.id === id
        );


    if(!product){

        return;

    }


    const existing =
        cart.find(
            item =>
                item.id === id
        );


    if(existing){

        existing.quantity++;

    }

    else{

        cart.push({

            id: product.id,

            name: product.name,

            price: Number(
                product.price
            ),

            image: product.image,

            category:
                product.category,

            quantity: 1

        });

    }


    saveCart();

    renderCart();

    toast(
        "تمت إضافة المنتج إلى حقيبة ننجاوي ⚔"
    );

}


function renderCart(){

    const container =
        $("#cartItems");


    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    $("#cartCount")
        .textContent =
            count;


    if(!cart.length){

        container.innerHTML = `

            <div class="empty-cart">

                <div style="font-size:55px">

                    🛍

                </div>

                <p>

                    حقيبتك فارغة حاليًا.

                </p>

            </div>

        `;


        $("#cartTotal")
            .textContent = "0";

        return;

    }


    container.innerHTML =
        cart.map(item => {

            const image =
                item.image
                ?
                `<img src="${item.image}" alt="${item.name}">`
                :
                `
                <div
                    class="product-placeholder"
                    style="
                        width:75px;
                        height:75px;
                        border-radius:13px;
                        font-size:28px">

                    ${productPlaceholder(
                        item.category
                    )}

                </div>
                `;


            return `

                <div
                    class="cart-item">

                    ${image}


                    <div
                        class="cart-item-info">

                        <h4>

                            ${item.name}

                        </h4>


                        <div
                            class="cart-item-price">

                            ${formatPrice(
                                item.price
                            )}

                            ج.م

                        </div>


                        <div
                            class="quantity">

                            <button
                                data-increase="${item.id}">

                                +

                            </button>


                            <span>

                                ${item.quantity}

                            </span>


                            <button
                                data-decrease="${item.id}">

                                −

                            </button>

                        </div>

                    </div>


                    <button
                        class="remove-item"
                        data-remove="${item.id}">

                        حذف

                    </button>

                </div>

            `;

        }).join("");


    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                (
                    item.price *
                    item.quantity
                ),
            0
        );


    $("#cartTotal")
        .textContent =
            formatPrice(total);


    $$("[data-increase]")
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


    $$("[data-decrease]")
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


    $$("[data-remove]")
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


function changeQuantity(id, amount){

    const item =
        cart.find(
            item =>
                item.id === id
        );


    if(!item){

        return;

    }


    item.quantity += amount;


    if(item.quantity <= 0){

        cart =
            cart.filter(
                item =>
                    item.id !== id
            );

    }


    saveCart();

    renderCart();

}


function removeFromCart(id){

    cart =
        cart.filter(
            item =>
                item.id !== id
        );


    saveCart();

    renderCart();

    toast(
        "تم حذف المنتج من الحقيبة"
    );

}


/*********************************
 *
 * CHECKOUT
 *
 *********************************/

function openCheckout(){

    if(!cart.length){

        toast(
            "أضف منتجًا أولًا إلى الحقيبة"
        );

        return;

    }


    renderCheckoutSummary();


    closeCart();


    $("#checkoutModal")
        .classList.add(
            "show"
        );

}


function renderCheckoutSummary(){

    const container =
        $("#checkoutSummary");


    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );


    container.innerHTML = `

        <h4>

            ملخص الطلب

        </h4>


        ${cart.map(item => `

            <div
                class="summary-line">

                <span>

                    ${item.name}

                    ×

                    ${item.quantity}

                </span>


                <span>

                    ${formatPrice(
                        item.price *
                        item.quantity
                    )}

                    ج.م

                </span>

            </div>

        `).join("")}


        <div
            class="summary-line
            summary-total">

            <span>
                الإجمالي
            </span>

            <span>

                ${formatPrice(total)}

                ج.م

            </span>

        </div>

    `;

}


$("#checkoutForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();


            sendOrderToWhatsApp();

        }
    );


function sendOrderToWhatsApp(){

    const name =
        $("#customerName")
            .value.trim();


    const phone =
        $("#customerPhone")
            .value.trim();


    const phone2 =
        $("#customerPhone2")
            .value.trim();


    const governorate =
        $("#customerGovernorate")
            .value.trim();


    const area =
        $("#customerArea")
            .value.trim();


    const address =
        $("#customerAddress")
            .value.trim();


    const notes =
        $("#customerNotes")
            .value.trim();


    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );


    let message = `🛍 *طلب جديد من متجر ننجاوي*%0A%0A`;


    message += `👤 *اسم العميل:* ${name}%0A`;

    message += `📞 *رقم الهاتف:* ${phone}%0A`;


    if(phone2){

        message += `📱 *رقم إضافي:* ${phone2}%0A`;

    }


    message += `%0A📍 *العنوان*%0A`;

    message += `المحافظة: ${governorate}%0A`;

    message += `المنطقة: ${area}%0A`;

    message += `العنوان: ${address}%0A`;


    if(notes){

        message += `%0A📝 *ملاحظات:* ${notes}%0A`;

    }


    message += `%0A📦 *المنتجات المطلوبة*%0A`;


    cart.forEach(item => {

        message += `%0A▪️ ${item.name}`;

        message += `%0A   الكمية: ${item.quantity}`;

        message += `%0A   السعر: ${formatPrice(
            item.price * item.quantity
        )} ج.م%0A`;

    });


    message += `%0A💰 *الإجمالي النهائي:* ${formatPrice(
        total
    )} ج.م`;


    const url =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            decodeURIComponent(
                message
                    .replace(
                        /%0A/g,
                        "\n"
                    )
            )
        )}`;


    window.open(
        url,
        "_blank"
    );


    toast(
        "تم تجهيز طلبك وإرساله إلى واتساب 💬"
    );


    setTimeout(() => {

        cart = [];

        saveCart();

        renderCart();

        $("#checkoutForm")
            .reset();

        closeModal(
            "checkoutModal"
        );

    }, 1200);

}


/*********************************
 *
 * ADMIN LOGIN
 *
 *********************************/

$("#adminBtn")
    .addEventListener(
        "click",
        () => {

            const loggedIn =
                sessionStorage.getItem(
                    "ninjawyAdmin"
                );


            if(loggedIn === "true"){

                openAdminPanel();

            }

            else{

                $("#adminLoginModal")
                    .classList.add(
                        "show"
                    );

            }

        }
    );


$("#adminLoginForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const password =
                $("#adminPassword")
                    .value;


            if(
                password ===
                ADMIN_PASSWORD
            ){

                sessionStorage.setItem(
                    "ninjawyAdmin",
                    "true"
                );


                $("#adminPassword")
                    .value = "";


                closeModal(
                    "adminLoginModal"
                );


                openAdminPanel();

                toast(
                    "مرحبًا بك في لوحة الإدارة ⚙"
                );

            }

            else{

                toast(
                    "كلمة المرور غير صحيحة"
                );

            }

        }
    );


function openAdminPanel(){

    renderAdminProducts();


    $("#adminModal")
        .classList.add(
            "show"
        );

}


/*********************************
 *
 * ADMIN PRODUCTS
 *
 *********************************/

function renderAdminProducts(){

    const container =
        $("#adminProductsList");


    container.innerHTML =
        products.map(product => {

            const image =
                product.image
                ?
                `<img src="${product.image}" alt="${product.name}">`
                :
                `
                <div
                    class="product-placeholder"
                    style="
                        width:60px;
                        height:60px;
                        border-radius:10px;
                        font-size:25px">

                    ${productPlaceholder(
                        product.category
                    )}

                </div>
                `;


            return `

                <div
                    class="admin-product-row">

                    ${image}


                    <div
                        class="admin-product-info">

                        <strong>

                            ${product.name}

                        </strong>


                        <br>


                        <span>

                            ${product.category}

                            —

                            ${formatPrice(
                                product.price
                            )}

                            ج.م

                        </span>

                    </div>


                    <div
                        class="admin-product-actions">

                        <button
                            class="edit-product-btn"
                            data-edit="${product.id}">

                            تعديل

                        </button>


                        <button
                            class="delete-product-btn"
                            data-delete="${product.id}">

                            حذف

                        </button>

                    </div>

                </div>

            `;

        }).join("");


    $$("[data-edit]")
        .forEach(button => {

            button.onclick = () => {

                editProduct(
                    Number(
                        button.dataset.edit
                    )
                );

            };

        });


    $$("[data-delete]")
        .forEach(button => {

            button.onclick = () => {

                deleteProduct(
                    Number(
                        button.dataset.delete
                    )
                );

            };

        });

}


/*********************************
 *
 * IMAGE UPLOAD
 *
 *********************************/

$("#productImage")
    .addEventListener(
        "change",
        async event => {

            const file =
                event.target.files[0];


            if(!file){

                return;

            }


            currentImage =
                await compressImage(
                    file
                );


            $("#imagePreview")
                .innerHTML = `

                <img
                    src="${currentImage}"
                    alt="معاينة الصورة">

            `;

        }
    );


function compressImage(file){

    return new Promise(
        resolve => {

            const reader =
                new FileReader();


            reader.onload =
                event => {

                    const image =
                        new Image();


                    image.onload =
                        () => {

                            const maxSize =
                                800;


                            let width =
                                image.width;


                            let height =
                                image.height;


                            if(
                                width > maxSize
                                ||
                                height > maxSize
                            ){

                                if(
                                    width > height
                                ){

                                    height =
                                        height *
                                        (
                                            maxSize /
                                            width
                                        );

                                    width =
                                        maxSize;

                                }

                                else{

                                    width =
                                        width *
                                        (
                                            maxSize /
                                            height
                                        );

                                    height =
                                        maxSize;

                                }

                            }


                            const canvas =
                                document.createElement(
                                    "canvas"
                                );


                            canvas.width =
                                width;


                            canvas.height =
                                height;


                            const context =
                                canvas.getContext(
                                    "2d"
                                );


                            context.drawImage(
                                image,
                                0,
                                0,
                                width,
                                height
                            );


                            resolve(

                                canvas.toDataURL(
                                    "image/jpeg",
                                    .82
                                )

                            );

                        };


                    image.src =
                        event.target.result;

                };


            reader.readAsDataURL(
                file
            );

        }
    );

}


/*********************************
 *
 * SAVE PRODUCT
 *
 *********************************/

$("#productForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const id =
                $("#editProductId")
                    .value;


            const productData = {

                id:
                    id
                    ?
                    Number(id)
                    :
                    Date.now(),


                name:
                    $("#productName")
                        .value
                        .trim(),


                category:
                    $("#productCategory")
                        .value,


                price:
                    Number(
                        $("#productPrice")
                            .value
                    ),


                oldPrice:
                    $("#productOldPrice")
                        .value
                    ?
                    Number(
                        $("#productOldPrice")
                            .value
                    )
                    :
                    "",


                rating:
                    Number(
                        $("#productRating")
                            .value
                    ),


                badge:
                    $("#productBadge")
                        .value,


                description:
                    $("#productDescription")
                        .value
                        .trim(),


                image:
                    currentImage

            };


            if(id){

                products =
                    products.map(
                        product =>
                            product.id ===
                            Number(id)
                            ?
                            productData
                            :
                            product
                    );


                toast(
                    "تم تعديل المنتج بنجاح ✏"
                );

            }

            else{

                products.unshift(
                    productData
                );


                toast(
                    "تمت إضافة المنتج بنجاح ⚔"
                );

            }


            saveProducts();


            renderProducts();

            renderCategories();

            renderAdminProducts();

            resetProductForm();

        }
    );


/*********************************
 *
 * EDIT PRODUCT
 *
 *********************************/

function editProduct(id){

    const product =
        products.find(
            product =>
                product.id === id
        );


    if(!product){

        return;

    }


    $("#editProductId")
        .value =
            product.id;


    $("#productName")
        .value =
            product.name;


    $("#productCategory")
        .value =
            product.category;


    $("#productPrice")
        .value =
            product.price;


    $("#productOldPrice")
        .value =
            product.oldPrice;


    $("#productRating")
        .value =
            product.rating;


    $("#productBadge")
        .value =
            product.badge;


    $("#productDescription")
        .value =
            product.description;


    currentImage =
        product.image;


    $("#imagePreview")
        .innerHTML =
            product.image
            ?
            `<img src="${product.image}" alt="${product.name}">`
            :
            `
            <span>
                لا توجد صورة
            </span>
            `;


    $("#adminFormTitle")
        .textContent =
            "تعديل المنتج";


    $("#adminModal")
        .querySelector(".modal-box")
        .scrollTo({

            top:0,

            behavior:"smooth"

        });

}


/*********************************
 *
 * DELETE PRODUCT
 *
 *********************************/

function deleteProduct(id){

    const product =
        products.find(
            product =>
                product.id === id
        );


    if(!product){

        return;

    }


    const confirmation =
        confirm(
            `هل تريد حذف "${product.name}"؟`
        );


    if(!confirmation){

        return;

    }


    products =
        products.filter(
            product =>
                product.id !== id
        );


    cart =
        cart.filter(
            item =>
                item.id !== id
        );


    favorites =
        favorites.filter(
            favoriteId =>
                favoriteId !== id
        );


    saveProducts();

    saveCart();

    saveFavorites();


    renderProducts();

    renderCategories();

    renderCart();

    renderAdminProducts();


    toast(
        "تم حذف المنتج"
    );

}


/*********************************
 *
 * RESET FORM
 *
 *********************************/

function resetProductForm(){

    $("#productForm")
        .reset();


    $("#editProductId")
        .value = "";


    currentImage = "";


    $("#imagePreview")
        .innerHTML = `

        <span>

            معاينة الصورة

        </span>

    `;


    $("#adminFormTitle")
        .textContent =
            "إضافة منتج جديد";

}


$("#cancelEdit")
    .addEventListener(
        "click",
        resetProductForm
    );


/*********************************
 *
 * ADMIN LOGOUT
 *
 *********************************/

$("#adminLogout")
    .addEventListener(
        "click",
        () => {

            sessionStorage.removeItem(
                "ninjawyAdmin"
            );


            closeModal(
                "adminModal"
            );


            toast(
                "تم تسجيل الخروج"
            );

        }
    );


/*********************************
 *
 * CART OPEN / CLOSE
 *
 *********************************/

$("#cartBtn")
    .onclick = () => {

        $("#cartPanel")
            .classList.add(
                "open"
            );


        $("#overlay")
            .classList.add(
                "show"
            );

    };


$("#closeCart")
    .onclick =
        closeCart;


$("#overlay")
    .onclick =
        closeCart;


function closeCart(){

    $("#cartPanel")
        .classList.remove(
            "open"
        );


    $("#overlay")
        .classList.remove(
            "show"
        );

}


/*********************************
 *
 * SEARCH
 *
 *********************************/

$("#searchBtn")
    .onclick = () => {

        $("#searchBox")
            .classList.add(
                "show"
            );


        setTimeout(() => {

            $("#searchInput")
                .focus();

        }, 100);

    };


$("#closeSearch")
    .onclick = () => {

        $("#searchBox")
            .classList.remove(
                "show"
            );

    };


$("#searchInput")
    .addEventListener(
        "input",
        () => {

            activeCategory =
                "الكل";


            renderCategories();

            renderProducts();

        }
    );


/*********************************
 *
 * MOBILE MENU
 *
 *********************************/

$("#menuBtn")
    .onclick = () => {

        $("#navLinks")
            .classList.toggle(
                "open"
            );

    };


$$(".nav-links a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                $("#navLinks")
                    .classList.remove(
                        "open"
                    );

            }
        );

    });


/*********************************
 *
 * SHOW ALL
 *
 *********************************/

$("#showAll")
    .onclick = () => {

        activeCategory =
            "الكل";


        $("#searchInput")
            .value = "";


        renderCategories();

        renderProducts();


        document
            .querySelector("#products")
            .scrollIntoView({

                behavior:"smooth"

            });

    };


/*********************************
 *
 * OFFER BUTTON
 *
 *********************************/

$("#offerBtn")
    .onclick = () => {

        activeCategory =
            "الكل";


        renderProducts();


        document
            .querySelector("#products")
            .scrollIntoView({

                behavior:"smooth"

            });


        toast(
            "استكشف المنتجات والعروض 🔥"
        );

    };


/*********************************
 *
 * CLEAR CART
 *
 *********************************/

$("#clearCart")
    .onclick = () => {

        if(!cart.length){

            return;

        }


        const confirmation =
            confirm(
                "هل تريد تفريغ الحقيبة؟"
            );


        if(!confirmation){

            return;

        }


        cart = [];


        saveCart();

        renderCart();


        toast(
            "تم تفريغ الحقيبة"
        );

    };


/*********************************
 *
 * CHECKOUT BUTTON
 *
 *********************************/

$("#checkoutBtn")
    .onclick =
        openCheckout;


/*********************************
 *
 * NEWSLETTER
 *
 *********************************/

$("#newsletterForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();


            event.target.reset();


            toast(
                "تم تسجيل بريدك بنجاح ⚡"
            );

        }
    );


/*********************************
 *
 * MODAL CLOSE
 *
 *********************************/

$$(".modal-close")
    .forEach(button => {

        button.onclick = () => {

            closeModal(
                button.dataset.close
            );

        };

    });


function closeModal(id){

    const modal =
        document.getElementById(id);


    if(modal){

        modal.classList.remove(
            "show"
        );

    }

}


/*********************************
 *
 * ESCAPE
 *
 *********************************/

document
    .addEventListener(
        "keydown",
        event => {

            if(
                event.key === "Escape"
            ){

                $$(".modal.show")
                    .forEach(modal => {

                        modal.classList.remove(
                            "show"
                        );

                    });


                $("#searchBox")
                    .classList.remove(
                        "show"
                    );


                closeCart();

            }

        }
    );


/*********************************
 *
 * START
 *
 *********************************/

renderCategories();

renderProducts();

renderCart();
