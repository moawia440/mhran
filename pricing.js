/* =========================
   PRICING (FINAL) — Works with your HTML IDs
   ✅ Admin can edit prices
   ✅ Prices persist (localStorage)
   ✅ Last calculation updates instantly when any price changes
========================= */

function $(s) {
  return document.querySelector(s);
}

function cloneObj(o) {
  return JSON.parse(JSON.stringify(o));
}

function deepMerge(base, extra) {
  for (var k in extra) {
    if (extra[k] && typeof extra[k] === "object" && !Array.isArray(extra[k])) {
      base[k] = deepMerge(base[k] || {}, extra[k]);
    } else {
      base[k] = extra[k];
    }
  }
  return base;
}

/* ===== CONFIG ===== */
var PRICING_DEFAULT = {
  meta: {
    updatedAt: new Date().toISOString(),
    currency: "جنيه",
    printHouseWA: "201000051078",
    storeName: "مؤسسة الفردوس — تسعير الطباعة",
    adminPin: "2233",
  },
  paper: {
    offset_70: 12,
    offset_80: 14,
    cream_80: 18,
    coated_250: 50,
    coated_300: 65,
  },
  print: { bw_duplex: 0.35, bw_single: 0.22, cmyk: 1.1 },
  coverPrint: { cover_bw: 4, cover_color: 9 },
  binding: { staple: 6, perfect: 12, hardcover: 45 },
  lamination: { none: 0, matte: 6, gloss: 5 },
  extras: { proofFixed: 150, shippingFixed: 300 },
  overheadPct: 6,
  clientMarginPct: 12,
};

var LS_KEY = "print_pricing_v1";
var LS_ADMIN = "print_admin_on_v1";

function loadPricing() {
  var saved = localStorage.getItem(LS_KEY);
  if (!saved) return cloneObj(PRICING_DEFAULT);
  try {
    var obj = JSON.parse(saved);
    return deepMerge(cloneObj(PRICING_DEFAULT), obj);
  } catch (e) {
    return cloneObj(PRICING_DEFAULT);
  }
}
function savePricing(p) {
  p.meta.updatedAt = new Date().toISOString();
  localStorage.setItem(LS_KEY, JSON.stringify(p));
}

var PRICING = loadPricing();

/* ===== UI refs ===== */
var steps = document.querySelectorAll(".step");
var panels = document.querySelectorAll(".stepPanel");

var modeText = $("#modeText");
var adminToggle = $("#adminToggle");
var clientToggle = $("#clientToggle");

var ratesBoard = $("#ratesBoard");
var marketBoard = $("#marketBoard");

var heroLastUpdated = $("#heroLastUpdated");
var boardLastUpdated = $("#boardLastUpdated");

var adminPanelBox = $("#adminPanelBox");
var resetPricesBtn = $("#resetPricesBtn");

var calcBtn = $("#calcBtn");
var aiBox = $("#aiGuard");

var LAST = null;

/* ===== Helpers ===== */
function money(n) {
  return Number(n || 0).toLocaleString("ar-EG") + " " + PRICING.meta.currency;
}

function normalizeDigits(phone) {
  var digits = String(phone || "").replace(/\D/g, "");
  if (digits.length < 8) return null;
  if (digits.indexOf("0") === 0) return "20" + digits.slice(1);
  return digits;
}

/* ===== Stepper ===== */
function getActiveStepNumber() {
  var active = document.querySelector(".step.is-active");
  if (!active) return 1;
  var v = Number(active.getAttribute("data-step") || "1");
  return isFinite(v) ? v : 1;
}

function goStep(n) {
  for (var i = 0; i < steps.length; i++) {
    steps[i].classList.toggle("is-active", Number(steps[i].dataset.step) === n);
  }
  for (var j = 0; j < panels.length; j++) {
    panels[j].classList.toggle(
      "is-active",
      Number(panels[j].getAttribute("data-step-panel")) === n,
    );
  }
}

for (var s = 0; s < steps.length; s++) {
  steps[s].addEventListener("click", function () {
    goStep(Number(this.dataset.step));
  });
}

document.addEventListener("click", function (e) {
  if (e.target && e.target.matches && e.target.matches("[data-next]")) {
    var cur = getActiveStepNumber();
    goStep(Math.min(3, cur + 1));
  }
  if (e.target && e.target.matches && e.target.matches("[data-prev]")) {
    var cur2 = getActiveStepNumber();
    goStep(Math.max(1, cur2 - 1));
  }
});

/* ===== Form ===== */
function getData() {
  var form = $("#quoteForm");
  var fd = new FormData(form);
  var d = {};
  fd.forEach(function (v, k) {
    d[k] = v;
  });

  d.qty = Number(d.qty || 0);
  d.insidePages = Number(d.insidePages || 0);
  return d;
}

function validate(d) {
  if (!d.clientName || String(d.clientName).trim().length < 2)
    return "اكتب اسم صحيح.";
  if (!d.clientPhone || String(d.clientPhone).trim().length < 8)
    return "اكتب رقم واتساب/هاتف صحيح.";
  if (!isFinite(d.qty) || d.qty < 1) return "عدد النسخ غير صحيح.";
  if (!isFinite(d.insidePages) || d.insidePages < 1)
    return "عدد الصفحات غير صحيح.";
  if (
    d.size === "custom" &&
    (!d.customSize || String(d.customSize).trim().length < 3)
  )
    return "اكتب المقاس الخاص.";
  if (
    d.shipping === "yes" &&
    (!d.shipAddress || String(d.shipAddress).trim().length < 6)
  )
    return "اكتب عنوان الشحن بالتفصيل.";
  return null;
}

function aiGuardHints(d) {
  var hints = [];
  if (d.qty < 50) hints.push("⚠️ كمية قليلة جدًا — غالبًا سعر النسخة سيزيد.");
  if (d.insidePages > 400)
    hints.push("⚠️ صفحات كثيرة — راجع التجليد (فني/حراري).");
  if (d.binding === "staple" && d.insidePages > 80)
    hints.push("⚠️ دبوس مع صفحات كثيرة قد لا يكون مناسبًا.");
  if (d.insideColors === "cmyk" && d.insidePaper === "cream_80")
    hints.push("ℹ️ ألوان على ورق كريمي قد تقل دقة الألوان.");
  if (d.coverPaper === "coated_250" && d.lamination === "none")
    hints.push("ℹ️ الغلاف بدون سلوفان قد يتأثر بالخدوش.");
  return hints;
}

/* ===== Engine ===== */
function compute(d) {
  var qty = Math.max(1, d.qty);
  var pages = Math.max(1, d.insidePages);

  var insidePaperPerCopy =
    PRICING.paper[d.insidePaper] != null ? PRICING.paper[d.insidePaper] : 0;
  var pagesFactor = pages / 80;
  var insidePaperCost = qty * insidePaperPerCopy * pagesFactor;

  var coverPaperPerCopy =
    PRICING.paper[d.coverPaper] != null ? PRICING.paper[d.coverPaper] : 0;
  var coverPaperCost = qty * coverPaperPerCopy;

  var insidePrintPerPage =
    PRICING.print[d.insideColors] != null ? PRICING.print[d.insideColors] : 0;
  var insidePrintCost = qty * pages * insidePrintPerPage;

  var coverPrintPerCopy =
    PRICING.coverPrint[d.coverColors] != null
      ? PRICING.coverPrint[d.coverColors]
      : 0;
  var coverPrintCost = qty * coverPrintPerCopy;

  var bindingCost =
    qty * (PRICING.binding[d.binding] != null ? PRICING.binding[d.binding] : 0);
  var lamCost =
    qty *
    (PRICING.lamination[d.lamination] != null
      ? PRICING.lamination[d.lamination]
      : 0);

  var proof = d.proof === "yes" ? PRICING.extras.proofFixed : 0;
  var shipping = d.shipping === "yes" ? PRICING.extras.shippingFixed : 0;

  var subtotal =
    insidePaperCost +
    coverPaperCost +
    insidePrintCost +
    coverPrintCost +
    bindingCost +
    lamCost +
    proof +
    shipping;
  var overhead = subtotal * (PRICING.overheadPct / 100);
  var estimatedCost = subtotal + overhead;

  var clientTotal = estimatedCost * (1 + PRICING.clientMarginPct / 100);

  var lines = [
    ["ورق المتن", insidePaperCost],
    ["ورق الغلاف", coverPaperCost],
    ["طباعة المتن", insidePrintCost],
    ["طباعة الغلاف", coverPrintCost],
    ["التجليد", bindingCost],
    ["السلوفان", lamCost],
    ["بروفة", proof],
    ["شحن/نقل", shipping],
    ["مصاريف تشغيل", overhead],
  ].filter(function (x) {
    return x[1] > 0;
  });

  return {
    estimatedCost: estimatedCost,
    unitCost: estimatedCost / qty,
    clientTotal: clientTotal,
    unitClient: clientTotal / qty,
    lines: lines,
  };
}

function render(res) {
  var costEl = $("#costValue");
  var unitEl = $("#unitCostValue");
  var clientEl = $("#clientTotal");
  var bd = $("#breakdown");

  if (costEl) costEl.textContent = money(res.estimatedCost);
  if (unitEl) unitEl.textContent = money(res.unitCost);
  if (clientEl) clientEl.textContent = money(res.clientTotal);

  if (bd) {
    bd.innerHTML = res.lines
      .map(function (x) {
        return (
          '<div class="bdRow"><div class="k">' +
          x[0] +
          '</div><div class="v">' +
          money(x[1]) +
          "</div></div>"
        );
      })
      .join("");
  }
}

/* ===== WhatsApp ===== */
function buildPrintHouseText(d, res) {
  var out = [];
  out.push("🧾 طلب تسعير جديد — " + PRICING.meta.storeName);
  out.push("—");
  out.push("الاسم: " + d.clientName);
  out.push("هاتف: " + d.clientPhone);
  if (d.clientCity) out.push("المدينة: " + d.clientCity);
  if (d.clientEmail) out.push("البريد: " + d.clientEmail);
  out.push("—");
  out.push("📌 مواصفات الطباعة:");
  out.push("الكمية: " + d.qty);
  out.push("صفحات المتن: " + d.insidePages);
  out.push(
    "المقاس: " +
      d.size +
      (d.size === "custom" ? " (" + d.customSize + ")" : ""),
  );
  out.push("ألوان المتن: " + d.insideColors);
  out.push("ورق المتن: " + d.insidePaper);
  out.push("ورق الغلاف: " + d.coverPaper);
  out.push("ألوان الغلاف: " + d.coverColors);
  out.push("سلوفان: " + d.lamination);
  out.push("التجليد: " + d.binding);
  out.push("بروفة: " + d.proof);
  out.push("شحن: " + d.shipping);
  if (d.shipping === "yes" && d.shipAddress)
    out.push("عنوان الشحن: " + d.shipAddress);
  if (d.notes) out.push("ملاحظات: " + d.notes);
  out.push("—");
  out.push(
    "👤 عرض العميل: " +
      money(res.clientTotal) +
      " | للنسخة: " +
      money(res.unitClient),
  );
  out.push("—");
  out.push("رجاء تأكيد التوفر ومدة التنفيذ.");
  return out.join("\n");
}

function openWhatsApp(phoneIntl, text) {
  var url = "https://wa.me/" + phoneIntl + "?text=" + encodeURIComponent(text);
  window.open(url, "_blank", "noopener");
}

/* ===== Admin / UI ===== */
function isAdminOn() {
  return localStorage.getItem(LS_ADMIN) === "1";
}

function setAdmin(on) {
  localStorage.setItem(LS_ADMIN, on ? "1" : "0");
  applyAdminUI();
}

function applyUpdatedText() {
  var ts = new Date(PRICING.meta.updatedAt).toLocaleString("ar-EG");
  if (heroLastUpdated) heroLastUpdated.textContent = ts;
  if (boardLastUpdated) boardLastUpdated.textContent = ts;
}

function recalcIfHasLast() {
  if (!LAST || !LAST.d) return;
  var newRes = compute(LAST.d);
  LAST.res = newRes;
  render(newRes);
}

/* ===== Market Board ===== */
function groupDefs() {
  return [
    {
      title: "الورق",
      key: "paper",
      unit: PRICING.meta.currency + "/نسخة",
      items: [
        ["offset_70", "أوفست 70"],
        ["offset_80", "أوفست 80"],
        ["cream_80", "كريمي 80"],
        ["coated_250", "كوشيه 250"],
        ["coated_300", "كوشيه 300"],
      ],
    },
    {
      title: "طباعة المتن",
      key: "print",
      unit: PRICING.meta.currency + "/صفحة",
      items: [
        ["bw_duplex", "أسود (وجهين)"],
        ["bw_single", "أسود (وجه)"],
        ["cmyk", "ألوان (CMYK)"],
      ],
    },
    {
      title: "طباعة الغلاف",
      key: "coverPrint",
      unit: PRICING.meta.currency + "/نسخة",
      items: [
        ["cover_bw", "غلاف أسود"],
        ["cover_color", "غلاف ألوان"],
      ],
    },
    {
      title: "التجليد",
      key: "binding",
      unit: PRICING.meta.currency + "/نسخة",
      items: [
        ["staple", "دبوس"],
        ["perfect", "حراري"],
        ["hardcover", "فني"],
      ],
    },
    {
      title: "السلوفان",
      key: "lamination",
      unit: PRICING.meta.currency + "/نسخة",
      items: [
        ["none", "بدون"],
        ["matte", "مط"],
        ["gloss", "لامع"],
      ],
    },
  ];
}

function showBoard() {
  if (!ratesBoard) return;
  ratesBoard.classList.remove("is-hidden");
  ratesBoard.setAttribute("aria-hidden", "false");
}
function hideBoard() {
  if (!ratesBoard) return;
  ratesBoard.classList.add("is-hidden");
  ratesBoard.setAttribute("aria-hidden", "true");
  if (marketBoard) marketBoard.innerHTML = "";
}

function renderMarket() {
  if (!marketBoard) return;

  var admin = isAdminOn();
  if (!admin) {
    marketBoard.innerHTML = "";
    return;
  }

  var defs = groupDefs();
  marketBoard.innerHTML = defs
    .map(function (g) {
      var rows = g.items
        .map(function (it) {
          var k = it[0],
            label = it[1];
          var val =
            PRICING[g.key] && PRICING[g.key][k] != null ? PRICING[g.key][k] : 0;

          return (
            '<div class="marketRow" data-group="' +
            g.key +
            '" data-key="' +
            k +
            '">' +
            '<div class="ticker"><span>' +
            label +
            "</span></div>" +
            '<div class="marketValue">' +
            '<span class="valText">' +
            Number(val).toLocaleString("ar-EG") +
            " " +
            g.unit +
            "</span>" +
            '<input class="priceInp" type="number" step="0.01" value="' +
            val +
            '" />' +
            "</div>" +
            "</div>"
          );
        })
        .join("");

      return (
        '<div class="marketGroup">' +
        '<div class="marketGroup__head"><strong>' +
        g.title +
        '</strong><span class="muted small">' +
        g.unit +
        "</span></div>" +
        rows +
        "</div>"
      );
    })
    .join("");

  // ✅ Event Delegation: editable without re-binding problems
  marketBoard.oninput = function (e) {
    if (
      !e.target ||
      !e.target.classList ||
      !e.target.classList.contains("priceInp")
    )
      return;

    var row = e.target.closest(".marketRow");
    if (!row) return;

    var group = row.getAttribute("data-group");
    var key = row.getAttribute("data-key");
    var n = Number(e.target.value);
    if (!isFinite(n)) n = 0;

    if (!PRICING[group]) PRICING[group] = {};
    PRICING[group][key] = n;

    savePricing(PRICING);
    applyUpdatedText();
    recalcIfHasLast();
  };
}

/* ===== Admin UI Sync (two buttons) ===== */
function syncTwoButtons() {
  var on = isAdminOn();
  if (adminToggle) adminToggle.classList.toggle("is-hidden", on);
  if (clientToggle) clientToggle.classList.toggle("is-hidden", !on);
}

function applyAdminUI() {
  var on = isAdminOn();

  document.body.classList.toggle("is-admin", on);

  if (modeText) modeText.textContent = on ? "إدارة" : "عميل";

  if (on) {
    showBoard();
    if (adminPanelBox) adminPanelBox.classList.remove("is-hidden");
    renderMarket();
  } else {
    hideBoard();
    if (adminPanelBox) adminPanelBox.classList.add("is-hidden");
  }

  syncTwoButtons();
}

/* ===== Main Actions ===== */
if (calcBtn) {
  calcBtn.addEventListener("click", function () {
    var d = getData();
    var err = validate(d);
    if (err) {
      if (aiBox) aiBox.textContent = "❌ " + err;
      return;
    }

    var hints = aiGuardHints(d);
    if (aiBox) {
      aiBox.innerHTML = hints.length
        ? hints
            .map(function (x) {
              return "<div>" + x + "</div>";
            })
            .join("")
        : "✅ كل شيء طبيعي — تقدر تكمل.";
    }

    var res = compute(d);
    LAST = { d: d, res: res };
    render(res);
    goStep(3);
  });
}

var sendBtn = $("#sendToPrintHouse");
if (sendBtn) {
  sendBtn.addEventListener("click", function () {
    if (!LAST) return;
    var intl = normalizeDigits(PRICING.meta.printHouseWA);
    if (!intl) return;
    openWhatsApp(intl, buildPrintHouseText(LAST.d, LAST.res));
  });
}

var copyBtn = $("#copyClientText");
if (copyBtn) {
  copyBtn.addEventListener("click", function () {
    if (!LAST) return;

    var d = LAST.d;
    var res = LAST.res;

    var txt = [
      "عرض سعر — مؤسسة الفردوس",
      "—",
      "الاسم: " + d.clientName,
      "الهاتف: " + d.clientPhone,
      "الكمية: " + d.qty,
      "صفحات المتن: " + d.insidePages,
      "—",
      "الإجمالي (عرض): " + money(res.clientTotal),
      "سعر النسخة (عرض): " + money(res.unitClient),
      "—",
      "للتأكيد النهائي: سيتم التواصل معك من الإدارة.",
    ].join("\n");

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(
        function () {
          alert("تم النسخ ✅");
        },
        function () {
          alert(txt);
        },
      );
    } else {
      alert(txt);
    }
  });
}

/* ===== Admin Toggle ===== */
if (adminToggle) {
  adminToggle.addEventListener("click", function () {
    var pin = prompt("أدخل PIN الإدارة:");
    if (pin === null) return;

    if (pin === PRICING.meta.adminPin) {
      setAdmin(true);
    } else {
      alert("PIN غير صحيح.");
      setAdmin(false);
    }
  });
}

if (clientToggle) {
  clientToggle.addEventListener("click", function () {
    setAdmin(false);
  });
}

if (resetPricesBtn) {
  resetPricesBtn.addEventListener("click", function () {
    if (!isAdminOn()) return;
    PRICING = cloneObj(PRICING_DEFAULT);
    savePricing(PRICING);
    applyUpdatedText();
    renderMarket();
    recalcIfHasLast();
    alert("تمت إعادة أسعار المصنع ✅");
  });
}

/* ===== Boot ===== */
applyUpdatedText();
applyAdminUI();
goStep(1);
