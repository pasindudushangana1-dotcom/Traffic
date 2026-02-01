// Theme Management
const themeToggleBtn = document.getElementById('theme-toggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const htmlEl = document.documentElement;

// Check Local Storage
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlEl.setAttribute('data-theme', savedTheme);
updateIcons(savedTheme);

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcons(newTheme);
});

function updateIcons(theme) {
    if (theme === 'light') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
}

// Loading Screen Logic
window.addEventListener('load', () => {
    const bootScreen = document.getElementById('boot-screen');
    const bootText = document.getElementById('boot-text');
    const progressBar = document.querySelector('.progress-bar-fill');
    let percentage = 0;

    // Create percentage element
    const percentageEl = document.createElement('div');
    percentageEl.className = 'loading-percentage';
    percentageEl.style.position = 'absolute';
    percentageEl.style.bottom = '40%';
    percentageEl.style.fontFamily = 'monospace';
    percentageEl.style.fontSize = '3rem';
    percentageEl.style.color = 'var(--primary-color)';
    percentageEl.style.fontWeight = 'bold';
    document.querySelector('.boot-container').appendChild(percentageEl);

    // Initial Text
    bootText.innerHTML = '<p>> SYSTEM_INIT...</p>';

    const interval = setInterval(() => {
        percentage += Math.floor(Math.random() * 5) + 1;
        if (percentage > 100) percentage = 100;

        // Update visuals
        progressBar.style.width = percentage + '%';
        percentageEl.innerText = percentage + '%';

        // Traffic Light Logic
        const lights = document.querySelectorAll('.light');
        if (percentage > 30) lights[0].classList.add('active'); // Red
        if (percentage > 60) lights[1].classList.add('active'); // Yellow
        if (percentage > 90) lights[2].classList.add('active'); // Green

        // Add random log messages
        if (percentage === 20) bootText.innerHTML += '<p>> LOADING_ASSETS...</p>';
        if (percentage === 50) bootText.innerHTML += '<p>> ESTABLISHING_SECURE_CONNECTION...</p>';
        if (percentage === 80) bootText.innerHTML += '<p>> DECRYPTING_PROTOCOLS...</p>';

        if (percentage === 100) {
            clearInterval(interval);
            bootText.innerHTML += '<p>> ACCESS_GRANTED.</p>';

            // Flash Green Light
            lights[2].classList.add('active');

            setTimeout(() => {
                bootScreen.style.opacity = '0';
                bootScreen.style.pointerEvents = 'none';
                document.body.classList.remove('loading');
            }, 800);
        }
    }, 50); // Speed of loading
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
