// ===== DOM Elements =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const skillBars = document.querySelectorAll('.skill-progress');
const contactForm = document.getElementById('contactForm');
const scrollToTopBtn = document.getElementById('scrollToTop');

// ===== Navbar Scroll Effect =====
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ===== Mobile Menu Toggle =====
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

// ===== Close Mobile Menu on Link Click =====
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== Active Navigation Link on Scroll =====
function updateActiveNavLink() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== Smooth Scroll for Navigation Links =====
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }

    closeMobileMenu();
}

// ===== Animate Skill Bars =====
function animateSkillBars() {
    const triggerBottom = window.innerHeight * 0.85;

    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;

        if (barTop < triggerBottom) {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = `${progress}%`;
        }
    });
}

// ===== Intersection Observer for Fade-in Animations =====
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });

    // Observe education cards
    document.querySelectorAll('.education-card').forEach(card => {
        observer.observe(card);
    });

    // Observe skill categories
    document.querySelectorAll('.skill-category').forEach(category => {
        observer.observe(category);
    });
}

// ===== Contact Form Handler =====
function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Create mailto link
    const mailtoLink = `mailto:srkngurel@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

    window.location.href = mailtoLink;

    // Reset form
    contactForm.reset();
}

// ===== Parallax Effect for Hero =====
function parallaxHero() {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;

    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
}

// ===== Typing Effect for Hero (Optional Enhancement) =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ===== Scroll to Top Button =====
function handleScrollToTopVisibility() {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== Counter Animation for Stats =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const triggerBottom = window.innerHeight * 0.85;

    counters.forEach(counter => {
        const counterTop = counter.getBoundingClientRect().top;

        if (counterTop < triggerBottom && !counter.classList.contains('counted')) {
            counter.classList.add('counted');
            const target = counter.innerText.replace('+', '');
            const targetNum = parseInt(target);
            const hasPlus = counter.innerText.includes('+');
            let current = 0;
            const increment = targetNum / 50;
            const duration = 2000;
            const stepTime = duration / 50;

            const updateCounter = () => {
                current += increment;
                if (current < targetNum) {
                    counter.innerText = Math.ceil(current) + (hasPlus ? '+' : '');
                    setTimeout(updateCounter, stepTime);
                } else {
                    counter.innerText = targetNum + (hasPlus ? '+' : '');
                }
            };

            updateCounter();
        }
    });
}

// ===== Initialize All Event Listeners =====
function init() {
    // Scroll events
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        updateActiveNavLink();
        animateSkillBars();
        animateCounters();
        parallaxHero();
        handleScrollToTopVisibility();
    });

    // Scroll to top button
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', scrollToTop);
    }

    // Mobile menu
    hamburger.addEventListener('click', toggleMobileMenu);

    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Setup intersection observer
    setupIntersectionObserver();

    // Initial calls
    handleNavbarScroll();
    updateActiveNavLink();
    animateSkillBars();
    animateCounters();
}

// ===== Add CSS for Animations =====
const style = document.createElement('style');
style.textContent = `
    .timeline-item,
    .education-card,
    .skill-category {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .timeline-item.animate-in,
    .education-card.animate-in,
    .skill-category.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .timeline-item:nth-child(1) { transition-delay: 0.1s; }
    .timeline-item:nth-child(2) { transition-delay: 0.2s; }
    .timeline-item:nth-child(3) { transition-delay: 0.3s; }
    .timeline-item:nth-child(4) { transition-delay: 0.4s; }

    .education-card:nth-child(1) { transition-delay: 0.1s; }
    .education-card:nth-child(2) { transition-delay: 0.2s; }
    .education-card:nth-child(3) { transition-delay: 0.3s; }

    .skill-category:nth-child(1) { transition-delay: 0.1s; }
    .skill-category:nth-child(2) { transition-delay: 0.2s; }
    .skill-category:nth-child(3) { transition-delay: 0.3s; }
    .skill-category:nth-child(4) { transition-delay: 0.4s; }
`;
document.head.appendChild(style);

// ===== Run on DOM Load =====
document.addEventListener('DOMContentLoaded', init);

// ===== Preloader (Optional) =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
