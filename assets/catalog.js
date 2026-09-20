(function (global) {
  "use strict";

  var CATALOG_URL = "assets/data/catalog.json";

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getQueryParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function findCollection(catalog, collectionId) {
    var collections = (catalog && catalog.collections) || [];
    for (var i = 0; i < collections.length; i++) {
      if (collections[i].id === collectionId) return collections[i];
    }
    return null;
  }

  function findProduct(catalog, productId) {
    var collections = (catalog && catalog.collections) || [];
    for (var i = 0; i < collections.length; i++) {
      var products = collections[i].products || [];
      for (var j = 0; j < products.length; j++) {
        if (products[j].id === productId) {
          return {
            product: products[j],
            collection: collections[i]
          };
        }
      }
    }
    return null;
  }

  function loadCatalog() {
    return fetch(CATALOG_URL, { cache: "no-store" }).then(function (response) {
      if (!response.ok) {
        throw new Error("Không tải được catalog (" + response.status + ")");
      }
      return response.json();
    });
  }

  function productHref(productId) {
    return "product.html?id=" + encodeURIComponent(productId);
  }

  function renderProductCard(product) {
    return (
      '<li>' +
        '<a class="place-card" href="' + escapeHtml(productHref(product.id)) + '">' +
          '<div class="place-media">' +
            '<img src="' + escapeHtml(product.image) + '" alt="' + escapeHtml(product.alt || product.name) + '" width="1536" height="1024" loading="lazy" decoding="async" />' +
            '<span class="frame-corner" aria-hidden="true"></span>' +
          '</div>' +
          '<div class="place-body">' +
            '<h3 class="place-name">' + escapeHtml(product.name) + '</h3>' +
            '<p class="place-desc">' + escapeHtml(product.location) + ' · ' + escapeHtml(product.tagline) + '</p>' +
            '<span class="place-cta">Xem sản phẩm</span>' +
          '</div>' +
        '</a>' +
      '</li>'
    );
  }

  function bindTabs(root) {
    var tabs = Array.prototype.slice.call(root.querySelectorAll("[data-collection-tab]"));
    var panels = Array.prototype.slice.call(root.querySelectorAll("[data-collection-panel]"));
    if (!tabs.length) return;

    var activateTab = function (nextTab) {
      tabs.forEach(function (tab) {
        var selected = tab === nextTab;
        tab.setAttribute("aria-selected", String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });
      panels.forEach(function (panel) {
        var match = panel.id === nextTab.getAttribute("data-panel");
        if (match) panel.removeAttribute("hidden");
        else panel.setAttribute("hidden", "");
      });
    };

    tabs.forEach(function (tab, index) {
      tab.tabIndex = index === 0 ? 0 : -1;
      tab.addEventListener("click", function () {
        activateTab(tab);
      });
      tab.addEventListener("keydown", function (event) {
        var current = tabs.indexOf(tab);
        var target = current;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          target = (current + 1) % tabs.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          target = (current - 1 + tabs.length) % tabs.length;
        } else if (event.key === "Home") {
          target = 0;
        } else if (event.key === "End") {
          target = tabs.length - 1;
        } else {
          return;
        }
        event.preventDefault();
        tabs[target].focus();
        activateTab(tabs[target]);
      });
    });
  }

  function renderHomeCollections(catalog) {
    var root = document.querySelector("[data-collection-tabs]");
    if (!root) return;

    var collections = catalog.collections || [];
    var tablist = root.querySelector("[data-collection-tablist]");
    var panelsHost = root.querySelector("[data-collection-panels]");
    if (!tablist || !panelsHost) return;

    if (!collections.length) {
      panelsHost.innerHTML = '<p class="collection-empty">Chưa có bộ sưu tập nào.</p>';
      return;
    }

    tablist.innerHTML = collections
      .map(function (collection, index) {
        var selected = index === 0;
        var panelId = "panel-" + collection.id;
        return (
          '<button type="button" class="collection-tab" role="tab"' +
          ' id="tab-' + escapeHtml(collection.id) + '"' +
          ' aria-controls="' + escapeHtml(panelId) + '"' +
          ' aria-selected="' + String(selected) + '"' +
          ' data-collection-tab data-panel="' + escapeHtml(panelId) + '">' +
          escapeHtml(collection.name) +
          '<span class="collection-tab-count">' + (collection.products || []).length + '</span>' +
          '</button>'
        );
      })
      .join("");

    panelsHost.innerHTML = collections
      .map(function (collection, index) {
        var panelId = "panel-" + collection.id;
        var cards = (collection.products || []).map(renderProductCard).join("");
        return (
          '<div class="collection-panel" role="tabpanel" id="' + escapeHtml(panelId) + '"' +
          ' aria-labelledby="tab-' + escapeHtml(collection.id) + '"' +
          ' data-collection-panel' + (index === 0 ? "" : " hidden") + '>' +
            '<p class="collection-panel-lead">' +
              escapeHtml(collection.tagline) +
              (collection.description ? " — " + escapeHtml(collection.description) : "") +
            '</p>' +
            '<ul class="collection-grid">' + cards + '</ul>' +
          '</div>'
        );
      })
      .join("");

    var title = document.getElementById("collection-title");
    var intro = root.closest(".collection") && root.closest(".collection").querySelector(".section-intro");
    var first = collections[0];
    if (title && first) {
      title.textContent = "Bộ " + first.name + " — " + (first.products || []).length + " mô hình.";
    }
    if (intro && first) {
      intro.textContent = first.description || "";
    }

    var factCount = document.querySelector("[data-catalog-product-count]");
    if (factCount) {
      var total = collections.reduce(function (sum, c) {
        return sum + ((c.products && c.products.length) || 0);
      }, 0);
      factCount.textContent = String(total);
    }

    bindTabs(root);
  }

  function renderTimeline(timeline) {
    if (!timeline || !timeline.length) return "";
    return (
      '<ol class="timeline" aria-label="Dòng thời gian">' +
      timeline
        .map(function (item) {
          return (
            "<li>" +
            '<span class="t-year">' + escapeHtml(item.year) + "</span>" +
            '<span class="t-text">' + escapeHtml(item.text) + "</span>" +
            "</li>"
          );
        })
        .join("") +
      "</ol>"
    );
  }

  function renderRelated(collection, currentId) {
    var others = (collection.products || []).filter(function (p) {
      return p.id !== currentId;
    });
    if (!others.length) return "";
    return (
      '<section class="product-related" aria-labelledby="related-title">' +
        '<header class="section-head">' +
          '<p class="kicker">Cùng bộ sưu tập</p>' +
          '<h2 id="related-title" class="title">Thêm mô hình trong bộ ' + escapeHtml(collection.name) + '</h2>' +
        '</header>' +
        '<ul class="collection-grid">' +
          others.map(renderProductCard).join("") +
        '</ul>' +
      '</section>'
    );
  }

  function renderProductPage(catalog) {
    var mount = document.querySelector("[data-product-page]");
    if (!mount) return;

    var productId = getQueryParam("id");
    var found = productId ? findProduct(catalog, productId) : null;

    if (!found) {
      document.title = "Không tìm thấy sản phẩm — Hồn Tích Đất Việt";
      mount.innerHTML =
        '<div class="container product-missing">' +
          '<p class="kicker">Sản phẩm</p>' +
          '<h1 class="headline">Không tìm thấy mô hình này.</h1>' +
          '<p class="section-intro">Có thể liên kết đã cũ. Quay lại bộ sưu tập để chọn mô hình khác.</p>' +
          '<a class="btn btn-primary" href="index.html#collection">Xem bộ sưu tập</a>' +
        '</div>';
      return;
    }

    var product = found.product;
    var collection = found.collection;

    document.title = product.name + " — Hồn Tích Đất Việt";
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        product.name + " · " + product.location + " — " + (product.summary || product.tagline)
      );
    }

    var placeBlock = product.placeImage
      ? (
          '<figure class="story-photo">' +
            '<img src="' + escapeHtml(product.placeImage) + '" alt="' + escapeHtml(product.placeAlt || product.name) + '" width="960" height="640" loading="lazy" decoding="async" />' +
            '<figcaption>' + escapeHtml(product.placeAlt || ("Địa danh thật — " + product.name)) + '</figcaption>' +
          '</figure>'
        )
      : "";

    mount.innerHTML =
      '<div class="container product-shell">' +
        '<nav class="product-crumb" aria-label="Đường dẫn">' +
          '<a href="index.html">Trang chủ</a>' +
          '<span aria-hidden="true">/</span>' +
          '<a href="index.html#collection">' + escapeHtml(collection.name) + '</a>' +
          '<span aria-hidden="true">/</span>' +
          '<span>' + escapeHtml(product.name) + '</span>' +
        '</nav>' +

        '<div class="product-hero story-grid">' +
          '<div class="story-media-stack">' +
            '<figure class="story-photo story-photo--lead product-shot">' +
              '<img src="' + escapeHtml(product.image) + '" alt="' + escapeHtml(product.alt || product.name) + '" width="1536" height="1024" decoding="async" />' +
              '<figcaption>Mô hình ' + escapeHtml(product.name) + ' — bộ ' + escapeHtml(collection.name) + '.</figcaption>' +
            '</figure>' +
            placeBlock +
          '</div>' +

          '<div class="story-panel">' +
            '<header class="story-panel-head">' +
              '<p class="kicker">Bộ ' + escapeHtml(collection.name) + '</p>' +
              '<h1 class="title">' + escapeHtml(product.name) + '</h1>' +
              '<p class="story-sub">' + escapeHtml(product.location) + ' · ' + escapeHtml(product.tagline) + '</p>' +
            '</header>' +
            '<p class="product-summary">' + escapeHtml(product.summary || "") + '</p>' +
            renderTimeline(product.timeline) +
            (product.funFact
              ? '<div class="funfact"><span class="funfact-label">Fun fact</span><p>' + escapeHtml(product.funFact) + '</p></div>'
              : "") +
            '<div class="product-actions">' +
              '<a class="btn btn-primary" href="mailto:hello@hontichdatviet.vn?subject=' + encodeURIComponent("Quan tâm: " + product.name) + '">Liên hệ mua / hợp tác</a>' +
              '<a class="btn btn-ghost" href="index.html#collection">Các mô hình khác</a>' +
            '</div>' +
          '</div>' +
        '</div>' +

        renderRelated(collection, product.id) +
      '</div>';
  }

  function initCatalogPages() {
    return loadCatalog()
      .then(function (catalog) {
        global.HTDV_CATALOG = catalog;
        renderHomeCollections(catalog);
        renderProductPage(catalog);
        return catalog;
      })
      .catch(function (error) {
        console.error(error);
        var homeRoot = document.querySelector("[data-collection-panels]");
        if (homeRoot) {
          homeRoot.innerHTML =
            '<p class="collection-empty">Không tải được dữ liệu bộ sưu tập. Hãy mở site bằng local server (không dùng file://).</p>';
        }
        var productMount = document.querySelector("[data-product-page]");
        if (productMount) {
          productMount.innerHTML =
            '<div class="container product-missing">' +
              '<h1 class="headline">Không tải được dữ liệu sản phẩm.</h1>' +
              '<p class="section-intro">Mở trang qua local server để đọc file JSON.</p>' +
              '<a class="btn btn-primary" href="index.html">Về trang chủ</a>' +
            '</div>';
        }
      });
  }

  global.HTDV = {
    loadCatalog: loadCatalog,
    findProduct: findProduct,
    findCollection: findCollection,
    initCatalogPages: initCatalogPages
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCatalogPages);
  } else {
    initCatalogPages();
  }
})(window);
