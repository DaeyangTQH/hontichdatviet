(function (global) {
  "use strict";
  var KEY = "htdv-language";
  var dictionaries = {
    vi: { navWhy: "Vì sao khác biệt", navCraft: "Chất liệu", collection: "Khám phá bộ sưu tập", collectionShort: "Bộ sưu tập", skip: "Bỏ qua, tới nội dung chính", home: "trang chủ", collectionLabel: "Bộ sưu tập", brand: "Thương hiệu", contact: "Liên hệ đặt mua", collectionLink: "Bộ sưu tập Di sản", craft: "Chất liệu & thủ công", pause: "Tạm dừng video", play: "Phát video", product: "Sản phẩm", homeLabel: "Trang chủ", viewProduct: "Xem sản phẩm", loading: "Đang tải", notFound: "Không tìm thấy sản phẩm", backCollection: "Xem bộ sưu tập", related: "Cùng bộ sưu tập", funFact: "Điều thú vị", buy: "Đặt mua", contactBuy: "Liên hệ đặt mua", contactNote: "Qua Zalo, Fanpage Facebook hoặc email.", contactTitle: "Chọn cách liên hệ tiện nhất cho bạn.", contactIntro: "Nhắn cho Hồn Tích Đất Việt để hỏi giá, đặt mô hình hoặc đặt quà tặng theo bộ. Bọn mình sẽ phản hồi sớm nhất có thể.", messageZalo: "Nhanh nhất — nhắn tin hoặc gọi trực tiếp.", messageFacebook: "Xem thêm ảnh sản phẩm và nhắn tin qua Messenger.", messageEmail: "Phù hợp cho đơn số lượng lớn hoặc quà tặng doanh nghiệp.", sendZalo: "Nhắn Zalo", openFanpage: "Mở Fanpage", sendEmail: "Gửi email" },
    en: { navWhy: "Why it’s different", navCraft: "Materials", collection: "Explore the collection", collectionShort: "Collection", skip: "Skip to main content", home: "home", collectionLabel: "Collection", brand: "Brand", contact: "Contact to order", collectionLink: "Heritage collection", craft: "Materials & craft", pause: "Pause video", play: "Play video", product: "Product", homeLabel: "Home", viewProduct: "View product", loading: "Loading", notFound: "Product not found", backCollection: "View collection", related: "More from the collection", funFact: "Fun fact", buy: "Order", contactBuy: "Contact to order", contactNote: "Via Zalo, Facebook or email.", contactTitle: "Choose the easiest way to reach us.", contactIntro: "Message Hồn Tích Đất Việt for prices, model orders or gift sets. We’ll get back to you as soon as we can.", messageZalo: "Fastest — message or call directly.", messageFacebook: "See more product photos and message us on Messenger.", messageEmail: "Best for larger orders or corporate gifts.", sendZalo: "Message on Zalo", openFanpage: "Open fanpage", sendEmail: "Send email" }
  };
  function get() { return global.localStorage.getItem(KEY) === "en" ? "en" : "vi"; }
  function text(key) { return (dictionaries[get()] || dictionaries.vi)[key] || key; }
  function copy(selector, vi, en) { document.querySelectorAll(selector).forEach(function (el, index) { var value = get() === "en" ? en : vi; if (Array.isArray(value)) value = value[index] || value[value.length - 1]; if (value == null) return; if (!el.children.length) { el.textContent = value; return; } Array.prototype.slice.call(el.childNodes).filter(function (node) { return node.nodeType === 3; }).forEach(function (node) { node.remove(); }); el.appendChild(document.createTextNode(value)); }); }
  function markup(selector, vi, en) { document.querySelectorAll(selector).forEach(function (el) { el.innerHTML = get() === "en" ? en : vi; }); }
  function applyPageCopy() {
    copy(".hero .kicker", "Hồn Tích Đất Việt · Di sản Việt Nam", "Hồn Tích Đất Việt · Vietnamese heritage");
    copy("#hero-title", "Mô hình địa danh Việt Nam, in 3D.", "Vietnamese landmarks, crafted in 3D.");
    markup("#hero-title", "Mô hình địa danh<br>Việt Nam, <em>in 3D</em>.", "<span class=\"hero-title-line\">Vietnamese landmarks,</span><br><em>crafted in 3D</em>.");
    copy(".hero .lede", "Quà lưu niệm thủ công để trưng bày — mỗi mô hình một địa danh, gom thành bộ sưu tập di sản Việt Nam.", "Handcrafted keepsakes for display — one landmark per model, collected as Vietnamese heritage.");
    copy(".hero-en", "Mô hình địa danh Việt Nam, thủ công bằng công nghệ 3D.", "Vietnamese landmark models, crafted in 3D.");
    copy(".hero-actions .btn-primary", "Khám phá bộ sưu tập", "Explore the collection");
    copy(".hero-actions .btn-ghost", "Xem chất liệu & thủ công", "See materials & craft");
    copy(".hero-facts dd", ["mô hình trong bộ Di sản", "in 3D chi tiết, hoàn thiện thủ công", "bộ sưu tập — mang di sản về nhà"], ["models in the Heritage collection", "detailed 3D print, hand-finished", "collection — bring heritage home"]);
    copy(".showcase figure figcaption", "Bộ Di sản: Khuê Văn Các, Chùa Một Cột và Tháp Rùa — in 3D, sơn tay từng chi tiết.", "The Heritage collection: Khue Van Cac, One Pillar Pagoda and Turtle Tower — 3D printed and hand-finished.");
    copy("#why .kicker", "Vì sao khác biệt", "Why it’s different");
    copy("#why-title", "Không phải quà lưu niệm đại trà. Là bộ sưu tập di sản Việt.", "Not a mass-produced souvenir. A collection of Vietnamese heritage.");
    markup("#why-title", "Không phải quà lưu niệm đại trà. <em>Là bộ sưu tập di sản Việt.</em>", "Not a mass-produced souvenir. <em>A collection of Vietnamese heritage.</em>");
    copy(".compare-name", ["Quà lưu niệm thường", "Hồn Tích Đất Việt"], ["Ordinary souvenir", "Hồn Tích Đất Việt"]);
    copy(".compare-old li, .compare-new li", ["Chỉ để trang trí rồi quên", "Không gắn với di sản cụ thể", "Gia công đại trà, ít chi tiết", "Mua lẻ, không thành bộ", "Thiết kế để trưng bày lâu dài", "Mỗi mô hình một địa danh Việt Nam", "In 3D chi tiết, hoàn thiện thủ công", "Sưu tập theo bộ — Di sản"], ["Made to decorate, then forgotten", "Not tied to a specific heritage site", "Mass-produced with little detail", "Bought individually, not as a set", "Designed for long-term display", "One model for each Vietnamese landmark", "Detailed 3D printing, hand-finished", "Collect by set — Heritage"]);
    copy("#collection-title", "Bộ sưu tập", "Collection");
    copy("#craft .kicker", "Chất liệu & thủ công", "Materials & craft");
    copy("#craft-title", "In 3D chi tiết, hoàn thiện bằng tay.", "Detailed 3D printing, finished by hand.");
    copy(".craft-item h3", ["In 3D", "Hoàn thiện thủ công", "Sưu tập bền lâu"], ["3D printed", "Hand-finished", "Made to collect"]);
    copy(".craft-item p", ["Từng chi tiết mái cong, cửa sổ và trụ được in chính xác theo mô hình địa danh thật.", "Từng chi tiết được làm sạch và chỉnh bằng tay trước khi đóng gói.", "Thiết kế để trưng bày năm này qua năm khác — và để gom đủ cả bộ di sản."], ["Every curved roof, window and pillar is printed from the real landmark.", "Every detail is cleaned and refined by hand before packing.", "Designed to display for years — and to complete the Heritage set."]);
    copy("#closing-title", "Bắt đầu bộ sưu tập di sản của riêng bạn.", "Start your own heritage collection.");
    markup("#closing-title", "Bắt đầu bộ sưu tập di sản của riêng bạn.", "Start your own heritage collection.");
    copy(".closing .section-intro", "Mang một địa danh Việt Nam về nhà — trưng bày, tặng, và gom đủ bộ.", "Bring a Vietnamese landmark home — display it, gift it, and collect the set.");
    copy(".site-footer .footer-brand p", "Mô hình di sản Việt Nam — in 3D, hoàn thiện thủ công.", "Vietnamese heritage models — 3D printed and hand-finished.");
    copy(".footer-col h4", ["Bộ sưu tập", "Thương hiệu", "Liên hệ đặt mua"], ["Collection", "Brand", "Contact to order"]);
    copy(".footer-col a", ["Bộ sưu tập Di sản", "Vì sao khác biệt", "Chất liệu & thủ công", "Zalo · 0985 904 488", "Fanpage Facebook", "hontichdatviet@gmail.com"], ["Heritage collection", "Why it’s different", "Materials & craft", "Zalo · 0985 904 488", "Facebook fanpage", "hontichdatviet@gmail.com"]);
    copy(".footer-base p", ["© 2026 Hồn Tích Đất Việt. In 3D, mang di sản về nhà.", "Mô hình địa danh Việt Nam, thủ công bằng công nghệ 3D."], ["© 2026 Hồn Tích Đất Việt. 3D printed, bringing heritage home.", "Collectible Vietnamese landmark models, crafted in 3D."]);
  }
  function addSwitcher() {
    document.querySelectorAll("[data-header] .nav").forEach(function (nav) {
      var existing = nav.querySelector("[data-language-switcher]");
      if (existing) {
        if (existing.dataset.bound !== "true") { existing.addEventListener("click", function () { set(get() === "vi" ? "en" : "vi"); }); existing.dataset.bound = "true"; }
        return;
      }
      var button = document.createElement("button");
      button.type = "button"; button.className = "language-switcher"; button.setAttribute("data-language-switcher", "");
      button.setAttribute("aria-label", "VI | EN — change language");
      button.innerHTML = '<span data-lang-option="vi">VI</span><span aria-hidden="true">|</span><span data-lang-option="en">EN</span>';
      button.addEventListener("click", function () { set(get() === "vi" ? "en" : "vi"); });
      nav.insertBefore(button, nav.querySelector(".btn-nav"));
    });
  }
  function set(language) {
    var lang = language === "en" ? "en" : "vi";
    global.localStorage.setItem(KEY, lang); document.documentElement.lang = lang; addSwitcher();
    document.querySelectorAll("[data-language-switcher]").forEach(function (button) {
      button.querySelectorAll("[data-lang-option]").forEach(function (item) { item.classList.toggle("is-active", item.dataset.langOption === lang); });
    });
    document.dispatchEvent(new CustomEvent("htdv:languagechange", { detail: { language: lang } }));
    var d = dictionaries[lang];
    if (document.body.classList.contains("page-contact")) document.title = lang === "en" ? "Contact to order — Hồn Tích Đất Việt" : "Liên hệ đặt mua — Hồn Tích Đất Việt";
    else if (document.body.classList.contains("page-product")) document.title = lang === "en" ? "Product — Hồn Tích Đất Việt" : "Sản phẩm — Hồn Tích Đất Việt";
    else document.title = lang === "en" ? "Hồn Tích Đất Việt — Vietnamese heritage models in 3D" : "Hồn Tích Đất Việt — Mô hình di sản Việt Nam in 3D";
    var description = document.querySelector('meta[name="description"]');
    if (description && lang === "en") description.content = document.body.classList.contains("page-contact") ? "Contact Hồn Tích Đất Việt to order handcrafted Vietnamese heritage models in 3D." : "Vietnamese landmark models in 3D — handcrafted collectibles made for display.";
    document.querySelectorAll(".nav-links a").forEach(function (el, i) { el.textContent = i === 0 ? d.navWhy : d.navCraft; });
    document.querySelectorAll(".btn-nav .lbl-full").forEach(function (el) { el.textContent = d.collection; });
    document.querySelectorAll(".btn-nav .lbl-short").forEach(function (el) { el.textContent = d.collectionShort; });
    document.querySelectorAll(".skip-link").forEach(function (el) { el.textContent = d.skip; });
    document.querySelectorAll("[data-video-toggle] .vt-label").forEach(function (el) { el.textContent = document.querySelector("[data-video-toggle]") && document.querySelector("[data-video-toggle]").dataset.state === "paused" ? d.play : d.pause; });
    if (document.body.classList.contains("page-contact")) {
      var title = document.querySelector(".contact-head .headline"), intro = document.querySelector(".contact-head .section-intro");
      if (title) title.textContent = d.contactTitle; if (intro) intro.textContent = d.contactIntro;
      document.querySelectorAll(".contact-desc").forEach(function (el, i) { el.textContent = [d.messageZalo, d.messageFacebook, d.messageEmail][i]; });
      document.querySelectorAll(".contact-cta").forEach(function (el, i) { el.textContent = [d.sendZalo, d.openFanpage, d.sendEmail][i]; });
    }
    applyPageCopy();
    return lang;
  }
  global.HTDV_I18N = { get: get, set: set, text: text, dict: dictionaries };
  document.addEventListener("DOMContentLoaded", function () { addSwitcher(); set(get()); });
})(window);
