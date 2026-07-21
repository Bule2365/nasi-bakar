// ==========================================
// APP - Nasi Bakar Mama Aura
// ==========================================

(function () {
    var menuListEl = document.getElementById('menu-list');
    var cart = {};

    function getCartItems() {
        var items = [];
        for (var id in cart) {
            if (cart[id] > 0) {
                var menu = MENU_DATA.find(function (m) { return m.id === id; });
                if (menu) {
                    items.push({ id: id, name: menu.name, price: menu.price, qty: cart[id] });
                }
            }
        }
        return items;
    }

    function getCartTotal() {
        return getCartItems().reduce(function (sum, item) { return sum + (item.price * item.qty); }, 0);
    }

    function getCartTotalQty() {
        return getCartItems().reduce(function (sum, item) { return sum + item.qty; }, 0);
    }

    function getRecipientInfo() {
        var nameEl = document.getElementById('recipient-name');
        var addressEl = document.getElementById('delivery-address');
        return {
            name: nameEl ? nameEl.value.trim() : '',
            address: addressEl ? addressEl.value.trim() : ''
        };
    }

    function validateForm() {
        var info = getRecipientInfo();
        var errors = [];
        if (!info.name) errors.push('Nama penerima harus diisi');
        if (!info.address) errors.push('Alamat pengiriman harus diisi');
        return errors;
    }

    function showFormErrors(errors) {
        var nameGroup = document.getElementById('name-group');
        var addressGroup = document.getElementById('address-group');
        if (!getRecipientInfo().name) {
            nameGroup.classList.add('has-error');
        } else {
            nameGroup.classList.remove('has-error');
        }
        if (!getRecipientInfo().address) {
            addressGroup.classList.add('has-error');
        } else {
            addressGroup.classList.remove('has-error');
        }
    }

    function resetFormStyles() {
        var nameGroup = document.getElementById('name-group');
        var addressGroup = document.getElementById('address-group');
        if (nameGroup) nameGroup.classList.remove('has-error');
        if (addressGroup) addressGroup.classList.remove('has-error');
    }

    function generateSingleWhatsAppUrl(menuName) {
        var message = 'Halo, saya ingin pesan ' + menuName;
        return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
    }

    function generateCartWhatsAppUrl() {
        var items = getCartItems();
        if (items.length === 0) return '#';

        var info = getRecipientInfo();
        var message = 'Halo, saya ingin pesan Nasi Bakar Mama Aura.\n\n';
        message += 'Nama: ' + (info.name || '-') + '\n';
        message += 'Alamat: ' + (info.address || '-') + '\n\n';
        message += 'Pesanan:\n';
        items.forEach(function (item, i) {
            message += (i + 1) + '. ' + item.name + ' x' + item.qty + ' = Rp ' + (item.price * item.qty).toLocaleString('id-ID') + '\n';
        });
        message += '\nTotal: *Rp ' + getCartTotal().toLocaleString('id-ID') + '*\n\nTerima kasih.';
        return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
    }

    function updateCartButton() {
        var waBtn = document.getElementById('cart-wa-btn');
        var totalQty = getCartTotalQty();
        var errors = validateForm();

        if (errors.length > 0) {
            waBtn.href = '#';
            waBtn.textContent = 'Isi nama & alamat dulu';
            waBtn.classList.add('cart-wa-btn--disabled');
        } else {
            waBtn.href = generateCartWhatsAppUrl();
            waBtn.textContent = 'Pesan via WhatsApp (' + totalQty + ' item)';
            waBtn.classList.remove('cart-wa-btn--disabled');
        }
    }

    function attachFormEvents() {
        var nameEl = document.getElementById('recipient-name');
        var addressEl = document.getElementById('delivery-address');

        if (nameEl && !nameEl.dataset.bound) {
            nameEl.dataset.bound = '1';
            nameEl.addEventListener('input', function () {
                resetFormStyles();
                updateCartButton();
            });
        }

        if (addressEl && !addressEl.dataset.bound) {
            addressEl.dataset.bound = '1';
            addressEl.addEventListener('input', function () {
                resetFormStyles();
                updateCartButton();
            });
        }
    }

    function attachCartButtonEvent() {
        var waBtn = document.getElementById('cart-wa-btn');
        if (waBtn && !waBtn.dataset.bound) {
            waBtn.dataset.bound = '1';
            waBtn.addEventListener('click', function (e) {
                var errors = validateForm();
                if (errors.length > 0) {
                    e.preventDefault();
                    showFormErrors(errors);
                    alert(errors.join('\n'));
                    return false;
                }
            });
        }
    }

    function renderCartSummary() {
        var summaryEl = document.getElementById('cart-summary');
        var items = getCartItems();
        var totalPrice = getCartTotal();

        if (items.length === 0) {
            summaryEl.style.display = 'none';
            return;
        }

        summaryEl.style.display = 'block';

        var itemsHtml = '';
        items.forEach(function (item) {
            itemsHtml +=
                '<div class="cart-item">' +
                    '<span class="cart-item-name">' + item.name + '</span>' +
                    '<span class="cart-item-qty">x' + item.qty + '</span>' +
                    '<span class="cart-item-price">Rp ' + (item.price * item.qty).toLocaleString('id-ID') + '</span>' +
                '</div>';
        });

        document.getElementById('cart-items').innerHTML = itemsHtml;
        document.getElementById('cart-total-harga').textContent = 'Rp ' + totalPrice.toLocaleString('id-ID');

        updateCartButton();
        attachFormEvents();
    }

    function renderMenu() {
        var html = '';

        MENU_DATA.forEach(function (menu) {
            var qty = cart[menu.id] || 0;
            html +=
                '<div class="menu-card">' +
                    '<img src="' + menu.image + '" alt="' + menu.name + '" class="menu-card-image" loading="lazy" width="80" height="80">' +
                    '<div class="menu-card-info">' +
                        '<div class="menu-card-name">' + menu.name + '</div>' +
                        '<div class="menu-card-price">Rp ' + menu.price.toLocaleString('id-ID') + '</div>' +
                        '<div class="menu-card-actions">' +
                            '<div class="qty-controls">' +
                                '<button class="btn-qty" data-id="' + menu.id + '" data-action="decrease"' + (qty === 0 ? ' disabled' : '') + '>&minus;</button>' +
                                '<span class="qty-display">' + qty + '</span>' +
                                '<button class="btn-qty" data-id="' + menu.id + '" data-action="increase">+</button>' +
                            '</div>' +
                            '<a href="' + generateSingleWhatsAppUrl(menu.name) + '" class="btn-pesan-single" target="_blank" rel="noopener noreferrer" title="Pesan ' + menu.name + ' saja">' +
                                '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>' +
                            '</a>' +
                        '</div>' +
                    '</div>' +
                '</div>';
        });

        menuListEl.innerHTML = html;
        attachMenuEvents();
        renderCartSummary();
    }

    function attachMenuEvents() {
        var buttons = menuListEl.querySelectorAll('.btn-qty');
        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var id = this.getAttribute('data-id');
                var action = this.getAttribute('data-action');

                if (!cart[id]) cart[id] = 0;

                if (action === 'increase') {
                    cart[id]++;
                } else if (action === 'decrease' && cart[id] > 0) {
                    cart[id]--;
                }

                renderMenu();
            });
        });
    }

    renderMenu();
    attachCartButtonEvent();
})();
