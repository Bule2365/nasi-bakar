# Architecture Analysis - Nasi Bakar Mama Aura

> Analisa desain arsitektur project dan proposal perbaikan.
> Dibuat: 21 Juli 2026

---

## Daftar Isi

1. [Penilaian Arsitektur Saat Ini](#1-penilaian-arsitektur-saat-ini)
2. [Analisa Code Smell](#2-analisa-code-smell)
3. [Analisa Anti Pattern](#3-analisa-anti-pattern)
4. [Analisa Technical Debt](#4-analisa-technical-debt)
5. [Proposal Struktur Folder](#5-proposal-struktur-folder)
6. [Proposal Struktur Source Code](#6-proposal-struktur-source-code)
7. [Proposal Struktur Data](#7-proposal-struktur-data)
8. [Proposal Single Source Of Truth](#8-proposal-single-source-of-truth)
9. [Proposal Component Architecture](#9-proposal-component-architecture)
10. [Proposal Maintainability Architecture](#10-proposal-maintainability-architecture)
11. [Proposal Scalability Architecture](#11-proposal-scalability-architecture)
12. [Proposal Performance Architecture](#12-proposal-performance-architecture)
13. [Proposal UI Architecture](#13-proposal-ui-architecture)
14. [Proposal UX Architecture](#14-proposal-ux-architecture)

---

## 1. Penilaian Arsitektur Sa Ini

### Skor Keseluruhan

| Aspek | Skor | Keterangan |
|-------|------|------------|
| Struktur Project | 5/10 | Terlalu flat, tapi fungsional |
| Source Code Ready | 4/10 | Bisa jalan, tapi banyak issues |
| Mudah Dipelajari Pemula | 7/10 | Comments bagus, tapi global scope membingungkan |
| Terlalu Kompleks | 2/10 | Terlalu sederhana, banyak yang kurang |
| Mudah dikembangkan | 4/10 | Tight coupling, tidak modular |
| Best Practices | 4/10 | Beberapa best practice, banyak yang belum |
| Single Source of Truth | 3/10 | Duplikasi WhatsApp number, harga bisa stale |
| Technical Debt | 5/10 | Sedang, masih manageable |
| Code Smell | 4/10 | Beberapa code smell signifikan |
| Anti Pattern | 3/10 | Ada anti pattern yang perlu diperbaiki |

### Penilaian Detail

#### Apakah Struktur Project Sudah Baik?

**Jawaban: Cukup, tapi perlu perbaikan.**

Struktur saat ini:
```
nasi-bakar/
├── index.html
├── style.css
├── app.js
├── data.js
├── document.md
└── assets/images/
```

Masalah:
- Semua source file di root directory
- Tidak ada pemisahan antara CSS, JS, dan assets
- `document.md` (dokumentasi internal) bercampur dengan source code

#### Apakah Source Code Sudah Production Ready?

**Jawaban: BELUM.**

Issue production-readiness:
1. Gambar 51MB - tidak bisa di-deploy
2. Tidak ada minification
3. Tidak ada og:image - social sharing buruk
4. Tidak ada Schema.org - SEO lokal buruk
5. Accessibility gaps - tidak WCAG compliant
6. Tidak ada favicon - browser 404
7. Tidak ada error boundaries

#### Apakah Source Code Mudah Dipelajari Programmer Pemula?

**Jawaban: Cukup mudah.**

Positif:
- Code comments membantu
- Section labels memudahkan navigasi
- Tidak ada framework yang perlu dipelajari
- Logic sederhana dan linear

Negatif:
- 29 global variables membingungkan
- Tidak ada module system
- Tight coupling antar functions

#### Apakah Source Code Terlalu Kompleks?

**Jawaban: TIDAK, justru terlalu sederhana.**

Project ini undersimple - banyak fitur yang belum ada:
- Tidak ada error UI
- Tidak ada loading states
- Tidak ada order notes
- Tidak ada pickup/delivery options
- Tidak ada visual feedback untuk cart actions

#### Apakah Source Code Mudah Dikembangkan?

**Jawaban: Terbatas.**

Mudah untuk:
- Menambah menu baru (edit data.js)
- Mengubah harga (edit data.js)
- Mengubah teks (edit index.html)

Sulit untuk:
- Menambah halaman baru (perlu restructure)
- Menambah fitur baru (tight coupling)
- Mengubah layout (perlu edit banyak file)
- Menambah payment integration (tidak ada abstraction layer)

---

## 2. Analisa Code Smell

### Long Method

**Severity: RENDAH**

`generateWhatsAppMessage()` (app.js:99-125) - 27 baris, membangun message string. Cukup panjang tapi masih manageable.

**Trade-off:** Memisahkan menjadi helper functions akan menambah jumlah functions tanpa benefit signifikan untuk project sekecil ini.

### Data Clumps

**Severity: SEDANG**

`nama` dan `whatsapp` selalu di-pass bersamaan, di-validasi bersamaan, di-read dari DOM bersamaan.

**Trade-off:** Membungkus menjadi object `CustomerInfo` akan lebih clean, tapi menambah complexity untuk pemula.

### Feature Envy

**Severity: SEDANG**

`renderMenu()` memanggil `cart.find()` untuk setiap menu item - mengakses state cart dari context rendering menu.

**Solusi:** Pass quantity sebagai parameter atau gunakan computed state.

### Primitive Obsession

**Severity: RENDAH**

Cart items menggunakan primitive types (string id, string name, number price, number quantity).

**Solusi:** Bisa menggunakan CartItem class, tapi over-engineering untuk project ini.

### Global State

**Severity: TINGGI**

`let cart = []` adalah global mutable state. Seluruh functions bisa mengakses dan memodifikasi tanpa batasan.

---

## 3. Analisa Anti Pattern

### Full DOM Rebuild

**Severity: TINGGI**

```
updateView() -> renderMenu() + renderCart()
                ↓                    ↓
           innerHTML = ''        innerHTML = ''
           (destroy all)         (destroy all)
           (recreate all)        (recreate all)
```

Setiap cart action menghapus dan membuat ulang SEMUA DOM elements. Ini adalah **DOM thrashing anti-pattern**.

**Dampak:**
- Unnecessary reflows dan repaints
- Images re-evaluated for lazy loading
- Event listeners re-attached
- Layout shift potential

### String Concatenation for HTML

**Severity: SEDANG**

```javascript
menuEl.innerHTML = 
    '<img src="' + menu.image + '" alt="' + menu.name + '" ...'
```

Menggunakan string concatenation untuk membangun HTML. Tidak ada escaping.

**Dampak:**
- XSS potential (walaupun data saat ini hardcoded)
- Hard to read and maintain
- No syntax highlighting support

### No Module Pattern

**Severity: TINGGI**

```javascript
// data.js
const BUSINESS_DATA = { ... }  // Global!
const MENU_DATA = [ ... ]      // Global!

// app.js
let cart = []                   // Global!
function addToCart() {}         // Global!
function renderMenu() {}        // Global!
// ... 16 functions, all global
```

**Dampak:**
- 29 global identifiers
- Naming collision risk
- No encapsulation
- No dependency management

---

## 4. Analisa Technical Debt

### Debt Items

| Item | Severity | Estimasi Perbaikan | Dampak jika Tidak Diperbaiki |
|------|----------|--------------------|------------------------------|
| Gambar tidak di-optimasi | KRITIS | 1-2 jam | Website tidak bisa diakses |
| Tidak ada Schema.org | TINGGI | 1 jam | SEO lokal sangat buruk |
| Global scope pollution | SEDANG | 2-3 jam | Naming collision, debugging sulit |
| Full DOM re-render | SEDANG | 3-4 jam | Performance buruk saat scale |
| Phone validation | SEDANG | 30 menit | Invalid orders |
| Missing accessibility | SEDANG | 2-3 jam | Tidak compliant, user loss |
| Tidak ada CSS custom props | RENDAH | 1 jam | Maintenance overhead |
| Inline styles di JS | RENDAH | 1 jam | CSS specificity issues |
| Duplikasi WhatsApp number | RENDAH | 15 menit | Data inconsistency |

**Total estimasi perbaikan: 12-16 jam**

### Debt Trend

Technical debt saat ini **stable** - tidak bertambah karena tidak ada development aktif. Namun setiap fitur baru akan menambah debt jika arsitektur tidak diperbaiki terlebih dahulu.

---

## 5. Proposal Struktur Folder

### Struktur Saat Ini

```
nasi-bakar/
├── index.html
├── style.css
├── app.js
├── data.js
├── document.md
└── assets/images/*.png
```

### Struktur Proposed

```
nasi-bakar/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── data.js
│   └── app.js
├── assets/
│   ├── images/
│   │   ├── menu/
│   │   │   ├── ayam-suwir.webp
│   │   │   ├── tongkol.webp
│   │   │   ├── ayam-jamur-suwir.webp
│   │   │   ├── ati-ampela.webp
│   │   │   ├── cumi.webp
│   │   │   └── teri.webp
│   │   └── og-image.jpg (social sharing image)
│   └── favicon.ico
├── docs/
│   ├── investigation.md
│   ├── architecture.md
│   ├── ui-ux.md
│   ├── performance.md
│   ├── seo.md
│   ├── checkout.md
│   ├── recommendations.md
│   └── roadmap.md
├── document.md (internal docs)
└── .gitignore
```

### Alasan

1. **Pemisahan CSS dan JS** - Memudahkan navigasi dan maintenance
2. **Folder `assets/images/menu/`** - Gambar produk terorganisir
3. **Format WebP** - Ukuran 80% lebih kecil dari PNG
4. **OG image terpisah** - Untuk social sharing
5. **Favicon** - Mencegah browser 404
6. **Folder `docs/`** - Dokumentasi terorganisir

### Trade-off

| Approach | Kelebihan | Kekurangan |
|----------|-----------|------------|
| Flat structure (saat ini) | Simpel, langsung | Sulit navigate saat banyak file |
| Separated structure (proposed) | Terorganisir, scalable | Perlu update script references |

**Rekomendasi: Gunakan proposed structure.** Benefit jauh lebih besar dari cost perubahan untuk project ini.

---

## 6. Proposal Struktur Source Code

### Struktur Saat Ini

```
app.js (351 baris)
├── State Management (baris 5-8)
├── Local Storage (baris 10-35)
├── DOM Elements (baris 37-48)
├── Form Validation (baris 50-91)
├── WhatsApp Checkout (baris 93-148)
├── Render Menu (baris 150-182)
├── Cart Operations (baris 184-236)
├── Calculations (baris 238-252)
├── Render Cart (baris 254-293)
├── Update View (baris 295-304)
├── Event Listeners (baris 306-339)
└── Initialization (baris 341-351)
```

### Struktur Proposed

```
js/
├── config.js          (~20 baris) - Konstanta dan konfigurasi
├── data.js            (~63 baris) - Data bisnis dan menu (SUDAH ADA)
├── storage.js         (~40 baris) - Local storage operations
├── validation.js      (~50 baris) - Form validation
├── cart.js            (~80 baris) - Cart state management
├── render.js          (~100 baris) - DOM rendering
├── whatsapp.js        (~60 baris) - WhatsApp checkout
├── events.js          (~50 baris) - Event listeners
└── app.js             (~30 baris) - Initialization
```

### Alasan

1. **Separation of concerns** - Setiap file punya satu tanggung jawab
2. **Independent files** - Bisa diedit tanpa affect file lain
3. **Maintainability** - Mudah cari kode terkait
4. **Testability** - Setiap module bisa di-test terpisah

### Trade-off

| Approach | Kelebihan | Kekurangan |
|----------|-----------|------------|
| Single file (saat ini) | Simpel, satu tempat | Sulit navigate, tightly coupled |
| Multiple files (proposed) | Modular, organized | Perlu script loading order benar |

**Rekomendasi: Gunakan multiple files.** Untuk programmer pemula, memisahkan concerns akan memudahkan belajar dan maintenance.

---

## 7. Proposal Struktur Data

### Struktur Saat Ini

```javascript
// data.js
const BUSINESS_DATA = {
    nama: "Nasi Bakar Mama Aura",
    alamat: "Jl. Bukit Cinere 1",
    whatsappNumber: "+62 813-1028-3191",
    jamOperasional: { buka: "06:30 AM", tutup: "10:00 AM", zona: "WIB" },
    operasionalNotice: "..."
};

const MENU_DATA = [
    { id: "ayam", name: "...", price: 10000, image: "..." },
    // ...
];
```

### Struktur Proposed

```javascript
// config.js
const CONFIG = {
    STORAGE_KEY: 'nasiBakarCart',
    WHATSAPP_NUMBER: '6281310283191',
    MAX_QUANTITY_PER_ITEM: 10,
    MIN_NAME_LENGTH: 3,
    PHONE_MIN_LENGTH: 10,
    PHONE_MAX_LENGTH: 15
};

// data.js (tetap sama, tapi tanpa whatsappNumber)
const BUSINESS_DATA = {
    nama: "Nasi Bakar Mama Aura",
    alamat: "Jl. Bukit Cinere 1",
    jamOperasional: { ... },
    operasionalNotice: "..."
};

const MENU_DATA = [ ... ];
```

### Alasan

1. **Konstanta terpusat** - Semua configurable values di satu tempat
2. **Business data terpisah dari config** - Business data bisa berubah, config relatif statis
3. **Single source of truth** - WhatsApp number hanya di CONFIG

---

## 8. Proposal Single Source Of Truth

### Masalah Saat Ini

| Data | Lokasi 1 | Lokasi 2 | Konsisten? |
|------|----------|----------|------------|
| WhatsApp number | `BUSINESS_DATA.whatsappNumber` (+62 813-1028-3191) | `WHATSAPP_NUMBER` (6281310283191) | FORMAT BERBEDA |
| Alamat | `document.md` (Pangkalan Jati Baru No. 58) | `index.html` + `data.js` (Bukit Cinere 1) | BERBEDA |
| Harga | `document.md` (Rp 15.000/18.000) | `data.js` (Rp 10.000/13.000) | BERBEDA |

### Solusi

1. **WhatsApp number:** Hanya di `config.js`, `data.js` reference dari `CONFIG.WHATSAPP_NUMBER`
2. **Alamat:** Hanya di `data.js`, `index.html` di-render oleh JavaScript
3. **Harga:** Hanya di `data.js`, `document.md` dianggap outdated

### Implementasi

```javascript
// Satu sumber kebenaran untuk WhatsApp
const WHATSAPP_NUMBER = CONFIG.WHATSAPP_NUMBER;

// Business data menggunakan angka dari config
generateWhatsAppMessage() {
    const url = 'https://wa.me/' + CONFIG.WHATSAPP_NUMBER + '?text=...';
}
```

---

## 9. Proposal Component Architecture

### Konsep

Untuk vanilla JS tanpa framework, "component" adalah fungsi yang mengembalikan HTML string atau DOM element.

### Component Tree

```
App
├── Header (brand name + sticky navigation)
├── HeroSection (tagline, description, badges, CTA)
├── MenuSection
│   └── MenuList
│       └── MenuItem[] (image, name, price, quantity controls)
├── TrustSection
│   └── TrustGrid
│       └── TrustItem[] (icon, title, description)
├── AboutSection
├── CartSection
│   ├── CartEmpty (empty state)
│   └── CartList
│       └── CartItem[] (name, qty, price, remove button)
├── CheckoutSection
│   ├── OrderForm (name, phone inputs)
│   └── CheckoutButton
├── LocationSection
│   └── MapLink
├── AreaSection
│   └── AreaList
└── Footer
```

### Implementasi

```javascript
// render.js
function renderMenuItem(menu, quantity) {
    return '<div class="menu-item">' +
        '<img src="' + menu.image + '" alt="' + menu.name + '">' +
        // ...
    '</div>';
}

function renderMenu() {
    var html = '';
    MENU_DATA.forEach(function(menu) {
        var item = cart.find(function(i) { return i.id === menu.id; });
        var qty = item ? item.quantity : 0;
        html += renderMenuItem(menu, qty);
    });
    menuListEl.innerHTML = html;
    attachMenuEventListeners();
}
```

### Trade-off

| Approach | Kelebihan | Kekurangan |
|----------|-----------|------------|
| Template strings (proposed) | Simple, readable | No escaping, potential XSS |
| DOM API | Safe, no XSS | More verbose, harder to read |
| Virtual DOM | Efficient updates | Over-engineering for this project |

**Rekomendasi: Template strings untuk project ini.** Data hardcoded, XSS risk minimal.

---

## 10. Proposal Maintainability Architecture

### Prinsip

1. **DRY (Don't Repeat Yourself)** - Eliminasi duplikasi
2. **Single Responsibility** - Setiap fungsi punya satu tugas
3. **Configuration over Hardcoding** - Values di config, bukan inline
4. **Fail Gracefully** - Error handling di setiap level

### Checklist Maintainability

| Item | Saat Ini | Target |
|------|----------|--------|
| CSS custom properties | 0 | ~15 (colors, spacing, fonts) |
| Config centralized | Tidak | Ya |
| Error handling | Console only | Visual feedback |
| Comments | Bagus | Pertahankan + tambah |
| Naming conventions | Inconsistent | Konsisten kebab-case |
| ID selectors untuk styling | 9 | 0 (ganti class) |

---

## 11. Proposal Scalability Architecture

### Scale Dimensions

| Dimension | Saat Ini | Possible Future |
|-----------|----------|-----------------|
| Menu items | 6 | 20+ |
| Locations | 1 | Multi-location |
| Languages | 1 (ID) | 2+ (ID, EN) |
| Pages | 1 | Multi-page |
| Payment | WhatsApp | Midtrans, GoPay, etc |
| Features | Basic checkout | Promo, loyalty, etc |

### Scalability Strategy

1. **Data-driven rendering** - Menu items dari data, bukan hardcoded HTML
2. **Configuration-based** - Feature flags di config
3. **Modular JS** - Setiap fitur terpisah
4. **CSS custom properties** - Theme-able
5. **Semantic HTML** - Easy to extend

### Scaling Path

```
Phase 1 (current) -> Phase 2 (refactored) -> Phase 3 (extended)
                                                         ↓
                                              Multi-page, payment, promo
```

---

## 12. Proposal Performance Architecture

### Performance Budget

| Resource | Target | Saat Ini |
|----------|--------|----------|
| Total page weight | < 500 KB | ~50 MB |
| HTML | < 10 KB | ~6 KB |
| CSS | < 15 KB | ~12 KB |
| JavaScript | < 20 KB | ~13 KB |
| Images total | < 300 KB | ~51 MB |
| Fonts | 0 KB (system) | 0 KB |
| First Contentful Paint | < 1.5s | ~15s+ (est.) |
| Largest Contentful Paint | < 2.5s | ~20s+ (est.) |

### Performance Strategy

1. **Image optimization** - Convert PNG to WebP, resize to max 400px
2. **CSS delivery** - Inline critical CSS, defer non-critical
3. **JS loading** - Use `defer` attribute
4. **Font loading** - Already using system fonts (good)
5. **Caching** - Add cache headers via .htaccess or meta tags
6. **Minification** - CSS and JS minification

---

## 13. Proposal UI Architecture

### Design System

```css
:root {
    /* Colors */
    --color-primary: #d4451a;
    --color-primary-dark: #b33a15;
    --color-success: #27ae60;
    --color-danger: #e74c3c;
    --color-warning: #f39c12;
    --color-whatsapp: #25d366;

    /* Text */
    --text-primary: #333;
    --text-secondary: #666;
    --text-muted: #999;

    /* Backgrounds */
    --bg-body: #fff;
    --bg-section: #f9f9f9;
    --bg-card: #fff;

    /* Borders */
    --border-light: #eee;
    --border-medium: #ddd;

    /* Spacing */
    --space-xs: 0.25rem;
    --space-sm: 0.5rem;
    --space-md: 1rem;
    --space-lg: 1.5rem;
    --space-xl: 2rem;

    /* Typography */
    --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-size-sm: 0.85rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;

    /* Border Radius */
    --radius-sm: 4px;
    --radius-md: 6px;
    --radius-lg: 8px;

    /* Shadows */
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 2px 8px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

### Alasan

1. **Konsistensi** - Semua styling reference ke custom properties
2. **Maintainability** - Mengubah warna = ubah 1 variabel
3. **Theming** - Mudah tambah dark mode nanti
4. **Pemula-friendly** - Variabel lebih mudah dipahami daripada hex values

---

## 14. Proposal UX Architecture

### User Flow

```
1. Land on page
   ↓
2. See hero (value proposition)
   ↓
3. Scroll to menu OR click "Pesan Sekarang"
   ↓
4. Browse menu items
   ↓
5. Add items to cart (+ button)
   ↓
6. See cart updates (real-time)
   ↓
7. Fill name and phone
   ↓
8. Click "Pesan via WhatsApp"
   ↓
9. Confirm order summary
   ↓
10. Redirect to WhatsApp with pre-filled message
```

### UX Improvements

| Improvement | Benefit | Complexity |
|-------------|---------|------------|
| Toast notification on add to cart | Better feedback | LOW |
| Quantity limit (max 10) | Prevent accidental large orders | LOW |
| Order notes textarea | Better communication | MEDIUM |
| Pickup vs delivery option | Flexibility | MEDIUM |
| Estimated total in cart | Transparency | LOW |
| Clear cart button | Convenience | LOW |
| Scroll to cart after adding | Better flow | LOW |

---

> **Keseluruhan:** Arsitektur saat ini cukup untuk MVP (Minimum Viable Product), tapi memerlukan refactoring signifikan sebelum bisa di-scale. Prioritas utama: optimasi gambar, single source of truth, modular JS, dan CSS custom properties.
