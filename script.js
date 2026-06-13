/**
 * Professional CSE-AIDS Portfolio - Main Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Current Year in Footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Cache-buster for Resume PDF (forces browser to load the latest version)
    const resumeLinks = document.querySelectorAll('a[href^="assets/resume.pdf"]');
    resumeLinks.forEach(link => {
        link.href = `assets/resume.pdf?v=${new Date().getTime()}`;
    });

    // 2. Mobile Nav Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileNavToggle.addEventListener('click', () => {
        mobileNavToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on nav link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileNavToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 3. Typewriter Effect
    class Typewriter {
        constructor(txtElement, words, wait = 3000) {
            this.txtElement = txtElement;
            this.words = words;
            this.txt = '';
            this.wordIndex = 0;
            this.wait = parseInt(wait, 10);
            this.type();
            this.isDeleting = false;
        }

        type() {
            const current = this.wordIndex % this.words.length;
            const fullTxt = this.words[current];

            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            this.txtElement.innerHTML = `<span class="txt">${this.txt}</span><span class="cursor">|</span>`;

            let typeSpeed = 100;
            if (this.isDeleting) {
                typeSpeed /= 2;
            }

            if (!this.isDeleting && this.txt === fullTxt) {
                typeSpeed = this.wait;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.wordIndex++;
                typeSpeed = 500;
            }

            setTimeout(() => this.type(), typeSpeed);
        }
    }

    const typewriterEl = document.querySelector('.typewriter');
    if (typewriterEl) {
        const words = JSON.parse(typewriterEl.getAttribute('data-words'));
        new Typewriter(typewriterEl, words);
    }

    // 4. Hero Section Canvas Animation (Neural Network / Particles)
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const maxParticles = 65;

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse position
    let mouse = {
        x: null,
        y: null,
        radius: 150
    };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.size = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

            // Mouse interaction (push away slightly)
            if (mouse.x != null && mouse.y != null) {
                let dx = this.x - mouse.x;
                let dy = this.y - mouse.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    let force = (mouse.radius - distance) / mouse.radius;
                    let angle = Math.atan2(dy, dx);
                    this.x += Math.cos(angle) * force * 2;
                    this.y += Math.sin(angle) * force * 2;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = '#0055ff';
            ctx.fill();
        }
    }

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
        particlesArray.push(new Particle());
    }

    // Connect particles with lines
    function connectParticles() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 110) {
                    let opacity = (1 - (distance / 110)) * 0.15;
                    ctx.strokeStyle = `rgba(0, 85, 255, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // 5. Skills Progress Bar Fill on Scroll (Intersection Observer)
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-bar');

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }

    // 6. Projects Filtering Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const projectCards = document.querySelectorAll('.project-card');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked tab
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    // Retrigger fading entry animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 7. Interactive Linear Regression Playpen
    const regCanvas = document.getElementById('regression-canvas');
    const regCtx = regCanvas.getContext('2d');
    const equationEl = document.getElementById('regression-equation');
    const r2El = document.getElementById('regression-r2');
    const countEl = document.getElementById('regression-count');
    const clearBtn = document.getElementById('clear-regression');
    const noiseBtn = document.getElementById('add-noise');

    let points = []; // Array of objects {x, y} relative to canvas size

    // Function to resize/fit canvas to container
    function fitRegressionCanvas() {
        const container = regCanvas.parentElement;
        regCanvas.width = container.clientWidth;
        regCanvas.height = container.clientHeight;
        drawRegression();
    }
    
    // Fit canvas on load and window resize
    window.addEventListener('resize', fitRegressionCanvas);
    fitRegressionCanvas();

    // Click canvas to plot point
    regCanvas.addEventListener('click', (e) => {
        const rect = regCanvas.getBoundingClientRect();
        // Calculate coordinates relative to canvas
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        points.push({ x, y });
        updateRegressionStats();
        drawRegression();
    });

    // Linear Regression using Ordinary Least Squares (OLS)
    function calculateRegression() {
        const n = points.length;
        if (n < 2) return null;

        let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
        for (let i = 0; i < n; i++) {
            sumX += points[i].x;
            sumY += points[i].y;
            sumXY += points[i].x * points[i].y;
            sumX2 += points[i].x * points[i].x;
        }

        const denominator = (n * sumX2) - (sumX * sumX);
        if (denominator === 0) return null; // Avoid division by zero

        // Slope (m) and Intercept (c)
        const slope = ((n * sumXY) - (sumX * sumY)) / denominator;
        const intercept = (sumY - (slope * sumX)) / n;

        // Calculate R2 Score
        const meanY = sumY / n;
        let ssTot = 0;
        let ssRes = 0;
        for (let i = 0; i < n; i++) {
            const yPred = (slope * points[i].x) + intercept;
            ssTot += Math.pow(points[i].y - meanY, 2);
            ssRes += Math.pow(points[i].y - yPred, 2);
        }

        const r2 = ssTot === 0 ? 0 : 1 - (ssRes / ssTot);

        return { slope, intercept, r2 };
    }

    function updateRegressionStats() {
        countEl.textContent = points.length;
        
        if (points.length < 2) {
            equationEl.textContent = 'y = 0.00x + 0.00';
            r2El.textContent = '0.00';
            return;
        }

        const model = calculateRegression();
        if (model) {
            // Note: Since Canvas Y-axis starts from top, we invert equations verbally or keep visual
            // For recruiters, let's represent slope in normal coordinate view: y = mx + c
            // Canvas Y starts at 0 (top) to H (bottom). To make math look standard, invert Y visual
            // slope_standard = -slope_canvas
            const standardSlope = -model.slope;
            const standardIntercept = regCanvas.height - model.intercept;
            
            equationEl.textContent = `y = ${standardSlope.toFixed(2)}x + ${standardIntercept.toFixed(1)}`;
            r2El.textContent = model.r2.toFixed(3);
        }
    }

    function drawRegression() {
        regCtx.clearRect(0, 0, regCanvas.width, regCanvas.height);
        
        // Draw grid lines
        regCtx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
        regCtx.lineWidth = 1;
        const gridSize = 40;
        for (let x = 0; x < regCanvas.width; x += gridSize) {
            regCtx.beginPath();
            regCtx.moveTo(x, 0);
            regCtx.lineTo(x, regCanvas.height);
            regCtx.stroke();
        }
        for (let y = 0; y < regCanvas.height; y += gridSize) {
            regCtx.beginPath();
            regCtx.moveTo(0, y);
            regCtx.lineTo(regCanvas.width, y);
            regCtx.stroke();
        }

        // Draw regression line if enough points
        if (points.length >= 2) {
            const model = calculateRegression();
            if (model) {
                regCtx.strokeStyle = '#0055ff';
                regCtx.lineWidth = 2.5;
                regCtx.shadowBlur = 10;
                regCtx.shadowColor = 'rgba(0, 85, 255, 0.5)';
                regCtx.beginPath();
                
                // Calculate endpoints of line spanning canvas width
                const x1 = 0;
                const y1 = model.intercept;
                const x2 = regCanvas.width;
                const y2 = (model.slope * regCanvas.width) + model.intercept;

                regCtx.moveTo(x1, y1);
                regCtx.lineTo(x2, y2);
                regCtx.stroke();
                
                // Clear shadow configuration
                regCtx.shadowBlur = 0;
            }
        }

        // Draw points
        for (let i = 0; i < points.length; i++) {
            regCtx.beginPath();
            regCtx.arc(points[i].x, points[i].y, 6, 0, Math.PI * 2);
            regCtx.fillStyle = '#00e5ff';
            regCtx.fill();
            regCtx.strokeStyle = '#ffffff';
            regCtx.lineWidth = 1.5;
            regCtx.stroke();
        }
    }

    // Clear Canvas Action
    clearBtn.addEventListener('click', () => {
        points = [];
        updateRegressionStats();
        drawRegression();
    });

    // Add Noise / Generate Sample Data Action
    noiseBtn.addEventListener('click', () => {
        points = [];
        const n = 15;
        const width = regCanvas.width;
        const height = regCanvas.height;
        
        // Define a true linear function (descending visually because Canvas Y is inverted)
        const trueSlope = 0.45;
        const trueIntercept = height * 0.2;

        for (let i = 0; i < n; i++) {
            // Distribute points along X
            const x = (width * 0.15) + (i * (width * 0.7) / (n - 1));
            // Add Gaussian-like random noise (range -40 to +40 pixels)
            const noise = (Math.random() - 0.5) * 60;
            const y = (trueSlope * x) + trueIntercept + noise;
            
            // Constrain within canvas height
            const constrainedY = Math.max(10, Math.min(height - 10, y));
            points.push({ x, y: constrainedY });
        }

        updateRegressionStats();
        drawRegression();
    });

    // Initialize with sample data on load
    setTimeout(() => {
        if (noiseBtn) noiseBtn.click();
    }, 500);

    // 8. Contact Form Client Validation & Simulation
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Please fill in all details.';
                return;
            }

            // Simple validation check
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Please enter a valid email address.';
                return;
            }

            // Submit using Web3Forms API
            formStatus.className = 'form-status';
            formStatus.textContent = 'Sending message...';

            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let jsonRes = await response.json();
                if (response.status == 200) {
                    formStatus.className = 'form-status success';
                    formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                    contactForm.reset();
                } else {
                    console.error(jsonRes);
                    formStatus.className = 'form-status error';
                    formStatus.textContent = jsonRes.message || 'Something went wrong. Please try again.';
                }
            })
            .catch(error => {
                console.error(error);
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Network error. Please try again later.';
            });
        });
    }

    // 9. Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - varHeaderHeightOffset(sectionHeight))) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    function varHeaderHeightOffset(height) {
        // Offset scroll calculation depending on active menu height
        const headerHeight = document.querySelector('.navbar').clientHeight;
        return headerHeight + (height * 0.25);
    }
});
