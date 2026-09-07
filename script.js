// ============================================
// ClickSite — animaciones e interacción
// ============================================

document.addEventListener("DOMContentLoaded", function () {

  // --- Saludo dinámico en enlaces de WhatsApp ---
  function saludoSegunHora() {
    var hora = new Date().getHours();
    if (hora < 12) return "buenos días";
    if (hora < 19) return "buenas tardes";
    return "buenas noches";
  }
  var saludo = encodeURIComponent(saludoSegunHora());
  document.querySelectorAll('a[href*="wa.me"]').forEach(function (link) {
    link.href = link.href.replace(/buenas%20(tardes|d%C3%ADas|noches)/, saludo);
  });

  // --- Marca el link de navegación activo según la página actual ---
  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("is-active");
    }
  });

  // --- Reveal al hacer scroll, con pequeño stagger por contenedor ---
  var revealEls = document.querySelectorAll(".reveal-scroll");
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  // --- Línea de dimensión: la barra se dibuja al entrar en pantalla ---
  var dimTracks = document.querySelectorAll(".dim-track");
  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    var dimObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("dim-fill-visible");
          dimObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    dimTracks.forEach(function (el) { dimObserver.observe(el); });
  } else {
    dimTracks.forEach(function (el) { el.classList.add("dim-fill-visible"); });
  }

  // --- Transición suave de entrada de página ---
  document.body.classList.add("page-ready");
});