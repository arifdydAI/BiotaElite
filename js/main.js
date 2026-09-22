/* ============================================================
   Zoology Educational Website - main.js
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Global navigation ---------- */
  var siteHeader = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");
  var navGroups = document.querySelectorAll(".nav-group");

  function closeDropdowns() {
    navGroups.forEach(function (group) {
      group.classList.remove("open");
      var trigger = group.querySelector(".nav-trigger");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    });
  }

  function setMenuOpen(open) {
    if (!mainNav || !navToggle) return;
    mainNav.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close menu / মেনু বন্ধ করুন" : "Open menu / মেনু খুলুন");
    navToggle.innerHTML = open ? "\u2715" : "\u2630";
    if (!open) closeDropdowns();
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      setMenuOpen(!mainNav.classList.contains("open"));
    });
    navGroups.forEach(function (group) {
      var trigger = group.querySelector(".nav-trigger");
      if (!trigger) return;
      trigger.addEventListener("click", function () {
        var isOpen = group.classList.contains("open");
        closeDropdowns();
        if (!isOpen) {
          group.classList.add("open");
          trigger.setAttribute("aria-expanded", "true");
        }
      });
    });
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenuOpen(false);
      });
    });
    document.addEventListener("click", function (e) {
      if (siteHeader && !siteHeader.contains(e.target)) {
        setMenuOpen(false);
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        var openTrigger = document.querySelector(".nav-group.open .nav-trigger");
        setMenuOpen(false);
        if (openTrigger) openTrigger.focus();
        else if (navToggle) navToggle.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) setMenuOpen(false);
    });
  }

  /* ---------- Safe future-route navigation ---------- */
  document.querySelectorAll(".nav-item-disabled").forEach(function (item) {
    var label = item.querySelector("span");
    if (!label || !["Marine Life", "Bangladesh Biodiversity"].includes(label.textContent.trim())) return;
    var link = document.createElement("a");
    link.className = "nav-link";
    var isBangladesh = label.textContent.trim() === "Bangladesh Biodiversity";
    link.setAttribute("data-nav-key", isBangladesh ? "bangladesh" : "marine");
    link.href = isBangladesh ? "bangladesh.html" : "marine-life.html";
    Array.from(item.children).slice(0, 2).forEach(function (child) { link.appendChild(child.cloneNode(true)); });
    item.replaceWith(link);
  });

  /* ---------- Stacked bilingual headings ---------- */
  document.querySelectorAll("h1, h2, h3, h4, .eyebrow").forEach(function (heading) {
    if (heading.querySelector("a, .bilingual-heading-bn")) return;
    var text = heading.textContent.trim();
    var separator = text.indexOf(" / ");
    if (separator < 1) return;
    var english = text.slice(0, separator).trim();
    var bangla = text.slice(separator + 3).trim();
    heading.textContent = "";
    heading.appendChild(document.createTextNode(english));
    var subtitle = document.createElement("span");
    subtitle.className = "bilingual-heading-bn";
    subtitle.textContent = bangla;
    heading.appendChild(subtitle);
  });

  document.querySelectorAll("[data-nav-key]").forEach(function (link) {
    var page = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    var target = (link.getAttribute("href") || "").toLowerCase();
    if (target === page || (page === "" && target === "index.html")) {
      link.classList.add("active");
      var parentGroup = link.closest(".nav-group");
      if (parentGroup) parentGroup.classList.add("is-active");
    }
  });

  /* ---------- Stacked navigation icons (functional line icons, no emoji) ---------- */
  var NAV_ICONS = {
    home: '<path d="M4 11l8-7 8 7"/><path d="M6 9.5V20h4v-5h4v5h4V9.5"/>',
    explore: '<circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5l-2.5 5-4.5 2 2.5-5z"/>',
    research: '<path d="M9.5 3h5"/><path d="M10 3v5L4.8 17a2.4 2.4 0 0 0 2.1 3.5h10.2a2.4 2.4 0 0 0 2.1-3.5L14 8V3"/><path d="M7.5 14.5h9"/>',
    resources: '<rect x="3.5" y="4.5" width="17" height="4.5" rx="1"/><path d="M5.5 9v10.5h13V9"/><path d="M10 13h4"/>',
    about: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5"/><circle cx="12" cy="8" r="0.7" fill="currentColor" stroke="none"/>',
    contact: '<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4.5 8l7.5 5.5L19.5 8"/>'
  };
  function navIconSVG(name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + NAV_ICONS[name] + "</svg>";
  }
  function decorateNavItem(element, key) {
    if (!NAV_ICONS[key] || element.querySelector(".nav-icon")) return;
    var icon = document.createElement("span");
    icon.className = "nav-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML = navIconSVG(key);
    element.insertBefore(icon, element.firstChild);
  }
  document.querySelectorAll(".main-nav > a.nav-link").forEach(function (link) {
    decorateNavItem(link, link.getAttribute("data-nav-key"));
  });
  document.querySelectorAll(".nav-group > .nav-trigger").forEach(function (trigger) {
    var group = trigger.closest(".nav-group");
    decorateNavItem(trigger, group && group.getAttribute("data-nav-group"));
  });

  /* ---------- Safe future-route navigation ---------- */
  document.querySelectorAll(".nav-item-disabled").forEach(function (item) {
    var label = item.querySelector("span");
    if (!label || !["Marine Life", "Bangladesh Biodiversity"].includes(label.textContent.trim())) return;
    var link = document.createElement("a");
    link.className = "nav-link";
    var isBangladesh = label.textContent.trim() === "Bangladesh Biodiversity";
    link.setAttribute("data-nav-key", isBangladesh ? "bangladesh" : "marine");
    link.href = isBangladesh ? "bangladesh.html" : "marine-life.html";
    Array.from(item.children).slice(0, 2).forEach(function (child) { link.appendChild(child.cloneNode(true)); });
    item.replaceWith(link);
  });

/* ---------- Back Navigation ---------- */
  // Fallback URLs for pages that have back navigation
  var BACK_FALLBACKS = {
    "species.html": "assets.html",
    "taxon.html": "phyla.html"
  };

  // Determine the current page
  function getCurrentPage() {
    var path = window.location.pathname.split("/").pop().toLowerCase();
    return path || "index.html";
  }

  // Check if a URL is an internal BiotaElite page
  function isInternalPage(url) {
    try {
      var u = new URL(url, window.location.origin);
      return u.origin === window.location.origin && u.pathname.endsWith(".html");
    } catch (e) {
      return false;
    }
  }

  // Get the fallback URL for the current page
  function getFallbackUrl() {
    var page = getCurrentPage();
    return BACK_FALLBACKS[page] || null;
  }

  // Check if a URL is a meaningful internal page (not index.html)
  function isMeaningfulInternalPage(url) {
    if (!isInternalPage(url)) return false;
    var page = new URL(url, window.location.origin).pathname.split("/").pop().toLowerCase();
    return page !== "index.html" && page !== "";
  }

  // Initialize back navigation buttons
  function initBackNavigation() {
    var backButtons = document.querySelectorAll(".back-nav");
    backButtons.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();

        // Check if there's a meaningful internal history entry
        var historyLength = window.history.length;
        var referrer = document.referrer;
        var hasInternalHistory = historyLength > 1 && isMeaningfulInternalPage(referrer);

        if (hasInternalHistory) {
          // Use browser history
          window.history.back();
        } else {
          // Use logical fallback
          var fallback = getFallbackUrl();
          if (fallback) {
            window.location.href = fallback;
          }
        }
      });
    });
  }

  // Initialize on DOMContentLoaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBackNavigation);
  } else {
    initBackNavigation();
  }

  /* ---------- Theme toggle ---------- */
  var themeBtn = document.querySelector(".theme-toggle");
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (themeBtn) themeBtn.textContent = theme === "dark" ? "\u263d" : "\u263e";
  }
  if (themeBtn) {
    var saved = null;
    try { saved = localStorage.getItem("biota-theme"); } catch (e) {}
    applyTheme(saved || "light");
    themeBtn.addEventListener("click", function () {
      var next =
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "light"
          : "dark";
      applyTheme(next);
      try { localStorage.setItem("biota-theme", next); } catch (e) {}
    });

    /* ---------- Fish, Marine Life, and Bangladesh records ---------- */
    var WITHHELD_LABEL = "Withheld for Scientific Review / বৈজ্ঞানিক পর্যালোচনার জন্য স্থগিত";
    var UNVERIFIED_LABEL = "Not yet verified — do not treat as authoritative zoological content. / এখনও যাচাই করা হয়নি — কর্তৃত্বপূর্ণ তথ্য হিসেবে বিবেচনা করবেন না।";
    var UNAVAILABLE_LABEL = "Unavailable / Not yet verified / অনুপলব্ধ / এখনও যাচাই করা হয়নি";
    function extValue(value) {
      if (value === undefined || value === null || value === "") return UNAVAILABLE_LABEL;
      if (Array.isArray(value)) return value.length ? value.join(", ") : UNAVAILABLE_LABEL;
      if (typeof value === "object") {
        var parts = [value.min, value.max, value.unit].filter(function (v) { return v !== undefined && v !== null && v !== ""; });
        return parts.length ? parts.join("–") : UNAVAILABLE_LABEL;
      }
      return String(value);
    }
    function extRow(parent, label, value) {
      var row = document.createElement("p"); row.className = "fish-meta";
      var strong = document.createElement("strong"); strong.textContent = label + ": "; row.appendChild(strong);
      row.appendChild(document.createTextNode(extValue(value))); parent.appendChild(row); return row;
    }
    function speciesRefRow(parent, record) {
      var row = document.createElement("p"); row.className = "fish-meta";
      var strong = document.createElement("strong"); strong.textContent = "Species reference / Species সম্পর্ক: "; row.appendChild(strong);
      row.appendChild(document.createTextNode(record.speciesId ? record.speciesId + " (relationship unresolved / সম্পর্ক অনিষ্পন্ন)" : UNAVAILABLE_LABEL)); parent.appendChild(row); return row;
    }
    function reviewStateRow(parent, record) {
      var row = document.createElement("p"); row.className = "fish-meta";
      var strong = document.createElement("strong"); strong.textContent = "Review state / পর্যালোচনার অবস্থা: "; row.appendChild(strong);
      row.appendChild(document.createTextNode("needsReview=" + record.needsReview + ", relationship=" + extValue(record.relationshipStatus) + ", visibility=" + extValue(record.publicVisibility))); parent.appendChild(row); return row;
    }
    /* ---------- Fish Classification Hierarchy ---------- */
    var hierarchyRoot = document.querySelector("[data-fish-hierarchy]");
    if (hierarchyRoot) {
      var hierarchySearch = hierarchyRoot.querySelector("[data-fish-hierarchy-search]");
      var hierarchyStatus = hierarchyRoot.querySelector("[data-fish-hierarchy-status]");
      var hierarchyCrumb = hierarchyRoot.querySelector("[data-fish-hierarchy-crumb]");
      var hierarchyList = hierarchyRoot.querySelector("[data-fish-hierarchy-list]");
      var hierarchyEmpty = hierarchyRoot.querySelector("[data-fish-hierarchy-empty]");
      var hierarchyError = hierarchyRoot.querySelector("[data-fish-hierarchy-error]");
      var hierarchyNodes = [];
      var hierarchyById = {};
      var hierarchySpecies = {};
      var hierarchyPath = [];
      var hierarchyOpenOrder = null;
      var hierarchyRankLabels = {
        "major-group": "Major group / প্রধান দল",
        "class": "Class / শ্রেণি",
        "subclass": "Subclass / উপশ্রেণি",
        "group": "Group / দল",
        "order": "Order / বর্গ"
      };
      function toBnDigits(n) {
        return String(n).replace(/[0-9]/g, function (d) { return "০১২৩৪৫৬৭৮৯"[Number(d)]; });
      }
      var hierarchyBackBtn = document.createElement("button");
      hierarchyBackBtn.type = "button";
      hierarchyBackBtn.className = "hierarchy-back";
      hierarchyBackBtn.hidden = true;
      var hierarchyBackArrow = document.createElement("span");
      hierarchyBackArrow.setAttribute("aria-hidden", "true");
      hierarchyBackArrow.textContent = "←";
      hierarchyBackBtn.appendChild(hierarchyBackArrow);
      var hierarchyBackText = document.createElement("span");
      hierarchyBackText.textContent = "Back";
      hierarchyBackBtn.appendChild(hierarchyBackText);
      var hierarchyBackBn = document.createElement("span");
      hierarchyBackBn.className = "hierarchy-back-bn";
      hierarchyBackBn.textContent = "ফিরে যান";
      hierarchyBackBtn.appendChild(hierarchyBackBn);
      hierarchyBackBtn.addEventListener("click", function () {
        if (!hierarchyPath.length) return;
        hierarchyPath.pop();
        hierarchyOpenOrder = null;
        try { history.replaceState(null, "", window.location.pathname + window.location.search); } catch (e) {}
        renderHierarchy();
        if (hierarchyRoot.scrollIntoView) hierarchyRoot.scrollIntoView();
      });
      hierarchyCrumb.parentNode.insertBefore(hierarchyBackBtn, hierarchyCrumb);
      function hierarchyChildren(id) {
        return hierarchyNodes.filter(function (node) {
          if (id === null) return !node.parentId;
          return node.parentId === id;
        });
      }
      function hierarchyOrderCount(id) {
        var count = 0;
        hierarchyChildren(id).forEach(function (child) {
          if (child.rank === "order") count += 1;
          else count += hierarchyOrderCount(child.id);
        });
        return count;
      }
      function hierarchyNodeLabel(node) {
        return node.name + (node.bengaliName ? " / " + node.bengaliName : "");
      }
      function hierarchyRow(parent, label, value) {
        if (value === undefined || value === null || value === "") return;
        if (Array.isArray(value) && !value.length) return;
        var row = document.createElement("p"); row.className = "fish-meta";
        var strong = document.createElement("strong"); strong.textContent = label + ": "; row.appendChild(strong);
        row.appendChild(document.createTextNode(Array.isArray(value) ? value.join(", ") : String(value)));
        parent.appendChild(row);
        return row;
      }
      function hierarchyExample(item) {
        var li = document.createElement("li");
        var name = document.createElement("span");
        name.className = "scientific-name";
        name.textContent = item.name || "Unnamed example";
        li.appendChild(name);
        var rest = [item.commonName, item.bengaliName].filter(Boolean).join(" / ");
        if (rest) li.appendChild(document.createTextNode(" — " + rest));
        if (item.speciesId && hierarchySpecies[item.speciesId]) {
          li.appendChild(document.createTextNode(" "));
          var link = document.createElement("a");
          link.href = "species.html?id=" + encodeURIComponent(item.speciesId);
          link.textContent = "View Species / Species দেখুন";
          li.appendChild(link);
        }
        if (!item.verified) {
          li.appendChild(document.createTextNode(" "));
          var badge = document.createElement("span");
          badge.className = "badge badge-needs-review";
          badge.textContent = "Legacy example / পুরোনো উদাহরণ — not verified";
          li.appendChild(badge);
        }
        return li;
      }
      var FISH_UNAVAILABLE = "তথ্য নেই / Not yet documented";
      function hierarchyHas(value) {
        if (value === undefined || value === null || value === "") return false;
        if (Array.isArray(value) && !value.length) return false;
        return true;
      }
      function hierarchySection(parent, heading) {
        var section = document.createElement("section");
        section.className = "fish-order-section";
        var head = document.createElement("h4");
        head.textContent = heading;
        section.appendChild(head);
        parent.appendChild(section);
        return section;
      }
      function hierarchyUnavailable(parent) {
        var p = document.createElement("p");
        p.className = "fish-order-unavailable";
        p.textContent = FISH_UNAVAILABLE;
        parent.appendChild(p);
      }
      function hierarchyClassificationPath(node) {
        var chain = [];
        var current = node;
        while (current) {
          chain.unshift(hierarchyNodeLabel(current));
          current = (current.parentId && hierarchyById[current.parentId]) || null;
        }
        return "Kingdom Animalia › " + chain.join(" › ");
      }
      function hierarchyOrderDetail(node) {
        var detail = document.createElement("div");
        detail.className = "fish-order-detail";
        detail.id = "fish-order-detail-" + node.id;
        var s1 = hierarchySection(detail, "শ্রেণিবিন্যাস / Classification");
        hierarchyRow(s1, "Classification / শ্রেণিবিন্যাস", hierarchyClassificationPath(node));
        if (node.description) { var desc = document.createElement("p"); desc.textContent = node.description; s1.appendChild(desc); }
        if (node.descriptionBn) { var descBn = document.createElement("p"); descBn.textContent = node.descriptionBn; s1.appendChild(descBn); }
        var s2 = hierarchySection(detail, "পরিচায়ক বৈশিষ্ট্য / Identifying Characteristics");
        if (hierarchyHas(node.characteristics)) {
          var list = document.createElement("ul"); list.className = "chars";
          node.characteristics.forEach(function (item) {
            var li = document.createElement("li");
            if (item.bn) { var b = document.createElement("span"); b.className = "b"; b.textContent = item.bn; li.appendChild(b); }
            if (item.en) { var e = document.createElement("span"); e.className = "e"; e.textContent = item.en; li.appendChild(e); }
            list.appendChild(li);
          });
          s2.appendChild(list);
        } else { hierarchyUnavailable(s2); }
        var s3 = hierarchySection(detail, "বাসস্থান / Habitat");
        if (hierarchyHas(node.habitat) || hierarchyHas(node.habitatBn)) {
          hierarchyRow(s3, "Habitat / বাসস্থান", node.habitat);
          if (node.habitatBn) hierarchyRow(s3, "বাসস্থান", node.habitatBn);
        } else { hierarchyUnavailable(s3); }
        var s4 = hierarchySection(detail, "বাস্তুতন্ত্র / Ecosystem");
        if (hierarchyHas(node.ecosystem) || hierarchyHas(node.ecosystemBn)) {
          hierarchyRow(s4, "Ecosystem / বাস্তুতন্ত্র", node.ecosystem);
          if (node.ecosystemBn) hierarchyRow(s4, "বাস্তুতন্ত্র", node.ecosystemBn);
        } else { hierarchyUnavailable(s4); }
        var s5 = hierarchySection(detail, "খাদ্যাভ্যাস / Feeding");
        if (hierarchyHas(node.feeding) || hierarchyHas(node.feedingBn)) {
          if (node.feeding) { var feed = document.createElement("p"); feed.textContent = node.feeding; s5.appendChild(feed); }
          if (node.feedingBn) { var feedBn = document.createElement("p"); feedBn.textContent = node.feedingBn; s5.appendChild(feedBn); }
        } else { hierarchyUnavailable(s5); }
        var s6 = hierarchySection(detail, "প্রজনন / Reproduction");
        if (hierarchyHas(node.reproduction) || hierarchyHas(node.reproductionBn)) {
          if (node.reproduction) { var reproNew = document.createElement("p"); reproNew.textContent = node.reproduction; s6.appendChild(reproNew); }
          if (node.reproductionBn) { var reproNewBn = document.createElement("p"); reproNewBn.textContent = node.reproductionBn; s6.appendChild(reproNewBn); }
        } else if (hierarchyHas(node.biology)) {
          var repro = document.createElement("p"); repro.textContent = node.biology; s6.appendChild(repro);
        } else { hierarchyUnavailable(s6); }
        var s7 = hierarchySection(detail, "বিস্তৃতি / Distribution");
        if (hierarchyHas(node.distribution)) {
          hierarchyRow(s7, "Distribution / বিস্তৃতি", node.distribution);
        } else { hierarchyUnavailable(s7); }
        var s8 = hierarchySection(detail, "গুরুত্বপূর্ণ পরিবার / Important Families");
        if (hierarchyHas(node.importantFamilies)) {
          var famList = document.createElement("ul"); famList.className = "fish-order-examples";
          node.importantFamilies.forEach(function (name) {
            var item = document.createElement("li");
            var span = document.createElement("span"); span.className = "scientific-name"; span.textContent = name;
            item.appendChild(span);
            famList.appendChild(item);
          });
          s8.appendChild(famList);
        } else { hierarchyUnavailable(s8); }
        var s10 = hierarchySection(detail, "উদাহরণ / Examples");
        if (hierarchyHas(node.examples)) {
          var exList = document.createElement("ul"); exList.className = "fish-order-examples";
          node.examples.forEach(function (item) { exList.appendChild(hierarchyExample(item)); });
          s10.appendChild(exList);
        } else { hierarchyUnavailable(s10); }
        var s11 = hierarchySection(detail, "অতিরিক্ত তথ্য / Additional Taxonomic / Biological Information");
        if (node.taxonomyNotes) hierarchyRow(s11, "Taxonomy notes / শ্রেণিবিন্যাস নোট", node.taxonomyNotes);
        if (node.modernTaxonomyNote || node.modernTaxonomyNoteBn) {
          var modern = document.createElement("div"); modern.className = "modern-note";
          var modernHead = document.createElement("strong"); modernHead.textContent = "Modern taxonomy note / আধুনিক শ্রেণিবিন্যাস নোট"; modern.appendChild(modernHead);
          if (node.modernTaxonomyNote) { var modernP = document.createElement("p"); modernP.textContent = node.modernTaxonomyNote; modern.appendChild(modernP); }
          if (node.modernTaxonomyNoteBn) { var modernBn = document.createElement("p"); modernBn.textContent = node.modernTaxonomyNoteBn; modern.appendChild(modernBn); }
          s11.appendChild(modern);
        }
        if (hierarchyHas(node.references)) {
          var refHead = document.createElement("h4"); refHead.textContent = "References / তথ্যসূত্র"; s11.appendChild(refHead);
          var refList = document.createElement("ul"); refList.className = "details-list";
          node.references.forEach(function (ref) {
            var item = document.createElement("li");
            item.textContent = ref.title + (ref.source ? " (" + ref.source + ")" : "");
            refList.appendChild(item);
          });
          s11.appendChild(refList);
        }
        return detail;
      }
      function hierarchyLevelSummary(node) {
        var summary = document.createElement("article");
        summary.className = "fish-level-summary";
        var title = document.createElement("h3");
        title.textContent = hierarchyNodeLabel(node);
        summary.appendChild(title);
        if (node.description) { var desc = document.createElement("p"); desc.textContent = node.description; summary.appendChild(desc); }
        if (node.descriptionBn) { var descBn = document.createElement("p"); descBn.textContent = node.descriptionBn; summary.appendChild(descBn); }
        if (hierarchyHas(node.characteristics)) {
          var chHead = document.createElement("h4"); chHead.textContent = "সাধারণ বৈশিষ্ট্য / General Characteristics"; summary.appendChild(chHead);
          var chList = document.createElement("ul"); chList.className = "chars";
          node.characteristics.forEach(function (item) {
            var li = document.createElement("li");
            if (item.bn) { var b = document.createElement("span"); b.className = "b"; b.textContent = item.bn; li.appendChild(b); }
            if (item.en) { var e = document.createElement("span"); e.className = "e"; e.textContent = item.en; li.appendChild(e); }
            chList.appendChild(li);
          });
          summary.appendChild(chList);
        }
        if (hierarchyHas(node.examples)) {
          var exHead = document.createElement("h4"); exHead.textContent = "উদাহরণ / Examples"; summary.appendChild(exHead);
          var exList = document.createElement("ul"); exList.className = "fish-order-examples";
          node.examples.forEach(function (item) { exList.appendChild(hierarchyExample(item)); });
          summary.appendChild(exList);
        }
        return summary;
      }
      function hierarchyNodeCard(node) {
        var card = document.createElement("article");
        card.className = "fish-hierarchy-card";
        var button = document.createElement("button");
        button.type = "button";
        button.className = "fish-hierarchy-select";
        var title = document.createElement("span");
        title.className = "fish-hierarchy-name";
        title.textContent = hierarchyNodeLabel(node);
        button.appendChild(title);
        var badges = document.createElement("span");
        badges.className = "fish-hierarchy-badges";
        var rank = document.createElement("span");
        rank.className = "badge badge-published";
        rank.textContent = hierarchyRankLabels[node.rank] || node.rank;
        badges.appendChild(rank);
        if (node.status) {
          var status = document.createElement("span");
          status.className = "badge badge-archived";
          status.textContent = node.status === "extinct" ? "Extinct / বিলুপ্ত" : "Living / জীবন্ত";
          badges.appendChild(status);
        }
        if (node.needsReview) {
          var review = document.createElement("span");
          review.className = "badge badge-needs-review";
          review.textContent = "Needs review / পর্যালোচনা প্রয়োজন";
          badges.appendChild(review);
        }
        button.appendChild(badges);
        var nodeChildren = hierarchyChildren(node.id);
        var nodeExpandable = node.rank === "order" || (!nodeChildren.length && (hierarchyHas(node.description) || hierarchyHas(node.characteristics) || hierarchyHas(node.examples) || hierarchyHas(node.importantFamilies) || hierarchyHas(node.references)));
        if (node.rank !== "order" && nodeChildren.length) {
          var count = document.createElement("span");
          count.className = "fish-hierarchy-count";
          count.textContent = nodeChildren.length + (nodeChildren.length === 1 ? " entry / এন্ট্রি" : " entries / এন্ট্রি");
          button.appendChild(count);
        }
        if (node.rank !== "order" && node.description) {
          var cardDesc = document.createElement("span");
          cardDesc.className = "fish-hierarchy-desc";
          cardDesc.textContent = node.description.length > 140 ? node.description.slice(0, 140) + "…" : node.description;
          button.appendChild(cardDesc);
        }
        var chevron = document.createElement("span");
        chevron.className = "fish-chevron";
        chevron.setAttribute("aria-hidden", "true");
        chevron.textContent = nodeExpandable ? "+" : "→";
        button.appendChild(chevron);
        if (!nodeExpandable) {
          var exploreHint = document.createElement("span");
          exploreHint.className = "fish-explore-label";
          exploreHint.textContent = "Explore / অনুসন্ধান করুন";
          button.appendChild(exploreHint);
        }
        if (nodeExpandable) {
          var isOpen = hierarchyOpenOrder === node.id;
          button.setAttribute("aria-expanded", isOpen ? "true" : "false");
          button.setAttribute("aria-controls", "fish-order-detail-" + node.id);
          button.addEventListener("click", function () {
            hierarchyOpenOrder = hierarchyOpenOrder === node.id ? null : node.id;
            try {
              if (hierarchyOpenOrder) history.replaceState(null, "", "#order-" + node.id);
              else history.replaceState(null, "", window.location.pathname + window.location.search);
            } catch (e) {}
            renderHierarchy();
          });
        } else {
          button.addEventListener("click", function () {
            hierarchyPath.push(node.id);
            hierarchyOpenOrder = null;
            renderHierarchy();
            hierarchyRoot.scrollIntoView();
          });
        }
        card.appendChild(button);
        if (nodeExpandable && hierarchyOpenOrder === node.id) {
          card.appendChild(hierarchyOrderDetail(node));
        }
        return card;
      }
      function hierarchyCrumbLabel(id) {
        if (id === null) return "Fish / মাছ";
        var node = hierarchyById[id];
        return node ? hierarchyNodeLabel(node) : id;
      }
      function renderHierarchyCrumb() {
        hierarchyCrumb.innerHTML = "";
        hierarchyBackBtn.hidden = hierarchyPath.length === 0;
        if (!hierarchyPath.length && !hierarchySearch.value.trim()) { hierarchyCrumb.hidden = true; return; }
        hierarchyCrumb.hidden = false;
        var root = document.createElement("button");
        root.type = "button";
        root.textContent = "Fish / মাছ";
        root.addEventListener("click", function () { hierarchyPath = []; hierarchyOpenOrder = null; renderHierarchy(); });
        var rootWrap = document.createElement("span");
        rootWrap.appendChild(root);
        hierarchyCrumb.appendChild(rootWrap);
        hierarchyPath.forEach(function (id, index) {
          var wrap = document.createElement("span");
          var isLast = index === hierarchyPath.length - 1;
          if (isLast) {
            var current = document.createElement("span");
            current.textContent = hierarchyCrumbLabel(id);
            current.setAttribute("aria-current", "location");
            wrap.appendChild(current);
          } else {
            var link = document.createElement("button");
            link.type = "button";
            link.textContent = hierarchyCrumbLabel(id);
            link.addEventListener("click", function () {
              hierarchyPath = hierarchyPath.slice(0, index + 1);
              hierarchyOpenOrder = null;
              renderHierarchy();
            });
            wrap.appendChild(link);
          }
          hierarchyCrumb.appendChild(wrap);
        });
      }
      function hierarchyMatches(node, query) {
        var text = [node.name, node.bengaliName, node.meaning, node.meaningBn].filter(Boolean).join(" ").toLocaleLowerCase();
        if (text.indexOf(query) !== -1) return true;
        return (node.examples || []).some(function (item) {
          return [item.name, item.commonName, item.bengaliName].filter(Boolean).join(" ").toLocaleLowerCase().indexOf(query) !== -1;
        });
      }
      function renderHierarchy() {
        var query = hierarchySearch.value.trim().toLocaleLowerCase();
        hierarchyList.innerHTML = "";
        renderHierarchyCrumb();
        var groups = document.createElement("div");
        groups.className = "fish-hierarchy-groups";
        var shown = 0;
        if (query) {
          var matches = hierarchyNodes.filter(function (node) { return node.rank === "order" && hierarchyMatches(node, query); });
          matches.forEach(function (node) { groups.appendChild(hierarchyNodeCard(node)); });
          shown = matches.length;
          hierarchyStatus.textContent = shown + (shown === 1 ? " order / বর্গ" : " orders / বর্গ");
        } else if (!hierarchyPath.length) {
          var roots = hierarchyChildren(null);
          roots.forEach(function (node) { groups.appendChild(hierarchyNodeCard(node)); });
          shown = roots.length;
          hierarchyStatus.textContent = shown + " major groups / " + toBnDigits(shown) + "টি প্রধান দল";
        } else {
          var current = hierarchyPath[hierarchyPath.length - 1];
          var currentNode = hierarchyById[current];
          if (currentNode) { hierarchyList.appendChild(hierarchyLevelSummary(currentNode)); }
          var children = hierarchyChildren(current);
          children.forEach(function (node) { groups.appendChild(hierarchyNodeCard(node)); });
          shown = children.length;
          hierarchyStatus.textContent = shown + " entries in " + (currentNode ? currentNode.name : current) + " / টি এন্ট্রি";
        }
        hierarchyList.appendChild(groups);
        hierarchyEmpty.hidden = shown !== 0;
      }
      hierarchySearch.addEventListener("input", function () { hierarchyOpenOrder = null; renderHierarchy(); });
      Promise.all([
        fetch("data/fish/orders.json").then(function (r) { if (!r.ok) throw new Error(); return r.json(); }),
        fetch("data/species/index.json").then(function (r) { if (!r.ok) throw new Error(); return r.json(); })
      ]).then(function (data) {
        hierarchyNodes = Array.isArray(data[0]) ? data[0] : [];
        hierarchyNodes.forEach(function (node) { if (node && node.id) hierarchyById[node.id] = node; });
        (Array.isArray(data[1]) ? data[1] : []).forEach(function (record) { if (record && record.id) hierarchySpecies[record.id] = record; });
        (function () {
          var hash = (window.location.hash || "").replace(/^#order-/, "");
          var target = hash && hierarchyById[hash];
          if (!target) return;
          if (target.rank !== "order") {
            var targetKids = hierarchyNodes.filter(function (n) { return n.parentId === target.id; });
            var targetDetail = !targetKids.length && (target.description || (target.characteristics && target.characteristics.length) || (target.examples && target.examples.length) || (target.importantFamilies && target.importantFamilies.length) || (target.references && target.references.length));
            if (!targetDetail) return;
          }
          var chain = [];
          var current = target;
          while (current && current.parentId && hierarchyById[current.parentId]) {
            current = hierarchyById[current.parentId];
            chain.unshift(current.id);
          }
          hierarchyPath = chain;
          hierarchyOpenOrder = target.id;
        })();
        renderHierarchy();
        if (hierarchyOpenOrder && hierarchyRoot.scrollIntoView) hierarchyRoot.scrollIntoView();
      }).catch(function () { hierarchyStatus.hidden = true; hierarchyError.hidden = false; });
    }

    /* ---------- Marine Life Classification Hierarchy ---------- */
    var marineHierarchyRoot = document.querySelector("[data-marine-hierarchy]");
    if (marineHierarchyRoot) {
      var marineHierarchySearch = marineHierarchyRoot.querySelector("[data-marine-hierarchy-search]");
      var marineHierarchyStatus = marineHierarchyRoot.querySelector("[data-marine-hierarchy-status]");
      var marineHierarchyCrumb = marineHierarchyRoot.querySelector("[data-marine-hierarchy-crumb]");
      var marineHierarchyList = marineHierarchyRoot.querySelector("[data-marine-hierarchy-list]");
      var marineHierarchyEmpty = marineHierarchyRoot.querySelector("[data-marine-hierarchy-empty]");
      var marineHierarchyError = marineHierarchyRoot.querySelector("[data-marine-hierarchy-error]");
      var marineHierarchyNodes = [];
      var marineHierarchyById = {};
      var marineHierarchySpecies = {};
      var marineHierarchyPath = [];
      var marineHierarchyOpen = null;
      var marineHierarchyRankLabels = {
        "major-group": "Major group / প্রধান দল",
        "phylum": "Phylum / পর্ব",
        "class": "Class / শ্রেণি",
        "order": "Order / বর্গ",
        "family": "Family / পরিবার"
      };
      function marineBnDigits(n) {
        return String(n).replace(/[0-9]/g, function (d) { return "০১২৩৪৫৬৭৮৯"[Number(d)]; });
      }
      var marineHierarchyBackBtn = document.createElement("button");
      marineHierarchyBackBtn.type = "button";
      marineHierarchyBackBtn.className = "hierarchy-back";
      marineHierarchyBackBtn.hidden = true;
      var marineHierarchyBackArrow = document.createElement("span");
      marineHierarchyBackArrow.setAttribute("aria-hidden", "true");
      marineHierarchyBackArrow.textContent = "←";
      marineHierarchyBackBtn.appendChild(marineHierarchyBackArrow);
      var marineHierarchyBackText = document.createElement("span");
      marineHierarchyBackText.textContent = "Back";
      marineHierarchyBackBtn.appendChild(marineHierarchyBackText);
      var marineHierarchyBackBn = document.createElement("span");
      marineHierarchyBackBn.className = "hierarchy-back-bn";
      marineHierarchyBackBn.textContent = "ফিরে যান";
      marineHierarchyBackBtn.appendChild(marineHierarchyBackBn);
      marineHierarchyBackBtn.addEventListener("click", function () {
        if (!marineHierarchyPath.length) return;
        marineHierarchyPath.pop();
        marineHierarchyOpen = null;
        try {
          if (marineHierarchyPath.length) window.location.hash = "#marine-" + marineHierarchyPath[marineHierarchyPath.length - 1];
          else window.location.hash = "";
        } catch (e) {}
        renderMarineHierarchy();
        if (marineHierarchyRoot.scrollIntoView) marineHierarchyRoot.scrollIntoView();
      });
      marineHierarchyCrumb.parentNode.insertBefore(marineHierarchyBackBtn, marineHierarchyCrumb);
      function marineHierarchyChildren(id) {
        return marineHierarchyNodes.filter(function (node) {
          if (id === null) return !node.parentId;
          return node.parentId === id;
        });
      }
      function marineHierarchyNodeLabel(node) {
        return node.name + (node.bengaliName ? " / " + node.bengaliName : "");
      }
      function marineHierarchyRow(parent, label, value) {
        if (value === undefined || value === null || value === "") return;
        if (Array.isArray(value) && !value.length) return;
        var row = document.createElement("p"); row.className = "marine-meta";
        var strong = document.createElement("strong"); strong.textContent = label + ": "; row.appendChild(strong);
        row.appendChild(document.createTextNode(Array.isArray(value) ? value.join(", ") : String(value)));
        parent.appendChild(row);
        return row;
      }
      function marineHierarchyExample(item) {
        var li = document.createElement("li");
        var name = document.createElement("span");
        name.className = "scientific-name";
        name.textContent = item.name || "Unnamed example";
        li.appendChild(name);
        var rest = [item.commonName, item.bengaliName].filter(Boolean).join(" / ");
        if (rest) li.appendChild(document.createTextNode(" — " + rest));
        if (item.speciesId && marineHierarchySpecies[item.speciesId]) {
          li.appendChild(document.createTextNode(" "));
          var link = document.createElement("a");
          link.href = "species.html?id=" + encodeURIComponent(item.speciesId);
          link.textContent = "View Species / Species দেখুন";
          li.appendChild(link);
        }
        if (!item.verified) {
          li.appendChild(document.createTextNode(" "));
          var badge = document.createElement("span");
          badge.className = "badge badge-needs-review";
          badge.textContent = "Legacy example / পুরোনো উদাহরণ — not verified";
          li.appendChild(badge);
        }
        return li;
      }
      function marineHierarchyDetail(node) {
        var detail = document.createElement("div");
        detail.className = "marine-detail";
        detail.id = "marine-detail-" + node.id;
        if (node.description) { var desc = document.createElement("p"); desc.textContent = node.description; detail.appendChild(desc); }
        if (node.descriptionBn) { var descBn = document.createElement("p"); descBn.textContent = node.descriptionBn; detail.appendChild(descBn); }
        if (Array.isArray(node.characteristics) && node.characteristics.length) {
          var head = document.createElement("h4"); head.textContent = "Identifying characteristics / শনাক্তকারী বৈশিষ্ট্য"; detail.appendChild(head);
          var list = document.createElement("ul"); list.className = "chars";
          node.characteristics.forEach(function (item) {
            var li = document.createElement("li");
            if (item.bn) { var b = document.createElement("span"); b.className = "b"; b.textContent = item.bn; li.appendChild(b); }
            if (item.en) { var e = document.createElement("span"); e.className = "e"; e.textContent = item.en; li.appendChild(e); }
            list.appendChild(li);
          });
          detail.appendChild(list);
        }
        marineHierarchyRow(detail, "Habitat / বাসস্থান", node.habitat);
        if (node.habitatBn) marineHierarchyRow(detail, "বাসস্থান", node.habitatBn);
        marineHierarchyRow(detail, "Ecosystem / বাস্তুতন্ত্র", node.ecosystem);
        if (node.ecosystemBn) marineHierarchyRow(detail, "বাস্তুতন্ত্র", node.ecosystemBn);
        marineHierarchyRow(detail, "Distribution / বিস্তৃতি", node.distribution);
        marineHierarchyRow(detail, "Biology / জীববিজ্ঞান", node.biology);
        if (Array.isArray(node.examples) && node.examples.length) {
          var exHead = document.createElement("h4"); exHead.textContent = "Examples / উদাহরণ"; detail.appendChild(exHead);
          var exList = document.createElement("ul"); exList.className = "marine-examples";
          node.examples.forEach(function (item) { exList.appendChild(marineHierarchyExample(item)); });
          detail.appendChild(exList);
        }
        if (node.taxonomyNotes) marineHierarchyRow(detail, "Taxonomy notes / শ্রেণিবিন্যাস নোট", node.taxonomyNotes);
        if (node.modernTaxonomyNote || node.modernTaxonomyNoteBn) {
          var modern = document.createElement("div"); modern.className = "modern-note";
          var modernHead = document.createElement("strong"); modernHead.textContent = "Modern taxonomy note / আধুনিক শ্রেণিবিন্যাস নোট"; modern.appendChild(modernHead);
          if (node.modernTaxonomyNote) { var modernP = document.createElement("p"); modernP.textContent = node.modernTaxonomyNote; modern.appendChild(modernP); }
          if (node.modernTaxonomyNoteBn) { var modernBn = document.createElement("p"); modernBn.textContent = node.modernTaxonomyNoteBn; modern.appendChild(modernBn); }
          detail.appendChild(modern);
        }
        if (Array.isArray(node.references) && node.references.length) {
          var refHead = document.createElement("h4"); refHead.textContent = "References / তথ্যসূত্র"; detail.appendChild(refHead);
          var refList = document.createElement("ul"); refList.className = "details-list";
          node.references.forEach(function (ref) {
            var item = document.createElement("li");
            item.textContent = ref.title + (ref.source ? " (" + ref.source + ")" : "");
            refList.appendChild(item);
          });
          detail.appendChild(refList);
        }
        return detail;
      }
      function marineHierarchyCard(node) {
        var card = document.createElement("article");
        card.className = "marine-hierarchy-card";
        var button = document.createElement("button");
        button.type = "button";
        button.className = "marine-hierarchy-select";
        var title = document.createElement("span");
        title.className = "marine-hierarchy-name";
        title.textContent = marineHierarchyNodeLabel(node);
        button.appendChild(title);
        var badges = document.createElement("span");
        badges.className = "marine-hierarchy-badges";
        var rank = document.createElement("span");
        rank.className = "badge badge-published";
        rank.textContent = marineHierarchyRankLabels[node.rank] || node.rank;
        badges.appendChild(rank);
        if (node.needsReview) {
          var review = document.createElement("span");
          review.className = "badge badge-needs-review";
          review.textContent = "Needs review / পর্যালোচনা প্রয়োজন";
          badges.appendChild(review);
        }
        button.appendChild(badges);
        var children = marineHierarchyChildren(node.id);
        if (children.length) {
          var count = document.createElement("span");
          count.className = "marine-hierarchy-count";
          count.textContent = children.length + (children.length === 1 ? " entry / এন্ট্রি" : " entries / এন্ট্রি");
          button.appendChild(count);
        }
        var chevron = document.createElement("span");
        chevron.className = "marine-chevron";
        chevron.setAttribute("aria-hidden", "true");
        chevron.textContent = children.length ? "→" : "+";
        button.appendChild(chevron);
        if (children.length) {
          button.addEventListener("click", function () {
            marineHierarchyPath.push(node.id);
            marineHierarchyOpen = null;
            try { window.location.hash = "#marine-" + node.id; } catch (e) {}
            renderMarineHierarchy();
            marineHierarchyRoot.scrollIntoView();
          });
        } else {
          var isOpen = marineHierarchyOpen === node.id;
          button.setAttribute("aria-expanded", isOpen ? "true" : "false");
          button.setAttribute("aria-controls", "marine-detail-" + node.id);
          button.addEventListener("click", function () {
            marineHierarchyOpen = marineHierarchyOpen === node.id ? null : node.id;
            try {
              if (marineHierarchyOpen) { window.location.hash = "#marine-" + node.id; }
              else if (marineHierarchyPath.length) { window.location.hash = "#marine-" + marineHierarchyPath[marineHierarchyPath.length - 1]; }
              else { window.location.hash = ""; }
            } catch (e) {}
            renderMarineHierarchy();
          });
        }
        card.appendChild(button);
        if (!children.length && marineHierarchyOpen === node.id) {
          card.appendChild(marineHierarchyDetail(node));
        }
        return card;
      }
      function marineHierarchyCrumbLabel(id) {
        if (id === null) return "Marine Life / সামুদ্রিক জীবন";
        var node = marineHierarchyById[id];
        return node ? marineHierarchyNodeLabel(node) : id;
      }
      function renderMarineHierarchyCrumb() {
        marineHierarchyCrumb.innerHTML = "";
        marineHierarchyBackBtn.hidden = marineHierarchyPath.length === 0;
        if (!marineHierarchyPath.length && !marineHierarchySearch.value.trim()) { marineHierarchyCrumb.hidden = true; return; }
        marineHierarchyCrumb.hidden = false;
        var root = document.createElement("button");
        root.type = "button";
        root.textContent = "Marine Life / সামুদ্রিক জীবন";
        root.addEventListener("click", function () { marineHierarchyPath = []; marineHierarchyOpen = null; try { window.location.hash = ""; } catch (e) {} renderMarineHierarchy(); });
        var rootWrap = document.createElement("span");
        rootWrap.appendChild(root);
        marineHierarchyCrumb.appendChild(rootWrap);
        marineHierarchyPath.forEach(function (id, index) {
          var wrap = document.createElement("span");
          var isLast = index === marineHierarchyPath.length - 1;
          if (isLast) {
            var current = document.createElement("span");
            current.textContent = marineHierarchyCrumbLabel(id);
            current.setAttribute("aria-current", "location");
            wrap.appendChild(current);
          } else {
            var link = document.createElement("button");
            link.type = "button";
            link.textContent = marineHierarchyCrumbLabel(id);
            link.addEventListener("click", function () {
              marineHierarchyPath = marineHierarchyPath.slice(0, index + 1);
              marineHierarchyOpen = null;
              try { window.location.hash = "#marine-" + marineHierarchyPath[marineHierarchyPath.length - 1]; } catch (e) {}
              renderMarineHierarchy();
            });
            wrap.appendChild(link);
          }
          marineHierarchyCrumb.appendChild(wrap);
        });
      }
      function marineHierarchyMatches(node, query) {
        var text = [node.name, node.bengaliName, node.meaning, node.meaningBn].filter(Boolean).join(" ").toLocaleLowerCase();
        if (text.indexOf(query) !== -1) return true;
        return (node.examples || []).some(function (item) {
          return [item.name, item.commonName, item.bengaliName].filter(Boolean).join(" ").toLocaleLowerCase().indexOf(query) !== -1;
        });
      }
      function renderMarineHierarchy() {
        var query = marineHierarchySearch.value.trim().toLocaleLowerCase();
        marineHierarchyList.innerHTML = "";
        renderMarineHierarchyCrumb();
        var groups = document.createElement("div");
        groups.className = "marine-hierarchy-groups";
        var shown = 0;
        if (query) {
          var matches = marineHierarchyNodes.filter(function (node) { return marineHierarchyMatches(node, query); });
          matches.forEach(function (node) { groups.appendChild(marineHierarchyCard(node)); });
          shown = matches.length;
          marineHierarchyStatus.textContent = shown + (shown === 1 ? " match / মিল" : " matches / মিল");
        } else if (!marineHierarchyPath.length) {
          var roots = marineHierarchyChildren(null);
          roots.forEach(function (node) { groups.appendChild(marineHierarchyCard(node)); });
          shown = roots.length;
          marineHierarchyStatus.textContent = shown + " major groups / " + marineBnDigits(shown) + "টি প্রধান দল";
        } else {
          var current = marineHierarchyPath[marineHierarchyPath.length - 1];
          var levelChildren = marineHierarchyChildren(current);
          levelChildren.forEach(function (node) { groups.appendChild(marineHierarchyCard(node)); });
          shown = levelChildren.length;
          var currentNode = marineHierarchyById[current];
          marineHierarchyStatus.textContent = shown + " entries in " + (currentNode ? currentNode.name : current) + " / টি এন্ট্রি";
        }
        marineHierarchyList.appendChild(groups);
        marineHierarchyEmpty.hidden = shown !== 0;
      }
      marineHierarchySearch.addEventListener("input", function () { marineHierarchyOpen = null; renderMarineHierarchy(); });
      window.addEventListener("hashchange", function () {
        var raw = window.location.hash || "";
        if (!raw || raw.indexOf("#marine-") !== 0) {
          if (marineHierarchyPath.length || marineHierarchyOpen) { marineHierarchyPath = []; marineHierarchyOpen = null; renderMarineHierarchy(); }
          return;
        }
        var target = marineHierarchyById[raw.replace(/^#marine-/, "")];
        if (!target) return;
        var chain = [];
        var cur = target;
        while (cur && cur.parentId && marineHierarchyById[cur.parentId]) { cur = marineHierarchyById[cur.parentId]; chain.unshift(cur.id); }
        var kids = marineHierarchyNodes.filter(function (n) { return n.parentId === target.id; });
        var newPath = kids.length ? chain.concat([target.id]) : chain;
        var newOpen = kids.length ? null : target.id;
        if (newPath.join() !== marineHierarchyPath.join() || newOpen !== marineHierarchyOpen) {
          marineHierarchyPath = newPath;
          marineHierarchyOpen = newOpen;
          renderMarineHierarchy();
        }
      });
      Promise.all([
        fetch("data/marine-life/classification.json").then(function (r) { if (!r.ok) throw new Error(); return r.json(); }),
        fetch("data/species/index.json").then(function (r) { if (!r.ok) throw new Error(); return r.json(); })
      ]).then(function (data) {
        marineHierarchyNodes = Array.isArray(data[0]) ? data[0] : [];
        marineHierarchyNodes.forEach(function (node) { if (node && node.id) marineHierarchyById[node.id] = node; });
        (Array.isArray(data[1]) ? data[1] : []).forEach(function (record) { if (record && record.id) marineHierarchySpecies[record.id] = record; });
        (function () {
          var hash = (window.location.hash || "").replace(/^#marine-/, "");
          var target = hash && marineHierarchyById[hash];
          if (!target) return;
          var chain = [];
          var current = target;
          while (current && current.parentId && marineHierarchyById[current.parentId]) {
            current = marineHierarchyById[current.parentId];
            chain.unshift(current.id);
          }
          marineHierarchyPath = chain;
          if (!marineHierarchyChildren(target.id).length) marineHierarchyOpen = target.id;
          else marineHierarchyPath.push(target.id);
        })();
        renderMarineHierarchy();
        if (marineHierarchyOpen && marineHierarchyRoot.scrollIntoView) marineHierarchyRoot.scrollIntoView();
      }).catch(function () { marineHierarchyStatus.hidden = true; marineHierarchyError.hidden = false; });
    }

    var marineRoot = document.querySelector("[data-marine-explorer]");
    if (marineRoot) {
      var marineState = marineRoot.querySelector("[data-marine-state]");
      var marineGrid = marineRoot.querySelector("[data-marine-grid]");
      var marineEmpty = marineRoot.querySelector("[data-marine-empty]");
      var marineError = marineRoot.querySelector("[data-marine-error]");
      function marineCard(record) {
        var card = document.createElement("article"); card.className = "fish-card withheld-panel";
        var badge = document.createElement("span"); badge.className = "badge badge-needs-review"; badge.textContent = WITHHELD_LABEL; card.appendChild(badge);
        var title = document.createElement("h3"); title.textContent = "Marine Life extension record"; card.appendChild(title);
        speciesRefRow(card, record);
        extRow(card, "Marine category / সামুদ্রিক শ্রেণি", record.marineCategory);
        extRow(card, "Zone / অঞ্চল", record.zone);
        extRow(card, "Substrate / তলদেশ", record.substrate);
        extRow(card, "Depth range / গভীরতা", record.depthRange);
        extRow(card, "Salinity tolerance / লবণাক্ততা সহনশীলতা", record.salinityTolerance);
        extRow(card, "Commercial importance / বাণিজ্যিক গুরুত্ব", record.commercialImportance);
        extRow(card, "Aquaculture potential / চাষ সম্ভাবনা", record.aquaculturePotential);
        if (record.majorThreats && record.majorThreats.length) extRow(card, "Major threats / প্রধান হুমকি", record.majorThreats);
        if (record.conservationActions && record.conservationActions.length) extRow(card, "Conservation actions / সংরক্ষণ ব্যবস্থা", record.conservationActions);
        reviewStateRow(card, record);
        if (record.notes) { var recordNote = document.createElement("p"); recordNote.textContent = "Record note / রেকর্ড নোট: " + record.notes; card.appendChild(recordNote); }
        var unverified = document.createElement("p"); unverified.textContent = UNVERIFIED_LABEL; card.appendChild(unverified);
        var note = document.createElement("p"); note.textContent = "The authoritative Species relationship is unresolved, so this record is not presented as verified zoological content. / কর্তৃত্বপূর্ণ Species সম্পর্ক অনিষ্পন্ন, তাই এই রেকর্ডটি যাচাইকৃত তথ্য হিসেবে দেখানো হচ্ছে না।"; card.appendChild(note);
        return card;
      }
      fetch("data/marine-life/index.json").then(function (response) { if (!response.ok) throw new Error(); return response.json(); }).then(function (records) {
        records = Array.isArray(records) ? records : [];
        marineState.textContent = records.length + " Marine Life records withheld for scientific review. Shown for review only — not verified zoological content. / " + records.length + "টি সামুদ্রিক রেকর্ড বৈজ্ঞানিক পর্যালোচনার জন্য স্থগিত। শুধুমাত্র পর্যালোচনার জন্য দেখানো হয়েছে — যাচাইকৃত তথ্য নয়।";
        if (marineGrid) { marineGrid.innerHTML = ""; records.forEach(function (record) { marineGrid.appendChild(marineCard(record)); }); }
        if (marineEmpty) marineEmpty.hidden = records.length !== 0;
      }).catch(function () { marineState.textContent = "Marine Life data is unavailable. / সামুদ্রিক জীবনের তথ্য অনুপলব্ধ।"; if (marineError) marineError.hidden = false; });
    }

    /* ---------- Marine Species Library ---------- */
    var marineLibraryRoot = document.querySelector("[data-marine-library]");
    if (marineLibraryRoot) {
      var libSearch = marineLibraryRoot.querySelector("[data-marine-library-search]");
      var libGroup = marineLibraryRoot.querySelector("[data-marine-library-group]");
      var libStatus = marineLibraryRoot.querySelector("[data-marine-library-status]");
      var libGrid = marineLibraryRoot.querySelector("[data-marine-library-grid]");
      var libEmpty = marineLibraryRoot.querySelector("[data-marine-library-empty]");
      var libError = marineLibraryRoot.querySelector("[data-marine-library-error]");
      var libEntries = [];
      var marineNodeById = {};
      var marineContextId = null;
      var marineContextLabel = "";
      function marineApplyHash() {
        var raw = window.location.hash || "";
        if (!raw || raw.indexOf("#marine-") !== 0) {
          if (marineContextId !== null) { marineContextId = null; marineContextLabel = ""; renderMarineLibrary(); }
          return;
        }
        var node = marineNodeById[raw.replace(/^#marine-/, "")];
        if (!node) return;
        var label = node.name + (node.bengaliName ? " / " + node.bengaliName : "");
        if (marineContextId !== node.id) { marineContextId = node.id; marineContextLabel = label; renderMarineLibrary(); }
      }
      function libBnDigits(n) {
        return String(n).replace(/[0-9]/g, function (d) { return "০১২৩৪৫৬৭৮৯"[Number(d)]; });
      }
      function libJoin(value) {
        if (value === undefined || value === null) return "";
        if (Array.isArray(value)) return value.filter(Boolean).join(", ");
        return String(value);
      }
      function libRow(parent, label, value) {
        var text = libJoin(value);
        if (!text) return;
        var row = document.createElement("p"); row.className = "marine-library-meta";
        var strong = document.createElement("strong"); strong.textContent = label + ": "; row.appendChild(strong);
        row.appendChild(document.createTextNode(text));
        parent.appendChild(row);
      }
      function libList(parent, heading, items) {
        var list = (items || []).filter(Boolean);
        if (!list.length) return;
        var head = document.createElement("h4"); head.textContent = heading; parent.appendChild(head);
        var ul = document.createElement("ul"); ul.className = "details-list";
        list.forEach(function (item) {
          var li = document.createElement("li"); li.textContent = item; ul.appendChild(li);
        });
        parent.appendChild(ul);
      }
      function libCard(entry) {
        var record = entry.record;
        var card = document.createElement("article"); card.className = "marine-library-card";
        var title = document.createElement("h3"); title.textContent = record.commonName || record.scientificName || record.id; card.appendChild(title);
        if (record.bengaliName) { var bn = document.createElement("p"); bn.className = "marine-library-bn"; bn.textContent = record.bengaliName; card.appendChild(bn); }
        if (record.scientificName) { var sci = document.createElement("p"); sci.className = "scientific-name"; sci.textContent = record.scientificName; card.appendChild(sci); }
        var badges = document.createElement("div"); badges.className = "marine-library-badges";
        var type = document.createElement("span"); type.className = "badge badge-published"; type.textContent = "Marine species / সামুদ্রিক প্রজাতি"; badges.appendChild(type);
        if (entry.groupLabel) { var grp = document.createElement("span"); grp.className = "badge badge-published"; grp.textContent = entry.groupLabel; badges.appendChild(grp); }
        var status = record.conservation && record.conservation.conservationStatus;
        if (status) { var cons = document.createElement("span"); cons.className = "badge badge-archived"; cons.textContent = "Global: " + status; badges.appendChild(cons); }
        if (record.needsReview) { var rev = document.createElement("span"); rev.className = "badge badge-needs-review"; rev.textContent = "Needs scientific review / বৈজ্ঞানিক পর্যালোচনা প্রয়োজন"; badges.appendChild(rev); }
        card.appendChild(badges);
        if (entry.taxonomyLabel) { var tax = document.createElement("p"); tax.className = "marine-library-taxonomy"; tax.textContent = "Taxonomy / শ্রেণিবিন্যাস: " + entry.taxonomyLabel; card.appendChild(tax); }
        var ident = record.identification || {};
        var bio = record.biology || {};
        var eco = record.ecology || {};
        var con = record.conservation || {};
        libList(card, "Identifying characteristics / শনাক্তকারী বৈশিষ্ট্য", ident.keyFeatures);
        libRow(card, "Habitat / বাসস্থান", eco.habitat);
        libRow(card, "Food / খাদ্য", eco.diet);
        libRow(card, "Reproduction / প্রজনন", bio.reproduction);
        libRow(card, "Distribution / বিস্তৃতি", eco.geographicDistribution && eco.geographicDistribution.regions);
        libRow(card, "Ecosystem / বাস্তুতন্ত্র", eco.ecologicalRole);
        libRow(card, "Threats / হুমকি", con.majorThreats);
        var ext = entry.ext || {};
        libRow(card, "Marine category / সামুদ্রিক শ্রেণি", ext.marineCategory);
        libRow(card, "Zone / অঞ্চল", ext.zone);
        libRow(card, "Substrate / তলদেশ", ext.substrate);
        if (ext.depthRange && (ext.depthRange.min !== undefined || ext.depthRange.max !== undefined)) {
          var parts = [ext.depthRange.min, ext.depthRange.max, ext.depthRange.unit].filter(function (v) { return v !== undefined && v !== null && v !== ""; });
          if (parts.length) libRow(card, "Depth range / গভীরতা", parts.join("–"));
        }
        var refs = (record.references || []).map(function (ref) { return ref && (ref.title + (ref.source ? " (" + ref.source + ")" : "")); }).filter(Boolean);
        libList(card, "References / তথ্যসূত্র", refs);
        if (record.verification && record.verification.status) {
          var ver = document.createElement("p"); ver.className = "marine-library-meta";
          var vs = document.createElement("strong"); vs.textContent = "Review status / পর্যালোচনার অবস্থা: "; ver.appendChild(vs);
          ver.appendChild(document.createTextNode(record.verification.status === "verified" ? "Verified / যাচাইকৃত" : "Unverified — not yet scientifically verified / অযাচাইকৃত"));
          card.appendChild(ver);
        }
        var link = document.createElement("a"); link.className = "btn btn-outline"; link.href = "species.html?id=" + encodeURIComponent(record.id); link.textContent = "View Species / Species দেখুন"; card.appendChild(link);
        return card;
      }
      function renderMarineLibrary() {
        var query = libSearch.value.trim().toLocaleLowerCase();
        var group = libGroup.value;
        libGrid.innerHTML = "";
        var shown = 0;
        libEntries.forEach(function (entry) {
          if (marineContextId) {
            if (entry.chain.indexOf(marineContextId) === -1) return;
          } else if (group && entry.groupId !== group) return;
          if (query && entry.haystack.indexOf(query) === -1) return;
          libGrid.appendChild(libCard(entry));
          shown += 1;
        });
        if (marineContextId) libStatus.textContent = "Showing: " + marineContextLabel + " — " + shown + " species / " + libBnDigits(shown) + "টি প্রজাতি";
        else libStatus.textContent = shown + " species / " + libBnDigits(shown) + "টি প্রজাতি";
        libEmpty.hidden = shown !== 0;
        var emptyText = libEmpty.querySelector("p");
        if (emptyText) emptyText.textContent = (marineContextId && !shown) ? "No species records are currently available for this classification. / এই শ্রেণিবিন্যাসের জন্য বর্তমানে কোনো প্রজাতির রেকর্ড নেই।" : "No marine species found / কোনো সামুদ্রিক প্রজাতি পাওয়া যায়নি";
      }
      libSearch.addEventListener("input", renderMarineLibrary);
      libGroup.addEventListener("change", function () {
        try {
          var v = libGroup.value;
          if (!v) {
            if ((window.location.hash || "").indexOf("#marine-") === 0) window.location.hash = "";
          } else if (window.location.hash !== "#marine-" + v) {
            window.location.hash = "#marine-" + v;
          }
        } catch (e) {}
        renderMarineLibrary();
      });
      var marineLibClear = document.createElement("button");
      marineLibClear.className = "btn btn-text";
      marineLibClear.type = "button";
      marineLibClear.textContent = "Clear / পরিষ্কার";
      libStatus.parentNode.insertBefore(marineLibClear, libStatus.nextSibling);
      marineLibClear.addEventListener("click", function () {
        libSearch.value = "";
        libGroup.value = "";
        try { window.location.hash = ""; } catch (e) {}
        renderMarineLibrary();
        libSearch.focus();
      });
      window.addEventListener("hashchange", marineApplyHash);
      Promise.all([
        fetch("data/species/index.json").then(function (r) { if (!r.ok) throw new Error(); return r.json(); }),
        fetch("data/marine-life/index.json").then(function (r) { if (!r.ok) throw new Error(); return r.json(); }),
        fetch("data/marine-life/classification.json").then(function (r) { if (!r.ok) throw new Error(); return r.json(); }),
        fetch("data/taxonomy/taxa.json").then(function (r) { if (!r.ok) throw new Error(); return r.json(); })
      ]).then(function (data) {
        var speciesList = Array.isArray(data[0]) ? data[0] : [];
        var extList = Array.isArray(data[1]) ? data[1] : [];
        var nodes = Array.isArray(data[2]) ? data[2] : [];
        var taxaList = Array.isArray(data[3]) ? data[3] : [];
        var speciesById = {};
        speciesList.forEach(function (record) { if (record && record.id) speciesById[record.id] = record; });
        var extBySpecies = {};
        extList.forEach(function (record) { if (record && record.speciesId) extBySpecies[record.speciesId] = record; });
        var taxaById = {};
        taxaList.forEach(function (taxon) { if (taxon && taxon.id) taxaById[taxon.id] = taxon; });
        var nodeById = {};
        nodes.forEach(function (node) { if (node && node.id) nodeById[node.id] = node; });
        marineNodeById = nodeById;
        function taxonName(id) { var t = id && taxaById[id]; return t ? t.name : ""; }
        nodes.filter(function (node) { return !node.parentId; }).forEach(function (root) {
          var option = document.createElement("option");
          option.value = root.id;
          option.textContent = root.name + (root.bengaliName ? " / " + root.bengaliName : "");
          libGroup.appendChild(option);
        });
        var seen = {};
        nodes.forEach(function (node) {
          (node.examples || []).forEach(function (item) {
            if (!item || !item.speciesId || !item.verified) return;
            var record = speciesById[item.speciesId];
            if (!record || seen[record.id]) return;
            seen[record.id] = true;
            var chain = [];
            var cursor = node;
            while (cursor) {
              chain.unshift(cursor);
              cursor = (cursor.parentId && nodeById[cursor.parentId]) || null;
            }
            var groupNode = chain[0] || null;
            var tax = record.taxonomy || {};
            var ident = record.identification || {};
            var eco = record.ecology || {};
            var ext = extBySpecies[record.id] || {};
            libEntries.push({
              record: record,
              ext: ext,
              nodeId: node.id,
              chain: chain.map(function (n) { return n.id; }),
              groupId: groupNode ? groupNode.id : "",
              groupLabel: groupNode ? (groupNode.name + (groupNode.bengaliName ? " / " + groupNode.bengaliName : "")) : "",
              taxonomyLabel: [tax.phylumId, tax.classId, tax.orderId, tax.familyId, tax.genusId].map(taxonName).filter(Boolean).join(" › "),
              haystack: [record.commonName, record.bengaliName, record.scientificName, record.slug, taxonName(tax.genusId), taxonName(tax.familyId), taxonName(tax.orderId), taxonName(tax.classId), taxonName(tax.phylumId), ext.marineCategory, ext.zone, (ident.keyFeatures || []).join(" "), eco.diet].filter(Boolean).join(" ").toLocaleLowerCase()
            });
          });
        });
        marineApplyHash();
        renderMarineLibrary();
      }).catch(function () { libStatus.hidden = true; libError.hidden = false; });
    }

    /* ---------- Bangladesh Classification Hierarchy ---------- */
    var bdHierarchyRoot = document.querySelector("[data-bangladesh-hierarchy]");
    if (bdHierarchyRoot) {
      var bdHierarchySearch = bdHierarchyRoot.querySelector("[data-bangladesh-hierarchy-search]");
      var bdHierarchyStatus = bdHierarchyRoot.querySelector("[data-bangladesh-hierarchy-status]");
      var bdHierarchyCrumb = bdHierarchyRoot.querySelector("[data-bangladesh-hierarchy-crumb]");
      var bdHierarchyList = bdHierarchyRoot.querySelector("[data-bangladesh-hierarchy-list]");
      var bdHierarchyEmpty = bdHierarchyRoot.querySelector("[data-bangladesh-hierarchy-empty]");
      var bdHierarchyError = bdHierarchyRoot.querySelector("[data-bangladesh-hierarchy-error]");
      var bdNodes = [];
      var bdById = {};
      var bdSpeciesById = {};
      var bdPath = [];
      function bdBnDigits(n) { return String(n).replace(/[0-9]/g, function (d) { return "০১২৩৪৫৬৭৮৯"[Number(d)]; }); }
      function bdSuffix(id) { return String(id || "").replace(/^bangladesh-/, ""); }
      function bdGroupLabel(node) { return node.name + (node.bengaliName ? " / " + node.bengaliName : ""); }
      var bdBackBtn = document.createElement("button");
      bdBackBtn.type = "button";
      bdBackBtn.className = "hierarchy-back";
      bdBackBtn.hidden = true;
      var bdBackArrow = document.createElement("span");
      bdBackArrow.setAttribute("aria-hidden", "true");
      bdBackArrow.textContent = "←";
      bdBackBtn.appendChild(bdBackArrow);
      var bdBackText = document.createElement("span");
      bdBackText.textContent = "Back";
      bdBackBtn.appendChild(bdBackText);
      var bdBackBn = document.createElement("span");
      bdBackBn.className = "hierarchy-back-bn";
      bdBackBn.textContent = "ফিরে যান";
      bdBackBtn.appendChild(bdBackBn);
      bdBackBtn.addEventListener("click", function () {
        if (!bdPath.length) return;
        bdPath.pop();
        try { history.replaceState(null, "", window.location.pathname + window.location.search); } catch (e) {}
        bdRender();
        bdSyncLibraryFromPath();
      });
      bdHierarchyCrumb.parentNode.insertBefore(bdBackBtn, bdHierarchyCrumb);
      function bdRenderCrumb() {
        bdHierarchyCrumb.innerHTML = "";
        if (!bdPath.length) { bdHierarchyCrumb.hidden = true; return; }
        bdHierarchyCrumb.hidden = false;
        var root = document.createElement("button");
        root.type = "button";
        root.textContent = "Bangladesh Biodiversity / বাংলাদেশের জীববৈচিত্র্য";
        root.addEventListener("click", function () {
          bdPath = [];
          try { history.replaceState(null, "", window.location.pathname + window.location.search); } catch (e) {}
          bdRender();
          bdSyncLibraryFromPath();
        });
        var rootWrap = document.createElement("span");
        rootWrap.appendChild(root);
        bdHierarchyCrumb.appendChild(rootWrap);
        var node = bdById[bdPath[bdPath.length - 1]];
        var wrap = document.createElement("span");
        var current = document.createElement("span");
        current.textContent = node ? bdGroupLabel(node) : bdPath[bdPath.length - 1];
        current.setAttribute("aria-current", "location");
        wrap.appendChild(current);
        bdHierarchyCrumb.appendChild(wrap);
      }
      function bdMatches(node, query) {
        var text = [node.name, node.bengaliName, node.description, node.descriptionBn, node.habitat, node.distribution].filter(Boolean).join(" ").toLocaleLowerCase();
        if (text.indexOf(query) !== -1) return true;
        return (node.examples || []).some(function (item) {
          return [item.name, item.commonName, item.bengaliName].filter(Boolean).join(" ").toLocaleLowerCase().indexOf(query) !== -1;
        });
      }
      function bdOpenGroup(id) {
        bdPath = [id];
        try { history.replaceState(null, "", "#bd-" + bdSuffix(id)); } catch (e) {}
        bdRender();
        bdSyncLibraryFromPath();
        if (bdHierarchyRoot.scrollIntoView) bdHierarchyRoot.scrollIntoView();
      }
      function bdSyncLibraryFromPath() {
        var group = document.querySelector("[data-bangladesh-library-group]");
        if (!group) return;
        var id = bdPath.length ? bdPath[bdPath.length - 1] : "";
        var ok = false;
        if (id) {
          for (var i = 0; i < group.options.length; i++) {
            if (group.options[i].value === id) { ok = true; break; }
          }
        }
        var next = ok ? id : "";
        if (group.value !== next) { group.value = next; group.dispatchEvent(new Event("change", { bubbles: true })); }
      }
      function bdGroupCard(node) {
        var card = document.createElement("article");
        card.className = "bangladesh-hierarchy-card";
        var button = document.createElement("button");
        button.type = "button";
        button.className = "bangladesh-hierarchy-select";
        var name = document.createElement("span");
        name.className = "bangladesh-hierarchy-name";
        name.textContent = bdGroupLabel(node);
        button.appendChild(name);
        if (node.description) {
          var desc = document.createElement("span");
          desc.className = "bangladesh-hierarchy-desc";
          desc.textContent = node.description;
          button.appendChild(desc);
        }
        var exCount = (node.examples || []).length;
        var count = document.createElement("span");
        count.className = "bangladesh-hierarchy-count";
        count.textContent = exCount + " example species / " + bdBnDigits(exCount) + "টি উদাহরণ প্রজাতি";
        button.appendChild(count);
        var hint = document.createElement("span");
        hint.className = "bangladesh-explore-label";
        var chev = document.createElement("span");
        chev.className = "bangladesh-chevron";
        chev.setAttribute("aria-hidden", "true");
        chev.textContent = "›";
        hint.appendChild(chev);
        hint.appendChild(document.createTextNode(" Explore / অন্বেষণ"));
        button.appendChild(hint);
        button.addEventListener("click", function () { bdOpenGroup(node.id); });
        card.appendChild(button);
        return card;
      }
      function bdDetailRow(panel, label, value) {
        if (value === undefined || value === null || value === "") return;
        var text = Array.isArray(value) ? value.filter(Boolean).join(", ") : String(value);
        if (!text) return;
        var row = document.createElement("p");
        row.className = "bangladesh-hierarchy-meta";
        var strong = document.createElement("strong");
        strong.textContent = label + ": ";
        row.appendChild(strong);
        row.appendChild(document.createTextNode(text));
        panel.appendChild(row);
      }
      function bdDetail(node) {
        var panel = document.createElement("article");
        panel.className = "bangladesh-hierarchy-detail";
        var head = document.createElement("h3");
        head.textContent = bdGroupLabel(node);
        panel.appendChild(head);
        if (node.description) { var d = document.createElement("p"); d.textContent = node.description; panel.appendChild(d); }
        if (node.descriptionBn) { var db = document.createElement("p"); db.textContent = node.descriptionBn; panel.appendChild(db); }
        var badges = document.createElement("div");
        badges.className = "bangladesh-hierarchy-badges";
        var rank = document.createElement("span");
        rank.className = "badge badge-published";
        rank.textContent = "Major group / প্রধান দল";
        badges.appendChild(rank);
        if (node.needsReview) {
          var rev = document.createElement("span");
          rev.className = "badge badge-needs-review";
          rev.textContent = "Needs scientific review / বৈজ্ঞানিক পর্যালোচনা প্রয়োজন";
          badges.appendChild(rev);
        }
        panel.appendChild(badges);
        bdDetailRow(panel, "Habitat / বাসস্থান", node.habitat);
        bdDetailRow(panel, "Ecosystem / বাস্তুতন্ত্র", node.ecosystem);
        bdDetailRow(panel, "Distribution / বিস্তৃতি", node.distribution);
        if (node.characteristics && node.characteristics.length) {
          var ch = document.createElement("h4");
          ch.textContent = "Key characteristics / প্রধান বৈশিষ্ট্য";
          panel.appendChild(ch);
          var ul = document.createElement("ul");
          ul.className = "details-list";
          node.characteristics.forEach(function (c) {
            if (!c) return;
            var li = document.createElement("li");
            li.textContent = [c.en, c.bn].filter(Boolean).join(" / ");
            ul.appendChild(li);
          });
          panel.appendChild(ul);
        }
        var examples = node.examples || [];
        if (examples.length) {
          var eh = document.createElement("h4");
          eh.textContent = "Example species / উদাহরণ প্রজাতি";
          panel.appendChild(eh);
          var eul = document.createElement("ul");
          eul.className = "bangladesh-hierarchy-examples";
          examples.forEach(function (item) {
            if (!item) return;
            var li = document.createElement("li");
            var label = [item.commonName, item.name].filter(Boolean).join(" — ") + (item.bengaliName ? " / " + item.bengaliName : "");
            if (item.speciesId && bdSpeciesById[item.speciesId]) {
              var a = document.createElement("a");
              a.href = "species.html?id=" + encodeURIComponent(item.speciesId);
              a.textContent = label;
              li.appendChild(a);
            } else {
              li.textContent = label;
            }
            eul.appendChild(li);
          });
          panel.appendChild(eul);
        }
        var refs = (node.references || []).map(function (ref) { return ref && (ref.title + (ref.source ? " (" + ref.source + ")" : "")); }).filter(Boolean);
        if (refs.length) {
          var rh = document.createElement("h4");
          rh.textContent = "References / তথ্যসূত্র";
          panel.appendChild(rh);
          var rul = document.createElement("ul");
          rul.className = "details-list";
          refs.forEach(function (t) { var li = document.createElement("li"); li.textContent = t; rul.appendChild(li); });
          panel.appendChild(rul);
        }
        return panel;
      }
      function bdRender() {
        var query = bdHierarchySearch.value.trim().toLocaleLowerCase();
        bdHierarchyList.innerHTML = "";
        bdRenderCrumb();
        bdBackBtn.hidden = bdPath.length === 0;
        var shown = 0;
        var groups = document.createElement("div");
        groups.className = "bangladesh-hierarchy-groups";
        if (query) {
          bdNodes.filter(function (node) { return bdMatches(node, query); }).forEach(function (node) { groups.appendChild(bdGroupCard(node)); shown += 1; });
          bdHierarchyStatus.textContent = shown + (shown === 1 ? " group / দল" : " groups / দল");
        } else if (!bdPath.length) {
          bdNodes.forEach(function (node) { groups.appendChild(bdGroupCard(node)); shown = bdNodes.length; });
          bdHierarchyStatus.textContent = shown + " major groups / " + bdBnDigits(shown) + "টি প্রধান দল";
        } else {
          var node = bdById[bdPath[bdPath.length - 1]];
          if (node) { bdHierarchyList.appendChild(bdDetail(node)); shown = 1; }
          bdHierarchyStatus.textContent = node ? bdGroupLabel(node) : "";
        }
        if (groups.children.length) bdHierarchyList.appendChild(groups);
        bdHierarchyEmpty.hidden = shown !== 0;
      }
      bdHierarchySearch.addEventListener("input", function () { bdRender(); });
      Promise.all([
        fetch("data/bangladesh/classification.json").then(function (r) { if (!r.ok) throw new Error(); return r.json(); }),
        fetch("data/species/index.json").then(function (r) { if (!r.ok) throw new Error(); return r.json(); }).catch(function () { return []; })
      ]).then(function (data) {
        bdNodes = Array.isArray(data[0]) ? data[0] : [];
        bdNodes.forEach(function (node) { if (node && node.id) bdById[node.id] = node; });
        (Array.isArray(data[1]) ? data[1] : []).forEach(function (record) { if (record && record.id) bdSpeciesById[record.id] = record; });
        (function () {
          var rawHash = window.location.hash || "";
          if (rawHash.indexOf("#bd-") !== 0) return;
          var target = bdById[rawHash.replace(/^#bd-/, "")] || bdById["bangladesh-" + rawHash.replace(/^#bd-/, "")];
          if (!target) return;
          bdPath = [target.id];
        })();
        bdRender();
        bdSyncLibraryFromPath();
        if (bdPath.length && bdHierarchyRoot.scrollIntoView) bdHierarchyRoot.scrollIntoView();
      }).catch(function () { bdHierarchyStatus.hidden = true; bdHierarchyError.hidden = false; });
      window.addEventListener("hashchange", function () {
        var rawHash = window.location.hash || "";
        if (rawHash.indexOf("#bd-") !== 0) {
          if (bdPath.length) { bdPath = []; bdRender(); bdSyncLibraryFromPath(); }
          return;
        }
        var target = bdById[rawHash.replace(/^#bd-/, "")] || bdById["bangladesh-" + rawHash.replace(/^#bd-/, "")];
        var next = target ? [target.id] : [];
        if (next.join() !== bdPath.join()) { bdPath = next; bdRender(); bdSyncLibraryFromPath(); }
      });
    }

    /* ---------- Bangladesh Species Library ---------- */
    var bdLibraryRoot = document.querySelector("[data-bangladesh-library]");
    if (bdLibraryRoot) {
      var bdLibSearch = bdLibraryRoot.querySelector("[data-bangladesh-library-search]");
      var bdLibGroup = bdLibraryRoot.querySelector("[data-bangladesh-library-group]");
      var bdLibStatus = bdLibraryRoot.querySelector("[data-bangladesh-library-status]");
      var bdLibGrid = bdLibraryRoot.querySelector("[data-bangladesh-library-grid]");
      var bdLibEmpty = bdLibraryRoot.querySelector("[data-bangladesh-library-empty]");
      var bdLibError = bdLibraryRoot.querySelector("[data-bangladesh-library-error]");
      var bdLibEntries = [];
      var bdMediaById = {};
      function bdApprovedImage(record) {
        var candidates = [];
        if (record && Array.isArray(record.images)) candidates = candidates.concat(record.images);
        candidates = candidates.map(function (image) {
          return image && image.id && bdMediaById[image.id] ? Object.assign({}, bdMediaById[image.id], image) : image;
        });
        return candidates.find(function (image) {
          if (!image || !image.localPath || !image.sourceUrl || !image.credit) return false;
          return image.license && String(image.license).toLowerCase() !== "unknown";
        }) || null;
      }
      function bdLibBnDigits(n) { return String(n).replace(/[0-9]/g, function (d) { return "০১২৩৪৫৬৭৮৯"[Number(d)]; }); }
      function bdLibJoin(value) {
        if (value === undefined || value === null) return "";
        if (Array.isArray(value)) return value.filter(Boolean).join(", ");
        return String(value);
      }
      function bdLibCard(entry) {
        var record = entry.record;
        var species = entry.species;
        var detailUrl = "species.html?id=" + encodeURIComponent(species.id);
        var card = document.createElement("article");
        card.className = "card species-card";
        var image = bdApprovedImage(species, bdMediaById);
        if (image) {
          var imageElement = document.createElement("img");
          imageElement.className = "card-media media-main";
          imageElement.src = image.localPath || image.url;
          imageElement.alt = image.alt || species.commonName || "Species image";
          imageElement.loading = "lazy";
          imageElement.decoding = "async";
          card.appendChild(imageElement);
        } else {
          var placeholder = document.createElement("div");
          placeholder.className = "card-media species-placeholder";
          placeholder.setAttribute("role", "img");
          placeholder.setAttribute("aria-label", "Image unavailable / ছবি অনুপলব্ধ");
          var mark = document.createElement("span");
          mark.className = "species-placeholder-mark";
          mark.setAttribute("aria-hidden", "true");
          mark.innerHTML = "<svg viewBox=\"0 0 24 24\" width=\"40\" height=\"40\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" aria-hidden=\"true\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"/><circle cx=\"9\" cy=\"10\" r=\"1.8\"/><path d=\"M3 17l5-4 4 3 4-4 5 5\"/></svg>";
          placeholder.appendChild(mark);
          var none = document.createElement("span");
          none.className = "species-placeholder-text";
          none.textContent = "Image unavailable / ছবি অনুপলব্ধ";
          placeholder.appendChild(none);
          card.appendChild(placeholder);
        }
        var body = document.createElement("div");
        body.className = "card-body";
        var badges = document.createElement("div");
        badges.className = "card-meta";
        if (entry.groupLabel) { var grp = document.createElement("span"); grp.className = "tag"; grp.textContent = entry.groupLabel; badges.appendChild(grp); }
        var globalStatus = species.conservation && species.conservation.conservationStatus;
        if (globalStatus) { var cons = document.createElement("span"); cons.className = "badge badge-archived"; cons.textContent = "Global: " + globalStatus; badges.appendChild(cons); }
        if (record.regionalConservationStatus) { var reg = document.createElement("span"); reg.className = "badge badge-needs-review"; reg.textContent = "Bangladesh: " + record.regionalConservationStatus; badges.appendChild(reg); }
        body.appendChild(badges);
        var title = document.createElement("h3");
        var titleLink = document.createElement("a");
        titleLink.href = detailUrl;
        titleLink.textContent = species.commonName || species.scientificName || record.speciesId;
        title.appendChild(titleLink);
        body.appendChild(title);
        if (species.bengaliName) { var bn = document.createElement("p"); bn.className = "species-bengali"; bn.textContent = species.bengaliName; body.appendChild(bn); }
        if (species.scientificName) { var sci = document.createElement("p"); sci.className = "scientific-name"; sci.textContent = species.scientificName; body.appendChild(sci); }
        var actions = document.createElement("div");
        actions.className = "species-actions";
        var link = document.createElement("a");
        link.className = "btn btn-outline";
        link.href = detailUrl;
        link.setAttribute("aria-label", "View Details: " + (species.commonName || species.scientificName || record.speciesId));
        link.textContent = "View Details / বিস্তারিত দেখুন →";
        actions.appendChild(link);
        body.appendChild(actions);
        card.appendChild(body);
        return card;
      }
      function bdRenderLibrary() {
        var query = bdLibSearch.value.trim().toLocaleLowerCase();
        var group = bdLibGroup.value;
        bdLibGrid.innerHTML = "";
        var shown = 0;
        bdLibEntries.forEach(function (entry) {
          if (group && entry.groupId !== group) return;
          if (query && entry.haystack.indexOf(query) === -1) return;
          bdLibGrid.appendChild(bdLibCard(entry));
          shown += 1;
        });
        var groupLabel = "";
        if (group) {
          for (var i = 0; i < bdLibGroup.options.length; i++) {
            if (bdLibGroup.options[i].value === group) { groupLabel = bdLibGroup.options[i].textContent; break; }
          }
        }
        bdLibStatus.textContent = (groupLabel ? groupLabel + " — " : "") + shown + " species / " + bdLibBnDigits(shown) + "টি প্রজাতি";
        bdLibEmpty.hidden = shown !== 0;
      }
      bdLibSearch.addEventListener("input", bdRenderLibrary);
      bdLibGroup.addEventListener("change", function () {
        try {
          var v = bdLibGroup.value;
          if (!v) {
            if ((window.location.hash || "").indexOf("#bd-") === 0) history.replaceState(null, "", window.location.pathname + window.location.search);
          } else if (window.location.hash !== "#bd-" + v.replace(/^bangladesh-/, "")) {
            window.location.hash = "#bd-" + v.replace(/^bangladesh-/, "");
          }
        } catch (e) {}
        bdRenderLibrary();
      });
      var bdLibClear = document.createElement("button");
      bdLibClear.className = "btn btn-text";
      bdLibClear.type = "button";
      bdLibClear.textContent = "Clear / পরিষ্কার";
      bdLibStatus.parentNode.insertBefore(bdLibClear, bdLibStatus.nextSibling);
      bdLibClear.addEventListener("click", function () {
        bdLibSearch.value = "";
        bdLibGroup.value = "";
        try { window.location.hash = ""; } catch (e) {}
        bdRenderLibrary();
        bdLibSearch.focus();
      });
      Promise.all([
        fetch("data/bangladesh/species.json").then(function (r) { if (!r.ok) throw new Error(); return r.json(); }),
        fetch("data/species/index.json").then(function (r) { if (!r.ok) throw new Error(); return r.json(); }),
        fetch("data/bangladesh/classification.json").then(function (r) { if (!r.ok) throw new Error(); return r.json(); }).catch(function () { return []; }),
        fetch("data/images.json").then(function (r) { if (!r.ok) throw new Error(); return r.json(); }).catch(function () { return []; })
      ]).then(function (data) {
        var bdRecords = Array.isArray(data[0]) ? data[0] : [];
        var speciesById = {};
        (Array.isArray(data[1]) ? data[1] : []).forEach(function (species) { if (species && species.id) speciesById[species.id] = species; });
        (Array.isArray(data[3]) ? data[3] : []).forEach(function (image) { if (image && image.id) bdMediaById[image.id] = image; });
        var nodes = Array.isArray(data[2]) ? data[2] : [];
        var groupOfSpecies = {};
        nodes.forEach(function (node) {
          if (!node) return;
          (node.examples || []).forEach(function (item) {
            if (item && item.speciesId && !groupOfSpecies[item.speciesId]) groupOfSpecies[item.speciesId] = node;
          });
        });
        nodes.filter(function (node) { return node && !node.parentId; }).forEach(function (root) {
          var option = document.createElement("option");
          option.value = root.id;
          option.textContent = root.name + (root.bengaliName ? " / " + root.bengaliName : "");
          bdLibGroup.appendChild(option);
        });
        (function () {
          var h = window.location.hash || "";
          if (h.indexOf("#bd-") !== 0) return;
          var short = h.replace(/^#bd-/, "");
          var valid = {};
          nodes.forEach(function (n) { if (n && n.id) valid[n.id] = true; });
          if (valid[short]) bdLibGroup.value = short;
          else if (valid["bangladesh-" + short]) bdLibGroup.value = "bangladesh-" + short;
        })();
        bdRecords.forEach(function (record) {
          if (!record || !record.speciesId) return;
          var species = speciesById[record.speciesId];
          if (!species) return;
          var groupNode = groupOfSpecies[record.speciesId] || null;
          var haystack = [
            species.commonName, species.bengaliName, species.scientificName,
            (record.localNames || []).map(function (item) { return item && item.name; }).join(" "),
            bdLibJoin(record.regions), bdLibJoin(record.habitats),
            bdLibJoin(record.regionalThreats), record.notes, record.regionalPopulation
          ].filter(Boolean).join(" ").toLocaleLowerCase();
          bdLibEntries.push({
            record: record,
            species: species,
            groupId: groupNode ? groupNode.id : "",
            groupLabel: groupNode ? (groupNode.name + (groupNode.bengaliName ? " / " + groupNode.bengaliName : "")) : "",
            haystack: haystack
          });
        });
        bdRenderLibrary();
      }).catch(function () { bdLibStatus.hidden = true; bdLibError.hidden = false; });
    }

  }

  /* ---------- Admin dashboard (Phase 01, read-only) ---------- */
  var adminRoot = document.querySelector("[data-admin-dashboard]");
  var adminMenuToggle = document.querySelector(".admin-menu-toggle");
  if (adminMenuToggle) {
    adminMenuToggle.addEventListener("click", function () {
      var open = !document.body.classList.contains("admin-nav-open");
      document.body.classList.toggle("admin-nav-open", open);
      adminMenuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        document.body.classList.remove("admin-nav-open");
        adminMenuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }
  if (adminRoot) {
    var adminSources = [
      { key: "species", label: "Global Species", url: "data/species/index.json" },
      { key: "taxonomy", label: "Taxonomy", url: "data/taxonomy/taxa.json" },
      { key: "bangladesh", label: "Bangladesh Species", url: "data/bangladesh/species.json" },
      { key: "fish", label: "Fish Orders", url: "data/fish/orders.json", count: function (d) { return d.filter(function (n) { return n && n.rank === "order"; }).length; } },
      { key: "marine", label: "Marine Life", url: "data/marine-life/index.json" },
      { key: "projects", label: "Projects", url: "data/projects.json" },
      { key: "thesis", label: "Thesis", url: "data/thesis.json" },
      { key: "news", label: "News", url: "data/news.json" },
      { key: "blog", label: "Blog", url: "data/blog.json" },
      { key: "authors", label: "Authors", url: "data/authors.json" },
      { key: "categories", label: "Categories", url: "data/categories.json" },
      { key: "media", label: "Media", url: "data/images.json" },
      { key: "publications", label: "Publications", url: "data/publications.json" }
    ];
    function adminCount(data, source) {
      if (!Array.isArray(data)) return "—";
      if (typeof source.count === "function") {
        try { return String(source.count(data)); } catch (e) { return "—"; }
      }
      return String(data.length);
    }
    function adminStatusRow(label, data) {
      var tr = document.createElement("tr");
      function cell(text, header) {
        var el = document.createElement(header ? "th" : "td");
        if (header) el.setAttribute("scope", "row");
        el.textContent = text;
        tr.appendChild(el);
        return el;
      }
      if (!Array.isArray(data)) {
        cell(label, true);
        cell("unavailable", false);
        cell("—", false);
        cell("—", false);
        cell("—", false);
        return tr;
      }
      var needs = 0, unverified = 0, published = 0;
      data.forEach(function (record) {
        if (!record || typeof record !== "object") return;
        if (record.needsReview === true) needs += 1;
        if (record.verification && record.verification.status === "unverified") unverified += 1;
        if (record.status === "published") published += 1;
      });
      cell(label, true);
      cell(String(data.length), false);
      cell(String(needs), false);
      cell(String(unverified), false);
      cell(String(published), false);
      return tr;
    }
    Promise.all(adminSources.map(function (source) {
      return fetch(source.url).then(function (r) { if (!r.ok) throw new Error(); return r.json(); }).then(function (data) {
        return { source: source, data: data };
      }).catch(function () {
        return { source: source, data: null };
      });
    })).then(function (results) {
      results.forEach(function (entry) {
        var el = adminRoot.querySelector('[data-count-for="' + entry.source.key + '"]');
        if (el) el.textContent = adminCount(entry.data, entry.source);
      });
      var tbody = adminRoot.querySelector("[data-admin-status] tbody");
      if (tbody) {
        tbody.innerHTML = "";
        results.forEach(function (entry) {
          tbody.appendChild(adminStatusRow(entry.source.label, entry.data));
        });
      }
    });
  }

  /* ---------- Admin explorers (Phase 02, read-only) ---------- */
  var adminView = document.querySelector("[data-admin-view]");
  if (adminView) {
    var AX = { cache: {}, index: {}, ready: false };
    function axFetch(url) {
      if (!AX.cache[url]) {
        AX.cache[url] = fetch(url).then(function (r) { if (!r.ok) throw new Error(); return r.json(); }).catch(function () { return null; });
      }
      return AX.cache[url];
    }
    function axText(tag, text, className) {
      var el = document.createElement(tag);
      if (className) el.className = className;
      el.textContent = text == null ? "" : String(text);
      return el;
    }
    function axNorm(s) { return String(s == null ? "" : s).toLocaleLowerCase(); }
    function axIsSciKey(key) { return /scientific|sciname|binomial/i.test(key || ""); }
    function axIdLink(id) {
      var hit = AX.index[String(id)];
      if (!hit) {
        var span = document.createElement("span");
        span.className = "admin-missing";
        span.textContent = "Unresolved reference (" + id + ")";
        return span;
      }
      var a = document.createElement("a");
      a.href = "#/" + hit.route + "/" + encodeURIComponent(hit.id);
      a.textContent = hit.label;
      return a;
    }
    function axVal(value, key) {
      if (value === undefined || value === null || value === "") {
        return axText("span", "Not available", "admin-missing");
      }
      if (typeof value === "string") {
        if (AX.index[value]) return axIdLink(value);
        if (axIsSciKey(key)) return axText("span", value, "scientific-name");
        return axText("span", value);
      }
      if (typeof value === "number" || typeof value === "boolean") return axText("span", String(value));
      if (Array.isArray(value)) {
        if (!value.length) return axText("span", "None", "admin-missing");
        var ul = document.createElement("ul");
        ul.className = "admin-list";
        value.forEach(function (item) {
          var li = document.createElement("li");
          if (item !== null && typeof item === "object") li.appendChild(axVal(item, key));
          else {
            if (typeof item === "string" && AX.index[item]) li.appendChild(axIdLink(item));
            else if (typeof item === "string" && axIsSciKey(key)) li.appendChild(axText("span", item, "scientific-name"));
            else li.appendChild(axText("span", item == null ? "Not available" : String(item), item == null ? "admin-missing" : ""));
          }
          ul.appendChild(li);
        });
        return ul;
      }
      var dl = document.createElement("dl");
      dl.className = "admin-dl";
      Object.keys(value).forEach(function (k) {
        var dt = document.createElement("dt");
        dt.textContent = k;
        var dd = document.createElement("dd");
        dd.appendChild(axVal(value[k], k));
        dl.appendChild(dt);
        dl.appendChild(dd);
      });
      return dl;
    }
    function axPretty(key) {
      return String(key).replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim().replace(/^./, function (c) { return c.toUpperCase(); });
    }
    function axBack(route, label) {
      var a = document.createElement("a");
      a.className = "admin-back";
      a.href = "#/" + route;
      a.textContent = "← Back to " + label;
      return a;
    }
    function axState(msg, kind) {
      var p = document.createElement("p");
      p.className = "admin-state-msg" + (kind ? " " + kind : "");
      p.textContent = msg;
      return p;
    }
    function axHaystack(record) { return axNorm(JSON.stringify(record)); }
    function axToolbar(cfg, state, onChange) {
      var bar = document.createElement("div");
      bar.className = "admin-toolbar";
      var search = document.createElement("input");
      search.type = "search";
      search.value = state.q;
      search.setAttribute("placeholder", "Search " + cfg.label + "…");
      search.setAttribute("aria-label", "Search " + cfg.label);
      search.addEventListener("input", function () { state.q = search.value; onChange(); });
      bar.appendChild(search);
      (cfg.filters || []).forEach(function (f) {
        var label = document.createElement("label");
        label.className = "admin-filter";
        var lab = document.createElement("span");
        lab.textContent = f.label;
        var sel = document.createElement("select");
        sel.setAttribute("aria-label", f.label);
        sel.appendChild(axOption("", "All"));
        f.options().forEach(function (o) { sel.appendChild(axOption(o.value, o.label)); });
        sel.value = state.filters[f.key] || "";
        sel.addEventListener("change", function () { state.filters[f.key] = sel.value; onChange(); });
        label.appendChild(lab);
        label.appendChild(sel);
        bar.appendChild(label);
      });
      var reset = document.createElement("button");
      reset.type = "button";
      reset.className = "btn btn-ghost";
      reset.textContent = "Reset";
      reset.addEventListener("click", function () {
        state.q = "";
        state.filters = {};
        renderAdminRoute(false);
      });
      bar.appendChild(reset);
      return bar;
    }
    function axOption(value, label) {
      var o = document.createElement("option");
      o.value = value;
      o.textContent = label;
      return o;
    }
    function axApplyFilters(cfg, records, state, ctx) {
      var q = axNorm(state.q).trim();
      return records.filter(function (r) {
        if (q && axHaystack(r).indexOf(q) === -1) return false;
        return (cfg.filters || []).every(function (f) {
          var v = state.filters[f.key];
          if (!v) return true;
          return f.test(r, v, ctx);
        });
      });
    }
    function axCell(record, col, ctx) {
      var td = document.createElement("td");
      if (col.thumb) {
        var img = record.localPath ? document.createElement("img") : null;
        if (img) {
          img.className = "admin-thumb";
          img.src = record.localPath;
          img.alt = record.alt || record.id || "Media";
          img.loading = "lazy";
          img.addEventListener("error", function () {
            var s = document.createElement("span");
            s.className = "admin-missing";
            s.textContent = "File not downloaded";
            if (img.parentNode) img.parentNode.replaceChild(s, img);
          });
          td.appendChild(img);
        } else {
          td.appendChild(axText("span", "Not downloaded", "admin-missing"));
        }
        return td;
      }
      var v = col.get(record, ctx);
      if (v == null || v === "") { td.appendChild(axText("span", "Not available", "admin-missing")); return td; }
      if (col.href) {
        var a = document.createElement("a");
        a.href = col.href(record, ctx);
        a.textContent = String(v);
        if (col.italic) a.className = "scientific-name";
        td.appendChild(a);
      } else if (col.italic) {
        td.appendChild(axText("span", String(v), "scientific-name"));
      } else {
        td.appendChild(axText("span", String(v)));
      }
      return td;
    }
    function axListView(cfg, records, state, ctx) {
      var wrap = document.createElement("div");
      var head = axText("h1", cfg.label);
      head.tabIndex = -1;
      wrap.appendChild(head);
      wrap.appendChild(axText("p", cfg.desc, "text-muted"));
      var render = function () {
        while (listBox.firstChild) listBox.removeChild(listBox.firstChild);
        var shown = axApplyFilters(cfg, records, state, ctx).slice(0, 500);
        listBox.appendChild(axText("p", shown.length + " of " + records.length + " records", "admin-count"));
        if (!shown.length) {
          listBox.appendChild(axState(cfg.empty || "No matching records.", ""));
          return;
        }
        var tableWrap = document.createElement("div");
        tableWrap.className = "table-wrap";
        var table = document.createElement("table");
        table.className = "admin-table";
        var thead = document.createElement("thead");
        var hr = document.createElement("tr");
        cfg.columns.forEach(function (c) {
          var th = document.createElement("th");
          th.scope = "col";
          th.textContent = c.label;
          hr.appendChild(th);
        });
        thead.appendChild(hr);
        table.appendChild(thead);
        var tbody = document.createElement("tbody");
        shown.forEach(function (r) {
          var tr = document.createElement("tr");
          cfg.columns.forEach(function (c) { tr.appendChild(axCell(r, c, ctx)); });
          tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        tableWrap.appendChild(table);
        listBox.appendChild(tableWrap);
        var cards = document.createElement("div");
        cards.className = "admin-cards";
        shown.forEach(function (r) {
          var card = document.createElement("article");
          card.className = "card admin-card";
          var h = document.createElement("h3");
          var link = document.createElement("a");
          link.href = "#/" + cfg.route + "/" + encodeURIComponent(cfg.idOf ? cfg.idOf(r) : r.id);
          link.textContent = cfg.cardTitle(r, ctx);
          h.appendChild(link);
          card.appendChild(h);
          (cfg.cardFields || []).slice(0, 3).forEach(function (f) {
            var p = document.createElement("p");
            p.className = "card-text";
            var v = f.get(r, ctx);
            p.textContent = f.label + ": " + (v == null || v === "" ? "Not available" : v);
            card.appendChild(p);
          });
          cards.appendChild(card);
        });
        listBox.appendChild(cards);
      };
      wrap.appendChild(axToolbar(cfg, state, render));
      var listBox = document.createElement("div");
      wrap.appendChild(listBox);
      render();
      return wrap;
    }
    function axDetailSections(record, groups) {
      var frag = document.createDocumentFragment();
      var used = {};
      (groups || []).forEach(function (g) {
        var has = g.keys.some(function (k) { return record[k] !== undefined; });
        if (!has) return;
        var sec = document.createElement("section");
        sec.className = "admin-detail-sec";
        sec.appendChild(axText("h2", g.title));
        g.keys.forEach(function (k) {
          if (record[k] === undefined) return;
          used[k] = true;
          sec.appendChild(axText("h3", axPretty(k)));
          sec.appendChild(axVal(record[k], k));
        });
        frag.appendChild(sec);
      });
      var rest = Object.keys(record).filter(function (k) { return !used[k]; });
      if (rest.length) {
        var sec = document.createElement("section");
        sec.className = "admin-detail-sec";
        sec.appendChild(axText("h2", "Additional fields"));
        rest.forEach(function (k) {
          sec.appendChild(axText("h3", axPretty(k)));
          sec.appendChild(axVal(record[k], k));
        });
        frag.appendChild(sec);
      }
      return frag;
    }
    function axDetailView(cfg, record, ctx, backLabel) {
      var wrap = document.createElement("div");
      wrap.appendChild(axBack(cfg.route, backLabel || cfg.label));
      var head = axText("h1", cfg.detailTitle(record, ctx));
      head.tabIndex = -1;
      wrap.appendChild(head);
      if (cfg.detailSub) wrap.appendChild(axText("p", cfg.detailSub(record, ctx), "text-muted"));
      if (cfg.detailTop) wrap.appendChild(cfg.detailTop(record, ctx));
      wrap.appendChild(axDetailSections(record, cfg.detailSections));
      if (cfg.detailBottom) wrap.appendChild(cfg.detailBottom(record, ctx));
      return wrap;
    }
    function axMediaThumb(image, small) {
      if (image && image.localPath) {
        var img = document.createElement("img");
        img.className = small ? "admin-thumb" : "admin-hero-img";
        img.src = image.localPath;
        img.alt = image.alt || "Species image";
        img.loading = "lazy";
        img.addEventListener("error", function () {
          var s = document.createElement("span");
          s.className = "admin-missing";
          s.textContent = "File not downloaded";
          if (img.parentNode) img.parentNode.replaceChild(s, img);
        });
        return img;
      }
      return axText("span", "Not available", "admin-missing");
    }
    function axApprovedImage(record, mediaById) {
      var list = Array.isArray(record.images) ? record.images : [];
      for (var i = 0; i < list.length; i++) {
        var m = list[i] && list[i].id && mediaById[list[i].id] ? Object.assign({}, mediaById[list[i].id], list[i]) : list[i];
        if (m && m.localPath && m.sourceUrl && m.credit && m.license && String(m.license).toLowerCase() !== "unknown") return m;
      }
      return null;
    }
    /* ---------- Admin References Explorer (Phase 04-C, read-only) ---------- */
    /* Central registry at data/references/index.json is read-only. Parent
       records are never modified; runtime display copies only. */
    var AX_REF_SOURCE_LABEL = { species: "Species", taxonomy: "Taxonomy", fish: "Fish", bangladesh: "Bangladesh Biodiversity", thesis: "Thesis" };
    function axRefSourceLabel(key) { return AX_REF_SOURCE_LABEL[key] || String(key || ""); }
    function axRefMatchType(r) { return (r.provenance && r.provenance.matchType) || ""; }
    function axRefFlagsText(r) {
      var parts = [];
      if (r.needsReview === true) parts.push("NEEDS REVIEW");
      var mt = axRefMatchType(r);
      if (mt === "conflict") parts.push("CONFLICT");
      else if (mt === "unparsed") parts.push("UNPARSED");
      else if (mt === "exact" && r.provenance && r.provenance.occurrences && r.provenance.occurrences.length > 1) parts.push("SHARED");
      if (!parts.length) parts.push("NONE");
      return parts.join(" · ");
    }
    function axRefViewRecord(r) {
      var c = {};
      Object.keys(r).forEach(function (k) { c[k] = r[k]; });
      if (Array.isArray(c.authors) && !c.authors.length) c.authors = null;
      if (c.provenance && Array.isArray(c.provenance.occurrences)) {
        AX._refVerbatim = AX._refVerbatim || {};
        if (c.provenance.occurrences.length) AX._refVerbatim[c.id] = c.provenance.occurrences[0].verbatim;
        var slim = { matchType: c.provenance.matchType, occurrences: c.provenance.occurrences.map(function (o) { return { sourceModule: o.sourceModule, parentId: o.parentId, field: o.field, fieldIndex: o.fieldIndex }; }) };
        if (c.provenance.sourceText !== undefined) slim.sourceText = c.provenance.sourceText;
        if (c.provenance.conflictKey !== undefined) slim.conflictKey = c.provenance.conflictKey;
        if (c.provenance.reviewNote !== undefined) slim.reviewNote = c.provenance.reviewNote;
        c.provenance = slim;
      }
      return c;
    }
    function axRefOccurrenceItem(o) {
      var li = document.createElement("li");
      li.appendChild(axText("strong", axRefSourceLabel(o.sourceModule) + ": "));
      try { li.appendChild(axIdLink(o.parentId)); }
      catch (e) { li.appendChild(axText("span", String(o.parentId))); }
      li.appendChild(axText("span", " — field " + o.field + (o.fieldIndex === null || o.fieldIndex === undefined ? "" : " [" + o.fieldIndex + "]"), "text-muted"));
      return li;
    }
    function axRefDetailTop(r) {
      var box = document.createElement("div");
      box.appendChild(axText("p", "Reference", "text-muted"));
      var bp = document.createElement("p");
      bp.appendChild(axReviewBadge(axEdLabel(r.status), "rv-status"));
      if (r.needsReview === true) {
        bp.appendChild(document.createTextNode(" "));
        bp.appendChild(axReviewBadge("NEEDS REVIEW", "rv-flag"));
      }
      var mt = axRefMatchType(r);
      if (mt === "conflict") { bp.appendChild(document.createTextNode(" ")); bp.appendChild(axReviewBadge("CONFLICT — HUMAN REVIEW REQUIRED", "rv-flag")); }
      else if (mt === "unparsed") { bp.appendChild(document.createTextNode(" ")); bp.appendChild(axReviewBadge("UNPARSED CITATION", "rv-flag")); }
      else if (mt === "exact" && r.provenance && r.provenance.occurrences && r.provenance.occurrences.length > 1) { bp.appendChild(document.createTextNode(" ")); bp.appendChild(axReviewBadge("EXACT SHARED REFERENCE", "rv-flag")); }
      box.appendChild(bp);
      if (r.url) {
        var pu = document.createElement("p");
        var au = document.createElement("a");
        au.href = r.url;
        au.rel = "noopener";
        au.className = "rv-extlink";
        au.textContent = "Open source URL";
        pu.appendChild(au);
        box.appendChild(pu);
      }
      return box;
    }
    function axRefDetailBottom(r) {
      var frag = document.createDocumentFragment();
      var mt = axRefMatchType(r);
      var occ = (r.provenance && r.provenance.occurrences) || [];
      if (mt === "conflict") {
        var cs = document.createElement("section");
        cs.className = "admin-detail-sec rv-panel rv-callout";
        cs.appendChild(axText("h2", "Conflicting reference group"));
        cs.appendChild(axText("p", "This reference belongs to a title-based conflict group. Human adjudication is required before any merge.", ""));
        cs.appendChild(axText("h3", "Conflict key"));
        cs.appendChild(axText("p", (r.provenance && r.provenance.conflictKey) || "Not available", ""));
        frag.appendChild(cs);
      }
      if (mt === "unparsed") {
        var us = document.createElement("section");
        us.className = "admin-detail-sec rv-panel rv-callout";
        us.appendChild(axText("h2", "Unparsed thesis citation"));
        us.appendChild(axText("p", "The original citation is preserved verbatim. Its bibliographic components have not been automatically inferred.", ""));
        frag.appendChild(us);
      }
      if (mt === "exact" && occ.length > 1) {
        var es = document.createElement("section");
        es.className = "admin-detail-sec rv-panel";
        es.appendChild(axText("h2", "Exact shared reference"));
        es.appendChild(axText("p", "Multiple source occurrences share this exact canonical reference. This is not a duplicate error. Occurrence count: " + occ.length + ".", ""));
        frag.appendChild(es);
      }
      var os = document.createElement("section");
      os.className = "admin-detail-sec";
      os.appendChild(axText("h2", "Source occurrences (" + occ.length + ")"));
      if (!occ.length) {
        os.appendChild(axState("No recorded occurrences.", ""));
      } else {
        var ul = document.createElement("ul");
        ul.className = "admin-list";
        occ.forEach(function (o) { ul.appendChild(axRefOccurrenceItem(o)); });
        os.appendChild(ul);
      }
      frag.appendChild(os);
      var vs = document.createElement("section");
      vs.className = "admin-detail-sec";
      vs.appendChild(axText("h2", "Verbatim original"));
      vs.appendChild(axText("p", "Exact original object preserved in provenance. Identical across all occurrences of this canonical record.", "text-muted"));
      var pre = document.createElement("pre");
      pre.className = "rv-pre";
      var first = (AX._refVerbatim && AX._refVerbatim[r.id] !== undefined) ? AX._refVerbatim[r.id] : (occ.length ? occ[0].verbatim : null);
      pre.textContent = first === undefined || first === null ? "Not available" : (typeof first === "string" ? first : JSON.stringify(first, null, 2));
      vs.appendChild(pre);
      frag.appendChild(vs);
      return frag;
    }
    /* ---------- Admin Institutions Explorer (Phase 04, read-only) ---------- */
    /* Central registry at data/institutions/index.json is read-only. Only
       directly attested identities plus explicit unknowns are registered.
       Nothing inferred is promoted to fact. */
    function axInstRoles(r) {
      var roles = [];
      ((r.provenance && r.provenance.occurrences) || []).forEach(function (o) {
        if (o.role && roles.indexOf(o.role) === -1) roles.push(o.role);
      });
      return roles;
    }
    function axInstFlagsText(r) {
      var parts = [];
      if (r.needsReview === true) parts.push("NEEDS REVIEW");
      var roles = axInstRoles(r);
      if (roles.indexOf("unknown") !== -1) parts.push("UNRESOLVED");
      if (roles.indexOf("inferred") !== -1) parts.push("INFERRED");
      if (!parts.length) parts.push("NONE");
      return parts.join(" · ");
    }
    function axInstDetailTop(r) {
      var box = document.createElement("div");
      box.appendChild(axText("p", "Institution", "text-muted"));
      var bp = document.createElement("p");
      bp.appendChild(axReviewBadge(axEdLabel(r.status), "rv-status"));
      if (r.needsReview === true) {
        bp.appendChild(document.createTextNode(" "));
        bp.appendChild(axReviewBadge("NEEDS REVIEW", "rv-flag"));
      }
      var roles = axInstRoles(r);
      if (roles.indexOf("unknown") !== -1) { bp.appendChild(document.createTextNode(" ")); bp.appendChild(axReviewBadge("UNRESOLVED", "rv-flag")); }
      if (roles.indexOf("inferred") !== -1) { bp.appendChild(document.createTextNode(" ")); bp.appendChild(axReviewBadge("INFERRED — NEEDS REVIEW", "rv-flag")); }
      box.appendChild(bp);
      if ((r.provenance && r.provenance.matchType) === "unknown") {
        box.appendChild(axText("p", "Explicit unknown placeholder from source data. Not a real institution identity and must never be auto-resolved.", "text-muted"));
      }
      return box;
    }
    function axInstOccurrenceItem(o, showRole) {
      var li = document.createElement("li");
      var mod = o.sourceModule === "thesis" ? "Thesis" : (o.sourceModule === "projects" ? "Projects" : (o.sourceModule === "authors" ? "Authors" : String(o.sourceModule)));
      li.appendChild(axText("strong", mod + ": "));
      try { li.appendChild(axIdLink(o.parentId)); }
      catch (e) { li.appendChild(axText("span", String(o.parentId))); }
      li.appendChild(axText("span", " — " + o.field + (o.fieldIndex === null || o.fieldIndex === undefined ? "" : " [" + o.fieldIndex + "]"), "text-muted"));
      if (showRole && o.role && o.role !== "identity" && o.role !== "unknown") {
        li.appendChild(document.createTextNode(" "));
        var tag = document.createElement("span");
        tag.className = "rv-badge";
        tag.textContent = o.role === "inferred" ? "INFERRED — NEEDS REVIEW" : "DEPARTMENT CONTEXT";
        li.appendChild(tag);
        if (o.reviewNote) li.appendChild(axText("span", " " + o.reviewNote, "text-muted inst-rel-note"));
      }
      return li;
    }
    function axInstDetailBottom(r) {
      var frag = document.createDocumentFragment();
      var occ = (r.provenance && r.provenance.occurrences) || [];
      var rel = occ.filter(function (o) { return o.role !== "department"; });
      var depts = occ.filter(function (o) { return o.role === "department"; });
      var rs = document.createElement("section");
      rs.className = "admin-detail-sec";
      rs.appendChild(axText("h2", "Relationships (" + rel.length + ")"));
      if (!rel.length) {
        rs.appendChild(axState("No linked records.", ""));
      } else {
        var ul = document.createElement("ul");
        ul.className = "admin-list";
        rel.forEach(function (o) { ul.appendChild(axInstOccurrenceItem(o, true)); });
        rs.appendChild(ul);
      }
      frag.appendChild(rs);
      if (depts.length) {
        var ds = document.createElement("section");
        ds.className = "admin-detail-sec";
        ds.appendChild(axText("h2", "Unresolved department / organizational unit (" + depts.length + ")"));
        ds.appendChild(axText("p", "Department text preserved as context. Parent institution unclear; nothing inferred.", "text-muted"));
        var dul = document.createElement("ul");
        dul.className = "admin-list";
        depts.forEach(function (o) { dul.appendChild(axInstOccurrenceItem(o, true)); });
        ds.appendChild(dul);
        frag.appendChild(ds);
      }
      var ps = document.createElement("section");
      ps.className = "admin-detail-sec";
      ps.appendChild(axText("h2", "Provenance (" + occ.length + " occurrences)"));
      var pul = document.createElement("ul");
      pul.className = "admin-list";
      occ.forEach(function (o) { pul.appendChild(axInstOccurrenceItem(o, false)); });
      ps.appendChild(pul);
      frag.appendChild(ps);
      var vs = document.createElement("section");
      vs.className = "admin-detail-sec";
      vs.appendChild(axText("h2", "Verbatim originals"));
      vs.appendChild(axText("p", "Exact original source values. One block per distinct verbatim.", "text-muted"));
      var seenV = [];
      occ.forEach(function (o) {
        var key = JSON.stringify(o.verbatim);
        if (seenV.indexOf(key) !== -1) return;
        seenV.push(key);
        var h = axText("h3", o.sourceModule + " / " + o.parentId + " / " + o.field);
        vs.appendChild(h);
        var pre = document.createElement("pre");
        pre.className = "rv-pre";
        pre.textContent = (o.verbatim === undefined || o.verbatim === null) ? "Not available" : (typeof o.verbatim === "string" ? o.verbatim : JSON.stringify(o.verbatim, null, 2));
        vs.appendChild(pre);
      });
      frag.appendChild(vs);
      return frag;
    }
    var AX_ROUTES = {
      species: { label: "Global Species", desc: "Authoritative worldwide species identities.", fetch: ["data/species/index.json", "data/images.json"],
        rows: function (d) { return Array.isArray(d) ? d : []; },
        columns: [
          { label: "Common name", get: function (r) { return r.commonName; }, href: function (r) { return "#/species/" + encodeURIComponent(r.id); } },
          { label: "Scientific name", get: function (r) { return r.scientificName; }, href: function (r) { return "#/species/" + encodeURIComponent(r.id); }, italic: true },
          { label: "Status", get: function (r) { return r.status; } },
          { label: "Needs review", get: function (r) { return String(r.needsReview); } },
          { label: "Version", get: function (r) { return r.version; } }
        ],
        cardTitle: function (r) { return r.commonName || r.id; },
        cardFields: [{ label: "Scientific", get: function (r) { return r.scientificName; } }, { label: "Status", get: function (r) { return r.status; } }],
        filters: [{ key: "review", label: "Review", options: function () { return [{ value: "yes", label: "Needs review" }, { value: "no", label: "No flag" }]; }, test: function (r, v) { return v === "yes" ? r.needsReview === true : r.needsReview !== true; } }],
        detailTitle: function (r) { return r.commonName || r.id; },
        detailSub: function (r) { return r.scientificName || ""; },
        detailSections: [
          { title: "Identity", keys: ["id", "slug"] },
          { title: "Names", keys: ["commonName", "bengaliName", "scientificName"] },
          { title: "Taxonomy", keys: ["taxonomy"] },
          { title: "Identification", keys: ["identification"] },
          { title: "Biology", keys: ["biology"] },
          { title: "Ecology", keys: ["ecology"] },
          { title: "Importance", keys: ["importance"] },
          { title: "Conservation", keys: ["conservation"] },
          { title: "References", keys: ["references"] },
          { title: "Verification", keys: ["verification"] },
          { title: "Metadata", keys: ["status", "needsReview", "createdAt", "updatedAt", "lastVerifiedAt", "version"] }
        ],
        hideKeys: ["images"],
        detailTop: function (r, ctx) {
          var img = axApprovedImage(r, ctx.media);
          var box = document.createElement("div");
          box.className = "admin-hero-media";
          box.appendChild(axMediaThumb(img, false));
          return box;
        }
      },
      taxonomy: { label: "Taxonomy", desc: "Taxon hierarchy, ranks and parent-child links.", fetch: ["data/taxonomy/taxa.json", "data/species/index.json"],
        rows: function (d) { return Array.isArray(d) ? d : []; },
        columns: [
          { label: "Name", get: function (r) { return r._depthPad + r.name; }, href: function (r) { return "#/taxonomy/" + encodeURIComponent(r.id); } },
          { label: "Rank", get: function (r) { return r.rank; } },
          { label: "Parent", get: function (r) { return r.parentId; } },
          { label: "Needs review", get: function (r) { return String(r.needsReview); } }
        ],
        cardTitle: function (r) { return r.name || r.id; },
        cardFields: [{ label: "Rank", get: function (r) { return r.rank; } }, { label: "Parent", get: function (r) { return r.parentId; } }],
        filters: [{ key: "rank", label: "Rank", options: function () { return AX._ranks.map(function (x) { return { value: x, label: x }; }); }, test: function (r, v) { return r.rank === v; } }],
        detailTitle: function (r) { return r.name || r.id; },
        detailSections: [
          { title: "Identity", keys: ["id", "rank", "parentId", "scientificName"] },
          { title: "Description", keys: ["description"] },
          { title: "Characteristics", keys: ["keyCharacteristics", "diagnosticFeatures"] },
          { title: "References", keys: ["references"] },
          { title: "Metadata", keys: ["needsReview", "createdAt", "updatedAt", "version"] }
        ],
        detailBottom: function (r, ctx) {
          var frag = document.createDocumentFragment();
          var kids = (ctx.taxa || []).filter(function (t) { return t.parentId === r.id; });
          if (kids.length) {
            var sec = document.createElement("section");
            sec.className = "admin-detail-sec";
            sec.appendChild(axText("h2", "Child taxa (" + kids.length + ")"));
            var ul = document.createElement("ul");
            ul.className = "admin-list";
            kids.forEach(function (k) {
              var li = document.createElement("li");
              var a = document.createElement("a");
              a.href = "#/taxonomy/" + encodeURIComponent(k.id);
              a.textContent = k.name + " (" + k.rank + ")";
              li.appendChild(a);
              ul.appendChild(li);
            });
            sec.appendChild(ul);
            frag.appendChild(sec);
          }
          var spp = (ctx.species || []).filter(function (s) {
            return s.taxonomy && Object.keys(s.taxonomy).some(function (k) { return s.taxonomy[k] === r.id; });
          });
          if (spp.length) {
            var sec2 = document.createElement("section");
            sec2.className = "admin-detail-sec";
            sec2.appendChild(axText("h2", "Linked species (" + spp.length + ")"));
            var ul2 = document.createElement("ul");
            ul2.className = "admin-list";
            spp.slice(0, 100).forEach(function (s) {
              var li = document.createElement("li");
              var a = document.createElement("a");
              a.href = "#/species/" + encodeURIComponent(s.id);
              a.textContent = s.commonName || s.id;
              li.appendChild(a);
              ul2.appendChild(li);
            });
            sec2.appendChild(ul2);
            frag.appendChild(sec2);
          }
          var reps = r.representativeSpeciesIds || [];
          if (reps.length) {
            var sec3 = document.createElement("section");
            sec3.className = "admin-detail-sec";
            sec3.appendChild(axText("h2", "Representative species"));
            var ul3 = document.createElement("ul");
            ul3.className = "admin-list";
            reps.forEach(function (sid) {
              var li = document.createElement("li");
              li.appendChild(axIdLink(sid));
              ul3.appendChild(li);
            });
            sec3.appendChild(ul3);
            frag.appendChild(sec3);
          }
          return frag;
        }
      },
      fish: { label: "Fish", desc: "Fish classification hierarchy, orders and dossiers.", fetch: ["data/fish/orders.json", "data/species/index.json"], tree: true },
      marine: { label: "Marine Life", desc: "Marine organism extension records.", fetch: ["data/marine-life/index.json", "data/species/index.json"],
        rows: function (d) { return Array.isArray(d) ? d : []; },
        columns: [
          { label: "Species", get: function (r, ctx) { var s = ctx.speciesById[r.speciesId]; return s ? (s.commonName || r.speciesId) : r.speciesId; }, href: function (r) { return "#/marine/" + encodeURIComponent(r.speciesId); } },
          { label: "Category", get: function (r) { return r.marineCategory; } },
          { label: "Relationship", get: function (r) { return r.relationshipStatus; } },
          { label: "Visibility", get: function (r) { return r.publicVisibility; } }
        ],
        cardTitle: function (r, ctx) { var s = ctx.speciesById[r.speciesId]; return s ? (s.commonName || r.speciesId) : r.speciesId; },
        cardFields: [{ label: "Category", get: function (r) { return r.marineCategory; } }, { label: "Visibility", get: function (r) { return r.publicVisibility; } }],
        filters: [{ key: "vis", label: "Visibility", options: function () { return [{ value: "public", label: "public" }, { value: "withheld", label: "withheld" }]; }, test: function (r, v) { return r.publicVisibility === v; } }],
        idOf: function (r) { return r.speciesId; },
        detailTitle: function (r, ctx) { var s = ctx.speciesById[r.speciesId]; return s ? (s.commonName || r.speciesId) : r.speciesId; },
        detailTop: function (r, ctx) {
          var box = document.createElement("div");
          box.className = "admin-relation-box";
          box.appendChild(axText("strong", "Global Species: "));
          var s = ctx.speciesById[r.speciesId];
          if (s) {
            var a = document.createElement("a");
            a.href = "#/species/" + encodeURIComponent(s.id);
            a.textContent = (s.commonName || s.id) + (s.scientificName ? " — " + s.scientificName : "");
            if (s.scientificName) a.className = "";
            box.appendChild(a);
          } else {
            box.appendChild(axText("span", "Unresolved reference (" + r.speciesId + ")", "admin-missing"));
          }
          return box;
        },
        detailSections: [{ title: "Marine extension", keys: ["marineCategory", "depthRange", "zone", "substrate", "salinityTolerance", "commercialImportance", "aquaculturePotential", "tradeRegulations", "iucnStatus", "regionalStatus", "majorThreats", "conservationActions"] }, { title: "Data", keys: ["marineSpecificData", "notes"] }, { title: "Metadata", keys: ["relationshipStatus", "publicVisibility", "needsReview", "createdAt", "updatedAt", "version"] }]
      },
      bangladesh: { label: "Bangladesh Biodiversity", desc: "Bangladesh regional species extensions.", fetch: ["data/bangladesh/species.json", "data/bangladesh/classification.json", "data/species/index.json"],
        rows: function (d) { return Array.isArray(d) ? d : []; },
        columns: [
          { label: "Common name", get: function (r, ctx) { var s = ctx.speciesById[r.speciesId]; return s ? (s.commonName || r.speciesId) : r.speciesId; }, href: function (r) { return "#/bangladesh/" + encodeURIComponent(r.speciesId); } },
          { label: "Scientific name", get: function (r, ctx) { var s = ctx.speciesById[r.speciesId]; return s ? s.scientificName : ""; }, italic: true },
          { label: "Group", get: function (r, ctx) { return axBdGroupLabel(ctx.bdGroup[r.speciesId]); } },
          { label: "Regional status", get: function (r) { return r.regionalConservationStatus; } }
        ],
        cardTitle: function (r, ctx) { var s = ctx.speciesById[r.speciesId]; return s ? (s.commonName || r.speciesId) : r.speciesId; },
        cardFields: [{ label: "Group", get: function (r, ctx) { return axBdGroupLabel(ctx.bdGroup[r.speciesId]); } }, { label: "Regional status", get: function (r) { return r.regionalConservationStatus; } }],
        filters: [{ key: "group", label: "Group", options: function () { return AX._bdGroups.map(function (g) { return { value: g.id, label: g.label }; }); }, test: function (r, v, ctx) { return (ctx.bdGroup[r.speciesId] || "") === v; } }],
        idOf: function (r) { return r.speciesId; },
        detailTitle: function (r, ctx) { var s = ctx.speciesById[r.speciesId]; return s ? (s.commonName || r.speciesId) : r.speciesId; },
        detailTop: function (r, ctx) {
          var box = document.createElement("div");
          box.className = "admin-relation-box";
          box.appendChild(axText("strong", "Global Species: "));
          var s = ctx.speciesById[r.speciesId];
          if (s) {
            var a = document.createElement("a");
            a.href = "#/species/" + encodeURIComponent(s.id);
            a.textContent = (s.commonName || s.id) + (s.scientificName ? " — " + s.scientificName : "");
            box.appendChild(a);
          } else {
            box.appendChild(axText("span", "Unresolved reference (" + r.speciesId + ")", "admin-missing"));
          }
          return box;
        },
        detailSections: [{ title: "Bangladesh extension", keys: ["presenceStatus", "regions", "habitats", "localNames", "regionalConservationStatus", "regionalThreats", "regionalPopulation", "notes", "references"] }, { title: "Metadata", keys: ["needsReview", "lastUpdated", "version"] }]
      },
      projects: { label: "Projects", desc: "Research project records and relationships.", fetch: ["data/projects.json", "data/species/index.json"],
        rows: function (d) { return Array.isArray(d) ? d : []; },
        columns: [
          { label: "Title", get: function (r) { return r.title; }, href: function (r) { return "#/projects/" + encodeURIComponent(r.id); } },
          { label: "Category", get: function (r) { return r.category; } },
          { label: "Status", get: function (r) { return r.status; } }
        ],
        cardTitle: function (r) { return r.title || r.id; },
        cardFields: [{ label: "Category", get: function (r) { return r.category; } }, { label: "Status", get: function (r) { return r.status; } }],
        detailTitle: function (r) { return r.title || r.id; },
        detailSections: [{ title: "Record", keys: ["id", "slug", "title", "bengaliTitle", "category", "status"] }, { title: "Content", keys: ["description", "objectives", "methodology", "location", "findings"] }, { title: "Relationships", keys: ["speciesIds", "taxonIds", "researcherIds", "institutionIds", "publicationIds", "references", "images"] }, { title: "Admin", keys: ["fundingSources", "permits", "tags", "startDate", "endDate", "createdAt", "updatedAt", "version", "needsReview", "notes"] }]
      },
      thesis: { label: "Thesis", desc: "Thesis records and relationships.", fetch: ["data/thesis.json", "data/species/index.json"],
        rows: function (d) { return Array.isArray(d) ? d : []; },
        columns: [
          { label: "Title", get: function (r) { return r.title; }, href: function (r) { return "#/thesis/" + encodeURIComponent(r.id); } },
          { label: "Author", get: function (r) { return r.author; } },
          { label: "Year", get: function (r) { return r.year; } }
        ],
        cardTitle: function (r) { return r.title || r.id; },
        cardFields: [{ label: "Author", get: function (r) { return r.author; } }, { label: "Year", get: function (r) { return r.year; } }],
        detailTitle: function (r) { return r.title || r.id; },
        detailSections: [{ title: "Record", keys: ["id", "slug", "title", "bengaliTitle", "author", "degree", "department", "institution", "year", "status", "language"] }, { title: "Content", keys: ["researchArea", "keywords", "abstract", "pages", "documentUrl", "doi", "citation"] }, { title: "Relationships", keys: ["supervisorIds", "coSupervisorIds", "subjectSpeciesIds", "subjectTaxonIds", "references"] }, { title: "Admin", keys: ["tags", "createdAt", "updatedAt", "version", "needsReview", "notes"] }]
      },
      news: { label: "News", desc: "News records.", fetch: ["data/news.json", "data/species/index.json"],
        rows: function (d) { return Array.isArray(d) ? d : []; },
        columns: [
          { label: "Title", get: function (r) { return r.title; }, href: function (r) { return "#/news/" + encodeURIComponent(r.id); } },
          { label: "Category", get: function (r) { return r.category; } },
          { label: "Date", get: function (r) { return r.publishDate; } }
        ],
        cardTitle: function (r) { return r.title || r.id; },
        cardFields: [{ label: "Category", get: function (r) { return r.category; } }, { label: "Date", get: function (r) { return r.publishDate; } }],
        detailTitle: function (r) { return r.title || r.id; },
        detailSections: [{ title: "Record", keys: ["id", "slug", "title", "bengaliTitle", "excerpt", "category", "publishDate", "status", "featured"] }, { title: "Content", keys: ["content", "coverImage", "tags"] }, { title: "Relationships", keys: ["authorIds", "relatedSpeciesIds", "relatedProjectIds", "references"] }, { title: "Admin", keys: ["createdAt", "updatedAt", "version", "needsReview", "notes"] }]
      },
      blog: { label: "Blog", desc: "Blog records.", fetch: ["data/blog.json", "data/species/index.json"],
        rows: function (d) { return Array.isArray(d) ? d : []; },
        columns: [
          { label: "Title", get: function (r) { return r.title; }, href: function (r) { return "#/blog/" + encodeURIComponent(r.id); } },
          { label: "Category", get: function (r) { return r.category; } },
          { label: "Date", get: function (r) { return r.publishDate; } }
        ],
        cardTitle: function (r) { return r.title || r.id; },
        cardFields: [{ label: "Category", get: function (r) { return r.category; } }, { label: "Date", get: function (r) { return r.publishDate; } }],
        detailTitle: function (r) { return r.title || r.id; },
        detailSections: [{ title: "Record", keys: ["id", "slug", "title", "bengaliTitle", "excerpt", "category", "publishDate", "status", "featured"] }, { title: "Content", keys: ["content", "coverImage", "tags"] }, { title: "Relationships", keys: ["authorIds", "relatedSpeciesIds", "relatedProjectIds", "references"] }, { title: "Admin", keys: ["createdAt", "updatedAt", "version", "needsReview", "notes"] }]
      },
      publications: { label: "Publications", desc: "Publication records.", fetch: ["data/publications.json"],
        rows: function (d) { return Array.isArray(d) ? d : []; },
        columns: [{ label: "Title", get: function (r) { return r.title; }, href: function (r) { return "#/publications/" + encodeURIComponent(r.id); } }],
        cardTitle: function (r) { return r.title || r.id; },
        cardFields: [],
        detailTitle: function (r) { return r.title || r.id; },
        detailSections: [],
        empty: "No publication records are currently available."
      },
      authors: { label: "Authors", desc: "Author profiles.", fetch: ["data/authors.json"],
        rows: function (d) { return Array.isArray(d) ? d : []; },
        columns: [
          { label: "Name", get: function (r) { return r.name; }, href: function (r) { return "#/authors/" + encodeURIComponent(r.id); } },
          { label: "Role", get: function (r) { return r.role; } },
          { label: "Affiliation", get: function (r) { return r.affiliation; } }
        ],
        cardTitle: function (r) { return r.name || r.id; },
        cardFields: [{ label: "Role", get: function (r) { return r.role; } }],
        detailTitle: function (r) { return r.name || r.id; },
        detailSections: [{ title: "Profile", keys: ["id", "name", "orcid", "affiliation", "email", "bio", "avatarUrl", "role"] }, { title: "Admin", keys: ["createdAt", "updatedAt", "needsReview", "notes"] }]
      },
      categories: { label: "Categories", desc: "Controlled classification categories.", fetch: ["data/categories.json"],
        rows: function (d) { return Array.isArray(d) ? d : []; },
        columns: [
          { label: "Name", get: function (r) { return r.name; }, href: function (r) { return "#/categories/" + encodeURIComponent(r.id); } },
          { label: "Type", get: function (r) { return r.type; } }
        ],
        cardTitle: function (r) { return r.name || r.id; },
        cardFields: [{ label: "Type", get: function (r) { return r.type; } }],
        detailTitle: function (r) { return r.name || r.id; },
        detailSections: [{ title: "Record", keys: ["id", "type", "name", "bengaliName", "description", "color", "icon", "order", "createdAt"] }]
      },
      media: { label: "Media Library", desc: "Registered media assets and provenance.", fetch: ["data/images.json", "data/species/index.json"],
        rows: function (d) { return Array.isArray(d) ? d : []; },
        columns: [
          { label: "Preview", get: function () { return ""; }, thumb: true },
          { label: "ID", get: function (r) { return r.id; }, href: function (r) { return "#/media/" + encodeURIComponent(r.id); } },
          { label: "Species", get: function (r, ctx) { var s = ctx.speciesById[r.speciesId]; return s ? (s.commonName || r.speciesId) : r.speciesId; } },
          { label: "License", get: function (r) { return r.license; } }
        ],
        cardTitle: function (r) { return r.id; },
        cardFields: [{ label: "License", get: function (r) { return r.license; } }],
        detailTitle: function (r) { return r.id; },
        detailTop: function (r) {
          var box = document.createElement("div");
          box.className = "admin-hero-media";
          box.appendChild(axMediaThumb(r.localPath ? r : null, false));
          return box;
        },
        detailSections: [{ title: "Provenance", keys: ["speciesId", "sourceUrl", "sourcePageUrl", "creator", "license", "licenseUrl", "credit", "alt", "caption", "imageType", "role"] }, { title: "Review", keys: ["verificationStatus", "publicationStatus", "notes"] }]
      },
      review: { label: "Review Queue", desc: "Derived read-only review flags from existing record metadata.", queue: true },
      references: { label: "References", desc: "Central Reference Registry — read-only reusable citations and sources.", fetch: ["data/references/index.json"],
        rows: function (d) {
          var recs = (d && Array.isArray(d.records)) ? d.records : [];
          AX._refTypes = [];
          AX._refSources = [];
          recs.forEach(function (r) {
            if (r.type && AX._refTypes.indexOf(r.type) === -1) AX._refTypes.push(r.type);
            ((r.provenance && r.provenance.occurrences) || []).forEach(function (o) {
              if (o.sourceModule && AX._refSources.indexOf(o.sourceModule) === -1) AX._refSources.push(o.sourceModule);
            });
          });
          AX._refTypes.sort();
          return recs.map(axRefViewRecord);
        },
        columns: [
          { label: "ID", get: function (r) { return r.id; }, href: function (r) { return "#/references/" + encodeURIComponent(r.id); } },
          { label: "Title", get: function (r) { return r.title; }, href: function (r) { return "#/references/" + encodeURIComponent(r.id); } },
          { label: "Type", get: function (r) { return r.type; } },
          { label: "Year", get: function (r) { return (r.year === null || r.year === undefined || r.year === "") ? "" : String(r.year); } },
          { label: "Journal / Source", get: function (r) { return r.journal || ((r.provenance && r.provenance.sourceText) || ""); } },
          { label: "DOI", get: function (r) { return r.doi; } },
          { label: "Review", get: function (r) { return axRefFlagsText(r); } },
          { label: "Open", get: function () { return "Open Record"; }, href: function (r) { return "#/references/" + encodeURIComponent(r.id); } }
        ],
        cardTitle: function (r) { return r.title || r.id; },
        cardFields: [{ label: "ID", get: function (r) { return r.id; } }, { label: "Type", get: function (r) { return r.type; } }, { label: "Review", get: function (r) { return axRefFlagsText(r); } }],
        filters: [
          { key: "type", label: "Type", options: function () { return (AX._refTypes || []).map(function (x) { return { value: x, label: x }; }); }, test: function (r, v) { return r.type === v; } },
          { key: "year", label: "Year", options: function () { return [{ value: "yes", label: "Available" }, { value: "no", label: "Missing" }]; }, test: function (r, v) { var has = !(r.year === null || r.year === undefined || r.year === ""); return v === "yes" ? has : !has; } },
          { key: "doi", label: "DOI", options: function () { return [{ value: "yes", label: "Has DOI" }, { value: "no", label: "No DOI" }]; }, test: function (r, v) { var has = !!r.doi; return v === "yes" ? has : !has; } },
          { key: "url", label: "URL", options: function () { return [{ value: "yes", label: "Has URL" }, { value: "no", label: "No URL" }]; }, test: function (r, v) { var has = !!r.url; return v === "yes" ? has : !has; } },
          { key: "review", label: "Review", options: function () { return [{ value: "needs-review", label: "Needs Review" }, { value: "conflict", label: "Conflict" }, { value: "unparsed", label: "Unparsed" }]; }, test: function (r, v) { if (v === "needs-review") return r.needsReview === true; var mt = (r.provenance && r.provenance.matchType) || ""; return mt === v; } },
          { key: "module", label: "Source Module", options: function () { return (AX._refSources || []).map(function (x) { return { value: x, label: axRefSourceLabel(x) }; }); }, test: function (r, v) { return ((r.provenance && r.provenance.occurrences) || []).some(function (o) { return o.sourceModule === v; }); } }
        ],
        detailTitle: function (r) { return r.title || r.id; },
        detailSub: function (r) { return r.id || ""; },
        detailTop: function (r) { return axRefDetailTop(r); },
        detailSections: [
          { title: "Bibliographic Information", keys: ["title", "authors", "year", "journal", "publisher", "url", "doi", "type"] },
          { title: "Editorial Metadata", keys: ["status", "needsReview", "version", "createdAt", "updatedAt"] }
        ],
        detailBottom: function (r) { return axRefDetailBottom(r); },
        empty: "No references match the current filters."
      },
      institutions: { label: "Institutions", desc: "Central Institution Registry — read-only attested identities and explicit unknowns.", fetch: ["data/institutions/index.json"],
        rows: function (d) {
          var recs = (d && Array.isArray(d.records)) ? d.records : [];
          AX._instTypes = [];
          AX._instCountries = [];
          AX._instStatuses = [];
          recs.forEach(function (r) {
            if (r.type && AX._instTypes.indexOf(r.type) === -1) AX._instTypes.push(r.type);
            if (r.country && AX._instCountries.indexOf(r.country) === -1) AX._instCountries.push(r.country);
            var st = (r.status === undefined || r.status === null) ? "" : String(r.status);
            if (AX._instStatuses.indexOf(st) === -1) AX._instStatuses.push(st);
          });
          return recs;
        },
        columns: [
          { label: "ID", get: function (r) { return r.id; }, href: function (r) { return "#/institutions/" + encodeURIComponent(r.id); } },
          { label: "Institution", get: function (r) { return r.name; }, href: function (r) { return "#/institutions/" + encodeURIComponent(r.id); } },
          { label: "Country", get: function (r) { return r.country; } },
          { label: "Type", get: function (r) { return r.type; } },
          { label: "Status", get: function (r) { return axEdLabel(r.status); } },
          { label: "Review", get: function (r) { return axInstFlagsText(r); } },
          { label: "Open", get: function () { return "Open Record"; }, href: function (r) { return "#/institutions/" + encodeURIComponent(r.id); } }
        ],
        cardTitle: function (r) { return r.name || r.id; },
        cardFields: [{ label: "ID", get: function (r) { return r.id; } }, { label: "Country", get: function (r) { return r.country; } }, { label: "Review", get: function (r) { return axInstFlagsText(r); } }],
        filters: [
          { key: "type", label: "Type", options: function () { return (AX._instTypes || []).map(function (x) { return { value: x, label: x }; }); }, test: function (r, v) { return r.type === v; } },
          { key: "country", label: "Country", options: function () { return (AX._instCountries || []).map(function (x) { return { value: x, label: x }; }); }, test: function (r, v) { return r.country === v; } },
          { key: "status", label: "Status", options: function () { return (AX._instStatuses || []).map(function (x) { return { value: x === "" ? "__NOTSET__" : x, label: axEdLabel(x) }; }); }, test: function (r, v) { var st = (r.status === undefined || r.status === null) ? "" : String(r.status); return v === "__NOTSET__" ? st === "" : st === v; } },
          { key: "review", label: "Review", options: function () { return [{ value: "needs-review", label: "Needs Review" }, { value: "unresolved", label: "Unresolved" }, { value: "inferred", label: "Inferred" }]; }, test: function (r, v) { if (v === "needs-review") return r.needsReview === true; if (v === "unresolved") return axInstRoles(r).indexOf("unknown") !== -1; return axInstRoles(r).indexOf(v) !== -1; } }
        ],
        detailTitle: function (r) { return r.name || r.id; },
        detailSub: function (r) { return r.id || ""; },
        detailTop: function (r) { return axInstDetailTop(r); },
        detailSections: [
          { title: "Institutional Information", keys: ["name", "shortName", "type", "country", "location", "website", "description"] },
          { title: "Editorial Metadata", keys: ["status", "needsReview", "version", "createdAt", "updatedAt"] }
        ],
        detailBottom: function (r) { return axInstDetailBottom(r); },
        empty: "No institutions match the current filters."
      }
    };
    var AX_STORE = { species: "species", taxonomy: "taxa", marine: "marine", bangladesh: "bdspecies", projects: "projects", thesis: "thesis", news: "news", blog: "blog", publications: "publications", authors: "authors", categories: "categories", media: "media", references: "references", institutions: "institutions" };
    AX._ranks = [];
    AX._bdGroups = [];
    AX._fishExpanded = {};
    function axSetActive(route) {
      document.querySelectorAll("[data-admin-route]").forEach(function (el) {
        var on = el.getAttribute("data-admin-route") === route;
        el.classList.toggle("is-active", on);
        if (on) el.setAttribute("aria-current", "page");
        else el.removeAttribute("aria-current");
      });
    }
    function axShowDashboard(show) {
      var container = adminRoot.querySelector(".container");
      if (!container) return;
      Array.prototype.forEach.call(container.children, function (child) {
        if (child.hasAttribute("data-admin-view")) child.hidden = show;
        else child.hidden = !show;
      });
    }
    function axIndexAdd(map, id, route, label) {
      if (id == null || id === "" || map[id]) return;
      map[id] = { route: route, id: id, label: label };
    }
    function axBuildIndex(store) {
      var map = {};
      (store.species || []).forEach(function (r) { axIndexAdd(map, r.id, "species", r.commonName || r.scientificName || r.id); });
      (store.taxa || []).forEach(function (t) { axIndexAdd(map, t.id, "taxonomy", t.name || t.id); });
      (store.fish || []).forEach(function (n) { axIndexAdd(map, n.id, "fish", n.name || n.id); });
      (store.authors || []).forEach(function (a) { axIndexAdd(map, a.id, "authors", a.name || a.id); });
      (store.projects || []).forEach(function (p) { axIndexAdd(map, p.id, "projects", p.title || p.id); });
      (store.thesis || []).forEach(function (t) { axIndexAdd(map, t.id, "thesis", t.title || t.id); });
      (store.news || []).forEach(function (n) { axIndexAdd(map, n.id, "news", n.title || n.id); });
      (store.blog || []).forEach(function (b) { axIndexAdd(map, b.id, "blog", b.title || b.id); });
      (store.categories || []).forEach(function (c) { axIndexAdd(map, c.id, "categories", c.name || c.id); });
      (store.media || []).forEach(function (m) { axIndexAdd(map, m.id, "media", m.id); });
      AX.index = map;
    }
    function axDepth(taxon, taxaById) {
      var d = 0, cur = taxon, guard = 0;
      while (cur && cur.parentId && taxaById[cur.parentId] && guard < 20) { d++; cur = taxaById[cur.parentId]; guard++; }
      return d;
    }
    function axFishPath(node, nodeById) {
      var chain = [], cur = node, guard = 0;
      while (cur && guard < 20) { chain.unshift(cur); cur = (cur.parentId && nodeById[cur.parentId]) || null; guard++; }
      return chain;
    }
    function axFishDetail(node, nodeById) {
      var wrap = document.createElement("div");
      wrap.appendChild(axBack("fish", "Fish"));
      var head = axText("h1", node.name || node.id);
      head.tabIndex = -1;
      wrap.appendChild(head);
      if (node.bengaliName) wrap.appendChild(axText("p", node.bengaliName, "text-muted"));
      var path = axFishPath(node, nodeById).map(function (n) { return n.name || n.id; }).join(" › ");
      var s1 = document.createElement("section");
      s1.className = "admin-detail-sec";
      s1.appendChild(axText("h2", "Classification"));
      (function (parent, label, value) {
        if (value === undefined || value === null || value === "") return;
        var p = document.createElement("p");
        var strong = document.createElement("strong");
        strong.textContent = label + ": ";
        p.appendChild(strong);
        p.appendChild(axVal(value, label));
        parent.appendChild(p);
      })(s1, "Path", "Kingdom Animalia › " + path);
      wrap.appendChild(s1);
      function fishSec(title) {
        var s = document.createElement("section");
        s.className = "admin-detail-sec";
        s.appendChild(axText("h2", title));
        wrap.appendChild(s);
        return s;
      }
      function fishRow(parent, label, value) {
        if (value === undefined || value === null || value === "") return;
        var p = document.createElement("p");
        var strong = document.createElement("strong");
        strong.textContent = label + ": ";
        p.appendChild(strong);
        p.appendChild(axVal(value, label));
        parent.appendChild(p);
      }
      if (node.description || node.descriptionBn) {
        var sd = fishSec("Description");
        fishRow(sd, "Description", node.description);
        fishRow(sd, "Description (bn)", node.descriptionBn);
      }
      var chars = node.characteristics || [];
      if (chars.length) {
        var s2 = fishSec("Identifying characteristics");
        var ul = document.createElement("ul");
        ul.className = "admin-list";
        chars.forEach(function (c) {
          var li = document.createElement("li");
          li.textContent = [c.en, c.bn].filter(Boolean).join(" / ");
          ul.appendChild(li);
        });
        s2.appendChild(ul);
      }
      var s3 = fishSec("Habitat & ecology");
      fishRow(s3, "Habitat", node.habitat);
      fishRow(s3, "Habitat (bn)", node.habitatBn);
      fishRow(s3, "Ecosystem", node.ecosystem);
      fishRow(s3, "Ecosystem (bn)", node.ecosystemBn);
      fishRow(s3, "Feeding", node.feeding);
      fishRow(s3, "Feeding (bn)", node.feedingBn);
      if (node.reproduction || node.reproductionBn) {
        fishRow(s3, "Reproduction", node.reproduction || node.reproductionBn);
        if (node.reproductionBn && node.reproduction) fishRow(s3, "Reproduction (bn)", node.reproductionBn);
      } else if (node.biology) {
        fishRow(s3, "Biology", node.biology);
      }
      fishRow(s3, "Distribution", node.distribution);
      var fams = node.importantFamilies || [];
      if (fams.length) {
        var s4 = fishSec("Important families");
        var ful = document.createElement("ul");
        ful.className = "admin-list";
        fams.forEach(function (f) {
          var li = document.createElement("li");
          li.appendChild(axText("span", f, "scientific-name"));
          ful.appendChild(li);
        });
        s4.appendChild(ful);
      }
      var examples = node.examples || [];
      if (examples.length) {
        var s5 = fishSec("Examples (" + examples.length + ")");
        var eul = document.createElement("ul");
        eul.className = "admin-list";
        examples.forEach(function (item) {
          var li = document.createElement("li");
          if (item.name) li.appendChild(axText("span", item.name, "scientific-name"));
          var rest = [item.commonName, item.bengaliName].filter(Boolean).join(" / ");
          if (rest) li.appendChild(document.createTextNode((item.name ? " — " : "") + rest));
          if (item.speciesId) {
            li.appendChild(document.createTextNode(" "));
            li.appendChild(axIdLink(item.speciesId));
          }
          if (item.verified === false || item.verified == null) {
            var b = document.createElement("span");
            b.className = "admin-state admin-state-part";
            b.textContent = item.verified === false ? "unverified" : "review";
            li.appendChild(document.createTextNode(" "));
            li.appendChild(b);
          }
          eul.appendChild(li);
        });
        s5.appendChild(eul);
      }
      var s6 = fishSec("Taxonomy notes & references");
      fishRow(s6, "Taxonomy notes", node.taxonomyNotes);
      fishRow(s6, "Modern note", node.modernTaxonomyNote);
      if (node.modernTaxonomyNoteBn && node.modernTaxonomyNote) fishRow(s6, "Modern note (bn)", node.modernTaxonomyNoteBn);
      (node.references || []).forEach(function (ref) {
        var p = document.createElement("p");
        p.textContent = (ref.title || "") + (ref.source ? " (" + ref.source + ")" : "");
        s6.appendChild(p);
      });
      var s7 = fishSec("Record metadata");
      fishRow(s7, "ID", node.id);
      fishRow(s7, "Rank", node.rank);
      fishRow(s7, "Status", node.status);
      fishRow(s7, "Needs review", String(node.needsReview));
      fishRow(s7, "Version", node.version);
      return wrap;
    }
    function axFishTree(nodes, nodeById, state) {
      var wrap = document.createElement("div");
      var head = axText("h1", "Fish");
      head.tabIndex = -1;
      wrap.appendChild(head);
      wrap.appendChild(axText("p", "Fish classification hierarchy, orders and dossiers.", "text-muted"));
      var bar = document.createElement("div");
      bar.className = "admin-toolbar";
      var search = document.createElement("input");
      search.type = "search";
      search.value = state.q;
      search.setAttribute("placeholder", "Search fish hierarchy…");
      search.setAttribute("aria-label", "Search fish hierarchy");
      search.addEventListener("input", function () { state.q = search.value; paint(); });
      bar.appendChild(search);
      var reset = document.createElement("button");
      reset.type = "button";
      reset.className = "btn btn-ghost";
      reset.textContent = "Reset";
      reset.addEventListener("click", function () { state.q = ""; renderAdminRoute(false); });
      bar.appendChild(reset);
      wrap.appendChild(bar);
      var box = document.createElement("div");
      wrap.appendChild(box);
      var nodeLabel = function (n) { return (n.name || n.id) + (n.rank ? " · " + n.rank : ""); };
      var branch = function (node) {
        var li = document.createElement("li");
        var kids = nodes.filter(function (n) { return n.parentId === node.id; });
        if (kids.length) {
          var t = document.createElement("button");
          t.type = "button";
          t.className = "admin-tree-toggle";
          var open = !!AX._fishExpanded[node.id];
          t.setAttribute("aria-expanded", open ? "true" : "false");
          t.setAttribute("aria-label", (open ? "Collapse " : "Expand ") + (node.name || node.id));
          t.textContent = open ? "−" : "+";
          t.addEventListener("click", function () {
            AX._fishExpanded[node.id] = !AX._fishExpanded[node.id];
            paint();
          });
          li.appendChild(t);
        }
        var a = document.createElement("a");
        a.href = "#/fish/" + encodeURIComponent(node.id);
        a.textContent = nodeLabel(node);
        li.appendChild(a);
        if (kids.length && AX._fishExpanded[node.id]) {
          var ul = document.createElement("ul");
          ul.className = "admin-tree";
          kids.forEach(function (k) { ul.appendChild(branch(k)); });
          li.appendChild(ul);
        }
        return li;
      };
      var paint = function () {
        while (box.firstChild) box.removeChild(box.firstChild);
        var q = axNorm(state.q).trim();
        if (q) {
          var hits = nodes.filter(function (n) { return axNorm(JSON.stringify(n)).indexOf(q) !== -1; });
          box.appendChild(axText("p", hits.length + " matching nodes", "admin-count"));
          if (!hits.length) { box.appendChild(axState("No matching fish records.", "")); return; }
          var ul = document.createElement("ul");
          ul.className = "admin-list";
          hits.slice(0, 200).forEach(function (n) {
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.href = "#/fish/" + encodeURIComponent(n.id);
            a.textContent = nodeLabel(n);
            li.appendChild(a);
            ul.appendChild(li);
          });
          box.appendChild(ul);
          return;
        }
        var roots = nodes.filter(function (n) { return !n.parentId || !nodeById[n.parentId]; });
        box.appendChild(axText("p", nodes.length + " nodes", "admin-count"));
        var top = document.createElement("ul");
        top.className = "admin-tree";
        roots.forEach(function (r) { top.appendChild(branch(r)); });
        box.appendChild(top);
      };
      paint();
      return wrap;
    }
    function axCtxFor(store) {
      var speciesList = store.species || [];
      var speciesById = {};
      speciesList.forEach(function (s) { if (s && s.id) speciesById[s.id] = s; });
      var taxa = store.taxa || [];
      var taxaById = {};
      taxa.forEach(function (t) { if (t && t.id) taxaById[t.id] = t; });
      var bdGroup = {}, bdGroups = [];
      (store.bdclass || []).forEach(function (n) {
        if (!n) return;
        if (!n.parentId) bdGroups.push({ id: n.id, label: n.name + (n.bengaliName ? " / " + n.bengaliName : "") });
        (n.examples || []).forEach(function (e) { if (e && e.speciesId && !bdGroup[e.speciesId]) bdGroup[e.speciesId] = n.id; });
      });
      AX._bdGroups = bdGroups;
      var ranks = [];
      taxa.forEach(function (t) { if (t && t.rank && ranks.indexOf(t.rank) === -1) ranks.push(t.rank); });
      AX._ranks = ranks.sort();
      var media = {};
      (store.media || []).forEach(function (m) { if (m && m.id) media[m.id] = m; });
      return { species: speciesList, speciesById: speciesById, taxa: taxa, taxaById: taxaById, bdGroup: bdGroup, media: media };
    }
    function axBdGroupLabel(id) {
      var g = null;
      (AX._bdGroups || []).forEach(function (x) { if (x.id === id) g = x.label; });
      return g || id || "";
    }
    function axFind(cfg, records, id) {
      for (var i = 0; i < records.length; i++) {
        var rid = cfg.idOf ? cfg.idOf(records[i]) : records[i].id;
        if (String(rid) === String(id)) return records[i];
      }
      return null;
    }
    /* ---------- Admin Review Queue (Phase 03, read-only) ---------- */
    /* Derived read-only workflow foundation. Queue entries are computed live
       from existing record fields (needsReview, status, verification, version).
       Nothing is created, edited, migrated, or stored. Stored values are never
       modified; normalization below is display-only. */
    var AX_REVIEW_SOURCES = [
      { key: "species", label: "Global Species", route: "species", storeKey: "species",
        idOf: function (r) { return r.id; },
        nameOf: function (r) { return r.commonName || r.id; },
        bengaliOf: function (r) { return r.bengaliName || ""; },
        subOf: function (r) { return r.scientificName || ""; }, sci: true },
      { key: "taxonomy", label: "Taxonomy", route: "taxonomy", storeKey: "taxa",
        idOf: function (r) { return r.id; },
        nameOf: function (r) { return r.name || r.id; },
        bengaliOf: function (r) { return r.bengaliName || ""; },
        subOf: function (r) { return r.rank || ""; }, sci: false },
      { key: "fish", label: "Fish", route: "fish", storeKey: "fish",
        idOf: function (r) { return r.id; },
        nameOf: function (r) { return r.name || r.id; },
        bengaliOf: function (r) { return r.bengaliName || ""; },
        subOf: function (r) { return r.rank || ""; }, sci: false },
      { key: "marine", label: "Marine Life", route: "marine", storeKey: "marine",
        idOf: function (r) { return r.speciesId; },
        nameOf: function (r, ctx) { var s = ctx.speciesById[r.speciesId]; return s ? (s.commonName || r.speciesId) : r.speciesId; },
        bengaliOf: function (r, ctx) { var s = ctx.speciesById[r.speciesId]; return (s && s.bengaliName) || ""; },
        subOf: function (r) { return r.marineCategory || ""; }, sci: false },
      { key: "bangladesh", label: "Bangladesh Biodiversity", route: "bangladesh", storeKey: "bdspecies",
        idOf: function (r) { return r.speciesId; },
        nameOf: function (r, ctx) { var s = ctx.speciesById[r.speciesId]; return s ? (s.commonName || r.speciesId) : r.speciesId; },
        bengaliOf: function (r, ctx) { var s = ctx.speciesById[r.speciesId]; return (s && s.bengaliName) || ""; },
        subOf: function (r, ctx) { var s = ctx.speciesById[r.speciesId]; return (s && s.scientificName) || ""; }, sci: true },
      { key: "projects", label: "Projects", route: "projects", storeKey: "projects",
        idOf: function (r) { return r.id; },
        nameOf: function (r) { return r.title || r.id; },
        bengaliOf: function (r) { return r.bengaliTitle || ""; },
        subOf: function (r) { return r.category || ""; }, sci: false },
      { key: "thesis", label: "Thesis", route: "thesis", storeKey: "thesis",
        idOf: function (r) { return r.id; },
        nameOf: function (r) { return r.title || r.id; },
        bengaliOf: function (r) { return r.bengaliTitle || ""; },
        subOf: function (r) { return r.author || ""; }, sci: false },
      { key: "news", label: "News", route: "news", storeKey: "news",
        idOf: function (r) { return r.id; },
        nameOf: function (r) { return r.title || r.id; },
        bengaliOf: function (r) { return r.bengaliTitle || ""; },
        subOf: function (r) { return r.category || ""; }, sci: false },
      { key: "blog", label: "Blog", route: "blog", storeKey: "blog",
        idOf: function (r) { return r.id; },
        nameOf: function (r) { return r.title || r.id; },
        bengaliOf: function (r) { return r.bengaliTitle || ""; },
        subOf: function (r) { return r.category || ""; }, sci: false },
      { key: "authors", label: "Authors", route: "authors", storeKey: "authors",
        idOf: function (r) { return r.id; },
        nameOf: function (r) { return r.name || r.id; },
        bengaliOf: function () { return ""; },
        subOf: function (r) { return r.role || ""; }, sci: false },
      { key: "categories", label: "Categories", route: "categories", storeKey: "categories",
        idOf: function (r) { return r.id; },
        nameOf: function (r) { return r.name || r.id; },
        bengaliOf: function (r) { return r.bengaliName || ""; },
        subOf: function (r) { return r.type || ""; }, sci: false },
      { key: "media", label: "Media Library", route: "media", storeKey: "media",
        idOf: function (r) { return r.id; },
        nameOf: function (r) { return r.id; },
        bengaliOf: function () { return ""; },
        subOf: function (r) { return r.license || ""; }, sci: false }
    ];
    function axEdLabel(raw) {
      if (raw === undefined || raw === null || raw === "") return "NOT SET";
      var k = String(raw).toLowerCase().replace(/-/g, "_").trim();
      if (k === "draft") return "DRAFT";
      if (k === "in_review" || k === "in review") return "IN REVIEW";
      if (k === "published") return "PUBLISHED";
      if (k === "archived") return "ARCHIVED";
      if (k === "needs_review" || k === "needs review") return "NEEDS REVIEW";
      return String(raw);
    }
    function axReviewEntries(store, ctx) {
      var entries = [];
      AX_REVIEW_SOURCES.forEach(function (src) {
        var list = store[src.storeKey] || [];
        if (!Array.isArray(list)) return;
        list.forEach(function (r) {
          if (!r) return;
          var needs = r.needsReview === true;
          var ver = (r.verification && typeof r.verification === "object") ? r.verification : null;
          var unver = !!(ver && ver.status === "unverified");
          if (!needs && !unver) return;
          var id = src.idOf(r, ctx);
          var flags = [];
          if (needs) flags.push({ key: "needs-review", label: "NEEDS REVIEW" });
          if (unver) flags.push({ key: "unverified", label: "UNVERIFIED" });
          entries.push({
            source: src.key, sourceLabel: src.label, route: src.route,
            id: id, name: src.nameOf(r, ctx) || String(id),
            bengali: src.bengaliOf(r, ctx) || "",
            sub: src.subOf(r, ctx) || "", sci: !!src.sci,
            statusRaw: (r.status === undefined || r.status === null) ? "" : String(r.status),
            needsReview: r.needsReview, unverified: unver,
            version: (r.version === undefined || r.version === null || r.version === "") ? "" : String(r.version),
            flags: flags,
            href: "#/" + src.route + "/" + encodeURIComponent(id),
            reviewHref: "#/review/" + src.key + "/" + encodeURIComponent(id)
          });
        });
      });
      return entries;
    }
    function axReviewSummary(entries) {
      var s = { total: 0, needs: 0, unver: 0, pubNeeds: 0, multi: 0 };
      entries.forEach(function (e) {
        s.total += e.flags.length;
        if (e.needsReview === true) s.needs++;
        if (e.unverified) s.unver++;
        if (e.needsReview === true && e.statusRaw === "published") s.pubNeeds++;
        if (e.flags.length > 1) s.multi++;
      });
      return s;
    }
    function axReviewBadge(text, kind) {
      var s = document.createElement("span");
      s.className = "rv-badge" + (kind ? " " + kind : "");
      s.textContent = text;
      return s;
    }
    function axReviewStatusCell(e) {
      var td = document.createElement("td");
      td.appendChild(axReviewBadge(axEdLabel(e.statusRaw), "rv-status"));
      if (e.statusRaw !== "" && axEdLabel(e.statusRaw) !== e.statusRaw) {
        td.appendChild(axText("span", " stored: " + e.statusRaw, "text-muted"));
      }
      return td;
    }
    function axReviewFlagsCell(e) {
      var td = document.createElement("td");
      td.appendChild(axReviewBadge(e.flags.length + (e.flags.length === 1 ? " FLAG" : " FLAGS"), "rv-count"));
      e.flags.forEach(function (f) {
        td.appendChild(document.createTextNode(" "));
        td.appendChild(axReviewBadge(f.label, "rv-flag"));
      });
      return td;
    }
    function axReviewList(entries, store, ctx) {
      var wrap = document.createElement("div");
      var head = axText("h1", "Review Queue");
      head.tabIndex = -1;
      wrap.appendChild(head);
      wrap.appendChild(axText("p", "Read-only editorial workflow foundation. Queue entries are derived live from existing record fields (needsReview, status, verification, version). Nothing is created, edited, stored, or published here.", "text-muted"));
      var s = axReviewSummary(entries);
      var grid = document.createElement("div");
      grid.className = "admin-grid review-summary";
      [["Total Review Flags", s.total], ["Needs Review", s.needs], ["Unverified", s.unver], ["Published + Needs Review", s.pubNeeds], ["Multiple Flags", s.multi]].forEach(function (pair) {
        var card = document.createElement("div");
        card.className = "card admin-card";
        var n = document.createElement("span");
        n.className = "admin-stat";
        n.textContent = String(pair[1]);
        var l = document.createElement("span");
        l.className = "admin-stat-label";
        l.textContent = pair[0];
        card.appendChild(n);
        card.appendChild(l);
        grid.appendChild(card);
      });
      wrap.appendChild(grid);
      var statusSeen = [], statusOpts = [];
      entries.forEach(function (e) {
        if (statusSeen.indexOf(e.statusRaw) === -1) {
          statusSeen.push(e.statusRaw);
          statusOpts.push({ value: e.statusRaw === "" ? "__NOTSET__" : e.statusRaw, label: axEdLabel(e.statusRaw) });
        }
      });
      var cfg = { label: "Review Queue", filters: [
        { key: "module", label: "Module", options: function () { return AX_REVIEW_SOURCES.map(function (x) { return { value: x.key, label: x.label }; }); }, test: function (r, v) { return r.source === v; } },
        { key: "flag", label: "Review Flag", options: function () { return [{ value: "needs-review", label: "Needs Review" }, { value: "unverified", label: "Unverified" }, { value: "multi", label: "Multiple Flags" }]; }, test: function (r, v) { if (v === "multi") return r.flags.length > 1; return r.flags.some(function (f) { return f.key === v; }); } },
        { key: "status", label: "Editorial Status", options: function () { return statusOpts; }, test: function (r, v) { return v === "__NOTSET__" ? r.statusRaw === "" : r.statusRaw === v; } }
      ] };
      var state = { q: "", filters: {} };
      var listBox = document.createElement("div");
      var render = function () {
        while (listBox.firstChild) listBox.removeChild(listBox.firstChild);
        var shown = axApplyFilters(cfg, entries, state, ctx).slice(0, 500);
        listBox.appendChild(axText("p", shown.length + " of " + entries.length + " queued records", "admin-count"));
        if (!shown.length) {
          listBox.appendChild(axState("No matching queue records.", ""));
          return;
        }
        var tableWrap = document.createElement("div");
        tableWrap.className = "table-wrap";
        var table = document.createElement("table");
        table.className = "admin-table";
        var thead = document.createElement("thead");
        var hr = document.createElement("tr");
        ["Module", "Record", "Scientific Name / Type", "Editorial Status", "Review Flags", "Version", "Open"].forEach(function (t) {
          var th = document.createElement("th");
          th.scope = "col";
          th.textContent = t;
          hr.appendChild(th);
        });
        thead.appendChild(hr);
        table.appendChild(thead);
        var tbody = document.createElement("tbody");
        shown.forEach(function (e) {
          var tr = document.createElement("tr");
          tr.appendChild(axText("td", e.sourceLabel));
          var tdName = document.createElement("td");
          var aName = document.createElement("a");
          aName.href = e.reviewHref;
          aName.textContent = e.name;
          tdName.appendChild(aName);
          tr.appendChild(tdName);
          var tdSub = document.createElement("td");
          if (e.sub) tdSub.appendChild(axText("span", e.sub, e.sci ? "scientific-name" : ""));
          else tdSub.appendChild(axText("span", "Not available", "admin-missing"));
          tr.appendChild(tdSub);
          tr.appendChild(axReviewStatusCell(e));
          tr.appendChild(axReviewFlagsCell(e));
          var tdVer = document.createElement("td");
          if (e.version) tdVer.appendChild(axText("span", e.version));
          else tdVer.appendChild(axText("span", "Not available", "admin-missing"));
          tr.appendChild(tdVer);
          var tdOpen = document.createElement("td");
          var aOpen = document.createElement("a");
          aOpen.href = e.reviewHref;
          aOpen.textContent = "Open Record";
          tdOpen.appendChild(aOpen);
          tr.appendChild(tdOpen);
          tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        tableWrap.appendChild(table);
        listBox.appendChild(tableWrap);
        var cards = document.createElement("div");
        cards.className = "admin-cards";
        shown.forEach(function (e) {
          var card = document.createElement("article");
          card.className = "card admin-card";
          var h = document.createElement("h3");
          var link = document.createElement("a");
          link.href = e.reviewHref;
          link.textContent = e.name;
          h.appendChild(link);
          card.appendChild(h);
          var p1 = document.createElement("p");
          p1.className = "card-text";
          p1.textContent = e.sourceLabel + (e.sub ? " — " + e.sub : "");
          card.appendChild(p1);
          var p2 = document.createElement("p");
          p2.className = "card-text";
          p2.appendChild(axReviewBadge(axEdLabel(e.statusRaw), "rv-status"));
          p2.appendChild(document.createTextNode(" "));
          p2.appendChild(axReviewBadge(e.flags.length + (e.flags.length === 1 ? " FLAG" : " FLAGS"), "rv-count"));
          card.appendChild(p2);
          cards.appendChild(card);
        });
        listBox.appendChild(cards);
      };
      wrap.appendChild(axToolbar(cfg, state, render));
      wrap.appendChild(listBox);
      render();
      var cov = document.createElement("section");
      cov.className = "admin-detail-sec";
      cov.appendChild(axText("h2", "Module coverage"));
      var ul = document.createElement("ul");
      ul.className = "admin-list";
      AX_REVIEW_SOURCES.forEach(function (src) {
        var list = store[src.storeKey] || [];
        var total = Array.isArray(list) ? list.length : 0;
        var flagged = entries.filter(function (e) { return e.source === src.key; }).length;
        var hasFields = Array.isArray(list) && list.some(function (r) { return r && (r.needsReview !== undefined || (r.verification && typeof r.verification === "object")); });
        var li = document.createElement("li");
        li.textContent = src.label + ": " + flagged + " queued of " + total + " records" + (flagged === 0 ? (hasFields ? " — no records currently flagged." : " — No review metadata available.") : ".");
        ul.appendChild(li);
      });
      cov.appendChild(ul);
      wrap.appendChild(cov);
      var wf = document.createElement("section");
      wf.className = "admin-detail-sec rv-panel";
      wf.appendChild(axText("h2", "Editorial workflow"));
      var ol = document.createElement("ol");
      ol.className = "admin-list";
      ["DRAFT — work in progress, not eligible for public display.", "IN REVIEW — submitted for editorial or scientific review.", "PUBLISHED — approved for public display under visibility rules.", "ARCHIVED — retained for history, removed from normal discovery."].forEach(function (t) {
        var li = document.createElement("li");
        li.textContent = t;
        ol.appendChild(li);
      });
      wf.appendChild(ol);
      wf.appendChild(axText("p", "NEEDS REVIEW may flag any record requiring attention. Workflow actions are not yet enabled.", "text-muted"));
      wrap.appendChild(wf);
      var vf = document.createElement("section");
      vf.className = "admin-detail-sec rv-panel";
      vf.appendChild(axText("h2", "Scientific verification"));
      vf.appendChild(axText("p", "Scientific verification is independent from editorial status. A record can be editorially published while marked unverified.", ""));
      vf.appendChild(axText("p", "UNVERIFIED → REVIEWED / VERIFIED → DISPUTED where applicable. Verification labels shown here are display-only.", "text-muted"));
      wrap.appendChild(vf);
      var rn = document.createElement("section");
      rn.className = "admin-detail-sec rv-panel";
      rn.appendChild(axText("h2", "Roles"));
      rn.appendChild(axText("p", "Documented roles: SUPER_ADMIN, EDITOR, CONTRIBUTOR, REVIEWER. Role enforcement is not yet implemented.", "text-muted"));
      wrap.appendChild(rn);
      return wrap;
    }
    function axReviewContextNode(src, recId, store, ctx) {
      if (!src) return null;
      var list = store[src.storeKey] || [];
      if (!Array.isArray(list)) return null;
      var raw = null;
      for (var i = 0; i < list.length; i++) {
        if (list[i] && String(src.idOf(list[i], ctx)) === String(recId)) { raw = list[i]; break; }
      }
      if (!raw) return null;
      var tmp = axReviewEntries(store, ctx);
      var entry = null;
      for (var j = 0; j < tmp.length; j++) {
        if (tmp[j].source === src.key && String(tmp[j].id) === String(recId)) { entry = tmp[j]; break; }
      }
      if (!entry) return null;
      var ver = (raw.verification && typeof raw.verification === "object") ? raw.verification : null;
      var wrap = document.createElement("div");
      wrap.appendChild(axBack("review", "Review Queue"));
      var head = axText("h1", entry.name);
      head.tabIndex = -1;
      wrap.appendChild(head);
      var sec = document.createElement("section");
      sec.className = "admin-detail-sec rv-panel";
      sec.appendChild(axText("h2", "Review Context"));
      var rows = [
        ["Source", entry.sourceLabel],
        ["Record", String(entry.id)],
        ["Editorial Status", axEdLabel(entry.statusRaw) + (entry.statusRaw !== "" && axEdLabel(entry.statusRaw) !== entry.statusRaw ? " (stored: " + entry.statusRaw + ")" : "")],
        ["Version", entry.version || "Not available"],
        ["Scientific Verification", ver ? (ver.status ? String(ver.status).toUpperCase() : "Not available") : "Not available"],
        ["Verified By", (ver && ver.verifiedBy) ? ver.verifiedBy : "Not available"],
        ["Verified At", (ver && ver.verifiedAt) ? ver.verifiedAt : "Not available"],
        ["Confidence", (ver && ver.confidenceLevel) ? String(ver.confidenceLevel).charAt(0).toUpperCase() + String(ver.confidenceLevel).slice(1) : "Not available"]
      ];
      rows.forEach(function (pair) {
        var h = axText("h3", pair[0]);
        sec.appendChild(h);
        if (pair[0] === "Editorial Status") {
          var p = document.createElement("p");
          p.appendChild(axReviewBadge(axEdLabel(entry.statusRaw), "rv-status"));
          if (entry.statusRaw !== "" && axEdLabel(entry.statusRaw) !== entry.statusRaw) {
            p.appendChild(axText("span", " stored: " + entry.statusRaw, "text-muted"));
          }
          sec.appendChild(p);
        } else {
          sec.appendChild(axText("p", pair[1]));
        }
      });
      var fh = axText("h3", "Flags");
      sec.appendChild(fh);
      var fp = document.createElement("p");
      entry.flags.forEach(function (f, k) {
        if (k) fp.appendChild(document.createTextNode(" "));
        fp.appendChild(axReviewBadge(f.label, "rv-flag"));
      });
      sec.appendChild(fp);
      wrap.appendChild(sec);
      var open = document.createElement("p");
      var aOpen = document.createElement("a");
      aOpen.className = "btn";
      aOpen.href = entry.href;
      aOpen.textContent = "Open Source Record";
      open.appendChild(aOpen);
      open.appendChild(axText("span", " Opens the existing read-only record view. No second copy is created.", "text-muted"));
      wrap.appendChild(open);
      return wrap;
    }
    var AX_MANIFEST = [
      { key: "species", url: "data/species/index.json" },
      { key: "taxa", url: "data/taxonomy/taxa.json" },
      { key: "fish", url: "data/fish/orders.json" },
      { key: "marine", url: "data/marine-life/index.json" },
      { key: "bdspecies", url: "data/bangladesh/species.json" },
      { key: "bdclass", url: "data/bangladesh/classification.json" },
      { key: "projects", url: "data/projects.json" },
      { key: "thesis", url: "data/thesis.json" },
      { key: "news", url: "data/news.json" },
      { key: "blog", url: "data/blog.json" },
      { key: "authors", url: "data/authors.json" },
      { key: "categories", url: "data/categories.json" },
      { key: "media", url: "data/images.json" },
      { key: "publications", url: "data/publications.json" },
      { key: "references", url: "data/references/index.json" },
      { key: "institutions", url: "data/institutions/index.json" }
    ];
    function axLoadAll() {
      if (AX._loading) return AX._loading;
      AX._loading = Promise.all(AX_MANIFEST.map(function (m) {
        return axFetch(m.url).then(function (d) { return { key: m.key, data: d }; });
      })).then(function (parts) {
        var store = {};
        parts.forEach(function (p) { store[p.key] = p.data; });
        axBuildIndex(store);
        return store;
      });
      return AX._loading;
    }
    function renderAdminRoute(scroll) {
      var hash = window.location.hash || "#/dashboard";
      var m = hash.match(/^#\/([a-z-]+)(?:\/(.+))?$/);
      var route = (m && AX_ROUTES[m[1]]) ? m[1] : "dashboard";
      var id = (m && m[2]) ? decodeURIComponent(m[2]) : null;
      axSetActive(route);
      document.body.classList.remove("admin-nav-open");
      var toggle = document.querySelector(".admin-menu-toggle");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
      document.title = (route === "dashboard" ? "BiotaElite Admin — Dashboard" : "BiotaElite Admin — " + AX_ROUTES[route].label);
      if (route === "dashboard") {
        axShowDashboard(true);
        if (scroll) window.scrollTo(0, 0);
        return;
      }
      axShowDashboard(false);
      while (adminView.firstChild) adminView.removeChild(adminView.firstChild);
      adminView.appendChild(axState("Loading…", ""));
      axLoadAll().then(function (store) {
        while (adminView.firstChild) adminView.removeChild(adminView.firstChild);
        var cfg = AX_ROUTES[route];
        cfg.route = route;
        var ctx = axCtxFor(store);
        if (route === "fish") {
          var nodes = store.fish;
          if (!Array.isArray(nodes)) { adminView.appendChild(axState("Fish data could not be loaded.", "admin-state-error")); return; }
          var nodeById = {};
          nodes.forEach(function (n) { if (n && n.id) nodeById[n.id] = n; });
          if (id) {
            var node = nodeById[id];
            if (!node) {
              adminView.appendChild(axBack("fish", "Fish"));
              adminView.appendChild(axState("Fish record not found: " + id, "admin-state-error"));
            } else {
              adminView.appendChild(axFishDetail(node, nodeById));
            }
          } else {
            adminView.appendChild(axFishTree(nodes, nodeById, { q: "" }));
          }
          if (scroll !== false) finalizeAdminRoute();
          return;
        }
        if (route === "review") {
          axShowDashboard(false);
          while (adminView.firstChild) adminView.removeChild(adminView.firstChild);
          adminView.appendChild(axState("Loading…", ""));
          axLoadAll().then(function (store) {
            while (adminView.firstChild) adminView.removeChild(adminView.firstChild);
            var ctx = axCtxFor(store);
            if (id) {
              var parts = String(id).split("/");
              var srcKey = parts[0];
              var recId = parts.slice(1).join("/");
              var rsrc = null;
              AX_REVIEW_SOURCES.forEach(function (x) { if (x.key === srcKey) rsrc = x; });
              var rnode = axReviewContextNode(rsrc, recId, store, ctx);
              if (!rnode) {
                adminView.appendChild(axBack("review", "Review Queue"));
                adminView.appendChild(axState("Review record not found: " + id, "admin-state-error"));
              } else {
                adminView.appendChild(rnode);
              }
            } else {
              adminView.appendChild(axReviewList(axReviewEntries(store, ctx), store, ctx));
            }
            if (scroll !== false) finalizeAdminRoute();
          });
          return;
        }
        var records = cfg.rows(store[AX_STORE[route]] || []);
        if (!Array.isArray(records)) { adminView.appendChild(axState("Data could not be loaded.", "admin-state-error")); return; }
        if (route === "taxonomy") {
          records.forEach(function (t) {
            var d = axDepth(t, ctx.taxaById);
            t._depthPad = new Array(d + 1).join("— ");
          });
        }
        if (id) {
          var found = axFind(cfg, records, id);
          if (!found) {
            adminView.appendChild(axBack(route, cfg.label));
            adminView.appendChild(axState("Record not found: " + id, "admin-state-error"));
          } else {
            adminView.appendChild(axDetailView(cfg, found, ctx));
          }
        } else if (!records.length) {
          var wrap = document.createElement("div");
          var head = axText("h1", cfg.label);
          head.tabIndex = -1;
          wrap.appendChild(head);
          wrap.appendChild(axText("p", cfg.desc, "text-muted"));
          wrap.appendChild(axState(cfg.empty || "No records are currently available.", ""));
          adminView.appendChild(wrap);
        } else {
          adminView.appendChild(axListView(cfg, records, { q: "", filters: {} }, ctx));
        }
        if (scroll !== false) finalizeAdminRoute();
      });
    }
    function finalizeAdminRoute() {
      window.scrollTo(0, 0);
      var h = adminView.querySelector("h1");
      if (h) { try { h.focus({ preventScroll: true }); } catch (e) {} }
    }
    if (window.addEventListener) window.addEventListener("hashchange", function () { renderAdminRoute(true); });
    renderAdminRoute(false);
  }

  /* ---------- Back to top ---------- */
  var backTop = document.querySelector(".back-top");
  if (backTop) {
    window.addEventListener("scroll", function () {
      backTop.classList.toggle("show", window.scrollY > 400);
    });
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll("[data-count]");
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var dur = 1200;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.round(target * p);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window && counters.length) {
    var cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent = el.getAttribute("data-count");
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Species Details ---------- */
  var detailsRoot = document.querySelector("[data-species-details]");
  if (detailsRoot) {
    var detailsLoading = detailsRoot.querySelector("[data-details-loading]");
    var detailsError = detailsRoot.querySelector("[data-details-error]");
    var detailsNotFound = detailsRoot.querySelector("[data-details-not-found]");
    var detailsContent = detailsRoot.querySelector("[data-details-content]");
    var detailParams = new URLSearchParams(window.location.search);
    var detailId = detailParams.get("id");
    var detailTaxa = {};

    function detailText(value) {
      return value === undefined || value === null ? "" : String(value);
    }

    function detailAppend(parent, tag, text, className) {
      var node = document.createElement(tag);
      if (className) node.className = className;
      node.textContent = detailText(text);
      parent.appendChild(node);
      return node;
    }

    function detailSection(title, bn, content, className) {
      if (!content) return null;
      var section = document.createElement("section");
      section.className = "details-section" + (className ? " " + className : "");
      var heading = document.createElement("h2");
      heading.appendChild(document.createTextNode(title));
      var subtitle = document.createElement("span");
      subtitle.className = "bilingual-heading-bn";
      subtitle.textContent = bn;
      heading.appendChild(subtitle);
      section.appendChild(heading);
      section.appendChild(content);
      detailsContent.appendChild(section);
      return section;
    }

    function detailParagraph(text) {
      return text ? detailAppend(document.createElement("div"), "p", text, "details-copy") : null;
    }

    function detailList(values) {
      if (!Array.isArray(values) || !values.length) return null;
      var list = document.createElement("ul");
      list.className = "details-list";
      values.forEach(function (value) { if (value) detailAppend(list, "li", value); });
      return list;
    }

    function hasDetailValue(value) {
      if (value === undefined || value === null || value === "") return false;
      if (Array.isArray(value)) return value.some(function (entry) { return entry !== undefined && entry !== null && entry !== ""; });
      if (typeof value === "object") return Object.keys(value).some(function (key) { return hasDetailValue(value[key]); });
      return true;
    }

    function detailRange(range) {
      if (!range) return "";
      return [range.min, range.max, range.unit].filter(function (part) { return part !== undefined && part !== null && part !== ""; }).join("–");
    }

    function detailLinkGrid(rows) {
      var valid = (rows || []).filter(function (row) { return row && row.href && row.text; });
      if (!valid.length) return null;
      var grid = document.createElement("dl");
      grid.className = "details-grid";
      valid.forEach(function (row) {
        var block = document.createElement("div");
        block.className = "details-item";
        detailAppend(block, "dt", row.label);
        var dd = document.createElement("dd");
        var link = document.createElement("a");
        link.href = row.href;
        link.textContent = row.text;
        if (/^https?:/i.test(row.href)) link.rel = "noopener noreferrer";
        dd.appendChild(link);
        block.appendChild(dd);
        grid.appendChild(block);
      });
      return grid;
    }

    function detailGrid(items) {
      var valid = items.filter(function (item) { return hasDetailValue(item.value); });
      if (!valid.length) return null;
      var grid = document.createElement("dl");
      grid.className = "details-grid";
      valid.forEach(function (item) {
        var block = document.createElement("div");
        block.className = "details-item";
        detailAppend(block, "dt", item.label);
        detailAppend(block, "dd", Array.isArray(item.value) ? item.value.join(", ") : item.value);
        grid.appendChild(block);
      });
      return grid;
    }

    function detailTaxonomy(record) {
      var map = [
        ["Kingdom", "kingdomId"], ["Phylum", "phylumId"], ["Class", "classId"],
        ["Order", "orderId"], ["Family", "familyId"], ["Genus", "genusId"],
        ["Species", "speciesId"], ["Subspecies", "subspeciesId"]
      ];
      var grid = document.createElement("div");
      grid.className = "details-taxonomy";
      map.forEach(function (entry) {
        var id = record.taxonomy && record.taxonomy[entry[1]];
        var taxon = id && detailTaxa[id];
        if (!id || !taxon) return;
        var row = document.createElement("div");
        row.className = "details-taxon";
        detailAppend(row, "strong", entry[0]);
        var link = document.createElement("a");
        link.href = "taxon.html?id=" + encodeURIComponent(id);
        link.textContent = taxon.name;
        link.title = taxon.bengaliName || taxon.name;
        row.appendChild(link);
        grid.appendChild(row);
      });
      return grid.children.length ? grid : null;
    }

    function detailReferences(references) {
      if (!Array.isArray(references) || !references.length) return null;
      var wrapper = document.createElement("div");
      references.forEach(function (reference) {
        var item = document.createElement("div");
        item.className = "details-reference";
        detailAppend(item, "strong", reference.title || "Reference title unavailable");
        var metadata = [reference.authors && reference.authors.join(", "), reference.year, reference.journal, reference.type].filter(Boolean).join(" · ");
        if (metadata) detailAppend(item, "div", metadata);
        if (reference.doi || reference.url) {
          var link = document.createElement("a");
          link.href = reference.doi ? "https://doi.org/" + encodeURIComponent(reference.doi) : reference.url;
          link.textContent = reference.doi || reference.url;
          link.rel = "noopener noreferrer";
          item.appendChild(link);
        }
        wrapper.appendChild(item);
      });
      return wrapper;
    }

    function detailExtension(title, bn, record, fields) {
      if (!record) return;
      var content = document.createElement("div");
      content.className = "details-extension";
      var grid = detailGrid(fields(record));
      if (grid) content.appendChild(grid);
      if (record.notes) detailAppend(content, "p", record.notes, "details-copy");
      if (content.children.length) detailSection(title, bn, content);
    }

    function detailMedia(record, media) {
      var candidates = Array.isArray(record.images) ? record.images.slice() : [];
      candidates = candidates.map(function (image) { return image && image.id && media[image.id] ? Object.assign({}, media[image.id], image) : image; });
      return candidates.find(function (image) {
        return image && (image.localPath || image.url) && image.sourceUrl && image.credit && image.license && String(image.license).toLowerCase() !== "unknown";
      }) || null;
    }

    function speciesLinkList(ids, speciesIndex) {
      if (!Array.isArray(ids) || !ids.length) return null;
      var list = document.createElement("ul");
      list.className = "details-list";
      ids.forEach(function (sid) {
        var item = document.createElement("li");
        var target = speciesIndex[sid];
        if (target) {
          var link = document.createElement("a");
          link.href = "species.html?id=" + encodeURIComponent(sid);
          link.textContent = target.commonName ? target.commonName + " — " + target.scientificName : sid;
          link.className = "scientific-name";
          item.appendChild(link);
        } else {
          item.textContent = sid;
        }
        list.appendChild(item);
      });
      return list;
    }

    function similarSpeciesList(items, speciesIndex) {
      if (!Array.isArray(items) || !items.length) return null;
      var list = document.createElement("ul");
      list.className = "details-list";
      items.forEach(function (entry) {
        var item = document.createElement("li");
        var target = entry && entry.speciesId ? speciesIndex[entry.speciesId] : null;
        var label = entry ? [entry.name, entry.note].filter(Boolean).join(" — ") : "";
        if (target && entry && entry.speciesId) {
          var link = document.createElement("a");
          link.href = "species.html?id=" + encodeURIComponent(entry.speciesId);
          link.textContent = label || target.scientificName;
          item.appendChild(link);
        } else {
          item.textContent = label;
        }
        list.appendChild(item);
      });
      return list;
    }

    function renderDetails(record, extensions, media, speciesById) {
      detailsLoading.hidden = true;
      detailsContent.hidden = false;
      var speciesIndex = speciesById || {};
      var image = detailMedia(record, media);
      var hero = document.createElement("div");
      hero.className = "details-hero";
      var intro = document.createElement("div");
      intro.className = "details-intro";
      detailAppend(intro, "span", "Species Record / প্রজাতি রেকর্ড", "eyebrow");
      detailAppend(intro, "h1", record.commonName || "Species");
      if (record.bengaliName) detailAppend(intro, "p", record.bengaliName, "details-bengali");
      var scientific = detailAppend(intro, "p", record.scientificName || "Scientific name unavailable", "details-scientific scientific-name");
      if (record.scientificNameAuthor || record.scientificNameYear) detailAppend(intro, "p", [record.scientificNameAuthor, record.scientificNameYear].filter(Boolean).join(", "), "details-meta");
      var statuses = document.createElement("div");
      statuses.className = "details-statuses";
      detailAppend(statuses, "span", record.needsReview ? "Needs Scientific Review / বৈজ্ঞানিক পর্যালোচনা প্রয়োজন" : "Verified / যাচাইকৃত", "badge " + (record.needsReview ? "badge-needs-review" : "badge-verified"));
      if (record.status) detailAppend(statuses, "span", "Editorial: " + record.status, "badge badge-published");
      if (record.conservation && record.conservation.conservationStatus) detailAppend(statuses, "span", "Global: " + record.conservation.conservationStatus, "badge badge-archived");
      intro.appendChild(statuses);
      hero.appendChild(intro);
      var mediaBox = document.createElement("div");
      mediaBox.className = "details-media";
      if (image) {
        var imageNode = document.createElement("img");
        imageNode.className = "media-main";
        imageNode.src = image.localPath || image.url;
        imageNode.alt = image.alt || record.commonName || "Species image";
        mediaBox.appendChild(imageNode);
        if (image.caption || image.credit) detailAppend(mediaBox, "p", [image.caption, image.credit].filter(Boolean).join(" — "), "media-caption");
      } else {
        var placeholder = document.createElement("div");
        detailAppend(placeholder, "div", "—", "details-placeholder-mark");
        detailAppend(placeholder, "div", "No approved image / অনুমোদিত ছবি নেই");
        mediaBox.appendChild(placeholder);
      }
      hero.appendChild(mediaBox);
      detailsContent.appendChild(hero);

      var overview = record.description || (record.biology && record.biology.physicalDescription);
      detailSection("Overview", "সংক্ষিপ্ত বিবরণ", detailParagraph(overview));
      detailSection("Identity", "পরিচিতি", detailGrid([
        { label: "URL slug / স্লাগ", value: record.slug },
        { label: "Author / নামকরণকারী", value: record.scientificNameAuthor },
        { label: "Year / সাল", value: record.scientificNameYear }
      ]));
      detailSection("Taxonomy", "শ্রেণিবিন্যাস", detailTaxonomy(record));
      var identification = record.identification;
      if (identification) {
        var identificationContent = document.createElement("div");
        var idGrid = detailGrid([
          { label: "Diagnostic characteristics / শনাক্ত বৈশিষ্ট্য", value: identification.diagnosticCharacteristics },
          { label: "Distinguishing features / পার্থক্যসূচক বৈশিষ্ট্য", value: identification.distinguishingFeatures },
          { label: "Notes / নোট", value: identification.notes }
        ]);
        if (idGrid) identificationContent.appendChild(idGrid);
        var keyFeatures = detailList(identification.keyFeatures);
        if (keyFeatures) { detailAppend(identificationContent, "h3", "Key features / প্রধান বৈশিষ্ট্য"); identificationContent.appendChild(keyFeatures); }
        var similarList = similarSpeciesList(identification.similarSpecies, speciesIndex);
        if (similarList) { detailAppend(identificationContent, "h3", "Similar species / অনুরূপ প্রজাতি"); identificationContent.appendChild(similarList); }
        if (identificationContent.children.length) detailSection("Identification", "শনাক্তকরণ", identificationContent);
      }
      var biology = record.biology || {};
      detailSection("Physical Description", "দৈহিক বর্ণনা", detailGrid([
        { label: "Description / বর্ণনা", value: biology.physicalDescription },
        { label: "Size / আকার", value: detailRange(biology.size) },
        { label: "Weight / ওজন", value: detailRange(biology.weight) },
        { label: "Lifespan / জীবনকাল", value: detailRange(biology.lifespan) },
        { label: "Anatomy / অঙ্গসংস্থান", value: biology.anatomy || biology.morphology },
        { label: "Physiology / শারীরবৃত্ত", value: biology.physiology }
      ]));
      detailSection("Behaviour and Reproduction", "আচরণ ও প্রজনন", detailGrid([
        { label: "Behaviour / আচরণ", value: biology.behaviour }, { label: "Communication / যোগাযোগ", value: biology.communication },
        { label: "Reproduction / প্রজনন", value: biology.reproduction }, { label: "Life cycle / জীবনচক্র", value: biology.lifeCycle }
      ]));
      var ecology = record.ecology || {};
      var geo = ecology.geographicDistribution || {};
      var habitatContent = document.createElement("div");
      var habitatGrid = detailGrid([
        { label: "Environment / পরিবেশ", value: ecology.environment },
        { label: "Habitat / আবাসস্থল", value: ecology.habitat },
        { label: "Regions / অঞ্চল", value: geo.regions },
        { label: "Countries / দেশ", value: geo.countries },
        { label: "Elevation / উচ্চতা", value: detailRange(geo.elevationRange) },
        { label: "Depth / গভীরতা", value: detailRange(geo.depthRange) },
        { label: "Biome / বায়োম", value: geo.biome }
      ]);
      if (habitatGrid) habitatContent.appendChild(habitatGrid);
      var rangeLinks = detailLinkGrid([{ label: "Range map / বিস্তৃতি মানচিত্র", href: geo.rangeMapUrl, text: geo.rangeMapUrl }]);
      if (rangeLinks) habitatContent.appendChild(rangeLinks);
      if (habitatContent.children.length) detailSection("Habitat & Distribution", "আবাসস্থল ও বিস্তৃতি", habitatContent);
      detailSection("Diet & Feeding", "খাদ্য ও খাদ্যগ্রহণ", detailGrid([
        { label: "Diet / খাদ্যাভ্যাস", value: ecology.diet }, { label: "Feeding behaviour / খাদ্যগ্রহণ", value: ecology.feedingBehaviour }
      ]));
      var ecologyContent = document.createElement("div");
      var ecologyGrid = detailGrid([
        { label: "Ecological role / প্রতিবেশগত ভূমিকা", value: ecology.ecologicalRole },
        { label: "Symbiotic relationships / মিথোজীবিতা", value: ecology.symbioticRelationships },
        { label: "Ecosystem services / বাস্তুতন্ত্র সেবা", value: ecology.ecosystemServices }
      ]);
      if (ecologyGrid) ecologyContent.appendChild(ecologyGrid);
      var predatorList = speciesLinkList(ecology.predators, speciesIndex);
      if (predatorList) { detailAppend(ecologyContent, "h3", "Predators / শিকারি"); ecologyContent.appendChild(predatorList); }
      var preyList = speciesLinkList(ecology.prey, speciesIndex);
      if (preyList) { detailAppend(ecologyContent, "h3", "Prey / শিকার"); ecologyContent.appendChild(preyList); }
      if (ecologyContent.children.length) detailSection("Ecology", "প্রতিবেশ", ecologyContent);
      var adaptations = detailList(ecology.adaptations);
      if (adaptations) detailSection("Adaptations", "অভিযোজন", adaptations);
      var conservation = record.conservation || {};
      var conservationContent = document.createElement("div");
      var conservationGrid = detailGrid([
        { label: "Global status / বৈশ্বিক অবস্থা", value: conservation.conservationStatus }, { label: "Population trend / জনসংখ্যার প্রবণতা", value: conservation.populationTrend },
        { label: "Population size / জনসংখ্যা", value: conservation.populationSize },
        { label: "Threats / হুমকি", value: conservation.majorThreats }, { label: "Measures / সংরক্ষণ ব্যবস্থা", value: conservation.conservationMeasures },
        { label: "Assessment date / মূল্যায়নের তারিখ", value: conservation.assessmentDate }, { label: "Assessor / মূল্যায়নকারী", value: conservation.assessor },
        { label: "IUCN criteria / মানদণ্ড", value: conservation.iucnCriteria }, { label: "CITES appendix / সাইটিস", value: conservation.citesAppendix },
        { label: "Legal protection / আইনি সুরক্ষা", value: conservation.legalProtection }
      ]);
      if (conservationGrid) conservationContent.appendChild(conservationGrid);
      var conservationLinks = detailLinkGrid([{ label: "Red List entry / রেড লিস্ট", href: conservation.redListUrl, text: conservation.redListUrl }]);
      if (conservationLinks) conservationContent.appendChild(conservationLinks);
      if (conservationContent.children.length) detailSection("Global Conservation", "বৈশ্বিক সংরক্ষণ", conservationContent);
      var importance = record.importance || {};
      detailSection("Importance", "গুরুত্ব", detailGrid(Object.keys(importance).map(function (key) { return { label: key, value: importance[key] }; })));
      detailExtension("Fish Extension", "মাছের সম্প্রসারণ", extensions.fish, function (value) { return [{ label: "Environment / পরিবেশ", value: value.environment }, { label: "Aquatic habitat / জলজ আবাস", value: value.aquaticHabitat }, { label: "Feeding type / খাদ্যাভ্যাস", value: value.feedingType }, { label: "Reproduction / প্রজনন", value: value.reproduction }, { label: "Migration / পরিযান", value: value.migration && value.migration.pattern }, { label: "Fisheries importance / মৎস্য গুরুত্ব", value: value.fisheriesImportance }]; });
      detailExtension("Marine Life Extension", "সামুদ্রিক জীবন সম্প্রসারণ", extensions.marine, function (value) { return [{ label: "Category / শ্রেণি", value: value.marineCategory }, { label: "Zone / অঞ্চল", value: value.zone }, { label: "Substrate / তলদেশ", value: value.substrate }, { label: "Depth / গভীরতা", value: detailRange(value.depthRange) }, { label: "Threats / হুমকি", value: value.majorThreats }, { label: "Actions / ব্যবস্থা", value: value.conservationActions }]; });
      if (extensions.bangladesh) {
        var bd = extensions.bangladesh;
        detailExtension("Bangladesh Regional Record", "বাংলাদেশের আঞ্চলিক রেকর্ড", bd, function (value) { return [{ label: "Presence / উপস্থিতি", value: value.presenceStatus }, { label: "Regions / অঞ্চল", value: value.regions }, { label: "Habitats / আবাসস্থল", value: value.habitats }, { label: "Local names / স্থানীয় নাম", value: value.localNames && value.localNames.map(function (item) { return item.name; }) }, { label: "Regional status / আঞ্চলিক অবস্থা", value: value.regionalConservationStatus }, { label: "Threats / হুমকি", value: value.regionalThreats }, { label: "Notes / নোট", value: value.notes }]; });
      }
      detailSection("References", "তথ্যসূত্র", detailReferences(record.references));
      if (record.legacyCard) {
        var legacy = record.legacyCard;
        var legacyContent = document.createElement("div");
        var legacyBadge = document.createElement("span");
        legacyBadge.className = "badge badge-needs-review";
        legacyBadge.textContent = "Legacy educational content / পুরোনো শিক্ষামূলক বিষয়বস্তু — not authoritative";
        legacyContent.appendChild(legacyBadge);
        var legacyGrid = detailGrid([
          { label: "Card text / কার্ড", value: legacy.cardText },
          { label: "Category / শ্রেণি", value: legacy.dataCategory || legacy.tag },
          { label: "Legacy label / পুরোনো লেবেল", value: legacy.statusLabel },
          { label: "Source / উৎস", value: legacy.source }
        ]);
        if (legacyGrid) legacyContent.appendChild(legacyGrid);
        var legacyWarning = detailParagraph(legacy.statusLabelWarning);
        if (legacyWarning) legacyContent.appendChild(legacyWarning);
        var legacyNameWarning = detailParagraph(legacy.nameWarning);
        if (legacyNameWarning) legacyContent.appendChild(legacyNameWarning);
        detailSection("Legacy Card", "পুরোনো কার্ড", legacyContent);
      }
      if (record.notes) detailSection("Notes", "নোট", detailParagraph(record.notes));
      var verification = record.verification || {};
      detailSection("Verification", "যাচাই", detailGrid([
        { label: "Review required / পর্যালোচনা প্রয়োজন", value: record.needsReview ? "Yes / হ্যাঁ — not yet scientifically verified" : "No / না" },
        { label: "Verification state / যাচাই অবস্থা", value: verification.status },
        { label: "Confidence / আস্থা", value: verification.confidenceLevel },
        { label: "Verified by / যাচাইকারী", value: verification.verifiedBy },
        { label: "Verified at / যাচাইয়ের তারিখ", value: verification.verifiedAt || record.lastVerifiedAt },
        { label: "Review notes / পর্যালোচনা নোট", value: verification.reviewNotes }
      ]));
    }

    Promise.all([
      fetch("data/species/index.json").then(function (response) { if (!response.ok) throw new Error(); return response.json(); }),
      fetch("data/taxonomy/taxa.json").then(function (response) { if (!response.ok) throw new Error(); return response.json(); }),
      fetch("data/fish/index.json").then(function (response) { if (!response.ok) throw new Error(); return response.json(); }),
      fetch("data/marine-life/index.json").then(function (response) { if (!response.ok) throw new Error(); return response.json(); }),
      fetch("data/bangladesh/species.json").then(function (response) { if (!response.ok) throw new Error(); return response.json(); }),
      fetch("data/images.json").then(function (response) { if (!response.ok) throw new Error(); return response.json(); })
    ]).then(function (data) {
      (data[1] || []).forEach(function (taxon) { detailTaxa[taxon.id] = taxon; });
      var speciesById = {};
      (data[0] || []).forEach(function (item) { if (item && item.id) speciesById[item.id] = item; });
      var record = (data[0] || []).find(function (item) { return item.id === detailId; });
      if (!record || !detailId) { detailsLoading.hidden = true; detailsNotFound.hidden = false; return; }
      var extensions = {
        fish: (data[2] || []).find(function (item) { return item.speciesId === record.id; }),
        marine: (data[3] || []).find(function (item) { return item.speciesId === record.id; }),
        bangladesh: (data[4] || []).find(function (item) { return item.speciesId === record.id; })
      };
      document.title = (record.commonName || record.scientificName || "Species Details") + " — BiotaElite";
      var description = document.querySelector('meta[name="description"]');
      if (description) description.setAttribute("content", [record.commonName, record.scientificName].filter(Boolean).join(" — ") + " species details.");
      renderDetails(record, extensions, (data[5] || []).reduce(function (map, image) { map[image.id] = image; return map; }, {}), speciesById);
    }).catch(function () { detailsLoading.hidden = true; detailsError.hidden = false; });
  }

  /* ---------- Taxonomy Explorer ---------- */
  var taxonomyExplorer = document.querySelector("[data-taxonomy-explorer]");
  var taxonDetails = document.querySelector("[data-taxon-details]");
  if (taxonomyExplorer || taxonDetails) {
    var taxonomyMap = {};
    var taxonomyRecords = [];
    var taxonomySpecies = [];
    var taxonomyMediaById = {};
    function taxonomyApprovedImage(record) {
      var candidates = [];
      if (record && Array.isArray(record.images)) candidates = candidates.concat(record.images);
      candidates = candidates.map(function (image) {
        return image && image.id && taxonomyMediaById[image.id] ? Object.assign({}, taxonomyMediaById[image.id], image) : image;
      });
      return candidates.find(function (image) {
        if (!image || !image.localPath || !image.sourceUrl || !image.credit) return false;
        return image.license && String(image.license).toLowerCase() !== "unknown";
      }) || null;
    }

    function taxonomyLabel(taxon) {
      return taxon.name + (taxon.bengaliName ? " / " + taxon.bengaliName : "");
    }

    function taxonomyHeading(parent, tag, english, bangla) {
      var heading = document.createElement(tag);
      heading.appendChild(document.createTextNode(english));
      var subtitle = document.createElement("span");
      subtitle.className = "bilingual-heading-bn";
      subtitle.textContent = bangla;
      heading.appendChild(subtitle);
      parent.appendChild(heading);
      return heading;
    }

    function taxonomyAppend(parent, tag, text, className) {
      var node = document.createElement(tag);
      if (className) node.className = className;
      node.textContent = text;
      parent.appendChild(node);
      return node;
    }

    function speciesForTaxon(taxonId) {
      return taxonomySpecies.filter(function (species) {
        return species.taxonomy && Object.keys(species.taxonomy).some(function (key) {
          return species.taxonomy[key] === taxonId;
        });
      });
    }

    function childTaxa(taxonId) {
      return taxonomyRecords.filter(function (taxon) { return taxon.parentId === taxonId; });
    }

    function taxonomyChain(taxonId) {
      var chain = [];
      var current = taxonomyMap[taxonId];
      while (current) {
        chain.unshift(current);
        current = current.parentId ? taxonomyMap[current.parentId] : null;
      }
      return chain;
    }

    function appendTaxonLink(parent, taxon, route) {
      var link = document.createElement("a");
      link.href = route + "?id=" + encodeURIComponent(taxon.id);
      link.textContent = taxonomyLabel(taxon);
      parent.appendChild(link);
      return link;
    }

    var TAXONOMY_SPECIES_BATCH = 12;
    function taxonomyDescendantIds(id) {
      var out = [id];
      var queue = [id];
      while (queue.length) {
        var cur = queue.pop();
        taxonomyRecords.forEach(function (t) {
          if (t.parentId === cur && out.indexOf(t.id) === -1) { out.push(t.id); queue.push(t.id); }
        });
      }
      return out;
    }
    function taxonomySpeciesIn(ids) {
      var set = {};
      ids.forEach(function (id) { set[id] = true; });
      return taxonomySpecies.filter(function (s) {
        if (!s.taxonomy) return false;
        return Object.keys(s.taxonomy).some(function (k) { return set[s.taxonomy[k]]; });
      }).slice().sort(function (a, b) { return String(a.commonName || "").localeCompare(String(b.commonName || "")); });
    }
    function taxonomyNavCard(taxon) {
      var card = document.createElement("article");
      card.className = "taxonomy-card taxonomy-nav-card";
      var rank = document.createElement("span");
      rank.className = "badge badge-published taxonomy-rank";
      rank.textContent = taxon.rank;
      card.appendChild(rank);
      var title = document.createElement("h3");
      var link = document.createElement("a");
      link.href = "phyla.html?taxon=" + encodeURIComponent(taxon.id);
      link.textContent = taxon.name;
      title.appendChild(link);
      card.appendChild(title);
      if (taxon.bengaliName) taxonomyAppend(card, "p", taxon.bengaliName, "taxonomy-nav-bn");
      if (taxon.description) taxonomyAppend(card, "p", taxon.description, "taxonomy-nav-desc");
      var kids = childTaxa(taxon.id).length;
      var spp = taxonomySpeciesIn(taxonomyDescendantIds(taxon.id)).length;
      taxonomyAppend(card, "p", kids + (kids === 1 ? " child taxon" : " child taxa") + " · " + spp + (spp === 1 ? " species" : " species"), "taxonomy-nav-meta");
      var open = document.createElement("a");
      open.className = "btn btn-outline";
      open.href = "phyla.html?taxon=" + encodeURIComponent(taxon.id);
      open.textContent = "Explore / অন্বেষণ →";
      card.appendChild(open);
      return card;
    }
    function taxonomyApprovedCard(record) {
      var detailUrl = "species.html?id=" + encodeURIComponent(record.id);
      var card = document.createElement("article");
      card.className = "card species-card";
      var image = taxonomyApprovedImage(record);
      if (image) {
        var imageElement = document.createElement("img");
        imageElement.className = "card-media media-main";
        imageElement.src = image.localPath || image.url;
        imageElement.alt = image.alt || record.commonName || "Species image";
        imageElement.loading = "lazy";
        imageElement.decoding = "async";
        card.appendChild(imageElement);
      } else {
        var placeholder = document.createElement("div");
        placeholder.className = "card-media species-placeholder";
        placeholder.setAttribute("role", "img");
        placeholder.setAttribute("aria-label", "Image unavailable / ছবি অনুপলব্ধ");
        var glyph = document.createElement("span");
        glyph.className = "species-placeholder-mark";
        glyph.setAttribute("aria-hidden", "true");
        glyph.innerHTML = "<svg viewBox=\"0 0 24 24\" width=\"40\" height=\"40\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" aria-hidden=\"true\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"/><circle cx=\"9\" cy=\"10\" r=\"1.8\"/><path d=\"M3 17l5-4 4 3 4-4 5 5\"/></svg>";
        placeholder.appendChild(glyph);
        taxonomyAppend(placeholder, "span", "Image unavailable / ছবি অনুপলব্ধ", "species-placeholder-text");
        card.appendChild(placeholder);
      }
      var body = document.createElement("div");
      body.className = "card-body";
      var meta = document.createElement("div");
      meta.className = "card-meta";
      var grp = (record.taxonomy && (taxonomyMap[record.taxonomy.orderId] || taxonomyMap[record.taxonomy.classId]));
      if (grp) taxonomyAppend(meta, "span", grp.name, "tag");
      if (record.conservation && record.conservation.conservationStatus) taxonomyAppend(meta, "span", record.conservation.conservationStatus, "tag amber");
      body.appendChild(meta);
      var heading = taxonomyAppend(body, "h3", "");
      var titleLink = document.createElement("a");
      titleLink.href = detailUrl;
      titleLink.textContent = record.commonName || "Unnamed species";
      heading.appendChild(titleLink);
      if (record.bengaliName) taxonomyAppend(body, "p", record.bengaliName, "species-bengali");
      taxonomyAppend(body, "p", record.scientificName || "Scientific name unavailable", "scientific-name");
      var actions = document.createElement("div");
      actions.className = "species-actions";
      var details = document.createElement("a");
      details.className = "btn btn-outline";
      details.href = detailUrl;
      details.setAttribute("aria-label", "View Details: " + (record.commonName || record.scientificName || record.id));
      details.textContent = "View Details / বিস্তারিত দেখুন →";
      actions.appendChild(details);
      body.appendChild(actions);
      card.appendChild(body);
      return card;
    }
    function taxonomySpeciesSection(list) {
      var sec = document.createElement("section");
      sec.className = "taxonomy-species-sec";
      var head = document.createElement("h3");
      head.textContent = "Species / Examples / প্রজাতি ও উদাহরণ (" + list.length + ")";
      sec.appendChild(head);
      if (!list.length) {
        taxonomyAppend(sec, "p", "No species records are currently available for this classification. / এই শ্রেণিবিন্যাসের জন্য বর্তমানে কোনো প্রজাতির রেকর্ড নেই।", "text-muted");
        return sec;
      }
      var grid = document.createElement("div");
      grid.className = "grid grid-3";
      sec.appendChild(grid);
      var rendered = 0;
      var moreBtn = document.createElement("button");
      moreBtn.type = "button";
      moreBtn.className = "btn btn-outline";
      function drawMore() {
        list.slice(rendered, rendered + TAXONOMY_SPECIES_BATCH).forEach(function (s) { grid.appendChild(taxonomyApprovedCard(s)); });
        rendered = Math.min(list.length, rendered + TAXONOMY_SPECIES_BATCH);
        moreBtn.hidden = rendered >= list.length;
        moreBtn.textContent = "Show all " + list.length + " species / সব " + list.length + " প্রজাতি দেখুন (" + rendered + "/" + list.length + ")";
      }
      moreBtn.addEventListener("click", drawMore);
      drawMore();
      sec.appendChild(moreBtn);
      return sec;
    }
    function taxonomyContextHeader(taxon) {
      var sec = document.createElement("section");
      sec.className = "taxonomy-context";
      taxonomyAppend(sec, "p", "Taxonomy context / শ্রেণিবিন্যাস প্রসঙ্গ", "eyebrow");
      var head = document.createElement("h2");
      head.textContent = taxon.name;
      if (taxon.bengaliName) {
        var bn = document.createElement("span");
        bn.className = "bilingual-heading-bn";
        bn.textContent = taxon.bengaliName;
        head.appendChild(bn);
      }
      sec.appendChild(head);
      var rank = document.createElement("span");
      rank.className = "badge badge-published taxonomy-rank";
      rank.textContent = taxon.rank;
      sec.appendChild(rank);
      if (taxon.description) taxonomyAppend(sec, "p", taxon.description, "taxonomy-context-desc");
      return sec;
    }

    function renderTaxonomyExplorer() {
      var search = taxonomyExplorer.querySelector("[data-taxonomy-search]").value.trim().toLocaleLowerCase();
      var rank = taxonomyExplorer.querySelector("[data-taxonomy-rank]").value;
      var selectedId = new URLSearchParams(window.location.search).get("taxon");
      var contextNode = (selectedId && taxonomyMap[selectedId]) || null;
      var levelNodes, scopeIds;
      if (contextNode) {
        scopeIds = taxonomyDescendantIds(contextNode.id);
        levelNodes = childTaxa(contextNode.id);
      } else {
        var animalia = taxonomyMap["animalia"];
        levelNodes = animalia ? childTaxa("animalia") : taxonomyRecords.filter(function (t) { return !t.parentId; });
        scopeIds = null;
      }
      var shown = levelNodes.filter(function (taxon) {
        if (rank && taxon.rank !== rank) return false;
        if (!search) return true;
        var text = (taxon.name + " " + (taxon.bengaliName || "") + " " + taxon.rank).toLocaleLowerCase();
        return text.indexOf(search) !== -1;
      });
      shown.sort(function (a, b) { return a.name.localeCompare(b.name); });
      var speciesList = (contextNode ? taxonomySpeciesIn(scopeIds) : taxonomySpecies.slice().sort(function (a, b) { return String(a.commonName || "").localeCompare(String(b.commonName || "")); })).filter(function (s) {
        if (!search) return true;
        var text = [(s.commonName || ""), (s.bengaliName || ""), (s.scientificName || "")].join(" ").toLocaleLowerCase();
        return text.indexOf(search) !== -1;
      });
      var grid = taxonomyExplorer.querySelector("[data-taxonomy-grid]");
      grid.innerHTML = "";
      var oldCtx = document.getElementById("taxonomy-context-block");
      if (oldCtx && oldCtx.parentNode) oldCtx.parentNode.removeChild(oldCtx);
      var oldSec = document.getElementById("taxonomy-species-block");
      if (oldSec && oldSec.parentNode) oldSec.parentNode.removeChild(oldSec);
      if (contextNode) {
        var ctx = taxonomyContextHeader(contextNode);
        ctx.id = "taxonomy-context-block";
        grid.parentNode.insertBefore(ctx, grid);
      }
      shown.forEach(function (taxon) { grid.appendChild(taxonomyNavCard(taxon)); });
      var sec = taxonomySpeciesSection(speciesList);
      sec.id = "taxonomy-species-block";
      grid.parentNode.insertBefore(sec, grid.nextSibling);
      var total = shown.length + speciesList.length;
      taxonomyExplorer.querySelector("[data-taxonomy-empty]").hidden = total !== 0;
      taxonomyExplorer.querySelector("[data-taxonomy-status]").textContent = shown.length + " taxa / " + shown.length + " ট্যাক্সা · " + speciesList.length + " species / " + speciesList.length + " প্রজাতি";
      var breadcrumb = taxonomyExplorer.querySelector("[data-taxonomy-breadcrumb]");
      breadcrumb.innerHTML = "";
      var taxBackBtn = document.getElementById("taxonomy-back-btn");
      if (!taxBackBtn) {
        taxBackBtn = document.createElement("button");
        taxBackBtn.type = "button";
        taxBackBtn.id = "taxonomy-back-btn";
        taxBackBtn.className = "hierarchy-back";
        var taxBackArrow = document.createElement("span");
        taxBackArrow.setAttribute("aria-hidden", "true");
        taxBackArrow.textContent = "←";
        taxBackBtn.appendChild(taxBackArrow);
        var taxBackText = document.createElement("span");
        taxBackText.textContent = "Back";
        taxBackBtn.appendChild(taxBackText);
        var taxBackBn = document.createElement("span");
        taxBackBn.className = "hierarchy-back-bn";
        taxBackBn.textContent = "ফিরে যান";
        taxBackBtn.appendChild(taxBackBn);
        taxBackBtn.addEventListener("click", function () {
          var sel = new URLSearchParams(window.location.search).get("taxon");
          var node = sel && taxonomyMap[sel];
          if (node && node.parentId && taxonomyMap[node.parentId]) window.location.href = "phyla.html?taxon=" + encodeURIComponent(node.parentId);
          else window.location.href = "phyla.html";
        });
        breadcrumb.parentNode.insertBefore(taxBackBtn, breadcrumb);
      }
      taxBackBtn.hidden = !(selectedId && taxonomyMap[selectedId]);
      if (selectedId && taxonomyMap[selectedId]) taxonomyChain(selectedId).forEach(function (taxon) { var span = document.createElement("span"); var link = document.createElement("a"); link.href = "phyla.html?taxon=" + encodeURIComponent(taxon.id); link.textContent = taxonomyLabel(taxon); span.appendChild(link); breadcrumb.appendChild(span); });
    }

    function renderTaxonDetails() {
      var loading = taxonDetails.querySelector("[data-taxon-loading]");
      var error = taxonDetails.querySelector("[data-taxon-error]");
      var notFound = taxonDetails.querySelector("[data-taxon-not-found]");
      var content = taxonDetails.querySelector("[data-taxon-content]");
      var id = new URLSearchParams(window.location.search).get("id");
      var taxon = taxonomyMap[id];
      loading.hidden = true;
      if (!taxon) { notFound.hidden = false; return; }
      content.hidden = false;
      var hero = document.createElement("section");
      hero.className = "taxon-hero";
      taxonomyHeading(hero, "h1", taxon.name, taxon.bengaliName || "");
      var rank = document.createElement("span"); rank.className = "badge badge-published"; rank.textContent = taxon.rank; hero.appendChild(rank);
      if (taxon.parentId && taxonomyMap[taxon.parentId]) { var parent = document.createElement("p"); parent.className = "taxonomy-parent"; parent.textContent = "Parent / ঊর্ধ্বতন: "; appendTaxonLink(parent, taxonomyMap[taxon.parentId], "taxon.html"); hero.appendChild(parent); }
      content.appendChild(hero);
      if (taxon.description) { var section = document.createElement("section"); section.className = "details-section"; taxonomyHeading(section, "h2", "Description", "বর্ণনা"); taxonomyAppend(section, "p", taxon.description, "details-copy"); content.appendChild(section); }
      var children = childTaxa(taxon.id);
      if (children.length) { var childSection = document.createElement("section"); childSection.className = "details-section"; taxonomyHeading(childSection, "h2", "Child taxa", "অধস্তন ট্যাক্সা"); var childGrid = document.createElement("div"); childGrid.className = "taxon-children-grid"; children.forEach(function (child) { var card = document.createElement("div"); card.className = "details-item"; appendTaxonLink(card, child, "taxon.html"); var contextLink = document.createElement("a"); contextLink.href = "phyla.html?taxon=" + encodeURIComponent(child.id); contextLink.textContent = "View in hierarchy / স্তরে দেখুন"; card.appendChild(contextLink); childGrid.appendChild(card); }); childSection.appendChild(childGrid); content.appendChild(childSection); }
      var related = speciesForTaxon(taxon.id);
      var speciesSection = document.createElement("section"); speciesSection.className = "details-section"; taxonomyHeading(speciesSection, "h2", "Related authoritative Species", "সম্পর্কিত কর্তৃত্বপূর্ণ প্রজাতি"); var list = document.createElement("ul"); list.className = "taxonomy-species"; related.forEach(function (species) { var item = document.createElement("li"); var link = document.createElement("a"); link.href = "species.html?id=" + encodeURIComponent(species.id); link.textContent = species.commonName + " — " + species.scientificName; link.className = "scientific-name"; item.appendChild(link); list.appendChild(item); }); if (!related.length) taxonomyAppend(speciesSection, "p", "No authoritative Species references this taxon. / কোনো কর্তৃত্বপূর্ণ Species এই ট্যাক্সনটি উল্লেখ করে না।", "details-copy"); else speciesSection.appendChild(list); content.appendChild(speciesSection);
      document.title = taxon.name + " — Taxon — BiotaElite";
    }

    Promise.all([
      fetch("data/taxonomy/taxa.json").then(function (response) { if (!response.ok) throw new Error(); return response.json(); }),
      fetch("data/species/index.json").then(function (response) { if (!response.ok) throw new Error(); return response.json(); }),
      fetch("data/images.json").then(function (response) { if (!response.ok) throw new Error(); return response.json(); }).catch(function () { return []; })
    ]).then(function (data) {
      taxonomyRecords = Array.isArray(data[0]) ? data[0] : [];
      taxonomySpecies = Array.isArray(data[1]) ? data[1] : [];
      taxonomyRecords.forEach(function (taxon) { taxonomyMap[taxon.id] = taxon; });
      (Array.isArray(data[2]) ? data[2] : []).forEach(function (image) { if (image && image.id) taxonomyMediaById[image.id] = image; });
      if (taxonomyExplorer) {
        var rankSelect = taxonomyExplorer.querySelector("[data-taxonomy-rank]");
        Array.from(new Set(taxonomyRecords.map(function (taxon) { return taxon.rank; }))).sort().forEach(function (rank) { var option = document.createElement("option"); option.value = rank; option.textContent = rank; rankSelect.appendChild(option); });
        taxonomyExplorer.querySelector("[data-taxonomy-search]").addEventListener("input", renderTaxonomyExplorer);
        rankSelect.addEventListener("change", renderTaxonomyExplorer);
        renderTaxonomyExplorer();
      }
      if (taxonDetails) renderTaxonDetails();
    }).catch(function () {
      if (taxonomyExplorer) { taxonomyExplorer.querySelector("[data-taxonomy-status]").hidden = true; taxonomyExplorer.querySelector("[data-taxonomy-error]").hidden = false; }
      if (taxonDetails) { taxonDetails.querySelector("[data-taxon-loading]").hidden = true; taxonDetails.querySelector("[data-taxon-error]").hidden = false; }
    });
  }

  /* ---------- Scientific Names ---------- */
  var scientificNamesRoot = document.querySelector("[data-scientific-names]");
  if (scientificNamesRoot) {
    var namesGrid = scientificNamesRoot.querySelector("[data-names-grid]");
    var namesSearch = scientificNamesRoot.querySelector("[data-names-search]");
    var namesSort = scientificNamesRoot.querySelector("[data-names-sort]");
    var namesStatus = scientificNamesRoot.querySelector("[data-names-status]");
    var namesEmpty = scientificNamesRoot.querySelector("[data-names-empty]");
    var namesError = scientificNamesRoot.querySelector("[data-names-error]");
    var namesTaxonomy = {};
    var nameSpecies = [];

    function namesAppend(parent, tag, text, className) {
      var node = document.createElement(tag);
      if (className) node.className = className;
      node.textContent = text || "";
      parent.appendChild(node);
      return node;
    }

    function namesTaxonName(id) {
      return id && namesTaxonomy[id] ? namesTaxonomy[id].name : "";
    }

    function namesCard(record) {
      var card = document.createElement("article");
      card.className = "scientific-name-card";
      namesAppend(card, "span", record.needsReview ? "Needs Scientific Review / বৈজ্ঞানিক পর্যালোচনা প্রয়োজন" : "Verified / যাচাইকৃত", "badge " + (record.needsReview ? "badge-needs-review scientific-name-review" : "badge-verified scientific-name-review"));
      namesAppend(card, "h3", record.scientificName || "Scientific name unavailable", "scientific-name");
      if (record.commonName) namesAppend(card, "p", "Common name / সাধারণ নাম: " + record.commonName, "scientific-name-common");
      if (record.bengaliName) namesAppend(card, "p", "Bengali name / বাংলা নাম: " + record.bengaliName, "scientific-name-bengali");
      var taxonomy = document.createElement("div");
      taxonomy.className = "scientific-name-taxonomy";
      ["kingdomId", "phylumId", "classId", "orderId", "familyId", "genusId", "speciesId", "subspeciesId"].forEach(function (key) {
        var name = namesTaxonName(record.taxonomy && record.taxonomy[key]);
        if (!name) return;
        var item = document.createElement("span");
        var strong = document.createElement("strong");
        strong.textContent = key.replace("Id", "") + ": ";
        item.appendChild(strong);
        item.appendChild(document.createTextNode(name));
        taxonomy.appendChild(item);
      });
      card.appendChild(taxonomy);
      var link = document.createElement("a");
      link.className = "btn btn-outline";
      link.href = "species.html?id=" + encodeURIComponent(record.id);
      link.textContent = "View Species / Species দেখুন";
      card.appendChild(link);
      return card;
    }

    function renderScientificNames() {
      var query = namesSearch.value.trim().toLocaleLowerCase();
      var sort = namesSort.value;
      var results = nameSpecies.filter(function (record) {
        var haystack = [record.scientificName, record.commonName, record.bengaliName].filter(Boolean).join(" ");
        ["kingdomId", "phylumId", "classId", "orderId", "familyId", "genusId"].forEach(function (key) {
          var taxonName = namesTaxonName(record.taxonomy && record.taxonomy[key]);
          if (taxonName) haystack += " " + taxonName;
        });
        return !query || haystack.toLocaleLowerCase().indexOf(query) !== -1;
      });
      results.sort(function (a, b) {
        var left = sort === "common" ? (a.commonName || "") : (a.scientificName || "");
        var right = sort === "common" ? (b.commonName || "") : (b.scientificName || "");
        return left.localeCompare(right);
      });
      namesGrid.innerHTML = "";
      results.forEach(function (record) { namesGrid.appendChild(namesCard(record)); });
      namesStatus.textContent = results.length + " scientific names / " + results.length + " বৈজ্ঞানিক নাম";
      namesEmpty.hidden = results.length !== 0;
    }

    namesSearch.addEventListener("input", renderScientificNames);
    namesSort.addEventListener("change", renderScientificNames);
    Promise.all([
      fetch("data/species/index.json").then(function (response) { if (!response.ok) throw new Error(); return response.json(); }),
      fetch("data/taxonomy/taxa.json").then(function (response) { if (!response.ok) throw new Error(); return response.json(); })
    ]).then(function (data) {
      nameSpecies = Array.isArray(data[0]) ? data[0] : [];
      (Array.isArray(data[1]) ? data[1] : []).forEach(function (taxon) { namesTaxonomy[taxon.id] = taxon; });
      renderScientificNames();
    }).catch(function () {
      namesStatus.hidden = true;
      namesError.hidden = false;
    });
  }

  /* ---------- Species Library ---------- */
  var speciesLibrary = document.querySelector("[data-species-library]");
  if (speciesLibrary) {
    var speciesGrid = speciesLibrary.querySelector("[data-species-grid]");
    var speciesStatus = speciesLibrary.querySelector("[data-species-status]");
    var speciesEmpty = speciesLibrary.querySelector("[data-species-empty]");
    var speciesError = speciesLibrary.querySelector("[data-species-error]");
    var speciesFilters = speciesLibrary.querySelector("[data-species-filters]");
    var speciesSearch = speciesLibrary.querySelector("[data-species-search]");
    var speciesSort = speciesLibrary.querySelector("[data-species-sort]");
    var speciesClear = speciesLibrary.querySelector("[data-species-clear]");
    var speciesRecords = [];
    var taxonomyById = {};
    var mediaById = {};
    var speciesFilterState = {};
    var speciesFilterDefinitions = [
      { key: "kingdomId", label: "Kingdom / জগৎ" },
      { key: "phylumId", label: "Phylum / পর্ব" },
      { key: "classId", label: "Class / শ্রেণি" },
      { key: "orderId", label: "Order / বর্গ" },
      { key: "familyId", label: "Family / পরিবার" },
      { key: "genusId", label: "Genus / গণ" },
      { key: "environment", label: "Environment / পরিবেশ" },
      { key: "conservationStatus", label: "Conservation / সংরক্ষণ" },
      { key: "verificationStatus", label: "Verification / যাচাই" },
      { key: "bangladesh", label: "Bangladesh / বাংলাদেশ" },
      { key: "extension", label: "Extension / সম্প্রসারণ" }
    ];
    var fishEnvBySpecies = {};
    var extensionKindsBySpecies = {};
    var bangladeshSpeciesIds = {};

    function speciesText(value) {
      return value === undefined || value === null ? "" : String(value);
    }

    function taxonomyRecord(id) {
      return id && taxonomyById[id] ? taxonomyById[id] : null;
    }

    function taxonomyName(id) {
      var taxon = taxonomyRecord(id);
      return taxon ? taxon.name : "";
    }

    function verificationStatus(record) {
      if (record.needsReview === true) return "needs-review";
      if (record.verification && record.verification.status) return record.verification.status;
      if (record.lastVerifiedAt) return "verified";
      return "unverified";
    }

    function taxonomySearchText(record) {
      var taxonomy = record.taxonomy || {};
      return ["kingdomId", "phylumId", "classId", "orderId", "familyId", "genusId"]
        .map(function (key) {
          var taxon = taxonomyRecord(taxonomy[key]);
          return taxon ? [taxon.name, taxon.bengaliName].join(" ") : "";
        })
        .join(" ");
    }

    function recordSearchText(record) {
      return [record.commonName, record.bengaliName, record.scientificName, taxonomySearchText(record)]
        .map(speciesText)
        .join(" ")
        .toLocaleLowerCase();
    }

    function hasApprovedImage(record) {
      var candidates = [];
      if (record && Array.isArray(record.images)) candidates = candidates.concat(record.images);
      candidates = candidates.map(function (image) {
        return image && image.id && mediaById[image.id] ? Object.assign({}, mediaById[image.id], image) : image;
      });
      return candidates.find(function (image) {
        if (!image || !image.localPath || !image.sourceUrl || !image.credit) return false;
        return image.license && String(image.license).toLowerCase() !== "unknown";
      }) || null;
    }

    function appendText(parent, tag, text, className) {
      var element = document.createElement(tag);
      if (className) element.className = className;
      element.textContent = text;
      parent.appendChild(element);
      return element;
    }

    function renderSpeciesCard(record) {
      var detailUrl = "species.html?id=" + encodeURIComponent(record.id);
      var card = document.createElement("article");
      card.className = "card species-card";
      var image = hasApprovedImage(record);
      if (image) {
        var imageElement = document.createElement("img");
        imageElement.className = "card-media media-main";
        imageElement.src = image.localPath || image.url;
        imageElement.alt = image.alt || record.commonName || "Species image";
        imageElement.loading = "lazy";
        imageElement.decoding = "async";
        card.appendChild(imageElement);
      } else {
        var placeholder = document.createElement("div");
        placeholder.className = "card-media species-placeholder";
        placeholder.setAttribute("role", "img");
        placeholder.setAttribute("aria-label", "Image unavailable / ছবি অনুপলব্ধ");
        var glyph = document.createElement("span");
        glyph.className = "species-placeholder-mark";
        glyph.setAttribute("aria-hidden", "true");
        glyph.innerHTML = "<svg viewBox=\"0 0 24 24\" width=\"40\" height=\"40\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" aria-hidden=\"true\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"/><circle cx=\"9\" cy=\"10\" r=\"1.8\"/><path d=\"M3 17l5-4 4 3 4-4 5 5\"/></svg>";
        placeholder.appendChild(glyph);
        appendText(placeholder, "span", "Image unavailable / ছবি অনুপলব্ধ", "species-placeholder-text");
        card.appendChild(placeholder);
      }

      var body = document.createElement("div");
      body.className = "card-body";
      var meta = document.createElement("div");
      meta.className = "card-meta";
      var group = taxonomyName(record.taxonomy && record.taxonomy.orderId) || taxonomyName(record.taxonomy && record.taxonomy.classId);
      if (group) appendText(meta, "span", group, "tag");
      if (record.conservation && record.conservation.conservationStatus) appendText(meta, "span", record.conservation.conservationStatus, "tag amber");
      body.appendChild(meta);
      var heading = appendText(body, "h3", "");
      var titleLink = document.createElement("a");
      titleLink.href = detailUrl;
      titleLink.textContent = record.commonName || "Unnamed species";
      heading.appendChild(titleLink);
      if (record.bengaliName) appendText(body, "p", record.bengaliName, "species-bengali");
      appendText(body, "p", record.scientificName || "Scientific name unavailable", "scientific-name");

      var actions = document.createElement("div");
      actions.className = "species-actions";
      var details = document.createElement("a");
      details.className = "btn btn-outline";
      details.href = detailUrl;
      details.setAttribute("aria-label", "View Details: " + (record.commonName || record.scientificName || record.id));
      details.textContent = "View Details / বিস্তারিত দেখুন →";
      actions.appendChild(details);
      body.appendChild(actions);
      card.appendChild(body);
      return card;
    }

    function filterValue(record, key) {
      if (key === "conservationStatus") return record.conservation && record.conservation.conservationStatus;
      if (key === "verificationStatus") return verificationStatus(record);
      return record.taxonomy && record.taxonomy[key];
    }

    function displayFilterValue(key, value) {
      if (key === "verificationStatus") {
        return value === "needs-review" ? "Needs Scientific Review / বৈজ্ঞানিক পর্যালোচনা প্রয়োজন" : value;
      }
      if (key === "conservationStatus") return value;
      if (key === "environment") return value;
      if (key === "bangladesh") {
        return value === "present" ? "Recorded in Bangladesh / বাংলাদেশে নথিভুক্ত" : "Not recorded / নথিভুক্ত নয়";
      }
      if (key === "extension") {
        if (value === "fish") return "Fish extension / মাছের সম্প্রসারণ";
        if (value === "marine") return "Marine Life extension / সামুদ্রিক সম্প্রসারণ";
        if (value === "bangladesh") return "Bangladesh record / বাংলাদেশ রেকর্ড";
        return "No extension / সম্প্রসারণ নেই";
      }
      return taxonomyName(value) || value;
    }

    function filterOptionValues(record, key) {
      if (key === "environment") return fishEnvBySpecies[record.id] || [];
      if (key === "bangladesh") return [bangladeshSpeciesIds[record.id] ? "present" : "absent"];
      if (key === "extension") {
        var kinds = extensionKindsBySpecies[record.id];
        if (kinds && kinds.length) return kinds.slice();
        return ["none"];
      }
      var value = filterValue(record, key);
      return value ? [value] : [];
    }

    function filterMatches(record, key, selected) {
      if (!selected) return true;
      return filterOptionValues(record, key).indexOf(selected) !== -1;
    }

    function buildSpeciesFilters() {
      speciesFilterDefinitions.forEach(function (definition) {
        var values = [];
        speciesRecords.forEach(function (record) {
          filterOptionValues(record, definition.key).forEach(function (value) {
            if (value && values.indexOf(value) === -1) values.push(value);
          });
        });
        if (values.length < 2) return;
        values.sort(function (a, b) { return displayFilterValue(definition.key, a).localeCompare(displayFilterValue(definition.key, b)); });
        var wrapper = document.createElement("label");
        wrapper.className = "library-filter";
        wrapper.textContent = definition.label;
        var select = document.createElement("select");
        select.setAttribute("data-species-filter", definition.key);
        select.setAttribute("aria-label", definition.label);
        var allOption = document.createElement("option");
        allOption.value = "";
        allOption.textContent = "All / সব";
        select.appendChild(allOption);
        values.forEach(function (value) {
          var option = document.createElement("option");
          option.value = value;
          option.textContent = displayFilterValue(definition.key, value);
          select.appendChild(option);
        });
        wrapper.appendChild(select);
        speciesFilters.appendChild(wrapper);
        select.addEventListener("change", function () {
          speciesFilterState[definition.key] = select.value;
          speciesVisibleCount = 24;
          renderSpeciesResults();
        });
      });
    }

    function renderSpeciesResults() {
      var query = speciesSearch.value.trim().toLocaleLowerCase();
      var sort = speciesSort.value;
      var results = speciesRecords.filter(function (record) {
        var matchesQuery = !query || recordSearchText(record).indexOf(query) !== -1;
        var matchesFilters = speciesFilterDefinitions.every(function (definition) {
          return filterMatches(record, definition.key, speciesFilterState[definition.key]);
        });
        return matchesQuery && matchesFilters;
      });
      results.sort(function (a, b) {
        if (sort === "scientific-asc") return speciesText(a.scientificName).localeCompare(speciesText(b.scientificName));
        if (sort === "updated-desc") return new Date(speciesText(b.updatedAt)).getTime() - new Date(speciesText(a.updatedAt)).getTime();
        return speciesText(a.commonName).localeCompare(speciesText(b.commonName));
      });
      var total = results.length;
      var shown = results.slice(0, speciesVisibleCount);
      speciesGrid.innerHTML = "";
      shown.forEach(function (record) { speciesGrid.appendChild(renderSpeciesCard(record)); });
      speciesEmpty.hidden = total !== 0;
      if (total > shown.length) {
        speciesStatus.textContent = "Showing " + shown.length + " of " + total + " species / " + shown.length + " / " + total + " প্রজাতি দেখানো হচ্ছে";
        speciesLoadMore.hidden = false;
        speciesLoadMore.textContent = "Load more (" + (total - shown.length) + " remaining) / আরও দেখুন";
      } else {
        speciesStatus.textContent = total + " species / " + total + " প্রজাতি";
        speciesLoadMore.hidden = true;
      }
      speciesClear.hidden = !query && Object.keys(speciesFilterState).every(function (key) { return !speciesFilterState[key]; });
    }

    var speciesVisibleCount = 24;
    var speciesLoadMore = document.createElement("button");
    speciesLoadMore.className = "btn btn-outline species-load-more";
    speciesLoadMore.type = "button";
    speciesLoadMore.hidden = true;
    speciesGrid.parentNode.insertBefore(speciesLoadMore, speciesEmpty);
    speciesLoadMore.addEventListener("click", function () {
      speciesVisibleCount += 24;
      renderSpeciesResults();
    });

    speciesSearch.addEventListener("input", function () { speciesVisibleCount = 24; renderSpeciesResults(); });
    speciesSort.addEventListener("change", function () { speciesVisibleCount = 24; renderSpeciesResults(); });
    speciesClear.addEventListener("click", function () {
      speciesSearch.value = "";
      speciesSort.value = "common-asc";
      speciesFilterState = {};
      speciesVisibleCount = 24;
      speciesFilters.querySelectorAll("select").forEach(function (select) { select.value = ""; });
      renderSpeciesResults();
      speciesSearch.focus();
    });

    function trackExtension(speciesId, kind) {
      if (!speciesId) return;
      var kinds = extensionKindsBySpecies[speciesId] || [];
      if (kinds.indexOf(kind) === -1) kinds.push(kind);
      extensionKindsBySpecies[speciesId] = kinds;
    }

    Promise.all([
      fetch("data/species/index.json").then(function (response) { if (!response.ok) throw new Error("species"); return response.json(); }),
      fetch("data/taxonomy/taxa.json").then(function (response) { if (!response.ok) throw new Error("taxonomy"); return response.json(); }),
      fetch("data/images.json").then(function (response) { if (!response.ok) throw new Error("images"); return response.json(); }),
      fetch("data/fish/index.json").then(function (response) { if (!response.ok) throw new Error("fish"); return response.json(); }),
      fetch("data/marine-life/index.json").then(function (response) { if (!response.ok) throw new Error("marine"); return response.json(); }),
      fetch("data/bangladesh/species.json").then(function (response) { if (!response.ok) throw new Error("bangladesh"); return response.json(); })
    ]).then(function (data) {
      speciesRecords = Array.isArray(data[0]) ? data[0] : [];
      (Array.isArray(data[1]) ? data[1] : []).forEach(function (taxon) { taxonomyById[taxon.id] = taxon; });
      (Array.isArray(data[2]) ? data[2] : []).forEach(function (image) { mediaById[image.id] = image; });
      (Array.isArray(data[3]) ? data[3] : []).forEach(function (item) {
        if (!item || !item.speciesId) return;
        var env = Array.isArray(item.environment) ? item.environment.filter(Boolean) : [];
        if (env.length) fishEnvBySpecies[item.speciesId] = env;
        trackExtension(item.speciesId, "fish");
      });
      (Array.isArray(data[4]) ? data[4] : []).forEach(function (item) {
        if (!item || !item.speciesId) return;
        trackExtension(item.speciesId, "marine");
      });
      (Array.isArray(data[5]) ? data[5] : []).forEach(function (item) {
        if (!item || !item.speciesId) return;
        bangladeshSpeciesIds[item.speciesId] = true;
        trackExtension(item.speciesId, "bangladesh");
      });
      buildSpeciesFilters();
      renderSpeciesResults();
    }).catch(function () {
      speciesStatus.textContent = "Species unavailable / প্রজাতির তথ্য অনুপলব্ধ";
      speciesError.hidden = false;
    });
  }

  /* ---------- Filtering (cards) ---------- */
  var chipContainer = document.querySelector(".filter-chips");
  var cardGrid = document.querySelector("[data-filter-grid]");
  var emptyState = document.querySelector("[data-empty]");

  function applyFilters() {
    if (!cardGrid) return;
    var activeCat = null;
    var activeChip = chipContainer ? chipContainer.querySelector(".chip.active") : null;
    if (activeChip) activeCat = activeChip.getAttribute("data-filter");

    var query = "";
    var searchInput = document.querySelector("[data-search]");
    if (searchInput) query = searchInput.value.trim().toLowerCase();

    var visible = 0;
    var cards = cardGrid.querySelectorAll(".card");
    cards.forEach(function (card) {
      var cat = card.getAttribute("data-category") || "all";
      var text = (card.textContent || "").toLowerCase();
      var catOk = !activeCat || activeCat === "all" || cat === activeCat;
      var qOk = !query || text.indexOf(query) !== -1;
      var show = catOk && qOk;
      card.style.display = show ? "" : "none";
      if (show) visible++;
    });

    if (emptyState) emptyState.classList.toggle("show", visible === 0);
  }

  if (chipContainer && cardGrid) {
    chipContainer.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      chipContainer.querySelectorAll(".chip").forEach(function (c) {
        c.classList.toggle("active", c === chip);
      });
      applyFilters();
    });
    var searchInput = document.querySelector("[data-search]");
    if (searchInput) {
      searchInput.addEventListener("input", applyFilters);
    }
    applyFilters();
  }

  /* ---------- Toast ---------- */
  function showToast(msg) {
    var toast = document.querySelector(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      toast.classList.remove("show");
    }, 2800);
  }

  /* ---------- Newsletter ---------- */
  var newsForm = document.querySelector("[data-newsletter]");
  if (newsForm) {
    newsForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = newsForm.querySelector("input");
      var email = (input.value || "").trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast("Please enter a valid email address.");
        return;
      }
      input.value = "";
      showToast("Thanks! You're subscribed. \u2709");
    });
  }

  /* ---------- Contact form (safe email-client workflow, no backend) ----------
     Client-side abuse controls reduce automated/repeated submissions but do
     not replace server-side rate limiting or WAF protection. No message is
     stored anywhere; the form only opens the user's email client. */
  var contactForm = document.querySelector("[data-contact]");
  if (contactForm) {
    var CONTACT_EMAIL = "arifdyd4th@gmail.com";
    var CONTACT_MIN_MS = 3000;
    var CONTACT_COOLDOWN_MS = 30000;
    var CONTACT_LIMITS = { name: 100, email: 254, subject: 150, message: 1000 };
    var CONTACT_EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var contactStart = Date.now();
    var contactBusy = false;
    var contactCooldownTimer = null;
    var nameInput = contactForm.querySelector('input[name="name"]');
    var emailInput = contactForm.querySelector('input[name="email"]');
    var subjectInput = contactForm.querySelector('[name="subject"]');
    var messageInput = contactForm.querySelector('textarea[name="message"]');
    var honeypotInput = contactForm.querySelector('input[name="website"]');
    var statusBox = contactForm.querySelector("[data-contact-status]");
    var countBox = contactForm.querySelector("[data-contact-count]");
    var submitBtn = contactForm.querySelector("[data-contact-submit]") || contactForm.querySelector('[type="submit"]');
    var submitLabel = submitBtn ? submitBtn.textContent : "";
    function contactStatus(text) {
      if (statusBox) statusBox.textContent = text;
      if (text) showToast(text);
    }
    function contactFail(field, message) {
      contactForm.querySelectorAll("[aria-invalid]").forEach(function (el) { el.removeAttribute("aria-invalid"); });
      if (field) {
        field.setAttribute("aria-invalid", "true");
        try { field.focus(); } catch (e) {}
      }
      contactStatus(message);
    }
    function contactCooldownEnd() {
      return Number((function () { try { return sessionStorage.getItem("biota_contact_last") || 0; } catch (e) { return 0; } })());
    }
    function contactCooldownLeft() {
      return Math.max(0, CONTACT_COOLDOWN_MS - (Date.now() - contactCooldownEnd()));
    }
    function contactStartCooldown() {
      try { sessionStorage.setItem("biota_contact_last", String(Date.now())); } catch (e) {}
      if (!submitBtn) return;
      if (contactCooldownTimer) clearInterval(contactCooldownTimer);
      function tick() {
        var left = Math.ceil(contactCooldownLeft() / 1000);
        if (left <= 0) {
          clearInterval(contactCooldownTimer);
          contactCooldownTimer = null;
          submitBtn.disabled = false;
          submitBtn.textContent = submitLabel;
          return;
        }
        submitBtn.disabled = true;
        submitBtn.textContent = "Please wait (" + left + "s) / অপেক্ষা করুন";
      }
      tick();
      contactCooldownTimer = setInterval(tick, 1000);
    }
    if (contactCooldownLeft() > 0 && submitBtn) contactStartCooldown();
    if (messageInput) {
      messageInput.addEventListener("input", function () {
        if (countBox) countBox.textContent = messageInput.value.length + " / " + CONTACT_LIMITS.message;
        messageInput.removeAttribute("aria-invalid");
      });
      if (countBox) countBox.textContent = (messageInput.value || "").length + " / " + CONTACT_LIMITS.message;
    }
    [nameInput, emailInput, subjectInput].forEach(function (el) {
      if (el) el.addEventListener("input", function () { el.removeAttribute("aria-invalid"); });
    });
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (contactBusy) return;
      if (honeypotInput && honeypotInput.value) return;
      var name = (nameInput ? nameInput.value : "").trim();
      var email = (emailInput ? emailInput.value : "").trim();
      var subject = (subjectInput ? subjectInput.value : "").trim();
      var message = (messageInput ? messageInput.value : "").trim();
      if (!name || !email || !subject || !message) {
        contactFail(!name ? nameInput : (!email ? emailInput : (!subject ? subjectInput : messageInput)), "Please fill in all required fields.");
        return;
      }
      if (name.length > CONTACT_LIMITS.name || email.length > CONTACT_LIMITS.email || subject.length > CONTACT_LIMITS.subject || message.length > CONTACT_LIMITS.message) {
        contactFail(null, "One of the fields exceeds its length limit.");
        return;
      }
      if (!CONTACT_EMAIL_RE.test(email)) {
        contactFail(emailInput, "Please enter a valid email address.");
        return;
      }
      if (Date.now() - contactStart < CONTACT_MIN_MS) {
        contactFail(null, "Please take a moment to complete the form.");
        return;
      }
      var waitLeft = contactCooldownLeft();
      if (waitLeft > 0) {
        contactFail(null, "Please wait before trying again.");
        return;
      }
      contactBusy = true;
      if (submitBtn) submitBtn.disabled = true;
      var body = "Name: " + name + "\nEmail: " + email + "\n\n" + message;
      var href = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent("[BiotaElite Contact] " + subject) + "&body=" + encodeURIComponent(body);
      try { window.location.href = href; } catch (err) {}
      contactStartCooldown();
      contactBusy = false;
      if (statusBox) {
        statusBox.textContent = "";
        var okLine = document.createElement("span");
        okLine.textContent = "Your email app should now open with the message prepared. / আপনার ইমেইল অ্যাপ খুলে বার্তাটি প্রস্তুত করা হবে। ";
        statusBox.appendChild(okLine);
        var fallback = document.createElement("a");
        fallback.href = "mailto:" + CONTACT_EMAIL;
        fallback.textContent = "Please email us directly at " + CONTACT_EMAIL;
        statusBox.appendChild(fallback);
      } else {
        showToast("Your email app should now open with the message prepared.");
      }
    });
  }

  /* ---------- Global Search ---------- */
  var searchButtons = document.querySelectorAll(".nav-search");
  if (searchButtons.length) {
    var searchOverlay = null;
    var searchField = null;
    var searchStatus = null;
    var searchResults = null;
    var searchCloseBtn = null;
    var searchOpener = null;
    var searchIndex = null;
    var searchLoading = false;
    var searchTimer = null;

    function searchText(value) {
      return value === undefined || value === null ? "" : String(value);
    }

    function searchHaystack(parts) {
      return parts.map(searchText).join(" ").toLocaleLowerCase();
    }

    function safeLoad(url) {
      return fetch(url).then(function (response) {
        if (!response.ok) throw new Error(url);
        return response.json();
      }).catch(function () { return []; });
    }

    function buildSearchIndex(data) {
      var species = Array.isArray(data.species) ? data.species : [];
      var taxonomy = Array.isArray(data.taxonomy) ? data.taxonomy : [];
      var fish = Array.isArray(data.fish) ? data.fish : [];
      var marine = Array.isArray(data.marine) ? data.marine : [];
      var bangladesh = Array.isArray(data.bangladesh) ? data.bangladesh : [];
      var projects = Array.isArray(data.projects) ? data.projects : [];
      var theses = Array.isArray(data.theses) ? data.theses : [];
      var news = Array.isArray(data.news) ? data.news : [];
      var blog = Array.isArray(data.blog) ? data.blog : [];
      var fishOrders = Array.isArray(data.fishOrders) ? data.fishOrders : [];
      var marineGroups = Array.isArray(data.marineGroups) ? data.marineGroups : [];
      var taxaById = {};
      taxonomy.forEach(function (taxon) { if (taxon && taxon.id) taxaById[taxon.id] = taxon; });
      var speciesById = {};
      species.forEach(function (record) { if (record && record.id) speciesById[record.id] = record; });
      function taxonNames(record) {
        var names = [];
        ["kingdomId", "phylumId", "classId", "orderId", "familyId", "genusId"].forEach(function (key) {
          var taxon = record.taxonomy && taxaById[record.taxonomy[key]];
          if (taxon) names.push(taxon.name, taxon.bengaliName);
        });
        return names;
      }
      function speciesTitle(record) {
        return record.commonName || record.scientificName || record.id;
      }
      var entries = [];
      species.forEach(function (record) {
        entries.push({
          type: "Species", typeBn: "প্রজাতি",
          title: speciesTitle(record), sub: record.scientificName || "",
          url: "species.html?id=" + encodeURIComponent(record.id),
          review: record.needsReview === true,
          text: searchHaystack([record.commonName, record.bengaliName, record.scientificName].concat(taxonNames(record)))
        });
      });
      taxonomy.forEach(function (taxon) {
        entries.push({
          type: "Taxon", typeBn: "ট্যাক্সন",
          title: taxon.name || taxon.id, sub: (taxon.rank || "") + (taxon.bengaliName ? " / " + taxon.bengaliName : ""),
          url: "taxon.html?id=" + encodeURIComponent(taxon.id),
          review: taxon.needsReview === true,
          text: searchHaystack([taxon.name, taxon.bengaliName, taxon.rank, taxon.description])
        });
      });
      fish.forEach(function (item) {
        if (!item || !item.speciesId) return;
        var linked = speciesById[item.speciesId];
        entries.push({
          type: "Fish record", typeBn: "মাছের রেকর্ড",
          title: linked ? speciesTitle(linked) : item.speciesId,
          sub: "Environment: " + (Array.isArray(item.environment) ? item.environment.join(", ") : searchText(item.environment)),
          url: linked ? "species.html?id=" + encodeURIComponent(linked.id) : "fish.html",
          review: true,
          text: searchHaystack([linked ? linked.commonName : "", linked ? linked.scientificName : "", item.speciesId, item.environment, item.aquaticHabitat, item.feedingType])
        });
      });
      marine.forEach(function (item) {
        if (!item || !item.speciesId) return;
        var linkedMarine = speciesById[item.speciesId];
        entries.push({
          type: "Marine Life record", typeBn: "সামুদ্রিক রেকর্ড",
          title: linkedMarine ? speciesTitle(linkedMarine) : item.speciesId,
          sub: "Zone: " + searchText(item.zone),
          url: linkedMarine ? "species.html?id=" + encodeURIComponent(linkedMarine.id) : "marine-life.html",
          review: true,
          text: searchHaystack([linkedMarine ? linkedMarine.commonName : "", linkedMarine ? linkedMarine.scientificName : "", item.speciesId, item.marineCategory, item.zone, item.substrate])
        });
      });
      bangladesh.forEach(function (item) {
        if (!item || !item.speciesId) return;
        var linkedBd = speciesById[item.speciesId];
        var localNames = Array.isArray(item.localNames) ? item.localNames.map(function (entry) { return entry && entry.name; }) : [];
        entries.push({
          type: "Bangladesh record", typeBn: "বাংলাদেশ রেকর্ড",
          title: linkedBd ? speciesTitle(linkedBd) : item.speciesId,
          sub: "Regions: " + (Array.isArray(item.regions) ? item.regions.join(", ") : ""),
          url: linkedBd ? "species.html?id=" + encodeURIComponent(linkedBd.id) : "bangladesh.html",
          review: item.needsReview === true,
          text: searchHaystack([linkedBd ? linkedBd.commonName : "", linkedBd ? linkedBd.scientificName : "", item.speciesId].concat(localNames, [item.regions, item.habitats]))
        });
      });
      projects.forEach(function (item) {
        if (!item || !item.id) return;
        entries.push({
          type: "Project", typeBn: "প্রকল্প",
          title: item.title || item.id, sub: item.bengaliTitle || item.category || "",
          url: "projects.html",
          review: item.needsReview === true,
          text: searchHaystack([item.title, item.bengaliTitle, item.description, item.category, item.location])
        });
      });
      theses.forEach(function (item) {
        if (!item || !item.id) return;
        entries.push({
          type: "Thesis", typeBn: "থিসিস",
          title: item.title || item.id, sub: [item.degree, item.year].filter(Boolean).join(" · "),
          url: "thesis.html",
          review: item.needsReview === true,
          text: searchHaystack([item.title, item.bengaliTitle, item.abstract, item.researchArea, item.keywords])
        });
      });
      news.forEach(function (item) {
        if (!item || !item.id) return;
        entries.push({
          type: "News", typeBn: "সংবাদ",
          title: item.title || item.id, sub: item.category || "",
          url: "news.html",
          review: item.needsReview === true,
          text: searchHaystack([item.title, item.bengaliTitle, item.excerpt, item.content, item.category])
        });
      });
      blog.forEach(function (item) {
        if (!item || !item.id) return;
        entries.push({
          type: "Blog", typeBn: "ব্লগ",
          title: item.title || item.id, sub: item.category || "",
          url: "blog.html",
          review: item.needsReview === true,
          text: searchHaystack([item.title, item.bengaliTitle, item.excerpt, item.content, item.category])
        });
      });
      fishOrders.forEach(function (item) {
        if (!item || !item.id) return;
        var exampleNames = (item.examples || []).map(function (ex) { return [ex.name, ex.commonName, ex.bengaliName].filter(Boolean).join(" "); });
        entries.push({
          type: "Fish order", typeBn: "মাছের বর্গ",
          title: item.name + (item.bengaliName ? " / " + item.bengaliName : ""),
          sub: item.rank || "order",
          url: "fish.html#order-" + item.id,
          review: item.needsReview === true,
          text: searchHaystack([item.name, item.bengaliName, item.meaning, item.meaningBn, item.description, item.descriptionBn].concat(exampleNames))
        });
      });
      marineGroups.forEach(function (item) {
        if (!item || !item.id) return;
        var marineExampleNames = (item.examples || []).map(function (ex) { return [ex.name, ex.commonName, ex.bengaliName].filter(Boolean).join(" "); });
        entries.push({
          type: "Marine group", typeBn: "সামুদ্রিক দল",
          title: item.name + (item.bengaliName ? " / " + item.bengaliName : ""),
          sub: item.rank || "group",
          url: "marine-life.html#marine-" + item.id,
          review: item.needsReview === true,
          text: searchHaystack([item.name, item.bengaliName, item.meaning, item.meaningBn, item.description, item.descriptionBn].concat(marineExampleNames))
        });
      });
      return entries;
    }

    function buildSearchOverlay() {
      searchOverlay = document.createElement("div");
      searchOverlay.className = "site-search-overlay";
      searchOverlay.hidden = true;
      var dialog = document.createElement("div");
      dialog.className = "site-search-dialog";
      dialog.setAttribute("role", "dialog");
      dialog.setAttribute("aria-modal", "true");
      dialog.setAttribute("aria-label", "Global search / বৈশ্বিক অনুসন্ধান");
      var bar = document.createElement("div");
      bar.className = "site-search-bar";
      var box = document.createElement("div");
      box.className = "search-box";
      var icon = document.createElement("span");
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = "⌕";
      box.appendChild(icon);
      searchField = document.createElement("input");
      searchField.type = "search";
      searchField.id = "site-search-input";
      searchField.setAttribute("placeholder", "Search species, taxa, projects… / অনুসন্ধান করুন…");
      searchField.setAttribute("aria-label", "Global search / বৈশ্বিক অনুসন্ধান");
      searchField.setAttribute("autocomplete", "off");
      box.appendChild(searchField);
      bar.appendChild(box);
      searchCloseBtn = document.createElement("button");
      searchCloseBtn.type = "button";
      searchCloseBtn.className = "icon-btn site-search-close";
      searchCloseBtn.setAttribute("aria-label", "Close search / অনুসন্ধান বন্ধ করুন");
      searchCloseBtn.textContent = "✕";
      bar.appendChild(searchCloseBtn);
      dialog.appendChild(bar);
      searchStatus = document.createElement("p");
      searchStatus.className = "site-search-status";
      searchStatus.setAttribute("role", "status");
      searchStatus.setAttribute("aria-live", "polite");
      dialog.appendChild(searchStatus);
      searchResults = document.createElement("div");
      searchResults.className = "site-search-results";
      dialog.appendChild(searchResults);
      searchOverlay.appendChild(dialog);
      document.body.appendChild(searchOverlay);
      searchCloseBtn.addEventListener("click", closeSearch);
      searchOverlay.addEventListener("click", function (event) {
        if (event.target === searchOverlay) closeSearch();
      });
      searchField.addEventListener("input", function () {
        if (searchTimer) clearTimeout(searchTimer);
        searchTimer = setTimeout(function () { runSearch(searchField.value); }, 150);
      });
      document.addEventListener("keydown", function (event) {
        if (!searchOverlay || searchOverlay.hidden) return;
        if (event.key === "Escape") { closeSearch(); return; }
        if (event.key !== "Tab") return;
        var focusable = dialog.querySelectorAll("input, button, a[href]");
        if (!focusable.length) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      });
    }

    function openSearch() {
      if (!searchOverlay) buildSearchOverlay();
      searchOpener = document.activeElement;
      searchOverlay.hidden = false;
      document.body.classList.add("menu-open");
      searchField.focus();
      if (!searchIndex && !searchLoading) {
        searchLoading = true;
        searchStatus.textContent = "Loading search data / অনুসন্ধানের তথ্য লোড হচ্ছে…";
        Promise.all([
          safeLoad("data/species/index.json"),
          safeLoad("data/taxonomy/taxa.json"),
          safeLoad("data/fish/index.json"),
          safeLoad("data/marine-life/index.json"),
          safeLoad("data/bangladesh/species.json"),
          safeLoad("data/projects.json"),
          safeLoad("data/thesis.json"),
          safeLoad("data/news.json"),
          safeLoad("data/blog.json"),
          safeLoad("data/fish/orders.json"),
          safeLoad("data/marine-life/classification.json")
        ]).then(function (data) {
          searchIndex = buildSearchIndex({
            species: data[0], taxonomy: data[1], fish: data[2], marine: data[3],
            bangladesh: data[4], projects: data[5], theses: data[6], news: data[7], blog: data[8],
            fishOrders: data[9], marineGroups: data[10]
          });
          searchLoading = false;
          runSearch(searchField.value);
        }).catch(function () {
          searchLoading = false;
          searchStatus.textContent = "Search unavailable / অনুসন্ধান অনুপলব্ধ";
        });
      } else {
        runSearch(searchField.value);
      }
    }

    function closeSearch() {
      if (!searchOverlay || searchOverlay.hidden) return;
      searchOverlay.hidden = true;
      document.body.classList.remove("menu-open");
      if (searchOpener && searchOpener.focus) searchOpener.focus();
    }

    function renderSearchResult(entry) {
      var card = document.createElement("a");
      card.className = "search-result-card";
      card.href = entry.url;
      var top = document.createElement("div");
      top.className = "search-result-top";
      var type = document.createElement("span");
      type.className = "badge badge-published";
      type.textContent = entry.type + (entry.typeBn ? " / " + entry.typeBn : "");
      top.appendChild(type);
      if (entry.review) {
        var review = document.createElement("span");
        review.className = "badge badge-needs-review";
        review.textContent = "Needs review / পর্যালোচনা প্রয়োজন";
        top.appendChild(review);
      }
      card.appendChild(top);
      var title = document.createElement("p");
      title.className = "search-result-title";
      title.textContent = entry.title;
      card.appendChild(title);
      if (entry.sub) {
        var sub = document.createElement("p");
        sub.className = "search-result-sub" + (entry.type === "Species" ? " scientific-name" : "");
        sub.textContent = entry.sub;
        card.appendChild(sub);
      }
      return card;
    }

    function runSearch(rawQuery) {
      if (!searchOverlay) return;
      var query = (rawQuery || "").trim().toLocaleLowerCase();
      searchResults.innerHTML = "";
      if (searchLoading) {
        searchStatus.textContent = "Loading search data / অনুসন্ধানের তথ্য লোড হচ্ছে…";
        return;
      }
      if (!searchIndex) {
        searchStatus.textContent = "Search unavailable / অনুসন্ধান অনুপলব্ধ";
        return;
      }
      if (!query) {
        searchStatus.textContent = searchIndex.length + " records indexed / টি রেকর্ড সূচিবদ্ধ — type to search / অনুসন্ধান করতে লিখুন";
        return;
      }
      var tokens = query.split(/\s+/).filter(Boolean);
      var matches = searchIndex.filter(function (entry) {
        return tokens.every(function (token) { return entry.text.indexOf(token) !== -1; });
      }).slice(0, 50);
      if (!matches.length) {
        searchStatus.textContent = "No results found / কোনো ফলাফল পাওয়া যায়নি";
        var empty = document.createElement("div");
        empty.className = "site-search-empty";
        empty.textContent = "—";
        searchResults.appendChild(empty);
        return;
      }
      searchStatus.textContent = matches.length + (matches.length === 50 ? "+" : "") + " results / টি ফলাফল";
      matches.forEach(function (entry) { searchResults.appendChild(renderSearchResult(entry)); });
    }

    searchButtons.forEach(function (button) {
      button.addEventListener("click", openSearch);
    });
  }

  /* ---------- Set current year ---------- */
  var yearEls = document.querySelectorAll("[data-year]");
  var year = new Date().getFullYear();
  yearEls.forEach(function (el) { el.textContent = year; });
})();
