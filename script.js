// ===== Mobile Navigation Toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const hamburger = navToggle.querySelector('.hamburger');
    hamburger.style.transform = navMenu.classList.contains('active') 
        ? 'rotate(45deg)' 
        : 'rotate(0)';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const hamburger = navToggle.querySelector('.hamburger');
        hamburger.style.transform = 'rotate(0)';
    });
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Navbar Background on Scroll =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        navbar.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
    }
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .project-card, .about-item, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== Form Validation and Handling =====
const contactForm = document.getElementById('contactForm');
const formInputs = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    message: document.getElementById('message')
};

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation functions
function validateName(name) {
    if (name.trim().length < 2) {
        return 'Name must be at least 2 characters long';
    }
    if (name.trim().length > 50) {
        return 'Name must be less than 50 characters';
    }
    return '';
}

function validateEmail(email) {
    if (!email.trim()) {
        return 'Email is required';
    }
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return '';
}

function validateMessage(message) {
    if (message.trim().length < 10) {
        return 'Message must be at least 10 characters long';
    }
    if (message.trim().length > 1000) {
        return 'Message must be less than 1000 characters';
    }
    return '';
}

// Show error message
function showError(input, message) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    formGroup.classList.add('error');
    errorElement.textContent = message;
    
    input.addEventListener('input', () => {
        clearError(input);
    }, { once: true });
}

// Clear error message
function clearError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');
    
    formGroup.classList.remove('error');
    errorElement.textContent = '';
}

// Clear all errors
function clearAllErrors() {
    Object.values(formInputs).forEach(input => {
        clearError(input);
    });
}

// Real-time validation on blur
formInputs.name.addEventListener('blur', () => {
    const error = validateName(formInputs.name.value);
    if (error) {
        showError(formInputs.name, error);
    } else {
        clearError(formInputs.name);
    }
});

formInputs.email.addEventListener('blur', () => {
    const error = validateEmail(formInputs.email.value);
    if (error) {
        showError(formInputs.email, error);
    } else {
        clearError(formInputs.email);
    }
});

formInputs.message.addEventListener('blur', () => {
    const error = validateMessage(formInputs.message.value);
    if (error) {
        showError(formInputs.message, error);
    } else {
        clearError(formInputs.message);
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous errors
    clearAllErrors();
    
    // Validate all fields
    const nameError = validateName(formInputs.name.value);
    const emailError = validateEmail(formInputs.email.value);
    const messageError = validateMessage(formInputs.message.value);
    
    let hasError = false;
    
    if (nameError) {
        showError(formInputs.name, nameError);
        hasError = true;
    }
    
    if (emailError) {
        showError(formInputs.email, emailError);
        hasError = true;
    }
    
    if (messageError) {
        showError(formInputs.message, messageError);
        hasError = true;
    }
    
    // If validation passes
    if (!hasError) {
        const formStatus = document.querySelector('.form-status');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        // Disable submit button
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="btn-text">Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!';
            
            // Reset form
            contactForm.reset();
            
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.innerHTML = '<span class="btn-text">Send Message</span><i class="fas fa-paper-plane"></i>';
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }, 1500);
        
        // In a real application, you would send the data to a server:
        /*
        const formData = {
            name: formInputs.name.value,
            email: formInputs.email.value,
            message: formInputs.message.value
        };
        
        fetch('YOUR_API_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            // Handle success
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Thank you! Your message has been sent successfully.';
            contactForm.reset();
        })
        .catch(error => {
            // Handle error
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Sorry, something went wrong. Please try again later.';
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = '<span class="btn-text">Send Message</span><i class="fas fa-paper-plane"></i>';
        });
        */
    }
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// ===== Add loading animation to external links =====
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Add a visual indication that the link is being opened
        this.style.opacity = '0.7';
        setTimeout(() => {
            this.style.opacity = '1';
        }, 300);
    });
});

// ===== Handle keyboard navigation =====
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const hamburger = navToggle.querySelector('.hamburger');
        hamburger.style.transform = 'rotate(0)';
    }
});

// ===== Performance optimization: Lazy load images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Console message =====
console.log('%cWelcome to my portfolio! 👋', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cInterested in the code? Check out the repository on GitHub!', 'font-size: 14px; color: #6b7280;');

// ===== Set current year in footer =====
document.addEventListener('DOMContentLoaded', () => {
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});
