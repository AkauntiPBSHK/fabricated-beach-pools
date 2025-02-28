document.addEventListener('DOMContentLoaded', () => {
    console.log("Welcome to Fabricated Beach Pools!");

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

function toggleMenu() {
    const navMenu = document.querySelector('nav ul');
    navMenu.classList.toggle('show-menu');
}
// Open Lightbox
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    lightboxImage.src = src;
    lightbox.style.display = 'flex';
}

// Close Lightbox
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Add click event to all pool images
document.querySelectorAll('.pool-item img').forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src));
});
