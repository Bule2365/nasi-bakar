# MASTER DEVELOPMENT RULES

## Project : Nasi Bakar Mama Aura (V1)

> STATUS : SPECIFICATION FREEZE (V1)
>
> Seluruh spesifikasi di bawah ini bersifat final. Dilarang menambahkan fitur
> baru tanpa instruksi yang eksplisit.

---

# DEVELOPMENT PRINCIPLES

1. Website harus cepat dimuat (< 2 detik pada koneksi normal).
2. Website harus Mobile First.
3. Website harus mudah dipelajari oleh programmer pemula.
4. Website harus mudah diperbarui apabila menu dan harga berubah.
5. Seluruh alur checkout harus dapat diselesaikan dalam waktu kurang dari 30
   detik pada perangkat mobile.
6. Prioritaskan kesederhanaan dibandingkan kompleksitas kode.
7. Prioritaskan maintainability dibandingkan optimasi yang tidak diperlukan.

---

# PROJECT SPECIFICATION

- Project Name : Nasi Bakar Mama Aura
- Project Type : Single Page Website
- Hosting : GitHub Pages
- Architecture : Stateless Client-Side Application
- Technology : HTML, CSS dan JavaScript murni.
- Development Method : Incremental Development.

---

# FILE STRUCTURE

Wajib menggunakan struktur berikut.

```text
project/

│
├── index.html
├── style.css
├── data.js
└── app.js
```

Tidak diperbolehkan membuat file tambahan tanpa instruksi yang eksplisit.

---

# BUSINESS DATA

### Jam Operasional

```text
06:30 AM - 10:00 AM WIB
```

### Alamat

```text
Jl. Bukit Cinere 1 No.150cc
```

### WhatsApp Tujuan

```text
6281234567890
```

> Nomor di atas dapat diganti sewaktu-waktu tanpa mengubah logika aplikasi.

---

# MENU DATA

| Produk                | Harga     |
| --------------------- | --------- |
| Nasi Bakar Ayam       | Rp 10.000 |
| Nasi Bakar Tongkol    | Rp 10.000 |
| Nasi Bakar Ayam Jamur | Rp 10.000 |
| Nasi Bakar Ati Ampela | Rp 10.000 |
| Nasi Bakar Cumi       | Rp 13.000 |
| Nasi Bakar Teri       | Rp 13.000 |

Seluruh data menu wajib dipisahkan ke dalam file :

```text
data.js
```

---

# UI SPECIFICATION

Urutan tampilan halaman wajib sebagai berikut.

```text
Navbar / Hero
        ↓
Jam Operasional
        ↓
Menu Produk
        ↓
Shopping Cart
        ↓
Form Checkout
        ↓
Checkout Button
        ↓
Footer
```

---

# HTML RULES

1. Gunakan Semantic HTML.
2. 80% UI wajib ditulis langsung pada index.html.
3. JavaScript TIDAK BOLEH merender keseluruhan halaman.
4. JavaScript hanya diperbolehkan untuk :

```text
Render Data Menu
        ↓
Shopping Cart
        ↓
LocalStorage
        ↓
Form Validation
        ↓
Checkout WhatsApp
        ↓
State Management
```

---

# CSS RULES

1. Mobile First.
2. Responsive Design.
3. Gunakan Flexbox dan CSS Grid apabila diperlukan.
4. Hindari animasi yang tidak diperlukan.
5. Prioritaskan keterbacaan kode.

---

# JAVASCRIPT RULES

JavaScript hanya diperbolehkan untuk :

```text
Tambah Produk
        ↓
Kurangi Produk
        ↓
Menghapus Produk
        ↓
Menghitung Total
        ↓
LocalStorage Cart
        ↓
Validasi Form
        ↓
Generate Pesan WhatsApp
        ↓
Redirect WhatsApp
```

---

# LOCAL STORAGE RULES

DIPERBOLEHKAN :

```text
cart[]
```

TIDAK DIPERBOLEHKAN :

```text
Nama Pembeli

Nomor WhatsApp

Alamat

Data Pribadi Lainnya
```

Apabila browser direfresh :

```text
Cart
↓

Tetap Ada


Nama Pembeli
↓

Kosong


Nomor WhatsApp
↓

Kosong
```

---

# FORM VALIDATION

### Nama

```text
Minimal 3 karakter.
```

### Nomor WhatsApp

```text
type="tel"

minimal 10 digit

maksimal 15 digit
```

Nomor wajib dibersihkan dari :

```text
+

-

spasi
```

sebelum diproses oleh JavaScript.

---

# CHECKOUT RULES

Tombol checkout wajib :

```text
disabled
```

Tombol checkout hanya aktif apabila :

```text
Nama valid
        +
Nomor WA valid
        +
Cart > 0
        ↓
Checkout Aktif
```

---

# EMPTY STATE

Apabila keranjang kosong tampilkan :

```text
Belum ada pesanan.

Silakan pilih menu terlebih dahulu.
```

---

# WHATSAPP CHECKOUT

Checkout hanya diperbolehkan menggunakan :

```text
https://wa.me/
```

Alur checkout :

```text
Pilih Produk
        ↓
Mengisi Form
        ↓
Validasi
        ↓
Generate Pesan
        ↓
encodeURIComponent()
        ↓
Redirect WhatsApp
```

---

# OPERATIONAL HOURS NOTICE

Wajib menampilkan informasi berikut :

```text
Pesanan di luar jam operasional (06:30 AM - 10:00 AM WIB) akan diproses pada hari berikutnya.
```

Informasi ini bersifat statis.

TIDAK DIPERBOLEHKAN membuat sistem pengunci waktu otomatis pada V1.

---

# LIBRARY POLICY

DIUTAMAKAN :

```text
HTML

CSS

Vanilla JavaScript
```

DIPERBOLEHKAN menggunakan Library/CDN apabila :

```text
Solusi Vanilla membutuhkan
implementasi yang jauh lebih rumit.
```

DILARANG menggunakan :

```text
React
Vue
Angular
NodeJS
npm
TypeScript
Tailwind
Vite
Webpack
NextJS
Nuxt
```

---

# DO NOT ADD FEATURES

DILARANG MENAMBAHKAN :

```text
Login

Register

Dashboard Admin

Database

Backend

Payment Gateway

Multi Page Website

Form Email

Chat Bot

API selain WhatsApp URL

Fitur yang tidak tercantum
pada spesifikasi project.
```

---

# DEVELOPMENT WORKFLOW

```text
Tahap 0
↓

Pre Development Review

↓

Tahap 1

Project Initialization

↓

Tahap 2

Semantic HTML

↓

Tahap 3

data.js

↓

Tahap 4

Mobile First CSS

↓

Tahap 5

Shopping Cart

↓

Tahap 6

LocalStorage

↓

Tahap 7

Form Validation

↓

Tahap 8

Checkout WhatsApp

↓

Tahap 9

Testing

↓

Tahap 10

Refactoring

↓

Tahap 11

Github Deployment

↓

SELESAI
```

---

# OPENCODE CLI RULES

OpenCode CLI berperan sebagai :

```text
Coder

+

Code Reviewer

+

Bug Finder

+

Refactoring Assistant
```

OpenCode CLI BUKAN :

```text
Software Architect

Business Decision Maker

Feature Designer
```

Apabila menemukan hal yang tidak terdapat dalam spesifikasi :

```text
WAJIB BERTANYA

DAN

DILARANG MENGAMBIL ASUMSI SENDIRI.
```

---

# FINAL RULE

> SATU PERINTAH = SATU PEKERJAAN.

OpenCode CLI hanya diperbolehkan mengerjakan pekerjaan yang sedang diberikan.
Dilarang mengerjakan tahapan berikutnya tanpa instruksi yang eksplisit dari
pengguna.

Apabila suatu tahapan telah selesai, OpenCode CLI wajib menunggu instruksi
selanjutnya.
