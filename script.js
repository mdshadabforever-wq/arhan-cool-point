document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Sticky Navbar Trigger
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Mobile Navigation Menu Toggle Drawer
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });

    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });

    // 4. Smooth Scrolling Observer Highlighter
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinksItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section.getAttribute('id')) {
            observer.observe(section);
        }
    });

    // ==========================================================================
    // 5. WORLD-CLASS INTERACTIVE AC CLIMATE SIMULATOR CONTROL ENGINE
    // ==========================================================================
    let currentTemp = 18;
    const tempValDisp = document.getElementById('temp-val');
    const fanSpeedDisp = document.getElementById('fan-speed');
    const compLoadDisp = document.getElementById('comp-load');
    const jetSpeedDisp = document.getElementById('jet-speed');
    const tempUpBtn = document.getElementById('temp-up');
    const tempDownBtn = document.getElementById('temp-down');
    
    const airwaves = document.querySelectorAll('.airwave');
    const snowSpinner = document.querySelector('.snow-spin');

    function updateSimulatorState() {
        tempValDisp.textContent = currentTemp;

        // Calculate and apply dynamic speeds based on target temperature
        let fanSpeedLabel = "TURBO";
        let loadPercent = 98;
        let speedText = "Fast Mode";
        let waveDuration = "0.7s"; // fast animation for lower temp
        let spinDuration = "1.5s";

        if (currentTemp >= 16 && currentTemp <= 19) {
            fanSpeedLabel = "TURBO COOL";
            loadPercent = 100 - (currentTemp - 16) * 5;
            speedText = "Super Hurricane";
            waveDuration = `${0.5 + (currentTemp - 16) * 0.15}s`;
            spinDuration = `${1 + (currentTemp - 16) * 0.3}s`;
        } else if (currentTemp >= 20 && currentTemp <= 24) {
            fanSpeedLabel = "MEDIUM CHILL";
            loadPercent = 80 - (currentTemp - 20) * 6;
            speedText = "Standard Flow";
            waveDuration = `${1.1 + (currentTemp - 20) * 0.25}s`;
            spinDuration = `${2.2 + (currentTemp - 20) * 0.5}s`;
        } else {
            fanSpeedLabel = "ECO SAVE";
            loadPercent = 50 - (currentTemp - 25) * 5;
            speedText = "Gentle Breeze";
            waveDuration = `${2.4 + (currentTemp - 25) * 0.4}s`;
            spinDuration = `${4.5 + (currentTemp - 25) * 0.8}s`;
        }

        // Apply visual text updates
        fanSpeedDisp.textContent = fanSpeedLabel;
        compLoadDisp.textContent = `${loadPercent}%`;
        jetSpeedDisp.textContent = speedText;

        // Dynamically adjust airwave CSS animation durations
        airwaves.forEach(wave => {
            wave.style.animationDuration = waveDuration;
        });

        // Speed up/slow down the revolving snowflake indicator
        if (snowSpinner) {
            snowSpinner.style.animationDuration = spinDuration;
        }
    }

    tempUpBtn.addEventListener('click', () => {
        if (currentTemp < 30) {
            currentTemp++;
            updateSimulatorState();
        }
    });

    tempDownBtn.addEventListener('click', () => {
        if (currentTemp > 16) {
            currentTemp--;
            updateSimulatorState();
        }
    });

    // Initialize simulation once on load
    updateSimulatorState();

    // ==========================================================================
    // 6. DYNAMIC ESTIMATE & WHATSAPP BOOKING CALCULATOR ENGINE
    // ==========================================================================
    const typeSplitBox = document.getElementById('type-split');
    const typeWindowBox = document.getElementById('type-window');
    const serviceSelect = document.getElementById('service-select');
    const qtyValDisp = document.getElementById('qty-val');
    const qtyMinusBtn = document.getElementById('qty-minus');
    const qtyPlusBtn = document.getElementById('qty-plus');

    // Invoice elements
    const invoiceBaseDisp = document.getElementById('invoice-base');
    const invoiceTypeDisp = document.getElementById('invoice-type');
    const invoiceQtyDisp = document.getElementById('invoice-qty');
    const invoiceTotalDisp = document.getElementById('invoice-total');
    const waBookingBtn = document.getElementById('whatsapp-booking-btn');

    let selectedACType = 'split'; // default
    let selectedQuantity = 1;

    // AC type selection buttons handling
    typeSplitBox.addEventListener('click', () => {
        selectedACType = 'split';
        typeSplitBox.classList.add('active');
        typeWindowBox.classList.remove('active');
        calculateQuote();
    });

    typeWindowBox.addEventListener('click', () => {
        selectedACType = 'window';
        typeWindowBox.classList.add('active');
        typeSplitBox.classList.remove('active');
        calculateQuote();
    });

    // Service dropdown change
    serviceSelect.addEventListener('change', calculateQuote);

    // Quantity click controls
    qtyPlusBtn.addEventListener('click', () => {
        selectedQuantity++;
        qtyValDisp.textContent = selectedQuantity;
        calculateQuote();
    });

    qtyMinusBtn.addEventListener('click', () => {
        if (selectedQuantity > 1) {
            selectedQuantity--;
            qtyValDisp.textContent = selectedQuantity;
            calculateQuote();
        }
    });

    function calculateQuote() {
        const activeOption = serviceSelect.options[serviceSelect.selectedIndex];
        let basePrice = parseInt(activeOption.getAttribute('data-price'));
        let serviceName = activeOption.text.split(' - ')[0];

        // Apply a ₹50 discount per unit on Window AC service rates (Window maintenance is smaller/cheaper)
        if (selectedACType === 'window') {
            basePrice = Math.max(199, basePrice - 50); // Ensure base rate doesn't drop below ₹199
        }

        const grandTotal = basePrice * selectedQuantity;
        const acTypeLabel = selectedACType === 'split' ? 'Split AC' : 'Window AC';

        // Update displays
        invoiceBaseDisp.textContent = `₹${basePrice}`;
        invoiceTypeDisp.textContent = acTypeLabel;
        invoiceQtyDisp.textContent = `${selectedQuantity} Unit${selectedQuantity > 1 ? 's' : ''}`;
        invoiceTotalDisp.textContent = `₹${grandTotal}`;

        // Create the pre-filled custom WhatsApp Booking Link
        const customMessage = `Hi *Arhan Cool Point*! 👋\n\nMujhe apne AC service ke liye on-call appointment book karna hai. Mera estimate niche hai:\n\n` +
                              `• *AC Type:* ${acTypeLabel}\n` +
                              `• *Service:* ${serviceName}\n` +
                              `• *Quantity:* ${selectedQuantity} Unit${selectedQuantity > 1 ? 's' : ''}\n` +
                              `• *Estimated Bill:* ~₹${grandTotal}~\n\n` +
                              `📍 *Location:* Dharavi / Sion / Bandra (Mumbai)\n\n` +
                              `Please contact me back to confirm my time slot. Thank you!`;

        const waUrl = `https://wa.me/919321399469?text=${encodeURIComponent(customMessage)}`;
        waBookingBtn.setAttribute('href', waUrl);
    }

    // Initialize Quote calculation once on load
    calculateQuote();

    // ==========================================================================
    // 7. REAL WORK ACTION VIDEO PLAYER & COVER OVERLAYS
    // ==========================================================================
    const videoPlayOverlay = document.getElementById('videoPlayOverlay');
    const workVideo = document.getElementById('work-video');

    if (videoPlayOverlay && workVideo) {
        videoPlayOverlay.addEventListener('click', () => {
            videoPlayOverlay.style.display = 'none'; // hide preview card cover
            workVideo.play(); // launch video player
        });
        
        // If they click pause or video stops, restore overlay elegantly if needed
        workVideo.addEventListener('pause', () => {
            // Option to restore cover if desired, currently left clean
        });
    }

    // ==========================================================================
    // 8. FAQS ACCORDION TRIGGERS
    // ==========================================================================
    const faqTriggers = document.querySelectorAll('.faq-trigger');

    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const node = trigger.parentElement;
            
            // Toggle active state
            node.classList.toggle('active');

            // Close other nodes
            const allNodes = document.querySelectorAll('.faq-node');
            allNodes.forEach(item => {
                if (item !== node) {
                    item.classList.remove('active');
                }
            });
        });
    });

    // 9. Copyright auto-year updater
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
