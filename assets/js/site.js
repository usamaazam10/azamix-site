/* Azamix — site behaviour. No dependencies. */
(function () {
  "use strict";

  var doc = document.documentElement;
  doc.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header: border on scroll ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    requestAnimationFrame(onScroll); // avoid a forced layout during startup
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.getElementById("mobile-menu");

  function setMenu(open, moveFocus) {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.hidden = !open;
    document.body.classList.toggle("menu-open", open);
    // Keep keyboard focus inside the header and menu while the menu covers the page
    document.querySelectorAll("main, .site-footer").forEach(function (el) {
      el.inert = open;
    });
    if (open && moveFocus) {
      var first = menu.querySelector("a");
      if (first) first.focus();
    }
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function (e) {
      // e.detail is 0 for keyboard activation: only then move focus into the menu
      setMenu(toggle.getAttribute("aria-expanded") !== "true", e.detail === 0);
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 960px)").addEventListener("change", function (mq) {
      if (mq.matches) setMenu(false);
    });
  }

  /* ---------- Active nav link for in-page sections (home only) ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__link[href^="/#"]'));
  if (navLinks.length && "IntersectionObserver" in window && document.body.dataset.page === "home") {
    var byId = {};
    navLinks.forEach(function (link) {
      var id = link.getAttribute("href").slice(2);
      var section = document.getElementById(id);
      if (section) byId[id] = link;
    });
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = byId[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { l.classList.remove("is-active"); });
            link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    Object.keys(byId).forEach(function (id) {
      spy.observe(document.getElementById(id));
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      reveals.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      reveals.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- Project inquiry form ----------
     Delivery: if the form has a data-endpoint (e.g. a Formspree URL), the
     inquiry is POSTed there as JSON. Without one, the visitor's email app
     opens with the inquiry pre-filled — we never show "sent" unless a
     server actually confirmed it. */
  var form = document.getElementById("inquiry-form");
  if (!form) return;

  form.noValidate = true; // we show our own validation messages
  var CONTACT_EMAIL = "usamaazam10@gmail.com";
  var endpoint = (form.getAttribute("data-endpoint") || "").trim();
  var startedAt = Date.now();
  var submitBtn = form.querySelector('[type="submit"]');
  var submitLabel = submitBtn ? submitBtn.innerHTML : "";
  var status = document.getElementById("form-status");

  // Pre-select a service from ?service=… (links on service pages use this)
  var params = new URLSearchParams(window.location.search);
  var preset = params.get("service");
  var serviceSelect = form.elements.namedItem("service");
  if (preset && serviceSelect) {
    Array.prototype.forEach.call(serviceSelect.options, function (opt) {
      if (opt.value === preset) serviceSelect.value = preset;
    });
  }

  var rules = {
    name: function (v) {
      if (!v) return "Please tell us your name.";
      if (v.length < 2) return "That name looks too short.";
      return "";
    },
    email: function (v) {
      if (!v) return "We need an email address to reply to you.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Please enter a valid email address, like name@company.com.";
      return "";
    },
    service: function (v) {
      return v ? "" : "Choose the closest match — you can explain the details below.";
    },
    message: function (v) {
      if (!v) return "Please describe your project in a few sentences.";
      if (v.length < 20) return "Please add a little more detail (at least 20 characters).";
      return "";
    }
  };

  function fieldValue(name) {
    var el = form.elements.namedItem(name);
    return el ? String(el.value || "").trim() : "";
  }

  function showError(name, message) {
    var el = form.elements.namedItem(name);
    var err = document.getElementById(name + "-error");
    if (!el || !err) return;
    err.textContent = message;
    if (message) {
      el.setAttribute("aria-invalid", "true");
    } else {
      el.removeAttribute("aria-invalid");
    }
  }

  function validate() {
    var firstInvalid = null;
    Object.keys(rules).forEach(function (name) {
      var msg = rules[name](fieldValue(name));
      showError(name, msg);
      if (msg && !firstInvalid) firstInvalid = form.elements.namedItem(name);
    });
    return firstInvalid;
  }

  // Re-validate a field once the visitor has interacted with it
  Object.keys(rules).forEach(function (name) {
    var el = form.elements.namedItem(name);
    if (!el) return;
    el.addEventListener("blur", function () {
      if (el.value.trim() || el.hasAttribute("aria-invalid")) showError(name, rules[name](fieldValue(name)));
    });
    el.addEventListener("input", function () {
      if (el.hasAttribute("aria-invalid")) showError(name, rules[name](fieldValue(name)));
    });
  });

  var icons = {
    error: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="10" cy="10" r="7.5"/><path d="M10 6.5v4M10 13.5h.01"/></svg>',
    success: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="10" r="7.5"/><path d="M6.8 10.2l2.2 2.2 4.2-4.6"/></svg>',
    info: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="10" cy="10" r="7.5"/><path d="M10 9v4.5M10 6.5h.01"/></svg>'
  };

  function setStatus(type, html) {
    if (!status) return;
    status.className = "form-status form-status--" + type;
    status.innerHTML = icons[type] + "<div>" + html + "</div>";
    status.hidden = false;
    status.setAttribute("role", type === "error" ? "alert" : "status");
  }

  function setBusy(busy) {
    if (!submitBtn) return;
    submitBtn.disabled = busy;
    submitBtn.setAttribute("aria-busy", String(busy));
    submitBtn.innerHTML = busy ? '<span class="spinner" aria-hidden="true"></span> Sending…' : submitLabel;
  }

  function collect() {
    var serviceLabel = serviceSelect && serviceSelect.selectedIndex > 0
      ? serviceSelect.options[serviceSelect.selectedIndex].text
      : "";
    return {
      name: fieldValue("name"),
      email: fieldValue("email"),
      company: fieldValue("company"),
      service: serviceLabel,
      timeline: fieldValue("timeline"),
      message: fieldValue("message")
    };
  }

  function openMailDraft(data) {
    var subject = "Project inquiry" + (data.service ? " — " + data.service : "") + " (" + data.name + ")";
    var lines = [
      data.message,
      "",
      "—",
      "Name: " + data.name,
      "Email: " + data.email
    ];
    if (data.company) lines.push("Company: " + data.company);
    if (data.service) lines.push("Service: " + data.service);
    if (data.timeline) lines.push("Timeline: " + data.timeline);
    var href = "mailto:" + CONTACT_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(lines.join("\n"));
    window.location.href = href;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (status) status.hidden = true;

    // Spam checks: hidden honeypot field, and submissions faster than a human could type
    var honeypot = fieldValue("website");
    if (honeypot || Date.now() - startedAt < 2500) {
      setStatus("error", "Something went wrong submitting the form. Please email us at <a href=\"mailto:" + CONTACT_EMAIL + "\">" + CONTACT_EMAIL + "</a>.");
      return;
    }

    var invalid = validate();
    if (invalid) {
      invalid.focus();
      setStatus("error", "Please fix the highlighted fields and try again.");
      return;
    }

    var data = collect();

    if (!endpoint) {
      openMailDraft(data);
      setStatus(
        "info",
        "Your email app should now open with this inquiry filled in — press <strong>Send</strong> there to reach us. " +
          "Nothing has been sent yet. If no email app opened, write to us directly at <a href=\"mailto:" + CONTACT_EMAIL + "\">" + CONTACT_EMAIL + "</a>."
      );
      return;
    }

    setBusy(true);
    var payload = Object.assign({}, data, { _subject: "New project inquiry from azamix.com" });
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        form.reset();
        startedAt = Date.now();
        setStatus("success", "<strong>Thanks, " + escapeHtml(data.name.split(" ")[0]) + " — your inquiry has been sent.</strong>");
      })
      .catch(function () {
        setStatus(
          "error",
          "We couldn't send your inquiry just now. Your details are still in the form — please try again, or email <a href=\"mailto:" + CONTACT_EMAIL + "\">" + CONTACT_EMAIL + "</a>."
        );
      })
      .then(function () {
        setBusy(false);
      });
  });

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
})();
