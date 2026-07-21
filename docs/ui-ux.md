# UI/UX Analysis - Nasi Bakar Mama Aura

> Analisa UI dan UX secara menyeluruh dengan kritik dan saran perbaikan.
> Dibuat: 21 Juli 2026

---

## Daftar Isi

1. [Layout Analysis](#1-layout-analysis)
2. [Typography Analysis](#2-typography-analysis)
3. [User Journey Analysis](#3-user-journey-analysis)
4. [Checkout Flow Analysis](#4-checkout-flow-analysis)
5. [Form Validation UX](#5-form-validation-ux)
6. [Mobile Experience](#6-mobile-experience)
7. [Empty State Analysis](#7-empty-state-analysis)
8. [Error Handling UX](#8-error-handling-ux)
9. [Conversion Rate Optimization](#9-conversion-rate-optimization)
10. [Local Business Experience](#10-local-business-experience)
11. [Trust Building Analysis](#11-trust-building-analysis)
12. [Call To Action Analysis](#12-call-to-action-analysis)
13. [Accessibility UX](#13-accessibility-ux)
14. [Rekomendasi Perbaikan](#14-rekomendasi-perbaikan)

---

## 1. Layout Analysis

### Layout Saat Ini

```
┌─────────────────────────────────┐
│         HEADER (sticky)         │  ← Brand name only
├─────────────────────────────────┤
│         HERO SECTION            │  ← Tagline, description,
│   Badge | Badge | Badge         │     badges, CTA button
│      [Pesan Sekarang]           │
├─────────────────────────────────┤
│         MENU KAMI               │  ← Menu cards (stacked)
│   [Img] Name Price  [- 0 +]    │
│   [Img] Name Price  [- 0 +]    │
│   [Img] Name Price  [- 0 +]    │
│   ... (6 items)                 │
├─────────────────────────────────┤
│    KENAPA MEMILIH MAMA AURA?    │  ← Trust grid
│   Icon    Icon    Icon           │
│   Title   Title   Title         │
│   Desc    Desc    Desc          │
├─────────────────────────────────┤
│      TENTANG MAMA AURA          │  ← About text
├─────────────────────────────────┤
│      KERANJANG BELANJA          │  ← Cart (empty/items + total)
├─────────────────────────────────┤
│    INFORMASI PEMESANAN          │  ← Form (name, phone)
├─────────────────────────────────┤
│   [PesAN VIA WHATSAPP]         │  ← Checkout button (sticky bottom)
├─────────────────────────────────┤
│        LOKASI KAMI              │  ← Address, hours, map link
├─────────────────────────────────┤
│    AREA PELAYANAN KAMI          │  ← Service areas list
├─────────────────────────────────┤
│           FOOTER                │  ← Copyright, address
└─────────────────────────────────┘
```

### Kritik Layout

#### Positif
1. **Linear flow** - User scroll dari atas ke bawah, mengikuti natural reading pattern
2. **Sticky header** - Brand name selalu terlihat
3. **Sticky checkout button** - CTA selalu accessible di bottom
4. **Sectioned content** - Clear separation antar sections
5. **Mobile-first** - Layout dirancang untuk mobile dulu

#### Negatif
1. **Keranjang belanja (cart) berada DI TENGAH flow.** User harus scroll melewati cart sebelum reach form checkout. Ini **counter-intuitive**. Seharusnya: Menu -> Form -> Cart Summary -> Checkout.

2. **Tombol checkout sticky di bottom menutupi konten.** Saat user scroll untuk baca lokasi atau area pelayanan, tombol checkout menghalangi konten. Butuh `padding-bottom` pada sections terakhir.

3. **Header sticky menutupi section targets.** Saat user klik anchor `#menu`, sticky header (~60px) menutupi bagian atas section menu. Perlu `scroll-padding-top` di CSS.

4. **Tidak ada visual separation yang kuat antar sections.** Semua sections memiliki background `#f9f9f9` yang sama. Perlu variasi visual untuk memecah monotonitas.

5. **Map placeholder bukan peta sesungguhnya.** Hanya area dengan border dashed. User mungkin expect peta interaktif.

### Saran Layout

| Masalah | Solusi | Prioritas |
|---------|--------|-----------|
| Cart di tengah flow | Pindah cart SEBELUM form, atau gabungkan sebagai order summary | TINGGI |
| Checkout button menutupi konten | Tambah padding-bottom 80px pada sections terakhir | SEDANG |
| Header menutupi anchor targets | Tambah `scroll-padding-top: 60px` pada `html` | SEDANG |
| Monotonitas visual | Varian background color antar sections | RENDAH |
| Map placeholder | Pertahankan sebagai placeholder, tapi tambah label "Coming Soon" | RENDAH |

---

## 2. Typography Analysis

### Typography Saat Ini

| Element | Font | Size (mobile) | Weight | Color |
|---------|------|---------------|--------|-------|
| h1 (brand) | System | 1.25rem (20px) | 600 | #fff |
| h2 (section) | System | 1.125rem (18px) | 600 | #d4451a |
| h3 (trust) | System | 1rem (16px) | normal | #333 |
| Hero tagline | System | 1.5rem (24px) | 700 | #fff |
| Body text | System | 1rem (16px) | normal | #333 |
| Menu name | System | 0.95rem (15.2px) | 500 | #333 |
| Menu price | System | 0.9rem (14.4px) | 600 | #d4451a |
| Small text | System | 0.85rem (13.6px) | normal | #666 |

### Kritik Typography

#### Positif
1. **System font stack** - Cepat, native rendering, tidak perlu load web font
2. **Rem-based sizing** - Accessible, respect user font preferences
3. **Hierarki jelas** - h1 > h2 > h3 > body > small
4. **Line height 1.6** - Good for readability
5. **Letter spacing pada hero** - Adds visual interest

#### Negatif
1. **Tidak ada `clamp()` untuk responsive typography.** Font size hard-coded per breakpoint. Seharusnya:
   ```css
   .hero-tagline { font-size: clamp(1.5rem, 4vw, 2rem); }
   ```

2. **Font weight tidak cukup bervariasi.** Hanya 400, 500, 600, 700. Kurang visual hierarchy.

3. **Color contrast issue.** 
   - `.hero-stock` (gold #ffd700 on red gradient) - kemungkinan besar di bawah WCAG AA 3:1
   - `.hero-badge` (white on rgba(255,255,255,0.2)) - background transparan, contrast rendah

4. **Tidak ada `line-height` khusus untuk headings.** h1, h2, h3 menggunakan line-height inherit (1.6) yang terlalu longgar untuk headings.

5. **Footer text terlalu kecil.** 0.85rem = 13.6px. Di mobile, ini bisa sulit dibaca.

### Saran Typography

| Masalah | Solusi | Prioritas |
|---------|--------|-----------|
| Hard-coded font sizes | Gunakan `clamp()` untuk fluid typography | SEDANG |
| Line-height headings | Tambah `line-height: 1.2` untuk h1, h2 | RENDAH |
| Color contrast | Ganti gold-on-red dengan white-on-red | TINGGI |
| Footer text | Minimum 0.9rem | RENDAH |

---

## 3. User Journey Analysis

### User Journey Saat Ini

```
1. User datang ke website (via link, search, atau social)
   ↓
2. Lihat hero section (brand name, tagline, CTA)
   ↓
3. Klik "Pesan Sekarang" atau scroll manual
   ↓
4. Browse 6 menu items
   ↓
5. Klik "+" untuk menambah item
   ↓
6. Scroll ke bawah untuk lihat cart
   ↓
7. Lanjut scroll untuk isi form
   ↓
8. Isi nama dan nomor WhatsApp
   ↓
9. Klik tombol checkout (sticky bottom)
   ↓
10. Konfirmasi di dialog
   ↓
11. Redirect ke WhatsApp
```

### Kritik User Journey

#### Positif
1. **Single page, single purpose** - Tidak ada navigasi membingungkan
2. **Linear flow** - Sesuai reading pattern (F-pattern / Z-pattern)
3. **Real-time feedback** - Cart update langsung saat klik +/-
4. **Confirmation step** - Mencegah accidental orders

#### Negatif

1. **User harus scroll terlalu banyak.** Dari hero ke checkout button ada ~7 sections. Di mobile, ini bisa 15-20 scroll screens.

2. **Tidak ada "back to top" button.** Setelah scroll ke bawah, user harus manual scroll ke atas.

3. **Menu dan Cart terpisah.** User tidak bisa langsung melihat total saat menambah item. Harus scroll ke cart section.

4. **Trust building sections di TENGAH flow.** "Kenapa Memilih" dan "Tentang" berada antara menu dan cart. Ini mengganggu flow checkout.

5. **Tidak ada visual indicator** berapa item yang sudah ditambahkan di cart. User harus scroll ke cart untuk cek.

6. **CTA "Pesan Sekarang" hanya scroll ke menu.** Tidak ada shortcut ke checkout.

### Saran User Journey

| Masalah | Solusi | Prioritas |
|---------|--------|-----------|
| Terlalu banyak scroll | Gabungkan cart + form sebagai floating panel atau sticky section | SEDANG |
| Tidak ada item count indicator | Tambah badge counter di header atau floating cart icon | TINGGI |
| Trust sections mengganggu flow | Pindah trust sections SETELAH checkout, atau buat collapsible | SEDANG |
| Tidak ada back to top | Tambah floating button atau gunakan header sebagai back-to-top | RENDAH |

---

## 4. Checkout Flow Analysis

### Flow Saat Ini

```
Step 1: Browse menu → 6 items
Step 2: Click +/- buttons → Cart updates
Step 3: Scroll down → Cart section
Step 4: Scroll down → Form (name, phone)
Step 5: Fill form → Validation runs on each keystroke
Step 6: Button becomes enabled → Click checkout
Step 7: Confirm dialog → Shows summary
Step 8: Click OK → Opens WhatsApp in new tab
```

### Kritik Checkout Flow

#### Positif
1. **Hanya 2 input fields** - Minimal friction
2. **Real-time validation** - User tahu error saat mengetik
3. **Confirmation dialog** - Prevents accidental orders
4. **WhatsApp pre-filled message** - Seamless handoff
5. **Button disabled until valid** - Prevents incomplete orders

#### Negatif

1. **Tidak ada order summary VISIBLE sebelum checkout.** User harus tekan button dulu untuk lihat summary di confirm dialog. Seharusnya ada order summary yang selalu terlihat.

2. **Tidak ada catatan pesanan.** User tidak bisa menambahkan instruksi khusus (contoh: "tanpa pedas", "extra sambal").

3. **Tidak ada opsi pickup vs delivery.** User tidak bisa menyatakan ingin diambil atau diantar.

4. **Cart tidak di-clear setelah checkout.** User bisa accidentally submit twice.

5. **Tidak ada loading/processing state.** Saat membuka WhatsApp, tidak ada visual feedback.

6. **Tidak ada error handling** jika WhatsApp tidak terinstall atau browser block popup.

7. **Tombol checkout sticky di bottom.** Saat form belum valid, button disabled tapi tetap terlihat. Bisa membingungkan.

8. **Tidak ada estimated time** atau availability info di checkout.

### Saran Checkout Flow

| Masalah | Solusi | Prioritas |
|---------|--------|-----------|
| Tidak ada visible summary | Tambah order summary di atas form | TINGGI |
| Tidak ada catatan pesanan | Tambah textarea untuk notes | SEDANG |
| Tidak ada pickup/delivery | Tambah radio button pilihan | SEDANG |
| Cart tidak clear | Clear cart setelah redirect WhatsApp | RENDAH |
| Tidak ada error handling | Tambah fallback redirect | SEDANG |
| Tidak ada estimated time | Tambah badge "Estimasi: 10-15 menit" | RENDAH |

---

## 5. Form Validation UX

### Validasi Saat Ini

| Field | Validasi | Visual Feedback |
|-------|----------|-----------------|
| Nama | min 3 chars (trimmed) | Green border (success), Red border (error) |
| WhatsApp | 10-15 digits (cleaned) | Green border (success), Red border (error) |

### Kritik Form Validation

#### Positif
1. **Real-time validation** - Saat user mengetik
2. **Visual indicators** - Border color berubah
3. **Labels persist** - Labels tidak menghilang (bukan placeholder-only)
4. **Required fields** - Browser native required attribute

#### Negatif

1. **Tidak ada error messages.** User hanya melihat border merah, tapi tidak tahu kenapa. "Nama harus minimal 3 karakter" akan sangat membantu.

2. **Validation berjalan terlalu agresif.** Setiap keystroke memanggil `updateCheckoutButton()` yang re-validates SEMUA fields. User yang baru mulai mengetik nama sudah melihat error di phone field.

3. **Success state tidak konsisten.** Input `.error` punya `box-shadow`, tapi `.success` hanya `border-color`. Inconsistent visual language.

4. **Phone validation terlalu permisif.** "abcdefghij" (10 chars) lolos validasi. Hanya cek length, bukan digits.

5. **Tidak ada format hint untuk phone.** Placeholder "08123456789" membantu, tapi tidak ada label "Format: 08xxx" atau "Nomor tanpa spasi".

6. **Tidak ada autocomplete attributes.** `autocomplete="name"` dan `autocomplete="tel"` akan mempercepat form filling di mobile.

### Saran Form Validation

| Masalah | Solusi | Prioritas |
|---------|--------|-----------|
| Tidak ada error messages | Tambah `<span class="error-msg">` di bawah input | TINGGI |
| Validation agresif | Debounce validation atau validate only on blur | SEDANG |
| Success state tidak konsisten | Tambah box-shadow pada .success | RENDAH |
| Phone validation permisif | Tambah regex `/^\d+$/` setelah clean | TINGGI |
| Tidak ada autocomplete | Tambah autocomplete attributes | SEDANG |

---

## 6. Mobile Experience

### Mobile Assessment

| Aspek | Skor | Detail |
|-------|------|--------|
| Viewport | 10/10 | Correct meta tag |
| Touch targets | 7/10 | Buttons 32px (min 44px recommended) |
| Font readability | 9/10 | Good sizes, system fonts |
| Form usability | 8/10 | Full-width inputs, good padding |
| Horizontal scroll | 10/10 | Tidak ada |
| Image loading | 2/10 | 8MB+ per gambar = forever loading |
| Scroll depth | 5/10 | Terlalu banyak sections untuk scroll |
| Checkout access | 9/10 | Sticky button always accessible |
| Cart visibility | 5/10 | Harus scroll untuk lihat cart |

### Kritik Mobile Experience

#### Positif
1. **Mobile-first CSS** - Base styles untuk mobile
2. **Full-width inputs** - Easy to tap
3. **Sticky checkout button** - Always accessible
4. **Flex-wrap pada badges** - Wraps gracefully
5. **No horizontal overflow** - Clean mobile layout

#### Negatif

1. **Gambar 8MB+ tidak bisa dimobile.** Di jaringan 3G/4G Indonesia, loading 1 gambar saja butuh 5-10 detik. 6 gambar = 30-60 detik.

2. **Quantity buttons terlalu kecil.** 32px x 32px di mobile. Apple recommendation: 44px minimum. Google: 48dp.

3. **Terlalu banyak scroll.** Dari hero ke checkout ada ~7 sections. Di iPhone SE, ini bisa 20+ scroll screens.

4. **Tidak ada pull-to-refresh** atau gesture untuk quick actions.

5. **Checkout button sticky bisa menutupi konten** di mobile screens yang kecil.

6. **Tidak ada bottom safe area handling.** Di iPhone dengan notch/home indicator, sticky button bisa terpotong.

### Saran Mobile

| Masalah | Solusi | Prioritas |
|---------|--------|-----------|
| Gambar 8MB+ | Konversi ke WebP, max 400px | KRITIS |
| Quantity buttons kecil | Perbesar ke 44px minimum | SEDANG |
| Terlalu banyak scroll | Gabungkan sections | SEDANG |
| Bottom safe area | Tambah `padding-bottom: env(safe-area-inset-bottom)` | RENDAH |

---

## 7. Empty State Analysis

### Empty State Saat Ini

```
┌─────────────────────────────┐
│     Keranjang Belanja       │
│                             │
│  ┌───────────────────────┐  │
│  │   Belum ada pesanan.  │  │
│  │                       │  │
│  │ Silakan pilih menu    │  │
│  │ terlebih dahulu.      │  │
│  └───────────────────────┘  │
│                             │
│    [Checkout Button]        │
└─────────────────────────────┘
```

### Kritik Empty State

#### Positif
1. **Ada empty state** - Banyak website UMKM tidak punya
2. **Dashed border** - Visual cue bahwa area ini kosong
3. **Clear message** - "Belum ada pesanan" + instruksi
4. **Checkout button disabled** - Prevents empty checkout

#### Negatif

1. **Tidak ada CTA di empty state.** "Silakan pilih menu terlebih dahulu" adalah teks pasif. Seharusnya ada link/button: "Lihat Menu" atau "Pesan Sekarang".

2. **Empty state tersembunyi.** Cart section berada di tengah page. User harus scroll untuk menemukannya.

3. **Tidak ada visual illustration.** Hanya teks. Illustrasi empty cart (icon keranjang kosong) akan lebih engaging.

### Saran Empty State

| Masalah | Solusi | Prioritas |
|---------|--------|-----------|
| Tidak ada CTA | Tambah link "Lihat Menu" ke #menu | SEDANG |
| Tidak ada illustration | Tambah SVG icon keranjang kosong | RENDAH |

---

## 8. Error Handling UX

### Error Handling Saat Ini

| Error Type | Handling | User Feedback |
|------------|----------|---------------|
| Form validation | Visual border color | Red/green border |
| localStorage save error | `console.error` | TIDAK ADA |
| localStorage load error | `console.error` + reset cart | TIDAK ADA |
| WhatsApp popup blocked | TIDAK ADA | TIDAK ADA |
| Invalid menu ID | Silent return | TIDAK ADA |
| Cart empty + checkout | Button disabled | TIDAK ADA |
| Phone number invalid | Red border | Tanpa error message |

### Kritik Error Handling

**Ini adalah area terlemah dari UX saat ini.**

1. **Tidak ada error messages.** User hanya melihat border merah. Tidak tahu kenapa.

2. **Tidak ada loading states.** Tidak ada indikator bahwa sesuatu sedang diproses.

3. **Tidak ada success messages.** Setelah checkout, tidak ada "Pesanan berhasil dikirim!" toast.

4. **localStorage errors silent.** Jika localStorage penuh, cart tidak tersimpan tanpa user tahu.

5. **WhatsApp popup blocked tanpa fallback.** Jika browser block popup, user tidak bisa checkout.

### Saran Error Handling

| Masalah | Solusi | Prioritas |
|---------|--------|-----------|
| Tidak ada error messages | Tambah error message text di bawah inputs | TINGGI |
| Tidak ada success feedback | Tambah toast notification | SEDANG |
| localStorage silent error | Tambah warning banner | RENDAH |
| WhatsApp blocked | Fallback ke same-tab redirect | SEDANG |

---

## 9. Conversion Rate Optimization

### Conversion Funnel

```
Visitor → Browse Menu → Add to Cart → Fill Form → Checkout → WhatsApp
100%    → 80% (est)  → 40% (est)  → 30% (est) → 25% (est) → 20% (est)
```

### Kritik CRO

#### Barrier to Conversion

| Barrier | Severity | Solusi |
|---------|----------|--------|
| Gambar lambat loading | KRITIS | Optimasi gambar |
| Terlalu banyak scroll | SEDANG | Simplify layout |
| Tidak ada social proof | SEDANG | Tambah testimonials |
| Tidak ada urgency | RENDAH | "Stok terbatas" sudah ada |
| Tidak ada price anchoring | RENDAH | Tidak perlu untuk UMKM |
| WhatsApp dependency | MINIMAL | Target audience pakai WhatsApp |

#### Positive Conversion Elements

| Element | Status |
|---------|--------|
| Clear value proposition | "Segar Setiap Pagi" |
| Price transparency | Prices visible on menu |
| Low friction checkout | 2 fields only |
| Trust elements | "Dibuat setiap pagi", etc |
| Scarcity signal | "Stok terbatas setiap hari!" |
| Local relevance | Area pelayanan section |
| WhatsApp native | Familiar for Indonesian users |

### Saran CRO

| Masalah | Solusi | Prioritas |
|---------|--------|-----------|
| Tidak ada social proof | Tambah testimonials/reviews section | SEDANG |
| Tidak ada urgency timer | Tambah "Sisa stok hari ini" counter | RENDAH |
| Tidak ada promo | Tambah "Pesan 5 gratis 1" promo | RENDAH |
| Gambar lambat | Optimasi gambar | KRITIS |

---

## 10. Local Business Experience

### Local Business Elements

| Element | Status | Detail |
|---------|--------|--------|
| Business name | PASS | "Nasi Bakar Mama Aura" |
| Address | PASS | "Jl. Bukit Cinere 1" |
| Operating hours | PASS | "06:30 - 10:00 WIB" |
| Service areas | PASS | Cinere, Gandul, Limo, Pangkalan Jati |
| Google Maps link | PASS | External link to Google Maps |
| WhatsApp ordering | PASS | Primary checkout method |
| Price range | PASS | Rp 10.000 - Rp 13.000 |

### Kritik Local Business

#### Positif
1. **Informasi lengkap** - Nama, alamat, jam, area, harga
2. **Google Maps integration** - Mudah menemukan lokasi
3. **Area pelayanan jelas** - User tahu apakah dilayani
4. **WhatsApp ordering** - Familiar dan mudah untuk target market

#### Negatif

1. **Tidak ada Google My Business schema.** Google tidak bisa menampilkan knowledge panel.

2. **Tidak ada phone number di header/footer.** User harus checkout via WhatsApp untuk dapat nomor.

3. **Tidak ada operating hours yang prominent.** Hanya di section lokasi. Seharusnya di hero atau header.

4. **Tidak ada "Open Now" / "Closed" indicator.** User tidak tahu apakah buka saat ini.

5. **Tidak ada delivery radius info.** "Area pelayanan" list tapi tidak ada info jarak maksimum.

6. **Tidak ada social media links.** Instagram, Facebook, TikTok, dll.

### Saran Local Business

| Masalah | Solusi | Prioritas |
|---------|--------|-----------|
| Tidak ada GMB schema | Tambah Schema.org LocalBusiness | TINGGI |
| Tidak ada phone di header | Tambah WhatsApp icon/link di header | SEDANG |
| Tidak ada open/closed indicator | Tambah badge "Buka Sekarang" / "Tutup" | SEDANG |
| Tidak ada social links | Tambah icons di footer | RENDAH |

---

## 11. Trust Building Analysis

### Trust Elements Saat Ini

| Element | Lokasi | Efektivitas |
|---------|--------|-------------|
| "Dibuat Setiap Pagi" | Trust section | TINGGI |
| "Bumbu Khas" | Trust section | SEDANG |
| "Praktis & Mudah" | Trust section | SEDANG |
| "Stok terbatas setiap hari!" | Hero section | SEDANG |
| About section | Tentang section | SEDANG |
| Google Maps link | Lokasi section | TINGGI |
| Area pelayanan | Area section | SEDANG |

### Kritik Trust Building

#### Positif
1. **Tiga value props** jelas: Fresh, Khas, Praktis
2. **About section** memberikan cerita brand
3. **Google Maps** membangun kepercayaan lokasi
4. **Area pelayanan** menunjukkan legitimate service

#### Negatif

1. **Tidak ada testimonials/reviews.** Ini trust builder #1 untuk UMKM. Seharusnya ada 2-3 quotes dari pelanggan.

2. **Tidak ada foto produk yang bagus.** Gambar ada tapi 8MB+ PNG. Perlu gambar yang lebih menarik dan optimized.

3. **Tidak ada badge "Halal" atau sertifikasi.** Penting untuk bisnis kuliner Indonesia.

4. **Tidak ada social media presence.** Tidak ada link ke Instagram/TikTok.

5. **Tidak ada WhatsApp status.** "Chat kami di WhatsApp" dengan indicator online/offline.

### Saran Trust Building

| Masalah | Solusi | Prioritas |
|---------|--------|-----------|
| Tidak ada testimonials | Tambah 2-3 quotes pelanggan | TINGGI |
| Tidak ada halal badge | Tambah badge jika applicable | SEDANG |
| Tidak ada social links | Tambah Instagram/TikTok links | RENDAH |
| Gambar tidak optimal | Optimasi + mungkin retake | TINGGI |

---

## 12. Call To Action Analysis

### CTAs Saat Ini

| CTA | Text | Lokasi | Style |
|-----|------|--------|-------|
| Primary | "Pesan Sekarang" | Hero section | White bg, red text |
| Secondary | "Pesan via WhatsApp" | Checkout section | Green bg (WhatsApp) |
| Tertiary | "Klik untuk buka di Google Maps" | Lokasi section | Dashed border card |

### Kritik CTA

#### Positif
1. **CTA hierarchy jelas** - Primary di hero, secondary di checkout
2. **WhatsApp branding** - Green button sesuai expectation
3. **Hero CTA prominent** - Large, white on red
4. **Checkout button sticky** - Always accessible

#### Negatif

1. **Hanya 2 CTAs utama.** "Pesan Sekarang" dan "Pesan via WhatsApp" melakukan hal yang sama (scroll ke menu → checkout). User mungkin bingung.

2. **Tidak ada CTA untuk langsung ke WhatsApp.** User yang sudah tahu mau pesan apa bisa langsung chat WhatsApp tanpa fill form.

3. **Tidak ada secondary CTA** untuk pertanyaan. "Ada pertanyaan? Chat kami!" bisa meningkatkan conversion.

4. **CTA copy bisa lebih kuat.** "Pesan Sekarang" generik. "Pesan Nasi Bakar Segar" lebih spesifik.

### Saran CTA

| Masalah | Solusi | Prioritas |
|---------|--------|-----------|
| Tidak ada direct WhatsApp | Tambah "Chat Langsung" floating button | SEDANG |
| CTA copy generik | Perkuat copywriting | RENDAH |
| Tidak ada secondary CTA | Tambah "Ada pertanyaan?" section | RENDAH |

---

## 13. Accessibility UX

### Accessibility Assessment

| Check | Status | Detail |
|-------|--------|--------|
| Keyboard navigation | PARTIAL | Bisa navigate, tapi focus states tidak lengkap |
| Screen reader | GAGAL | Tidak ada ARIA attributes |
| Color contrast | PARTIAL | Gold-on-red gagal WCAG |
| Skip to content | GAGAL | Tidak ada |
| Alt text | PASS | Semua gambar punya alt |
| Form labels | PASS | Labels terhubung |
| Focus visible | PARTIAL | Hanya form inputs |
| Reduced motion | GAGAL | Tidak ada prefers-reduced-motion |
| Touch targets | PARTIAL | 32px, minimum 44px recommended |

### Kritik Accessibility

**Aksesibilitas adalah area terlemah kedua setelah gambar.**

1. **Screen readers tidak bisa navigate cart.** Tidak ada `aria-live` region. Update cart tidak diumumkan.

2. **Quantity buttons tidak punya label.** Screen reader hanya dengar "button" tanpa konteks.

3. **Emoji icons tidak di-hidden.** Screen reader membaca "cooking pan emoji", "hot pepper emoji", dll.

4. **Tidak ada skip-to-content.** Keyboard user harus tab melalui seluruh header untuk reach main content.

5. **Focus states tidak konsisten.** Hanya form inputs yang punya custom focus. Buttons dan links tidak.

### Saran Accessibility

| Masalah | Solusi | Prioritas |
|---------|--------|-----------|
| Tidak ada ARIA | Tambah aria-label, aria-live | TINGGI |
| Tidak ada skip-to-content | Tambah skip link | SEDANG |
| Focus tidak konsisten | Tambah focus-visible styles | SEDANG |
| Emoji accessibility | Tambah aria-hidden | RENDAH |
| Reduced motion | Tambah prefers-reduced-motion | SEDANG |

---

## 14. Rekomendasi Perbaikan

### Prioritas 1: KRITIS (Lakukan sekarang)

1. **Optimasi gambar** - 51MB -> < 1MB (WebP, max 400px)
2. **Tambahkan error messages** pada form validation
3. **Tambahkan Schema.org LocalBusiness** untuk SEO lokal

### Prioritas 2: TINGGI (Lakukan minggu ini)

4. **Perbaiki accessibility** - ARIA attributes, skip-to-content, focus states
5. **Tambahkan order summary** visible sebelum checkout
6. **Tambahkan WhatsApp number** di header/footer
7. **Perbaiki phone validation** - digit-only
8. **Tambahkan testimonials/reviews** section

### Prioritas 3: SEDANG (Lakukan bulan ini)

9. **Gabungkan cart + form** sebagai order summary
10. **Tambahkan pickup/delivery option**
11. **Tambahkan order notes textarea**
12. **Tambahkan CSS custom properties**
13. **Perbaiki sticky button** - padding-bottom
14. **Tambahkan loading/success states**

### Prioritas 4: RENDAH (Kapan saja)

15. **Tambahkan dark mode** support
16. **Tambahkan print styles**
17. **Tambahkan social media links**
18. **Tambahkan "back to top" button**
19. **Tambahkan empty state illustration**

---

> **Keseluruhan:** UI/UX project ini sudah cukup baik untuk UMKM sederhana. Layout linear, flow jelas, dan checkout mudah. Area terlemah: accessibility, gambar, dan form error messages. Perbaikan pada area ini akan significantly meningkatkan user experience dan conversion rate.
