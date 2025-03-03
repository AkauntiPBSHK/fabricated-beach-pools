/**
 * Fabricated Beach Pools
 * Main JavaScript functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // UTILITY FUNCTIONS
    // ==========================================
    
    /**
     * Checks if an element exists in the DOM
     * @param {string|Element} selector - CSS selector or DOM element
     * @return {boolean} Whether the element exists
     */
    function elementExists(selector) {
        if (typeof selector === 'string') {
            return document.querySelector(selector) !== null;
        }
        return selector !== null && selector !== undefined;
    }
    
    /**
     * Safely get an element, returns null if it doesn't exist
     * @param {string} selector - CSS selector
     * @return {Element|null} The element or null
     */
    function getElement(selector) {
        return document.querySelector(selector);
    }
    
    /**
     * Safely add event listener to an element
     * @param {string|Element} selector - CSS selector or DOM element
     * @param {string} event - Event name
     * @param {Function} callback - Event handler
     */
    function addSafeEventListener(selector, event, callback) {
        const element = typeof selector === 'string' ? getElement(selector) : selector;
        if (element) {
            element.addEventListener(event, callback);
        }
    }
    
    // ==========================================
    // MOBILE MENU
    // ==========================================
    
    // Initialize mobile menu accessibility attributes
    const menuToggle = getElement('.menu-toggle');
    const navMenu = getElement('nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        navMenu.setAttribute('aria-hidden', 'true');
    }
    
    // Make toggleMenu function available globally
    window.toggleMenu = function() {
        if (menuToggle && navMenu) {
            const isExpanded = navMenu.classList.contains('show-menu');
            navMenu.classList.toggle('show-menu');
            
            // Update ARIA attributes
            menuToggle.setAttribute('aria-expanded', (!isExpanded).toString());
            navMenu.setAttribute('aria-hidden', isExpanded.toString());
        }
    };
    
    // ==========================================
    // LIGHTBOX FUNCTIONALITY
    // ==========================================
    
    /**
     * Opens a lightbox with the specified image
     * @param {Element} imageElement - The image element to display
     */
    window.openLightbox = function(imageElement) {
        // Determine which lightbox to use based on context
        const isCarousel = imageElement.closest('.carousel-track') !== null;
        const lightboxId = isCarousel ? 'carousel-lightbox' : 'lightbox';
        const lightboxImgId = isCarousel ? 'carousel-lightbox-image' : 'lightbox-image';
        
        const lightbox = getElement(`#${lightboxId}`);
        const lightboxImage = getElement(`#${lightboxImgId}`);
        
        if (!lightbox || !lightboxImage) return;
        
        // Use data-large-src if available, otherwise use the current src
        const largeSrc = imageElement.getAttribute('data-large-src') || imageElement.src;
        lightboxImage.src = largeSrc;
        lightboxImage.alt = imageElement.alt || 'Enlarged image'; // Preserve alt text
        
        // Show the lightbox
        lightbox.style.display = 'flex';
        
        // Pause carousel animation if applicable
        if (isCarousel) {
            const carouselTrack = getElement('.carousel-track');
            if (carouselTrack) {
                carouselTrack.style.animationPlayState = 'paused';
            }
        }
        
        // Set focus on the close button for accessibility
        const closeButton = lightbox.querySelector('.close-lightbox');
        if (closeButton) {
            closeButton.focus();
        }
    };
    
    /**
     * Closes any active lightbox
     */
    window.closeLightbox = function() {
        // Close both possible lightboxes
        const lightboxes = document.querySelectorAll('.lightbox');
        lightboxes.forEach(lightbox => {
            lightbox.style.display = 'none';
        });
        
        // Resume carousel animation if it exists
        const carouselTrack = getElement('.carousel-track');
        if (carouselTrack) {
            carouselTrack.style.animationPlayState = 'running';
        }
    };
    
    // Set up lightbox click events for all applicable images
    const setupLightboxImages = () => {
        // For gallery images
        document.querySelectorAll('.pool-item img, .carousel-track img').forEach(img => {
            img.addEventListener('click', () => openLightbox(img));
        });
        
        // For lightbox closing
        document.querySelectorAll('.close-lightbox').forEach(closeBtn => {
            closeBtn.addEventListener('click', closeLightbox);
        });
        
        // Close when clicking outside the image
        document.querySelectorAll('.lightbox').forEach(lightbox => {
            lightbox.addEventListener('click', event => {
                if (event.target === lightbox) {
                    closeLightbox();
                }
            });
        });
    };
    
    setupLightboxImages();
    
    // Add keyboard support for lightbox
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeLightbox();
        }
    });
    
    // ==========================================
    // CONTACT FORM
    // ==========================================
    
    const contactForm = getElement('#contactForm');
    
    if (contactForm) {
        // Add CSS for form validation
        const style = document.createElement('style');
        style.textContent = `
            .error {
                border: 2px solid #ff3860 !important;
                background-color: rgba(255, 56, 96, 0.1);
            }
            .form-message.success {
                color: #48c774;
                background-color: rgba(72, 199, 116, 0.1);
                padding: 10px;
                border-radius: 4px;
                margin-top: 15px;
            }
            .form-message.error {
                color: #ff3860;
                background-color: rgba(255, 56, 96, 0.1);
                padding: 10px;
                border-radius: 4px;
                margin-top: 15px;
            }
        `;
        document.head.appendChild(style);
        
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form fields
            const name = getElement('#name');
            const email = getElement('#email');
            const message = getElement('#message');
            const formMessage = getElement('#formMessage');
            
            // Clear previous errors
            document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
            
            // Validate each field
            let hasErrors = false;
            
            if (!name || name.value.trim() === '') {
                name.classList.add('error');
                hasErrors = true;
            }
            
            if (!email || email.value.trim() === '') {
                email.classList.add('error');
                hasErrors = true;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                email.classList.add('error');
                hasErrors = true;
            }
            
            if (!message || message.value.trim() === '') {
                message.classList.add('error');
                hasErrors = true;
            }
            
            if (hasErrors) {
                if (formMessage) {
                    formMessage.className = 'form-message error';
                    formMessage.style.display = 'block';
                    formMessage.textContent = 'Please correct the highlighted fields before submitting.';
                }
                return;
            }
            
            // Form is valid - would normally send data to server here
            // For demo purposes, just show success message
            if (formMessage) {
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                formMessage.textContent = 'Thank you! Your message has been sent.';
            }
            
            contactForm.reset();
        });
    }
    
    // ==========================================
    // SECTION ANIMATIONS
    // ==========================================
    
    // Use Intersection Observer for scroll animations if supported
    const setupSectionAnimations = () => {
        if ('IntersectionObserver' in window) {
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        sectionObserver.unobserve(entry.target); // Stop observing once visible
                    }
                });
            }, { rootMargin: '0px 0px -100px 0px' });
            
            document.querySelectorAll('section').forEach(section => {
                sectionObserver.observe(section);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            const revealSections = () => {
                document.querySelectorAll('section').forEach(section => {
                    const sectionTop = section.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (sectionTop < windowHeight - 100) {
                        section.classList.add('visible');
                    }
                });
            };
            
            // Run once on page load
            revealSections();
            
            // Add scroll listener with debounce
            let scrollTimeout;
            window.addEventListener('scroll', () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(revealSections, 100);
            });
        }
    };
    
    setupSectionAnimations();
    
    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================
    
    const backToTopButton = getElement('#backToTop');
    
    if (backToTopButton) {
        // Initially hide the button
        backToTopButton.style.display = 'none';
        
        /**
         * Smooth scroll to top of page
         */
        const smoothScrollToTop = () => {
            // Use native smooth scrolling if supported
            if ('scrollBehavior' in document.documentElement.style) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // Fallback for browsers without smooth scrolling
                const scrollStep = -window.scrollY / 15;
                const scrollInterval = setInterval(() => {
                    if (window.scrollY !== 0) {
                        window.scrollBy(0, scrollStep);
                    } else {
                        clearInterval(scrollInterval);
                    }
                }, 15);
            }
        };
        
        // Show/hide button based on scroll position
        const toggleBackToTopButton = () => {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        };
        
        // Add scroll event listener
        window.addEventListener('scroll', toggleBackToTopButton);
        
        // Add click event to button
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScrollToTop();
        });
    }
    
    // ==========================================
    // PAGE TRANSITIONS
    // ==========================================
    
    // Add smooth transitions between pages
    const setupPageTransitions = () => {
        document.querySelectorAll('a').forEach(link => {
            // Only apply to internal links to other pages
            if (link.hostname === window.location.hostname && 
                link.pathname !== window.location.pathname && 
                !link.hash && // Skip hash links (anchors)
                !link.hasAttribute('target')) { // Skip links with target attribute
                
                link.addEventListener('click', (e) => {
                    const destination = link.href;
                    
                    // Don't intercept if user is holding modifier keys
                    if (e.ctrlKey || e.metaKey || e.shiftKey) return;
                    
                    e.preventDefault();
                    document.body.style.opacity = '0';
                    
                    setTimeout(() => {
                        window.location.href = destination;
                    }, 300); // Match the fade-out animation duration
                });
            }
        });
    };
    
    setupPageTransitions();
});