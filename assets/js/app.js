/* Portfolio interactions — theme, mobile nav, reveal, back-to-top */
(function () {
  "use strict";

  /* ---- Theme (light / dark) with persistence ---- */
  var root = document.documentElement;
  var stored = localStorage.getItem("theme");
  if (stored) {
    root.setAttribute("data-theme", stored);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.setAttribute("data-theme", "dark");
  }

  function syncThemeIcon() {
    var isDark = root.getAttribute("data-theme") === "dark";
    document.querySelectorAll("[data-theme-icon]").forEach(function (el) {
      el.className = isDark ? "bi bi-sun" : "bi bi-moon-stars";
    });
  }
  syncThemeIcon();

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-theme-toggle]");
    if (!t) return;
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    syncThemeIcon();
  });

  /* ---- Mobile nav toggle ---- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-nav-toggle]");
    var links = document.querySelector(".nav__links");
    if (!links) return;
    if (btn) { links.classList.toggle("open"); return; }
    if (e.target.closest(".nav__links a")) links.classList.remove("open");
  });

  /* ---- Scroll reveal ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Back to top ---- */
  var topBtn = document.getElementById("topBtn");
  if (topBtn) {
    window.addEventListener("scroll", function () {
      topBtn.classList.toggle("show", window.scrollY > 400);
    }, { passive: true });
    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---- Footer year ---- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
