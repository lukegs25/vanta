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

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.3;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation for videos
document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('loadeddata', () => {
            video.style.opacity = '1';
        });
        
        video.style.opacity = '0';
        video.style.transition = 'opacity 0.5s ease-in';
    });
});



