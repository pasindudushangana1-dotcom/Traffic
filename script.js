
// --- High-Fidelity Preloader Logic ---
// 1. Hard Block (Immediately)
document.body.style.overflow = 'hidden';

document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('loader-text');
    const barElement = document.getElementById('loader-bar');
    const screenElement = document.getElementById('loader-screen');
    const loaderContent = document.querySelector('.loader-content');

    // 3. Dynamic Status Log Injection
    let statusElement = document.getElementById('loader-status');
    if (!statusElement && loaderContent) {
        statusElement = document.createElement('div');
        statusElement.id = 'loader-status';
        // Insert before the bar to keep layout nice
        loaderContent.insertBefore(statusElement, document.querySelector('.loader-bar-container'));
    }

    // Safety check
    if (textElement && barElement && screenElement) {
        let counter = 0;
        const duration = 6000; // 6 seconds
        const intervalTime = 30; // 30ms for faster updates
        const step = 0.5; // 0.5% per 30ms -> 100% in 6000ms

        // --- Rolling System Log Logic ---
        const logElement = document.getElementById('system-log');
        if (logElement) {
            const logLines = [
                "> SYSTEM_BOOT_SEQ_INIT",
                "> CHECKING_BIOS_INTEGRITY... OK",
                "> LOADING_KERNEL_MODULES",
                "> MOUNTING_VOL_01 [RO]",
                "> BYPASSING_FIREWALL_L3",
                "> OPTIMIZING_VRAM_ALLOC",
                "> ESTABLISHING_SECURE_Handshake",
                "> [WARNING] CORE_TEMP_ELEVATED",
                "> REROUTING_POWER_GRID: AUX",
                "> UPLINK_ESTABLISHED: PORT 443",
                "> DOWNLOADING_PACKETS [#############]",
                "> DECRYPTING_ASSETS_MANIFEST",
                "> PARSING_DOM_STRUCTURE",
                "> INJECTING_STYLESHEETS",
                "> COMPILING_SCRIPTS_V8",
                "> VERIFYING_IDENT_TOKEN",
                "> ACCESSING_MAINFRAME_DB",
                "> [SUCCESS] AUTH_GRANTED",
                "> INITIALIZING_RENDER_ENGINE",
                "> PRE_CACHING_TEXTURES",
                "> BINDING_EVENTS_LISTENER",
                "> SYNC_HZ: 144",
                "> GPU_ACCEL: ENABLED",
                "> NET_LATENCY: 12ms",
                "> SCANNING_VULNERABILITIES... 0 FOUND",
                "> EXECUTING_STARTUP.EXE",
                "> WELCOME_USER_ADMIN",
                "> SYSTEM_READY."
            ];

            let logIndex = 0;
            const logInterval = setInterval(() => {
                if (logIndex < logLines.length) {
                    const line = document.createElement('div');
                    line.innerText = logLines[logIndex];
                    logElement.appendChild(line);
                    logElement.scrollTop = logElement.scrollHeight; // Auto-scroll
                    logIndex++;
                } else {
                    // Add random noise lines if we run out
                    const noise = "> PROCESS_" + Math.floor(Math.random() * 9999) + "_ACTIVE";
                    const line = document.createElement('div');
                    line.innerText = noise;
                    logElement.appendChild(line);
                    logElement.scrollTop = logElement.scrollHeight;
                }
            }, 100);

            // Clear log interval on completion (handled inside main loaderInterval completion block if desired, 
            // but separate is fine too, or we clear it when loader finishes)
            // Let's attach it to the main completion block logic below to be clean.
            // We'll store it on the element or a var to clear it later.
            logElement.dataset.intervalId = logInterval;
        }

        const loaderInterval = setInterval(() => {
            counter += step;
            if (counter > 100) counter = 100;

            // Update Percentage (Decimal Precision)
            // Use toFixed(1) for "45.5%"
            textElement.textContent = counter.toFixed(1) + '%';
            barElement.style.width = counter + '%';

            // 2. Reactive Color Logic
            let activeColor = '#CCFF00'; // Default Green

            if (counter <= 40) {
                activeColor = '#FF3333'; // Emergency Red
            } else if (counter <= 80) {
                activeColor = '#FFCC00'; // Warning Yellow
            } else {
                activeColor = '#CCFF00'; // Secure Neon Green
            }

            // Apply Colors
            // For segmented gradient, we set text color to activeColor.
            // The gradient in CSS uses 'currentColor' so we set color on the bar itself.
            barElement.style.color = activeColor;
            barElement.style.background = `repeating-linear-gradient(90deg, ${activeColor}, ${activeColor} 4px, transparent 4px, transparent 6px)`;

            // Only update box shadow if needed, but CSS handles it via currentColor too if we change it there?
            // Actually CSS has box-shadow: 0 0 10px currentColor; so we just need to set color.
            // BUT inline style overrides might be safer to be explicit
            barElement.style.boxShadow = `0 0 10px ${activeColor}`;

            textElement.style.color = activeColor;
            textElement.style.textShadow = `0 0 10px ${activeColor}`;

            // Update status text color too for consistency
            if (statusElement) {
                statusElement.style.color = activeColor;

                let newText = "";
                if (counter <= 20) newText = "INITIALIZING CORE...";
                else if (counter <= 50) newText = "VERIFYING SECURITY PROTOCOLS...";
                else if (counter <= 80) newText = "CONNECTING TO MAIN UPLINK...";
                else if (counter <= 99) newText = "DECRYPTING ASSETS...";
                else newText = "ACCESS GRANTED.";

                if (statusElement.innerText !== newText && !statusElement.isScrambling) {
                    scrambleText(statusElement, newText);
                }
            }

            // 3. Ignition Shake
            // With float counter, strict equality === 98 might miss. Use range.
            if (counter >= 98 && counter < 98.5) {
                const logo = document.querySelector('.loader-logo');
                if (logo) logo.classList.add('shake-critical');
            }

            if (counter >= 100) {
                clearInterval(loaderInterval);

                // Clear System Log Interval
                const logElement = document.getElementById('system-log');
                if (logElement && logElement.dataset.intervalId) {
                    clearInterval(parseInt(logElement.dataset.intervalId));
                }

                // Completion sequence
                screenElement.classList.add('fade-out');

                setTimeout(() => {
                    screenElement.style.display = 'none';
                    document.body.style.overflow = 'auto'; // Re-enable scrolling
                }, 800); // 0.8s transition match
            }
        }, intervalTime);
    }
});

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
