// ========== Particle System ==========
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// ========== Animated Counter ==========
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('en-US');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('en-US');
        }
    }, 16);
}

// ========== Intersection Observer for Animations ==========
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate stats counters
                if (entry.target.classList.contains('stat-item')) {
                    const valueElement = entry.target.querySelector('.stat-value');
                    const target = parseInt(valueElement.getAttribute('data-target'));
                    animateCounter(valueElement, target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe stat items
    document.querySelectorAll('.stat-item').forEach(item => {
        observer.observe(item);
    });

    // Observe section titles
    document.querySelectorAll('.reveal-text').forEach(text => {
        observer.observe(text);
        text.classList.add('revealed');
    });
}

// ========== Smooth Scroll ==========
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ========== Price Animation ==========
function animatePrice() {
    const priceElement = document.getElementById('price-counter');
    const targetPrice = 15000;
    animateCounter(priceElement, targetPrice, 3000);
}

// ========== Parallax Effect ==========
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.circle');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ========== Mouse Follow Effect ==========
function setupMouseFollow() {
    const cards = document.querySelectorAll('.feature-card, .why-us-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ========== Cursor Trail Effect ==========
function setupCursorTrail() {
    const coords = { x: 0, y: 0 };
    const circles = [];
    const colors = ['#345a9c', '#4a7bc8', '#5a8cd9'];
    
    for (let i = 0; i < 12; i++) {
        const circle = document.createElement('div');
        circle.style.position = 'fixed';
        circle.style.width = '20px';
        circle.style.height = '20px';
        circle.style.borderRadius = '50%';
        circle.style.backgroundColor = colors[i % colors.length];
        circle.style.opacity = '0';
        circle.style.pointerEvents = 'none';
        circle.style.zIndex = '9999';
        circle.style.transition = 'opacity 0.3s';
        document.body.appendChild(circle);
        circles.push(circle);
    }
    
    window.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });
    
    function animateCircles() {
        let x = coords.x;
        let y = coords.y;
        
        circles.forEach((circle, index) => {
            circle.style.left = x - 10 + 'px';
            circle.style.top = y - 10 + 'px';
            circle.style.transform = `scale(${(circles.length - index) / circles.length})`;
            circle.style.opacity = (circles.length - index) / circles.length * 0.3;
            
            const nextCircle = circles[index + 1] || circles[0];
            x += (parseInt(nextCircle.style.left || coords.x) - x) * 0.3;
            y += (parseInt(nextCircle.style.top || coords.y) - y) * 0.3;
        });
        
        requestAnimationFrame(animateCircles);
    }
    
    animateCircles();
}

// ========== Typing Effect for Title ==========
function setupTypingEffect() {
    const title = document.querySelector('.main-title');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    title.style.opacity = '1';
    
    let index = 0;
    const typingSpeed = 100;
    
    function type() {
        if (index < text.length) {
            title.textContent += text.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
        }
    }
    
    setTimeout(type, 1000);
}

// ========== Scroll Progress Bar ==========
function setupScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '4px';
    progressBar.style.background = 'linear-gradient(90deg, #345a9c, #4a7bc8)';
    progressBar.style.width = '0%';
    progressBar.style.zIndex = '10000';
    progressBar.style.transition = 'width 0.1s ease';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ========== Floating Animation for Logos ==========
function setupFloatingLogos() {
    const logos = document.querySelectorAll('.logo-wrapper');
    
    logos.forEach((logo, index) => {
        setInterval(() => {
            logo.style.transform = `translateY(${Math.sin(Date.now() / 1000 + index) * 10}px)`;
        }, 50);
    });
}

// ========== Button Ripple Effect ==========
function setupButtonRipple() {
    const button = document.querySelector('.cta-button');
    
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
    
    // Add ripple animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ========== Card Tilt Effect ==========
function setupCardTilt() {
    const cards = document.querySelectorAll('.contact-card, .price-tag');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ========== Glitch Effect on Hover ==========
function setupGlitchEffect() {
    const title = document.querySelector('.main-title');
    let glitchInterval;
    
    title.addEventListener('mouseenter', () => {
        const originalText = title.textContent;
        let iterations = 0;
        
        glitchInterval = setInterval(() => {
            title.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return String.fromCharCode(0x0600 + Math.random() * 100);
                })
                .join('');
            
            iterations += 1/3;
            
            if (iterations >= originalText.length) {
                clearInterval(glitchInterval);
                title.textContent = originalText;
            }
        }, 50);
    });
}

// ========== Background Music Visualizer (Optional) ==========
function setupVisualizer() {
    const circles = document.querySelectorAll('.circle');
    
    setInterval(() => {
        circles.forEach((circle, index) => {
            const scale = 1 + Math.random() * 0.2;
            const delay = index * 200;
            
            setTimeout(() => {
                circle.style.transform = `scale(${scale})`;
            }, delay);
        });
    }, 2000);
}

// ========== Initialize Everything ==========
document.addEventListener('DOMContentLoaded', () => {
    // Core features
    createParticles();
    setupIntersectionObserver();
    animatePrice();
    setupParallax();
    setupScrollProgress();
    
    // Enhanced interactions
    setupMouseFollow();
    setupButtonRipple();
    setupCardTilt();
    setupFloatingLogos();
    setupVisualizer();
    
    // Optional effects (comment out if too much)
    // setupCursorTrail();
    // setupTypingEffect();
    // setupGlitchEffect();
    
    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========== Performance Optimization ==========
// Debounce function for scroll events
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

// Optimize scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations here
}, 10));

// ========== Easter Egg: Konami Code ==========
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// ========== Console Message ==========
console.log('%c🎥 Donuts Media', 'font-size: 30px; font-weight: bold; color: #345a9c;');
console.log('%cنخلق محتوى.. يصنع الفرق', 'font-size: 16px; color: #4a7bc8;');
console.log('%cWebsite crafted with ❤️ for Apache Chicken', 'font-size: 12px; color: #666;');

