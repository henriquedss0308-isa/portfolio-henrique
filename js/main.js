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
 * O primeiro card usa a classe extra `project-card--featured` (layout em
 * destaque, imagem ao lado do texto). Para destacar outro projeto, mova
 * essa classe e a tag <span class="project-card__flag">Destaque</span>.
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

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

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
      const title = card ? card.querySelector(".project-card__title") : null;
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
        target.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });

        if (history.pushState) {
          history.pushState(null, "", id);
        }
      });
    });
  }

  /* ---------- Header: estado ao rolar + barra de progresso ---------- */
  function initHeaderScroll() {
    const header = document.getElementById("header");
    const progress = document.getElementById("scroll-progress");
    if (!header && !progress) return;

    let ticking = false;

    function update() {
      ticking = false;

      if (header) {
        header.classList.toggle("is-scrolled", window.scrollY > 8);
      }

      if (progress) {
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        progress.style.transform = "scaleX(" + ratio + ")";
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  }

  /* ---------- Animação de entrada dos elementos ---------- */
  function initReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    // Aplica o atraso escalonado declarado no HTML (data-reveal-delay="1", "2"...)
    items.forEach(function (el) {
      const delay = el.getAttribute("data-reveal-delay");
      if (delay) el.style.setProperty("--reveal-delay", delay);
    });

    // Desliga o sistema de reveal por completo: remove o estado oculto sem
    // depender de transição CSS (que pode nunca rodar em alguns ambientes).
    function desligarReveal() {
      document.documentElement.classList.add("reveal-off");
    }

    // Sem IntersectionObserver (ou com movimento reduzido): mostra tudo
    if (!("IntersectionObserver" in window) || prefersReducedMotion) {
      desligarReveal();
      return;
    }

    // A animação é um "plus": se o observer não responder (aba em segundo
    // plano, renderizadores que não compõem quadros, extensões), o conteúdo
    // ficaria invisível. Esta rede de segurança garante que isso nunca ocorra.
    let observerRespondeu = false;

    const observer = new IntersectionObserver(
      function (entries) {
        observerRespondeu = true;
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });

    window.setTimeout(function () {
      if (!observerRespondeu) {
        observer.disconnect();
        desligarReveal();
      }
    }, 1200);
  }

  /* ---------- Link ativo na navegação (scrollspy) ---------- */
  function initScrollSpy() {
    const links = Array.prototype.slice.call(
      document.querySelectorAll(".nav__link")
    );
    if (!links.length || !("IntersectionObserver" in window)) return;

    const sections = links
      .map(function (link) {
        const id = link.getAttribute("href");
        return id && id.startsWith("#") ? document.querySelector(id) : null;
      })
      .filter(Boolean);

    if (!sections.length) return;

    function setActive(id) {
      links.forEach(function (link) {
        link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
      });
    }

    const visible = new Set();

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        });

        // Marca a primeira seção visível na ordem do documento
        const current = sections.find(function (section) {
          return visible.has(section.id);
        });

        if (current) setActive(current.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ---------- Brilho que segue o cursor nos cards ---------- */
  function initCardGlow() {
    if (prefersReducedMotion) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    document.querySelectorAll(".card-glow").forEach(function (card) {
      card.addEventListener(
        "pointermove",
        function (e) {
          const rect = card.getBoundingClientRect();
          card.style.setProperty("--mx", e.clientX - rect.left + "px");
          card.style.setProperty("--my", e.clientY - rect.top + "px");
        },
        { passive: true }
      );
    });
  }

  /* ---------- Inclinação sutil dos cards de projeto ---------- */
  function initTilt() {
    if (prefersReducedMotion) return;
    if (!window.matchMedia("(hover: hover) and (min-width: 901px)").matches) return;

    const MAX = 4; // graus

    document.querySelectorAll("[data-tilt]").forEach(function (card) {
      card.addEventListener(
        "pointermove",
        function (e) {
          const rect = card.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;

          card.style.transform =
            "translateY(-6px) perspective(900px) rotateX(" +
            (-py * MAX).toFixed(2) +
            "deg) rotateY(" +
            (px * MAX).toFixed(2) +
            "deg)";
        },
        { passive: true }
      );

      card.addEventListener("pointerleave", function () {
        card.style.transform = "";
      });
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initContactLinks();
    initMobileMenu();
    initImageFallbacks();
    initSmoothScroll();
    initHeaderScroll();
    initReveal();
    initScrollSpy();
    initCardGlow();
    initTilt();
  });
})();
