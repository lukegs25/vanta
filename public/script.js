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

// Hide navbar on scroll down, show on scroll up
(() => {
    let lastScrollY = window.pageYOffset;
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const SCROLL_DELTA = 8; // minimum movement to toggle
    const TOP_GUARD = 40;   // always show near top

    function onScroll() {
        const currentY = window.pageYOffset;
        const diff = currentY - lastScrollY;

        if (Math.abs(diff) > SCROLL_DELTA) {
            if (diff > 0 && currentY > TOP_GUARD) {
                navbar.classList.add('navbar--hidden');
            } else {
                navbar.classList.remove('navbar--hidden');
            }
            lastScrollY = currentY;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
})();

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Get form data for validation
        const name = this.querySelector('input[name="name"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const message = this.querySelector('textarea[name="message"]').value;
        
        // Simple validation
        if (!name || !email || !message) {
            e.preventDefault();
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            e.preventDefault();
            alert('Please enter a valid email address');
            return;
        }
        
        // Show sending state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Let Formspree handle the actual submission
        // The form will redirect to Formspree's thank you page
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
    
    // Keep VANTA title static (no scroll-based opacity changes)
    if (heroTitle) {
        heroTitle.style.setProperty('opacity', 1, 'important');
    }
});

// Apple Cards Carousel Implementation
class AppleCardsCarousel {
    constructor(container, items) {
        this.container = container;
        this.items = items;
        this.currentIndex = 0;
        this.canScrollLeft = false;
        this.canScrollRight = true;
        this.init();
    }

    init() {
        this.createHTML();
        this.attachEventListeners();
        this.checkScrollability();
    }

    createHTML() {
        const carouselHTML = `
            <div class="apple-carousel-wrapper">
                <div class="apple-carousel-scroll" id="carousel-scroll">
                    <div class="apple-carousel-content">
                        ${this.items.map((item, index) => this.createCard(item, index)).join('')}
                    </div>
                </div>
                <div class="apple-carousel-controls">
                    <button class="carousel-btn carousel-btn-left" id="scroll-left" disabled>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M15 18l-6-6 6-6"/>
                        </svg>
                    </button>
                    <button class="carousel-btn carousel-btn-right" id="scroll-right">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        this.container.innerHTML = carouselHTML;
    }

    createCard(item, index) {
        const isVideo = item.src.endsWith('.mp4') || item.src.endsWith('.mov');
        const mediaElement = isVideo 
            ? `<video class="card-media" autoplay muted loop><source src="${item.src}" type="video/mp4"></video>`
            : `<img class="card-media" src="${item.src}" alt="">`;

        return `
            <div class="apple-card" style="animation-delay: ${index * 0.2}s">
                <div class="card-content">
                    ${mediaElement}
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const scrollContainer = document.getElementById('carousel-scroll');
        const leftBtn = document.getElementById('scroll-left');
        const rightBtn = document.getElementById('scroll-right');

        leftBtn.addEventListener('click', () => this.scrollLeft());
        rightBtn.addEventListener('click', () => this.scrollRight());
        scrollContainer.addEventListener('scroll', () => this.checkScrollability());
    }

    scrollLeft() {
        const container = document.getElementById('carousel-scroll');
        container.scrollBy({ left: -300, behavior: 'smooth' });
    }

    scrollRight() {
        const container = document.getElementById('carousel-scroll');
        container.scrollBy({ left: 300, behavior: 'smooth' });
    }

    checkScrollability() {
        const container = document.getElementById('carousel-scroll');
        const leftBtn = document.getElementById('scroll-left');
        const rightBtn = document.getElementById('scroll-right');

        if (container) {
            const { scrollLeft, scrollWidth, clientWidth } = container;
            this.canScrollLeft = scrollLeft > 0;
            this.canScrollRight = scrollLeft < scrollWidth - clientWidth;

            leftBtn.disabled = !this.canScrollLeft;
            rightBtn.disabled = !this.canScrollRight;
        }
    }
}

// Initialize Apple Cards Carousel with our work data
function initializeAppleCarousel() {
    const workData = [
        {
            src: "public/our work/Flower Power Draft.png",
            title: "Flower Power",
            category: "Creative Design",
            content: "Vibrant floral-inspired design bringing nature's beauty into modern branding."
        },
        {
            src: "public/our work/Strawberries and Cream .mp4",
            title: "Strawberries and Cream",
            category: "Video Production",
            content: "Delicious visual storytelling showcasing premium ingredients with cinematic quality."
        },
        {
            src: "public/our work/St Pattys Version of their Ad.mov",
            title: "St. Patrick's Day Campaign",
            category: "Video Production", 
            content: "Festive seasonal advertising campaign with engaging motion graphics and storytelling."
        },
        {
            src: "public/our work/Homesick Hawaii.png",
            title: "Homesick Hawaii",
            category: "Brand Design",
            content: "Tropical-inspired branding capturing the essence of island paradise with modern design elements."
        },
        {
            src: "public/our work/Homesick California.png", 
            title: "Homesick California",
            category: "Brand Design",
            content: "California dreaming brought to life through vibrant colors and contemporary aesthetics."
        },
        {
            src: "public/our work/Homesick Utah.png",
            title: "Homesick Utah",
            category: "Brand Design", 
            content: "Mountain-inspired design reflecting the natural beauty and rugged landscapes of Utah."
        },
        {
            src: "public/our work/Linens and Surf.jpg",
            title: "Linens and Surf",
            category: "Photography",
            content: "Lifestyle photography capturing the perfect blend of comfort and coastal living."
        },
        {
            src: "public/our work/Ochre Heart Scent Draft.png",
            title: "Ochre Heart Scent",
            category: "Product Design",
            content: "Sophisticated fragrance branding with earthy tones and elegant typography."
        },
        {
            src: "public/our work/Pura Pantone Poster.png",
            title: "Pura Pantone Collection",
            category: "Print Design",
            content: "Bold color exploration showcasing the power of Pantone in modern design applications."
        },
        {
            src: "public/our work/Scent the Halls Final.png",
            title: "Scent the Halls",
            category: "Holiday Campaign",
            content: "Festive holiday branding combining seasonal warmth with contemporary design elements."
        }
    ];

    const container = document.getElementById('apple-carousel-container');
    if (container) {
        console.log('Initializing Apple Cards Carousel...');
        new AppleCardsCarousel(container, workData);
        console.log('Apple Cards Carousel initialized successfully');
    } else {
        console.error('Apple carousel container not found!');
    }
}

// Enhanced video loading and autoplay handling
document.addEventListener('DOMContentLoaded', () => {
    // Ensure global video background plays immediately
    const globalVideo = document.querySelector('.global-video-bg');
    if (globalVideo) {
        console.log('Global video element found, initializing...');
        
        // Set video attributes for mobile compatibility
        globalVideo.setAttribute('playsinline', 'true');
        globalVideo.setAttribute('webkit-playsinline', 'true');
        globalVideo.setAttribute('muted', 'true');
        globalVideo.setAttribute('loop', 'true');
        globalVideo.setAttribute('autoplay', 'true');
        
        // Set video to visible immediately
        globalVideo.style.opacity = '1';
        globalVideo.style.visibility = 'visible';
        globalVideo.style.display = 'block';
        
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
    
    // Initialize cursor pixel trail
    initCursorPixelTrail();
    
    // Initialize Apple Cards Carousel
    initializeAppleCarousel();
});

// Cursor Pixel Trail functionality
function initCursorPixelTrail() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    canvas.style.background = 'transparent';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId = null;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const config = {
        color: '#ffffff',
        minSize: 2,
        maxSize: 4,
        lifeMs: 500,
        speed: 0.25,
        spawnPerMove: 3,
        maxParticles: 600
    };

    function addParticles(x, y) {
        const now = performance.now();
        for (let i = 0; i < config.spawnPerMove; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = config.speed * (0.5 + Math.random());
            const size = config.minSize + Math.random() * (config.maxSize - config.minSize);
            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: size,
                startTime: now
            });
        }
        if (particles.length > config.maxParticles) {
            particles.splice(0, particles.length - config.maxParticles);
        }
        if (!animationId) {
            animationId = requestAnimationFrame(animate);
        }
    }

    function animate(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles = particles.filter(p => {
            const elapsed = timestamp - p.startTime;
            if (elapsed >= config.lifeMs) return false;
            const t = elapsed / config.lifeMs;
            p.x += p.vx;
            p.y += p.vy;
            const alpha = 1 - t;
            ctx.fillStyle = `rgba(255,255,255,${alpha})`;
            ctx.fillRect(p.x, p.y, p.size, p.size);
            return true;
        });
        if (particles.length > 0) {
            animationId = requestAnimationFrame(animate);
        } else {
            animationId = null;
        }
    }

    const handleMove = (e) => {
        addParticles(e.clientX, e.clientY);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches.length > 0) {
            const t = e.touches[0];
            addParticles(t.clientX, t.clientY);
        }
    }, { passive: true });
}



