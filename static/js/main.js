console.log('Main JS loaded');

// GSAP Plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Smooth Scrolling
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        console.log('Navigating to:', targetId, target);
        if (target) {
            gsap.to(window, {
                scrollTo: { y: target, offsetY: 80 },
                duration: 0.8,
                ease: 'power2.out'
            });
        }
    });
});

// Handle URL Hash on Page Load
window.addEventListener('load', () => {
    console.log('Page loaded, checking hash:', window.location.hash);
    let targetId = window.location.hash ? window.location.hash.substring(1) : 'home';
    const target = document.getElementById(targetId);
    if (target) {
        gsap.to(window, {
            scrollTo: { y: target, offsetY: 80 },
            duration: 0.8,
            ease: 'power2.out'
        });
    } else {
        // Default to #home if no valid hash
        const homeTarget = document.getElementById('home');
        if (homeTarget) {
            gsap.to(window, {
                scrollTo: { y: homeTarget, offsetY: 80 },
                duration: 0.8,
                ease: 'power2.out'
            });
        }
    }
});

// Typing Animation
new Typed('#typed-text', {
    strings: ['Full-Stack Developer', 'UI/UX Enthusiast', 'AI Innovator'],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1000,
    loop: true
});

// Loading Animation
window.addEventListener('load', () => {
    gsap.to('#loader', {
        opacity: 0,
        duration: 0.5,
        onComplete: () => document.getElementById('loader').style.display = 'none'
    });
});

// Back to Top Button
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('hidden', window.scrollY < 500);
});
backToTop.addEventListener('click', () => {
    gsap.to(window, {
        scrollTo: { y: 0 },
        duration: 0.8,
        ease: 'power2.out'
    });
});

// Fade-in Animations
gsap.utils.toArray('.animate-fade-in').forEach((el) => {
    gsap.from(el, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Slide-up for Hero Text
gsap.from('.animate-slide-up', {
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: 'power2.out',
    delay: 0.5
});

// Project Filters
const projectFilters = document.querySelectorAll('.project-filter');
const projectCards = document.querySelectorAll('.project-card');
projectFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        const filterValue = filter.getAttribute('data-filter');
        console.log('Filtering projects by:', filterValue);
        projectFilters.forEach(f => {
            f.classList.remove('active');
            f.setAttribute('aria-selected', 'false');
        });
        filter.classList.add('active');
        filter.setAttribute('aria-selected', 'true');
        projectCards.forEach(card => {
            const tags = card.getAttribute('data-tags').split(',');
            card.classList.toggle('hidden', !(filterValue === 'all' || tags.includes(filterValue)));
        });
    });
});

// Project Modal
const projectModal = document.getElementById('project-modal');
const closeModal = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');
const modalTech = document.getElementById('modal-tech');
const modalGithub = document.getElementById('modal-github');
const modalDemo = document.getElementById('modal-demo');

// Project Data
const projectData = [
    {
        title: 'EmpManage',
        image: './static/images/empmanage.png',
        alt: 'EmpManage System',
        description: 'A scalable Employee Management System to streamline HR operations, featuring employee tracking, announcements, role-based access control, and real-time analytics. Built to enhance productivity and communication across organizations.',
        tech: ['Java', 'JSP', 'JavaScript', 'MySQL', 'Apache Tomcat'],
        github: 'https://github.com/PasinduSuraweera/EmpManage',
        demo: 'https://example.com'
    }
];

projectCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        const data = projectData[index];
        modalTitle.textContent = data.title;
        modalImage.src = data.image;
        modalImage.alt = data.alt;
        modalDescription.textContent = data.description;
        modalTech.innerHTML = data.tech.map(tech => `<li>${tech}</li>`).join('');
        modalGithub.href = data.github;
        modalDemo.href = data.demo;
        projectModal.classList.remove('hidden');
        projectModal.setAttribute('aria-hidden', 'false');
    });
});

closeModal.addEventListener('click', () => {
    projectModal.classList.add('hidden');
    projectModal.setAttribute('aria-hidden', 'true');
});

projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.add('hidden');
        projectModal.setAttribute('aria-hidden', 'true');
    }
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Particle Effect
function createParticles() {
    const canvas = document.createElement('canvas');
    document.getElementById('particles').appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            vx: Math.random() * 2 - 1,
            vy: Math.random() * 2 - 1
        });
    }
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
}
window.addEventListener('load', createParticles);

// Form Validation and AJAX Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Client-side validation
        if (!name || !email || !message) {
            alert('Please fill out all fields.');
            return;
        } else if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Prepare form data
        const formData = new FormData(contactForm);

        // Submit form via AJAX
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Clear form fields
                contactForm.reset();
                // Show success message
                alert('Message sent successfully!');
                // Scroll to Home section
                const homeTarget = document.getElementById('home');
                if (homeTarget) {
                    gsap.to(window, {
                        scrollTo: { y: homeTarget, offsetY: 80 },
                        duration: 0.8,
                        ease: 'power2.out'
                    });
                }
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            alert('Failed to send message. Please try again later.');
        });
    });
}