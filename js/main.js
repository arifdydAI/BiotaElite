/* ============================================================
   Zoology Educational Website - main.js
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var open = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.innerHTML = open ? "\u2715" : "\u2630";
    });
    document.addEventListener("click", function (e) {
      if (
        mainNav.classList.contains("open") &&
        !mainNav.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.innerHTML = "\u2630";
      }
    });
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

  /* ---------- Contact form (fake submit) ---------- */
  var contactForm = document.querySelector("[data-contact]");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var fields = contactForm.querySelectorAll("input, textarea");
      var ok = true;
      fields.forEach(function (f) {
        if (f.hasAttribute("required") && !f.value.trim()) ok = false;
      });
      if (!ok) {
        showToast("Please fill in all required fields.");
        return;
      }
      contactForm.reset();
      showToast("Message sent! We'll get back to you soon. \u2709");
    });
  }

  /* ---------- Set current year ---------- */
  var yearEls = document.querySelectorAll("[data-year]");
  var year = new Date().getFullYear();
  yearEls.forEach(function (el) { el.textContent = year; });
})();
