// --- Traffic Society Logic - Finalized ---

// --- Impact Statistics Counter ---
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('#stats');

    if (statsSection) {
        console.log("Traffic Stats Module Initialized"); // Verify Load
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.counter');

                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');

                        // Handle non-numeric targets (e.g. "UNCOUNTABLE")
                        if (isNaN(target)) {
                            counter.innerText = counter.getAttribute('data-target');
                            return;
                        }

                        const speed = 200;
                        const increment = target / speed;

                        const updateCount = () => {
                            const count = +counter.innerText;

                            if (count < target) {
                                counter.innerText = Math.ceil(count + increment);
                                setTimeout(updateCount, 20);
                            } else {
                                counter.innerText = target;
                                counter.style.color = "#ffffff";
                                counter.style.textShadow = "0 0 20px #00ff00";
                            }
                        };

                        updateCount();
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }
});

// --- BCTWU Tactical Loader Logic ---
window.addEventListener('load', () => {
    const loader = document.getElementById('loader-screen');
    const percentEl = document.getElementById('loader-percent');
    const barEl = document.getElementById('loader-bar');
    const stepEl = document.getElementById('loader-step');
    const statusEl = document.getElementById('loader-status-text');
    const actionEl = document.getElementById('loader-action');

    if (!loader || !percentEl || !barEl) return;

    document.body.style.overflow = 'hidden'; // Lock scroll

    let progress = 0;
    const interval = setInterval(() => {
        // Increment logic: Fast then slows down
        if (progress < 30) progress += Math.random() * 2;
        else if (progress < 70) progress += Math.random() * 1.5;
        else if (progress < 90) progress += Math.random() * 0.5;
        else progress += Math.random() * 0.2;

        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            // Finish
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    loader.style.display = 'none';
                    document.body.style.overflow = '';
                }, 500);
            }, 500);
        }

        // Update UI
        const currentP = Math.floor(progress);
        percentEl.innerText = currentP;
        barEl.style.width = `${progress}%`;

        // Update Text Steps
        if (progress < 30) {
            stepEl.innerText = "STEP 1/4";
            statusEl.innerText = "INITIALIZING CORE";
            actionEl.innerText = "Establishing secure connection...";
        } else if (progress < 60) {
            stepEl.innerText = "STEP 2/4";
            statusEl.innerText = "LOADING MODULES";
            actionEl.innerText = "Decrypting assets and styles...";
        } else if (progress < 90) {
            stepEl.innerText = "STEP 3/4";
            statusEl.innerText = "SYNCING DATA";
            actionEl.innerText = "Synchronizing orbital arrays...";
        } else {
            stepEl.innerText = "STEP 4/4";
            statusEl.innerText = "FINALIZING";
            actionEl.innerText = "Launch sequence ready.";
        }

    }, 30); // 30ms Interval
});

// --- Failsafe: Force Loader Dismiss after 5 seconds ---
setTimeout(() => {
    const loader = document.getElementById('loader-screen');
    if (loader && loader.style.display !== 'none') {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.style.overflow = '';
        }, 500);
    }
}, 5000);

// Decryption Effect Helper (Kept for other uses if needed, or remove if unused)
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
    if (window.innerWidth < 768) return; // Disable on Mobile as per user request

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
    const revealElements = document.querySelectorAll('section, h1, h2, .card, .glass-card, .command-card, .stat-item, .dock-item, .bento-item, .member-card, .grade-header, .directory-header');

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
                    parent.classList.contains('about-grid') ||
                    parent.classList.contains('members-grid'))) {

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

// --- Contact Form Logic (Formspree + AJAX) ---
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', async function (event) {
            event.preventDefault();
            const data = new FormData(event.target);

            try {
                const response = await fetch(event.target.action, {
                    method: form.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    status.innerHTML = "✅ TRANSMISSION SECURE. MESSAGE SENT.";
                    status.style.color = "#00ff00"; // Neon Green
                    form.reset();
                } else {
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        status.innerHTML = "❌ TRANSMISSION FAILED.";
                        status.style.color = "#ff0000"; // Red
                    }
                }
            } catch (error) {
                status.innerHTML = "❌ TRANSMISSION FAILED.";
                status.style.color = "#ff0000"; // Red
            }
        });
    }
});

// --- Mobile Magic Navigation Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const list = document.querySelectorAll('.list');
    function activeLink() {
        list.forEach((item) =>
            item.classList.remove('active'));
        this.classList.add('active');
    }
    list.forEach((item) =>
        item.addEventListener('click', activeLink));
});

// --- Parallax Removed ---
