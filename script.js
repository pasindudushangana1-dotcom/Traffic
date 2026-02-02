

// Cinematic Orbital Loader Logic
window.addEventListener('load', () => {
    const loader = document.getElementById('orbital-loader');

    // Ensure body starts in hidden state if not already
    // document.body.classList.add('content-hidden'); // Handled in HTML now for faster LCP
    document.body.classList.remove('loading'); // Unlock potential CSS locks

    if (loader) {
        // Dramatic delay (optional, but good for "Cinematic" feel)
        setTimeout(() => {
            loader.classList.add('loader-hidden');

            // Reveal Content
            document.body.classList.remove('content-hidden');
            document.body.classList.add('content-visible');
        }, 800); // 800ms delay before reveal
    }
});

// Command Dock Scroll Effect
const commandDock = document.querySelector('.command-dock');
if (commandDock) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            commandDock.classList.add('scrolled');
        } else {
            commandDock.classList.remove('scrolled');
        }
    });
}

// Mobile Overlay Logic
const menuBtn = document.querySelector('.mobile-menu-btn');
const closeBtn = document.querySelector('.close-menu-btn');
const overlay = document.querySelector('.mobile-overlay');

if (menuBtn && closeBtn && overlay) {
    menuBtn.addEventListener('click', () => {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock scroll
    });

    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Unlock scroll
    });

    // Close on link click
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Gallery Scroll
const track = document.querySelector('.gallery-track');
const prevBtn = document.querySelector('.nav-arrow.prev');
const nextBtn = document.querySelector('.nav-arrow.next');

if (track && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -320, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: 320, behavior: 'smooth' });
    });
}

// Tactical Scroll Reveal System
document.addEventListener('DOMContentLoaded', () => {
    // Target major elements
    const revealElements = document.querySelectorAll('section, h1, h2, .card, .glass-card, .command-card, .stat-item, .dock-item, .bento-item');

    // Add .reveal class programmatically
    revealElements.forEach(el => el.classList.add('reveal'));

    // Intersection Observer Options
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delay for grids
                const target = entry.target;

                // Check if element is part of a group (grid/flex siblings)
                const parent = target.parentElement;
                if (parent && (parent.classList.contains('tier-2') ||
                    parent.classList.contains('tier-3') ||
                    parent.classList.contains('stats-row') ||
                    parent.classList.contains('about-grid'))) {

                    const siblings = Array.from(parent.children);
                    const index = siblings.indexOf(target);
                    // 100ms stagger per item
                    target.style.transitionDelay = `${index * 100}ms`;
                }

                target.classList.add('active');
                observer.unobserve(target); // One-time animation
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
});
