/*!
 * HakiUI — vanilla behaviour layer
 *
 * Progressive enhancement for the components that need JS. Pair with
 * hakiui.css and drop in with a plain script tag — no bundler required:
 *
 *   <link rel="stylesheet" href="hakiui.css" />
 *   <script src="hakiui.js" defer></script>
 *
 * Everything is opt-in via data attributes and wires up on DOMContentLoaded.
 * Call HakiUI.init(root) again after injecting markup dynamically; handlers
 * are idempotent, so re-initialising the same nodes is safe.
 *
 * Components that are pure CSS (button, badge, alert, input, progress, table,
 * switch, checkbox, radio, tooltip, breadcrumbs, skeleton, spinner) need
 * nothing from this file.
 */
(function (global) {
  "use strict";

  var INIT_FLAG = "__hakiBound";

  /** Bind once per element per behaviour, so init() can run repeatedly. */
  function once(el, key, fn) {
    var store = el[INIT_FLAG] || (el[INIT_FLAG] = {});
    if (store[key]) return false;
    store[key] = true;
    fn();
    return true;
  }

  function each(root, selector, fn) {
    Array.prototype.forEach.call(root.querySelectorAll(selector), fn);
  }

  // ------------------------------------------------------------------ tabs
  //
  // <div data-haki-tabs>
  //   <div class="haki-tabs__list" role="tablist">
  //     <button class="haki-tabs__tab" data-haki-tab="one" aria-selected="true">One</button>
  //   </div>
  //   <div class="haki-tabs__panel" data-haki-panel="one">…</div>
  // </div>
  function initTabs(root) {
    each(root, "[data-haki-tabs]", function (container) {
      once(container, "tabs", function () {
        var tabs = container.querySelectorAll("[data-haki-tab]");
        var panels = container.querySelectorAll("[data-haki-panel]");

        function select(id) {
          Array.prototype.forEach.call(tabs, function (tab) {
            var active = tab.getAttribute("data-haki-tab") === id;
            tab.setAttribute("aria-selected", active ? "true" : "false");
            tab.setAttribute("tabindex", active ? "0" : "-1");
          });
          Array.prototype.forEach.call(panels, function (panel) {
            panel.hidden = panel.getAttribute("data-haki-panel") !== id;
          });
          container.dispatchEvent(
            new CustomEvent("haki:tabchange", { detail: { id: id } }),
          );
        }

        Array.prototype.forEach.call(tabs, function (tab, index) {
          tab.setAttribute("role", "tab");
          tab.addEventListener("click", function () {
            select(tab.getAttribute("data-haki-tab"));
          });
          // Left/right arrows move between tabs, matching the ARIA pattern.
          tab.addEventListener("keydown", function (event) {
            if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
            event.preventDefault();
            var dir = event.key === "ArrowRight" ? 1 : -1;
            var next = tabs[(index + dir + tabs.length) % tabs.length];
            next.focus();
            select(next.getAttribute("data-haki-tab"));
          });
        });

        var initial = container.querySelector('[data-haki-tab][aria-selected="true"]');
        select(
          (initial || tabs[0] || {}).getAttribute
            ? (initial || tabs[0]).getAttribute("data-haki-tab")
            : null,
        );
      });
    });
  }

  // ------------------------------------------------------------- accordion
  //
  // <div class="haki-accordion" data-haki-accordion>            (add
  //   <div class="haki-accordion__item">                         data-haki-accordion="single"
  //     <button class="haki-accordion__trigger">Title</button>   to auto-close siblings)
  //     <div class="haki-accordion__panel" hidden>Body</div>
  function initAccordion(root) {
    each(root, "[data-haki-accordion]", function (container) {
      once(container, "accordion", function () {
        var single = container.getAttribute("data-haki-accordion") === "single";
        var triggers = container.querySelectorAll(".haki-accordion__trigger");

        Array.prototype.forEach.call(triggers, function (trigger) {
          var panel = trigger.nextElementSibling;
          if (!panel) return;
          var open = trigger.getAttribute("aria-expanded") === "true";
          trigger.setAttribute("aria-expanded", open ? "true" : "false");
          panel.hidden = !open;

          trigger.addEventListener("click", function () {
            var nowOpen = trigger.getAttribute("aria-expanded") !== "true";
            if (nowOpen && single) {
              Array.prototype.forEach.call(triggers, function (other) {
                if (other === trigger) return;
                other.setAttribute("aria-expanded", "false");
                if (other.nextElementSibling) other.nextElementSibling.hidden = true;
              });
            }
            trigger.setAttribute("aria-expanded", nowOpen ? "true" : "false");
            panel.hidden = !nowOpen;
          });
        });
      });
    });
  }

  // ----------------------------------------------------------------- modal
  //
  // <button data-haki-modal-open="confirm">Open</button>
  // <div class="haki-modal" id="confirm" hidden> … [data-haki-modal-close] … </div>
  function initModal(root) {
    each(root, "[data-haki-modal-open]", function (trigger) {
      once(trigger, "modalOpen", function () {
        trigger.addEventListener("click", function () {
          var modal = document.getElementById(
            trigger.getAttribute("data-haki-modal-open"),
          );
          if (modal) openModal(modal, trigger);
        });
      });
    });

    each(root, ".haki-modal", function (modal) {
      once(modal, "modal", function () {
        modal.addEventListener("click", function (event) {
          if (
            event.target.closest("[data-haki-modal-close]") ||
            event.target.classList.contains("haki-modal__backdrop")
          ) {
            closeModal(modal);
          }
        });
      });
    });
  }

  var lastModalTrigger = null;

  function openModal(modal, trigger) {
    lastModalTrigger = trigger || null;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    var focusable = modal.querySelector(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
    );
    if (focusable) focusable.focus();
  }

  function closeModal(modal) {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastModalTrigger) lastModalTrigger.focus();
    lastModalTrigger = null;
  }

  // -------------------------------------------------------------- dropdown
  //
  // <div class="haki-dropdown" data-haki-dropdown>
  //   <button data-haki-dropdown-trigger>Select…</button>
  //   <div data-haki-dropdown-menu hidden>
  //     <button data-haki-dropdown-item="a">Option A</button>
  function initDropdown(root) {
    each(root, "[data-haki-dropdown]", function (container) {
      once(container, "dropdown", function () {
        var trigger = container.querySelector("[data-haki-dropdown-trigger]");
        var menu = container.querySelector("[data-haki-dropdown-menu]");
        if (!trigger || !menu) return;

        function close() {
          menu.hidden = true;
          trigger.setAttribute("aria-expanded", "false");
        }
        function open() {
          closeAllDropdowns();
          menu.hidden = false;
          trigger.setAttribute("aria-expanded", "true");
        }

        trigger.setAttribute("aria-haspopup", "listbox");
        trigger.setAttribute("aria-expanded", "false");
        menu.hidden = true;

        trigger.addEventListener("click", function (event) {
          event.stopPropagation();
          if (menu.hidden) open();
          else close();
        });

        each(container, "[data-haki-dropdown-item]", function (item) {
          item.addEventListener("click", function () {
            var value = item.getAttribute("data-haki-dropdown-item");
            var label = container.querySelector("[data-haki-dropdown-value]");
            if (label) label.textContent = item.textContent.trim();
            container.setAttribute("data-value", value);
            close();
            container.dispatchEvent(
              new CustomEvent("haki:change", { detail: { value: value } }),
            );
          });
        });

        container.__hakiCloseDropdown = close;
      });
    });
  }

  function closeAllDropdowns() {
    each(document, "[data-haki-dropdown]", function (el) {
      if (el.__hakiCloseDropdown) el.__hakiCloseDropdown();
    });
  }

  // ------------------------------------------------- input password reveal
  //
  // <button data-haki-password-toggle="pw">Show</button> next to <input id="pw">
  function initPasswordToggle(root) {
    each(root, "[data-haki-password-toggle]", function (button) {
      once(button, "password", function () {
        button.addEventListener("click", function () {
          var input = document.getElementById(
            button.getAttribute("data-haki-password-toggle"),
          );
          if (!input) return;
          var reveal = input.type === "password";
          input.type = reveal ? "text" : "password";
          button.setAttribute("aria-pressed", reveal ? "true" : "false");
        });
      });
    });
  }

  // --------------------------------------------------------------- stepper
  //
  // <div data-haki-stepper data-min="0" data-max="99" data-step="1">
  //   <button data-haki-stepper-dec>−</button>
  //   <input data-haki-stepper-input value="1" />
  //   <button data-haki-stepper-inc>+</button>
  function initStepper(root) {
    each(root, "[data-haki-stepper]", function (container) {
      once(container, "stepper", function () {
        var input = container.querySelector("[data-haki-stepper-input]");
        if (!input) return;
        var min = Number(container.getAttribute("data-min"));
        var max = Number(container.getAttribute("data-max"));
        var step = Number(container.getAttribute("data-step")) || 1;
        if (isNaN(min)) min = -Infinity;
        if (isNaN(max)) max = Infinity;

        function nudge(delta) {
          var next = (Number(input.value) || 0) + delta;
          next = Math.min(max, Math.max(min, next));
          input.value = String(next);
          container.dispatchEvent(
            new CustomEvent("haki:change", { detail: { value: next } }),
          );
        }

        var dec = container.querySelector("[data-haki-stepper-dec]");
        var inc = container.querySelector("[data-haki-stepper-inc]");
        if (dec) dec.addEventListener("click", function () { nudge(-step); });
        if (inc) inc.addEventListener("click", function () { nudge(step); });
      });
    });
  }

  // ----------------------------------------------------------------- toast
  //
  // HakiUI.toast("Saved", { variant: "success" })
  var toastHost = null;

  function ensureToastHost() {
    if (toastHost && document.body.contains(toastHost)) return toastHost;
    toastHost = document.createElement("div");
    toastHost.className = "haki-toast-host";
    toastHost.setAttribute("role", "status");
    toastHost.setAttribute("aria-live", "polite");
    toastHost.style.cssText =
      "position:fixed;bottom:1rem;right:1rem;z-index:9999;display:flex;flex-direction:column;gap:.5rem;";
    document.body.appendChild(toastHost);
    return toastHost;
  }

  function toast(message, options) {
    options = options || {};
    var host = ensureToastHost();
    var el = document.createElement("div");
    el.className =
      "haki-alert" + (options.variant ? " haki-alert--" + options.variant : "");
    el.style.cssText =
      "min-width:16rem;box-shadow:0 10px 15px -3px rgb(0 0 0 / .1);transition:opacity .2s ease,transform .2s ease;opacity:0;transform:translateY(.5rem);";
    el.innerHTML =
      '<div class="haki-alert__body">' +
      (options.title ? '<div class="haki-alert__title"></div>' : "") +
      '<div class="haki-alert__desc"></div></div>';
    if (options.title) el.querySelector(".haki-alert__title").textContent = options.title;
    el.querySelector(".haki-alert__desc").textContent = message;
    host.appendChild(el);

    requestAnimationFrame(function () {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });

    var duration = options.duration == null ? 3200 : options.duration;
    if (duration > 0) {
      setTimeout(function () {
        el.style.opacity = "0";
        el.style.transform = "translateY(.5rem)";
        setTimeout(function () {
          if (el.parentNode) el.parentNode.removeChild(el);
        }, 250);
      }, duration);
    }
    return el;
  }

  // ---------------------------------------------------------------- global
  function initGlobalListeners() {
    once(document, "globals", function () {
      document.addEventListener("click", function () {
        closeAllDropdowns();
      });
      document.addEventListener("keydown", function (event) {
        if (event.key !== "Escape") return;
        closeAllDropdowns();
        each(document, ".haki-modal", function (modal) {
          if (!modal.hidden) closeModal(modal);
        });
      });
    });
  }

  function init(root) {
    root = root || document;
    initTabs(root);
    initAccordion(root);
    initModal(root);
    initDropdown(root);
    initPasswordToggle(root);
    initStepper(root);
    initGlobalListeners();
    return root;
  }

  var HakiUI = {
    init: init,
    toast: toast,
    openModal: openModal,
    closeModal: closeModal,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      init(document);
    });
  } else {
    init(document);
  }

  global.HakiUI = HakiUI;
  if (typeof module === "object" && module.exports) module.exports = HakiUI;
})(typeof globalThis !== "undefined" ? globalThis : window);
