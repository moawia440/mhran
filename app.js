"use strict";

/* =====================[ SETTINGS ]===================== */
const SETTINGS = {
  currency: "جنيه",
  adminPin: "2580", // غيّره فورًا
  defaultAdminWhatsApp: "201000051078",
  defaultAdminEmail: "admin@example.com",
  heroFitMode: "contain", // "contain" or "cover"
  splashMinMs: 950, // أقل مدة تظهر فيها شاشة التحميل
};
/* ====================================================== */

/* =====================[ DATA ]========================= */
const HERO_IMAGES = [
  { src: "assets/imge1.jpg", alt: "واجهة 1" },
  { src: "assets/imge2.jpg", alt: "واجهة 2" },
  { src: "assets/imge3.jpg", alt: "واجهة 3" },
  { src: "assets/imge4.jpg", alt: "واجهة 4" },
  { src: "assets/imge5.jpg", alt: "واجهة 5" },
  { src: "assets/imge6.jpg", alt: "واجهة 6" },
  { src: "assets/imge7.jpg", emphasize: true, alt: "واجهة 7" },
  { src: "assets/imge8.jpg", alt: "واجهة 8" },
];

const BOOKS = [
  {
    id: "b1",
    title: "حماية العقول الصغيرة",
    desc: "ويليه منزل بين الحطام.",
    cover: "assets/imge3.jpg",
    specs: ["مقاس: 14×21", "غلاف: كوشيه 250 + سلوفان مط", "تجليد: حراري"],
    about: "نبذة مختصرة عن الإصدار…",
    tag: "إسلامي",
  },
  {
    id: "b2",
    title: "أهل السنة",
    desc: "بين حتمية الاجتماع وضرر الاتفاق.",
    cover: "assets/imge5.jpg",
    specs: ["مقاس: A5", "غلاف: 300", "تجليد: حراري"],
    about: "نبذة مختصرة…",
    tag: "ناشئة",
  },
  {
    id: "b3",
    title: "رسالة في البحث علي",
    desc: "اجتماع كلمة المسلمين.",
    cover: "assets/imge6.jpg",
    specs: ["مقاس: 14×21", "ورق: أوفست 80", "تجليد: حراري"],
    about: "نبذة مختصرة…",
    tag: "وعي",
  },
  {
    id: "b4",
    title: "اتحاف المسلمين",
    desc: "بما جاء في الصبر والصابرين.",
    cover: "assets/imge10.jpg",
    specs: ["مقاس: B5", "غلاف: 250", "سلوفان: لامع"],
    about: "نبذة مختصرة…",
    tag: "عام",
  },
];

const VIDEO_RELEASES = [
  {
    id: "v1",
    title: "حماية العقول الصغيرة",
    desc: "مقطع 7 ثواني.",
    src: "assets/v1.mp4",
    poster: "assets/imge3.jpg",
  },
  {
    id: "v2",
    title: "رد المحتار عن التفكير في الانتحار",
    desc: "مقطع 7 ثواني.",
    src: "assets/v2.mp4",
    poster: "assets/imge11.jpg",
  },
];

const OFFERS = [
  {
    icon: "🚚",
    title: "شحن مجاني للطلبات الكبيرة",
    text: "شحن مجاني عند تجاوز مشترياتك 1000 جنيه داخل مصر — تجربة شراء أسهل وأسرع.",
  },
  {
    icon: "🎁",
    title: "خصم الباقات المميزة",
    text: "خصم تصاعدي عند شراء باقات مختارة — وفّر أكثر كلما زادت الكمية.",
  },
  {
    icon: "⏱️",
    title: "تجهيز سريع للإصدارات المتاحة",
    text: "تسليم سريع للإصدارات الجاهزة — مناسب للطلبات المستعجلة وفق جدول التشغيل.",
  },
  {
    icon: "🏷️",
    title: "أسعار خاصة للمكتبات والجهات",
    text: "عروض مخصصة للمكتبات والجهات — تسعير مرن وتجهيز توزيع منظم.",
  },
];

const FAIRS_MEDIA = [
  {
    id: "m1",
    type: "image",
    tag: "local",
    title: "معرض محلي – صورة 1",
    desc: "لقطة من جناح المعرض المحلي.",
    src: "assets/imge12.jpg",
  },

  {
    id: "m3",
    type: "image",
    tag: "international",
    title: "معرض دولي – صورة 1",
    desc: "مشاركة دولية متميزة.",
    src: "assets/imge13.jpg",
  },
  {
    id: "m1",
    type: "image",
    tag: "local",
    title: "معرض محلي – صورة 1",
    desc: "لقطة من جناح المعرض المحلي.",
    src: "assets/imge14.jpg",
  },
  {
    id: "m1",
    type: "image",
    tag: "local",
    title: "معرض محلي – صورة 1",
    desc: "لقطة من جناح المعرض المحلي.",
    src: "assets/imge15.jpg",
  },
];

/* =====================[ PRICING RATES ]================ */
const RATES = {
  paperPerCopy: {
    offset_70: 1.8,
    offset_80: 2.1,
    cream_80: 2.3,
    other: 2.3,
    coated_250: 1.3,
    coated_300: 1.6,
    cover_other: 1.6,
  },
  bindingPerCopy: { perfect: 2.8, staple: 1.2, hardcover: 18.0 },
  laminationPerCopy: { none: 0, matte: 1.2, gloss: 1.1 },
  proofFixed: 275,
  shippingFixed: 50,
  distributionFixed: 250,
  distributionPerCopy: 0.5,
  fairsFixedDefault: { none: 0, local: 400, international: 1200, both: 1500 },
  adminPct: 6,
  insideColorFactor: { 1: 1.0, 2: 1.2, 4: 2.2 },
  coverColorFactor: { 1: 1.0, 4: 1.8 },
};

/* =====================[ HELPERS ]====================== */
function $(sel, root) {
  return (root || document).querySelector(sel);
}
function $$(sel, root) {
  return Array.prototype.slice.call((root || document).querySelectorAll(sel));
}
function on(el, ev, fn, opts) {
  if (!el) return;
  el.addEventListener(ev, fn, opts || false);
}

function setText(idOrEl, text) {
  const el = typeof idOrEl === "string" ? $(idOrEl) : idOrEl;
  if (el) el.textContent = text;
}
function setHTML(idOrEl, html) {
  const el = typeof idOrEl === "string" ? $(idOrEl) : idOrEl;
  if (el) el.innerHTML = html;
}
function money(n) {
  const x = Number(n);
  const v = Number.isFinite(x) ? x : 0;
  return v.toFixed(2) + " " + SETTINGS.currency;
}
function encodeWA(text) {
  return encodeURIComponent(text);
}

/* =====================[ STATE ]======================== */
const STATE = { isAdmin: false, approved: false, last: null };

/* =====================[ SPLASH VIP ]=================== */
function initSplash() {
  const splash = $("#bootSplash");
  if (!splash) return;

  const start = performance.now();

  function out() {
    const elapsed = performance.now() - start;
    const wait = Math.max(0, SETTINGS.splashMinMs - elapsed);
    setTimeout(() => {
      splash.classList.add("is-out");
      splash.setAttribute("aria-hidden", "true");
      // remove from DOM after anim
      setTimeout(() => {
        if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
      }, 750);
    }, wait);
  }

  // hide on window load (images+assets) or after a short fallback
  window.addEventListener("load", out, { once: true });
  setTimeout(out, 2600);
}

/* =====================[ THEME ]======================== */
function initTheme() {
  const btn = $("#themeBtn");
  const key = "firdous_theme";
  const saved = localStorage.getItem(key);
  if (saved === "light")
    document.documentElement.setAttribute("data-theme", "light");

  on(btn, "click", function () {
    const isLight =
      document.documentElement.getAttribute("data-theme") === "light";
    if (isLight) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem(key, "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem(key, "light");
    }
  });
}

/* =====================[ MOBILE MENU ]================== */
function initMobileMenu() {
  const hambBtn = $("#hambBtn");
  const mobileNav = $("#mobileNav");
  on(hambBtn, "click", function () {
    if (!mobileNav) return;
    mobileNav.classList.toggle("is-hidden");
  });
  $$("#mobileNav a").forEach(function (a) {
    on(a, "click", function () {
      if (mobileNav) mobileNav.classList.add("is-hidden");
    });
  });
}

/* =====================[ SCROLLBAR ]==================== */
function initScrollbar() {
  const bar = $("#scrollbar");
  if (!bar) return;

  function update() {
    const h = document.documentElement;
    const sc = h.scrollTop || document.body.scrollTop || 0;
    const max = h.scrollHeight - h.clientHeight || 1;
    const pct = Math.max(0, Math.min(100, (sc / max) * 100));
    bar.style.width = pct + "%";
  }

  on(window, "scroll", update, { passive: true });
  update();
}

/* =====================[ MODALS ]======================= */
function openGenericModal(title, html, actionsHTML) {
  const modal = $("#modal");
  if (!modal) return;
  setText("#modalTitle", title || "تنبيه");
  setHTML("#modalBody", html || "");
  setHTML("#modalActions", actionsHTML || "");
  modal.setAttribute("aria-hidden", "false");
}
function closeGenericModal() {
  const modal = $("#modal");
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
  setHTML("#modalActions", "");
}
function openBookModal(title, html) {
  const modal = $("#bookModal");
  if (!modal) return;
  setText("#bookTitle", title || "تفاصيل الإصدار");
  setHTML("#bookBody", html || "");
  modal.setAttribute("aria-hidden", "false");
}
function openMediaModal(title, html) {
  const modal = $("#mediaModal");
  if (!modal) return;
  setText("#mediaTitle", title || "وسائط");
  setHTML("#mediaBody", html || "");
  modal.setAttribute("aria-hidden", "false");
}
function initModals() {
  $$("#bookModal [data-close-book]").forEach((el) =>
    on(el, "click", () => $("#bookModal")?.setAttribute("aria-hidden", "true")),
  );
  $$("#modal [data-close]").forEach((el) =>
    on(el, "click", () => $("#modal")?.setAttribute("aria-hidden", "true")),
  );

  $$("#mediaModal [data-close-media]").forEach((el) =>
    on(el, "click", function () {
      const m = $("#mediaModal");
      if (!m) return;
      const v = $("video", m);
      if (v && typeof v.pause === "function") v.pause();
      m.setAttribute("aria-hidden", "true");
    }),
  );

  on(document, "keydown", function (e) {
    if (e.key !== "Escape") return;
    $("#bookModal")?.setAttribute("aria-hidden", "true");
    $("#modal")?.setAttribute("aria-hidden", "true");
    const mm = $("#mediaModal");
    if (mm) {
      const v = $("video", mm);
      if (v) v.pause();
      mm.setAttribute("aria-hidden", "true");
    }
  });
}

/* =====================[ HERO SLIDER ]================== */
function initHeroSlider() {
  const frame = $("#heroFrame");
  const stage = $("#heroStage");
  const dotsWrap = $("#heroDots");
  const nextBtn = $("#heroNext");
  const prevBtn = $("#heroPrev");
  if (!frame || !stage || !dotsWrap) return;

  if (SETTINGS.heroFitMode === "cover") frame.classList.add("coverMode");
  else frame.classList.remove("coverMode");

  let idx = 0;
  let timer = null;

  stage.innerHTML = HERO_IMAGES.map(function (it, i) {
    return (
      '<figure class="heroSlide ' +
      (i === 0 ? "is-active" : "") +
      '" data-idx="' +
      i +
      '">' +
      '<img class="heroSlide__img" src="' +
      it.src +
      '" alt="' +
      (it.alt || "Hero") +
      '" loading="' +
      (i === 0 ? "eager" : "lazy") +
      '" />' +
      "</figure>"
    );
  }).join("");

  function renderDots() {
    dotsWrap.innerHTML = HERO_IMAGES.map(
      (_, i) =>
        '<span class="dot ' +
        (i === idx ? "is-active" : "") +
        '" data-dot="' +
        i +
        '"></span>',
    ).join("");

    $$(".dot", dotsWrap).forEach((d) =>
      on(d, "click", () => {
        go(Number(d.getAttribute("data-dot")));
        restart();
      }),
    );
  }

  function go(next) {
    const slides = $$(".heroSlide", stage);
    if (!slides.length) return;
    const old = idx;
    idx = (next + slides.length) % slides.length;
    slides[old]?.classList.remove("is-active");
    slides[idx]?.classList.add("is-active");
    renderDots();
  }

  function next() {
    go(idx + 1);
  }
  function prev() {
    go(idx - 1);
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
  function start() {
    stop();
    timer = setInterval(next, 5000);
  }
  function restart() {
    start();
  }

  on(nextBtn, "click", () => {
    next();
    restart();
  });
  on(prevBtn, "click", () => {
    prev();
    restart();
  });
  on(frame, "mouseenter", stop);
  on(frame, "mouseleave", start);
  on(frame, "touchstart", stop, { passive: true });
  on(frame, "touchend", start, { passive: true });

  renderDots();
  start();
}

/* =====================[ BOOKS ]======================== */
function renderBooks() {
  const grid = $("#booksGrid");
  if (!grid) return;

  grid.innerHTML = BOOKS.map(
    (b) =>
      '<article class="bookCard" data-id="' +
      b.id +
      '" role="button" tabindex="0" aria-label="فتح ' +
      b.title +
      '">' +
      '<img class="bookThumb" src="' +
      b.cover +
      '" alt="' +
      b.title +
      '" loading="lazy" />' +
      '<div class="bookMeta">' +
      "<h3>" +
      b.title +
      "</h3>" +
      "<p>" +
      b.desc +
      "</p>" +
      '<div class="pill">' +
      (b.tag || "") +
      "</div>" +
      "</div>" +
      "</article>",
  ).join("");

  function openBook(id) {
    const b = BOOKS.find((x) => x.id === id);
    if (!b) return;

    const specs = (b.specs || []).map((s) => "<li>" + s + "</li>").join("");
    const html =
      '<div class="viewer">' +
      '<div class="viewerBox"><img src="' +
      b.cover +
      '" alt="' +
      b.title +
      '" /></div>' +
      '<div class="viewerText">' +
      "<p><strong>نبذة</strong></p>" +
      '<p class="muted">' +
      (b.about || "—") +
      "</p>" +
      "<p><strong>المواصفات</strong></p>" +
      "<ul>" +
      specs +
      "</ul>" +
      '<div class="pill">' +
      (b.tag || "") +
      "</div>" +
      "</div>" +
      "</div>";
    openBookModal(b.title, html);
  }

  $$(".bookCard", grid).forEach((card) => {
    const id = card.getAttribute("data-id");
    on(card, "click", () => openBook(id));
    on(card, "keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openBook(id);
      }
    });
  });
}

/* =====================[ VIDEO RELEASES ]=============== */
function renderVideoReleases() {
  const grid = $("#videoGrid");
  if (!grid) return;

  grid.innerHTML = VIDEO_RELEASES.map(
    (v) =>
      '<div class="videoCard">' +
      '<video controls playsinline preload="metadata" poster="' +
      (v.poster || "") +
      '">' +
      '<source src="' +
      v.src +
      '" type="video/mp4" />' +
      "المتصفح لا يدعم تشغيل الفيديو." +
      "</video>" +
      '<div class="videoMeta">' +
      "<strong>" +
      v.title +
      "</strong>" +
      "<span>" +
      (v.desc || "") +
      "</span>" +
      "</div>" +
      "</div>",
  ).join("");
}

/* =====================[ OFFERS ]======================= */
function renderOffers() {
  const grid = $("#offerGrid");
  if (!grid) return;

  grid.innerHTML = OFFERS.map(
    (o) =>
      '<div class="offerCard">' +
      '<div class="offerIcon">' +
      o.icon +
      "</div>" +
      "<h3>" +
      o.title +
      "</h3>" +
      "<p>" +
      o.text +
      "</p>" +
      "</div>",
  ).join("");
}

/* =====================[ FAIRS VIP — ORBIT SHOWCASE ]==================== */
function initFairsVIP() {
  const orbit = $("#fairsOrbit");
  const rail = $("#fairsRail");
  const meter = $("#fairsMeter");

  const spotBadge = $("#fairsSpotBadge");
  const spotTitle = $("#fairsSpotTitle");
  const spotDesc = $("#fairsSpotDesc");
  const openBtn = $("#fairsOpenBtn");
  const nextBtn = $("#fairsNextBtn");

  const segBtns = $$(".fairsVIP__segBtn");
  if (!orbit || !rail || !segBtns.length) return;

  let filter = "all";
  let items = [];
  let angle = 0;
  let targetAngle = 0;
  let activeIndex = 0;

  let isDown = false;
  let downX = 0;
  let downAngle = 0;

  function getFiltered() {
    return filter === "all"
      ? FAIRS_MEDIA
      : FAIRS_MEDIA.filter((x) => x.tag === filter);
  }

  function labelFor(it) {
    const typeLabel = it.type === "video" ? "فيديو" : "صورة";
    const tagLabel = it.tag === "local" ? "محلية" : "دولية";
    return typeLabel + " • " + tagLabel;
  }

  function renderSpot(it) {
    if (!it) return;
    if (spotBadge) spotBadge.textContent = labelFor(it);
    if (spotTitle) spotTitle.textContent = it.title || "—";
    if (spotDesc) spotDesc.textContent = it.desc || "—";
  }

  function openMedia(it) {
    if (!it) return;

    const mediaHTML =
      it.type === "video"
        ? '<video controls playsinline preload="metadata" poster="' +
          (it.poster || "") +
          '">' +
          '<source src="' +
          it.src +
          '" type="video/mp4" />' +
          "المتصفح لا يدعم تشغيل الفيديو." +
          "</video>"
        : '<img src="' + it.src + '" alt="' + (it.title || "صورة") + '" />';

    const html =
      '<div class="viewer">' +
      '<div class="viewerBox">' +
      mediaHTML +
      "</div>" +
      '<div class="viewerText">' +
      "<p><strong>" +
      (it.title || "—") +
      "</strong></p>" +
      '<p class="muted">' +
      (it.desc || "—") +
      "</p>" +
      '<div class="pill">' +
      (it.tag === "local" ? "محلية" : "دولية") +
      "</div>" +
      "</div>" +
      "</div>";

    openMediaModal(it.title, html);
  }

  function updateMeter() {
    if (!meter) return;
    const n = items.length || 1;
    meter.style.width = (((activeIndex + 1) / n) * 100).toFixed(2) + "%";
  }

  function snapToActive() {
    const n = items.length || 1;
    targetAngle = -(activeIndex / n) * 1.9;
    updateMeter();
  }

  function layoutOrbit() {
    const cards = $$(".fairsVIP__item", orbit);
    const n = cards.length;
    if (!n) return;

    const radius = Math.max(160, Math.min(260, orbit.clientWidth * 0.23));
    const spread = Math.min(0.95, Math.max(0.55, 8 / n));
    const step = (Math.PI * 2 * spread) / n;

    angle += (targetAngle - angle) * 0.12;

    cards.forEach((el, i) => {
      const a = angle + i * step;
      const x = Math.cos(a) * radius;
      const y = Math.sin(a) * (radius * 0.38);

      const z = (Math.cos(a) + 1) * 120; // 0..240
      const scale = 0.84 + (z / 240) * 0.22;
      const op = 0.45 + (z / 240) * 0.55;

      const isFront = i === activeIndex;

      el.style.opacity = String(op);
      el.style.transform =
        "translate(-50%, -50%) translate(" +
        x +
        "px," +
        y +
        "px) scale(" +
        (isFront ? scale * 1.06 : scale) +
        ")";
      el.style.zIndex = String(Math.round(z) + (isFront ? 999 : 0));
      el.style.filter = isFront ? "brightness(1.06)" : "brightness(0.98)";
    });

    requestAnimationFrame(layoutOrbit);
  }

  function buildOrbit() {
    orbit.innerHTML = "";
    items = getFiltered();

    if (!items.length) {
      orbit.innerHTML =
        '<div style="padding:18px;color:var(--muted);font-weight:900">لا توجد عناصر في هذا القسم.</div>';
      return;
    }

    activeIndex = 0;
    angle = 0;
    targetAngle = 0;

    items.forEach((it, i) => {
      const el = document.createElement("div");
      el.className = "fairsVIP__item";
      el.setAttribute("data-idx", String(i));
      el.setAttribute("role", "button");
      el.setAttribute("tabindex", "-1");
      el.setAttribute("aria-label", "فتح " + (it.title || "عنصر"));

      const img = document.createElement("img");
      img.className = "fairsVIP__media";
      img.src = it.type === "video" ? it.poster || it.src : it.src;
      img.alt = it.title || "معرض";
      img.loading = "lazy";

      const badge = document.createElement("div");
      badge.className = "fairsVIP__badge";
      badge.innerHTML =
        '<span class="fairsVIP__dot"></span>' +
        "<span>" +
        (it.tag === "international" ? "INTERNATIONAL" : "LOCAL") +
        "</span>" +
        "<small>• " +
        (it.type === "video" ? "MEDIA PASS" : "PHOTO PASS") +
        "</small>";

      const cap = document.createElement("div");
      cap.className = "fairsVIP__cap";
      cap.innerHTML =
        "<strong>" +
        (it.title || "—") +
        "</strong><span>" +
        (it.desc || "") +
        "</span>";

      el.appendChild(img);
      el.appendChild(badge);
      el.appendChild(cap);

      on(el, "pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const mx = ((e.clientX - r.left) / r.width) * 100;
        const my = ((e.clientY - r.top) / r.height) * 100;
        el.style.setProperty("--mx", mx + "%");
        el.style.setProperty("--my", my + "%");
      });

      on(el, "click", () => {
        activeIndex = i;
        snapToActive();
        renderSpot(items[activeIndex]);
      });

      on(el, "dblclick", () => openMedia(items[i]));
      orbit.appendChild(el);
    });

    renderSpot(items[activeIndex]);
    updateMeter();
    layoutOrbit();
  }

  function buildRail() {
    rail.innerHTML = "";
    const list = getFiltered();

    list.forEach((it) => {
      const card = document.createElement("div");
      card.className = "fairsVIP__railItem";
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", "فتح " + (it.title || "عنصر"));

      const img = document.createElement("img");
      img.src = it.type === "video" ? it.poster || it.src : it.src;
      img.alt = it.title || "معرض";
      img.loading = "lazy";

      const cap = document.createElement("div");
      cap.className = "fairsVIP__cap";
      cap.innerHTML =
        "<strong>" +
        (it.title || "—") +
        "</strong><span>" +
        (it.desc || "") +
        "</span>";

      card.appendChild(img);
      card.appendChild(cap);

      on(card, "click", () => openMedia(it));
      on(card, "keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openMedia(it);
        }
      });

      rail.appendChild(card);
    });
  }

  function next() {
    if (!items.length) return;
    activeIndex = (activeIndex + 1) % items.length;
    renderSpot(items[activeIndex]);
    snapToActive();
  }

  on(openBtn, "click", () => openMedia(items[activeIndex]));
  on(nextBtn, "click", () => next());

  on(orbit, "pointerdown", (e) => {
    isDown = true;
    downX = e.clientX;
    downAngle = targetAngle;
    orbit.setPointerCapture && orbit.setPointerCapture(e.pointerId);
  });
  on(window, "pointerup", () => {
    isDown = false;
  });
  on(window, "pointermove", (e) => {
    if (!isDown) return;
    const dx = e.clientX - downX;
    targetAngle = downAngle + dx * 0.0034;

    const n = items.length || 1;
    const idx = Math.round((-targetAngle / 1.9) * n);
    activeIndex = ((idx % n) + n) % n;
    renderSpot(items[activeIndex]);
    updateMeter();
  });

  on(
    orbit,
    "wheel",
    (e) => {
      e.preventDefault();
      targetAngle += (e.deltaY || e.deltaX) * 0.0009;

      const n = items.length || 1;
      const idx = Math.round((-targetAngle / 1.9) * n);
      activeIndex = ((idx % n) + n) % n;
      renderSpot(items[activeIndex]);
      updateMeter();
    },
    { passive: false },
  );

  on(orbit, "keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      next();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + items.length) % items.length;
      renderSpot(items[activeIndex]);
      snapToActive();
    }
    if (e.key === "Enter") {
      e.preventDefault();
      openMedia(items[activeIndex]);
    }
  });

  function applyFilter(nextFilter) {
    filter = nextFilter || "all";
    segBtns.forEach((b) => {
      const onNow = b.getAttribute("data-tab") === filter;
      b.classList.toggle("is-active", onNow);
      b.setAttribute("aria-selected", onNow ? "true" : "false");
    });
    buildOrbit();
    buildRail();
  }

  segBtns.forEach((b) =>
    on(b, "click", () => applyFilter(b.getAttribute("data-tab") || "all")),
  );

  applyFilter("all");
}
/* =====================[ /FAIRS VIP ]==================== */

/* =====================[ ADMIN ]======================== */
function setAdminUI(onAdmin) {
  STATE.isAdmin = !!onAdmin;

  const badge = $("#adminBadge");
  const loginBtn = $("#adminLoginBtn");
  const logoutBtn = $("#adminLogoutBtn");
  const advancedBox = $("#advancedBox");
  const approveBox = $("#approveBox");
  const sendAdminWA = $("#sendAdminWA");
  const sendAdminMail = $("#sendAdminMail");
  const copyAdmin = $("#copyAdmin");

  badge && badge.classList.toggle("is-hidden", !STATE.isAdmin);
  loginBtn && loginBtn.classList.toggle("is-hidden", STATE.isAdmin);
  logoutBtn && logoutBtn.classList.toggle("is-hidden", !STATE.isAdmin);
  advancedBox && advancedBox.classList.toggle("is-hidden", !STATE.isAdmin);
  approveBox && approveBox.classList.toggle("is-hidden", !STATE.isAdmin);

  sendAdminWA && sendAdminWA.classList.toggle("is-hidden", !STATE.isAdmin);
  sendAdminMail && sendAdminMail.classList.toggle("is-hidden", !STATE.isAdmin);
  copyAdmin && copyAdmin.classList.toggle("is-hidden", !STATE.isAdmin);
}

function setApprovedUI(isApproved) {
  STATE.approved = !!isApproved;
  const finalState = $("#finalState");
  const finalHint = $("#finalHint");
  const finalValue = $("#finalValue");
  const unitFinalValue = $("#unitFinalValue");

  if (!STATE.approved) {
    finalState && (finalState.textContent = "غير معتمد");
    finalHint && (finalHint.textContent = "يظهر بعد اعتماد الإدارة.");
    finalValue && (finalValue.textContent = "غير معتمد");
    unitFinalValue && (unitFinalValue.textContent = "—");
  } else {
    finalState && (finalState.textContent = "معتمد");
    finalHint && (finalHint.textContent = "تم اعتماد السعر النهائي.");
  }
}

function adminLogin() {
  const actions =
    '<button class="btn btn--ghost" data-close>إلغاء</button>' +
    '<button class="btn btn--primary" id="pinOkBtn" type="button">دخول</button>';

  const html =
    '<div style="display:grid;gap:10px;">' +
    '<div class="muted">أدخل رمز الإدارة لتفعيل الاعتماد.</div>' +
    '<input id="pinInput" class="input" type="password" placeholder="رمز الإدارة" />' +
    "</div>";

  openGenericModal("دخول الإدارة", html, actions);

  const ok = $("#pinOkBtn");
  on(ok, "click", function () {
    const pin = String($("#pinInput")?.value || "").trim();
    if (pin === SETTINGS.adminPin) {
      closeGenericModal();
      setAdminUI(true);
      openGenericModal("تم", "تم تفعيل وضع الإدارة.");
    } else {
      openGenericModal("خطأ", "رمز الإدارة غير صحيح.");
    }
  });
}

function adminLogout() {
  setAdminUI(false);
  setApprovedUI(false);
  openGenericModal("تم", "تم الخروج من وضع الإدارة.");
}

function initAdmin() {
  on($("#adminLoginBtn"), "click", adminLogin);
  on($("#adminLogoutBtn"), "click", adminLogout);
  setAdminUI(false);
  setApprovedUI(false);
}

/* =====================[ QUOTE ]======================== */
function getFormData() {
  const form = $("#quoteForm");
  if (!form) return null;

  const fd = new FormData(form);
  const obj = {};
  fd.forEach((v, k) => (obj[k] = v));

  ["qty", "insidePages", "billingBlock", "wastePct", "ownerProfitPct"].forEach(
    (k) => {
      if (obj[k] !== undefined && obj[k] !== "") {
        const n = Number(obj[k]);
        obj[k] = Number.isFinite(n) ? n : obj[k];
      }
    },
  );

  return obj;
}

function validateForm(d) {
  if (!d) return "نموذج التسعير غير موجود في الصفحة.";
  if (!d.clientName || String(d.clientName).trim().length < 2)
    return "يرجى إدخال الاسم.";
  if (!d.clientPhone || String(d.clientPhone).trim().length < 8)
    return "يرجى إدخال هاتف/واتساب صحيح.";
  if (!Number.isFinite(d.qty) || d.qty < 1) return "عدد النسخ غير صحيح.";
  if (!Number.isFinite(d.insidePages) || d.insidePages < 1)
    return "صفحات المتن غير صحيحة.";
  if (
    d.size === "custom" &&
    (!d.customSize || String(d.customSize).trim().length < 3)
  )
    return "يرجى إدخال المقاس الخاص.";
  return null;
}

function computeCostQuote(d) {
  const qty = Math.max(1, Number(d.qty || 1));
  const insidePages = Math.max(1, Number(d.insidePages || 1));

  const pagesFactor = insidePages / 80;
  const wastePct = Number.isFinite(d.wastePct) ? Math.max(0, d.wastePct) : 6;
  const wasteFactor = 1 + wastePct / 100;

  const insidePaperPer =
    RATES.paperPerCopy[d.insidePaper] != null
      ? RATES.paperPerCopy[d.insidePaper]
      : RATES.paperPerCopy.other;
  const coverPaperPer =
    d.coverType === "other"
      ? RATES.paperPerCopy.cover_other != null
        ? RATES.paperPerCopy.cover_other
        : RATES.paperPerCopy.coated_250
      : RATES.paperPerCopy[d.coverType] != null
        ? RATES.paperPerCopy[d.coverType]
        : RATES.paperPerCopy.coated_250;

  const insideColorFactor =
    RATES.insideColorFactor[String(d.insideColors || "2")] != null
      ? RATES.insideColorFactor[String(d.insideColors || "2")]
      : 1.2;

  const coverColorFactor =
    RATES.coverColorFactor[String(d.coverColors || "4")] != null
      ? RATES.coverColorFactor[String(d.coverColors || "4")]
      : 1.8;

  const insidePaperCost = qty * insidePaperPer * pagesFactor * wasteFactor;
  const coverPaperCost = qty * coverPaperPer * wasteFactor;

  const printInside = qty * 0.35 * pagesFactor * insideColorFactor;
  const printCover = qty * 0.22 * coverColorFactor;

  const bind =
    RATES.bindingPerCopy[d.binding] != null
      ? RATES.bindingPerCopy[d.binding]
      : RATES.bindingPerCopy.perfect;
  const lam =
    RATES.laminationPerCopy[d.lamination] != null
      ? RATES.laminationPerCopy[d.lamination]
      : 0;

  const bindingCost = qty * bind;
  const lamCost = qty * lam;

  const proofCost = d.proof === "yes" ? RATES.proofFixed : 0;
  const shippingCost = d.shipping === "yes" ? RATES.shippingFixed : 0;

  const wantsDistribution =
    d.serviceType !== "print_only" || d.distribution === "yes";
  const distributionCost = wantsDistribution
    ? RATES.distributionFixed + qty * RATES.distributionPerCopy
    : 0;

  const fairsCost =
    RATES.fairsFixedDefault[d.fairs] != null
      ? RATES.fairsFixedDefault[d.fairs]
      : 0;

  const subtotal =
    insidePaperCost +
    coverPaperCost +
    printInside +
    printCover +
    bindingCost +
    lamCost +
    proofCost +
    shippingCost +
    distributionCost +
    fairsCost;
  const adminCost = subtotal * (RATES.adminPct / 100);
  const total = subtotal + adminCost;

  const lines = [
    { k: "ورق المتن", v: insidePaperCost },
    { k: "ورق الغلاف", v: coverPaperCost },
    { k: "طباعة المتن", v: printInside },
    { k: "طباعة الغلاف", v: printCover },
    { k: "التجليد", v: bindingCost },
    { k: "السلوفان", v: lamCost },
    { k: "بروفة", v: proofCost },
    { k: "شحن/نقل", v: shippingCost },
    { k: "توزيع", v: distributionCost },
    { k: "معارض", v: fairsCost },
    { k: "مصروفات إدارية", v: adminCost },
  ].filter((x) => x.v > 0);

  return { total, unit: total / qty, lines };
}

function computeFinal(d, costRes) {
  const profitPct = Number.isFinite(d.ownerProfitPct)
    ? Math.max(0, d.ownerProfitPct)
    : 18;
  const finalTotal = costRes.total * (1 + profitPct / 100);
  const qty = Math.max(1, Number(d.qty || 1));
  return { finalTotal, unitFinal: finalTotal / qty, profitPct };
}

function renderCost(costRes) {
  setText("#costValue", money(costRes.total));
  setText("#unitCostValue", money(costRes.unit));
  setHTML(
    "#breakdown",
    costRes.lines
      .map(
        (x) =>
          '<div class="row"><div class="k">' +
          x.k +
          '</div><div class="v">' +
          money(x.v) +
          "</div></div>",
      )
      .join(""),
  );
}
function renderFinal(finalRes) {
  setText("#finalValue", money(finalRes.finalTotal));
  setText("#unitFinalValue", money(finalRes.unitFinal));
}

function buildClientText(d, costRes, finalRes) {
  const out = [];
  out.push("عرض سعر — مؤسسة الفردوس");
  out.push("—");
  out.push("الاسم: " + d.clientName);
  out.push("الهاتف: " + d.clientPhone);
  if (d.clientEmail) out.push("البريد: " + d.clientEmail);
  if (d.clientCity) out.push("المدينة: " + d.clientCity);
  out.push("—");
  out.push("الخدمة: " + d.serviceType);
  out.push("المعارض: " + d.fairs);
  out.push("الكمية: " + d.qty);
  out.push("صفحات المتن: " + d.insidePages);
  out.push("—");
  out.push("التكلفة التقديرية: " + money(costRes.total));
  out.push("سعر النسخة (تقديري): " + money(costRes.unit));
  if (finalRes) {
    out.push("—");
    out.push("✅ تم اعتماد السعر النهائي:");
    out.push("الإجمالي النهائي: " + money(finalRes.finalTotal));
    out.push("سعر النسخة (نهائي): " + money(finalRes.unitFinal));
  } else {
    out.push("—");
    out.push("السعر النهائي يظهر بعد اعتماد الإدارة.");
  }
  return out.join("\n");
}

function buildAdminText(d, costRes, finalRes) {
  return [
    "طلب تسعير — للإدارة",
    "—",
    "الاسم: " + d.clientName,
    "الهاتف: " + d.clientPhone,
    "الكمية: " + d.qty,
    "—",
    "التكلفة التقديرية: " + money(costRes.total),
    "ربح المؤسسة: " + finalRes.profitPct + "%",
    "الإجمالي النهائي: " + money(finalRes.finalTotal),
    "سعر النسخة النهائي: " + money(finalRes.unitFinal),
  ].join("\n");
}

function openWhatsApp(phoneIntl, text) {
  const url = "https://wa.me/" + phoneIntl + "?text=" + encodeWA(text);
  window.open(url, "_blank", "noopener");
}
function openMail(to, subject, body) {
  const url =
    "mailto:" +
    to +
    "?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body);
  window.location.href = url;
}
function safePhoneToIntl(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  if (digits.length < 8) return null;
  if (digits[0] === "0") return "20" + digits.slice(1);
  return digits;
}

function initQuote() {
  const form = $("#quoteForm");
  if (!form) return;

  on(form, "submit", function (e) {
    e.preventDefault();
    const d = getFormData();
    const err = validateForm(d);
    if (err) return openGenericModal("تنبيه", err);

    const costRes = computeCostQuote(d);
    renderCost(costRes);
    setApprovedUI(false);
    STATE.last = { d, costRes, finalRes: null };
  });

  on($("#resetQuote"), "click", function () {
    form.reset();
    setText("#costValue", "—");
    setText("#unitCostValue", "—");
    setHTML("#breakdown", "");
    setApprovedUI(false);
    STATE.last = null;
  });

  on($("#approveBtn"), "click", function () {
    if (!STATE.isAdmin)
      return openGenericModal("تنبيه", "هذه العملية للإدارة فقط.");
    const d = getFormData();
    const err = validateForm(d);
    if (err) return openGenericModal("تنبيه", err);

    const costRes = computeCostQuote(d);
    renderCost(costRes);

    const finalRes = computeFinal(d, costRes);
    renderFinal(finalRes);
    setApprovedUI(true);
    STATE.last = { d, costRes, finalRes };
  });

  on($("#revokeBtn"), "click", function () {
    if (!STATE.isAdmin) return openGenericModal("تنبيه", "للإدارة فقط.");
    setApprovedUI(false);
    if (STATE.last) STATE.last.finalRes = null;
  });

  on($("#sendClientWA"), "click", function () {
    const d = getFormData();
    const err = validateForm(d);
    if (err) return openGenericModal("تنبيه", err);

    const costRes = computeCostQuote(d);
    const finalRes = STATE.approved ? computeFinal(d, costRes) : null;

    const intl = safePhoneToIntl(d.clientPhone);
    if (!intl) return openGenericModal("تنبيه", "رقم العميل غير صالح.");

    openWhatsApp(intl, buildClientText(d, costRes, finalRes));
  });

  on($("#sendAdminWA"), "click", function () {
    if (!STATE.isAdmin) return openGenericModal("تنبيه", "للإدارة فقط.");
    const d = getFormData();
    const err = validateForm(d);
    if (err) return openGenericModal("تنبيه", err);

    const costRes = computeCostQuote(d);
    const finalRes = computeFinal(d, costRes);

    const adminWA = String(
      d.adminWhatsApp || SETTINGS.defaultAdminWhatsApp,
    ).replace(/\D/g, "");
    openWhatsApp(adminWA, buildAdminText(d, costRes, finalRes));
  });

  on($("#sendAdminMail"), "click", function () {
    if (!STATE.isAdmin) return openGenericModal("تنبيه", "للإدارة فقط.");
    const d = getFormData();
    const err = validateForm(d);
    if (err) return openGenericModal("تنبيه", err);

    const costRes = computeCostQuote(d);
    const finalRes = computeFinal(d, costRes);

    const to = d.adminEmail || SETTINGS.defaultAdminEmail;
    openMail(
      to,
      "طلب تسعير — مؤسسة الفردوس",
      buildAdminText(d, costRes, finalRes),
    );
  });

  on($("#copyClient"), "click", function () {
    const d = getFormData();
    const err = validateForm(d);
    if (err) return openGenericModal("تنبيه", err);

    const costRes = computeCostQuote(d);
    const finalRes = STATE.approved ? computeFinal(d, costRes) : null;
    const text = buildClientText(d, costRes, finalRes);

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(
        () => openGenericModal("تم", "تم النسخ بنجاح."),
        () =>
          openGenericModal(
            "نص العرض",
            '<pre style="white-space:pre-wrap;margin:0">' + text + "</pre>",
          ),
      );
    } else {
      openGenericModal(
        "نص العرض",
        '<pre style="white-space:pre-wrap;margin:0">' + text + "</pre>",
      );
    }
  });

  on($("#copyAdmin"), "click", function () {
    if (!STATE.isAdmin) return openGenericModal("تنبيه", "للإدارة فقط.");
    const d = getFormData();
    const err = validateForm(d);
    if (err) return openGenericModal("تنبيه", err);

    const costRes = computeCostQuote(d);
    const finalRes = computeFinal(d, costRes);
    const text = buildAdminText(d, costRes, finalRes);

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(
        () => openGenericModal("تم", "تم النسخ بنجاح."),
        () =>
          openGenericModal(
            "نص الإدارة",
            '<pre style="white-space:pre-wrap;margin:0">' + text + "</pre>",
          ),
      );
    } else {
      openGenericModal(
        "نص الإدارة",
        '<pre style="white-space:pre-wrap;margin:0">' + text + "</pre>",
      );
    }
  });
}

/* =====================[ BOOT ]========================= */
function boot() {
  initSplash(); // ✅ NEW VIP loader
  initScrollbar();
  initMobileMenu();
  initTheme();
  initModals();

  initHeroSlider();
  renderBooks();
  renderVideoReleases();
  renderOffers();

  initFairsVIP(); // ✅ بدل أي Fairs قديم

  initAdmin();
  initQuote();
}

document.addEventListener("DOMContentLoaded", boot);
