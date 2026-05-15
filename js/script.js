javascript
// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Toggle mobile menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    });
});

// Active link highlighting on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');
        if (href && href.slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Typed.js Animation
document.addEventListener('DOMContentLoaded', function() {
    if (typeof Typed !== 'undefined') {
        var typed = new Typed('.typed', {
            strings: [
                'Software Development',
                'Artificial Intelligence',
                'Full Stack Development',
                'Problem Solving',
                'Voice Technologies',
                'FinTech Solutions',
                'DSA & System Design'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#' && href !== '#0') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } catch (error) {
            alert('Sorry, there was an error sending your message. Please try again.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Scroll reveal animation
const revealElements = document.querySelectorAll('.skill-category, .project-card, .info-card, .coding-card, .featured-project');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for reveal elements
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition < 600) {
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });
}

// Dynamic year in footer
document.addEventListener('DOMContentLoaded', () => {
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2024', currentYear);
    }
});

// Add copy email functionality
const emailElement = document.querySelector('.contact-item a[href^="mailto"]');
if (emailElement) {
    emailElement.addEventListener('click', (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(emailElement.textContent).then(() => {
            // Show temporary tooltip
            const tooltip = document.createElement('div');
            tooltip.textContent = 'Email copied to clipboard!';
            tooltip.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--primary-color);
                color: white;
                padding: 1rem;
                border-radius: 10px;
                z-index: 1000;
                animation: slideIn 0.3s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.remove();
            }, 2000);
        });
    });
}

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ===== QR CODE INTERACTIONS - ENHANCED =====

// QR Code hover effect enhancement
document.querySelectorAll('.qr-container').forEach(container => {
    container.addEventListener('mouseenter', () => {
        const qrImage = container.querySelector('.project-qr');
        const qrLabel = container.querySelector('.qr-label');
        
        if (qrImage) {
            qrImage.style.transform = 'scale(1.1) rotate(2deg)';
            qrImage.style.transition = 'transform 0.4s ease';
        }
        
        if (qrLabel) {
            qrLabel.style.backgroundColor = 'var(--primary-color)';
            qrLabel.style.color = 'white';
            qrLabel.style.transition = 'all 0.3s ease';
        }
    });
    
    container.addEventListener('mouseleave', () => {
        const qrImage = container.querySelector('.project-qr');
        const qrLabel = container.querySelector('.qr-label');
        
        if (qrImage) {
            qrImage.style.transform = 'scale(1) rotate(0)';
        }
        
        if (qrLabel) {
            qrLabel.style.backgroundColor = 'white';
            qrLabel.style.color = '#333';
        }
    });
});

// QR Code click to enlarge
document.querySelectorAll('.project-qr').forEach(qr => {
    qr.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Check if modal already exists
        if (document.querySelector('.qr-modal')) return;
        
        // Create modal for enlarged QR
        const modal = document.createElement('div');
        modal.className = 'qr-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;
        
        const enlargedImg = document.createElement('img');
        enlargedImg.src = this.src;
        enlargedImg.alt = "Enlarged QR Code";
        enlargedImg.style.cssText = `
            max-width: 80%;
            max-height: 80%;
            border-radius: 20px;
            box-shadow: 0 0 40px rgba(74, 108, 247, 0.5);
            animation: scaleIn 0.3s ease;
            cursor: default;
        `;
        
        const closeBtn = document.createElement('div');
        closeBtn.innerHTML = '✕';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 30px;
            color: white;
            font-size: 40px;
            cursor: pointer;
            font-weight: bold;
            transition: transform 0.3s;
            z-index: 10001;
        `;
        closeBtn.onmouseenter = () => closeBtn.style.transform = 'scale(1.2)';
        closeBtn.onmouseleave = () => closeBtn.style.transform = 'scale(1)';
        
        const scanText = document.createElement('div');
        scanText.innerHTML = '📱 Scan with your phone camera';
        scanText.style.cssText = `
            position: absolute;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-size: 16px;
            background: rgba(74, 108, 247, 0.9);
            padding: 10px 24px;
            border-radius: 40px;
            font-weight: 500;
        `;
        
        modal.appendChild(enlargedImg);
        modal.appendChild(closeBtn);
        modal.appendChild(scanText);
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Close modal when clicking background
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                document.body.style.overflow = '';
            }
        });
        
        // Close with close button
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            modal.remove();
            document.body.style.overflow = '';
        });
        
        // Close with Escape key
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.body.style.overflow = '';
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    });
});

// Add animation for enlarged QR
const qrAnimationStyle = document.createElement('style');
qrAnimationStyle.textContent = `
    @keyframes scaleIn {
        from                                        { transform: scale(0.5); opacity: 0; }
        to                                          { transform: scale(1); opacity: 1; }
    }
`;
document.head.appendChild(qrAnimationStyle);

// Add tooltip for QR code
document.querySelectorAll('.qr-container').forEach(container => {
    const tooltip = document.createElement('div');
    tooltip.className = 'qr-tooltip';
    tooltip.textContent = '🔍 Click to enlarge • 📱 Scan with phone';
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0,0,0,0.85);
        color: white;
        padding: 6px 12px;
        border-radius: 8px;
        font-size: 12px;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s;
        z-index: 100;
        white-space: nowrap;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 8px;
    `;
    
    container.style.position = 'relative';
    container.appendChild(tooltip);
    
    container.addEventListener('mouseenter', () => {
        tooltip.style.opacity = '1';
    });
    
    container.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
    });
});

// ===== DSA-FORGE SPECIFIC INTERACTIONS =====

// Add hover effect for DSA-Forge featured project
const dsaForgeCard = document.querySelector('.featured-project:first-child');
if (dsaForgeCard && dsaForgeCard.querySelector('.dsa-forge-badge')) {
    dsaForgeCard.addEventListener('mouseenter', () => {
        dsaForgeCard.style.transform = 'translateY(-5px)';
        dsaForgeCard.style.transition = 'transform 0.3s ease';
    });
    
    dsaForgeCard.addEventListener('mouseleave', () => {
        dsaForgeCard.style.transform = 'translateY(0)';
    });
}

// DSA-Forge link click tracking
const dsaForgeLinks = document.querySelectorAll('a[href*="dsa-forge.com"]');
dsaForgeLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        console.log('DSA-Forge platform link clicked:', link.href);
        // You can add analytics tracking here
    });
});

// ===== END OF DSA-FORGE INTERACTIONS =====

// ===== END OF QR CODE INTERACTIONS =====

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.project-icon i');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.project-icon i');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0)';
        }
    });
});

// Skills tag animation on hover
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.2s ease';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.animation = 'fadeIn 0.5s ease';
    });
});

// Add fade-in animation
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(fadeStyle);

// Prevent default behavior for empty links
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// Create scroll to top button
const createScrollTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.setAttribute('aria-label', 'Scroll to top');
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    
    // Hover effect
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px)';
        button.style.backgroundColor = '#3a5bd9';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.backgroundColor = 'var(--primary-color)';
    });
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// Initialize scroll to top button
createScrollTopButton();

// External link click logging
document.querySelectorAll('a[href^="http"], a[href^="https"]').forEach(link => {
    // Only for links that are not internal hash links
    if (!link.getAttribute('href').startsWith('#') && !link.getAttribute('href').startsWith('mailto:')) {
        link.addEventListener('click', (e) => {
            console.log('External link clicked:', link.href);
            // You can add analytics tracking here
        });
    }
});

// Initialize QR code features on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded with DSA-Forge and QR Code Generator projects!');
    
    // Check if QR images are loaded
    const qrImages = document.querySelectorAll('.project-qr');
    if (qrImages.length > 0) {
        console.log(`Found ${qrImages.length} QR code(s) in portfolio`);
    }
    
    // Check if DSA-Forge link exists
    const dsaForgeSite = document.querySelector('a[href*="dsa-forge.com"]');
    if (dsaForgeSite) {
        console.log('DSA-Forge project link is active:', dsaForgeSite.href);
    }
});

// Add keyboard shortcut for accessibility (Alt+Q focuses first QR code)
document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 'q') {
        e.preventDefault();
        const firstQr = document.querySelector('.qr-container');
        if (firstQr) {
            firstQr.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstQr.style.animation = 'qrPulse 0.5s 2';
            setTimeout(() => {
                firstQr.style.animation = '';
            }, 1000);
        }
    }
});

// Add console warning for missing images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
        console.warn('Image failed to load:', img.src);
        // Optionally set a fallback
        if (img.classList.contains('project-qr')) {
            img.src = 'https://placehold.co/120x120/4a6cf7/white?text=QR';
        }
    });
});

// Smooth animation for section transitions
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});