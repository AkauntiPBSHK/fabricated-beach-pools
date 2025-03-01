document.addEventListener('DOMContentLoaded', () => {
    console.log("Welcome to BioPool!");

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

    // Fade-in Sections
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

    revealSections(); // Run on page load
    window.addEventListener('scroll', revealSections);
});

// Show Back to Top button when scrolling down
window.onscroll = function() {
    const backToTopButton = document.getElementById("backToTop");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

// Function to scroll back to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Mobile Menu Toggle
function toggleMenu() {
    const navMenu = document.querySelector('nav ul');
    navMenu.classList.toggle('show-menu');
}

// Lightbox Feature
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    lightboxImage.src = src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

document.querySelectorAll('.pool-item img').forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src));
});

// Smooth Page Transition on Navigation
document.querySelectorAll('a').forEach(link => {
    if (link.hostname === window.location.hostname && link.href !== window.location.href) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const destination = link.href;
            document.body.style.opacity = 0;
            setTimeout(() => {
                window.location.href = destination;
            }, 300); // Matches the animation time
        });
    }
});
