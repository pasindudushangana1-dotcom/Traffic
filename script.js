document.addEventListener('DOMContentLoaded', () => {

    // --- Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');

    if (cursorDot && cursorRing) {
        document.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            cursorRing.style.left = `${e.clientX}px`;
            cursorRing.style.top = `${e.clientY}px`;
        });
    }

    // Hover effect for links and buttons
    const hoverables = document.querySelectorAll('a, button, .bento-item, .glass-card, .gallery-card, .leader-node');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });

    // --- Mobile Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // --- Scroll Progress ---
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        if (scrollProgress) scrollProgress.style.width = `${scrolled}%`;
    });

    // --- 3D Tilt Effect ---
    const tiltCards = document.querySelectorAll('.glass-card, .bento-item, .leader-node');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Sticky Navbar & ScrollSpy ---
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Sticky Nav
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 5, 0.95)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.8)';
            navbar.style.padding = '1rem 2rem';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.7)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
            navbar.style.padding = '1.5rem 2rem';
        }

        // ScrollSpy
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        navItems.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active');
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
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('mouseover', event => {
            let iteration = 0;
            clearInterval(event.target.interval);

            event.target.interval = setInterval(() => {
                event.target.innerText = event.target.innerText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return event.target.dataset.value;
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");

                if (iteration >= event.target.dataset.value.length) {
                    clearInterval(event.target.interval);
                }

                iteration += 1 / 3;
            }, 30);
        });
    });
    // Set data-value for scramble (needed for restoration)
    document.querySelectorAll('.nav-links a').forEach(a => a.dataset.value = a.innerText);


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
