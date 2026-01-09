/**
 * Portfolio Website - Main JavaScript
 * Handles navigation, contact form, animations, and interactions
 */

// ============================================
// DOM Content Loaded
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initContactForm();
    initScrollEffects();
    initBackToTop();
    initLazyLoading();
    initCurrentYear();
    initSmoothScroll();
});

// ============================================
// Navigation
// ============================================
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        });
    }
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('.section, .hero');
    const navItems = document.querySelectorAll('.nav-menu a');
    
    function updateActiveNav() {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
}

// ============================================
// Contact Form - EmailJS Configuration
// Sends to Nishant.it089@gmail.com
// ============================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (!contactForm) return;
    
    // Initialize EmailJS with your public key
    if (typeof emailjs !== 'undefined') {
        emailjs.init('tSLSXcGfuU3S3XDr4');
    }
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim() || 'Portfolio Contact Form',
            message: document.getElementById('message').value.trim()
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Disable submit button
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        try {
            // Check if EmailJS is loaded
            if (typeof emailjs === 'undefined') {
                throw new Error('EmailJS library not loaded');
            }
            
            // Send email using EmailJS
            const response = await emailjs.send(
                'service_7dunjfz',  // Your EmailJS Service ID
                'template_4sg47r9',  // Your EmailJS Template ID
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    to_email: 'Nishant.it089@gmail.com',
                    reply_to: formData.email
                }
            );
            
            // Success - Email sent
            if (response.status === 200) {
                showFormMessage('Thank you! Your message has been sent successfully. I will get back to you soon.', 'success');
                contactForm.reset();
            } else {
                throw new Error('Email sending failed');
            }
            
        } catch (error) {
            console.error('EmailJS error:', error);
            
            // Fallback to mailto if EmailJS fails
            const mailtoBody = `Name: ${formData.name}%0AEmail: ${formData.email}%0A%0AMessage:%0A${formData.message}`;
            const mailtoLink = `mailto:Nishant.it089@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${mailtoBody}`;
            
            showFormMessage('There was an error sending your message. Opening your email client as a backup option.', 'error');
            
            // Open mailto after a short delay
            setTimeout(() => {
                window.location.href = mailtoLink;
            }, 1000);
        } finally {
            // Re-enable submit button
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 2000);
        }
    });
    
    function showFormMessage(message, type) {
        if (!formMessage) return;
        
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.setAttribute('role', 'alert');
        formMessage.style.display = 'block';
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide message after 8 seconds for success, 5 seconds for error
        const timeout = type === 'success' ? 8000 : 5000;
        setTimeout(() => {
            formMessage.className = 'form-message';
            formMessage.textContent = '';
            formMessage.style.display = 'none';
        }, timeout);
    }
}

// ============================================
// Scroll Effects
// ============================================
function initScrollEffects() {
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const animateElements = document.querySelectorAll(
        '.section, .project-card, .skill-category, .certification-card, .achievement-card, .strength-card, .timeline-item'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// Back to Top Button
// ============================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Lazy Loading Images
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => img.classList.add('loaded'));
    }
}

// ============================================
// Current Year in Footer
// ============================================
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ============================================
// Smooth Scroll
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Performance: Debounce function
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// Performance: Throttle function
// ============================================
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// Error Handling
// ============================================
window.addEventListener('error', function(e) {
    console.error('Error:', e.error);
    // You can add error reporting here
});

// ============================================
// Console Message
// ============================================
console.log('%c👋 Hello! Welcome to Nishant\'s Portfolio', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cInterested in working together? Contact me at Nishant.it089@gmail.com', 'color: #6b7280; font-size: 14px;');