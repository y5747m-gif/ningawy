/* ==========================================================================
   NINJAWY STORE — APP v2
   · Bilingual (AR / EN) with RTL + LTR
   · Dark / Light themes
   · Animated canvas background
   · Cart · WhatsApp checkout · Admin panel
   ========================================================================== */
(function () {
  "use strict";

  /* ---------------- CONFIG ---------------- */
  const WHATSAPP_NUMBER = "201141362626";
  const ADMIN_USERNAME = "yaseen";
  const ADMIN_PASSWORD = "NINJAWY2026";

  const KEYS = {
    products: "ninjawy_products",
    cart: "ninjawy_cart",
    favorites: "ninjawy_favorites",
    admin: "ninjawy_admin_session",
    theme: "ninjawy_theme",
    lang: "ninjawy_lang",
    offerEnd: "ninjawy_offer_end"
  };

  const ICON_CHOICES = ["box", "headset", "keyboard", "gamepad", "mouse", "watch", "handbag", "shirt", "lamp", "gift", "bag", "shuriken"];

  /* ---------------- I18N ---------------- */
  const I18N = {
    ar: {
      "meta.title": "ننجاوي | NINJAWY — تسوّق بسرعة النينجا",
      "meta.description": "ننجاوي - تجربة تسوق عصرية وسريعة: منتجات مختارة، عروض حصرية، توصيل لكل المحافظات ودفع عند الاستلام.",
      "brand.name": "ننجاوي",
      "loader.text": "يتم تحميل التجربة...",
      "marquee.1": "عروض خاصة لفترة محدودة — شحن مجاني للطلبات فوق 500 ج.م",
      "marquee.2": "خصم حتى 40% على منتجات مختارة",
      "marquee.3": "توصيل لكل المحافظات · دفع عند الاستلام",

      "nav.home": "الرئيسية",
      "nav.categories": "الأقسام",
      "nav.products": "المنتجات",
      "nav.offers": "العروض",
      "nav.reviews": "آراء العملاء",
      "nav.admin": "الإدارة",
      "nav.menu": "القائمة",
      "nav.search": "بحث",
      "nav.cart": "سلة المشتريات",
      "nav.theme": "تبديل بين الوضع الداكن والفاتح",

      "hero.badge": "تجربة تسوق بسرعة النينجا",
      "hero.title1": "كل ما تحتاجه...",
      "hero.title2": "تجده في ننجاوي",
      "hero.desc": "متجر حديث يجمع لك المنتجات المميزة والعروض الحصرية وتجربة تسوق سريعة وسهلة في مكان واحد.",
      "hero.cta1": "تسوق الآن",
      "hero.cta2": "اكتشف العروض",
      "hero.stat1": "منتج",
      "hero.stat2": "عميل",
      "hero.stat3": "تقييم",
      "hero.badgeCard1": "توصيل سريع",
      "hero.badgeCard2": "خلال 2 - 4 أيام",
      "hero.scroll": "اسحب للاستكشاف",
      "hero.ninjaAlt": "نينجا ننجاوي",

      "trust.1.title": "شحن سريع", "trust.1.sub": "لكل المحافظات",
      "trust.2.title": "ضمان الجودة", "trust.2.sub": "منتجات أصلية 100%",
      "trust.3.title": "طلب عبر واتساب", "trust.3.sub": "بدون تعقيد",
      "trust.4.title": "دفع عند الاستلام", "trust.4.sub": "افحص ثم ادفع",

      "stats.1": "منتج متوفر",
      "stats.2": "عميل سعيد",
      "stats.3": "متوسط التقييم",
      "stats.4": "دعم مستمر",

      "cat.eyebrow": "استكشف المتجر",
      "cat.title": "أقسام <em>ننجاوي</em>",
      "cat.desc": "تسوّق حسب القسم واختار ما يناسبك في ثوانٍ.",
      "cat.all": "كل المنتجات",
      "cat.electronics": "إلكترونيات",
      "cat.fashion": "أزياء",
      "cat.home": "منزل",
      "cat.gaming": "ألعاب",
      "cat.accessories": "إكسسوارات",

      "prod.eyebrow": "مختارات ننجاوي",
      "prod.title": "أحدث <em>المنتجات</em>",
      "prod.showAll": "عرض الكل",
      "prod.addToCart": "أضف للسلة",
      "prod.added": "تمت الإضافة",
      "prod.results": "{n} منتج",
      "prod.emptyTitle": "لا توجد منتجات",
      "prod.emptyDesc": "هذا القسم فارغ حاليًا، جرّب قسمًا آخر أو عد لاحقًا.",
      "prod.sold": "بيع {n}",
      "prod.quickAdd": "إضافة سريعة للسلة",
      "prod.favAdd": "أُضيف إلى المفضلة",
      "prod.favRemove": "أُزيل من المفضلة",

      "offer.tag": "عرض محدود",
      "offer.title": "ادخل ساحة العروض <span>واحصل على خصومات مميزة</span>",
      "offer.desc": "عروض متجددة على مجموعة مختارة من المنتجات، لفترة محدودة فقط.",
      "offer.cta": "اكتشف المنتجات",
      "offer.upTo": "حتى",
      "offer.off": "خصم",
      "offer.days": "يوم",
      "offer.hours": "ساعة",
      "offer.minutes": "دقيقة",
      "offer.seconds": "ثانية",

      "rev.eyebrow": "آراء العملاء",
      "rev.title": "ثقة <em>تستحقها</em>",
      "rev.desc": "تجارب حقيقية من عملاء اشتروا من ننجاوي.",
      "rev.1.text": "الطلب وصل في يومين والتغليف ممتاز، والتعامل كان محترم جدًا.",
      "rev.1.name": "محمود عادل", "rev.1.role": "القاهرة",
      "rev.2.text": "أحسن حاجة إن الدفع عند الاستلام، فحصت المنتج قبل ما أدفع.",
      "rev.2.name": "سارة إبراهيم", "rev.2.role": "الإسكندرية",
      "rev.3.text": "الأسعار منافسة والجودة أعلى من المتوقع، هرجع أشتري تاني أكيد.",
      "rev.3.name": "أحمد سمير", "rev.3.role": "المنصورة",

      "nl.eyebrow": "كن أول من يعرف العروض",
      "nl.title": "انضم إلى مجتمع <em>ننجاوي</em>",
      "nl.desc": "رسالة واحدة أسبوعيًا بأهم العروض والمنتجات الجديدة — بدون إزعاج.",
      "nl.placeholder": "اكتب بريدك الإلكتروني",
      "nl.cta": "اشترك الآن",
      "nl.invalid": "من فضلك اكتب بريدًا إلكترونيًا صحيحًا.",
      "nl.done": "تم الاشتراك بنجاح ✦",

      "footer.about": "تجربة تسوق حديثة تجمع المنتجات المميزة والعروض الحصرية في مكان واحد. بسرعة النينجا، بجودة تثق بها.",
      "footer.quick": "روابط سريعة",
      "footer.help": "المساعدة",
      "footer.contact": "تواصل معنا",
      "footer.shipping": "الشحن والتوصيل",
      "footer.returns": "الاستبدال والاسترجاع",
      "footer.payment": "طرق الدفع",
      "footer.faq": "الأسئلة الشائعة",
      "footer.privacy": "سياسة الخصوصية",
      "footer.address": "مصر — توصيل لكل المحافظات",
      "footer.hours": "يوميًا من 10 صباحًا حتى 12 منتصف الليل",
      "footer.rights": "© 2026 NINJAWY — صُنع بسرعة النينجا <svg class=\"ic\" aria-hidden=\"true\"><use href=\"#i-mask\"/></svg>",
      "footer.dev": "تطوير <strong>yaseen amr abd el rahem</strong>",

      "cart.label": "سلة المشتريات",
      "cart.title": "حقيبة ننجاوي",
      "cart.empty": "حقيبتك فارغة حاليًا",
      "cart.emptyHint": "أضف منتجات من المتجر وابدأ طلبك في ثوانٍ.",
      "cart.summary": "{n} منتج · إجمالي {total}",
      "cart.details": "بيانات الطلب",
      "cart.name": "الاسم بالكامل",
      "cart.phone": "رقم الهاتف",
      "cart.phone2": "رقم هاتف إضافي (اختياري)",
      "cart.city": "المحافظة / المدينة",
      "cart.address": "العنوان بالتفصيل",
      "cart.notes": "ملاحظات إضافية على الطلب (اختياري)",
      "cart.total": "الإجمالي",
      "cart.clear": "تفريغ السلة",
      "cart.checkout": "إتمام الطلب عبر واتساب",
      "cart.checkingout": "جاري التحويل...",
      "cart.remove": "حذف",
      "cart.added": "تمت إضافة المنتج إلى السلة",
      "cart.removed": "تم حذف المنتج من السلة",
      "cart.cleared": "تم تفريغ السلة",
      "cart.isEmpty": "السلة فارغة حاليًا.",
      "cart.needCustomer": "من فضلك أكمل بيانات العميل.",
      "cart.opened": "تم فتح واتساب لإتمام الطلب",
      "cart.confirmClear": "هل تريد تفريغ السلة؟",

      "search.title": "البحث عن منتج",
      "search.placeholder": "اكتب اسم المنتج...",
      "search.hint": "جرّب: سماعات، ساعة، ألعاب...",
      "search.none": "لا توجد نتائج مطابقة.",

      "admin.loginTitle": "تسجيل دخول الإدارة",
      "admin.username": "اسم المستخدم",
      "admin.password": "كلمة المرور",
      "admin.loginBtn": "دخول لوحة الإدارة",
      "admin.loginError": "بيانات الدخول غير صحيحة.",
      "admin.panelTitle": "إدارة المنتجات",
      "admin.logout": "تسجيل الخروج",
      "admin.addTitle": "إضافة منتج جديد",
      "admin.nameAr": "اسم المنتج (عربي)",
      "admin.nameEn": "اسم المنتج (إنجليزي)",
      "admin.descAr": "وصف المنتج (عربي)",
      "admin.descEn": "وصف المنتج (إنجليزي)",
      "admin.price": "السعر بالجنيه",
      "admin.oldPrice": "السعر قبل الخصم (اختياري)",
      "admin.chooseCat": "اختر القسم",
      "admin.iconLabel": "أيقونة المنتج",
      "admin.imageLabel": "اختر صورة للمنتج (اختياري)",
      "admin.imagePreview": "معاينة الصورة",
      "admin.addBtn": "إضافة المنتج",
      "admin.listTitle": "المنتجات الحالية",
      "admin.delete": "حذف",
      "admin.added": "تمت إضافة المنتج بنجاح",
      "admin.deleted": "تم حذف المنتج.",
      "admin.fillAll": "أكمل بيانات المنتج المطلوبة.",
      "admin.confirmDelete": "هل تريد حذف هذا المنتج؟",
      "admin.loggedIn": "تم تسجيل الدخول بنجاح",
      "admin.loggedOut": "تم تسجيل الخروج",
      "admin.count": "{n} منتج",

      "common.currency": "ج.م",
      "common.skip": "تخطَّ إلى المحتوى",
      "common.close": "إغلاق",
      "common.top": "العودة للأعلى",
      "common.theme.dark": "الوضع الداكن مفعّل",
      "common.theme.light": "الوضع الفاتح مفعّل",
      "common.lang": "تم التبديل إلى العربية",

      "wa.title": "*طلب جديد من متجر ننجاوي*",
      "wa.customer": "*بيانات العميل*",
      "wa.name": "الاسم",
      "wa.phone": "رقم الهاتف",
      "wa.phone2": "رقم إضافي",
      "wa.none": "لا يوجد",
      "wa.city": "المدينة",
      "wa.address": "العنوان",
      "wa.notes": "الملاحظات",
      "wa.products": "*المنتجات*",
      "wa.qty": "الكمية",
      "wa.price": "السعر",
      "wa.itemTotal": "إجمالي المنتج",
      "wa.total": "*الإجمالي النهائي*",
      "wa.thanks": "شكرًا لاختيارك ننجاوي ✦"
    },

    en: {
      "meta.title": "NINJAWY — Shop at ninja speed",
      "meta.description": "NINJAWY - a modern shopping experience: hand-picked products, exclusive deals, nationwide delivery and cash on delivery.",
      "brand.name": "Ninjawy",
      "loader.text": "Loading the experience...",
      "marquee.1": "Limited-time offers — free shipping on orders over EGP 500",
      "marquee.2": "Up to 40% off selected products",
      "marquee.3": "Nationwide delivery · Cash on delivery",

      "nav.home": "Home",
      "nav.categories": "Categories",
      "nav.products": "Products",
      "nav.offers": "Deals",
      "nav.reviews": "Reviews",
      "nav.admin": "Admin",
      "nav.menu": "Menu",
      "nav.search": "Search",
      "nav.cart": "Shopping bag",
      "nav.theme": "Toggle dark / light mode",

      "hero.badge": "Shopping at ninja speed",
      "hero.title1": "Everything you need...",
      "hero.title2": "found at NINJAWY",
      "hero.desc": "A modern store that brings you curated products, exclusive deals and a fast, effortless shopping experience — all in one place.",
      "hero.cta1": "Shop now",
      "hero.cta2": "Explore deals",
      "hero.stat1": "Products",
      "hero.stat2": "Customers",
      "hero.stat3": "Rating",
      "hero.badgeCard1": "Fast delivery",
      "hero.badgeCard2": "within 2 - 4 days",
      "hero.scroll": "Scroll to explore",
      "hero.ninjaAlt": "Ninjawy ninja",

      "trust.1.title": "Fast shipping", "trust.1.sub": "To every governorate",
      "trust.2.title": "Quality guaranteed", "trust.2.sub": "100% authentic products",
      "trust.3.title": "Order via WhatsApp", "trust.3.sub": "Zero hassle",
      "trust.4.title": "Cash on delivery", "trust.4.sub": "Inspect, then pay",

      "stats.1": "Products in stock",
      "stats.2": "Happy customers",
      "stats.3": "Average rating",
      "stats.4": "Always-on support",

      "cat.eyebrow": "Explore the store",
      "cat.title": "Shop by <em>category</em>",
      "cat.desc": "Pick a category and find exactly what you need in seconds.",
      "cat.all": "All products",
      "cat.electronics": "Electronics",
      "cat.fashion": "Fashion",
      "cat.home": "Home",
      "cat.gaming": "Gaming",
      "cat.accessories": "Accessories",

      "prod.eyebrow": "Ninjawy picks",
      "prod.title": "Latest <em>products</em>",
      "prod.showAll": "Show all",
      "prod.addToCart": "Add to bag",
      "prod.added": "Added",
      "prod.results": "{n} products",
      "prod.emptyTitle": "No products yet",
      "prod.emptyDesc": "This category is empty for now — try another one or check back later.",
      "prod.sold": "{n} sold",
      "prod.quickAdd": "Quick add to bag",
      "prod.favAdd": "Added to favorites",
      "prod.favRemove": "Removed from favorites",

      "offer.tag": "Limited offer",
      "offer.title": "Step into the deals arena <span>and grab exclusive discounts</span>",
      "offer.desc": "Rotating offers on a hand-picked selection of products — for a limited time only.",
      "offer.cta": "Discover products",
      "offer.upTo": "Up to",
      "offer.off": "off",
      "offer.days": "Days",
      "offer.hours": "Hours",
      "offer.minutes": "Minutes",
      "offer.seconds": "Seconds",

      "rev.eyebrow": "Customer reviews",
      "rev.title": "Trust <em>earned</em>",
      "rev.desc": "Real experiences from customers who shopped with Ninjawy.",
      "rev.1.text": "My order arrived in two days, packaging was excellent and the service was respectful.",
      "rev.1.name": "Mahmoud Adel", "rev.1.role": "Cairo",
      "rev.2.text": "Cash on delivery is the best part — I inspected the product before paying.",
      "rev.2.name": "Sara Ibrahim", "rev.2.role": "Alexandria",
      "rev.3.text": "Great prices and better quality than expected. I'll definitely order again.",
      "rev.3.name": "Ahmed Samir", "rev.3.role": "Mansoura",

      "nl.eyebrow": "Be the first to know",
      "nl.title": "Join the <em>NINJAWY</em> community",
      "nl.desc": "One email a week with the best deals and new arrivals — no spam, ever.",
      "nl.placeholder": "Enter your email address",
      "nl.cta": "Subscribe",
      "nl.invalid": "Please enter a valid email address.",
      "nl.done": "Subscribed successfully ✦",

      "footer.about": "A modern shopping experience that brings curated products and exclusive deals together in one place. At ninja speed, with quality you can trust.",
      "footer.quick": "Quick links",
      "footer.help": "Help",
      "footer.contact": "Get in touch",
      "footer.shipping": "Shipping & delivery",
      "footer.returns": "Exchange & returns",
      "footer.payment": "Payment methods",
      "footer.faq": "FAQ",
      "footer.privacy": "Privacy policy",
      "footer.address": "Egypt — delivery to all governorates",
      "footer.hours": "Daily from 10 AM to 12 midnight",
      "footer.rights": "© 2026 NINJAWY — built at ninja speed <svg class=\"ic\" aria-hidden=\"true\"><use href=\"#i-mask\"/></svg>",
      "footer.dev": "Developed by <strong>yaseen amr abd el rahem</strong>",

      "cart.label": "Shopping bag",
      "cart.title": "Ninjawy bag",
      "cart.empty": "Your bag is empty",
      "cart.emptyHint": "Add products from the store and checkout in seconds.",
      "cart.summary": "{n} items · total {total}",
      "cart.details": "Order details",
      "cart.name": "Full name",
      "cart.phone": "Phone number",
      "cart.phone2": "Additional phone (optional)",
      "cart.city": "Governorate / City",
      "cart.address": "Full address",
      "cart.notes": "Order notes (optional)",
      "cart.total": "Total",
      "cart.clear": "Empty the bag",
      "cart.checkout": "Checkout via WhatsApp",
      "cart.checkingout": "Redirecting...",
      "cart.remove": "Remove",
      "cart.added": "Product added to your bag",
      "cart.removed": "Product removed from your bag",
      "cart.cleared": "Your bag has been emptied",
      "cart.isEmpty": "Your bag is currently empty.",
      "cart.needCustomer": "Please complete the customer details.",
      "cart.opened": "WhatsApp opened to complete your order",
      "cart.confirmClear": "Empty your bag?",

      "search.title": "Search for a product",
      "search.placeholder": "Type a product name...",
      "search.hint": "Try: headphones, watch, gaming...",
      "search.none": "No matching results.",

      "admin.loginTitle": "Admin sign in",
      "admin.username": "Username",
      "admin.password": "Password",
      "admin.loginBtn": "Enter admin panel",
      "admin.loginError": "Incorrect username or password.",
      "admin.panelTitle": "Product management",
      "admin.logout": "Log out",
      "admin.addTitle": "Add a new product",
      "admin.nameAr": "Product name (Arabic)",
      "admin.nameEn": "Product name (English)",
      "admin.descAr": "Description (Arabic)",
      "admin.descEn": "Description (English)",
      "admin.price": "Price (EGP)",
      "admin.oldPrice": "Price before discount (optional)",
      "admin.chooseCat": "Choose a category",
      "admin.iconLabel": "Product icon",
      "admin.imageLabel": "Choose a product image (optional)",
      "admin.imagePreview": "Image preview",
      "admin.addBtn": "Add product",
      "admin.listTitle": "Current products",
      "admin.delete": "Delete",
      "admin.added": "Product added successfully",
      "admin.deleted": "Product deleted.",
      "admin.fillAll": "Please complete the required product fields.",
      "admin.confirmDelete": "Delete this product?",
      "admin.loggedIn": "Signed in successfully",
      "admin.loggedOut": "Logged out",
      "admin.count": "{n} products",

      "common.currency": "EGP",
      "common.skip": "Skip to content",
      "common.close": "Close",
      "common.top": "Back to top",
      "common.theme.dark": "Dark mode enabled",
      "common.theme.light": "Light mode enabled",
      "common.lang": "Switched to English",

      "wa.title": "*New order from NINJAWY store*",
      "wa.customer": "*Customer details*",
      "wa.name": "Name",
      "wa.phone": "Phone",
      "wa.phone2": "Extra phone",
      "wa.none": "None",
      "wa.city": "City",
      "wa.address": "Address",
      "wa.notes": "Notes",
      "wa.products": "*Products*",
      "wa.qty": "Qty",
      "wa.price": "Price",
      "wa.itemTotal": "Item total",
      "wa.total": "*Grand total*",
      "wa.thanks": "Thank you for choosing NINJAWY ✦"
    }
  };

  let lang = "ar";
  const t = (key, vars) => {
    let str = (I18N[lang] && I18N[lang][key]) || I18N.ar[key] || key;
    if (vars) Object.keys(vars).forEach(k => { str = str.replace(new RegExp("\\{" + k + "\\}", "g"), vars[k]); });
    return str;
  };

  /* ---------------- CATALOG ---------------- */
  const CATEGORIES = ["all", "electronics", "fashion", "home", "gaming", "accessories"];
  const LEGACY_CATEGORIES = {
    "الكل": "all", "كل المنتجات": "all", "all": "all",
    "إلكترونيات": "electronics", "electronics": "electronics",
    "أزياء": "fashion", "fashion": "fashion",
    "منزل": "home", "home": "home",
    "ألعاب": "gaming", "gaming": "gaming",
    "إكسسوارات": "accessories", "accessories": "accessories"
  };
  const LEGACY_ICONS = { "🎧": "headset", "👜": "handbag", "💡": "lamp", "🎮": "gamepad", "⌚": "watch", "⌨️": "keyboard", "📦": "box", "🖱️": "mouse", "👕": "shirt", "🎁": "gift" };

  const defaultProducts = [
    {
      id: 1, category: "electronics", icon: "headset", price: 1299, oldPrice: 1699, rating: 4.8, sold: 320,
      ar: { name: "سماعات لاسلكية احترافية", desc: "صوت نقي وعزل للضوضاء وتصميم مريح للاستخدام اليومي." },
      en: { name: "Pro Wireless Headphones", desc: "Crisp sound, noise isolation and an all-day comfortable fit." }
    },
    {
      id: 2, category: "electronics", icon: "keyboard", price: 1099, oldPrice: 0, rating: 4.7, sold: 180,
      ar: { name: "لوحة مفاتيح ميكانيكية RGB", desc: "مفاتيح سريعة الاستجابة وإضاءة قابلة للتخصيص بالكامل." },
      en: { name: "RGB Mechanical Keyboard", desc: "Tactile switches with fully customizable backlighting." }
    },
    {
      id: 3, category: "gaming", icon: "gamepad", price: 1499, oldPrice: 1799, rating: 4.9, sold: 410,
      ar: { name: "وحدة تحكم لاسلكية", desc: "تحكم مريح واستجابة ممتازة لكل أنواع الألعاب." },
      en: { name: "Wireless Gaming Controller", desc: "Ergonomic grip and ultra-responsive inputs for every game." }
    },
    {
      id: 4, category: "gaming", icon: "mouse", price: 899, oldPrice: 0, rating: 4.6, sold: 250,
      ar: { name: "ماوس ألعاب لاسلكي", desc: "دقة عالية ووزن خفيف وبطارية تدوم طويلًا." },
      en: { name: "Wireless Gaming Mouse", desc: "High-precision sensor, feather-light body and long battery life." }
    },
    {
      id: 5, category: "accessories", icon: "watch", price: 2199, oldPrice: 2599, rating: 4.8, sold: 520,
      ar: { name: "ساعة ذكية أنيقة", desc: "تصميم حديث مع متابعة الصحة واللياقة والإشعارات." },
      en: { name: "Elegant Smart Watch", desc: "Modern design with health, fitness tracking and notifications." }
    },
    {
      id: 6, category: "fashion", icon: "handbag", price: 899, oldPrice: 1099, rating: 4.5, sold: 140,
      ar: { name: "حقيبة عصرية مميزة", desc: "تصميم أنيق وخامة متينة تناسب الاستخدام اليومي." },
      en: { name: "Modern Everyday Tote", desc: "Refined design and durable fabric built for daily use." }
    },
    {
      id: 7, category: "fashion", icon: "shirt", price: 349, oldPrice: 0, rating: 4.4, sold: 610,
      ar: { name: "تيشيرت قطن بريميوم", desc: "قطن 100% بقصة مريحة وألوان ثابتة لا تبهت." },
      en: { name: "Premium Cotton Tee", desc: "100% cotton, relaxed fit and fade-resistant colors." }
    },
    {
      id: 8, category: "home", icon: "lamp", price: 749, oldPrice: 899, rating: 4.7, sold: 230,
      ar: { name: "مصباح ذكي متعدد الألوان", desc: "إضاءة ذكية بـ 16 مليون لون تمنح غرفتك أجواء مميزة." },
      en: { name: "Smart Ambient Lamp", desc: "16M colors and app control to set the perfect mood." }
    },
    {
      id: 9, category: "accessories", icon: "gift", price: 599, oldPrice: 0, rating: 4.9, sold: 95,
      ar: { name: "صندوق هدايا ننجاوي", desc: "تشكيلة مفاجآت مختارة بعناية تصلك في صندوق أنيق." },
      en: { name: "Ninjawy Gift Box", desc: "A hand-picked surprise set delivered in a premium box." }
    }
  ];

  function normalizeProduct(p) {
    const iconRaw = p.icon || "box";
    const icon = LEGACY_ICONS[iconRaw] || (/^[a-z0-9-]+$/.test(iconRaw) ? iconRaw : "box");
    const category = LEGACY_CATEGORIES[p.category] || (CATEGORIES.includes(p.category) ? p.category : "accessories");
    const ar = p.ar || { name: p.name || p.name_ar || "", desc: p.description || p.desc_ar || "" };
    const en = p.en || { name: p.name_en || p.name || "", desc: p.desc_en || p.description || "" };
    return {
      id: Number(p.id) || Date.now(),
      category,
      icon,
      price: Number(p.price) || 0,
      oldPrice: Number(p.oldPrice || p.old_price || 0) || 0,
      rating: Number(p.rating) || 4.7,
      sold: Number(p.sold) || 0,
      image: p.image || "",
      ar: { name: ar.name || en.name || "Product", desc: ar.desc || en.desc || "" },
      en: { name: en.name || ar.name || "Product", desc: en.desc || ar.desc || "" }
    };
  }

  function readStore(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }
  function writeStore(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* quota / private mode */ }
  }

  let products = readStore(KEYS.products, null);
  products = Array.isArray(products) && products.length ? products.map(normalizeProduct) : defaultProducts.slice();

  const rawCart = readStore(KEYS.cart, []);
  let cart = Array.isArray(rawCart)
    ? rawCart.map(item => { const q = Number(item.quantity) || 1; return { ...normalizeProduct(item), quantity: q }; })
    : [];

  let favorites = readStore(KEYS.favorites, []);
  if (!Array.isArray(favorites)) favorites = [];
  let selectedCategory = "all";
  let uploadedImage = "";
  let selectedIcon = "box";

  /* ---------------- STATE HELPERS ---------------- */
  const pName = p => (p[lang] && p[lang].name) || p.ar.name || p.en.name || "";
  const pDesc = p => (p[lang] && p[lang].desc) || p.ar.desc || p.en.desc || "";
  const catLabel = c => t("cat." + c);
  const icon = (n, cls = "ic") => `<svg class="${cls}" aria-hidden="true"><use href="#i-${n}"/></svg>`;

  const numberFmt = () => new Intl.NumberFormat(lang === "ar" ? "ar-EG-u-nu-latn" : "en-US");
  function formatPrice(v) { return numberFmt().format(Number(v) || 0); }
  function money(v) { return lang === "ar" ? `${formatPrice(v)} ${t("common.currency")}` : `${t("common.currency")} ${formatPrice(v)}`; }
  function saveProducts() { writeStore(KEYS.products, products); }
  function saveCart() { writeStore(KEYS.cart, cart); }
  function saveFavorites() { writeStore(KEYS.favorites, favorites); }

  /* ---------------- ELEMENTS ---------------- */
  const $ = sel => document.querySelector(sel);
  const $$ = (sel, scope) => Array.from((scope || document).querySelectorAll(sel));
  const el = {
    root: document.documentElement,
    productsGrid: $("#productsGrid"),
    resultsCount: $("#resultsCount"),
    cartPanel: $("#cartPanel"),
    overlay: $("#overlay"),
    cartItems: $("#cartItems"),
    cartCount: $("#cartCount"),
    cartTotal: $("#cartTotal"),
    cartSummary: $("#cartSummary"),
    toast: $("#toast"),
    navbar: $("#navbar"),
    scrollProgress: $("#scrollProgress"),
    pageLoader: $("#pageLoader"),
    cursorDot: $("#cursorDot"),
    cursorRing: $("#cursorRing"),
    bgCanvas: $("#bgCanvas"),
    backToTop: $("#backToTop"),
    searchModal: $("#searchModal"),
    searchInput: $("#searchInput"),
    searchResults: $("#searchResults"),
    adminLoginModal: $("#adminLoginModal"),
    adminPanel: $("#adminPanel"),
    navLinks: $("#navLinks"),
    mobileMenuBtn: $("#mobileMenuBtn"),
    langSwitch: $(".lang-switch")
  };

  /* ---------------- TOAST ---------------- */
  let toastTimer;
  function showToast(message, type) {
    if (!el.toast) return;
    el.toast.querySelector(".toast-text").textContent = message;
    el.toast.querySelector(".toast-icon use").setAttribute("href", type === "error" ? "#i-alert" : "#i-check-circle");
    el.toast.classList.toggle("error", type === "error");
    el.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.toast.classList.remove("show"), 2900);
  }

  /* ---------------- THEME ---------------- */
  const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
  function getStoredTheme() {
    try { return localStorage.getItem(KEYS.theme); } catch (e) { return null; }
  }
  function applyTheme(theme, notify) {
    el.root.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#f4f5f9" : "#0a0a0e");
    try { localStorage.setItem(KEYS.theme, theme); } catch (e) { }
    if (window.NINJAWY_BG) window.NINJAWY_BG.syncColors();
    if (notify) showToast(t(theme === "light" ? "common.theme.light" : "common.theme.dark"));
  }
  function initTheme() {
    const stored = getStoredTheme();
    applyTheme(stored || (themeMedia.matches ? "light" : "dark"), false);
    const btn = $("#themeToggle");
    if (btn) btn.addEventListener("click", () => {
      const next = el.root.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next, true);
      btn.animate([{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }], { duration: 520, easing: "cubic-bezier(.34,1.56,.64,1)" });
    });
  }

  /* ---------------- LANGUAGE ---------------- */
  function applyI18n() {
    $$("[data-i18n]").forEach(node => { node.textContent = t(node.dataset.i18n); });
    $$("[data-i18n-html]").forEach(node => { node.innerHTML = t(node.dataset.i18nHtml); });
    $$("[data-i18n-ph]").forEach(node => { node.setAttribute("placeholder", t(node.dataset.i18nPh)); });
    $$("[data-i18n-aria]").forEach(node => { node.setAttribute("aria-label", t(node.dataset.i18nAria)); });
    $$("[data-i18n-alt]").forEach(node => { node.setAttribute("alt", t(node.dataset.i18nAlt)); });
    document.title = t("meta.title");
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("meta.description"));
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", t("meta.title"));
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", t("meta.description"));
    el.root.lang = lang;
    el.root.dir = lang === "ar" ? "rtl" : "ltr";
    if (el.langSwitch) {
      el.langSwitch.dataset.active = lang;
      $$(".lang-opt", el.langSwitch).forEach(b => {
        const on = b.dataset.lang === lang;
        b.classList.toggle("active", on);
        b.setAttribute("aria-pressed", String(on));
      });
    }
    renderReviews();
    renderCategoryCounts();
    renderProducts();
    renderCart();
    if (el.adminPanel && el.adminPanel.classList.contains("show")) renderAdminProducts();
    renderIconPicker();
  }

  function setLang(next, notify) {
    if (next !== "ar" && next !== "en") next = "ar";
    lang = next;
    try { localStorage.setItem(KEYS.lang, next); } catch (e) { }
    applyI18n();
    if (window.NINJAWY_BG) window.NINJAWY_BG.syncColors();
    if (notify) showToast(t("common.lang"));
  }

  function initLang() {
    let stored = null;
    try { stored = localStorage.getItem(KEYS.lang); } catch (e) { }
    if (!stored) stored = (navigator.language || "ar").slice(0, 2).toLowerCase() === "ar" ? "ar" : "en";
    lang = stored === "en" ? "en" : "ar";
    $$(".lang-opt").forEach(btn => btn.addEventListener("click", () => setLang(btn.dataset.lang, true)));
  }

  /* ---------------- LOADER ---------------- */
  function initLoader() {
    if (!el.pageLoader) return;
    const minTime = 1500, start = Date.now();
    const finish = () => {
      el.pageLoader.classList.add("hidden");
      document.body.style.overflow = "";
      $$(".hero .reveal").forEach((n, i) => setTimeout(() => n.classList.add("active"), i * 110));
    };
    window.addEventListener("load", () => setTimeout(finish, Math.max(0, minTime - (Date.now() - start))));
    setTimeout(() => { if (!el.pageLoader.classList.contains("hidden")) finish(); }, 2800);
  }

  /* ---------------- SCROLL: PROGRESS · NAVBAR · BACK TO TOP ---------------- */
  function initScroll() {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (el.scrollProgress) el.scrollProgress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
        if (el.navbar) el.navbar.classList.toggle("scrolled", y > 20);
        if (el.backToTop) el.backToTop.classList.toggle("show", y > 620);

        // hero parallax
        $$(".hero-glow").forEach((g, i) => {
          g.style.transform = `translateY(${y * (i + 1) * 0.035}px) translateX(${Math.sin(y * 0.0012 + i) * 12}px)`;
        });
        const ninja = $(".ninja-image");
        if (ninja && y < window.innerHeight * 1.4) ninja.style.translate = `0 ${y * 0.07}px`;

        // active nav link
        let current = "";
        $$("section[id]").forEach(sec => { if (y >= sec.offsetTop - 140) current = sec.id; });
        $$(".nav-link").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    if (el.backToTop) el.backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ---------------- HERO IMAGE ---------------- */
  function initHero() {
    const img = $(".ninja-image");
    const scene = $(".ninja-scene");
    if (!img || !scene) return;
    const ok = () => scene.classList.add("has-image");
    if (img.complete && img.naturalWidth > 0) ok();
    else {
      img.addEventListener("load", ok, { once: true });
      img.addEventListener("error", () => img.style.display = "none", { once: true });
    }
  }

  /* ---------------- CUSTOM CURSOR ---------------- */
  function initCursor() {
    if (window.matchMedia("(pointer: coarse)").matches || !el.cursorDot || !el.cursorRing) return;
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener("mousemove", e => {
      mx = e.clientX; my = e.clientY;
      el.cursorDot.style.left = mx + "px";
      el.cursorDot.style.top = my + "px";
    });
    (function loop() {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      el.cursorRing.style.left = rx + "px";
      el.cursorRing.style.top = ry + "px";
      requestAnimationFrame(loop);
    })();
    const HOVER = "a,button,.product-card,.category-card,.review-card,input,textarea,select,.search-result,.picker-opt";
    document.addEventListener("mouseover", e => {
      if (e.target.closest && e.target.closest(HOVER)) {
        el.cursorRing.classList.add("hover");
        el.cursorDot.style.transform = "translate(-50%,-50%) scale(1.5)";
      }
    });
    document.addEventListener("mouseout", e => {
      if (e.target.closest && e.target.closest(HOVER) && !(e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(HOVER))) {
        el.cursorRing.classList.remove("hover");
        el.cursorDot.style.transform = "translate(-50%,-50%) scale(1)";
      }
    });
    document.addEventListener("mousedown", () => { el.cursorRing.classList.add("active"); el.cursorDot.style.transform = "translate(-50%,-50%) scale(.8)"; });
    document.addEventListener("mouseup", () => { el.cursorRing.classList.remove("active"); el.cursorDot.style.transform = "translate(-50%,-50%) scale(1)"; });
    document.addEventListener("mouseleave", () => { el.cursorDot.style.opacity = "0"; el.cursorRing.style.opacity = "0"; });
    document.addEventListener("mouseenter", () => { el.cursorDot.style.opacity = "1"; el.cursorRing.style.opacity = "1"; });
  }

  /* ---------------- ANIMATED BACKGROUND (CANVAS) ---------------- */
  function initBackground() {
    const canvas = el.bgCanvas;
    if (!canvas || typeof canvas.getContext !== "function") return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1, particles = [], stars = [], raf = null, running = true;
    const mouse = { x: null, y: null, radius: 130 };
    let colors = { dot: "rgba(255,120,140,.85)", line: "rgba(255,90,115,.16)", star: "rgba(255,77,103,.30)" };

    function syncColors() {
      const cs = getComputedStyle(el.root);
      const dot = (cs.getPropertyValue("--particle") || "").trim();
      const line = (cs.getPropertyValue("--particle-line") || "").trim();
      const accent = (cs.getPropertyValue("--accent") || "").trim();
      if (dot) colors.dot = dot;
      if (line) colors.line = line;
      if (accent) colors.star = accent;
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function build() {
      const density = w < 700 ? 34 : w < 1200 ? 58 : 82;
      particles = Array.from({ length: density }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * .45, vy: (Math.random() - .5) * .45,
        r: Math.random() * 1.7 + .6, base: 0, a: Math.random() * .45 + .18
      }));
      particles.forEach(p => p.base = p.r);
      const starCount = w < 700 ? 3 : 6;
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28,
        s: Math.random() * 9 + 7, rot: Math.random() * Math.PI, vr: (Math.random() - .5) * .012,
        a: Math.random() * .25 + .12
      }));
    }

    function drawShuriken(s) {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rot);
      ctx.beginPath();
      const R = s.s, r = s.s * 0.28;
      for (let i = 0; i < 4; i++) {
        const a1 = (Math.PI / 2) * i;
        const a2 = a1 + Math.PI / 4;
        const a3 = a1 + Math.PI / 2;
        if (i === 0) ctx.moveTo(Math.cos(a1) * R, Math.sin(a1) * R);
        ctx.lineTo(Math.cos(a2) * r, Math.sin(a2) * r);
        ctx.lineTo(Math.cos(a3) * R, Math.sin(a3) * R);
      }
      ctx.closePath();
      ctx.globalAlpha = s.a;
      ctx.strokeStyle = colors.star || "rgba(255,77,103,.3)";
      ctx.lineWidth = 1.1;
      ctx.stroke();
      ctx.restore();
      ctx.globalAlpha = 1;
    }

    function step() {
      ctx.clearRect(0, 0, w, h);

      // connection lines
      ctx.lineWidth = .6;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 16900) {
            ctx.globalAlpha = (1 - Math.sqrt(d2) / 130) * .55;
            ctx.strokeStyle = colors.line;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      particles.forEach(p => {
        if (!reduce) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;
          if (mouse.x !== null) {
            const dx = mouse.x - p.x, dy = mouse.y - p.y;
            const dist = Math.hypot(dx, dy);
            if (dist < mouse.radius && dist > 0.01) {
              const f = (mouse.radius - dist) / mouse.radius;
              p.x -= dx * f * .022; p.y -= dy * f * .022;
              p.r = p.base + f * 2.1;
            } else p.r += (p.base - p.r) * .1;
          }
        }
        ctx.globalAlpha = p.a;
        ctx.fillStyle = colors.dot;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 1;

      stars.forEach(s => {
        if (!reduce) {
          s.x += s.vx; s.y += s.vy; s.rot += s.vr;
          if (s.x < -30) s.x = w + 30; if (s.x > w + 30) s.x = -30;
          if (s.y < -30) s.y = h + 30; if (s.y > h + 30) s.y = -30;
        }
        drawShuriken(s);
      });

      if (running && !reduce) raf = requestAnimationFrame(step);
    }

    function start() { if (!raf && !reduce) raf = requestAnimationFrame(step); }
    function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

    window.addEventListener("resize", () => { resize(); if (reduce) step(); }, { passive: true });
    window.addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    window.addEventListener("mouseout", () => { mouse.x = null; mouse.y = null; });
    document.addEventListener("visibilitychange", () => {
      running = !document.hidden;
      if (running) start(); else stop();
    });

    syncColors();
    resize();
    if (reduce) step(); else start();
    window.NINJAWY_BG = { syncColors: () => { syncColors(); if (reduce) step(); } };
  }

  /* ---------------- REVEAL ---------------- */
  let revealObserver;
  const revealActivated = new WeakSet();

  function revealNode(node) {
    // Fire once per node: `.active` is added exactly once and never removed,
    // so content can never disappear/reappear when the observer re-fires
    // (resize, layout shift, re-render). The CSS transition handles the
    // smooth, one-time entrance (see `.reveal` in style.css).
    if (!node || revealActivated.has(node)) return;
    revealActivated.add(node);
    node.classList.add("active");
  }

  function initReveal() {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const node = entry.target;
        const delay = parseInt(node.dataset.delay || "0", 10);
        revealObserver.unobserve(node);
        if (delay > 0) setTimeout(() => revealNode(node), delay);
        else revealNode(node);
      });
    }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
    observeReveals();
  }
  function observeReveals(scope) {
    if (!revealObserver) return;
    (scope ? $$(".reveal:not(.active)", scope) : $$(".reveal:not(.active)")).forEach(n => revealObserver.observe(n));
  }

  /* ---------------- MAGNETIC + TILT ---------------- */
  const isCoarse = () => window.matchMedia("(pointer: coarse)").matches;

  function initMagnetic(scope) {
    if (isCoarse()) return;
    const nodes = scope ? $$(".magnetic-btn:not([data-mag])", scope) : $$(".magnetic-btn:not([data-mag])");
    nodes.forEach(btn => {
      btn.dataset.mag = "1";
      btn.addEventListener("mousemove", e => {
        const r = btn.getBoundingClientRect();
        btn.style.translate = `${(e.clientX - r.left - r.width / 2) * .16}px ${(e.clientY - r.top - r.height / 2) * .3}px`;
      });
      btn.addEventListener("mouseleave", () => { btn.style.translate = "0 0"; });
    });
  }

  function initTilt(scope) {
    if (isCoarse()) return;
    const nodes = scope ? $$(".product-card:not([data-tilt]),.category-card:not([data-tilt])", scope) : $$(".product-card:not([data-tilt]),.category-card:not([data-tilt])");
    nodes.forEach(card => {
      card.dataset.tilt = "1";
      const isProduct = card.classList.contains("product-card");
      card.addEventListener("mousemove", e => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        const rotX = (y - r.height / 2) / (isProduct ? 20 : 26);
        const rotY = (r.width / 2 - x) / (isProduct ? 20 : 26);
        card.style.transform = `perspective(950px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${isProduct ? 1.015 : 1.02})`;
        card.style.setProperty("--mouse-x", (x / r.width) * 100 + "%");
        card.style.setProperty("--mouse-y", (y / r.height) * 100 + "%");
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  }

  /* ---------------- COUNT UP ---------------- */
  function initCountUp() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const node = entry.target;
        io.unobserve(node);
        const decimals = node.dataset.decimal ? 1 : 0;
        const target = parseFloat(node.dataset.decimal || node.dataset.count);
        if (!target) return;
        const duration = 1500, startTime = performance.now();
        const isPercent = node.parentElement && node.parentElement.classList.contains("offer-percent");
        (function tick(now) {
          const p = Math.min(1, (now - startTime) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          const value = target * eased;
          if (decimals) node.textContent = value.toFixed(1);
          else if (isPercent) node.textContent = numberFmt().format(Math.floor(value));
          else if (target >= 1000) node.textContent = "+" + numberFmt().format(Math.round(value / 1000)) + "K";
          else node.textContent = "+" + numberFmt().format(Math.floor(value)) + "K";
          if (p < 1) requestAnimationFrame(tick);
        })(startTime);
      });
    }, { threshold: .45 });
    $$("[data-count],[data-decimal]").forEach(n => io.observe(n));
  }

  /* ---------------- COUNTDOWN ---------------- */
  function initCountdown() {
    const boxes = { d: $("#cdDays"), h: $("#cdHours"), m: $("#cdMinutes"), s: $("#cdSeconds") };
    if (!boxes.d) return;
    let end = Number(readStore(KEYS.offerEnd, 0));
    if (!end || end < Date.now()) {
      end = Date.now() + 3 * 24 * 60 * 60 * 1000;
      writeStore(KEYS.offerEnd, end);
    }
    const pad = n => String(n).padStart(2, "0");
    function tick() {
      const diff = Math.max(0, end - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor(diff / 3600000) % 24;
      const m = Math.floor(diff / 60000) % 60;
      const s = Math.floor(diff / 1000) % 60;
      if (boxes.d.textContent !== pad(d)) { boxes.d.textContent = pad(d); pop(boxes.d); }
      if (boxes.h.textContent !== pad(h)) { boxes.h.textContent = pad(h); pop(boxes.h); }
      if (boxes.m.textContent !== pad(m)) { boxes.m.textContent = pad(m); pop(boxes.m); }
      if (boxes.s.textContent !== pad(s)) { boxes.s.textContent = pad(s); pop(boxes.s); }
      if (diff <= 0) { end = Date.now() + 3 * 86400000; writeStore(KEYS.offerEnd, end); }
    }
    function pop(node) {
      node.animate([{ transform: "translateY(-5px) scale(1.06)", opacity: .55 }, { transform: "none", opacity: 1 }], { duration: 320, easing: "cubic-bezier(.34,1.56,.64,1)" });
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------------- REVIEWS STARS ---------------- */
  function starsHTML(rating, cls = "stars-row") {
    let out = `<span class="${cls}" role="img" aria-label="${rating}/5">`;
    for (let i = 1; i <= 5; i++) {
      out += `<svg class="ic${i <= Math.round(rating) ? " on" : " off"}" aria-hidden="true"><use href="#i-star"/></svg>`;
    }
    return out + "</span>";
  }
  function renderReviews() {
    $$(".review-stars[data-stars]").forEach(node => {
      node.innerHTML = starsHTML(Number(node.dataset.stars), "review-stars");
    });
  }

  /* ---------------- CATEGORY COUNTS ---------------- */
  function renderCategoryCounts() {
    $$("[data-cat-count]").forEach(node => {
      const key = node.dataset.catCount;
      const n = key === "all" ? products.length : products.filter(p => p.category === key).length;
      node.textContent = n;
    });
  }

  /* ---------------- PRODUCTS ---------------- */
  let productsRenderedOnce = false;

  function visibleProducts() {
    return selectedCategory === "all" ? products : products.filter(p => p.category === selectedCategory);
  }

  function renderProducts() {
    if (!el.productsGrid) return;
    const list = visibleProducts();
    const firstRender = !productsRenderedOnce;
    if (el.resultsCount) el.resultsCount.textContent = t("prod.results", { n: numberFmt().format(list.length) });

    el.productsGrid.innerHTML = "";
    if (!list.length) {
      el.productsGrid.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">${icon("box")}</span>
          <strong>${t("prod.emptyTitle")}</strong>
          <span>${t("prod.emptyDesc")}</span>
        </div>`;
      productsRenderedOnce = true;
      return;
    }

    list.forEach((product, index) => {
      const fav = favorites.includes(product.id);
      const discount = product.oldPrice > product.price
        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
      const visual = product.image
        ? `<img src="${product.image}" class="product-image" alt="${escapeAttr(pName(product))}" loading="lazy">`
        : `<div class="product-placeholder">${icon(product.icon || "box")}</div>`;

      const card = document.createElement("article");
      // Cards are always rendered in their visible state — never in a hidden
      // `.reveal` state — so re-renders (language switch, category tap,
      // favorite toggle, admin edit) no longer make the text blink out and
      // reappear. A light one-shot entrance is applied on the first paint only.
      card.className = "product-card";
      card.style.setProperty("--i", index);
      card.innerHTML = `
        <div class="product-image-box">
          ${visual}
          <span class="product-badge">${catLabel(product.category)}</span>
          ${discount ? `<span class="discount-badge">${icon("bolt")} ${discount}%</span>` : ""}
          <button class="favorite-btn ${fav ? "active" : ""}" type="button" data-favorite="${product.id}"
                  aria-label="${t("prod.favAdd")}" aria-pressed="${fav}">${icon("heart")}</button>
        </div>
        <div class="product-info">
          <span class="product-category">${catLabel(product.category)}</span>
          <h3>${escapeHTML(pName(product))}</h3>
          <p class="product-description">${escapeHTML(pDesc(product))}</p>
          <div class="product-meta">
            ${starsHTML(product.rating)}
            <span class="product-sold">${t("prod.sold", { n: numberFmt().format(product.sold || 0) })}</span>
          </div>
          <div class="product-price-row">
            <strong class="product-price">${money(product.price)}</strong>
            ${discount ? `<span class="old-price">${money(product.oldPrice)}</span>` : ""}
          </div>
          <button class="add-btn magnetic-btn" type="button" data-add="${product.id}" aria-label="${t("prod.quickAdd")}">
            <span class="btn-text">${t("prod.addToCart")}</span>
            <span class="btn-icon">${icon("katana")}</span>
          </button>
        </div>`;
      el.productsGrid.appendChild(card);
    });

    bindProductEvents();
    initTilt(el.productsGrid);
    initMagnetic(el.productsGrid);

    // Gentle one-shot entrance on the very first paint only. Re-renders swap
    // content instantly, which keeps the page stable instead of flickering.
    if (firstRender) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      $$(".product-card", el.productsGrid).forEach((card, i) => {
        if (reduce || !card.animate) return;
        card.animate(
          [{ opacity: 0, transform: "translateY(18px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 460, delay: Math.min(i * 45, 360), easing: "cubic-bezier(.2,.8,.2,1)", fill: "backwards" }
        );
      });
    }
    productsRenderedOnce = true;
  }

  function bindProductEvents() {
    $$("[data-add]", el.productsGrid).forEach(btn => {
      if (btn.dataset.bound) return;
      btn.dataset.bound = "1";
      btn.addEventListener("click", () => {
        addToCart(Number(btn.dataset.add), btn);
      });
    });
    $$("[data-favorite]", el.productsGrid).forEach(btn => {
      if (btn.dataset.bound) return;
      btn.dataset.bound = "1";
      btn.addEventListener("click", () => {
        toggleFavorite(Number(btn.dataset.favorite));
        btn.animate([{ transform: "scale(1)" }, { transform: "scale(1.4)" }, { transform: "scale(1)" }], { duration: 420, easing: "cubic-bezier(.34,1.56,.64,1)" });
      });
    });
  }

  function toggleFavorite(id) {
    const has = favorites.includes(id);
    favorites = has ? favorites.filter(f => f !== id) : favorites.concat(id);
    saveFavorites();
    renderProducts();
    showToast(t(has ? "prod.favRemove" : "prod.favAdd"));
  }

  function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  const escapeAttr = escapeHTML;

  /* ---------------- CART ---------------- */
  const cartMotionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const activeCartFlights = new Set();
  const addButtonTimers = new WeakMap();

  function cancelCartFlights() {
    activeCartFlights.forEach(cancel => cancel());
  }
  window.addEventListener("pagehide", cancelCartFlights);
  window.addEventListener("resize", cancelCartFlights);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelCartFlights();
  });
  cartMotionPreference.addEventListener("change", cancelCartFlights);

  function pulseCart() {
    if (cartMotionPreference.matches || !Element.prototype.animate) return;
    // Replace only our arrival effects, not other button interactions.
    [$("#cartBtn"), el.cartCount].forEach(node => {
      if (!node) return;
      node.getAnimations().filter(animation => animation.id === "cart-arrival").forEach(animation => animation.cancel());
      const animation = node.animate([
        { transform: "scale(1)" },
        { transform: node === el.cartCount ? "scale(1.45)" : "translateY(-5px) scale(1.12)", offset: .4 },
        { transform: "scale(1)" }
      ], { duration: 460, easing: "cubic-bezier(.22,1,.36,1)" });
      animation.id = "cart-arrival";
    });
  }

  async function flyProductToCart(product, button) {
    const cartButton = $("#cartBtn");
    if (!button || !cartButton || document.hidden || cartMotionPreference.matches || !Element.prototype.animate) return;

    // Keep rapid clicks responsive without accumulating unlimited overlay nodes.
    if (activeCartFlights.size >= 4) activeCartFlights.values().next().value();
    const source = button.closest(".product-card")?.querySelector(".product-image, .product-placeholder");
    let origin = (source || button).getBoundingClientRect();
    if (origin.bottom <= 0 || origin.top >= window.innerHeight) origin = button.getBoundingClientRect();
    const size = Math.min(190, window.innerWidth * .38, window.innerHeight * .3);
    const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const start = { x: origin.left + origin.width / 2, y: Math.max(0, Math.min(window.innerHeight, origin.top + origin.height / 2)) };
    const direction = start.x < center.x ? -1 : 1;
    const flyer = document.createElement("div");
    flyer.className = "cart-flight";
    flyer.setAttribute("aria-hidden", "true");
    flyer.style.width = flyer.style.height = `${size}px`;
    const visual = document.createElement("div");
    visual.className = "cart-flight-visual";
    visual.innerHTML = icon(product.icon || "box");
    const sourceImage = source?.tagName === "IMG" ? source : null;
    if (product.image && (!sourceImage?.complete || sourceImage.naturalWidth > 0)) {
      const image = new Image();
      image.alt = "";
      image.draggable = false;
      image.addEventListener("error", () => image.remove(), { once: true });
      image.src = sourceImage?.currentSrc || product.image;
      visual.appendChild(image);
    }
    flyer.appendChild(visual);
    document.body.appendChild(flyer);

    let animation;
    const cancel = () => {
      animation?.cancel();
      flyer.remove();
      activeCartFlights.delete(cancel);
    };
    activeCartFlights.add(cancel);
    const transform = (x, y, scale, rotation = 0) =>
      `translate3d(${x - size / 2}px, ${y - size / 2}px, 0) rotate(${rotation}deg) scale(${scale})`;
    try {
      // Toss upward, overshoot slightly, then settle in the viewport center.
      animation = flyer.animate([
        { transform: transform(start.x, start.y, .42, direction * -12), opacity: .25, offset: 0 },
        { transform: transform(start.x + (center.x - start.x) * .38, Math.min(start.y, center.y) - size * .45, .8, direction * 9), opacity: 1, offset: .32 },
        { transform: transform(center.x, center.y - 12, 1.08, direction * -4), opacity: 1, offset: .68 },
        { transform: transform(center.x, center.y, 1), opacity: 1, offset: .86 },
        { transform: transform(center.x, center.y, 1), opacity: 1, offset: 1 }
      ], { duration: 780, easing: "cubic-bezier(.22,.7,.3,1)", fill: "forwards" });
      await animation.finished;

      // Measure again after the toss: scrolling can change the sticky header.
      const target = (el.cartPanel?.classList.contains("open")
        ? el.cartPanel.querySelector(".cart-header h3 .ic") : cartButton) || cartButton;
      const rect = target.getBoundingClientRect();
      const end = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      const control = { x: center.x + (end.x - center.x) * .2, y: Math.min(center.y, end.y) - 40 };
      const frames = Array.from({ length: 25 }, (_, i) => {
        const t = i / 24, u = 1 - t;
        return {
          transform: transform(u * u * center.x + 2 * u * t * control.x + t * t * end.x,
            u * u * center.y + 2 * u * t * control.y + t * t * end.y,
            1 - .94 * t, direction * 14 * t),
          opacity: t < .8 ? 1 : (1 - t) / .2,
          offset: t
        };
      });
      const departure = flyer.animate(frames, { duration: 560, easing: "cubic-bezier(.5,0,.8,.5)", fill: "forwards" });
      animation.cancel();
      animation = departure;
      await animation.finished;
      pulseCart();
    } catch (error) {
      // Cancellation (resize, hidden tab, reduced motion) must never affect cart data.
      if (error.name !== "AbortError") console.warn("Cart animation unavailable", error);
    } finally {
      cancel();
    }
  }

  function addToCart(id, button) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    const existing = cart.find(i => i.id === id);
    if (existing) existing.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    saveCart();
    renderCart();

    if (button) {
      clearTimeout(addButtonTimers.get(button));
      button.classList.add("added");
      const label = button.querySelector(".btn-text");
      if (label) label.textContent = t("prod.added");
      addButtonTimers.set(button, setTimeout(() => {
        if (label) label.textContent = t("prod.addToCart");
        button.classList.remove("added");
        addButtonTimers.delete(button);
      }, 1400));
    }

    // Persist immediately; the decorative flight never blocks or duplicates an order.
    void flyProductToCart(product, button);
    showToast(t("cart.added"));
  }

  function cartTotals() {
    return cart.reduce((acc, i) => ({ total: acc.total + i.price * i.quantity, qty: acc.qty + i.quantity }), { total: 0, qty: 0 });
  }

  function renderCart() {
    if (!el.cartItems) return;
    el.cartItems.innerHTML = "";

    if (!cart.length) {
      el.cartItems.innerHTML = `<div class="cart-empty"><strong>${t("cart.empty")}</strong><span>${t("cart.emptyHint")}</span></div>`;
      el.cartCount.textContent = "0";
      el.cartTotal.textContent = "0";
      if (el.cartSummary) el.cartSummary.textContent = "";
      $("#cartBtn")?.classList.remove("has-items");
      return;
    }

    cart.forEach((item, idx) => {
      // always show the freshest catalogue copy (keeps translations in sync)
      const fresh = products.find(p => p.id === item.id) || item;
      const visual = fresh.image
        ? `<img src="${fresh.image}" class="cart-item-image" alt="${escapeAttr(pName(fresh))}">`
        : `<div class="cart-item-image product-placeholder">${icon(fresh.icon || "box")}</div>`;
      const row = document.createElement("div");
      row.className = "cart-item";
      row.style.animationDelay = (idx * 55) + "ms";
      row.innerHTML = `
        ${visual}
        <div class="cart-item-info">
          <h4>${escapeHTML(pName(fresh))}</h4>
          <strong>${money(fresh.price * item.quantity)}</strong>
          <div class="cart-controls">
            <button class="qty-btn" type="button" data-increase="${item.id}" aria-label="+">${icon("plus")}</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" type="button" data-decrease="${item.id}" aria-label="-">${icon("minus")}</button>
            <button class="remove-cart-item" type="button" data-remove="${item.id}">${icon("trash")} ${t("cart.remove")}</button>
          </div>
        </div>`;
      el.cartItems.appendChild(row);
    });

    const { total, qty } = cartTotals();
    el.cartCount.textContent = qty;
    el.cartTotal.textContent = formatPrice(total);
    if (el.cartSummary) el.cartSummary.textContent = t("cart.summary", { n: numberFmt().format(qty), total: money(total) });
    $("#cartBtn")?.classList.add("has-items");

    $$("[data-increase]", el.cartItems).forEach(b => b.onclick = () => changeQuantity(Number(b.dataset.increase), 1));
    $$("[data-decrease]", el.cartItems).forEach(b => b.onclick = () => changeQuantity(Number(b.dataset.decrease), -1));
    $$("[data-remove]", el.cartItems).forEach(b => b.onclick = () => removeFromCart(Number(b.dataset.remove)));
  }

  function changeQuantity(id, amount) {
    const item = cart.find(p => p.id === id);
    if (!item) return;
    item.quantity += amount;
    if (item.quantity <= 0) cart = cart.filter(p => p.id !== id);
    saveCart(); renderCart();
  }

  function removeFromCart(id) {
    const node = document.querySelector(`[data-remove="${id}"]`)?.closest(".cart-item");
    const commit = () => { cart = cart.filter(i => i.id !== id); saveCart(); renderCart(); showToast(t("cart.removed")); };
    if (node) node.animate([{ opacity: 1, transform: "translateX(0)" }, { opacity: 0, transform: `translateX(${lang === "ar" ? 40 : -40}px)` }], { duration: 280, easing: "ease-in" }).onfinish = commit;
    else commit();
  }

  function openCart() {
    el.cartPanel.classList.add("open");
    el.overlay.classList.add("show");
    document.body.style.overflow = "hidden";
  }
  function closeCart() {
    el.cartPanel.classList.remove("open");
    el.overlay.classList.remove("show");
    document.body.style.overflow = "";
  }

  /* ---------------- WHATSAPP CHECKOUT ---------------- */
  function checkout() {
    if (!cart.length) { showToast(t("cart.isEmpty"), "error"); return; }
    const name = $("#customerName").value.trim();
    const phone = $("#customerPhone").value.trim();
    const extraPhone = $("#customerExtraPhone").value.trim();
    const city = $("#customerCity").value.trim();
    const address = $("#customerAddress").value.trim();
    const notes = $("#customerNotes").value.trim();
    if (!name || !phone || !city || !address) { showToast(t("cart.needCustomer"), "error"); return; }

    const btn = $("#checkoutBtn");
    const label = btn.querySelector(".btn-text");
    const original = label.textContent;
    label.textContent = t("cart.checkingout");
    btn.disabled = true;

    const { total } = cartTotals();
    const line = "━━━━━━━━━━━━━━";
    // 1 → 1️⃣ , 12 → 1️⃣2️⃣  (keycap digits work for any item number)
    const keycap = n => String(n).replace(/\d/g, d => `${d}\uFE0F\u20E3`);

    let msg = `🥷 ${t("wa.title")} 🛒\n\n${line}\n\n👤 ${t("wa.customer")}\n\n`;
    msg += `🧑 ${t("wa.name")}: ${name}\n`;
    msg += `📱 ${t("wa.phone")}: ${phone}\n`;
    msg += `☎️ ${t("wa.phone2")}: ${extraPhone || t("wa.none")}\n`;
    msg += `🏙️ ${t("wa.city")}: ${city}\n`;
    msg += `📍 ${t("wa.address")}: ${address}\n`;
    msg += `📝 ${t("wa.notes")}: ${notes || t("wa.none")}\n\n`;

    msg += `${line}\n\n🛍️ ${t("wa.products")}\n\n`;
    cart.forEach((item, i) => {
      const fresh = products.find(p => p.id === item.id) || item;
      const itemTotal = fresh.price * item.quantity;
      msg += `${keycap(i + 1)} ${pName(fresh)}\n`;
      msg += `📦 ${t("wa.qty")}: ${item.quantity}\n`;
      msg += `💵 ${t("wa.price")}: ${money(fresh.price)}\n`;
      msg += `🧾 ${t("wa.itemTotal")}: ${money(itemTotal)}\n\n`;
    });

    msg += `${line}\n\n💰 ${t("wa.total")}\n\n💳 *${money(total)}*\n\n${line}\n\n🙏 ${t("wa.thanks")}\n`;

    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
      label.textContent = original;
      btn.disabled = false;
      showToast(t("cart.opened"));
    }, 850);
  }

  /* ---------------- SEARCH ---------------- */
  function openSearch() {
    el.searchModal.classList.add("show");
    el.overlay.classList.add("show");
    setTimeout(() => el.searchInput.focus(), 120);
  }
  function closeSearch() {
    el.searchModal.classList.remove("show");
    el.overlay.classList.remove("show");
    el.searchInput.value = "";
    el.searchResults.innerHTML = "";
  }
  function runSearch() {
    const value = el.searchInput.value.trim().toLowerCase();
    el.searchResults.innerHTML = "";
    if (!value) return;
    const results = products.filter(p =>
      (pName(p) || "").toLowerCase().includes(value) ||
      (pDesc(p) || "").toLowerCase().includes(value) ||
      p.ar.name.toLowerCase().includes(value) || p.en.name.toLowerCase().includes(value) ||
      catLabel(p.category).toLowerCase().includes(value));
    if (!results.length) {
      el.searchResults.innerHTML = `<div class="search-result none">${icon("search")} ${t("search.none")}</div>`;
      return;
    }
    results.forEach((product, i) => {
      const row = document.createElement("div");
      row.className = "search-result";
      row.innerHTML = `<strong>${escapeHTML(pName(product))}</strong><em>${money(product.price)}</em>`;
      row.onclick = () => {
        selectCategory(product.category, false);
        closeSearch();
        $("#products").scrollIntoView({ behavior: "smooth", block: "start" });
      };
      el.searchResults.appendChild(row);
      row.animate([{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 300, delay: i * 45, easing: "ease-out", fill: "backwards" });
    });
  }

  /* ---------------- CATEGORIES ---------------- */
  function selectCategory(key, scroll) {
    selectedCategory = CATEGORIES.includes(key) ? key : "all";
    $$(".category-card").forEach(c => c.classList.toggle("active", c.dataset.category === selectedCategory));
    renderProducts();
    if (scroll) $("#products").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ---------------- ADMIN ---------------- */
  function openAdmin() {
    let session = null;
    try { session = localStorage.getItem(KEYS.admin); } catch (e) { }
    if (session === "true") openAdminPanel();
    else { el.adminLoginModal.classList.add("show"); el.overlay.classList.add("show"); }
  }
  function openAdminPanel() {
    el.adminPanel.classList.add("show");
    el.overlay.classList.add("show");
    renderAdminProducts();
    const dash = el.adminPanel.querySelector(".admin-dashboard");
    dash.animate([{ opacity: 0, transform: "translateY(22px) scale(.97)" }, { opacity: 1, transform: "none" }], { duration: 480, easing: "cubic-bezier(.34,1.56,.64,1)" });
  }
  function closeAllModals() {
    el.searchModal.classList.remove("show");
    el.adminLoginModal.classList.remove("show");
    el.adminPanel.classList.remove("show");
  }

  function renderIconPicker() {
    const wrap = $("#pickerOptions");
    if (!wrap) return;
    wrap.innerHTML = ICON_CHOICES.map(name =>
      `<button type="button" class="picker-opt ${name === selectedIcon ? "active" : ""}" data-icon="${name}" aria-label="${name}" title="${name}">${icon(name)}</button>`
    ).join("");
    $$(".picker-opt", wrap).forEach(btn => btn.addEventListener("click", () => {
      selectedIcon = btn.dataset.icon;
      $$(".picker-opt", wrap).forEach(b => b.classList.toggle("active", b === btn));
      btn.animate([{ transform: "scale(1)" }, { transform: "scale(1.22) rotate(10deg)" }, { transform: "scale(1)" }], { duration: 380, easing: "cubic-bezier(.34,1.56,.64,1)" });
    }));
  }

  function renderAdminProducts() {
    const list = $("#adminProductsList");
    const count = $("#adminCount");
    if (!list) return;
    list.innerHTML = "";
    if (count) count.textContent = t("admin.count", { n: numberFmt().format(products.length) });
    products.forEach((product, i) => {
      const visual = product.image
        ? `<img src="${product.image}" alt="${escapeAttr(pName(product))}">`
        : `<div class="product-placeholder">${icon(product.icon || "box")}</div>`;
      const row = document.createElement("div");
      row.className = "admin-product-item";
      row.style.animationDelay = (i * 40) + "ms";
      row.innerHTML = `
        ${visual}
        <div class="admin-product-info">
          <h4>${escapeHTML(pName(product))}</h4>
          <span>${money(product.price)}</span>
          <em>${catLabel(product.category)}</em>
        </div>
        <button class="delete-product-btn" type="button" data-delete-product="${product.id}">${icon("trash")} ${t("admin.delete")}</button>`;
      list.appendChild(row);
    });
    $$("[data-delete-product]", list).forEach(btn => btn.addEventListener("click", () => deleteProduct(Number(btn.dataset.deleteProduct))));
  }

  function deleteProduct(id) {
    if (!window.confirm(t("admin.confirmDelete"))) return;
    const node = document.querySelector(`[data-delete-product="${id}"]`)?.closest(".admin-product-item");
    const commit = () => {
      products = products.filter(p => p.id !== id);
      cart = cart.filter(p => p.id !== id);
      saveProducts(); saveCart();
      renderProducts(); renderCart(); renderAdminProducts(); renderCategoryCounts();
      showToast(t("admin.deleted"));
    };
    if (node) node.animate([{ opacity: 1, transform: "translateX(0)" }, { opacity: 0, transform: `translateX(${lang === "ar" ? 34 : -34}px)` }], { duration: 280, easing: "ease-in" }).onfinish = commit;
    else commit();
  }

  /* ---------------- EVENTS ---------------- */
  function bindEvents() {
    // cart
    $("#cartBtn").addEventListener("click", openCart);
    $("#closeCartBtn").addEventListener("click", closeCart);
    $("#clearCartBtn").addEventListener("click", () => {
      if (!cart.length) return;
      if (!window.confirm(t("cart.confirmClear"))) return;
      $$(".cart-item", el.cartItems).forEach((node, i) => {
        node.animate([{ opacity: 1, transform: "translateX(0)" }, { opacity: 0, transform: `translateX(${lang === "ar" ? 30 : -30}px)` }], { duration: 240, delay: i * 40, easing: "ease-in" });
      });
      setTimeout(() => { cart = []; saveCart(); renderCart(); showToast(t("cart.cleared")); }, cart.length * 40 + 240);
    });
    $("#checkoutBtn").addEventListener("click", checkout);
    el.overlay.addEventListener("click", () => { closeCart(); closeAllModals(); });

    // search
    $("#searchBtn").addEventListener("click", openSearch);
    $("#closeSearchBtn").addEventListener("click", closeSearch);
    el.searchInput.addEventListener("input", runSearch);
    el.searchInput.addEventListener("keydown", e => { if (e.key === "Enter") e.preventDefault(); });

    // categories
    $$(".category-card").forEach(btn => btn.addEventListener("click", () => {
      btn.animate([{ transform: "scale(1)" }, { transform: "scale(1.06)" }, { transform: "scale(1)" }], { duration: 400, easing: "cubic-bezier(.34,1.56,.64,1)" });
      selectCategory(btn.dataset.category, true);
    }));
    $("#showAllBtn").addEventListener("click", () => selectCategory("all", false));

    // newsletter
    $("#newsletterForm").addEventListener("submit", e => {
      e.preventDefault();
      const input = $("#newsletterEmail");
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim());
      if (!valid) {
        showToast(t("nl.invalid"), "error");
        input.animate([{ transform: "translateX(0)" }, { transform: "translateX(-7px)" }, { transform: "translateX(7px)" }, { transform: "translateX(0)" }], { duration: 320 });
        input.focus();
        return;
      }
      e.target.reset();
      showToast(t("nl.done"));
    });

    // mobile menu
    el.mobileMenuBtn.addEventListener("click", () => {
      const open = el.navLinks.classList.toggle("show");
      el.mobileMenuBtn.classList.toggle("active", open);
      el.mobileMenuBtn.setAttribute("aria-expanded", String(open));
    });
    $$(".nav-links a, .nav-links button").forEach(a => a.addEventListener("click", () => {
      el.navLinks.classList.remove("show");
      el.mobileMenuBtn.classList.remove("active");
      el.mobileMenuBtn.setAttribute("aria-expanded", "false");
    }));

    // admin
    $("#adminOpenBtn").addEventListener("click", openAdmin);
    $("#adminOpenBtnMobile").addEventListener("click", openAdmin);
    $("#closeAdminLogin").addEventListener("click", () => { el.adminLoginModal.classList.remove("show"); el.overlay.classList.remove("show"); });
    $("#closeAdminPanel").addEventListener("click", () => { el.adminPanel.classList.remove("show"); el.overlay.classList.remove("show"); });
    $("#logoutAdminBtn").addEventListener("click", () => {
      try { localStorage.removeItem(KEYS.admin); } catch (e) { }
      el.adminPanel.classList.remove("show");
      el.overlay.classList.remove("show");
      showToast(t("admin.loggedOut"));
    });
    $("#adminLoginForm").addEventListener("submit", e => {
      e.preventDefault();
      const username = $("#adminUsername").value.trim();
      const password = $("#adminPassword").value;
      const error = $("#loginError");
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        try { localStorage.setItem(KEYS.admin, "true"); } catch (err) { }
        error.textContent = "";
        el.adminLoginModal.classList.remove("show");
        el.overlay.classList.remove("show");
        openAdminPanel();
        e.target.reset();
        showToast(t("admin.loggedIn"));
      } else {
        error.textContent = t("admin.loginError");
        error.animate([{ transform: "translateX(0)" }, { transform: "translateX(-7px)" }, { transform: "translateX(7px)" }, { transform: "translateX(0)" }], { duration: 320 });
      }
    });

    // admin product form
    $("#productImage").addEventListener("change", e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        uploadedImage = ev.target.result;
        const preview = $("#imagePreview");
        preview.innerHTML = `<img src="${uploadedImage}" alt="preview">`;
        preview.animate([{ opacity: 0, transform: "scale(.94)" }, { opacity: 1, transform: "scale(1)" }], { duration: 380, easing: "ease-out" });
      };
      reader.readAsDataURL(file);
    });

    $("#addProductForm").addEventListener("submit", e => {
      e.preventDefault();
      const nameAr = $("#productNameAr").value.trim();
      const nameEn = $("#productNameEn").value.trim();
      const descAr = $("#productDescriptionAr").value.trim();
      const descEn = $("#productDescriptionEn").value.trim();
      const price = Number($("#productPrice").value);
      const oldPrice = Number($("#productOldPrice").value) || 0;
      const category = $("#productCategory").value;
      if (!nameAr || !descAr || !price || !category) { showToast(t("admin.fillAll"), "error"); return; }

      products.unshift(normalizeProduct({
        id: Date.now(), category, icon: selectedIcon, price,
        oldPrice: oldPrice > price ? oldPrice : 0,
        rating: 5, sold: 0, image: uploadedImage,
        ar: { name: nameAr, desc: descAr },
        en: { name: nameEn || nameAr, desc: descEn || descAr }
      }));
      saveProducts();
      renderProducts(); renderAdminProducts(); renderCategoryCounts();
      e.target.reset();
      uploadedImage = "";
      $("#imagePreview").textContent = t("admin.imagePreview");
      showToast(t("admin.added"));
    });

    // keyboard
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") { closeCart(); closeAllModals(); }
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) { e.preventDefault(); openSearch(); }
    });

    // input focus helper
    document.addEventListener("focusin", e => {
      if (e.target.matches("input,textarea")) e.target.closest(".input-wrapper")?.classList.add("focused");
    });
    document.addEventListener("focusout", e => {
      if (e.target.matches("input,textarea")) e.target.closest(".input-wrapper")?.classList.remove("focused");
    });
  }

  /* ---------------- INIT ---------------- */
  function init() {
    initLang();
    initTheme();
    initReveal();
    initLoader();
    initHero();
    initScroll();
    initCursor();
    initBackground();
    applyI18n();          // renders every dynamic section in the active language
    initMagnetic();
    initTilt();
    initCountUp();
    initCountdown();
    bindEvents();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
