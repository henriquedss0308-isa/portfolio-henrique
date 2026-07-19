/**
 * ============================================================
 * CONFIGURAÇÃO DE CONTATO — edite apenas esta seção
 * ============================================================
 * Fonte principal dos links de contato. O HTML usa os mesmos valores
 * para funcionar sem JavaScript; se alterar aqui, atualize o HTML também
 * (ou deixe o JS sobrescrever no carregamento).
 *
 * Se um valor contiver "COLOCAR_", o botão fica desativado.
 */
const contactLinks = {
  whatsapp: "https://wa.me/5517996712837",
  instagram: "https://www.instagram.com/henrique_santoszxs",
  email: "mailto:henrique.dss0308@gmail.com",
  github: "https://github.com/henriquedss0308-isa",
};

/**
 * ============================================================
 * CONFIGURAÇÃO DOS PROJETOS (referência)
 * ============================================================
 * Os cards de projetos estão no HTML (index.html, seção #projetos).
 * Para alterar links, textos ou imagens, edite cada <article class="project-card">.
 *
 * Imagens em assets/projetos/:
 *   - landing-psicologa.png
 *   - orca-facil.png
 *   - agenda-simples.png
 *   - visao-comercial.png
 *   - menu-zap.jpg
 *
 * Proporção atual dos screenshots: ~20:9 (ex.: 1366×610).
 * ============================================================
 */

(function () {
  "use strict";

  /* ---------- Ano do footer ---------- */
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------- Contatos ---------- */
  function isPlaceholder(value) {
    if (!value || typeof value !== "string") return true;
    const trimmed = value.trim();
    if (!trimmed || trimmed === "#" || trimmed === "mailto:") return true;
    return /COLOCAR_/i.test(trimmed);
  }

  function initContactLinks() {
    const buttons = document.querySelectorAll("[data-contact]");
    let hasDisabled = false;

    buttons.forEach(function (btn) {
      const key = btn.getAttribute("data-contact");
      const url = contactLinks[key];

      if (!isPlaceholder(url)) {
        btn.setAttribute("href", url);
        btn.removeAttribute("aria-disabled");
        btn.classList.remove("is-disabled");

        if (key === "email") {
          btn.removeAttribute("target");
          btn.removeAttribute("rel");
        } else {
          btn.setAttribute("target", "_blank");
          btn.setAttribute("rel", "noopener noreferrer");
        }
      } else {
        btn.setAttribute("href", "#");
        btn.setAttribute("aria-disabled", "true");
        btn.classList.add("is-disabled");
        btn.addEventListener("click", function (e) {
          e.preventDefault();
        });
        hasDisabled = true;
      }
    });

    const note = document.getElementById("contact-note");
    if (note && hasDisabled) {
      note.hidden = false;
    }
  }

  /* ---------- Menu mobile ---------- */
  function initMobileMenu() {
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      nav.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    }

    toggle.addEventListener("click", function () {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      setOpen(!isOpen);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) setOpen(false);
    });
  }

  /* ---------- Fallback de imagens dos projetos ---------- */
  function initImageFallbacks() {
    const images = document.querySelectorAll(".project-card__image");

    images.forEach(function (img) {
      const wrap = img.closest(".project-card__image-wrap");
      const card = img.closest(".project-card");
      const title = card
        ? card.querySelector(".project-card__title")
        : null;
      const label = title ? title.textContent.trim() : "Projeto";

      function showFallback() {
        img.classList.add("is-hidden");
        img.setAttribute("aria-hidden", "true");
        if (wrap) {
          wrap.classList.add("is-fallback");
          wrap.setAttribute("data-fallback", label);
        }
      }

      if (img.complete && img.naturalWidth === 0) {
        showFallback();
      }

      img.addEventListener("error", showFallback);
    });
  }

  /* ---------- Navegação suave (reforço para browsers antigos) ---------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        const id = anchor.getAttribute("href");
        if (!id || id === "#") return;

        const target = document.querySelector(id);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });

        if (history.pushState) {
          history.pushState(null, "", id);
        }
      });
    });
  }

  /* ---------- Header: sombra ao rolar (sutil) ---------- */
  function initHeaderScroll() {
    const header = document.getElementById("header");
    if (!header) return;

    function update() {
      if (window.scrollY > 8) {
        header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.25)";
      } else {
        header.style.boxShadow = "none";
      }
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initContactLinks();
    initMobileMenu();
    initImageFallbacks();
    initSmoothScroll();
    initHeaderScroll();
  });
})();
