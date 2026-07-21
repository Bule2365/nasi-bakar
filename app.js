// ==========================================
// SHOPPING CART - Nasi Bakar Mama Aura
// ==========================================

// State Management
let cart = [];

const STORAGE_KEY = 'nasiBakarCart';

// ==========================================
// LOCAL STORAGE
// ==========================================

function saveCartToLocalStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
        console.error('Gagal menyimpan cart:', e);
    }
}

function loadCartFromLocalStorage() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
                cart = parsed;
            }
        }
    } catch (e) {
        console.error('Gagal memuat cart:', e);
        cart = [];
    }
}

// ==========================================
// DOM ELEMENTS
// ==========================================

const menuListEl = document.getElementById('menu-list');
const cartListEl = document.getElementById('cart-list');
const cartEmptyEl = document.getElementById('cart-empty');
const cartTotalEl = document.getElementById('cart-total');
const totalHargaEl = document.getElementById('total-harga');
const namaInputEl = document.getElementById('nama');
const whatsappInputEl = document.getElementById('whatsapp');
const alamatInputEl = document.getElementById('alamat');
const checkoutBtnEl = document.getElementById('btn-checkout');

// ==========================================
// FORM VALIDATION
// ==========================================

function cleanPhoneNumber(phone) {
    return phone.replace(/[\+\-\s\(\)]/g, '');
}

function validateName(name) {
    const isValid = name.trim().length >= 3;
    namaInputEl.classList.toggle('error', !isValid && name.length > 0);
    namaInputEl.classList.toggle('success', isValid);
    return isValid;
}

function validateWhatsApp(phone) {
    const cleaned = cleanPhoneNumber(phone);
    const isValid = cleaned.length >= 10 && cleaned.length <= 15;
    whatsappInputEl.classList.toggle('error', !isValid && phone.length > 0);
    whatsappInputEl.classList.toggle('success', isValid);
    return isValid;
}

function isCartNotEmpty() {
    return cart.length > 0;
}

function validateAlamat(alamat) {
    const isValid = alamat.trim().length >= 5;
    alamatInputEl.classList.toggle('error', !isValid && alamat.length > 0);
    alamatInputEl.classList.toggle('success', isValid);
    return isValid;
}

function validateForm() {
    const isNameValid = validateName(namaInputEl.value);
    const isPhoneValid = validateWhatsApp(whatsappInputEl.value);
    const isAlamatValid = validateAlamat(alamatInputEl.value);
    const hasItems = isCartNotEmpty();

    return isNameValid && isPhoneValid && isAlamatValid && hasItems;
}

function updateCheckoutButton() {
    if (validateForm()) {
        checkoutBtnEl.disabled = false;
    } else {
        checkoutBtnEl.disabled = true;
    }
}

// ==========================================
// WHATSAPP CHECKOUT
// ==========================================

const WHATSAPP_NUMBER = '6281310283191';

function generateWhatsAppMessage() {
    const nama = namaInputEl.value.trim();
    const whatsapp = whatsappInputEl.value.trim();
    const alamat = alamatInputEl.value.trim();
    const totalItems = calculateTotalItems();
    const totalPrice = calculateTotalPrice();

    let message = 'Halo, saya ingin pesan Nasi Bakar Mama Aura.\n\n';
    message += '*Data Pemesan:*\n';
    message += 'Nama: ' + nama + '\n';
    message += 'WhatsApp: ' + whatsapp + '\n';
    message += 'Alamat: ' + alamat + '\n\n';
    message += '*Pesanan:*\n';

    cart.forEach(function(item, index) {
        message += (index + 1) + '. ' + item.name + '\n';
        message += '   Qty: ' + item.quantity + ' x Rp ' + item.price.toLocaleString('id-ID') + '\n';
        message += '   Subtotal: Rp ' + (item.price * item.quantity).toLocaleString('id-ID') + '\n\n';
    });

    message += '*Ringkasan:*\n';
    message += 'Total Item: ' + totalItems + '\n';
    message += 'Total Harga: *Rp ' + totalPrice.toLocaleString('id-ID') + '*\n\n';
    message += '*Jam Operasional:*\n';
    message += BUSINESS_DATA.operasionalNotice + '\n\n';
    message += 'Terima kasih.';

    return message;
}

function redirectToWhatsApp() {
    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodedMessage;

    window.open(whatsappUrl, '_blank');
}

function handleCheckout() {
    if (!validateForm()) return;

    const totalItems = calculateTotalItems();
    const totalPrice = calculateTotalPrice();
    const confirmMessage = 'Konfirmasi pesanan:\n' +
        'Total item: ' + totalItems + '\n' +
        'Total harga: Rp ' + totalPrice.toLocaleString('id-ID') + '\n\n' +
        'Lanjutkan ke WhatsApp?';

    if (confirm(confirmMessage)) {
        redirectToWhatsApp();
    }
}

// ==========================================
// RENDER MENU
// ==========================================

function renderMenu() {
    menuListEl.innerHTML = '';

    MENU_DATA.forEach(function(menu) {
        const menuEl = document.createElement('div');
        menuEl.className = 'menu-item';

        const cartItem = cart.find(function(item) {
            return item.id === menu.id;
        });
        const quantity = cartItem ? cartItem.quantity : 0;

        menuEl.innerHTML = 
            '<img src="' + menu.image + '" alt="' + menu.name + '" class="menu-item-image" loading="lazy">' +
            '<div class="menu-item-info">' +
                '<div class="menu-item-name">' + menu.name + '</div>' +
                '<div class="menu-item-price">Rp ' + menu.price.toLocaleString('id-ID') + '</div>' +
            '</div>' +
            '<div class="menu-item-actions">' +
                '<button class="btn-quantity" data-action="decrease" data-id="' + menu.id + '"' + (quantity === 0 ? ' disabled' : '') + '>−</button>' +
                '<span class="quantity-display">' + quantity + '</span>' +
                '<button class="btn-quantity" data-action="increase" data-id="' + menu.id + '">+</button>' +
            '</div>';

        menuListEl.appendChild(menuEl);
    });

    attachMenuEventListeners();
}

// ==========================================
// CART OPERATIONS
// ==========================================

function addToCart(menuId) {
    const menu = MENU_DATA.find(function(item) {
        return item.id === menuId;
    });

    if (!menu) return;

    const existingItem = cart.find(function(item) {
        return item.id === menuId;
    });

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: menu.id,
            name: menu.name,
            price: menu.price,
            quantity: 1
        });
    }

    updateView();
}

function decreaseFromCart(menuId) {
    const existingItem = cart.find(function(item) {
        return item.id === menuId;
    });

    if (!existingItem) return;

    if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
    } else {
        removeFromCart(menuId);
        return;
    }

    updateView();
}

function removeFromCart(menuId) {
    cart = cart.filter(function(item) {
        return item.id !== menuId;
    });

    updateView();
}

// ==========================================
// CALCULATIONS
// ==========================================

function calculateTotalItems() {
    return cart.reduce(function(total, item) {
        return total + item.quantity;
    }, 0);
}

function calculateTotalPrice() {
    return cart.reduce(function(total, item) {
        return total + (item.price * item.quantity);
    }, 0);
}

// ==========================================
// RENDER CART
// ==========================================

function renderCart() {
    cartListEl.innerHTML = '';

    if (cart.length === 0) {
        cartEmptyEl.style.display = 'block';
        cartTotalEl.style.display = 'none';
        return;
    }

    cartEmptyEl.style.display = 'none';
    cartTotalEl.style.display = 'block';

    cart.forEach(function(item) {
        const cartItemEl = document.createElement('div');
        cartItemEl.className = 'cart-item';

        cartItemEl.innerHTML = 
            '<span class="cart-item-name">' + item.name + '</span>' +
            '<span class="cart-item-qty">x' + item.quantity + '</span>' +
            '<span class="cart-item-price">Rp ' + (item.price * item.quantity).toLocaleString('id-ID') + '</span>' +
            '<button class="btn-remove" data-id="' + item.id + '" title="Hapus item">×</button>';

        cartListEl.appendChild(cartItemEl);
    });

    const removeButtons = cartListEl.querySelectorAll('.btn-remove');
    removeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const menuId = this.getAttribute('data-id');
            removeFromCart(menuId);
        });
    });

    const totalPrice = calculateTotalPrice();
    totalHargaEl.textContent = 'Rp ' + totalPrice.toLocaleString('id-ID');
}

// ==========================================
// UPDATE VIEW
// ==========================================

function updateView() {
    renderMenu();
    renderCart();
    saveCartToLocalStorage();
    updateCheckoutButton();
}

// ==========================================
// EVENT LISTENERS
// ==========================================

function attachMenuEventListeners() {
    const buttons = menuListEl.querySelectorAll('.btn-quantity');

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            const menuId = this.getAttribute('data-id');

            if (action === 'increase') {
                addToCart(menuId);
            } else if (action === 'decrease') {
                decreaseFromCart(menuId);
            }
        });
    });
}

function attachFormEventListeners() {
    namaInputEl.addEventListener('input', function() {
        updateCheckoutButton();
    });

    whatsappInputEl.addEventListener('input', function() {
        updateCheckoutButton();
    });

    alamatInputEl.addEventListener('input', function() {
        updateCheckoutButton();
    });

    checkoutBtnEl.addEventListener('click', function() {
        handleCheckout();
    });
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    loadCartFromLocalStorage();
    renderMenu();
    renderCart();
    attachFormEventListeners();
    updateCheckoutButton();
});