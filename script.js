document.addEventListener('DOMContentLoaded', () => {

    // --- System Boot Sequence ---
    const bootScreen = document.getElementById('boot-screen');
    const bootTextContainer = document.getElementById('boot-text');
    const progressBar = document.querySelector('.progress-bar-fill');

    // Only run if the elements exist (safety)
    if (bootScreen && bootTextContainer && progressBar) {

        const lines = [
            "GBC MAINFRAME INITIATED...",
            "LOADING ASSETS...",
            "ESTABLISHING SECURE CONNECTION...",
            "ACCESS GRANTED."
        ];

        let lineIndex = 0;
        let charIndex = 0;
        let currentLineElement = null;

        // Function to create a new line element
        const createLine = (text) => {
            const p = document.createElement('p');
            p.textContent = text; // Set text immediately for the CSS width animation to reveal it
            // Actually, for pure JS typewriter, we might want to type char by char OR use CSS.
            // Requirement asked for "Typewriter Effect". CSS 'width' animation is smoother for "lines".
            // Let's stick to a hybrid: Add p, set text, let CSS animate width? 
            // OR strictly JS char-by-char for "Hacker" feel. 
            // JS char-by-char is more reliable for variable lengths.
            p.textContent = "> " + text;
            p.style.width = "100%"; // Override CSS width=0 if we don't use keyframes
            p.style.borderRight = "none"; // Remove cursor from previous

            // "Typewriter" via JS text content replacement? width:0 -> 100% CSS is easiest for lines.
            // Let's try the CSS approach provided in styles for the "typing" animation, 
            // but we need to trigger them one by one.

            p.style.animation = `typing 0.8s steps(40, end) forwards`;
            // We need a cursor on the current line only.

            return p;
        };

        // Alternative High-Control JS Typewriter
        const typeLine = (text, callback) => {
            const p = document.createElement('p');
            p.textContent = "> ";
            p.style.width = "auto";
            p.style.borderRight = "2px solid var(--primary-color)";
            p.style.animation = "none"; // Disable CSS animation
            bootTextContainer.appendChild(p);

            let i = 0;
            const interval = setInterval(() => {
                p.textContent += text.charAt(i);
                i++;
                if (i >= text.length) {
                    clearInterval(interval);
                    p.style.borderRight = "none"; // Remove cursor
                    if (callback) callback();
                }
            }, 30); // Speed
        };

        const runBootSequence = async () => {
            // Line 1
            await new Promise(r => typeLine(lines[0], r));
            progressBar.style.width = "30%";

            // Line 2
            await new Promise(r => setTimeout(r, 400)); // Pause
            await new Promise(r => typeLine(lines[1], r));
            progressBar.style.width = "60%";

            // Line 3
            await new Promise(r => setTimeout(r, 400));
            await new Promise(r => typeLine(lines[2], r));
            progressBar.style.width = "90%";

            // Line 4
            await new Promise(r => setTimeout(r, 500));
            await new Promise(r => typeLine(lines[3], r));
            progressBar.style.width = "100%";

            // Finish
            setTimeout(() => {
                // Reveal Site
                document.body.classList.remove('loading');

                // Allow a tiny frame for CSS to acknowledge display:block before animating transform
                requestAnimationFrame(() => {
                    bootScreen.classList.add('loaded');
                });

                // Cleanup (optional, remove display none completely after anim)
                // setTimeout(() => bootScreen.style.display = 'none', 1000); 
            }, 500);
        };

        runBootSequence();

    } else {
        // Fallback if HTML is missing
        document.body.classList.remove('loading');
    }





    // Hover effect for links and buttons
    const hoverables = document.querySelectorAll('a, button, .bento-item, .glass-card, .gallery-card, .leader-node');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });

    // --- Mobile Menu (Premium) ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navCapsule = document.querySelector('.nav-capsule');
    const navCenter = document.querySelector('.nav-center');
    const navActions = document.querySelector('.nav-actions');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            // Toggle visibility of menu items on mobile
            // Since we used display:none in CSS for mobile, we need a way to show them
            // The simplest approach for this capsule design is to expand the capsule 
            // and show a mobile-specific menu or unhide the standard ones flex-column.

            navCapsule.classList.toggle('expanded');

            // Note: For a true production mobile menu with this specific "capsule" design,
            // we often create a separate full-screen overlay or expand the capsule significantly.
            // For now, we'll toggle a class that valid CSS can hook into if we add it,
            // or simply log that we need mobile CSS updates if they weren't fully covered.
        });
    }

    // --- Search Interaction ---
    const searchInput = document.querySelector('.search-input');
    const searchContainer = document.querySelector('.search-container');

    if (searchInput) {
        searchInput.addEventListener('focus', () => {
            searchContainer.classList.add('focused');
        });
        searchInput.addEventListener('blur', () => {
            searchContainer.classList.remove('focused');
        });
    }

    // --- Smooth Scroll (Updated Selectors) ---
    document.querySelectorAll('.nav-link[href^="#"], .mega-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                if (mobileToggle && mobileToggle.classList.contains('active')) {
                    mobileToggle.classList.remove('active');
                    navCapsule.classList.remove('expanded');
                }
            }
        });
    });

    // --- Sticky Navbar (Removed/Simplified) ---
    // The floating capsule stays fixed. We might want to just add a 'scrolled' state
    // if we want it to shrink slightly, but per requirements it's a constant float.
    const navbar = document.querySelector('.nav-capsule');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        } else {
            navbar.style.backdropFilter = 'blur(16px)';
            navbar.style.background = 'rgba(26, 26, 26, 0.85)';
        }
    });

    // --- ScrollSpy (Re-enabled) ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            // Check if href matches current id (only for links, not buttons)
            if (link.tagName === 'A') {
                const href = link.getAttribute('href');
                if (href && href.includes(current) && current !== '') {
                    link.classList.add('active');
                }
            }
        });
    });

    // --- Staggered Entry Animation ---
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible to save resources
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.stagger-item, .bento-item, .glass-card, .gallery-card').forEach((el, index) => {
        el.classList.add('stagger-item');
        // Add a slight delay based on index (if sharing a container) or just rely on scroll
        // CSS transition handles the smooth fade in
        staggerObserver.observe(el);
    });

    // --- Infinite Horizontal Gallery Loop ---
    const galleryTrack = document.querySelector('.gallery-track');
    const galleryContainer = document.querySelector('.gallery-container');
    const prevBtn = document.querySelector('.nav-arrow.prev');
    const nextBtn = document.querySelector('.nav-arrow.next');

    if (galleryTrack && galleryContainer) {
        // 1. Clone items for seamless loop
        // We need enough duplicates to fill the screen width + buffer
        const originalCards = Array.from(galleryTrack.children);

        // Clone set 1
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            galleryTrack.appendChild(clone);
        });

        // Clone set 2 (Double buffer for wide screens)
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            galleryTrack.appendChild(clone);
        });

        let scrollPos = 0;
        let speed = 0.5; // Radar sweep speed
        let isPaused = false;
        let animationFrameId;

        // Calculate single set width after render
        const getSingleSetWidth = () => {
            const gap = 32; // 2rem gap
            const cardWidth = 300; // min-width
            // Approximation or measure first card including gap
            // Better to measure total scrollWidth / 3
            return galleryTrack.scrollWidth / 3;
        };

        const loop = () => {
            if (!isPaused) {
                scrollPos += speed;
                const singleSetWidth = galleryTrack.scrollWidth / 3; // Dynamic measure

                if (scrollPos >= singleSetWidth) {
                    scrollPos = 0; // Seamless snap back
                }

                galleryTrack.style.transform = `translateX(${-scrollPos}px)`;
            }
            animationFrameId = requestAnimationFrame(loop);
        };

        // Start Loop
        loop();

        // Pause on Hover
        galleryContainer.addEventListener('mouseenter', () => isPaused = true);
        galleryContainer.addEventListener('mouseleave', () => isPaused = false);

        // Manual Controls
        nextBtn.addEventListener('click', () => {
            const singleSetWidth = galleryTrack.scrollWidth / 3;
            scrollPos += 300; // Jump one card width
            if (scrollPos >= singleSetWidth) scrollPos = 0;
            galleryTrack.style.transform = `translateX(${-scrollPos}px)`;
        });

        prevBtn.addEventListener('click', () => {
            const singleSetWidth = galleryTrack.scrollWidth / 3;
            scrollPos -= 300;
            if (scrollPos < 0) scrollPos = singleSetWidth - 300; // Wrap around to end
            galleryTrack.style.transform = `translateX(${-scrollPos}px)`;
        });
    }

    // --- Hero Text Typewriter ---
    const subtext = document.querySelector('.hero-subtext');
    if (subtext) {
        const text = subtext.textContent;
        subtext.textContent = '';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                subtext.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        }
        // Start typing after a slight delay
        setTimeout(typeWriter, 1000);
    }

    // --- Text Scramble Effect ---
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // Target the specific text span to avoid wiping SVGs/Icons
    document.querySelectorAll('.nav-text').forEach(textSpan => {
        // We attach the listener to the parent .nav-link (button/a) so hover works on the whole area
        // but we manipulate only the textSpan
        const parent = textSpan.closest('.nav-link');
        if (!parent) return;

        parent.addEventListener('mouseenter', () => { // Changed to mouseenter to avoid frequent triggers
            let iteration = 0;
            clearInterval(textSpan.interval);

            // Use original text from dataset
            const originalText = textSpan.dataset.value;

            textSpan.interval = setInterval(() => {
                textSpan.innerText = originalText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return originalText[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");

                if (iteration >= originalText.length) {
                    clearInterval(textSpan.interval);
                }

                iteration += 1 / 3;
            }, 30);
        });
    });
    // Set data-value for scramble (needed for restoration)
    // Set data-value for scramble and lock width to prevent layout shifts
    document.querySelectorAll('.nav-text').forEach(span => {
        span.dataset.value = span.innerText;
        // Lock width to prevent jitter
        const width = span.offsetWidth;
        span.style.display = 'inline-block';
        span.style.width = `${width}px`;
        span.style.textAlign = 'center';
    });


    // --- Advanced Card Hover Effect (Mouse Tracking) ---
    const cards = document.querySelectorAll('.glass-card, .bento-item, .nav-item');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // --- Magnetic Buttons ---
    const btns = document.querySelectorAll('.btn-primary, .btn-secondary');
    btns.forEach(btn => {
        btn.addEventListener('mousemove', function (e) {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', function () {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // --- Hero Parallax ---
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX * 2) / 90;
            const y = (window.innerHeight - e.pageY * 2) / 90;
            heroSection.style.backgroundPosition = `center calc(50% + ${y}px)`; // Only move Y slightly or adjust logic for BG image
            // Or if we want to move the content:
            const content = document.querySelector('.hero-content');
            if (content) content.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    // --- Glitch Text (Original) ---
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        setInterval(() => {
            if (Math.random() > 0.95) {
                glitchText.style.textShadow = '2px 0 #CCFF00, -2px 0 #ff00c1';
                setTimeout(() => {
                    glitchText.style.textShadow = 'none';
                }, 100);
            }
        }, 2000);
    }
});
