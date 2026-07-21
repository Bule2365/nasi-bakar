# Implementation Roadmap - Nasi Bakar Mama Aura

> Roadmap implementasi perbaikan berdasarkan prioritas dan dampak.
> Dibuat: 21 Juli 2026

---

## Daftar Isi

1. [Roadmap Overview](#1-roadmap-overview)
2. [Phase 1: Critical Fixes](#2-phase-1-critical-fixes)
3. [Phase 2: Essential Improvements](#3-phase-2-essential-improvements)
4. [Phase 3: Quality Enhancements](#4-phase-3-quality-enhancements)
5. [Phase 4: Nice-to-Have Features](#5-phase-4-nice-to-have-features)
6. [Detailed Task Breakdown](#6-detailed-task-breakdown)
7. [Timeline and Milestones](#7-timeline-and-milestones)

---

## 1. Roadmap Overview

### Phase Summary

```
Phase 1: CRITICAL (Hari 1)
├── Gambar optimization (1-2 jam)
├── Schema.org LocalBusiness (1 jam)
├── og:image + og:url (30 menit)
├── Form error messages (1 jam)
├── Phone validation fix (30 menit)
└── sitemap.xml + robots.txt (15 menit)
    Total: ~4-5 jam

Phase 2: ESSENTIAL (Hari 2-3)
├── CSS custom properties (1 jam)
├── IIFE wrapper (1 jam)
├── ARIA attributes (2 jam)
├── WhatsApp fallback (15 menit)
├── Unify WhatsApp number (15 menit)
├── scroll-padding-top (5 menit)
├── prefers-reduced-motion (10 menit)
├── Favicon (15 menit)
├── theme-color meta (5 menit)
└── NAP consistency fix (10 menit)
    Total: ~5-6 jam

Phase 3: QUALITY (Minggu 2)
├── Event delegation (30 menit)
├── Order notes field (30 menit)
├── Pickup/delivery option (1 jam)
├── Quantity limit (10 menit)
├── Cart badge in header (30 menit)
├── Image dimensions (15 menit)
├── Print styles (15 menit)
└── autocomplete attributes (10 menit)
    Total: ~4 jam

Phase 4: NICE-TO-HAVE (Bulan 2+)
├── Back to top button (15 menit)
├── Social media links (15 menit)
├── Dark mode support (2 jam)
├── Post-checkout feedback (30 menit)
├── Cross-tab sync (30 menit)
├── ES Modules migration (2 jam)
└── Build tool setup (1 jam)
    Total: ~7 jam
```

### Total Estimated Effort

| Phase | Effort | Impact | Dependencies |
|-------|--------|--------|-------------|
| Phase 1 | 4-5 hours | 60% | None |
| Phase 2 | 5-6 hours | 20% | Phase 1 |
| Phase 3 | 4 hours | 15% | Phase 2 |
| Phase 4 | 7 hours | 5% | Phase 3 |
| **Total** | **20-22 hours** | **100%** | |

**With Phase 1 alone (4-5 hours), website improvement is already ~60%.**

---

## 2. Phase 1: Critical Fixes

### Goal: Website bisa diakses dan berfungsi dengan baik

### Tasks

#### Task 1.1: Optimize Images
- **Priority:** KRITIS
- **Effort:** 1-2 jam
- **Files:** 6 PNG files di `assets/images/`

**Steps:**
1. Buka https://squoosh.app di browser
2. Upload `nasiBakar-ayamSuwir.png`
3. Pilih output: WebP, Quality 80, Resize 400x400
4. Download hasilnya sebagai `ayam-suwir.webp`
5. Ulangi untuk semua 6 gambar
6. Simpan semua WebP files di `assets/images/menu/`
7. Update `data.js` untuk reference file WebP baru

**Updated data.js:**
```javascript
const MENU_DATA = [
    {
        id: "ayam",
        name: "Nasi Bakar Ayam Suwir",
        price: 10000,
        image: "assets/images/menu/ayam-suwir.webp"
    },
    // ... etc
];
```

**Acceptance Criteria:**
- [ ] Semua gambar dalam format WebP
- [ ] Ukuran per gambar < 200 KB
- [ ] Total ukuran gambar < 1 MB
- [ ] Gambar ditampilkan dengan benar di browser

---

#### Task 1.2: Add Schema.org LocalBusiness
- **Priority:** KRITIS
- **Effort:** 1 jam
- **File:** `index.html`

**Steps:**
1. Tambahkan `<script type="application/ld+json">` di `<head>`
2. Isi dengan data LocalBusiness
3. Test dengan Google Rich Results Test

**Code to add (after line 13 of index.html):**
```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "name": "Nasi Bakar Mama Aura",
    "image": "assets/images/menu/ayam-suwir.webp",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jl. Bukit Cinere 1",
        "addressLocality": "Cinere",
        "addressRegion": "Depok",
        "addressCountry": "ID"
    },
    "telephone": "+6281310283191",
    "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "06:30",
        "closes": "10:00"
    },
    "priceRange": "Rp10.000 - Rp13.000",
    "servesCuisine": "Indonesian"
}
</script>
```

**Acceptance Criteria:**
- [ ] Schema.org JSON-LD added
- [ ] No syntax errors
- [ ] Validated at https://search.google.com/test/rich-results

---

#### Task 1.3: Add og:image and og:url
- **Priority:** KRITIS
- **Effort:** 30 menit
- **Files:** `index.html`, OG image

**Steps:**
1. Buat OG image 1200x630px (bisa gunakan Canva.com gratis)
2. Simpan sebagai `assets/images/og-image.jpg` (< 300 KB)
3. Tambahkan OG tags di `<head>`

**Code to add:**
```html
<meta property="og:url" content="https://yourdomain.com/">
<meta property="og:image" content="https://yourdomain.com/assets/images/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="Nasi Bakar Mama Aura">
<meta property="og:locale" content="id_ID">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Nasi Bakar Mama Aura">
<meta name="twitter:description" content="Nasi bakar segar setiap pagi. Pesan sekarang via WhatsApp!">
<meta name="twitter:image" content="https://yourdomain.com/assets/images/og-image.jpg">
```

**Acceptance Criteria:**
- [ ] OG image created (1200x630, < 300 KB)
- [ ] All OG tags added
- [ ] Twitter Card tags added
- [ ] Tested with https://developers.facebook.com/tools/debug/

---

#### Task 1.4: Add Form Error Messages
- **Priority:** KRITIS
- **Effort:** 1 jam
- **Files:** `index.html`, `style.css`, `app.js`

**Steps:**
1. Tambahkan `<span class="error-message">` di bawah setiap input di `index.html`
2. Tambahkan CSS untuk `.error-message`
3. Update `validateName()` dan `validateWhatsApp()` di `app.js`

**HTML changes (index.html):**
```html
<!-- After nama input -->
<span class="error-message" id="nama-error"></span>

<!-- After whatsapp input -->
<span class="error-message" id="whatsapp-error"></span>
```

**CSS addition (style.css):**
```css
.error-message {
    display: block;
    color: #e74c3c;
    font-size: 0.8rem;
    margin-top: 0.25rem;
    min-height: 1.2em;
}
```

**JS changes (app.js):**
```javascript
function validateName(name) {
    var isValid = name.trim().length >= 3;
    var errorEl = document.getElementById('nama-error');
    
    namaInputEl.classList.toggle('error', !isValid && name.length > 0);
    namaInputEl.classList.toggle('success', isValid);
    
    if (errorEl) {
        if (!isValid && name.length > 0) {
            errorEl.textContent = 'Nama harus minimal 3 karakter';
        } else {
            errorEl.textContent = '';
        }
    }
    
    return isValid;
}
```

**Acceptance Criteria:**
- [ ] Error messages visible when input invalid
- [ ] Error messages hidden when input valid or empty
- [ ] Messages are clear and helpful

---

#### Task 1.5: Fix Phone Validation
- **Priority:** KRITIS
- **Effort:** 30 menit
- **File:** `app.js`

**Changes to `validateWhatsApp()`:**
```javascript
function validateWhatsApp(phone) {
    var cleaned = cleanPhoneNumber(phone);
    var isDigitOnly = /^\d+$/.test(cleaned);
    var isValid = isDigitOnly && cleaned.length >= 10 && cleaned.length <= 15;
    
    whatsappInputEl.classList.toggle('error', !isValid && phone.length > 0);
    whatsappInputEl.classList.toggle('success', isValid);
    
    var errorEl = document.getElementById('whatsapp-error');
    if (errorEl && phone.length > 0) {
        if (!isDigitOnly) {
            errorEl.textContent = 'Nomor WhatsApp harus berupa angka';
        } else if (cleaned.length < 10) {
            errorEl.textContent = 'Nomor terlalu pendek (minimal 10 digit)';
        } else if (cleaned.length > 15) {
            errorEl.textContent = 'Nomor terlalu panjang (maksimal 15 digit)';
        } else {
            errorEl.textContent = '';
        }
    } else if (errorEl) {
        errorEl.textContent = '';
    }
    
    return isValid;
}
```

**Acceptance Criteria:**
- [ ] "abcdefghij" now rejected
- [ ] "0812345678" (10 digits) accepted
- [ ] "08123456789012345" (16 digits) rejected
- [ ] Error messages clear

---

#### Task 1.6: Create sitemap.xml and robots.txt
- **Priority:** KRITIS
- **Effort:** 15 menit
- **Files:** `sitemap.xml`, `robots.txt` (new files)

**sitemap.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://yourdomain.com/</loc>
        <lastmod>2026-07-21</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>
```

**robots.txt:**
```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

**Acceptance Criteria:**
- [ ] Both files created in root directory
- [ ] sitemap.xml is valid XML
- [ ] robots.txt follows standard format

---

## 3. Phase 2: Essential Improvements

### Goal: Code quality, accessibility, dan maintenance improved

### Tasks

#### Task 2.1: Add CSS Custom Properties
- **Effort:** 1 jam
- **File:** `style.css`

Add `:root` block at the top of `style.css` with all repeated values. Replace ~30 hardcoded colors with variable references.

#### Task 2.2: Wrap JavaScript in IIFE
- **Effort:** 1 jam
- **File:** `app.js`

Wrap entire `app.js` content in `(function() { 'use strict'; ... })();`

#### Task 2.3: Add ARIA Attributes
- **Effort:** 2 jam
- **Files:** `index.html`, `app.js`

Add `aria-live`, `aria-label`, `skip-link`, and update button labels.

#### Task 2.4: Quick Fixes (15 menit total)
- [ ] Add WhatsApp popup fallback (15 min)
- [ ] Unify WhatsApp number (15 min)
- [ ] Add `scroll-padding-top: 60px` (5 min)
- [ ] Add `prefers-reduced-motion` media query (10 min)
- [ ] Create favicon (15 min)
- [ ] Add `<meta name="theme-color" content="#d4451a">` (5 min)
- [ ] Fix NAP consistency in document.md (10 min)

---

## 4. Phase 3: Quality Enhancements

### Goal: UX improvements dan better conversion

### Tasks

#### Task 3.1: Implement Event Delegation
- **Effort:** 30 menit
- **File:** `app.js`

Replace `attachMenuEventListeners()` with single parent listener.

#### Task 3.2: Add Order Notes
- **Effort:** 30 menit
- **Files:** `index.html`, `app.js`

Add textarea for order notes, include in WhatsApp message.

#### Task 3.3: Add Pickup/Delivery Option
- **Effort:** 1 jam
- **Files:** `index.html`, `style.css`, `app.js`

Add radio buttons for pickup vs delivery, include in WhatsApp message.

#### Task 3.4: Add Quantity Limit
- **Effort:** 10 menit
- **File:** `app.js`

Add `MAX_QUANTITY = 10` check in `addToCart()`.

#### Task 3.5: Add Cart Badge
- **Effort:** 30 menit
- **Files:** `index.html`, `style.css`, `app.js`

Add item count badge in header, update on cart change.

#### Task 3.6: Remaining Enhancements (1.5 jam total)
- [ ] Add image `width`/`height` attributes (15 min)
- [ ] Add print styles (15 min)
- [ ] Add `autocomplete` attributes (10 min)

---

## 5. Phase 4: Nice-to-Have Features

### Goal: Polish dan future-proofing

### Tasks

#### Task 4.1: UX Polish
- [ ] Back to top button (15 min)
- [ ] Social media links in footer (15 min)
- [ ] Post-checkout feedback/toast (30 min)

#### Task 4.2: Code Modernization
- [ ] Migrate to ES Modules (2 jam)
- [ ] Set up simple build tool (1 jam)

#### Task 4.3: Advanced Features
- [ ] Dark mode support (2 jam)
- [ ] Cross-tab localStorage sync (30 min)
- [ ] Service worker for offline support (2 jam)

---

## 6. Detailed Task Breakdown

### Phase 1 Checklist (Hari 1)

```
Morning (2-3 jam):
□ Task 1.1: Optimize images
  □ Open squoosh.app
  □ Convert each PNG to WebP
  □ Resize to 400x400
  □ Save to assets/images/menu/
  □ Update data.js references
  □ Test all images display correctly

□ Task 1.2: Add Schema.org
  □ Copy JSON-LD template
  □ Customize with business data
  □ Add to index.html <head>
  □ Validate at Google Rich Results Test

Afternoon (2-3 jam):
□ Task 1.3: Add og:image
  □ Create OG image (Canva or similar)
  □ Add OG tags to index.html
  □ Add Twitter Card tags
  □ Test at Facebook Debugger

□ Task 1.4: Form error messages
  □ Add error-message spans to HTML
  □ Add CSS for error-message
  □ Update validateName() in JS
  □ Update validateWhatsApp() in JS
  □ Test all validation scenarios

□ Task 1.5: Fix phone validation
  □ Add regex check to validateWhatsApp()
  □ Test with various inputs

□ Task 1.6: sitemap + robots
  □ Create sitemap.xml
  □ Create robots.txt
  □ Validate both files
```

### Phase 2 Checklist (Hari 2-3)

```
□ CSS custom properties
  □ Define :root variables
  □ Replace all hardcoded colors
  □ Replace spacing values
  □ Test visual consistency

□ IIFE wrapper
  □ Wrap app.js in IIFE
  □ Verify all functionality works
  □ Check no global pollution

□ ARIA attributes
  □ Add aria-live to cart
  □ Add aria-labels to buttons
  □ Add skip-link
  □ Test with screen reader

□ Quick fixes
  □ WhatsApp popup fallback
  □ Unify WhatsApp number
  □ scroll-padding-top
  □ prefers-reduced-motion
  □ Favicon
  □ theme-color meta
  □ NAP consistency
```

---

## 7. Timeline and Milestones

### Week 1

| Day | Task | Hours | Milestone |
|-----|------|-------|-----------|
| Day 1 | Phase 1 (all tasks) | 4-5h | Website functional + SEO ready |
| Day 2 | Phase 2 (CSS + JS) | 3-4h | Code quality improved |
| Day 3 | Phase 2 (remaining) | 2-3h | Accessibility + maintenance |

### Week 2

| Day | Task | Hours | Milestone |
|-----|------|-------|-----------|
| Day 4 | Phase 3 (events + UX) | 2-3h | Better UX |
| Day 5 | Phase 3 (remaining) | 1-2h | Conversion optimized |
| Day 6 | Testing + bug fixes | 2-3h | Production ready |

### Week 3+

| Day | Task | Hours | Milestone |
|-----|------|-------|-----------|
| Day 7+ | Phase 4 (optional) | 7h | Future-proofed |

### Milestones

| Milestone | Criteria | Target |
|-----------|----------|--------|
| **M1: Accessible** | Images optimized, Schema.org added, error messages | Hari 1 |
| **M2: Maintainable** | CSS variables, IIFE, NAP consistent | Hari 3 |
| **M3: Inclusive** | ARIA attributes, reduced motion, skip-link | Hari 3 |
| **M4: Optimized** | Event delegation, quantity limits, cart badge | Minggu 2 |
| **M5: Production** | All tests pass, no critical bugs | Minggu 2 |
| **M6: Enhanced** | Dark mode, ES Modules, service worker | Bulan 2+ |

---

### Post-Implementation Verification

After completing each phase, verify:

```bash
# Phase 1 verification:
# 1. Check all images load (browser DevTools > Network tab)
# 2. Check image sizes (should be < 200 KB each)
# 3. Validate Schema.org (Google Rich Results Test)
# 4. Test social sharing (Facebook Debugger)
# 5. Test form validation (all scenarios)
# 6. Check sitemap.xml loads
# 7. Check robots.txt loads

# Phase 2 verification:
# 1. Check no global variables (window.cart should be undefined)
# 2. Check CSS variables work (inspect element)
# 3. Test with screen reader (NVDA/VoiceOver)
# 4. Check prefers-reduced-motion (browser dev tools)
# 5. Check favicon loads
# 6. Check scroll-padding-top works

# Phase 3 verification:
# 1. Test event delegation (add/remove items)
# 2. Test order notes (appears in WhatsApp message)
# 3. Test pickup/delivery (appears in WhatsApp message)
# 4. Test quantity limit (max 10)
# 5. Test cart badge (updates correctly)
```

---

> **Keseluruhan:** Roadmap ini dirancang untuk programmer pemula dengan waktu terbatas. Phase 1 (4-5 jam) memberikan dampak 60%. Phase 1 + 2 (9-11 jam) memberikan dampak 80%. Phase 1 + 2 + 3 (13-15 jam) memberikan dampak 95%. Phase 4 bersifat opsional dan bisa dilakukan kapan saja.
