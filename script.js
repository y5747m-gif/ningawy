(function () {
  "use strict";
const WHATSAPP_NUMBER = "201500721881";
  const ADMIN_USERNAME = "yaseen";
  const ADMIN_PASSWORD = "NINJAWY2026";
  const KEYS = {
    products: "ninjawy_products",
    cart: "ninjawy_cart",
    favorites: "ninjawy_favorites",
    admin: "ninjawy_admin_session",
    theme: "ninjawy_theme",
    lang: "ninjawy_lang",
    offerEnd: "ninjawy_offer_end",
    requestDraft: "ninjawy_request_draft",
    requests: "ninjawy_requests"
  };
  const ICON_CHOICES = ["box", "headset", "keyboard", "gamepad", "mouse", "watch", "handbag", "shirt", "lamp", "gift", "bag", "sound"];
const I18N = {
    ar: {
      "meta.title": "لفة | LAFFA — تسوّق بوضوح وثقة",
      "meta.description": "لفة - منتجات مختارة وعروض حصرية بتجربة خفيفة وسريعة، توصيل لكل المحافظات ودفع عند الاستلام.",
      "brand.name": "لفة",
                        "marquee.3": "توصيل لكل المحافظات · دفع عند الاستلام",
      "nav.home": "الرئيسية",
      "nav.categories": "الأقسام",
      "nav.products": "المنتجات",
      "nav.offers": "العروض",
      "nav.reviews": "آراء العملاء",
      "nav.request": "اطلب منتجك",
      "nav.admin": "الإدارة",
      "nav.menu": "القائمة",
      "nav.search": "بحث",
      "nav.cart": "سلة المشتريات",
      "nav.theme": "تبديل بين الوضع الداكن والفاتح",
      "hero.badge": "لفة للتوصيل السريع",
      "hero.title1": "مش تدور...",
      "hero.title2": "إحنا نجيّبلك!",
      "hero.desc": "متجر حديث يجمع لك المنتجات المميزة والعروض الحصرية وتجربة تسوق سريعة وسهلة في مكان واحد.",
      "hero.cta1": "تسوق الآن",
      "hero.cta2": "اكتشف العروض",
                                          
      "why.title": "لماذا لفة؟",
      "why.sub": "تسوّق واضح، سريع، وبدون تعقيد",
      "trust.1.title": "شحن سريع", "trust.1.sub": "لكل المحافظات",
      "trust.2.title": "ضمان الجودة", "trust.2.sub": "منتجات أصلية 100%",
      "trust.3.title": "طلب عبر واتساب", "trust.3.sub": "بدون تعقيد",
      "trust.4.title": "دفع عند الاستلام", "trust.4.sub": "افحص ثم ادفع",
      "stats.1": "منتج متوفر",
      "stats.2": "عميل سعيد",
      "stats.3": "متوسط التقييم",
      "stats.4": "دعم مستمر",
      "cat.eyebrow": "استكشف المتجر",
      "cat.title": "أقسام <em>لفة</em>",
      "cat.desc": "تسوّق حسب القسم واختار ما يناسبك في ثوانٍ.",
      "cat.all": "كل المنتجات",
      "cat.electronics": "إلكترونيات",
      "cat.fashion": "أزياء",
      "cat.home": "منزل",
      "cat.gaming": "ألعاب",
      "cat.accessories": "إكسسوارات",
      "prod.eyebrow": "مختارات لفة",
      "prod.title": "أحدث <em>المنتجات</em>",
      "prod.showAll": "عرض الكل",
      "prod.addToCart": "أضف للسلة",
      "prod.added": "تمت الإضافة",
      "prod.results": "{n} منتج",
      "prod.emptyTitle": "لا توجد منتجات",
      "prod.emptyDesc": "هذا القسم فارغ حاليًا، جرّب قسمًا آخر أو عد لاحقًا.",
      "prod.sold": "بيع {n}",
      "prod.quickAdd": "إضافة سريعة للسلة",
      "prod.new": "جديد",
      "prod.authentic": "أصلي",
      "prod.inStock": "متوفر في المخزون",
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
      
      "rev.eyebrow": "آراء العملاء",
      "rev.title": "ثقة <em>تستحقها</em>",
      "rev.desc": "تجارب حقيقية من عملاء اشتروا من لفة.",
      "rev.1.text": "الطلب وصل في يومين والتغليف ممتاز، والتعامل كان محترم جدًا.",
      "rev.1.name": "محمود عادل", "rev.1.role": "القاهرة",
      "rev.2.text": "أحسن حاجة إن الدفع عند الاستلام، فحصت المنتج قبل ما أدفع.",
      "rev.2.name": "سارة إبراهيم", "rev.2.role": "الإسكندرية",
      "rev.3.text": "الأسعار منافسة والجودة أعلى من المتوقع، هرجع أشتري تاني أكيد.",
      "rev.3.name": "أحمد سمير", "rev.3.role": "المنصورة",
      "nl.eyebrow": "كن أول من يعرف العروض",
      "nl.title": "انضم إلى مجتمع <em>لفة</em>",
      "nl.desc": "رسالة واحدة أسبوعيًا بأهم العروض والمنتجات الجديدة — بدون إزعاج.",
      "nl.placeholder": "اكتب بريدك الإلكتروني",
      "nl.cta": "اشترك الآن",
      "nl.invalid": "من فضلك اكتب بريدًا إلكترونيًا صحيحًا.",
      "nl.done": "تم الاشتراك بنجاح ✦",
      "rq.ctaTitle": "مالقيتش الي بتدور عليه؟",
      "rq.ctaDesc": "اكتبلنا مواصفات المنتج الي محتاجه وإحنا نجيبه لك.",
      "rq.ctaBtn": "اطلب منتجك",
      "rq.eyebrow": "اطلب الي محتاجه",
      "rq.title": "اكتب مواصفات <em>منتجك</em> وإحنا نجيبه",
      "rq.desc": "مالقيتش الي بتدور عليه؟ اكتب تفاصيل المنتج ومواصفاته وإحنا نرد عليك بالمتاح والسعر ومدة التوصيل.",
      "rq.step1": "اكتب الطلب",
      "rq.step1sub": "اسم المنتج وتفاصيله",
      "rq.step2": "نتواصل معاك",
      "rq.step2sub": "نأكد السعر والمدة",
      "rq.step3": "يوصلك لبابك",
      "rq.step3sub": "وتدفع عند الاستلام",
      "rq.specTitle": "مواصفات المنتج",
      "rq.contactTitle": "بياناتك والتواصل",
      "rq.nameLabel": "اسم المنتج أو نوعه *",
      "rq.namePh": "مثال: سماعات بلوتوث لاسلكية",
      "rq.catLabel": "القسم الأقرب للمنتج",
      "rq.catAny": "مش متأكد / قسم تاني",
      "rq.colorLabel": "اللون (اختياري)",
      "rq.colorPh": "أسود / أبيض...",
      "rq.sizeLabel": "المقاس أو الكمية (اختياري)",
      "rq.sizePh": "مثال: 42 أو 3 قطع",
      "rq.budgetLabel": "ميزانيتك التقريبية (اختياري)",
      "rq.budgetPh": "مثال: 1500",
      "rq.specsLabel": "المواصفات المطلوبة *",
      "rq.specsPh": "اكتب المواصفات بالتفصيل: الخامة، الحجم، الإمكانيات، العلامة التجارية...",
      "rq.specsHint": "كل ما كانت التفاصيل أوضح، كل ما قدرنا نجيب لك الأنسب.",
      "rq.refLabel": "لينك أو صورة مرجعية (اختياري)",
      "rq.refPh": "https://...",
      "rq.contactNameLabel": "الاسم *",
      "rq.contactNamePh": "الاسم بالكامل",
      "rq.phoneLabel": "رقم الهاتف *",
      "rq.phonePh": "01xxxxxxxxx",
      "rq.cityLabel": "المحافظة / المدينة *",
      "rq.cityPh": "المحافظة / المدينة",
      "rq.urgencyLabel": "محتاجه إمتى؟",
      "rq.urgencyFlexible": "مش مستعجل",
      "rq.urgencySoon": "خلال أسبوع",
      "rq.urgencyUrgent": "مستعجل جدًا",
      "rq.notesLabel": "تفاصيل إضافية (اختياري)",
      "rq.notesPh": "أي ملاحظات تانية تحب تضيفها",
      "rq.previewTitle": "ملخص طلبك",
      "rq.previewEmpty": "لسه مفيش بيانات — اكتب اسم المنتج ومواصفاته وهتلاقي الملخص هنا.",
      "rq.cta": "ابعت الطلب عبر واتساب",
      "rq.save": "حفظ الطلب",
      "rq.reset": "تفريغ",
      "rq.foot": "الطلب مبدئي — بنأكده معاك على واتساب قبل أي دفع. الدفع عند الاستلام.",
      "rq.savedTitle": "طلباتك المحفوظة",
      "rq.savedCount": "{n} طلب",
      "rq.saved": "تم حفظ الطلب على جهازك",
      "rq.savedDeleted": "تم حذف الطلب المحفوظ",
      "rq.savedCleared": "تم حذف كل الطلبات المحفوظة",
      "rq.needFields": "اكتب اسم المنتج ومواصفاته وبياناتك الأساسية.",
      "rq.needSpecs": "اكتب مواصفات المنتج المطلوب.",
      "rq.needContact": "أكمل اسمك ورقم هاتفك والمحافظة.",
      "rq.opened": "تم فتح واتساب لإرسال الطلب",
      "rq.resetDone": "تم تفريغ الطلب",
      "rq.confirmDelete": "هل تريد حذف هذا الطلب المحفوظ؟",
      "rq.fillBtn": "املأ الطلب",
      "rq.delete": "حذف",
      "rq.specs": "المواصفات",
      "rq.qty": "المقاس / الكمية",
      "rq.color": "اللون",
      "rq.budget": "الميزانية",
      "rq.urgency": "ميعاد الاحتياج",
      "rq.ref": "مرجع",
      "rq.notes": "ملاحظات إضافية",
      "rq.detailsHead": "*تفاصيل الطلب الخاص*",
      "rq.customerHead": "*بيانات العميل*",
      "rq.specHead": "*مواصفات المنتج المطلوب*",
      "rq.thanks": "شكرًا لثقتك في لفة — بنراجع الطلب وهنرد عليك بالمتاح والسعر ✦",
      "footer.about": "لفة يجمع المنتجات المميزة والعروض الحصرية في تجربة تسوق بسيطة وسريعة، بجودة تثق بها.",
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
      "footer.rights": "© 2026 LAFFA — جميع الحقوق محفوظة",
      "footer.dev": "تطوير <strong>yaseen amr abd el rahem</strong>",
      "cart.label": "سلة المشتريات",
      "cart.title": "حقيبة لفة",
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
      "cart.popupBlocked": "تعذر فتح واتساب. اسمح بالنوافذ المنبثقة ثم حاول مجددًا.",
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
      "admin.editTitle": "تعديل المنتج",
      "admin.nameAr": "اسم المنتج (عربي)",
      "admin.nameEn": "اسم المنتج (إنجليزي — يترجم تلقائيًا)",
      "admin.descAr": "وصف المنتج (عربي)",
      "admin.descEn": "وصف المنتج (إنجليزي — يترجم تلقائيًا)",
      "admin.autoTranslateHint": "الترجمة التلقائية للإنجليزية مفعّلة عند الكتابة بالعربي",
      "admin.translateNow": "ترجمة فورية",
      "admin.translated": "تمت الترجمة التلقائية للإنجليزية ✦",
      "admin.price": "السعر بالجنيه",
      "admin.oldPrice": "السعر قبل الخصم (اختياري)",
      "admin.chooseCat": "اختر القسم",
      "admin.iconLabel": "أيقونة المنتج",
      "admin.imageLabel": "اختر صورة للمنتج (اختياري)",
      "admin.imageChangeLabel": "تغيير صورة المنتج",
      "admin.removeImage": "إزالة الصورة",
      "admin.imagePreview": "معاينة الصورة",
      "admin.imageProcessing": "جاري تجهيز الصورة...",
      "admin.imageTooLarge": "الصورة كبيرة جدًا. اختر صورة أصغر من 8 ميجابايت.",
      "admin.imageError": "تعذر قراءة الصورة. جرّب صورة أخرى.",
      "admin.addBtn": "إضافة المنتج",
      "admin.saveChanges": "حفظ التعديلات",
      "admin.saveAsNew": "إضافة كنسخة جديدة",
      "admin.cancelEdit": "إلغاء التعديل",
      "admin.listTitle": "المنتجات الحالية",
      "admin.edit": "تعديل",
      "admin.duplicate": "تكرار",
      "admin.delete": "حذف",
      "admin.added": "تمت إضافة المنتج بنجاح",
      "admin.updated": "تم حفظ تعديلات المنتج بنجاح",
      "admin.duplicated": "تمت إضافة نسخة جديدة من المنتج بنجاح",
      "admin.editingNow": "وضع التعديل: عدّل البيانات أو الصورة ثم اضغط حفظ",
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
      "wa.title": "*طلب جديد من متجر لفة | LAFFA*",
      "wa.customer": "*بيانات العميل*",
      "wa.name": "الاسم",
      "wa.phone": "رقم الهاتف",
      "wa.phone2": "رقم إضافي",
      "wa.none": "لا يوجد",
      "wa.city": "المدينة",
      "wa.address": "العنوان",
      "wa.notes": "الملاحظات",
      "wa.products": "*تفاصيل المنتجات المطلوبة*",
      "wa.category": "القسم",
      "wa.details": "التفاصيل",
      "wa.qty": "الكمية",
      "wa.price": "السعر",
      "wa.oldPrice": "بدلًا من",
      "wa.itemTotal": "إجمالي المنتج",
      "wa.summary": "*ملخص الطلب*",
      "wa.totalQty": "إجمالي عدد القطع",
      "wa.payment": "طريقة الدفع",
      "wa.cod": "الدفع عند الاستلام",
      "wa.total": "*الإجمالي النهائي*",
      "wa.thanks": "شكرًا لاختيارك لفة — سيتم التواصل معك لتأكيد الطلب ✦"
    },
    en: {
      "meta.title": "LAFFA — Shop with confidence",
      "meta.description": "LAFFA - a lightweight storefront with hand-picked products, exclusive deals, nationwide delivery and cash on delivery.",
      "brand.name": "Laffa",
                        "marquee.3": "Nationwide delivery · Cash on delivery",
      "nav.home": "Home",
      "nav.categories": "Categories",
      "nav.products": "Products",
      "nav.offers": "Deals",
      "nav.reviews": "Reviews",
      "nav.request": "Request a product",
      "nav.admin": "Admin",
      "nav.menu": "Menu",
      "nav.search": "Search",
      "nav.cart": "Shopping bag",
      "nav.theme": "Toggle dark / light mode",
      "hero.badge": "Laffa fast delivery",
      "hero.title1": "No need to search...",
      "hero.title2": "We bring it to you!",
      "hero.desc": "A modern store that brings you curated products, exclusive deals and a fast, effortless shopping experience — all in one place.",
      "hero.cta1": "Shop now",
      "hero.cta2": "Explore deals",
                                          
      "why.title": "Why Laffa?",
      "why.sub": "Clear, fast and effortless shopping",
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
      "prod.eyebrow": "Laffa picks",
      "prod.title": "Latest <em>products</em>",
      "prod.showAll": "Show all",
      "prod.addToCart": "Add to bag",
      "prod.added": "Added",
      "prod.results": "{n} products",
      "prod.emptyTitle": "No products yet",
      "prod.emptyDesc": "This category is empty for now — try another one or check back later.",
      "prod.sold": "{n} sold",
      "prod.quickAdd": "Quick add to bag",
      "prod.new": "New",
      "prod.authentic": "Authentic",
      "prod.inStock": "In stock",
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
      
      "rev.eyebrow": "Customer reviews",
      "rev.title": "Trust <em>earned</em>",
      "rev.desc": "Real experiences from customers who shopped with Laffa.",
      "rev.1.text": "My order arrived in two days, packaging was excellent and the service was respectful.",
      "rev.1.name": "Mahmoud Adel", "rev.1.role": "Cairo",
      "rev.2.text": "Cash on delivery is the best part — I inspected the product before paying.",
      "rev.2.name": "Sara Ibrahim", "rev.2.role": "Alexandria",
      "rev.3.text": "Great prices and better quality than expected. I'll definitely order again.",
      "rev.3.name": "Ahmed Samir", "rev.3.role": "Mansoura",
      "nl.eyebrow": "Be the first to know",
      "nl.title": "Join the <em>LAFFA</em> community",
      "nl.desc": "One email a week with the best deals and new arrivals — no spam, ever.",
      "nl.placeholder": "Enter your email address",
      "nl.cta": "Subscribe",
      "nl.invalid": "Please enter a valid email address.",
      "nl.done": "Subscribed successfully ✦",
      "rq.ctaTitle": "Did not find what you need?",
      "rq.ctaDesc": "Send us the specs of the product you are after and we will source it for you.",
      "rq.ctaBtn": "Request a product",
      "rq.eyebrow": "Tell us what you need",
      "rq.title": "Describe <em>your product</em> and we will find it",
      "rq.desc": "Could not find what you are looking for? Write down the details and specs, and we will reply with availability, price and delivery time.",
      "rq.step1": "Write the request",
      "rq.step1sub": "Product name and details",
      "rq.step2": "We contact you",
      "rq.step2sub": "Confirm price and timing",
      "rq.step3": "Delivered to you",
      "rq.step3sub": "Pay on delivery",
      "rq.specTitle": "Product specs",
      "rq.contactTitle": "Your details",
      "rq.nameLabel": "Product name or type *",
      "rq.namePh": "e.g. Wireless Bluetooth headphones",
      "rq.catLabel": "Closest category",
      "rq.catAny": "Not sure / another category",
      "rq.colorLabel": "Color (optional)",
      "rq.colorPh": "Black / white...",
      "rq.sizeLabel": "Size or quantity (optional)",
      "rq.sizePh": "e.g. 42 or 3 pieces",
      "rq.budgetLabel": "Approximate budget (optional)",
      "rq.budgetPh": "e.g. 1500",
      "rq.specsLabel": "Required specs *",
      "rq.specsPh": "Describe the specs in detail: material, size, features, brand...",
      "rq.specsHint": "The clearer the details, the better we can source the right item.",
      "rq.refLabel": "Reference link (optional)",
      "rq.refPh": "https://...",
      "rq.contactNameLabel": "Name *",
      "rq.contactNamePh": "Full name",
      "rq.phoneLabel": "Phone number *",
      "rq.phonePh": "01xxxxxxxxx",
      "rq.cityLabel": "Governorate / city *",
      "rq.cityPh": "Governorate / city",
      "rq.urgencyLabel": "When do you need it?",
      "rq.urgencyFlexible": "No rush",
      "rq.urgencySoon": "Within a week",
      "rq.urgencyUrgent": "Urgent",
      "rq.notesLabel": "Extra details (optional)",
      "rq.notesPh": "Anything else you would like to add",
      "rq.previewTitle": "Request summary",
      "rq.previewEmpty": "No data yet — add the product name and specs and your summary will show up here.",
      "rq.cta": "Send request via WhatsApp",
      "rq.save": "Save request",
      "rq.reset": "Clear",
      "rq.foot": "This is a preliminary request — we confirm everything on WhatsApp before any payment. Cash on delivery.",
      "rq.savedTitle": "Your saved requests",
      "rq.savedCount": "{n} requests",
      "rq.saved": "Request saved on your device",
      "rq.savedDeleted": "Saved request deleted",
      "rq.savedCleared": "All saved requests deleted",
      "rq.needFields": "Add the product name, specs and your contact details.",
      "rq.needSpecs": "Please describe the product specs.",
      "rq.needContact": "Please complete your name, phone and governorate.",
      "rq.opened": "WhatsApp opened to send your request",
      "rq.resetDone": "Request cleared",
      "rq.confirmDelete": "Delete this saved request?",
      "rq.fillBtn": "Fill request",
      "rq.delete": "Delete",
      "rq.specs": "Specs",
      "rq.qty": "Size / quantity",
      "rq.color": "Color",
      "rq.budget": "Budget",
      "rq.urgency": "Needed by",
      "rq.ref": "Reference",
      "rq.notes": "Extra notes",
      "rq.detailsHead": "*Custom request details*",
      "rq.customerHead": "*Customer details*",
      "rq.specHead": "*Product specs requested*",
      "rq.thanks": "Thank you for trusting LAFFA — we are reviewing your request and will reply with availability and price ✦",
      "footer.about": "Laffa brings curated products and exclusive deals together in a simple, fast shopping experience with quality you can trust.",
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
      "footer.rights": "© 2026 LAFFA — All rights reserved",
      "footer.dev": "Developed by <strong>yaseen amr abd el rahem</strong>",
      "cart.label": "Shopping bag",
      "cart.title": "Laffa bag",
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
      "cart.popupBlocked": "Could not open WhatsApp. Allow pop-ups and try again.",
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
      "admin.editTitle": "Edit product",
      "admin.nameAr": "Product name (Arabic)",
      "admin.nameEn": "Product name (English — auto-translated)",
      "admin.descAr": "Description (Arabic)",
      "admin.descEn": "Description (English — auto-translated)",
      "admin.autoTranslateHint": "Auto-translation to English is active while typing Arabic",
      "admin.translateNow": "Translate now",
      "admin.translated": "Auto-translated to English ✦",
      "admin.price": "Price (EGP)",
      "admin.oldPrice": "Price before discount (optional)",
      "admin.chooseCat": "Choose a category",
      "admin.iconLabel": "Product icon",
      "admin.imageLabel": "Choose a product image (optional)",
      "admin.imageChangeLabel": "Change product image",
      "admin.removeImage": "Remove image",
      "admin.imagePreview": "Image preview",
      "admin.imageProcessing": "Preparing image...",
      "admin.imageTooLarge": "Image is too large. Choose one under 8 MB.",
      "admin.imageError": "Could not read the image. Try another one.",
      "admin.addBtn": "Add product",
      "admin.saveChanges": "Save changes",
      "admin.saveAsNew": "Add as new copy",
      "admin.cancelEdit": "Cancel edit",
      "admin.listTitle": "Current products",
      "admin.edit": "Edit",
      "admin.duplicate": "Duplicate",
      "admin.delete": "Delete",
      "admin.added": "Product added successfully",
      "admin.updated": "Product changes saved successfully",
      "admin.duplicated": "Product duplicated successfully",
      "admin.editingNow": "Edit mode: update details or image then save",
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
      "wa.title": "*New order from LAFFA store*",
      "wa.customer": "*Customer details*",
      "wa.name": "Name",
      "wa.phone": "Phone",
      "wa.phone2": "Extra phone",
      "wa.none": "None",
      "wa.city": "City",
      "wa.address": "Address",
      "wa.notes": "Notes",
      "wa.products": "*Ordered products details*",
      "wa.category": "Category",
      "wa.details": "Details",
      "wa.qty": "Qty",
      "wa.price": "Price",
      "wa.oldPrice": "instead of",
      "wa.itemTotal": "Item total",
      "wa.summary": "*Order summary*",
      "wa.totalQty": "Total items",
      "wa.payment": "Payment method",
      "wa.cod": "Cash on delivery",
      "wa.total": "*Grand total*",
      "wa.thanks": "Thank you for choosing LAFFA — we will contact you shortly to confirm ✦"
    }
  };
  let lang = "ar";
  const t = (key, vars) => {
    let str = (I18N[lang] && I18N[lang][key]) || I18N.ar[key] || key;
    if (vars) Object.keys(vars).forEach(k => { str = str.replace(new RegExp("\\{" + k + "\\}", "g"), vars[k]); });
    return str;
  };
const CATEGORIES = ["all", "electronics", "fashion", "home", "gaming", "accessories"];
  const LEGACY_CATEGORIES = {
    "الكل": "all", "كل المنتجات": "all", "all": "all",
    "إلكترونيات": "electronics", "electronics": "electronics",
    "أزياء": "fashion", "fashion": "fashion",
    "منزل": "home", "home": "home",
    "ألعاب": "gaming", "gaming": "gaming",
    "إكسسوارات": "accessories", "accessories": "accessories"
  };
  const LEGACY_ICONS = { "shuriken": "sound", "🔊": "sound", "🎧": "headset", "👜": "handbag", "💡": "lamp", "🎮": "gamepad", "⌚": "watch", "⌨️": "keyboard", "📦": "box", "🖱️": "mouse", "👕": "shirt", "🎁": "gift" };
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
      ar: { name: "صندوق هدايا لفة", desc: "تشكيلة مفاجآت مختارة بعناية تصلك في صندوق أنيق." },
      en: { name: "Laffa Gift Box", desc: "A hand-picked surprise set delivered in a premium box." }
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
  let cart = [];
  if (Array.isArray(rawCart)) {
    rawCart.forEach(item => {
      if (!item || typeof item !== "object") return;
      const q = Math.floor(Number(item.quantity));
      if (!Number.isFinite(q) || q <= 0) return;
      const product = normalizeProduct(item);
      const existing = cart.find(i => i.id === product.id);
      if (existing) existing.quantity += q;
      else cart.push(Object.assign({}, product, { quantity: q }));
    });
  }
  let favorites = readStore(KEYS.favorites, []);
  favorites = Array.isArray(favorites) ? favorites.map(Number).filter(Number.isFinite) : [];
  let selectedCategory = "all";
  let uploadedImage = "";
  let selectedIcon = "box";
  let editingProductId = null;
  let nameEnManual = false;
  let descEnManual = false;
const AR_PHRASES = (
    "سماعات لاسلكية احترافية:Pro Wireless Headphones|سماعة لاسلكية احترافية:Pro Wireless Headset|" +
    "سماعات بلوتوث لاسلكية:Wireless Bluetooth Headphones|سماعة بلوتوث لاسلكية:Wireless Bluetooth Headset|" +
    "لوحة مفاتيح ميكانيكية:Mechanical Keyboard|وحدة تحكم لاسلكية:Wireless Gaming Controller|" +
    "ذراع تحكم لاسلكي:Wireless Gaming Controller|ماوس العاب لاسلكي:Wireless Gaming Mouse|" +
    "ساعة ذكية انيقة:Elegant Smart Watch|حقيبة عصرية مميزة:Modern Everyday Tote|" +
    "تيشيرت قطن بريميوم:Premium Cotton Tee|مصباح ذكي متعدد الالوان:Smart Multi-Color Lamp|" +
    "صندوق هدايا ساوند سوق:Sound Souq Gift Box|ساوند سوق:Sound Souq|صندوق هدايا لفة:Laffa Gift Box|لفة:Laffa|منتج اختبار:Test Product|وصف اختبار:Test Description|" +
    "عزل للضوضاء:noise isolation|عزل الضوضاء:noise isolation|مانع للضوضاء:noise cancelling|" +
    "للاستخدام اليومي:for everyday use|الاستخدام اليومي:daily use|سريعة الاستجابة:fast-response|سريع الاستجابة:fast-response|" +
    "قابلة للتخصيص بالكامل:fully customizable|قابلة للتخصيص:customizable|لكل انواع الالعاب:for all types of games|" +
    "بطارية تدوم طويلا:long-lasting battery|تدوم طويلا:long-lasting|متابعة الصحة واللياقة:health and fitness tracking|" +
    "الوان ثابتة لا تبهت:fade-resistant colors|لا تبهت:fade-resistant|متعدد الالوان:multi-color|متعدد الاستخدامات:multi-purpose|" +
    "مختارة بعناية:carefully curated|مقاوم للماء:water-resistant|مقاومة للماء:water-resistant|ضد الماء:waterproof|" +
    "شحن سريع:fast charging|شحن لاسلكي:wireless charging|جودة عالية:high quality|عالي الجودة:high quality|عالية الجودة:high quality|" +
    "دقة عالية:high precision|وزن خفيف:lightweight|خفيف الوزن:lightweight|خامة متينة:durable material|خامة ممتازة:premium material|" +
    "تصميم مريح:comfortable design|تصميم انيق:elegant design|تصميم عصري:modern design|تصميم حديث:modern design|" +
    "بقصة مريحة:with a relaxed fit|قصة مريحة:relaxed fit|صوت نقي:crisp sound|صوت قوي:powerful sound|اضاءة ذكية:smart lighting|" +
    "ساعة ذكية:smart watch|سماعات بلوتوث:Bluetooth headphones|سماعة بلوتوث:Bluetooth headset|لوحة مفاتيح:keyboard|" +
    "وحدة تحكم:gaming controller|يد تحكم:controller|ذراع تحكم:controller|باور بانك:power bank|دفع عند الاستلام:cash on delivery"
  ).split("|").map(s => s.split(":"));
  const AR_WORDS = {};
  ("سماعات:headphones,سماعة:headset,مكبر:speaker,صوت:sound,صوتي:audio,مايك:microphone,ميكروفون:microphone,شاحن:charger,كابل:cable,سلك:cable,بطارية:battery," +
   "شاشة:display,كاميرا:camera,هاتف:phone,موبايل:mobile,جوال:phone,تابلت:tablet,لابتوب:laptop,كمبيوتر:computer,فلاشة:flash drive,ذاكرة:memory,كارت:card,حامل:stand," +
   "ستاند:stand,جراب:case,كفر:cover,عدسة:lens,راوتر:router,بلوتوث:Bluetooth,ذكي:smart,لاسلكي:wireless,رقمي:digital,الكتروني:electronic,الكترونيات:electronics," +
   "العاب:gaming,لعبة:game,ماوس:mouse,فارة:mouse,كيبورد:keyboard,لوحة:board,مفاتيح:switches,ميكانيكي:mechanical,تحكم:control,بلايستيشن:PlayStation,اكس:X,بوكس:box," +
   "كرسي:chair,احترافي:pro,سريع:fast,تيشيرت:t-shirt,قميص:shirt,بنطلون:pants,جاكيت:jacket,هودي:hoodie,فستان:dress,حذاء:shoes,كوتشي:sneakers,حقيبة:bag,شنطة:bag," +
   "محفظة:wallet,حزام:belt,ساعة:watch,ساعات:watches,نظارة:glasses,نظارات:sunglasses,عطر:perfume,برفان:perfume,اكسسوار:accessory,اكسسوارات:accessories,خاتم:ring," +
   "سلسلة:necklace,سوار:bracelet,قطن:cotton,جلد:leather,قماش:fabric,رجالي:men's,حريمي:women's,نسائي:women's,شبابي:youth,اطفال:kids',مقاس:size,مقاسات:sizes," +
   "كلاسيك:classic,كاجوال:casual,رياضي:sport,منزل:home,منزلي:home,مصباح:lamp,لمبة:bulb,اضاءة:lighting,نور:light,ديكور:decor,مكتب:desk,مكتبي:office,غرفة:room," +
   "غرفتك:your room,مطبخ:kitchen,خلاط:blender,ماكينة:machine,قهوة:coffee,مج:mug,كوب:cup,زجاجة:bottle,ترمس:flask,منظم:organizer,مروحة:fan,مكواة:iron,مكنسة:vacuum," +
   "طقم:set,صندوق:box,هدية:gift,هدايا:gifts,جديد:new,اصلي:authentic,ممتاز:excellent,رائع:amazing,مميز:special,فخم:luxury,فاخر:luxury,بريميوم:premium,انيق:elegant," +
   "عصري:modern,حديث:modern,مريح:comfortable,متين:durable,قوي:strong,خفيف:light,ناعم:soft,نقي:pure,عالي:high,فائق:ultra,كامل:full,بالكامل:fully,متعدد:multi," +
   "كبير:large,صغير:compact,متوسط:medium,عملي:practical,سهل:easy,استخدام:use,يومي:daily,طويل:long,طويلا:long,ثابت:stable,واضح:clear,مثالي:perfect,مناسب:suitable," +
   "تناسب:fits,يناسب:fits,اسود:black,سوداء:black,ابيض:white,بيضاء:white,احمر:red,حمراء:red,ازرق:blue,زرقاء:blue,اخضر:green,خضراء:green,اصفر:yellow,صفراء:yellow," +
   "برتقالي:orange,رمادي:gray,رصاصي:gray,فضي:silver,ذهبي:gold,بني:brown,وردي:pink,بينك:pink,بنفسجي:purple,موف:purple,بيج:beige,كحلي:navy,الوان:colors,لون:color," +
   "مع:with,بدون:without,من:from,في:in,على:on,الى:to,لكل:for all,كل:all,او:or,يدعم:supports,يتميز:features,تمنح:gives,يمنح:gives,يوفر:provides,توفر:provides," +
   "يعمل:works,يدوم:lasts,تدوم:lasts,يشمل:includes,تشمل:includes,يحتوي:contains,ضد:resistant to,ضمان:warranty,عام:year,سنة:year,شهر:month,شهور:months,شحن:charging," +
   "توصيل:delivery,منتج:product,وصف:description,اختبار:test,تجريبي:test,سعر:price,خصم:discount,عرض:offer,خامة:material,خامات:materials,جودة:quality,دقة:precision," +
   "وزن:weight,استجابة:response,اجواء:ambiance,تشكيلة:collection,مفاجات:surprises,تصلك:delivered,اشعارات:notifications,الصحة:health,اللياقة:fitness,مليون:million," +
   "انواع:types,سامسونج:Samsung,ابل:Apple,سوني:Sony,شاومي:Xiaomi,انكر:Anker").split(",").forEach(pair => {
    const [k, v] = pair.split(":");
    AR_WORDS[k] = v;
    if (k.endsWith("ة")) AR_WORDS[k.slice(0, -1) + "ه"] = v;
    else AR_WORDS[k + "ة"] = AR_WORDS[k + "ه"] = v;
  });
  const AR_CHAR_MAP = {
    "ا": "a", "أ": "a", "إ": "e", "آ": "a", "ب": "b", "ت": "t", "ث": "th", "ج": "g", "ح": "h", "خ": "kh",
    "د": "d", "ذ": "z", "ر": "r", "ز": "z", "س": "s", "ش": "sh", "ص": "s", "ض": "d", "ط": "t", "ظ": "z",
    "ع": "a", "غ": "gh", "ف": "f", "ق": "q", "ك": "k", "ل": "l", "م": "m", "ن": "n", "ه": "h", "ة": "a",
    "و": "w", "ؤ": "o", "ي": "y", "ى": "a", "ئ": "e", "ء": ""
  };
  function normalizeArText(str) {
    return String(str || "")
      .replace(/[٠-٩]/g, d => String(d.charCodeAt(0) - 0x0660))
      .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
      .replace(/[أإآ]/g, "ا")
      .replace(/ى/g, "ي")
      .replace(/،/g, ", ")
      .replace(/؛/g, "; ")
      .replace(/\s+/g, " ")
      .trim();
  }
  function transliterateWord(word) {
    let out = "";
    for (let i = 0; i < word.length; i++) {
      const ch = word[i];
      out += AR_CHAR_MAP[ch] !== undefined ? AR_CHAR_MAP[ch] : ch;
    }
    return out;
  }
  function lookupArWord(rawWord) {
    const clean = rawWord.replace(/^[^\u0600-\u06FFa-zA-Z0-9%]+|[^\u0600-\u06FFa-zA-Z0-9%]+$/g, "");
    if (!clean) return rawWord;
    if (!/[\u0600-\u06FF]/.test(clean)) return rawWord;
    if (AR_WORDS[clean]) return AR_WORDS[clean];
    const altTaa = clean.replace(/ة$/, "ه");
    if (AR_WORDS[altTaa]) return AR_WORDS[altTaa];
    if (clean.startsWith("ال") && clean.length > 3) {
      const bare = clean.slice(2);
      if (AR_WORDS[bare]) return AR_WORDS[bare];
    }
    if (clean.startsWith("وال") && clean.length > 4) {
      const bare = clean.slice(3);
      if (AR_WORDS[bare]) return "and " + AR_WORDS[bare];
    }
    if (clean.startsWith("بال") && clean.length > 4) {
      const bare = clean.slice(3);
      if (AR_WORDS[bare]) return "with " + AR_WORDS[bare];
    }
    if (clean.startsWith("لل") && clean.length > 3) {
      const bare = clean.slice(2);
      if (AR_WORDS[bare]) return "for " + AR_WORDS[bare];
    }
    if (clean.startsWith("و") && clean.length > 2) {
      const rest = clean.slice(1);
      if (AR_WORDS[rest]) return "and " + AR_WORDS[rest];
      if (rest.startsWith("ال") && AR_WORDS[rest.slice(2)]) return "and " + AR_WORDS[rest.slice(2)];
    }
    if (clean.startsWith("ب") && clean.length > 2) {
      const rest = clean.slice(1);
      if (AR_WORDS[rest]) return "with " + AR_WORDS[rest];
    }
    if (clean.startsWith("ل") && clean.length > 2) {
      const rest = clean.slice(1);
      if (AR_WORDS[rest]) return "for " + AR_WORDS[rest];
    }
    if (clean.endsWith("ية") && clean.length > 3) {
      const stem = clean.slice(0, -1);
      if (AR_WORDS[stem]) return AR_WORDS[stem];
    }
    if (clean.endsWith("ة") && clean.length > 3) {
      const stem = clean.slice(0, -1);
      if (AR_WORDS[stem]) return AR_WORDS[stem];
    }
    if (clean.endsWith("ات") && clean.length > 4) {
      const sing = clean.slice(0, -2) + "ة";
      if (AR_WORDS[sing]) return AR_WORDS[sing];
      const stem = clean.slice(0, -2);
      if (AR_WORDS[stem]) return AR_WORDS[stem];
    }
    return transliterateWord(clean);
  }
  function formatEnglishCase(str, isTitle) {
    const cleaned = str.replace(/\s+/g, " ").replace(/\s+([,.;!?])/g, "$1").trim();
    if (!cleaned) return "";
    if (isTitle) {
      const minor = new Set(["and", "or", "for", "with", "in", "on", "to", "of", "the", "a", "an"]);
      return cleaned.split(" ").map((w, idx) => {
        if (!w) return w;
        if (/^[A-Z0-9]{2,}$/.test(w)) return w;
        const lower = w.toLowerCase();
        if (idx > 0 && minor.has(lower)) return lower;
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      }).join(" ");
    }
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }
  function translateArToEnSync(text, isTitle) {
    const raw = String(text || "").trim();
    if (!raw) return "";
    if (!/[\u0600-\u06FF]/.test(raw)) return raw;
    let working = " " + normalizeArText(raw) + " ";
    for (let i = 0; i < AR_PHRASES.length; i++) {
      const [arPhrase, enPhrase] = AR_PHRASES[i];
      if (working.includes(arPhrase)) {
        working = working.split(arPhrase).join(" " + enPhrase + " ");
      }
    }
    const tokens = working.trim().split(/\s+/);
    const outTokens = tokens.map(tok => /[\u0600-\u06FF]/.test(tok) ? lookupArWord(tok) : tok);
    return formatEnglishCase(outTokens.join(" "), isTitle);
  }
  const translateTimers = {};
  function translateArToEnAsync(text, isTitle, key, onResult) {
    clearTimeout(translateTimers[key]);
    const raw = String(text || "").trim();
    if (!raw || !/[\u0600-\u06FF]/.test(raw)) return;
    if (navigator.webdriver || typeof fetch !== "function" || navigator.onLine === false) return;
    translateTimers[key] = setTimeout(async () => {
      try {
        const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=en&dt=t&q=" + encodeURIComponent(raw);
        const res = await fetch(url);
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data) && Array.isArray(data[0])) {
          const translated = data[0].map(part => (part && part[0]) || "").join("").trim();
          if (translated && !/[\u0600-\u06FF]/.test(translated)) {
            onResult(formatEnglishCase(translated, isTitle));
          }
        }
      } catch (e) { /* offline or blocked: local sync translation is already in place */ }
    }, 320);
  }
const pName = p => (p[lang] && p[lang].name) || p.ar.name || p.en.name || "";
  const pDesc = p => (p[lang] && p[lang].desc) || p.ar.desc || p.en.desc || "";
  const catLabel = c => t("cat." + c);
  const icon = (n, cls = "ic") => `<svg class="${cls}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
  let formatter = null, formatterLang = "";
  function numberFmt() {
    if (!formatter || formatterLang !== lang) {
      formatterLang = lang;
      formatter = new Intl.NumberFormat(lang === "ar" ? "ar-EG-u-nu-latn" : "en-US");
    }
    return formatter;
  }
  function formatPrice(v) { return numberFmt().format(Number(v) || 0); }
  function money(v) { return lang === "ar" ? `${formatPrice(v)} ${t("common.currency")}` : `${t("common.currency")} ${formatPrice(v)}`; }
  function saveProducts() { writeStore(KEYS.products, products); }
  function saveCart() {
    writeStore(KEYS.cart, cart.map(item =>
      products.some(p => p.id === item.id) ? { id: item.id, quantity: item.quantity } : item));
  }
  function saveFavorites() { writeStore(KEYS.favorites, favorites); }
  function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  const escapeAttr = escapeHTML;
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
let toastTimer;
  function showToast(message, type) {
    if (!el.toast) return;
    el.toast.querySelector(".toast-text").textContent = message;
    el.toast.querySelector(".toast-icon use").setAttribute("href", type === "error" ? "#i-alert" : "#i-check-circle");
    el.toast.classList.toggle("error", type === "error");
    el.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.toast.classList.remove("show"), 2600);
  }
function applyTheme(theme, notify) {
    el.root.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", "#111111");
    try { localStorage.setItem(KEYS.theme, theme); } catch (e) { }
    if (notify) showToast(t(theme === "light" ? "common.theme.light" : "common.theme.dark"));
  }
  function initTheme() {
    let stored = null;
    try { stored = localStorage.getItem(KEYS.theme); } catch (e) { }
    applyTheme(stored === "dark" ? "dark" : "light", false);
    const btn = $("#themeToggle");
    if (btn) btn.addEventListener("click", () => {
      applyTheme(el.root.getAttribute("data-theme") === "light" ? "dark" : "light", true);
    });
  }
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
    syncAdminFormMode();
    updateImagePreview();
    renderRequestSummary();
    renderSavedRequests();
  }
  function setLang(next, notify) {
    next = next === "en" ? "en" : "ar";
    if (next === lang) return;
    lang = next;
    try { localStorage.setItem(KEYS.lang, next); } catch (e) { }
    applyI18n();
    if (notify) showToast(t("common.lang"));
  }
  function initLang() {
    let stored = null;
    try { stored = localStorage.getItem(KEYS.lang); } catch (e) { }
    if (!stored) stored = (navigator.language || "ar").slice(0, 2).toLowerCase() === "ar" ? "ar" : "en";
    lang = stored === "en" ? "en" : "ar";
    $$(".lang-opt").forEach(btn => btn.addEventListener("click", () => setLang(btn.dataset.lang, true)));
  }
let activePanel = null, returnFocus = null;
  function hidePanel(panel, restoreFocus) {
    if (!panel) return;
    panel.classList.remove("show", "open");
    if (panel === el.cartPanel) panel.hidden = true;
    if (activePanel === panel) activePanel = null;
    if (restoreFocus === false) return;
    el.overlay.classList.remove("show");
    document.body.style.overflow = "";
    if (returnFocus && document.contains(returnFocus) && returnFocus.getClientRects().length) {
      returnFocus.focus({ preventScroll: true });
    }
    returnFocus = null;
  }
  function openPanel(panel, focusSelector) {
    closeMenu();
    if (activePanel === panel) return;
    if (activePanel) hidePanel(activePanel, false);
    else returnFocus = document.activeElement;
    activePanel = panel;
    if (panel === el.cartPanel) { panel.hidden = false; panel.classList.add("open"); }
    else panel.classList.add("show");
    el.overlay.classList.add("show");
    document.body.style.overflow = "hidden";
    const target = focusSelector && panel.querySelector(focusSelector);
    if (target) target.focus({ preventScroll: true });
  }
  function closeActivePanel() { hidePanel(activePanel, true); }
  function openCart() { openPanel(el.cartPanel, "#closeCartBtn"); }
  function closeCart() { if (activePanel === el.cartPanel) closeActivePanel(); }
  function openSearch() { openPanel(el.searchModal, "#searchInput"); }
  function closeSearch() {
    clearTimeout(searchTimer);
    el.searchInput.value = "";
    el.searchResults.innerHTML = "";
    if (activePanel === el.searchModal) closeActivePanel();
  }
  function closeMenu() {
    el.navLinks.classList.remove("show");
    el.mobileMenuBtn.classList.remove("active");
    el.mobileMenuBtn.setAttribute("aria-expanded", "false");
  }
function initScroll() {
    if (!el.backToTop) return;
    let shown = false;
    const onScroll = () => {
      const next = window.scrollY > 600;
      if (next !== shown) { shown = next; el.backToTop.classList.toggle("show", shown); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    el.backToTop.addEventListener("click", () => window.scrollTo(0, 0));
  }
function starsHTML(rating, cls = "stars-row") {
    let out = `<span class="${cls}" role="img" aria-label="${rating}/5">`;
    for (let i = 1; i <= 5; i++) {
      out += `<svg class="ic${i <= Math.round(rating) ? " on" : " off"}" aria-hidden="true"><use href="#i-star"/></svg>`;
    }
    return out + "</span>";
  }
  function renderReviews() {
    $$(".review-stars[data-stars]").forEach(node => { node.innerHTML = starsHTML(Number(node.dataset.stars), "review-stars"); });
  }
  function renderCategoryCounts() {
    const counts = { all: products.length };
    products.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });
    $$("[data-cat-count]").forEach(node => { node.textContent = counts[node.dataset.catCount] || 0; });
  }
function visibleProducts() {
    return selectedCategory === "all" ? products : products.filter(p => p.category === selectedCategory);
  }
  function productVisual(product, cls) {
    return product.image
      ? `<img src="${escapeAttr(product.image)}" class="${cls}" alt="${escapeAttr(pName(product))}" loading="lazy" decoding="async">`
      : `<div class="product-placeholder"><span class="product-object">${icon(product.icon || "box")}</span></div>`;
  }
  function renderProducts() {
    if (!el.productsGrid) return;
    const list = visibleProducts();
    if (el.resultsCount) el.resultsCount.textContent = t("prod.results", { n: numberFmt().format(list.length) });
    const fragment = document.createDocumentFragment();
    if (!list.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.innerHTML = `<span class="empty-icon">${icon("box")}</span><strong>${t("prod.emptyTitle")}</strong><span>${t("prod.emptyDesc")}</span>`;
      fragment.appendChild(empty);
    } else {
      list.forEach(product => {
        const fav = favorites.includes(product.id);
        const discount = product.oldPrice > product.price
          ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
        const isNew = (product.sold || 0) === 0;
        const card = document.createElement("article");
        card.className = "product-card";
        card.dataset.productId = product.id;
        card.innerHTML = `
          <div class="product-image-box">
            ${productVisual(product, "product-image")}
            <span class="product-badge${isNew ? " is-new" : ""}">${t(isNew ? "prod.new" : "prod.authentic")}</span>
            ${discount ? `<span class="discount-badge">${icon("bolt")} ${discount}%</span>` : ""}
            <button class="favorite-btn ${fav ? "active" : ""}" type="button" data-favorite="${product.id}"
                    aria-label="${t(fav ? "prod.favRemove" : "prod.favAdd")}" aria-pressed="${fav}">${icon("heart")}</button>
          </div>
          <div class="product-info">
            <span class="product-category">${catLabel(product.category)}</span>
            <h3>${escapeHTML(pName(product))}</h3>
            <p class="product-description">${escapeHTML(pDesc(product))}</p>
            <div class="product-meta">
              ${starsHTML(product.rating)}
              <span class="product-sold">${t("prod.sold", { n: numberFmt().format(product.sold || 0) })}</span>
            </div>
            <span class="product-stock"><i aria-hidden="true"></i>${t("prod.inStock")}</span>
            <div class="product-price-row">
              <strong class="product-price">${money(product.price)}</strong>
              ${discount ? `<span class="old-price">${money(product.oldPrice)}</span>` : ""}
            </div>
            <button class="add-btn" type="button" data-add="${product.id}" aria-label="${t("prod.quickAdd")}">
              <span class="btn-text">${t("prod.addToCart")}</span>
              <span class="btn-icon">${icon("bag")}</span>
            </button>
          </div>`;
        fragment.appendChild(card);
      });
    }
    el.productsGrid.innerHTML = "";
    el.productsGrid.appendChild(fragment);
  }
  function toggleFavorite(id, button) {
    const has = favorites.includes(id);
    favorites = has ? favorites.filter(f => f !== id) : favorites.concat(id);
    saveFavorites();
    if (button) {
      button.classList.toggle("active", !has);
      button.setAttribute("aria-pressed", String(!has));
      button.setAttribute("aria-label", t(has ? "prod.favAdd" : "prod.favRemove"));
    }
    showToast(t(has ? "prod.favRemove" : "prod.favAdd"));
  }
const addButtonTimers = new WeakMap();
  function addToCart(id, button) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    const existing = cart.find(i => i.id === id);
    if (existing) existing.quantity += 1;
    else cart.push(Object.assign({}, product, { quantity: 1 }));
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
      }, 1200));
    }
    showToast(t("cart.added"));
  }
  function cartTotals() {
    return cart.reduce((acc, i) => {
      const fresh = products.find(p => p.id === i.id) || i;
      return { total: acc.total + fresh.price * i.quantity, qty: acc.qty + i.quantity };
    }, { total: 0, qty: 0 });
  }
  function renderCart() {
    if (!el.cartItems) return;
    const fragment = document.createDocumentFragment();
    if (!cart.length) {
      const empty = document.createElement("div");
      empty.className = "cart-empty";
      empty.innerHTML = `<strong>${t("cart.empty")}</strong><span>${t("cart.emptyHint")}</span>`;
      fragment.appendChild(empty);
    } else {
      cart.forEach(item => {
        const fresh = products.find(p => p.id === item.id) || item;
        const visual = fresh.image
          ? `<img src="${escapeAttr(fresh.image)}" class="cart-item-image" alt="${escapeAttr(pName(fresh))}" decoding="async">`
          : `<div class="cart-item-image product-placeholder">${icon(fresh.icon || "box")}</div>`;
        const row = document.createElement("div");
        row.className = "cart-item";
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
        fragment.appendChild(row);
      });
    }
    el.cartItems.innerHTML = "";
    el.cartItems.appendChild(fragment);
    const totals = cartTotals();
    el.cartCount.textContent = totals.qty;
    el.cartTotal.textContent = formatPrice(totals.total);
    if (el.cartSummary) el.cartSummary.textContent = cart.length ? t("cart.summary", { n: numberFmt().format(totals.qty), total: money(totals.total) }) : "";
    const cartBtn = $("#cartBtn");
    if (cartBtn) cartBtn.classList.toggle("has-items", cart.length > 0);
  }
  function changeQuantity(id, amount) {
    const item = cart.find(p => p.id === id);
    if (!item) return;
    item.quantity += amount;
    if (item.quantity <= 0) cart = cart.filter(p => p.id !== id);
    saveCart(); renderCart();
  }
  function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart(); renderCart(); showToast(t("cart.removed"));
  }
function checkout() {
    if (!cart.length) { showToast(t("cart.isEmpty"), "error"); return; }
    const nameEl = $("#customerName");
    const phoneEl = $("#customerPhone");
    const extraPhoneEl = $("#customerExtraPhone");
    const cityEl = $("#customerCity");
    const addressEl = $("#customerAddress");
    const notesEl = $("#customerNotes");
    const name = nameEl.value.trim();
    const phone = phoneEl.value.trim();
    const extraPhone = extraPhoneEl.value.trim();
    const city = cityEl.value.trim();
    const address = addressEl.value.trim();
    const notes = notesEl.value.trim();
    if (!name || !phone || !city || !address) {
      const missing = !name ? nameEl : !phone ? phoneEl : !city ? cityEl : addressEl;
      if (missing) missing.focus();
      showToast(t("cart.needCustomer"), "error");
      return;
    }
    const btn = $("#checkoutBtn");
    const label = btn.querySelector(".btn-text");
    const original = label.textContent;
    label.textContent = t("cart.checkingout");
    btn.disabled = true;
    const totals = cartTotals();
    const line = "━━━━━━━━━━━━━━";
    const keycap = n => String(n).replace(/\d/g, d => `${d}\uFE0F\u20E3`);
    let msg = `🛍️ ${t("wa.title")} 🛒\n\n${line}\n\n👤 ${t("wa.customer")}\n\n`;
    msg += `🧑 ${t("wa.name")}: ${name}\n📱 ${t("wa.phone")}: ${phone}\n`;
    msg += `☎️ ${t("wa.phone2")}: ${extraPhone || t("wa.none")}\n`;
    msg += `🏙️ ${t("wa.city")}: ${city}\n📍 ${t("wa.address")}: ${address}\n`;
    msg += `📝 ${t("wa.notes")}: ${notes || t("wa.none")}\n\n${line}\n\n📦 ${t("wa.products")}\n\n`;
    cart.forEach((item, i) => {
      const fresh = products.find(p => p.id === item.id) || item;
      const desc = pDesc(fresh);
      const oldPriceInfo = fresh.oldPrice > fresh.price ? ` (${t("wa.oldPrice")} ${money(fresh.oldPrice)} 🔥)` : "";
      msg += `${keycap(i + 1)} *${pName(fresh)}*\n`;
      msg += `🏷️ ${t("wa.category")}: ${catLabel(fresh.category)}\n`;
      if (desc) msg += `📋 ${t("wa.details")}: ${desc}\n`;
      msg += `🔢 ${t("wa.qty")}: ${item.quantity}\n`;
      msg += `💵 ${t("wa.price")}: ${money(fresh.price)}${oldPriceInfo}\n`;
      msg += `🧾 ${t("wa.itemTotal")}: *${money(fresh.price * item.quantity)}*\n\n`;
    });
    msg += `${line}\n\n💰 ${t("wa.summary")}\n`;
    msg += `🛒 ${t("wa.totalQty")}: ${totals.qty}\n`;
    msg += `🤝 ${t("wa.payment")}: ${t("wa.cod")} 💵\n`;
    msg += `💳 ${t("wa.total")}: *${money(totals.total)}*\n\n${line}\n\n🙏 ${t("wa.thanks")}\n`;
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    try {
      const opened = window.open(waUrl, "_blank", "noopener,noreferrer");
      if (!opened) {
        window.location.href = waUrl;
      }
      showToast(t("cart.opened"));
    } finally {
      label.textContent = original;
      btn.disabled = false;
    }
  }
  /* ---------- Custom product request page ---------- */
  const RQ_FIELDS = {
    name: "#rqName", category: "#rqCategory", color: "#rqColor", size: "#rqSize",
    budget: "#rqBudget", specs: "#rqSpecs", ref: "#rqReferences",
    contactName: "#rqContactName", phone: "#rqPhone", city: "#rqCity",
    urgency: "#rqUrgency", notes: "#rqNotes"
  };
  let savedRequests = [];
  const rawRequests = readStore(KEYS.requests, []);
  if (Array.isArray(rawRequests)) {
    savedRequests = rawRequests.filter(r => r && typeof r === "object" && (r.name || r.specs)).map(r => ({
      id: Number(r.id) || Date.now(),
      at: r.at || "",
      name: String(r.name || ""),
      category: String(r.category || ""),
      color: String(r.color || ""),
      size: String(r.size || ""),
      budget: String(r.budget || ""),
      specs: String(r.specs || ""),
      ref: String(r.ref || ""),
      contactName: String(r.contactName || ""),
      phone: String(r.phone || ""),
      city: String(r.city || ""),
      urgency: String(r.urgency || "flexible"),
      notes: String(r.notes || "")
    }));
  }
  const rqEl = key => $(RQ_FIELDS[key]);
  const urgencyLabel = value =>
    t(value === "urgent" ? "rq.urgencyUrgent" : value === "soon" ? "rq.urgencySoon" : "rq.urgencyFlexible");
  function readRequestForm() {
    const data = {};
    Object.keys(RQ_FIELDS).forEach(key => {
      const node = rqEl(key);
      data[key] = node ? String(node.value || "").trim() : "";
    });
    return data;
  }
  let draftTimer;
  function saveRequestDraft() {
    clearTimeout(draftTimer);
    draftTimer = setTimeout(() => writeStore(KEYS.requestDraft, readRequestForm()), 300);
  }
  function restoreRequestDraft() {
    const draft = readStore(KEYS.requestDraft, null);
    if (!draft || typeof draft !== "object") return;
    Object.keys(RQ_FIELDS).forEach(key => {
      const node = rqEl(key);
      if (node && typeof draft[key] === "string") node.value = draft[key];
    });
  }
  function renderRequestSummary() {
    const list = $("#requestSummaryList");
    if (!list) return;
    const data = readRequestForm();
    const rows = [];
    const add = (label, value) => { if (value) rows.push({ label, value }); };
    add(t("rq.nameLabel").replace(/\s*\*$/, ""), data.name);
    add(t("rq.catLabel"), data.category ? catLabel(data.category) : "");
    add(t("rq.color"), data.color);
    add(t("rq.qty"), data.size);
    add(t("rq.budget"), data.budget ? money(data.budget) : "");
    add(t("rq.urgency"), data.urgency && data.urgency !== "flexible" ? urgencyLabel(data.urgency) : "");
    add(t("rq.specs"), data.specs);
    add(t("rq.notes"), data.notes);
    add(t("rq.ref"), data.ref);
    list.innerHTML = rows.map(row =>
      `<li><span>${escapeHTML(row.label)}</span><strong>${escapeHTML(row.value)}</strong></li>`).join("");
    list.hidden = rows.length === 0;
    const empty = $("#requestSummary .request-summary-empty");
    if (empty) empty.hidden = rows.length > 0;
  }
  function requestValidation(data) {
    if (!data.name && !data.specs) return { key: "rq.needFields", target: rqEl("name") };
    if (!data.name) return { key: "rq.needFields", target: rqEl("name") };
    if (!data.specs) return { key: "rq.needSpecs", target: rqEl("specs") };
    if (!data.contactName || !data.phone || !data.city) {
      const target = !data.contactName ? rqEl("contactName") : !data.phone ? rqEl("phone") : rqEl("city");
      return { key: "rq.needContact", target };
    }
    return null;
  }
  function buildRequestMessage(data) {
    const line = "━━━━━━━━━━━━━━";
    let msg = `🛍️ ${t("wa.title")} 🛒\n\n${line}\n\n📝 ${t("rq.detailsHead")}\n\n`;
    msg += `🧑 ${t("wa.name")}: ${data.contactName}\n📱 ${t("wa.phone")}: ${data.phone}\n🏙️ ${t("wa.city")}: ${data.city}\n`;
    msg += `⏱️ ${t("rq.urgency")}: ${urgencyLabel(data.urgency)}\n\n${line}\n\n📦 ${t("rq.specHead")}\n\n`;
    msg += `🏷️ ${t("wa.name")}: *${data.name}*\n`;
    if (data.category) msg += `🗂️ ${t("wa.category")}: ${catLabel(data.category)}\n`;
    if (data.color) msg += `🎨 ${t("rq.color")}: ${data.color}\n`;
    if (data.size) msg += `📐 ${t("rq.qty")}: ${data.size}\n`;
    if (data.budget) msg += `💵 ${t("rq.budget")}: ${money(data.budget)}\n`;
    msg += `📋 ${t("rq.specs")}: ${data.specs}\n`;
    if (data.ref) msg += `🔗 ${t("rq.ref")}: ${data.ref}\n`;
    if (data.notes) msg += `🗒️ ${t("rq.notes")}: ${data.notes}\n`;
    msg += `\n${line}\n\n🤝 ${t("wa.payment")}: ${t("wa.cod")} 💵\n\n🙏 ${t("rq.thanks")}\n`;
    return msg;
  }
  function sendRequest() {
    const data = readRequestForm();
    const problem = requestValidation(data);
    if (problem) {
      showToast(t(problem.key), "error");
      if (problem.target) problem.target.focus();
      return;
    }
    const btn = $("#requestSubmitBtn");
    const label = btn && btn.querySelector(".btn-text");
    const original = label ? label.textContent : "";
    if (label) label.textContent = t("cart.checkingout");
    if (btn) btn.disabled = true;
    try {
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildRequestMessage(data))}`;
      const opened = window.open(waUrl, "_blank", "noopener,noreferrer");
      if (!opened) window.location.href = waUrl;
      showToast(t("rq.opened"));
    } finally {
      if (label) label.textContent = original;
      if (btn) btn.disabled = false;
    }
  }
  function persistRequests() { writeStore(KEYS.requests, savedRequests); }
  function saveRequestToList() {
    const data = readRequestForm();
    const problem = requestValidation(data);
    if (problem) {
      showToast(t(problem.key), "error");
      if (problem.target) problem.target.focus();
      return;
    }
    savedRequests.unshift(Object.assign({ id: Date.now(), at: new Date().toISOString() }, data));
    if (savedRequests.length > 20) savedRequests = savedRequests.slice(0, 20);
    persistRequests();
    renderSavedRequests();
    showToast(t("rq.saved"));
  }
  function fillRequest(id) {
    const item = savedRequests.find(r => r.id === id);
    if (!item) return;
    Object.keys(RQ_FIELDS).forEach(key => {
      const node = rqEl(key);
      if (node) node.value = typeof item[key] === "string" ? item[key] : "";
    });
    saveRequestDraft();
    renderRequestSummary();
    const form = $("#requestForm");
    if (form) form.scrollIntoView({ behavior: "smooth", block: "start" });
    if (rqEl("name")) rqEl("name").focus({ preventScroll: true });
    showToast(t("rq.saved"));
  }
  function deleteSavedRequest(id) {
    if (!window.confirm(t("rq.confirmDelete"))) return;
    savedRequests = savedRequests.filter(r => r.id !== id);
    persistRequests();
    renderSavedRequests();
    showToast(t("rq.savedDeleted"));
  }
  function resetRequestForm() {
    const form = $("#requestForm");
    if (form) form.reset();
    writeStore(KEYS.requestDraft, {});
    renderRequestSummary();
    showToast(t("rq.resetDone"));
  }
  function renderSavedRequests() {
    const wrap = $("#requestSavedWrap");
    const list = $("#requestSavedList");
    if (!wrap || !list) return;
    wrap.hidden = savedRequests.length === 0;
    const count = $("#requestSavedCount");
    if (count) count.textContent = t("rq.savedCount", { n: numberFmt().format(savedRequests.length) });
    list.innerHTML = "";
    if (!savedRequests.length) return;
    const fragment = document.createDocumentFragment();
    savedRequests.forEach(item => {
      const row = document.createElement("div");
      row.className = "request-saved-item";
      const meta = [item.category ? catLabel(item.category) : "", item.size, item.color, urgencyLabel(item.urgency)]
        .filter(Boolean).join(" · ");
      const specsPreview = escapeHTML(item.specs).slice(0, 160);
      row.innerHTML = `
        <div class="request-saved-info">
          <strong>${escapeHTML(item.name || t("rq.specs"))}</strong>
          ${meta ? `<span>${escapeHTML(meta)}</span>` : ""}
          ${specsPreview ? `<p>${specsPreview}</p>` : ""}
        </div>
        <div class="request-saved-actions">
          <button type="button" class="secondary-btn" data-fill-request="${item.id}">${icon("edit")} ${t("rq.fillBtn")}</button>
          <button type="button" class="secondary-btn request-delete-btn" data-delete-request="${item.id}">${icon("trash")} ${t("rq.delete")}</button>
        </div>`;
      fragment.appendChild(row);
    });
    list.appendChild(fragment);
  }
let searchTimer;
  function runSearch() {
    const value = el.searchInput.value.trim().toLowerCase();
    el.searchResults.innerHTML = "";
    if (!value) return;
    const results = products.filter(p =>
      (pName(p) || "").toLowerCase().includes(value) ||
      (pDesc(p) || "").toLowerCase().includes(value) ||
      p.ar.name.toLowerCase().includes(value) || p.en.name.toLowerCase().includes(value) ||
      catLabel(p.category).toLowerCase().includes(value)).slice(0, 30);
    if (!results.length) {
      el.searchResults.innerHTML = `<div class="search-result none">${icon("search")} ${t("search.none")}</div>`;
      return;
    }
    const fragment = document.createDocumentFragment();
    results.forEach(product => {
      const row = document.createElement("button");
      row.type = "button";
      row.className = "search-result";
      row.dataset.searchCategory = product.category;
      row.innerHTML = `<strong>${escapeHTML(pName(product))}</strong><em>${money(product.price)}</em>`;
      fragment.appendChild(row);
    });
    el.searchResults.appendChild(fragment);
  }
function selectCategory(key, scroll) {
    selectedCategory = CATEGORIES.includes(key) ? key : "all";
    $$(".category-card").forEach(c => {
      const on = c.dataset.category === selectedCategory;
      c.classList.toggle("active", on);
      c.setAttribute("aria-pressed", String(on));
    });
    renderProducts();
    if (scroll) {
      const target = $("#products");
      if (target) target.scrollIntoView({ block: "start" });
    }
  }
let uploadToken = 0;
  function updateImagePreview() {
    const preview = $("#imagePreview");
    const clearBtn = $("#clearImageBtn");
    const label = $("#productImageLabel");
    if (!preview) return;
    if (uploadedImage) {
      preview.innerHTML = `<img src="${escapeAttr(uploadedImage)}" alt="${escapeAttr(t("admin.imagePreview"))}" decoding="async">`;
      if (clearBtn) clearBtn.hidden = false;
      if (label) label.textContent = t("admin.imageChangeLabel");
    } else {
      preview.textContent = t("admin.imagePreview");
      if (clearBtn) clearBtn.hidden = true;
      if (label) label.textContent = t("admin.imageLabel");
    }
  }
  function syncAdminFormMode() {
    const isEdit = editingProductId !== null;
    const card = $("#adminFormCard");
    const formIcon = $("#adminFormIcon");
    const formTitle = $("#adminFormTitle");
    const submitText = $("#submitProductText");
    const submitIcon = $("#submitProductIcon");
    const extraActions = $("#editExtraActions");
    if (card) card.classList.toggle("is-editing", isEdit);
    if (formIcon) formIcon.setAttribute("href", isEdit ? "#i-edit" : "#i-plus");
    if (formTitle) formTitle.textContent = t(isEdit ? "admin.editTitle" : "admin.addTitle");
    if (submitText) submitText.textContent = t(isEdit ? "admin.saveChanges" : "admin.addBtn");
    if (submitIcon) submitIcon.setAttribute("href", isEdit ? "#i-check-circle" : "#i-plus");
    if (extraActions) extraActions.hidden = !isEdit;
  }
  function resetProductForm() {
    editingProductId = null;
    nameEnManual = false;
    descEnManual = false;
    uploadToken += 1;
    uploadedImage = "";
    selectedIcon = "box";
    const form = $("#addProductForm");
    if (form) form.reset();
    const fileInput = $("#productImage");
    if (fileInput) fileInput.value = "";
    const submitBtn = $("#submitProductBtn");
    if (submitBtn) submitBtn.disabled = false;
    updateImagePreview();
    renderIconPicker();
    syncAdminFormMode();
    renderAdminProducts();
  }
  function openAdmin() {
    let session = null;
    try { session = localStorage.getItem(KEYS.admin); } catch (e) { }
    if (session === "true") openAdminPanel();
    else openPanel(el.adminLoginModal, "#adminUsername");
  }
  function openAdminPanel() {
    renderAdminProducts();
    openPanel(el.adminPanel, "#closeAdminPanel");
  }
  function renderIconPicker() {
    const wrap = $("#pickerOptions");
    if (!wrap) return;
    wrap.innerHTML = ICON_CHOICES.map(name =>
      `<button type="button" class="picker-opt ${name === selectedIcon ? "active" : ""}" data-icon="${name}" aria-label="${name}" aria-pressed="${name === selectedIcon}" title="${name}">${icon(name)}</button>`
    ).join("");
  }
  function renderAdminProducts() {
    const list = $("#adminProductsList");
    const count = $("#adminCount");
    if (!list) return;
    if (count) count.textContent = t("admin.count", { n: numberFmt().format(products.length) });
    const fragment = document.createDocumentFragment();
    products.forEach(product => {
      const row = document.createElement("div");
      row.className = "admin-product-item" + (editingProductId === product.id ? " is-editing" : "");
      const oldPriceHTML = product.oldPrice > product.price ? ` <del>${money(product.oldPrice)}</del>` : "";
      row.innerHTML = `
        ${productVisual(product, "")}
        <div class="admin-product-info">
          <h4>${escapeHTML(pName(product))}</h4>
          <span>${money(product.price)}${oldPriceHTML}</span>
          <em>${catLabel(product.category)}</em>
        </div>
        <div class="admin-product-actions">
          <button class="edit-product-btn" type="button" data-edit-product="${product.id}">${icon("edit")} ${t("admin.edit")}</button>
          <button class="duplicate-product-btn" type="button" data-duplicate-product="${product.id}">${icon("copy")} ${t("admin.duplicate")}</button>
          <button class="delete-product-btn" type="button" data-delete-product="${product.id}">${icon("trash")} ${t("admin.delete")}</button>
        </div>`;
      fragment.appendChild(row);
    });
    list.innerHTML = "";
    list.appendChild(fragment);
  }
  function startEditProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    editingProductId = product.id;
    nameEnManual = false;
    descEnManual = false;
    uploadToken += 1;
    $("#productNameAr").value = product.ar.name || "";
    $("#productNameEn").value = product.en.name || "";
    $("#productDescriptionAr").value = product.ar.desc || "";
    $("#productDescriptionEn").value = product.en.desc || "";
    $("#productPrice").value = product.price;
    $("#productOldPrice").value = product.oldPrice > 0 ? product.oldPrice : "";
    $("#productCategory").value = product.category;
    selectedIcon = ICON_CHOICES.includes(product.icon) ? product.icon : "box";
    uploadedImage = product.image || "";
    const fileInput = $("#productImage");
    if (fileInput) fileInput.value = "";
    const submitBtn = $("#submitProductBtn");
    if (submitBtn) submitBtn.disabled = false;
    renderIconPicker();
    updateImagePreview();
    syncAdminFormMode();
    renderAdminProducts();
    const card = $("#adminFormCard");
    if (card) card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    $("#productNameAr").focus({ preventScroll: true });
    showToast(t("admin.editingNow"));
  }
  function duplicateProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    const copy = normalizeProduct({
      id: Date.now() + Math.floor(Math.random() * 1000),
      category: product.category,
      icon: product.icon,
      price: product.price,
      oldPrice: product.oldPrice,
      rating: product.rating || 5,
      sold: 0,
      image: product.image || "",
      ar: { name: product.ar.name, desc: product.ar.desc },
      en: { name: product.en.name, desc: product.en.desc }
    });
    products.unshift(copy);
    saveProducts();
    renderProducts();
    renderAdminProducts();
    renderCategoryCounts();
    showToast(t("admin.duplicated"));
  }
  function deleteProduct(id) {
    if (!window.confirm(t("admin.confirmDelete"))) return;
    products = products.filter(p => p.id !== id);
    cart = cart.filter(p => p.id !== id);
    favorites = favorites.filter(f => f !== id);
    if (editingProductId === id) resetProductForm();
    saveProducts(); saveCart(); saveFavorites();
    renderProducts(); renderCart(); renderAdminProducts(); renderCategoryCounts();
    showToast(t("admin.deleted"));
  }
  function compressProductImage(file) {
    return new Promise((resolve, reject) => {
      if (!file || !/^image\//.test(file.type)) { reject(new Error("type")); return; }
      if (file.size > 8 * 1024 * 1024) { reject(new Error("size")); return; }
      const url = URL.createObjectURL(file);
      const image = new Image();
      image.decoding = "async";
      const cleanup = () => URL.revokeObjectURL(url);
      image.onerror = () => { cleanup(); reject(new Error("decode")); };
      image.onload = () => {
        try {
          const w = image.naturalWidth, h = image.naturalHeight;
          if (!w || !h || w * h > 40000000) throw new Error("size");
          const scale = Math.min(1, 640 / Math.max(w, h));
          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.round(w * scale));
          canvas.height = Math.max(1, Math.round(h * scale));
          const ctx = canvas.getContext("2d");
          if (!ctx) throw new Error("canvas");
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          let data = canvas.toDataURL("image/webp", 0.78);
          if (data.indexOf("data:image/webp") !== 0) data = canvas.toDataURL("image/jpeg", 0.78);
          canvas.width = canvas.height = 0;
          resolve(data);
        } catch (error) { reject(error); }
        finally { cleanup(); }
      };
      image.src = url;
    });
  }
function initCountdown() {
    const boxes = { d: $("#cdDays"), h: $("#cdHours"), m: $("#cdMinutes") };
    const section = $("#offers");
    if (!boxes.d || !section) return;
    let end = Number(readStore(KEYS.offerEnd, 0));
    if (!Number.isFinite(end) || end <= Date.now()) {
      end = Date.now() + 3 * 86400000;
      writeStore(KEYS.offerEnd, end);
    }
    const pad = n => String(n).padStart(2, "0");
    const setText = (node, value) => { if (node.textContent !== value) node.textContent = value; };
    function tick() {
      let diff = end - Date.now();
      if (diff <= 0) { end = Date.now() + 3 * 86400000; writeStore(KEYS.offerEnd, end); diff = end - Date.now(); }
      const minutes = Math.ceil(diff / 60000);
      setText(boxes.d, pad(Math.floor(minutes / 1440)));
      setText(boxes.h, pad(Math.floor(minutes / 60) % 24));
      setText(boxes.m, pad(minutes % 60));
    }
    tick();
    let timer = null, visible = false;
    function sync() {
      const run = visible && !document.hidden;
      if (run) { tick(); if (!timer) timer = setInterval(tick, 60000); }
      else if (timer) { clearInterval(timer); timer = null; }
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }).observe(section);
    } else { visible = true; sync(); }
    document.addEventListener("visibilitychange", sync);
  }
function bindEvents() {
    $("#cartBtn").addEventListener("click", openCart);
    $("#closeCartBtn").addEventListener("click", closeCart);
    $("#clearCartBtn").addEventListener("click", () => {
      if (!cart.length || !window.confirm(t("cart.confirmClear"))) return;
      cart = []; saveCart(); renderCart(); showToast(t("cart.cleared"));
    });
    $("#checkoutBtn").addEventListener("click", checkout);
    const requestForm = $("#requestForm");
    if (requestForm) {
      requestForm.addEventListener("input", () => { saveRequestDraft(); renderRequestSummary(); });
      requestForm.addEventListener("change", () => { saveRequestDraft(); renderRequestSummary(); });
      requestForm.addEventListener("submit", e => { e.preventDefault(); sendRequest(); });
      $("#requestSubmitBtn").addEventListener("click", sendRequest);
      $("#requestSaveBtn").addEventListener("click", saveRequestToList);
      $("#requestResetBtn").addEventListener("click", resetRequestForm);
      const savedList = $("#requestSavedList");
      if (savedList) savedList.addEventListener("click", e => {
        const fillBtn = e.target.closest("[data-fill-request]");
        if (fillBtn) { fillRequest(Number(fillBtn.dataset.fillRequest)); return; }
        const delBtn = e.target.closest("[data-delete-request]");
        if (delBtn) deleteSavedRequest(Number(delBtn.dataset.deleteRequest));
      });
      const clearSavedBtn = $("#requestClearSavedBtn");
      if (clearSavedBtn) clearSavedBtn.addEventListener("click", () => {
        if (!savedRequests.length) return;
        if (!window.confirm(t("rq.confirmDelete"))) return;
        savedRequests = [];
        persistRequests();
        renderSavedRequests();
        showToast(t("rq.savedCleared"));
      });
    }
    el.overlay.addEventListener("click", closeActivePanel);
    el.cartItems.addEventListener("click", e => {
      const button = e.target.closest("button");
      if (!button || !el.cartItems.contains(button)) return;
      if (button.dataset.increase) changeQuantity(Number(button.dataset.increase), 1);
      else if (button.dataset.decrease) changeQuantity(Number(button.dataset.decrease), -1);
      else if (button.dataset.remove) removeFromCart(Number(button.dataset.remove));
    });
    el.productsGrid.addEventListener("click", e => {
      const button = e.target.closest("button");
      if (!button || !el.productsGrid.contains(button)) return;
      if (button.dataset.add) addToCart(Number(button.dataset.add), button);
      else if (button.dataset.favorite) toggleFavorite(Number(button.dataset.favorite), button);
    });
    $("#searchBtn").addEventListener("click", openSearch);
    $("#closeSearchBtn").addEventListener("click", closeSearch);
    el.searchInput.addEventListener("input", () => { clearTimeout(searchTimer); searchTimer = setTimeout(runSearch, 120); });
    el.searchInput.addEventListener("keydown", e => { if (e.key === "Enter") e.preventDefault(); });
    el.searchResults.addEventListener("click", e => {
      const row = e.target.closest("[data-search-category]");
      if (!row) return;
      const category = row.dataset.searchCategory;
      closeSearch();
      selectCategory(category, true);
    });
    $$(".category-card").forEach(btn => {
      btn.setAttribute("aria-pressed", String(btn.classList.contains("active")));
      btn.addEventListener("click", () => selectCategory(btn.dataset.category, true));
    });
    $("#showAllBtn").addEventListener("click", () => selectCategory("all", false));
    $("#newsletterForm").addEventListener("submit", e => {
      e.preventDefault();
      const input = $("#newsletterEmail");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim())) {
        showToast(t("nl.invalid"), "error"); input.focus(); return;
      }
      e.target.reset(); showToast(t("nl.done"));
    });
    el.mobileMenuBtn.addEventListener("click", () => {
      const open = el.navLinks.classList.toggle("show");
      el.mobileMenuBtn.classList.toggle("active", open);
      el.mobileMenuBtn.setAttribute("aria-expanded", String(open));
    });
    $$(".nav-links a, .nav-links button").forEach(a => a.addEventListener("click", closeMenu));
    $("#adminOpenBtn").addEventListener("click", openAdmin);
    $("#adminOpenBtnMobile").addEventListener("click", openAdmin);
    $("#closeAdminLogin").addEventListener("click", closeActivePanel);
    $("#closeAdminPanel").addEventListener("click", closeActivePanel);
    $("#logoutAdminBtn").addEventListener("click", () => {
      try { localStorage.removeItem(KEYS.admin); } catch (e) { }
      closeActivePanel(); showToast(t("admin.loggedOut"));
    });
    $("#adminLoginForm").addEventListener("submit", e => {
      e.preventDefault();
      const username = $("#adminUsername").value.trim();
      const password = $("#adminPassword").value;
      const error = $("#loginError");
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        try { localStorage.setItem(KEYS.admin, "true"); } catch (err) { }
        error.textContent = "";
        e.target.reset();
        openAdminPanel();
        showToast(t("admin.loggedIn"));
      } else error.textContent = t("admin.loginError");
    });
    $("#pickerOptions").addEventListener("click", e => {
      const btn = e.target.closest(".picker-opt");
      if (!btn) return;
      selectedIcon = btn.dataset.icon;
      $$(".picker-opt", $("#pickerOptions")).forEach(b => {
        const on = b === btn;
        b.classList.toggle("active", on);
        b.setAttribute("aria-pressed", String(on));
      });
    });
    const addSubmit = $("#addProductForm").querySelector('button[type="submit"]');
    const nameArInput = $("#productNameAr");
    const nameEnInput = $("#productNameEn");
    const descArInput = $("#productDescriptionAr");
    const descEnInput = $("#productDescriptionEn");
    nameEnInput.addEventListener("input", () => {
      nameEnManual = nameEnInput.value.trim().length > 0;
    });
    descEnInput.addEventListener("input", () => {
      descEnManual = descEnInput.value.trim().length > 0;
    });
    nameArInput.addEventListener("input", () => {
      if (!nameEnManual || !nameEnInput.value.trim()) {
        nameEnManual = false;
        const val = nameArInput.value;
        nameEnInput.value = translateArToEnSync(val, true);
        translateArToEnAsync(val, true, "name", res => {
          if (!nameEnManual) nameEnInput.value = res;
        });
      }
    });
    descArInput.addEventListener("input", () => {
      if (!descEnManual || !descEnInput.value.trim()) {
        descEnManual = false;
        const val = descArInput.value;
        descEnInput.value = translateArToEnSync(val, false);
        translateArToEnAsync(val, false, "desc", res => {
          if (!descEnManual) descEnInput.value = res;
        });
      }
    });
    const translateNowBtn = $("#translateNowBtn");
    if (translateNowBtn) {
      translateNowBtn.addEventListener("click", () => {
        nameEnManual = false;
        descEnManual = false;
        const nVal = nameArInput.value.trim();
        const dVal = descArInput.value.trim();
        if (nVal) {
          nameEnInput.value = translateArToEnSync(nVal, true);
          translateArToEnAsync(nVal, true, "name", res => { if (!nameEnManual) nameEnInput.value = res; });
        }
        if (dVal) {
          descEnInput.value = translateArToEnSync(dVal, false);
          translateArToEnAsync(dVal, false, "desc", res => { if (!descEnManual) descEnInput.value = res; });
        }
        showToast(t("admin.translated"));
      });
    }
    $("#productImage").addEventListener("change", async e => {
      const file = e.target.files[0];
      const token = ++uploadToken;
      const preview = $("#imagePreview");
      if (!file) { updateImagePreview(); addSubmit.disabled = false; return; }
      preview.textContent = t("admin.imageProcessing");
      addSubmit.disabled = true;
      try {
        const data = await compressProductImage(file);
        if (token !== uploadToken) return;
        uploadedImage = data;
        updateImagePreview();
      } catch (error) {
        if (token !== uploadToken) return;
        updateImagePreview();
        e.target.value = "";
        showToast(t(error.message === "size" ? "admin.imageTooLarge" : "admin.imageError"), "error");
      } finally {
        if (token === uploadToken) addSubmit.disabled = false;
      }
    });
    const clearImageBtn = $("#clearImageBtn");
    if (clearImageBtn) {
      clearImageBtn.addEventListener("click", () => {
        uploadToken += 1;
        uploadedImage = "";
        const fileInput = $("#productImage");
        if (fileInput) fileInput.value = "";
        updateImagePreview();
      });
    }
    function readProductFormPayload() {
      const nameAr = nameArInput.value.trim();
      const descAr = descArInput.value.trim();
      const price = Number($("#productPrice").value);
      const oldPrice = Number($("#productOldPrice").value) || 0;
      const category = $("#productCategory").value;
      if (!nameAr || !descAr || !price || !category) {
        showToast(t("admin.fillAll"), "error");
        return null;
      }
      const nameEn = nameEnInput.value.trim() || translateArToEnSync(nameAr, true) || nameAr;
      const descEn = descEnInput.value.trim() || translateArToEnSync(descAr, false) || descAr;
      return {
        category,
        icon: selectedIcon,
        price,
        oldPrice: oldPrice > price ? oldPrice : 0,
        image: uploadedImage,
        ar: { name: nameAr, desc: descAr },
        en: { name: nameEn, desc: descEn }
      };
    }
    $("#addProductForm").addEventListener("submit", e => {
      e.preventDefault();
      const payload = readProductFormPayload();
      if (!payload) return;
      if (editingProductId !== null) {
        const idx = products.findIndex(p => p.id === editingProductId);
        if (idx !== -1) {
          const prev = products[idx];
          const updated = normalizeProduct(Object.assign({}, prev, payload, {
            id: prev.id,
            rating: prev.rating || 5,
            sold: prev.sold || 0
          }));
          products[idx] = updated;
          cart.forEach(item => {
            if (item.id === updated.id) {
              Object.assign(item, updated, { quantity: item.quantity });
            }
          });
        } else {
          products.unshift(normalizeProduct(Object.assign({ id: editingProductId, rating: 5, sold: 0 }, payload)));
        }
        saveProducts();
        saveCart();
        renderProducts();
        renderCart();
        renderCategoryCounts();
        resetProductForm();
        showToast(t("admin.updated"));
      } else {
        products.unshift(normalizeProduct(Object.assign({
          id: Date.now(),
          rating: 5,
          sold: 0
        }, payload)));
        saveProducts();
        renderProducts();
        renderCategoryCounts();
        resetProductForm();
        showToast(t("admin.added"));
      }
    });
    const duplicateFromEditBtn = $("#duplicateFromEditBtn");
    if (duplicateFromEditBtn) {
      duplicateFromEditBtn.addEventListener("click", () => {
        const payload = readProductFormPayload();
        if (!payload) return;
        products.unshift(normalizeProduct(Object.assign({
          id: Date.now() + Math.floor(Math.random() * 1000),
          rating: 5,
          sold: 0
        }, payload)));
        saveProducts();
        renderProducts();
        renderCategoryCounts();
        resetProductForm();
        showToast(t("admin.duplicated"));
      });
    }
    const cancelEditBtn = $("#cancelEditBtn");
    if (cancelEditBtn) {
      cancelEditBtn.addEventListener("click", () => {
        resetProductForm();
      });
    }
    $("#adminProductsList").addEventListener("click", e => {
      const editBtn = e.target.closest("[data-edit-product]");
      if (editBtn) { startEditProduct(Number(editBtn.dataset.editProduct)); return; }
      const dupBtn = e.target.closest("[data-duplicate-product]");
      if (dupBtn) { duplicateProduct(Number(dupBtn.dataset.duplicateProduct)); return; }
      const delBtn = e.target.closest("[data-delete-product]");
      if (delBtn) deleteProduct(Number(delBtn.dataset.deleteProduct));
    });
    $$("#customerName, #customerPhone, #customerExtraPhone, #customerCity").forEach(inp => {
      inp.addEventListener("keydown", e => {
        if (e.key === "Enter") { e.preventDefault(); checkout(); }
      });
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") { closeActivePanel(); closeMenu(); }
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) { e.preventDefault(); openSearch(); }
      if (e.key === "Tab" && activePanel) {
        const focusable = $$('button:not([disabled]),a[href],input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex="0"]', activePanel)
          .filter(node => node.getClientRects().length);
        if (!focusable.length) { e.preventDefault(); return; }
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && (document.activeElement === first || !activePanel.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && (document.activeElement === last || !activePanel.contains(document.activeElement))) { e.preventDefault(); first.focus(); }
      }
    });
  }
function init() {
    initLang();
    initTheme();
    applyI18n();
    initCountdown();
    initScroll();
    restoreRequestDraft();
    bindEvents();
    renderRequestSummary();
    renderSavedRequests();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
