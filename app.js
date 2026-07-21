// ==========================================
// APP - Nasi Bakar Mama Aura
// ==========================================

(function () {
    var menuListEl = document.getElementById('menu-list');

    function generateWhatsAppUrl(menuName) {
        var message = 'Halo, saya ingin pesan ' + menuName;
        return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
    }

    function renderMenu() {
        var html = '';

        MENU_DATA.forEach(function (menu) {
            html +=
                '<div class="menu-card">' +
                    '<img src="' + menu.image + '" alt="' + menu.name + '" class="menu-card-image" loading="lazy" width="80" height="80">' +
                    '<div class="menu-card-info">' +
                        '<div class="menu-card-name">' + menu.name + '</div>' +
                        '<div class="menu-card-price">Rp ' + menu.price.toLocaleString('id-ID') + '</div>' +
                        '<a href="' + generateWhatsAppUrl(menu.name) + '" class="btn-pesan" target="_blank" rel="noopener noreferrer">Pesan via WhatsApp</a>' +
                    '</div>' +
                '</div>';
        });

        menuListEl.innerHTML = html;
    }

    renderMenu();
})();
