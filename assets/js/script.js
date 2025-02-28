document.addEventListener('DOMContentLoaded', () => {
    console.log("Welcome to Fabricated Beach Pools!");

    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Stop actual submission

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const formMessage = document.getElementById('formMessage'); // This is the thank-you message

            if (name === '' || email === '' || message === '') {
                alert('Please fill in all fields before submitting.');
                return;
            }

            // If all fields are filled, show the thank-you message
            formMessage.style.display = 'block';

            // Clear form fields (optional)
            contactForm.reset();
        });
    }
});
