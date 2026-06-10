// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Enhanced animation observer for scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Animation classes are defined in CSS and will auto-trigger via keyframes
// No need to manually override element styles

// Add active state to nav links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = '0 ' + (window.pageYOffset * 0.5) + 'px';
    }
});

// Mouse hover animation for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const img = this.querySelector('.project-image svg');
        if (img) {
            img.style.animation = 'none';
            setTimeout(() => {
                img.style.animation = '';
            }, 50);
        }
    });
});

// Skill icons hover effect
document.querySelectorAll('.skill-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Animate skill bars when they scroll into view
document.addEventListener('DOMContentLoaded', () => {
    const bars = document.querySelectorAll('.skill-bar');
    if (!bars.length) return;
    bars.forEach(bar => { bar.style.width = '0%'; });

    const barObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const level = el.dataset.level || el.getAttribute('data-level') || 0;
                el.style.width = level + '%';
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.25 });

    bars.forEach(bar => barObserver.observe(bar));
});

