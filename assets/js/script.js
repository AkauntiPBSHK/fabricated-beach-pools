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

    // Improved performance - debounce scroll event
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(revealSections, 100);
    });

    // Back to Top Button with Smooth Scroll
    const backToTopButton = document.getElementById("backToTop");
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
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
