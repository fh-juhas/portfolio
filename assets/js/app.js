/* Query Console portfolio — theme · nav · reveal · contact form
   No dependencies. */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- Theme (light / dark) with persistence ---------- */
  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) { /* private mode */ }

  if (stored === "light" || stored === "dark") {
    root.setAttribute("data-theme", stored);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.setAttribute("data-theme", "dark");
  }

  function syncThemeIcon() {
    var isDark = root.getAttribute("data-theme") === "dark";
    document.querySelectorAll("[data-theme-icon]").forEach(function (el) {
      var use = el.querySelector("use");
      if (use) use.setAttribute("href", isDark ? "#i-sun" : "#i-moon");
    });
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-theme-toggle]");
    if (!t) return;
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (err) { /* ignore */ }
    syncThemeIcon();
  });

  /* ---------- Mobile nav ---------- */
  document.addEventListener("click", function (e) {
    var panel = document.querySelector("[data-nav-panel]");
    if (!panel) return;
    var btn = e.target.closest("[data-nav-toggle]");
    if (btn) {
      var open = panel.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      return;
    }
    if (e.target.closest("[data-nav-panel] a")) panel.classList.remove("open");
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduced && "IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Contact form → opens the visitor's mail app ---------- */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (form.elements.name.value || "").trim();
      var email = (form.elements.email.value || "").trim();
      var msg = (form.elements.message.value || "").trim();

      var subject = "Portfolio message from " + (name || "a visitor");
      var body = msg + "\n\n— " + name + (email ? " · " + email : "");

      window.location.href =
        "mailto:fh.juhas@outlook.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      var hint = form.querySelector(".insert__hint");
      if (hint) hint.textContent = "-- query sent to your mail app · 1 row affected";
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  syncThemeIcon();
})();
