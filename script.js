/* ============================================================
   HEAVENLY AURA SPA - JAVASCRIPT
   Premium Luxury Website Interactions
   ============================================================ */

'use strict';

/* ============================================================
   CONFIGURATION & CONSTANTS
   ============================================================ */

const CONFIG = {
    loaderDuration: 1800,
    scrollRevealThreshold: 0.15,
    parallaxStrength: 0.08,
    timelineProgressThreshold: 0.3,
    cursorSmoothness: 0.15,
    magneticButtonDistance: 40,
    magneticButtonStrength: 0.3
};

const STATE = {
    isLoading: true,
    isMobile: false,
    supportsHover: false,
    prefersReducedMotion: false,
    mouseX: 0,
    mouseY: 0,
    cursorX: 0,
    cursorY: 0,
    selectedService: null
};


/* ============================================================
   1. INITIALIZATION
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    detectDeviceCapabilities();
    initLoader();
    initNavigation();
    initMobileMenu();
    initCustomCursor();
    initMagneticButtons();
    initScrollReveal();
    initParallax();
    initTimelineProgress();
    initFAQ();
    initBookingForm();
    initServiceButtons();
    initSmoothScroll();
    initActiveNavLinks();
    initDateTimeConstraints();
    initWhatsAppDynamicLink();

    console.log('%cHeavenly Aura Spa', 'font-size: 24px; font-weight: bold; color: #A0617B; font-family: Cormorant Garamond, serif;');
    console.log('%cLuxury wellness, delivered to your doorstep.', 'font-size: 14px; color: #C8997E; font-style: italic;');
});


/* ============================================================
   2. DEVICE CAPABILITY DETECTION
   ============================================================ */

function detectDeviceCapabilities() {
    STATE.supportsHover = window.matchMedia('(hover: hover)').matches;
    STATE.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    STATE.isMobile = window.innerWidth <= 768;

    window.addEventListener('resize', debounce(() => {
        STATE.isMobile = window.innerWidth <= 768;
    }, 250));
}


/* ============================================================
   3. PREMIUM LOADER
   ============================================================ */

function initLoader() {
    const loader = document.getElementById('loader');

    if (!loader) return;

    if (STATE.prefersReducedMotion) {
        hideLoader();
        return;
    }

    setTimeout(() => {
        hideLoader();
    }, CONFIG.loaderDuration);

    function hideLoader() {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        STATE.isLoading = false;
    }
}


/* ============================================================
   4. NAVIGATION
   ============================================================ */

function initNavigation() {
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', throttle(() => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, 100));
}


/* ============================================================
   5. MOBILE MENU
   ============================================================ */

function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!menuToggle || !mobileOverlay) return;

    menuToggle.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                closeMenu();

                setTimeout(() => {
                    const target = document.querySelector(targetId);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 400);
            }
        });
    });

    function toggleMenu() {
        const isOpen = mobileOverlay.getAttribute('aria-hidden') === 'false';

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function openMenu() {
        mobileOverlay.setAttribute('aria-hidden', 'false');
        menuToggle.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileOverlay.setAttribute('aria-hidden', 'true');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
}


/* ============================================================
   6. CUSTOM CURSOR (DESKTOP)
   ============================================================ */

function initCustomCursor() {
    if (!STATE.supportsHover || STATE.prefersReducedMotion || STATE.isMobile) return;

    const cursor = document.getElementById('customCursor');
    const cursorLabel = document.getElementById('cursorLabel');

    if (!cursor) return;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        STATE.mouseX = e.clientX;
        STATE.mouseY = e.clientY;
        cursor.classList.add('active');
    });

    // Smooth cursor follow
    function updateCursor() {
        const dx = STATE.mouseX - STATE.cursorX;
        const dy = STATE.mouseY - STATE.cursorY;

        STATE.cursorX += dx * CONFIG.cursorSmoothness;
        STATE.cursorY += dy * CONFIG.cursorSmoothness;

        cursor.style.transform = `translate(${STATE.cursorX}px, ${STATE.cursorY}px)`;

        requestAnimationFrame(updateCursor);
    }

    updateCursor();

    // Hover interactions
    const hoverElements = document.querySelectorAll('[data-cursor], a, button');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');

            const cursorType = el.getAttribute('data-cursor');
            if (cursorType && cursorLabel) {
                cursorLabel.textContent = cursorType;
                cursor.classList.add('show-label');
            }
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover', 'show-label');
            if (cursorLabel) {
                cursorLabel.textContent = '';
            }
        });
    });
}


/* ============================================================
   7. MAGNETIC BUTTONS
   ============================================================ */

function initMagneticButtons() {
    if (!STATE.supportsHover || STATE.prefersReducedMotion || STATE.isMobile) return;

    const magneticButtons = document.querySelectorAll('.btn-magnetic');

    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const distance = Math.sqrt(x * x + y * y);

            if (distance < CONFIG.magneticButtonDistance) {
                button.style.transform = `translate(${x * CONFIG.magneticButtonStrength}px, ${y * CONFIG.magneticButtonStrength}px)`;
            }
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}


/* ============================================================
   8. SCROLL REVEAL ANIMATIONS
   ============================================================ */

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: CONFIG.scrollRevealThreshold,
        rootMargin: '0px 0px -80px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}


/* ============================================================
   9. PARALLAX EFFECT
   ============================================================ */

function initParallax() {
    if (STATE.prefersReducedMotion) return;

    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length === 0) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    function updateParallax() {
        parallaxElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const strength = parseFloat(el.getAttribute('data-parallax')) || CONFIG.parallaxStrength;

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                const translateY = (scrollPercent - 0.5) * 100 * strength;
                el.style.transform = `translateY(${translateY}px)`;
            }
        });
    }
}


/* ============================================================
   10. TIMELINE PROGRESS ANIMATION
   ============================================================ */

function initTimelineProgress() {
    const timelineProgress = document.getElementById('timelineProgress');
    const timelineTrack = document.getElementById('timelineTrack');

    if (!timelineProgress || !timelineTrack) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    timelineProgress.style.height = '100%';
                }, 200);
            }
        });
    }, {
        threshold: CONFIG.timelineProgressThreshold
    });

    observer.observe(timelineTrack);
}


/* ============================================================
   11. FAQ ACCORDION
   ============================================================ */

function initFAQ() {
    const faqTriggers = document.querySelectorAll('.faq-trigger');

    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

            // Close all other FAQs
            faqTriggers.forEach(otherTrigger => {
                if (otherTrigger !== trigger) {
                    otherTrigger.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current FAQ
            trigger.setAttribute('aria-expanded', !isExpanded);
        });
    });
}


/* ============================================================
   12. BOOKING FORM VALIDATION & SUBMISSION
   ============================================================ */

function initBookingForm() {
    const form = document.getElementById('bookingForm');
    const successPanel = document.getElementById('bookingSuccessPanel');
    const bookingCard = document.getElementById('bookingCard');
    const submitBtn = document.getElementById('submitBtn');
    const newRequestBtn = document.getElementById('newRequestBtn');

    if (!form) return;

    // Validation rules
    const validators = {
        fullName: (value) => {
            if (!value.trim()) return 'Please enter your full name.';
            if (value.trim().length < 2) return 'Please enter a valid name.';
            return null;
        },

        phone: (value) => {
            if (!value.trim()) return 'Please enter your phone number.';
            const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
            if (!phoneRegex.test(value)) return 'Please enter a valid phone number.';
            return null;
        },

        email: (value) => {
            if (!value.trim()) return 'Please enter your email address.';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) return 'Please enter a valid email address.';
            return null;
        },

        date: (value) => {
            if (!value) return 'Please select your preferred date.';
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) return 'Please select a future date.';
            return null;
        },

        time: (value) => {
            if (!value) return 'Please select your preferred time.';
            return null;
        },

        address: (value) => {
            if (!value.trim()) return 'Please enter your service address.';
            if (value.trim().length < 5) return 'Please enter a complete address.';
            return null;
        }
    };

    // Real-time validation
    Object.keys(validators).forEach(fieldName => {
        const field = form.querySelector(`#${fieldName}`);
        if (!field) return;

        field.addEventListener('blur', () => validateField(fieldName, field));
        field.addEventListener('input', () => {
            const formGroup = field.closest('.form-group');
            if (formGroup && formGroup.classList.contains('error')) {
                validateField(fieldName, field);
            }
        });
    });

    function validateField(fieldName, field) {
        const formGroup = field.closest('.form-group');
        const errorMsg = document.getElementById(`error-${fieldName}`);

        if (!formGroup || !errorMsg) return true;

        const error = validators[fieldName](field.value);

        if (error) {
            formGroup.classList.add('error');
            errorMsg.textContent = error;
            return false;
        } else {
            formGroup.classList.remove('error');
            errorMsg.textContent = '';
            return true;
        }
    }

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all required fields
        let isValid = true;
        Object.keys(validators).forEach(fieldName => {
            const field = form.querySelector(`#${fieldName}`);
            if (field && !validateField(fieldName, field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            const firstError = form.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate submission (in production, send to server)
        setTimeout(() => {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            console.log('Appointment request submitted:', data);

            // Show success panel
            showSuccessPanel(data);

            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }, 1200);
    });

    function showSuccessPanel(data) {
        form.style.display = 'none';
        successPanel.style.display = 'block';

        // Populate summary
        const summaryBox = document.getElementById('successSummaryBox');
        if (summaryBox) {
            summaryBox.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.9375rem;">
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: var(--text-muted); font-weight: 500;">Name:</span>
                        <span style="color: var(--brown-dark); font-weight: 600;">${data.fullName || '—'}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: var(--text-muted); font-weight: 500;">Service:</span>
                        <span style="color: var(--brown-dark); font-weight: 600;">${data.service || 'Not specified'}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: var(--text-muted); font-weight: 500;">Date:</span>
                        <span style="color: var(--brown-dark); font-weight: 600;">${formatDate(data.date) || '—'}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: var(--text-muted); font-weight: 500;">Time:</span>
                        <span style="color: var(--brown-dark); font-weight: 600;">${formatTime(data.time) || '—'}</span>
                    </div>
                </div>
            `;
        }

        successPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Reset form for new request
    if (newRequestBtn) {
        newRequestBtn.addEventListener('click', () => {
            form.reset();
            form.style.display = 'block';
            successPanel.style.display = 'none';

            // Clear all error states
            document.querySelectorAll('.form-group.error').forEach(group => {
                group.classList.remove('error');
            });

            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
}


/* ============================================================
   13. SERVICE SELECTION
   ============================================================ */

function initServiceButtons() {
    const serviceButtons = document.querySelectorAll('.btn-service-book');
    const serviceSelect = document.getElementById('service');

    serviceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const serviceName = button.getAttribute('data-service');

            if (serviceName && serviceSelect) {
                STATE.selectedService = serviceName;

                // Pre-select service in form
                setTimeout(() => {
                    serviceSelect.value = serviceName;
                }, 100);
            }
        });
    });
}


/* ============================================================
   14. SMOOTH SCROLL
   ============================================================ */

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (!href || href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}


/* ============================================================
   15. ACTIVE NAV LINKS
   ============================================================ */

function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', throttle(() => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 100));
}


/* ============================================================
   16. DATE & TIME CONSTRAINTS
   ============================================================ */

function initDateTimeConstraints() {
    const dateInput = document.getElementById('date');

    if (!dateInput) return;

    // Set minimum date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    dateInput.setAttribute('min', minDate);

    // Set maximum date to 3 months from now
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
}


/* ============================================================
   17. DYNAMIC WHATSAPP LINK
   ============================================================ */

function initWhatsAppDynamicLink() {
    const form = document.getElementById('bookingForm');
    const formWaBtn = document.getElementById('formWaBtn');

    if (!form || !formWaBtn) return;

    form.addEventListener('input', debounce(() => {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        const message = `Hello Heavenly Aura Spa,

I would like to request an appointment.

Name: ${data.fullName || ''}
Phone: ${data.phone || ''}
Email: ${data.email || ''}
Service: ${data.service || 'Not specified'}
Preferred Date: ${formatDate(data.date) || ''}
Preferred Time: ${formatTime(data.time) || ''}
Address: ${data.address || ''}
Additional Notes: ${data.notes || 'None'}

Thank you.`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/2348056966140?text=${encodedMessage}`;

        formWaBtn.setAttribute('href', whatsappURL);
    }, 500));
}


/* ============================================================
   18. UTILITY FUNCTIONS
   ============================================================ */

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function formatDate(dateString) {
    if (!dateString) return '';

    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatTime(timeString) {
    if (!timeString) return '';

    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;

    return `${displayHour}:${minutes} ${ampm}`;
}


/* ============================================================
   19. PERFORMANCE OPTIMIZATION
   ============================================================ */

// Lazy load images below the fold
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}


/* ============================================================
   20. ERROR HANDLING
   ============================================================ */

window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // In production, send to error tracking service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // In production, send to error tracking service
});


/* ============================================================
   21. ANALYTICS HELPERS (PLACEHOLDER)
   ============================================================ */

function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log('Track event:', { category, action, label });

    // Example: Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         'event_category': category,
    //         'event_label': label
    //     });
    // }
}

// Track important interactions
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('Engagement', 'Click', 'Primary CTA');
    });
});


/* ============================================================
   22. CONSOLE SIGNATURE
   ============================================================ */

console.log('%c ', 'font-size: 1px; padding: 60px 120px; background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkNvcm1vcmFudCBHYXJhbW9uZCIgZm9udC1zaXplPSIyNCIgZmlsbD0iI0EwNjE3QiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+SGVhdmVubHkgQXVyYSBTcGE8L3RleHQ+PC9zdmc+) no-repeat; background-size: contain;');
