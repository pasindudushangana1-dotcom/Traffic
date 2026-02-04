// --- Tactical Cyberpunk OS Loader Logic ---


// Decryption Effect Helper
function scrambleText(element, finalText) {
    element.isScrambling = true;
    let iteration = 0;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
    const duration = 20; // Frames (approx 600ms at 30ms interval)

    const interval = setInterval(() => {
        element.innerText = finalText
            .split("")
            .map((letter, index) => {
                if (index < iteration) {
                    return finalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");

        if (iteration >= finalText.length) {
            clearInterval(interval);
            element.isScrambling = false;
        }

        iteration += 1 / 2; // Slower resolve
    }, 30);
}

// Mobile Auto-Scroll for Unit Leadership
function initAutoScroll(selector) {
    if (window.innerWidth >= 768) return; // Mobile check

    const container = document.querySelector(selector);
    if (!container) return;

    const scrollAmount = 240; // Approx card width

    const autoScrollTimer = setInterval(() => {
        // Loop Logic
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }, 3500); // 3.5 seconds

    // Smart Interaction: Pause on Touch
    const stopScroll = () => {
        clearInterval(autoScrollTimer);
    };

    container.addEventListener('touchstart', stopScroll);
    container.addEventListener('mousedown', stopScroll);
}

// Initialize for Tier 2 and Tier 3
document.addEventListener('DOMContentLoaded', () => {
    initAutoScroll('.tier-2-scroll-wrapper');
    initAutoScroll('.tier-3-scroll-wrapper');
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

// Gallery Infinite Scroll (Marquee)
const galleryTrack = document.querySelector('.gallery-track');
if (galleryTrack) {
    // Clone items for seamless loop
    const galleryItems = Array.from(galleryTrack.children);

    // Clone twice to ensure enough buffer for big screens
    galleryItems.forEach(item => {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true'); // Accessibility
        galleryTrack.appendChild(clone);
    });

    galleryItems.forEach(item => {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        galleryTrack.appendChild(clone);
    });

    // Manual Arrow Logic (Optional Override)
    // Note: With CSS animation, manual scrolling via transform is tricky. 
    // We will disable arrows for the "Marquee" mode to keep it clean, 
    // as requested "improve auto scroll" usually implies this flow.
    const prevBtn = document.querySelector('.nav-arrow.prev');
    const nextBtn = document.querySelector('.nav-arrow.next');

    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
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

// Typewriter Scroll Reveal
document.addEventListener('DOMContentLoaded', () => {
    const typewriterElements = document.querySelectorAll('.typewriter');

    // Initial State: Empty content
    typewriterElements.forEach(el => {
        el.dataset.fullText = el.textContent.trim();
        el.textContent = '';
        el.style.visibility = 'visible'; // Ensure it takes up space if possible, or handle resizing
        // To prevent layout shift, min-height could be useful in CSS, but let's stick to user request.
    });

    const typewriterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const fullText = target.dataset.fullText;

                observer.unobserve(target);

                let i = 0;
                const speed = 50; // 50ms per char

                function type() {
                    if (i < fullText.length) {
                        target.innerHTML = fullText.substring(0, i + 1) + '<span class="typewriter-cursor"></span>';
                        i++;
                        setTimeout(type, speed);
                    } else {
                        // Finish: remove cursor after a moment or keep it? 
                        // User said "Remove the cursor when typing is finished."
                        target.innerHTML = fullText;
                    }
                }
                type();
            }
        });
    }, { threshold: 0.2 });

    typewriterElements.forEach(el => typewriterObserver.observe(el));
});
