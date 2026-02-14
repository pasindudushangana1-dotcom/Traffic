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

    // session storage check
    if (sessionStorage.getItem('loader_shown')) {
        loader.style.display = 'none';
        return;
    }

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
                    sessionStorage.setItem('loader_shown', 'true'); // Set flag
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
    // Also check session storage here
    if (sessionStorage.getItem('loader_shown')) {
        if (loader) loader.style.display = 'none';
        return;
    }

    if (loader && loader.style.display !== 'none') {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.style.overflow = '';
            sessionStorage.setItem('loader_shown', 'true');
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

// Command Dock Scroll Effect - Optimized
const commandDock = document.querySelector('.command-dock');
if (commandDock) {
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 30) { // Lower threshold for faster response
                    commandDock.classList.add('scrolled');
                } else {
                    commandDock.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
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
// --- Contact Form Logic (Formspree + AJAX) ---
document.addEventListener('DOMContentLoaded', () => {

    // Helper Function for Form Submission
    async function handleFormSubmission(formId, statusId) {
        const form = document.getElementById(formId);
        const status = document.getElementById(statusId);

        if (form && status) {
            form.addEventListener('submit', async function (event) {
                event.preventDefault();
                const data = new FormData(event.target);

                status.innerHTML = "⏳ TRANSMITTING DATA...";
                status.style.color = "#ffff00"; // Yellow

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
                    status.innerHTML = "❌ TRANSMISSION FAILED. CHECK NETWORK.";
                    status.style.color = "#ff0000"; // Red
                }
            });
        }
    }

    // Initialize Forms
    handleFormSubmission('contact-form', 'form-status');
    handleFormSubmission('application-form', 'application-status');
});

// --- Mobile Magic Navigation Logic Removed ---

// --- Parallax Removed ---

// --- Language Toggle Logic ---
const translations = {
    en: {
        nav_home: "Home",
        nav_members: "Members",
        nav_contact: "Contact",
        nav_join: "JOIN US",
        hero_title: "TRAFFIC WARDEN UNIT",
        hero_subtitle: "BANDARANAYAKE COLLEGE GAMPAHA",
        hero_mission: "To maintain discipline, ensure safety, and lead with honor on the roads and within the college premises.",
        hero_cta: "EXPLORE UNIT",
        about_title: "ABOUT THE UNIT",
        about_guardians: "Guardians of Bandaranayake College.",
        about_desc: "The Bandaranayake College Traffic Warden Unit is a premier student disciplinarian body, dedicated to controlling traffic flow, ensuring student safety, and upholding the prestige of the college.",
        stats_active: "Active Wardens",
        stats_incidents: "Incidents 2025",
        stats_hours: "Service Hours",
        gallery_title: "LATEST LOGS",
        members_title: "Unit Directory",
        members_subtitle: "Active traffic wardens by grade level.",
        contact_badge: "WE ARE HERE TO HELP",
        contact_title: "GET IN TOUCH",
        contact_desc: "Have questions about traffic safety, patrol schedules, or joining our team? Reach out to us anytime.",
        footer_rights: "© 2026 Traffic Warden Unit. All rights reserved.",
        footer_privacy: "Privacy Protocol",
        footer_terms: "Terms of Engagement",
        footer_report: "Report Incident",

        // Join Page
        join_badge: "MEMBERSHIP APPLICATION OPEN",
        join_title_1: "JOIN THE",
        join_title_2: "ELITE",
        join_desc: "Secure the flow. Lead the way. Become a guardian of BCTWU traffic safety and unlock exclusive campus privileges reserved only for the committed few.",
        feat_leadership_title: "Exclusive Leadership Training",
        feat_leadership_desc: "Gain real-world management skills directly from industry leaders.",
        feat_access_title: "Priority Campus Access",
        feat_access_desc: "Skip the lines with elite status and designated zones.",
        feat_gear_title: "Official Society Gear",
        feat_gear_desc: "Wear the badge of honor. Premium uniform kit included.",
        form_title: "Apply Now",
        form_step: "Step 1 of 2: Candidate Details",
        form_name: "FULL NAME",
        form_name_ph: "Enter your full name",
        form_id: "STUDENT ID",
        form_id_ph: "8-digit ID",
        form_grade: "GRADE / YEAR",
        form_grade_ph: "Select Grade",
        form_motivation: "WHY DO YOU WANT TO JOIN?",
        form_motivation_ph: "Describe your motivation...",
        form_submit: "SUBMIT APPLICATION",
        form_legal: "By submitting, you agree to the Honor Code."
    },
    si: {
        nav_home: "මුල් පිටුව",
        nav_members: "සාමාජිකයන්",
        nav_contact: "සම්බන්ධ වන්න",
        nav_join: "අප හා එක්වන්න",
        hero_title: "බණ්ඩාරනායක විද්‍යාලීය රිය නියාමක සංගමය",
        hero_subtitle: "බණ්ඩාරනායක විද්‍යාලය ගම්පහ",
        hero_mission: "විනය පවත්වා ගැනීම, ආරක්ෂාව තහවුරු කිරීම සහ විද්‍යාලය තුළ ගෞරවයෙන් පෙරමුණ ගැනීම.",
        hero_cta: "ඒකකය ගවේෂණය",
        about_title: "අප ගැන",
        about_guardians: "බණ්ඩාරනායක විද්‍යාලයේ රැකවල්කරුවන්.",
        about_desc: "බණ්ඩාරනායක විද්‍යාලීය රිය නියාමක සංගමය යනු රථවාහන පාලනය, ශිෂ්‍ය ආරක්ෂාව සහ විද්‍යාලයේ කීර්තිය සුරැකීම සඳහා කැපවූ ප්‍රමුඛ ශිෂ්‍ය විනය බලකායකි.",
        stats_active: "ක්‍රියාකාරී සාමාජිකයන්",
        stats_incidents: "සිදුවීම් 2025",
        stats_hours: "සේවා පැය",
        gallery_title: "නවතම සටහන්",
        members_title: "ඒකක නාමාවලිය",
        members_subtitle: "ශ්‍රේණි මට්ටම අනුව සක්‍රීය රථවාහන පාලකයන්.",
        contact_badge: "අපි උදව් කිරීමට මෙහි සිටිමු",
        contact_title: "සම්බන්ධ වන්න",
        contact_desc: "රථවාහන ආරක්ෂාව, මුර සංචාර කාලසටහන් හෝ අපගේ කණ්ඩායමට සම්බන්ධ වීම ගැන ප්‍රශ්න තිබේද? ඕනෑම වේලාවක අප අමතන්න.",
        footer_rights: "© 2026 බණ්ඩාරනායක විද්‍යාලීය රිය නියාමක සංගමය. සියලු හිමිකම් ඇවිරිණි.",
        footer_privacy: "පෞද්ගලිකත්ව ප්‍රතිපත්තිය",
        footer_terms: "සේවා කොන්දේසි",
        footer_report: "සිදුවීම් වාර්තා කරන්න",

        // Join Page
        join_badge: "සාමාජිකත්ව අයදුම්පත් විවෘතයි",
        join_title_1: "එක්වන්න",
        join_title_2: "විශිෂ්ටයන් හා",
        join_desc: "රථවාහන ආරක්ෂාවේ මුරකරුවෙකු වී කැපවූ අයට පමණක් වෙන් කර ඇති සුවිශේෂී වරප්‍රසාද අගුළු හරින්න.",
        feat_leadership_title: "නායකත්ව පුහුණුව",
        feat_leadership_desc: "කර්මාන්තයේ ප්‍රමුඛයින්ගෙන් සෘජුවම කළමනාකරණ කුසලතා ලබා ගන්න.",
        feat_access_title: "ප්‍රමුඛතා ප්‍රවේශය",
        feat_access_desc: "විශේෂිත කලාප සහ ප්‍රභූ තත්ත්වය සමඟ පෝලිම් මග හරින්න.",
        feat_gear_title: "නිල නිල ඇඳුම්",
        feat_gear_desc: "ගෞරවයේ ලාංඡනය පළඳින්න. උසස් තත්ත්වයේ නිල ඇඳුම් කට්ටලය ඇතුළත්.",
        form_title: "දැන් අයදුම් කරන්න",
        form_step: "පියවර 1/2 : අපේක්ෂක විස්තර",
        form_name: "සම්පූර්ණ නම",
        form_name_ph: "ඔබගේ නම ඇතුලත් කරන්න",
        form_id: "ශිෂ්‍ය අංකය",
        form_id_ph: "ඉලක්කම් 8 අංකය",
        form_grade: "ශ්‍රේණිය / වසර",
        form_grade_ph: "ශ්‍රේණිය තෝරන්න",
        form_motivation: "ඔබ බැඳීමට හේතුව?",
        form_motivation_ph: "ඔබේ අරමුණ විස්තර කරන්න...",
        form_submit: "අයදුම්පත යොමු කරන්න",
        form_legal: "ඉදිරිපත් කිරීමෙන්, ඔබ ඒකකයේ ගෞරව නීතිවලට එකඟ වේ."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const langToggleBtn = document.getElementById('lang-toggle');
    const langText = langToggleBtn ? langToggleBtn.querySelector('.lang-text') : null;

    // Check local storage or default to 'en'
    let currentLang = localStorage.getItem('traffic_lang') || 'en';

    // Initial Render
    updateLanguage(currentLang);

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'si' : 'en';
            updateLanguage(currentLang);
        });
    }

    function updateLanguage(lang) {
        // Update Lang Attribute
        document.documentElement.lang = lang;
        localStorage.setItem('traffic_lang', lang);

        // Toggle Font Class
        if (lang === 'si') {
            document.body.classList.add('lang-sinhala');
            if (langToggleBtn) langToggleBtn.classList.add('active-si');
            if (langText) langText.innerText = "SI"; // Keep showing SI to indicate current mode, or switch to EN to indicate action? User said "toggle". Usually show current or target. Let's make it clearer: 
            // Actually, let's just keep the text as "EN/SI" or switch it. 
            // The previous code swapped text. Let's stick to showing the ACTIVE language or the ACTION. 
            // Design asked for "good look". Let's simply highlight the button state.
            if (langText) langText.innerText = "EN"; // Show option to switch back
        } else {
            document.body.classList.remove('lang-sinhala');
            if (langToggleBtn) langToggleBtn.classList.remove('active-si');
            if (langText) langText.innerText = "SI"; // Show option to switch
        }

        // Apply Translations
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                // Handle inputs/placeholders if needed
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[lang][key];
                } else {
                    el.innerText = translations[lang][key];
                }
            }
        });
    }
});
