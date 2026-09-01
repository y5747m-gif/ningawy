/* =========================================
   NINJAWY V2
========================================= */


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



/* =========================================
   HELPERS
========================================= */


const $ = selector =>
  document.querySelector(selector);


const $$ = selector =>
  [...document.querySelectorAll(selector)];



/* =========================================
   CART
========================================= */


let cart = JSON.parse(

  localStorage.getItem("ninjawyCart")

  || "[]"

);



function saveCart() {

  localStorage.setItem(

    "ninjawyCart",

    JSON.stringify(cart)

  );

}



/* =========================================
   TOAST
========================================= */


function toast(message) {

  const element = $("#toast");

  element.textContent = message;

  element.classList.add("show");


  clearTimeout(
    window.toastTimer
  );


  window.toastTimer = setTimeout(

    () => {

      element.classList.remove("show");

    },

    2500

  );

}



/* =========================================
   RENDER CART
========================================= */


function renderCart() {


  $("#cartCount").textContent =
    cart.length;


  const cartItems =
    $("#cartItems");


  const cartTotal =
    $("#cartTotal");



  if (!cart.length) {


    cartItems.innerHTML = `

      <p class="empty-cart">

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


          <button
            class="remove-item"
            data-index="${index}"
          >

            حذف

          </button>


        </div>

      `

    )

    .join("");



  const total =

    cart.reduce(

      (sum, product) =>

        sum + product.price,

      0

    );



  cartTotal.textContent =

    total.toLocaleString("ar-EG");



  $$(".remove-item")

    .forEach(

      button => {


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


      }

    );


}



/* =========================================
   ADD TO CART
========================================= */


$$(".add-btn")

  .forEach(

    button => {


      button.addEventListener(

        "click",

        () => {


          const productName =

            button.dataset.product;



          const product =

            products.find(

              item =>

                item.name === productName

            );



          if (!product) return;



          cart.push({

            name:
              product.name,

            price:
              product.price

          });



          saveCart();

          renderCart();



          toast(

            "تمت إضافة المنتج إلى حقيبة ننجاوي ⚔"

          );


        }

      );


    }

  );



/* =========================================
   OPEN CART
========================================= */


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



/* CLOSE CART */


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



/* =========================================
   CLEAR CART
========================================= */


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
        "تم تفريغ الحقيبة"
      );


    }

  );



/* =========================================
   CHECKOUT
========================================= */


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

        "تم حفظ طلبك تجريبيًا ⚔"

      );


    }

  );



/* =========================================
   SEARCH
========================================= */


$("#searchBtn")

  .addEventListener(

    "click",

    () => {


      $("#searchBox")

        .classList

        .add("show");


      setTimeout(

        () =>

          $("#searchInput")
            .focus(),

        200

      );


    }

  );



$("#closeSearch")

  .addEventListener(

    "click",

    () => {


      $("#searchBox")

        .classList

        .remove("show");


      $("#searchInput")

        .value = "";


    }

  );



$("#searchInput")

  .addEventListener(

    "input",

    event => {


      const query =

        event.target.value

          .trim()

          .toLowerCase();



      $$(".product-card")

        .forEach(

          card => {


            const name =

              card.dataset.name

                .toLowerCase();



            if (

              name.includes(query)

            ) {


              card.style.display =
                "block";


            } else {


              card.style.display =
                "none";


            }


          }

        );


    }

  );



/* =========================================
   CATEGORY FILTER
========================================= */


$$(".category")

  .forEach(

    button => {


      button.addEventListener(

        "click",

        () => {


          $$(".category")

            .forEach(

              item =>

                item.classList

                  .remove("active")

            );



          button.classList

            .add("active");



          const selectedCategory =

            button.dataset.category;



          $$(".product-card")

            .forEach(

              card => {


                if (

                  selectedCategory === "الكل"

                  ||

                  card.dataset.category ===
                  selectedCategory

                ) {


                  card.style.display =
                    "block";


                } else {


                  card.style.display =
                    "none";


                }


              }

            );



          document

            .querySelector("#products")

            .scrollIntoView({

              behavior:
                "smooth"

            });


        }

      );


    }

  );



/* =========================================
   SHOW ALL
========================================= */


$("#showAll")

  .addEventListener(

    "click",

    () => {


      $$(".category")

        .forEach(

          category =>

            category.classList

              .remove("active")

        );



      document

        .querySelector(

          '[data-category="الكل"]'

        )

        .classList

        .add("active");



      $$(".product-card")

        .forEach(

          card => {

            card.style.display =
              "block";

          }

        );


      $("#products")

        .scrollIntoView({

          behavior:
            "smooth"

        });


    }

  );



/* =========================================
   MOBILE MENU
========================================= */


$("#menuBtn")

  .addEventListener(

    "click",

    () => {


      $("#navLinks")

        .classList

        .toggle("open");


    }

  );



$$(".nav-link")

  .forEach(

    link => {


      link.addEventListener(

        "click",

        () => {


          $("#navLinks")

            .classList

            .remove("open");


        }

      );


    }

  );



/* =========================================
   FAVORITES
========================================= */


$$(".favorite-btn")

  .forEach(

    button => {


      button.addEventListener(

        "click",

        () => {


          button.classList

            .toggle("active");


          button.textContent =

            button.classList

              .contains("active")

              ? "♥"

              : "♡";


        }

      );


    }

  );



/* =========================================
   NEWSLETTER
========================================= */


$("#newsletterForm")

  .addEventListener(

    "submit",

    event => {


      event.preventDefault();


      toast(

        "تم تسجيل بريدك بنجاح ⚡"

      );


      event.target.reset();


    }

  );



/* =========================================
   OFFER BUTTON
========================================= */


$("#offerBtn")

  .addEventListener(

    "click",

    () => {


      $("#products")

        .scrollIntoView({

          behavior:
            "smooth"

        );


      toast(

        "تم فتح المنتجات المشاركة في العروض 🔥"

      );


    }

  );



/* =========================================
   START
========================================= */


renderCart();
