/* ============================================================
   Sushi Split Bill — state, presets, i18n, rendering, calc
   ============================================================ */

// ---- Presets ------------------------------------------------
// Each preset plate carries a stable `key` used for i18n name lookup.
const PRESETS = {
  sushiro: {
    name: 'Sushiro',
    plates: [
      { key: 'white',  price: 30,  color: '#f5f5f5' },
      { key: 'red',    price: 40,  color: '#d32f2f' },
      { key: 'silver', price: 60,  color: '#b0bec5' },
      { key: 'gold',   price: 80,  color: '#d4af37' },
      { key: 'black',  price: 100, color: '#212121' },
    ],
  },
  katsumidori: {
    name: 'Katsu Midori',
    plates: [
      { key: 'red',         price: 40,  color: '#c62828' },
      { key: 'blue',        price: 50,  color: '#2e7d8f' },
      { key: 'green',       price: 60,  color: '#558b2f' },
      { key: 'orange',      price: 70,  color: '#f57c00' },
      { key: 'brown',       price: 80,  color: '#6d4c41' },
      { key: 'pink',        price: 90,  color: '#e8a598' },
      { key: 'greengold',   price: 100, color: '#9e9d24' },
      { key: 'cream',       price: 120, color: '#efe9d8' },
      { key: 'redgold',     price: 140, color: '#c0392b' },
      { key: 'gold',        price: 150, color: '#d4af37' },
      { key: 'darkbluenet', price: 160, color: '#37474f' },
      { key: 'navy',        price: 180, color: '#1a237e' },
    ],
  },
  custom: { name: null, plates: [] }, // name comes from i18n
};

// Plate color names per language (preset plates only; custom plates keep typed name)
const PLATE_NAMES = {
  th: {
    white:'ขาว', red:'แดง', silver:'เงิน', gold:'ทอง', black:'ดำ', blue:'ฟ้า',
    green:'เขียว', orange:'ส้ม', brown:'น้ำตาล', pink:'ชมพู', greengold:'เขียวทอง',
    cream:'ครีม', redgold:'แดงทอง', darkbluenet:'น้ำเงินลาย', navy:'กรมท่า',
  },
  en: {
    white:'White', red:'Red', silver:'Silver', gold:'Gold', black:'Black', blue:'Blue',
    green:'Green', orange:'Orange', brown:'Brown', pink:'Pink', greengold:'Green-gold',
    cream:'Cream', redgold:'Red-gold', darkbluenet:'Dark-blue net', navy:'Navy',
  },
};

// Standard color palette (Microsoft-Word style) for custom plates
const SWATCHES = [
  '#d32f2f', '#f57c00', '#fbc02d', '#d4af37', '#558b2f', '#2e7d8f',
  '#1976d2', '#1a237e', '#7e57c2', '#c2185b', '#6d4c41', '#9e9e9e',
  '#212121', '#ffffff',
];

// ---- i18n strings -------------------------------------------
const STRINGS = {
  th: {
    title: '🍣 หารค่าซูชิ',
    resetBtn: '↺ เริ่มใหม่',
    step1Title: 'มีกี่คน?',
    dinerCountLabel: 'จำนวนคน',
    continueBtn: 'ถัดไป',
    step2Title: 'เลือกร้าน',
    sushiroBlurb: 'ขาว 30 · แดง 40 · เงิน 60 · ทอง 80 · ดำ 100',
    katsuBlurb: '12 จาน, 40–180 บาท',
    customName: 'กำหนดเอง',
    customBlurb: 'เริ่มจากศูนย์ — เพิ่มจานเอง',
    step3Title: 'นับจาน',
    step3Hint: 'จานเหล่านี้หารเท่ากันทุกคน แก้จำนวนได้หากกดผิด',
    noPlatesYet: 'ยังไม่มีจาน — เพิ่มจานด้านล่าง',
    addCustomPlate: '➕ เพิ่มจานเอง',
    cpNamePh: 'ชื่อจาน (เช่น ม่วง)',
    cpPricePh: 'ราคา (บาท)',
    cpColorLabel: 'สีจาน',
    moreColors: 'สีอื่น ๆ',
    cpAdd: 'เพิ่ม',
    step4Title: 'จานที่บางคนกินเท่านั้น',
    optional: '(ไม่บังคับ)',
    step4Hint: 'ตัวอย่าง: ถ้าคนที่ 1 กินจานราคา 100 บาท 2 จาน และคนที่ 2 ไม่ได้กิน — ให้ระบุจานเหล่านั้นเป็นของคนที่ 1',
    addAssignBtn: '➕ ระบุจานให้บางคน',
    selectWho: 'เลือกคนที่ร่วมจานนี้',
    removeBtn: '✕ ลบ',
    step5Title: 'สรุปการหาร',
    optService: 'รวมค่าบริการ 10%',
    optVat: 'รวม VAT 7%',
    thDiner: 'คน', thPlates: 'ค่าจาน', thService: '+ค่าบริการ', thVat: '+VAT', thOwes: 'ต้องจ่าย',
    totalRow: 'รวม',
    platesSubtotal: 'ยอดค่าจาน',
    serviceChargeLine: 'ค่าบริการ 10%',
    vatLine: 'VAT 7%',
    grandTotal: 'ยอดรวมทั้งหมด',
    platesOrdered: 'จานที่สั่ง',
    thPlate: 'จาน', thPrice: 'ราคา', thQty: 'จำนวน', thSubtotal: 'ยอด',
    emptyAddDiners: 'เพิ่มคนเพื่อดูการหาร',
    emptyTally: 'นับจานเพื่อดูการหาร',
    modalTitle: 'เริ่มใหม่?',
    modalBody: 'จะล้างข้อมูลคนและจานทั้งหมด',
    modalCancel: 'ยกเลิก',
    modalConfirm: 'เริ่มใหม่',
    footerNote: 'ราคาเป็นเพียงตัวอย่าง โปรดตรวจสอบกับใบเสร็จจริง',
    alertAddPlatesFirst: 'เพิ่มจานก่อน',
    alertPlateName: 'กรุณาตั้งชื่อจาน',
    alertPrice: 'กรุณากรอกราคาที่ถูกต้อง',
  },
  en: {
    title: '🍣 Sushi Split Bill',
    resetBtn: '↺ Reset',
    step1Title: 'How many people?',
    dinerCountLabel: 'Number of diners',
    continueBtn: 'Continue',
    step2Title: 'Choose a restaurant',
    sushiroBlurb: 'White 30 · Red 40 · Silver 60 · Gold 80 · Black 100',
    katsuBlurb: '12 plates, 40–180 THB',
    customName: 'Custom',
    customBlurb: 'Start empty — add your own plates',
    step3Title: 'Tally the plates',
    step3Hint: 'These plates are split equally among everyone. Use the qty field to fix a misclick.',
    noPlatesYet: 'No plates yet — add a custom plate below.',
    addCustomPlate: '➕ Add a custom plate',
    cpNamePh: 'Plate name (e.g. Purple)',
    cpPricePh: 'Price (THB)',
    cpColorLabel: 'Plate color',
    moreColors: 'More colors',
    cpAdd: 'Add',
    step4Title: 'Plates only some people ate',
    optional: '(optional)',
    step4Hint: 'Example: If Person 1 ate two 100-THB plates and Person 2 ate none — assign those plates only to Person 1.',
    addAssignBtn: '➕ Assign plates to specific people',
    selectWho: 'Select who shares these plates.',
    removeBtn: '✕ Remove',
    step5Title: 'The split',
    optService: 'Include service charge 10%',
    optVat: 'Include VAT 7%',
    thDiner: 'Diner', thPlates: 'Plates', thService: '+Service', thVat: '+VAT', thOwes: 'Owes',
    totalRow: 'Total',
    platesSubtotal: 'Plates subtotal',
    serviceChargeLine: 'Service charge 10%',
    vatLine: 'VAT 7%',
    grandTotal: 'Grand total',
    platesOrdered: 'Plates ordered',
    thPlate: 'Plate', thPrice: 'Price', thQty: 'Qty', thSubtotal: 'Subtotal',
    emptyAddDiners: 'Add diners to see the split.',
    emptyTally: 'Tally some plates to see the split.',
    modalTitle: 'Start over?',
    modalBody: 'This clears all diners and plates.',
    modalCancel: 'Cancel',
    modalConfirm: 'Reset',
    footerNote: 'Prices are illustrative. Verify against your actual receipt.',
    alertAddPlatesFirst: 'Add some plates first.',
    alertPlateName: 'Give the plate a name.',
    alertPrice: 'Enter a valid price.',
  },
};

// Diner badge palette
const BADGE_COLORS = ['#d6453d','#2e7d8f','#558b2f','#f57c00','#6d4c41','#7e57c2','#0277bd','#c2185b','#5d4037','#00897b'];

// ---- State --------------------------------------------------
const STORAGE_KEY = 'sushi-split-bill-v1';

let state = {
  lang: 'th',
  people: [],          // { id, name }
  restaurant: null,    // preset key
  catalog: [],         // { id, key?, name?, price, color }
  lines: [],           // { id, plateId, qty, sharedBy: null }  (null = everyone)
  assigns: [],         // { id, plateId, qty, sharedBy: [personId] }
  options: { service: false, vat: false },
};

let idCounter = 1;
const uid = () => `id${idCounter++}`;
let selectedColor = SWATCHES[0]; // current custom-plate color selection

// ---- Persistence --------------------------------------------
function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ state, idCounter })); }
  catch (e) { /* storage unavailable — non-fatal */ }
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (!data || !data.state) return false;
    state = data.state;
    idCounter = data.idCounter || idCounter;
    state.lang = state.lang || 'th';
    state.assigns = state.assigns || [];
    state.options = state.options || { service: false, vat: false };
    return true;
  } catch (e) { return false; }
}

// ---- Helpers ------------------------------------------------
const $ = (sel) => document.querySelector(sel);
const t = (key) => (STRINGS[state.lang] && STRINGS[state.lang][key]) || STRINGS.en[key] || key;
const baht = (n) => '฿' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const plateById = (id) => state.catalog.find((p) => p.id === id);
const badgeColor = (i) => BADGE_COLORS[i % BADGE_COLORS.length];

// Display name for a plate: translated for presets, typed name for custom
function plateLabel(plate) {
  if (plate.key) return (PLATE_NAMES[state.lang] && PLATE_NAMES[state.lang][plate.key]) || PLATE_NAMES.en[plate.key] || plate.key;
  return plate.name || '';
}

function restaurantName(key) {
  if (key === 'custom') return t('customName');
  return PRESETS[key].name;
}
function restaurantBlurb(key) {
  return { sushiro: t('sushiroBlurb'), katsumidori: t('katsuBlurb'), custom: t('customBlurb') }[key];
}

function sortCatalog() {
  state.catalog.sort((a, b) => a.price - b.price);
}

function sharedLineFor(plateId) {
  return state.lines.find((l) => l.plateId === plateId);
}

// ============================================================
//  Calculation
// ============================================================
function compute() {
  const totals = {};
  state.people.forEach((p) => { totals[p.id] = 0; });

  const addLine = (plateId, qty, sharedBy) => {
    const plate = plateById(plateId);
    if (!plate || qty <= 0) return;
    const people = (sharedBy && sharedBy.length) ? sharedBy : state.people.map((p) => p.id);
    if (!people.length) return;
    const share = (plate.price * qty) / people.length;
    people.forEach((pid) => { if (totals[pid] !== undefined) totals[pid] += share; });
  };

  state.lines.forEach((l) => addLine(l.plateId, l.qty, null));
  state.assigns.forEach((a) => addLine(a.plateId, a.qty, a.sharedBy));

  const mult = (state.options.service ? 1.10 : 1) * (state.options.vat ? 1.07 : 1);

  const plateQty = {};
  const countPlate = (plateId, qty, sharedBy) => {
    const plate = plateById(plateId);
    if (!plate || qty <= 0) return;
    const people = (sharedBy && sharedBy.length) ? sharedBy : state.people.map((p) => p.id);
    if (!people.length) return;
    plateQty[plateId] = (plateQty[plateId] || 0) + qty;
  };
  state.lines.forEach((l) => countPlate(l.plateId, l.qty, null));
  state.assigns.forEach((a) => countPlate(a.plateId, a.qty, a.sharedBy));

  let grand = 0, rawSubtotal = 0;
  const rows = state.people.map((p) => {
    const sub = totals[p.id] || 0;
    const service = state.options.service ? sub * 0.10 : 0;
    const vatAmt = state.options.vat ? (sub + service) * 0.07 : 0;
    const owe = sub * mult;
    rawSubtotal += sub;
    grand += owe;
    return { person: p, sub, service, vat: vatAmt, owe };
  });

  return { rows, grand, rawSubtotal, mult, plateQty };
}

// ============================================================
//  Rendering
// ============================================================

// --- Step 1: people ---
function renderPeople() {
  const list = $('#people-list');
  if (!state.people.length) { list.hidden = true; list.innerHTML = ''; return; }
  list.hidden = false;
  list.innerHTML = '';
  state.people.forEach((p, i) => {
    const row = document.createElement('div');
    row.className = 'person-row';
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.style.background = badgeColor(i);
    badge.textContent = i + 1;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = p.name;
    input.addEventListener('input', () => { p.name = input.value; save(); refreshDependents(); });
    row.append(badge, input);
    list.append(row);
  });
}

// --- Step 2: restaurant ---
function renderRestaurants() {
  const wrap = $('#restaurant-options');
  wrap.innerHTML = '';
  Object.keys(PRESETS).forEach((key) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'resto-card' + (state.restaurant === key ? ' active' : '');
    const h3 = document.createElement('h3');
    h3.textContent = restaurantName(key);
    const p = document.createElement('p');
    p.textContent = restaurantBlurb(key);
    card.append(h3, p);
    card.addEventListener('click', () => selectRestaurant(key));
    wrap.append(card);
  });
}

function selectRestaurant(key) {
  state.restaurant = key;
  state.catalog = PRESETS[key].plates.map((p) => ({ id: uid(), ...p }));
  sortCatalog();
  state.lines = [];
  state.assigns = [];
  save();
  renderRestaurants();
  renderPlates();
  renderAssigns();
  $('#step-plates').hidden = false;
  $('#step-assign').hidden = false;
  $('#step-result').hidden = false;
  renderResults();
  $('#step-plates').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// --- Step 3: plates ---
function renderPlates() {
  const grid = $('#plate-grid');
  grid.innerHTML = '';
  if (!state.catalog.length) {
    const note = document.createElement('p');
    note.className = 'empty-note';
    note.textContent = t('noPlatesYet');
    grid.append(note);
    return;
  }
  state.catalog.forEach((plate) => {
    const line = sharedLineFor(plate.id);
    const qty = line ? line.qty : 0;

    const card = document.createElement('div');
    card.className = 'plate-card';

    const swatch = document.createElement('div');
    swatch.className = 'plate-swatch';
    swatch.style.background = plate.color;

    const name = document.createElement('div');
    name.className = 'plate-name';
    name.textContent = plateLabel(plate);

    const price = document.createElement('div');
    price.className = 'plate-price';
    price.textContent = '฿' + plate.price;

    const stepper = buildStepper(qty, (newQty) => setSharedQty(plate.id, newQty));

    card.append(swatch, name, price, stepper);
    grid.append(card);
  });
}

function buildStepper(value, onChange) {
  const wrap = document.createElement('div');
  wrap.className = 'stepper';
  const minus = document.createElement('button');
  minus.type = 'button'; minus.className = 'step-btn'; minus.textContent = '−';
  const input = document.createElement('input');
  input.type = 'number'; input.min = '0'; input.value = value; input.inputMode = 'numeric';
  const plus = document.createElement('button');
  plus.type = 'button'; plus.className = 'step-btn'; plus.textContent = '+';

  const clamp = (v) => Math.max(0, Math.floor(Number(v) || 0));
  minus.addEventListener('click', () => { const v = Math.max(0, clamp(input.value) - 1); input.value = v; onChange(v); });
  plus.addEventListener('click', () => { const v = clamp(input.value) + 1; input.value = v; onChange(v); });
  input.addEventListener('input', () => onChange(clamp(input.value)));
  input.addEventListener('blur', () => { input.value = clamp(input.value); });

  wrap.append(minus, input, plus);
  return wrap;
}

function setSharedQty(plateId, qty) {
  let line = sharedLineFor(plateId);
  if (qty <= 0) {
    if (line) state.lines = state.lines.filter((l) => l !== line);
  } else if (line) {
    line.qty = qty;
  } else {
    state.lines.push({ id: uid(), plateId, qty, sharedBy: null });
  }
  save();
  renderResults();
}

// --- Step 4: specific assignments ---
function renderAssigns() {
  const wrap = $('#assign-list');
  wrap.innerHTML = '';
  state.assigns.forEach((a) => wrap.append(buildAssignRow(a)));
}

function buildAssignRow(a) {
  const row = document.createElement('div');
  row.className = 'assign-row';

  const controls = document.createElement('div');
  controls.className = 'assign-controls';

  const select = document.createElement('select');
  state.catalog.forEach((plate) => {
    const opt = document.createElement('option');
    opt.value = plate.id;
    opt.textContent = `${plateLabel(plate)} — ฿${plate.price}`;
    if (plate.id === a.plateId) opt.selected = true;
    select.append(opt);
  });
  select.addEventListener('change', () => { a.plateId = select.value; save(); renderResults(); });

  const stepper = buildStepper(a.qty, (q) => { a.qty = q; save(); renderResults(); });
  controls.append(select, stepper);

  const people = document.createElement('div');
  people.className = 'assign-people';
  state.people.forEach((p, i) => {
    const chip = document.createElement('span');
    const on = a.sharedBy.includes(p.id);
    chip.className = 'chip' + (on ? ' on' : '');
    chip.textContent = p.name;
    if (on) { chip.style.background = badgeColor(i); chip.style.borderColor = badgeColor(i); }
    chip.addEventListener('click', () => {
      if (a.sharedBy.includes(p.id)) a.sharedBy = a.sharedBy.filter((id) => id !== p.id);
      else a.sharedBy.push(p.id);
      save(); renderAssigns(); renderResults();
    });
    people.append(chip);
  });

  const note = document.createElement('div');
  note.className = 'assign-note';
  if (a.sharedBy.length) {
    note.textContent = state.lang === 'th'
      ? `หารกัน ${a.sharedBy.length} คน`
      : `Split between ${a.sharedBy.length} ${a.sharedBy.length === 1 ? 'person' : 'people'}.`;
  } else {
    note.textContent = t('selectWho');
  }

  const remove = document.createElement('button');
  remove.type = 'button'; remove.className = 'remove'; remove.textContent = t('removeBtn');
  remove.addEventListener('click', () => {
    state.assigns = state.assigns.filter((x) => x !== a);
    save(); renderAssigns(); renderResults();
  });

  row.append(controls, people, note, remove);
  return row;
}

function addAssignment() {
  if (!state.catalog.length) { alert(t('alertAddPlatesFirst')); return; }
  state.assigns.push({ id: uid(), plateId: state.catalog[0].id, qty: 1, sharedBy: [] });
  save();
  renderAssigns();
}

// --- Step 5: results ---
function renderResults() {
  const out = $('#results');
  if (!state.people.length) { out.innerHTML = `<p class="empty-note">${t('emptyAddDiners')}</p>`; return; }

  const { rows, grand, rawSubtotal, plateQty } = compute();
  if (rawSubtotal <= 0) { out.innerHTML = `<p class="empty-note">${t('emptyTally')}</p>`; return; }

  const showSvc = state.options.service;
  const showVat = state.options.vat;

  let html = '<div class="table-scroll"><table class="result-table"><thead><tr>';
  html += `<th>${t('thDiner')}</th><th>${t('thPlates')}</th>`;
  if (showSvc) html += `<th>${t('thService')}</th>`;
  if (showVat) html += `<th>${t('thVat')}</th>`;
  html += `<th>${t('thOwes')}</th></tr></thead><tbody>`;

  rows.forEach((r, i) => {
    html += `<tr><td><span class="result-name"><span class="badge" style="background:${badgeColor(i)}">${i + 1}</span>${escapeHtml(r.person.name)}</span></td>`;
    html += `<td>${baht(r.sub)}</td>`;
    if (showSvc) html += `<td>${baht(r.service)}</td>`;
    if (showVat) html += `<td>${baht(r.vat)}</td>`;
    html += `<td class="owe">${baht(r.owe)}</td></tr>`;
  });

  const cols = 2 + (showSvc ? 1 : 0) + (showVat ? 1 : 0);
  html += `</tbody><tfoot><tr><td>${t('totalRow')}</td><td colspan="${cols - 1}"></td><td>${baht(grand)}</td></tr></tfoot></table></div>`;

  html += '<div class="summary-block">';
  html += `<div class="summary-line"><span>${t('platesSubtotal')}</span><span>${baht(rawSubtotal)}</span></div>`;
  if (showSvc) html += `<div class="summary-line"><span>${t('serviceChargeLine')}</span><span>${baht(rawSubtotal * 0.10)}</span></div>`;
  if (showVat) html += `<div class="summary-line"><span>${t('vatLine')}</span><span>${baht((rawSubtotal * (showSvc ? 1.10 : 1)) * 0.07)}</span></div>`;
  html += `<div class="summary-line total"><span>${t('grandTotal')}</span><span>${baht(grand)}</span></div>`;
  html += '</div>';

  const ordered = state.catalog.filter((p) => (plateQty[p.id] || 0) > 0);
  if (ordered.length) {
    const totalPlates = ordered.reduce((s, p) => s + plateQty[p.id], 0);
    html += `<div class="plate-summary"><h3>${t('platesOrdered')} <span class="count-pill">${totalPlates}</span></h3>`;
    html += `<div class="table-scroll"><table class="result-table"><thead><tr><th>${t('thPlate')}</th><th>${t('thPrice')}</th><th>${t('thQty')}</th><th>${t('thSubtotal')}</th></tr></thead><tbody>`;
    ordered.forEach((p) => {
      const qty = plateQty[p.id];
      html += `<tr><td><span class="result-name"><span class="plate-dot" style="background:${p.color}"></span>${escapeHtml(plateLabel(p))}</span></td>`;
      html += `<td>฿${p.price}</td><td>×${qty}</td><td>${baht(p.price * qty)}</td></tr>`;
    });
    html += `</tbody><tfoot><tr><td>${t('totalRow')}</td><td></td><td>×${totalPlates}</td><td>${baht(rawSubtotal)}</td></tr></tfoot></table></div></div>`;
  }

  const sumDisplayed = rows.reduce((s, r) => s + Math.round(r.owe * 100) / 100, 0);
  const diff = Math.round((sumDisplayed - grand) * 100) / 100;
  if (Math.abs(diff) >= 0.01) {
    const sign = diff > 0 ? '+' : '';
    html += `<p class="reconcile">${state.lang === 'th'
      ? `หมายเหตุ: เมื่อปัดเศษแต่ละคนเป็น 2 ตำแหน่ง รวมได้ ${baht(sumDisplayed)} (${sign}${diff.toFixed(2)} เทียบกับยอดรวม)`
      : `Note: rounding each diner to 2 decimals sums to ${baht(sumDisplayed)} (${sign}${diff.toFixed(2)} vs grand total).`}</p>`;
  }

  out.innerHTML = html;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function refreshDependents() {
  renderAssigns();
  renderResults();
}

// ============================================================
//  Custom-plate color palette
// ============================================================
function renderSwatches() {
  const wrap = $('#cp-swatches');
  if (!wrap) return;
  wrap.innerHTML = '';
  SWATCHES.forEach((hex) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'swatch-btn' + (hex.toLowerCase() === selectedColor.toLowerCase() ? ' selected' : '');
    btn.style.background = hex;
    btn.setAttribute('aria-label', hex);
    btn.addEventListener('click', () => {
      selectedColor = hex;
      $('#cp-color').value = hex;
      renderSwatches();
    });
    wrap.append(btn);
  });
}

// ============================================================
//  i18n application
// ============================================================
function applyStaticI18n() {
  document.documentElement.lang = state.lang;
  document.title = t('title');
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-ph]').forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
  // language toggle active state
  document.querySelectorAll('.lang-btn').forEach((b) => b.classList.toggle('active', b.dataset.lang === state.lang));
}

function setLang(lang) {
  if (lang === state.lang) return;
  state.lang = lang;
  save();
  applyStaticI18n();
  renderPeople();
  renderRestaurants();
  renderPlates();
  renderAssigns();
  renderResults();
}

// ============================================================
//  Modal (custom confirm)
// ============================================================
function openModal() { $('#modal').hidden = false; }
function closeModal() { $('#modal').hidden = true; }

// ============================================================
//  Setup / wiring
// ============================================================
function setHeadcount() {
  const n = Math.max(1, Math.min(50, Math.floor(Number($('#headcount').value) || 1)));
  const existing = state.people;
  state.people = [];
  for (let i = 0; i < n; i++) {
    state.people.push(existing[i] || { id: uid(), name: `${state.lang === 'th' ? 'คนที่ ' : 'Person '}${i + 1}` });
  }
  const ids = new Set(state.people.map((p) => p.id));
  state.assigns.forEach((a) => { a.sharedBy = a.sharedBy.filter((id) => ids.has(id)); });
  save();
  renderPeople();
  $('#step-restaurant').hidden = false;
  renderRestaurants();
  if (state.restaurant) {
    $('#step-plates').hidden = false;
    $('#step-assign').hidden = false;
    $('#step-result').hidden = false;
    renderAssigns();
    renderResults();
  }
}

function addCustomPlate() {
  const name = $('#cp-name').value.trim();
  const price = Number($('#cp-price').value);
  if (!name) { alert(t('alertPlateName')); return; }
  if (!(price >= 0) || $('#cp-price').value === '') { alert(t('alertPrice')); return; }
  state.catalog.push({ id: uid(), name, price, color: selectedColor });
  sortCatalog();
  save();
  $('#cp-name').value = '';
  $('#cp-price').value = '';
  renderPlates();
  renderAssigns();
  renderResults();
}

function doReset() {
  localStorage.removeItem(STORAGE_KEY);
  const lang = state.lang; // keep language preference
  state = { lang, people: [], restaurant: null, catalog: [], lines: [], assigns: [], options: { service: false, vat: false } };
  idCounter = 1;
  selectedColor = SWATCHES[0];
  $('#headcount').value = 2;
  $('#step-restaurant').hidden = true;
  $('#step-plates').hidden = true;
  $('#step-assign').hidden = true;
  $('#step-result').hidden = true;
  $('#opt-service').checked = false;
  $('#opt-vat').checked = false;
  $('#cp-color').value = selectedColor;
  renderSwatches();
  renderPeople();
  closeModal();
}

function wire() {
  document.querySelectorAll('[data-headcount]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const delta = Number(btn.dataset.headcount);
      const input = $('#headcount');
      input.value = Math.max(1, Math.min(50, (Number(input.value) || 1) + delta));
    });
  });
  $('#set-people-btn').addEventListener('click', setHeadcount);
  $('#cp-add').addEventListener('click', addCustomPlate);
  $('#add-assign-btn').addEventListener('click', addAssignment);
  $('#reset-btn').addEventListener('click', openModal);

  $('#modal-cancel').addEventListener('click', closeModal);
  $('#modal-confirm').addEventListener('click', doReset);
  $('#modal').addEventListener('click', (e) => { if (e.target.id === 'modal') closeModal(); });

  $('#cp-color').addEventListener('input', (e) => { selectedColor = e.target.value; renderSwatches(); });

  document.querySelectorAll('.lang-btn').forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang)));

  $('#opt-service').addEventListener('change', (e) => { state.options.service = e.target.checked; save(); renderResults(); });
  $('#opt-vat').addEventListener('change', (e) => { state.options.vat = e.target.checked; save(); renderResults(); });
}

// ---- Init ---------------------------------------------------
function init() {
  wire();
  const restored = load();
  applyStaticI18n();
  $('#cp-color').value = selectedColor;
  renderSwatches();

  if (restored && state.people.length) {
    $('#headcount').value = state.people.length;
    $('#opt-service').checked = !!state.options.service;
    $('#opt-vat').checked = !!state.options.vat;
    renderPeople();
    $('#step-restaurant').hidden = false;
    renderRestaurants();
    if (state.restaurant) {
      $('#step-plates').hidden = false;
      $('#step-assign').hidden = false;
      $('#step-result').hidden = false;
      renderPlates();
      renderAssigns();
      renderResults();
    }
  }
}

document.addEventListener('DOMContentLoaded', init);
