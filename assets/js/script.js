document.addEventListener('DOMContentLoaded', () => {
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent page reload

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const formMessage = document.getElementById('formMessage');

            if (name === '' || email === '' || message === '') {
                alert('Please fill in all fields before submitting.');
                return;
            }

            // Show thank-you message
            formMessage.style.display = 'block';

            // Clear form fields (optional)
            contactForm.reset();
        });
    }

    // Fade-in Sections on Scroll (with Debounce for Performance)
    const sections = document.querySelectorAll('section');

    const revealSections = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight - 100) {
                section.classList.add('visible');
            }
        });
    };

    revealSections(); // Run once on page load

    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(revealSections, 100);
    });

    // Smooth Scroll to Top - Polyfill Version
    function smoothScrollToTop() {
        const scrollStep = -window.scrollY / 15;
        const scrollInterval = setInterval(() => {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(scrollInterval);
            }
        }, 15);
    }

    // Hook up Back to Top button (only if present)
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScrollToTop();
        });
    }
});

// Show/Hide Back to Top button on Scroll
window.onscroll = function() {
    const backToTopButton = document.getElementById("backToTop");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

// Mobile Menu Toggle
function toggleMenu() {
    const navMenu = document.querySelector('nav ul');
    navMenu.classList.toggle('show-menu');
}

// Lightbox Feature for Pool Images
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    lightboxImage.src = src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

document.querySelectorAll('.pool-item picture img').forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src));
});

// Smooth Page Transition on Internal Navigation
document.querySelectorAll('a').forEach(link => {
    if (link.hostname === window.location.hostname && link.href !== window.location.href) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const destination = link.href;
            document.body.style.opacity = 0;
            setTimeout(() => {
                window.location.href = destination;
            }, 300); // Matches the fade-out animation time
        });
    }
});
