// ==========================================
// BUSINESS DATA - Nasi Bakar Mama Aura
// ==========================================
// Update data bisnis di sawahilah jika ada perubahan

const BUSINESS_DATA = {
    nama: "Nasi Bakar Mama Aura",
    alamat: "Jl. Bukit Cinere 1",
    whatsappNumber: "+62 813-1028-3191",
    jamOperasional: {
        buka: "06:30 AM",
        tutup: "10:00 AM",
        zona: "WIB"
    },
    operasionalNotice: "Pesanan di luar jam operasional (06:30 AM - 10:00 AM WIB) akan diproses pada hari berikutnya."
};

// ==========================================
// MENU DATA
// ==========================================
// Struktur menu:
//   - id      : identifier unik (string)
//   - name    : nama produk (string)
//   - price   : harga dalam Rupiah (number)

const MENU_DATA = [
    {
        id: "ayam",
        name: "Nasi Bakar Ayam",
        price: 10000,
        image: "assets/images/nasi-bakar-ayam.jpg"
    },
    {
        id: "tongkol",
        name: "Nasi Bakar Tongkol",
        price: 10000,
        image: "assets/images/nasi-bakar-tongkol.jpg"
    },
    {
        id: "ayam-jamur",
        name: "Nasi Bakar Ayam Jamur",
        price: 10000,
        image: "assets/images/nasi-bakar-ayam-jamur.jpg"
    },
    {
        id: "ati-ampela",
        name: "Nasi Bakar Ati Ampela",
        price: 10000,
        image: "assets/images/nasi-bakar-ati-ampela.jpg"
    },
    {
        id: "cumi",
        name: "Nasi Bakar Cumi",
        price: 13000,
        image: "assets/images/nasi-bakar-cumi.jpg"
    },
    {
        id: "teri",
        name: "Nasi Bakar Teri",
        price: 13000,
        image: "assets/images/nasi-bakar-teri.jpg"
    }
];