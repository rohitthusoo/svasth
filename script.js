// 3D Tilt Effect with Premium Glare and Performance
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
    const glare = document.createElement('div');
    glare.classList.add('glare');
    card.appendChild(glare);

    let isHovered = false;
    let localX = 0;
    let localY = 0;

    card.addEventListener('mouseenter', () => {
        isHovered = true;
        updateTilt();
    });

    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        localX = e.clientX - rect.left;
        localY = e.clientY - rect.top;
    });
    
    card.addEventListener('mouseleave', () => {
        isHovered = false;
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        glare.style.opacity = '0';
    });

    function updateTilt() {
        if (!isHovered) return;

        const rect = card.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((localY - centerY) / centerY) * -15; // enhanced to 15deg
        const rotateY = ((localX - centerX) / centerX) * 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        
        glare.style.opacity = '1';
        glare.style.left = `${localX}px`;
        glare.style.top = `${localY}px`;

        requestAnimationFrame(updateTilt);
    }
});

// Smooth Parallax Hero Shapes using requestAnimationFrame
let mouseGlobalX = window.innerWidth / 2;
let mouseGlobalY = window.innerHeight / 2;
let currentX = mouseGlobalX;
let currentY = mouseGlobalY;

document.addEventListener('mousemove', e => {
    mouseGlobalX = e.clientX;
    mouseGlobalY = e.clientY;
});

function animateParallax() {
    currentX += (mouseGlobalX - currentX) * 0.05;
    currentY += (mouseGlobalY - currentY) * 0.05;

    const normX = currentX / window.innerWidth;
    const normY = currentY / window.innerHeight;

    const shapes = document.querySelectorAll('.hero .floating-shape');
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 45; // Increased depth
        const x = (normX * speed) - (speed / 2);
        const y = (normY * speed) - (speed / 2);
        shape.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });

    requestAnimationFrame(animateParallax);
}
animateParallax();

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Animations with Intersection Observer
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => revealObserver.observe(el));

// Quotes Rotation
const quotes = [
    { text: "You have the right to work, but never to the fruit of work.", author: "Bhagavad Gita" },
    { text: "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.", author: "Bhagavad Gita" },
    { text: "The mind acts like an enemy for those who do not control it.", author: "Bhagavad Gita" },
    { text: "Reshape yourself through the power of your will; never let yourself be degraded by self-will.", author: "Bhagavad Gita" }
];

const quoteContainer = document.getElementById('quote-slides');
const dotsContainer = document.getElementById('quote-dots');
let currentQuote = 0;
let quoteInterval;

function initQuotes() {
    quotes.forEach((q, index) => {
        const slide = document.createElement('div');
        slide.className = `quote-slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `"${q.text}"<span class="quote-author">— ${q.author}</span>`;
        quoteContainer.appendChild(slide);

        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToQuote(index));
        dotsContainer.appendChild(dot);
    });
    startQuoteTimer();
}

function showQuote(index) {
    const slides = document.querySelectorAll('.quote-slide');
    const dots = document.querySelectorAll('.dot');
    
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentQuote = index;
}

function nextQuote() {
    let next = (currentQuote + 1) % quotes.length;
    showQuote(next);
}

function goToQuote(index) {
    clearInterval(quoteInterval);
    showQuote(index);
    startQuoteTimer();
}

function startQuoteTimer() {
    quoteInterval = setInterval(nextQuote, 4500);
}

// BMI Calculator Logic
document.getElementById('calculate-btn').addEventListener('click', calculateBMI);

function calculateBMI() {
    const weightInput = document.getElementById('bmi-weight').value;
    const heightInput = document.getElementById('bmi-height').value;
    const unit = document.getElementById('bmi-unit').value;
    
    const weight = parseFloat(weightInput);
    const heightCm = parseFloat(heightInput);
    
    if (isNaN(weight) || isNaN(heightCm) || weight <= 0 || heightCm <= 0) {
        alert("Please enter valid positive numbers for weight and height.");
        return;
    }

    let weightKg = weight;
    if (unit === 'lbs') {
        weightKg = weight * 0.453592;
    }

    const heightM = heightCm / 100;
    const bmi = (weightKg / (heightM * heightM)).toFixed(1);

    let category = "";
    let color = "";
    let tip = "";

    if (bmi < 18.5) {
        category = "Underweight";
        color = "#3498db"; // blue
        tip = "Focus on nutrient-dense foods to build healthy mass safely.";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = "Healthy";
        color = "#2ecc71"; // green
        tip = "Great job! Maintain your balanced lifestyle.";
    } else if (bmi >= 25 && bmi <= 29.9) {
        category = "Overweight";
        color = "#f39c12"; // orange
        tip = "Incorporate more cardiovascular exercises and balanced portions.";
    } else {
        category = "Obese";
        color = "#e74c3c"; // red
        tip = "Consult a healthcare provider for a personalized plan.";
    }

    // Visual cap for progress bar
    let progressPercentage = (parseFloat(bmi) / 40) * 100;
    if (progressPercentage > 100) progressPercentage = 100;

    const resultDiv = document.getElementById('bmi-result');
    const fill = document.getElementById('bmi-progress-fill');
    const badge = document.getElementById('bmi-category');

    document.getElementById('bmi-score').innerText = bmi;
    document.getElementById('bmi-score').style.color = color;
    
    badge.innerText = category;
    badge.style.backgroundColor = `${color}33`; // 20% opacity background
    badge.style.color = color;
    badge.style.border = `1px solid ${color}`;
    
    document.getElementById('bmi-tip').innerText = tip;
    
    resultDiv.style.display = 'block';
    
    // Reset and animate progress bar
    fill.style.width = '0%';
    setTimeout(() => {
        fill.style.width = progressPercentage + '%';
        fill.style.backgroundColor = color;
    }, 50);
}

// Alert Buttons
const alertBtns = document.querySelectorAll('.alert-btn');
alertBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Coming soon!');
    });
});

// Init
document.addEventListener('DOMContentLoaded', () => {
    initQuotes();
});
