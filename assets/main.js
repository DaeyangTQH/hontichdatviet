(function () {
  "use strict";

  var header = document.querySelector("[data-header]");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Hero video: respect reduced-motion, give the user a pause control */
  var heroVideo = document.querySelector("[data-hero-video]");
  var videoToggle = document.querySelector("[data-video-toggle]");
  if (heroVideo && videoToggle) {
    var label = videoToggle.querySelector(".vt-label");
    var syncToggle = function () {
      var paused = heroVideo.paused;
      videoToggle.dataset.state = paused ? "paused" : "playing";
      videoToggle.setAttribute("aria-pressed", String(!paused));
      if (label && window.HTDV_I18N) label.textContent = window.HTDV_I18N.text(paused ? "play" : "pause");
      if (label) label.textContent = paused ? "Phát video" : "Tạm dừng video";
      if (label && window.HTDV_I18N) label.textContent = window.HTDV_I18N.text(paused ? "play" : "pause");
    };
    if (reduceMotion) {
      heroVideo.removeAttribute("autoplay");
      heroVideo.pause();
    }
    videoToggle.addEventListener("click", function () {
      if (heroVideo.paused) {
        var p = heroVideo.play();
        if (p && typeof p.catch === "function") p.catch(function () {});
      } else {
        heroVideo.pause();
      }
      syncToggle();
    });
    heroVideo.addEventListener("play", syncToggle);
    heroVideo.addEventListener("pause", syncToggle);
    syncToggle();
  }

  /* Sticky header border once scrolled past the hero top */
  if (header) {
    var onScroll = function () {
      if (document.body.classList.contains("page-product")) {
        header.classList.add("is-scrolled");
        return;
      }
      if (window.scrollY > 8) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Lightbox: any img[data-zoom] (including ones rendered later from JSON)
     opens the full, uncropped photo. Capture phase so a zoomable image
     inside a card link opens the lightbox instead of navigating. */
  var lightbox = document.createElement("dialog");
  lightbox.className = "lightbox";
  lightbox.setAttribute("aria-label", "Xem ảnh phóng to");
  lightbox.innerHTML =
    '<button type="button" class="lightbox-close" aria-label="Đóng ảnh">&times;</button>' +
    '<figure class="lightbox-figure">' +
      '<img class="lightbox-img" alt="" />' +
      '<figcaption class="lightbox-caption"></figcaption>' +
    '</figure>';
  document.body.appendChild(lightbox);

  var lightboxImg = lightbox.querySelector(".lightbox-img");
  var lightboxCaption = lightbox.querySelector(".lightbox-caption");

  var openLightbox = function (img) {
    var figure = img.closest("figure");
    var caption = figure && figure.querySelector("figcaption");
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent : img.alt;
    if (typeof lightbox.showModal === "function") lightbox.showModal();
    else lightbox.setAttribute("open", "");
    document.documentElement.classList.add("lightbox-open");
  };

  var closeLightbox = function () {
    if (typeof lightbox.close === "function") lightbox.close();
    else lightbox.removeAttribute("open");
  };

  lightbox.addEventListener("close", function () {
    document.documentElement.classList.remove("lightbox-open");
    lightboxImg.removeAttribute("src");
  });
  lightbox.addEventListener("click", function (event) {
    if (event.target !== lightboxImg) closeLightbox();
  });

  document.addEventListener(
    "click",
    function (event) {
      var img = event.target.closest && event.target.closest("img[data-zoom]");
      if (!img) return;
      event.preventDefault();
      event.stopPropagation();
      openLightbox(img);
    },
    true
  );

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && lightbox.open) {
      event.preventDefault();
      closeLightbox();
      return;
    }
    if (event.key !== "Enter" && event.key !== " ") return;
    var img = event.target.closest && event.target.closest("img[data-zoom]");
    if (!img) return;
    event.preventDefault();
    openLightbox(img);
  });

  var makeZoomablesFocusable = function () {
    document.querySelectorAll("img[data-zoom]:not([tabindex])").forEach(function (img) {
      if (img.closest("a")) return;
      img.tabIndex = 0;
      img.setAttribute("role", "button");
      img.setAttribute("aria-label", "Phóng to ảnh: " + img.alt);
    });
  };
  makeZoomablesFocusable();
  new MutationObserver(makeZoomablesFocusable).observe(document.body, { childList: true, subtree: true });

  /* Scroll reveal — enhances an already-visible default.
     CSS only hides [data-reveal] once .reveal-ready is set here,
     so content stays visible if JS or motion is unavailable. */
  var revealItems = Array.prototype.slice.call(
    document.querySelectorAll("[data-reveal]")
  );

  if (reduceMotion || !("IntersectionObserver" in window) || !revealItems.length) {
    return;
  }

  document.documentElement.classList.add("reveal-ready");

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var siblings = Array.prototype.slice.call(
            el.parentElement.querySelectorAll(":scope > [data-reveal]")
          );
          var index = siblings.indexOf(el);
          var delay = index > 0 ? Math.min(index * 80, 320) : 0;
          el.style.transitionDelay = delay + "ms";
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach(function (el) {
    observer.observe(el);
  });
})();
