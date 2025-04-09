document.addEventListener('DOMContentLoaded', function() {
 
    initMobileMenu();
    initForms();
    initScrollToTop();
    
    const pageScripts = {
        'index': initHomePage,
        'services': initServicesPage,
        'prices': initPricesPage,
        'tracking': initTrackingPage,
        'request': initRequestPage,
        'contacts': initContactsPage
    };
    
    const pageId = document.body.id || window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    
    if (pageScripts[pageId]) {
        pageScripts[pageId]();
    }
});

function initMobileMenu() {
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '☰';
    menuButton.setAttribute('aria-label', 'Меню');
    
    const nav = document.querySelector('.nav');
    const navList = document.querySelector('.nav-list');
    
    function toggleMenu() {
        navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
    }
    
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-button')) {
                nav.insertBefore(menuButton, navList);
                navList.style.display = 'none';
                menuButton.addEventListener('click', toggleMenu);
            }
        } else {
            if (document.querySelector('.mobile-menu-button')) {
                nav.removeChild(menuButton);
                navList.style.display = 'flex';
                menuButton.removeEventListener('click', toggleMenu);
            }
        }
    }
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
}

function initForms() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    isValid = false;
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                showNotification('Форма успешно отправлена!', 'success');
                form.reset();
            } else {
                showNotification('Пожалуйста, заполните все обязательные поля', 'error');
            }
        });
    });
}

function initScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '↑';
    scrollButton.setAttribute('aria-label', 'Наверх');
    document.body.appendChild(scrollButton);
    
    function toggleScrollButton() {
        scrollButton.style.display = window.scrollY > 300 ? 'block' : 'none';
    }
    
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', toggleScrollButton);
    toggleScrollButton();
}

function initHomePage() {

    document.querySelectorAll('.feature-card').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, 100 * index);
    });
}

function initPricesPage() {
    const calcForm = document.getElementById('calc-form');
    if (!calcForm) return;
    
    calcForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const distance = parseFloat(document.getElementById('distance').value) || 0;
        const weight = parseFloat(document.getElementById('weight').value) || 0;
        const transportType = document.getElementById('transport-type').value;
        
        if (!distance || !weight || !transportType) {
            showNotification('Пожалуйста, заполните все поля', 'error');
            return;
        }
        
        const price = calculatePrice(distance, weight, transportType);
        showCalculationResult({
            distance,
            weight,
            transportType,
            price
        });
    });
    
    function calculatePrice(distance, weight, type) {
        const basePrice = distance * (type === 'truck' ? 35 : 25) * (weight / 1000);
        return Math.max(basePrice, type === 'truck' ? 3000 : 1500);
    }
    
    function showCalculationResult(data) {
        const resultDiv = document.getElementById('calc-result');
        const resultDetails = document.getElementById('result-details');
        const totalPrice = document.getElementById('total-price');
        
        resultDetails.innerHTML = `
            <p><strong>Расстояние:</strong> ${data.distance} км</p>
            <p><strong>Вес груза:</strong> ${data.weight} кг</p>
            <p><strong>Тип транспорта:</strong> ${data.transportType === 'truck' ? 'Грузовик' : 'Газель'}</p>
        `;
        
        totalPrice.innerHTML = `Итого: <strong>${Math.round(data.price).toLocaleString('ru-RU')} руб.</strong>`;
        resultDiv.classList.remove('hidden');
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }
}

function initTrackingPage() {
    const trackingForm = document.getElementById('tracking-form');
    if (!trackingForm) return;
    
    trackingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const trackingNumber = document.getElementById('tracking-number').value.trim();
        
        if (!trackingNumber) {
            showNotification('Введите номер накладной', 'error');
            return;
        }
}

function initRequestPage() {
    const urgencySlider = document.getElementById('urgency');
    if (urgencySlider) {
        urgencySlider.addEventListener('input', function() {
            document.getElementById('urgency-value').textContent = this.value;
        });
    }
}

function initContactsPage() {
	
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
            contactForm.reset();
        });
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}