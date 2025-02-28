document.addEventListener('DOMContentLoaded', () => {
    console.log("Welcome to Fabricated Beach Pools!");

    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const formMessage = document.getElementById('formMessage');

            if (name === '' || email === '' || message === '') {
                alert('Please fill in all fields.');
                return;
            }

            // Simulate successful submission
            formMessage.style.display = 'block';

            // Clear form (optional)
            contactForm.reset();
        });
    }
});
