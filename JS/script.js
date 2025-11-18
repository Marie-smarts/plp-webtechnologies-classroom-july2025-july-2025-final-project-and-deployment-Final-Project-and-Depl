// Global variables
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const indicators = document.querySelectorAll('.indicator');

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    initNav();
    initForms();
    addFadeInAnimations();
});

// Mobile Nav Toggle
function initNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Carousel Functions
function initCarousel() {
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    showSlide(currentSlide);
}

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        indicators[i].classList.remove('active');
    });
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

// Modal Functions
function openModal() {
    const modal = document.getElementById('booking-modal');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('booking-modal');
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('booking-modal');
    if (event.target === modal) {
        closeModal();
    }
});

// Form Validation and Submission
function initForms() {
    const bookingForm = document.getElementById('booking-form');
    const bookingFormPage = document.getElementById('booking-form-page');
    const contactForm = document.getElementById('contact-form');

    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
    if (bookingFormPage) {
        bookingFormPage.addEventListener('submit', handleBookingSubmit);
    }
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

function handleBookingSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    if (validateBookingForm(formData)) {
        showSpinner();
        // Simulate submission
        setTimeout(() => {
            hideSpinner();
            alert('Booking submitted successfully!');
            form.reset();
            closeModal();
        }, 2000);
    }
}

function handleContactSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    if (validateContactForm(formData)) {
        showSpinner();
        // Simulate submission
        setTimeout(() => {
            hideSpinner();
            alert('Message sent successfully!');
            form.reset();
        }, 2000);
    }
}

// Validation Functions
function validateBookingForm(formData) {
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const phone = formData.get('phone').trim();
    const checkin = formData.get('checkin');
    const checkout = formData.get('checkout');

    if (!name || !email || !phone || !checkin || !checkout) {
        alert('Please fill in all fields.');
        return false;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    if (!validatePhone(phone)) {
        alert('Please enter a valid phone number.');
        return false;
    }

    if (new Date(checkin) >= new Date(checkout)) {
        alert('Check-out date must be after check-in date.');
        return false;
    }

    return true;
}

function validateContactForm(formData) {
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();

    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return false;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    return true;
}

// Reusable Validation Functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone);
}

// Spinner Functions
function showSpinner() {
    const spinner = document.getElementById('loading-spinner');
    spinner.classList.remove('hidden');
}

function hideSpinner() {
    const spinner = document.getElementById('loading-spinner');
    spinner.classList.add('hidden');
}

// Add Fade-in Animations
function addFadeInAnimations() {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
}