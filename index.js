// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Toggle hobby details - Updated
function toggleContent(button) {
    const content = button.nextElementSibling;
    const isVisible = content.classList.toggle('active');

    // Update button text based on visibility
    button.textContent = isVisible ? 'Ẩn' : 'Chi tiết';

    // Optional: Scroll to the content if it's revealed
    if (isVisible) {
        content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Smooth scroll (Kept original logic)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Adjust scroll position to account for the fixed header
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // For mobile, close menu after clicking
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// --- Animate Progress Bars on Scroll ---

// Function to animate progress bars
function animateProgressBars(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressFills = entry.target.querySelectorAll('.progress-fill');
            progressFills.forEach(fill => {
                const percent = fill.parentElement.nextElementSibling.textContent;
                // Set the width based on the percentage from HTML
                fill.style.width = percent; 
            });
            // Stop observing once the animation is done
            observer.unobserve(entry.target);
        }
    });
}

// Intersection Observer for Skills section
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver(animateProgressBars, {
        threshold: 0.5 // Trigger when 50% of the section is visible
    });
    skillsObserver.observe(skillsSection);
}


// Animate sections on scroll (Kept original logic and updated it slightly)
const sectionObserverOptions = {
    threshold: 0.3 // Trigger when 30% of the section is visible
};

const sectionObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // You can add a class here for custom section-fade-in animation if needed
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, sectionObserverOptions);

// Initialize a base style for all sections for the animation to work
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    sectionObserver.observe(section);
});

// Contact Form Submission (Basic Alert)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Cảm ơn bạn đã liên hệ! Thông tin của bạn đã được gửi thành công.');
        this.reset(); // Clear the form after submission
    });
}