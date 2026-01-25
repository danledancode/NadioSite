// =====================================
// MOBILE MENU TOGGLE
// =====================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// =====================================
// FAQ ACCORDION
// =====================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// =====================================
// SCROLL TO TOP BUTTON
// =====================================
const scrollToTopButton = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopButton.classList.add('show');
    } else {
        scrollToTopButton.classList.remove('show');
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =====================================
// CONTACT FORM HANDLING (Formspree)
// =====================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    // Formspree gère automatiquement la validation et l'envoi
    // Pas d'intervention manuelle nécessaire
    console.log('Formulaire soumis via Formspree');
});

// =====================================
// ACTIVE NAV LINK TRACKING
// =====================================
const sections = document.querySelectorAll('section');

function updateActiveLink() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// =====================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// =====================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-element');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards for animations
document.querySelectorAll('.service-card, .specialty-card, .resource-card, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// =====================================
// SMOOTH SCROLL BEHAVIOR
// =====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =====================================
// PAGE LOAD ANIMATIONS
// =====================================
window.addEventListener('load', () => {
    // Fade in page content
    document.body.style.opacity = '1';
});

// =====================================
// PHONE LINK FORMATTING
// =====================================
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
phoneLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (!navigator.vibrate) return;
        navigator.vibrate(100);
    });
});

// =====================================
// FORM FIELD VALIDATION IN REAL-TIME
// =====================================
const emailInput = document.getElementById('email');
const nameInput = document.getElementById('name');

if (emailInput) {
    emailInput.addEventListener('blur', () => {
        if (emailInput.value && !isValidEmail(emailInput.value)) {
            emailInput.style.borderColor = '#ef4444';
        } else {
            emailInput.style.borderColor = '#e0e6ed';
        }
    });
}

if (nameInput) {
    nameInput.addEventListener('blur', () => {
        if (nameInput.value.trim().length < 2) {
            nameInput.style.borderColor = '#ef4444';
        } else {
            nameInput.style.borderColor = '#e0e6ed';
        }
    });
}

// =====================================
// PREVENT FORM SUBMISSION ON ENTER (except in textarea)
// =====================================
document.querySelectorAll('.contact-form input:not([type="checkbox"])').forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });
});

// =====================================
// ACCESSIBILITY - KEYBOARD NAVIGATION
// =====================================
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Scroll to top on Home key
    if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// =====================================
// LAZY LOADING FOR IMAGES (if implemented)
// =====================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// =====================================
// PHONE NUMBER FORMATTING
// =====================================
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.startsWith('41')) {
                value = '+' + value;
            }
            e.target.value = value;
        }
    });
}

// =====================================
// CONSOLE WELCOME MESSAGE
// =====================================
console.log('%cBienvenue sur le site de Nadio!', 'font-size: 20px; color: #6BA3D4; font-weight: bold;');
console.log('%cCoach & Praticienne en Psychothérapie', 'font-size: 14px; color: #4A7BA7;');
console.log('%cTéléphone: +41 77 987 68 35', 'color: #6BA3D4;');
console.log('%cLocalisation: Croy-Romainmôtier, Suisse', 'color: #6BA3D4;');
