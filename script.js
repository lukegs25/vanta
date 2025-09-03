// Video pause on end functionality
const introVideo = document.getElementById('introVideo');

if (introVideo) {
    introVideo.addEventListener('ended', () => {
        // Pause the video on the final frame
        introVideo.pause();
    });
}

// Language selector functionality
const languageSelector = document.querySelector('.language-selector');
const languages = document.querySelectorAll('.lang');

languages.forEach(lang => {
    lang.addEventListener('click', () => {
        // Remove active class from all languages
        languages.forEach(l => l.classList.remove('active'));
        // Add active class to clicked language
        lang.classList.add('active');
    });
});

// Navigation link state management
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Remove active class from all navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Smooth scroll to target section
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll-based navigation highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Offset for better detection
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.pageYOffset;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Remove active class from all navigation links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to corresponding navigation link
    if (currentSection) {
        const activeLink = document.querySelector(`.nav-link[href="#${currentSection}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// Add scroll event listener for navigation highlighting
window.addEventListener('scroll', updateActiveNavLink);

// Initialize active section on page load
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.work-card, .about-text, .contact-form');
    animatedElements.forEach(el => {
        // Skip elements that should maintain hover-based visibility
        if (el.classList.contains('hero-subtitle') || el.classList.contains('unseen-work')) {
            return;
        }
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });
    
    // Initialize particle system for about section
    console.log('DOM loaded, looking for about section...');
    const aboutSection = document.querySelector('.about');
    console.log('About section found:', aboutSection);
    
    if (aboutSection) {
        console.log('Creating particle container...');
        // Create a container for particles
        const particleContainer = document.createElement('div');
        particleContainer.style.position = 'absolute';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.pointerEvents = 'none';
        particleContainer.style.zIndex = '1';
        
        aboutSection.style.position = 'relative';
        aboutSection.appendChild(particleContainer);
        console.log('Particle container added to about section');
        
        // Initialize particle system
        console.log('Initializing particle system...');
        const particles = new ParticleSystem(particleContainer, {
            particleCount: 200,
            particleSpread: 15,
            speed: 0.05,
            particleColors: ["#ffffff", "#ff69b4", "#4a90e2", "#ffff00"],
            moveParticlesOnHover: true,
            particleHoverFactor: 3,
            alphaParticles: false,
            particleBaseSize: 8,
            sizeRandomness: 0.8,
            cameraDistance: 10,
            disableRotation: false
        });
        console.log('Particle system initialized');
        
        // Store reference for debugging
        window.debugParticles = particles;
    } else {
        console.log('About section not found!');
    }
});

// Button click effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Focus card effects for services section
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            // Add blur effect to all other cards
            serviceCards.forEach((otherCard, otherIndex) => {
                if (otherIndex !== index) {
                    otherCard.classList.add('focus-blur');
                } else {
                    otherCard.classList.add('focus-active');
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            // Remove all focus effects
            serviceCards.forEach((otherCard) => {
                otherCard.classList.remove('focus-blur', 'focus-active');
            });
        });
    });
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section and VANTA fade
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroTitle = document.querySelector('.hero-title');
    
    if (hero) {
        const rate = scrolled * -0.3;
        hero.style.transform = `translateY(${rate}px)`;
    }
    
    // Fade out VANTA text on scroll
    if (heroTitle) {
        const fadeStart = 0;
        const fadeEnd = 150; // Start fading after 150px of scroll (earlier fade)
        const opacity = Math.max(0, 1 - (scrolled - fadeStart) / (fadeEnd - fadeStart));
        heroTitle.style.setProperty('opacity', Math.max(0, opacity), 'important');
    }
});

// Enhanced video loading and autoplay handling
document.addEventListener('DOMContentLoaded', () => {
    // Ensure global video background plays immediately
    const globalVideo = document.querySelector('.global-video-bg');
    if (globalVideo) {
        console.log('Global video element found, initializing...');
        
        // Set video to visible immediately
        globalVideo.style.opacity = '1';
        
        // Multiple event listeners to ensure playback
        globalVideo.addEventListener('loadeddata', () => {
            console.log('Video data loaded, attempting to play...');
            globalVideo.play().catch(e => {
                console.log('Video autoplay failed:', e);
                // Fallback: show video element anyway
                globalVideo.style.opacity = '1';
            });
        });
        
        globalVideo.addEventListener('canplay', () => {
            console.log('Video can play, ensuring visibility...');
            globalVideo.style.opacity = '1';
            globalVideo.play().catch(e => {
                console.log('Video autoplay failed on canplay:', e);
            });
        });
        
        // Try to play immediately
        globalVideo.play().catch(e => {
            console.log('Initial video autoplay failed:', e);
            // Still show the video element
            globalVideo.style.opacity = '1';
        });
        
        // Force load the video
        globalVideo.load();
        
        // Add click handler to play video if autoplay is blocked
        let hasTriedUserInteraction = false;
        const playVideoOnUserInteraction = () => {
            if (!hasTriedUserInteraction && globalVideo.paused) {
                hasTriedUserInteraction = true;
                globalVideo.play().then(() => {
                    console.log('Video started playing after user interaction');
                }).catch(e => {
                    console.log('Video still failed to play after user interaction:', e);
                });
            }
        };
        
        // Listen for any user interaction to trigger video play
        document.addEventListener('click', playVideoOnUserInteraction, { once: true });
        document.addEventListener('touchstart', playVideoOnUserInteraction, { once: true });
        document.addEventListener('keydown', playVideoOnUserInteraction, { once: true });
    } else {
        console.log('Global video element not found!');
    }
});



