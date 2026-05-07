// ============ PARTICULES ============
function createParticles() {
    var container = document.getElementById('particles');
    var particleCount = 30;
    
    for (var i = 0; i < particleCount; i++) {
        var particle = document.createElement('div');
        particle.classList.add('particle');
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        var size = Math.random() * 3 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        container.appendChild(particle);
    }
}

// ============ NAVIGATION ============
var navbar = document.getElementById('navbar');
var mobileMenuBtn = document.getElementById('mobileMenuBtn');
var navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
        mobileMenuBtn.textContent = '✕';
    } else {
        mobileMenuBtn.textContent = '☰';
    }
});

var allNavLinks = document.querySelectorAll('.nav-links a');
allNavLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        mobileMenuBtn.textContent = '☰';
    });
});

// ============ CARROUSEL SERVICES ============
var track = document.getElementById('servicesTrack');
var prevBtn = document.getElementById('prevBtn');
var nextBtn = document.getElementById('nextBtn');
var dotsContainer = document.getElementById('servicesDots');

var currentSlide = 0;
var cardWidth = 340 + 32;

function updateCarousel() {
    var maxScroll = track.scrollWidth - track.clientWidth;
    var scrollLeft = track.scrollLeft;
    
    var dots = dotsContainer.querySelectorAll('.dot');
    var activeDot = Math.round(scrollLeft / cardWidth);
    
    dots.forEach(function(dot, index) {
        if (index === activeDot) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    currentSlide = activeDot;
}

function scrollToSlide(index) {
    track.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
    });
}

function createDots() {
    var slides = track.querySelectorAll('.service-card');
    slides.forEach(function(_, index) {
        var dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', function() {
            scrollToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });
}

prevBtn.addEventListener('click', function() {
    if (currentSlide > 0) {
        currentSlide--;
        scrollToSlide(currentSlide);
    }
});

nextBtn.addEventListener('click', function() {
    var maxSlides = track.querySelectorAll('.service-card').length - 1;
    if (currentSlide < maxSlides) {
        currentSlide++;
        scrollToSlide(currentSlide);
    }
});

track.addEventListener('scroll', updateCarousel);

// ============ COMPTEURS ANIMÉS ============
function animateCounters() {
    var counters = document.querySelectorAll('.console-number');
    
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var counter = entry.target;
                var target = parseInt(counter.getAttribute('data-target'));
                var duration = 2000;
                var startTime = performance.now();
                
                function update(currentTime) {
                    var elapsed = currentTime - startTime;
                    var progress = Math.min(elapsed / duration, 1);
                    
                    var easeOut = 1 - Math.pow(1 - progress, 3);
                    var current = Math.floor(easeOut * target);
                    
                    counter.textContent = current + '+';
                    
                    if (progress < 1) {
                        requestAnimationFrame(update);
                    }
                }
                
                requestAnimationFrame(update);
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(function(counter) {
        observer.observe(counter);
    });
}

// ============ FORMULAIRE CONTACT ============
var contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        var name = document.getElementById('name').value.trim();
        var email = document.getElementById('email').value.trim();
        var phone = document.getElementById('phone').value.trim();
        var service = document.getElementById('service').value;
        var message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        // === SAUVEGARDE POUR L'ADMIN ===
        var messages = JSON.parse(localStorage.getItem('afrinova_messages') || '[]');
        messages.push({
            date: new Date().toISOString(),
            name: name,
            email: email,
            phone: phone,
            service: service,
            message: message,
            type: 'contact',
            status: 'new'
        });
        localStorage.setItem('afrinova_messages', JSON.stringify(messages));
        
        // Construction du message WhatsApp
        var fullMessage = 
            '🆕 *Nouveau Projet Afrinova Tech*\n\n' +
            '👤 *Nom:* ' + name + '\n' +
            '📧 *Email:* ' + email + '\n' +
            '📱 *Tél:* ' + (phone || 'Non spécifié') + '\n' +
            '🎯 *Service:* ' + (service || 'Non spécifié') + '\n\n' +
            '💬 *Message:*\n' + message + '\n\n' +
            '_Envoyé depuis le site web_';
        
        if (confirm('Comment souhaitez-vous envoyer votre message ?\n\nOK = WhatsApp\nAnnuler = Email')) {
            window.open('https://wa.me/22789434626?text=' + encodeURIComponent(fullMessage), '_blank');
        } else {
            var emailSubject = encodeURIComponent('Nouveau projet Afrinova - ' + name);
            var emailBody = encodeURIComponent(
                'NOUVEAU PROJET AFRINOVA TECH\n' +
                '===============================\n\n' +
                'Nom: ' + name + '\n' +
                'Email: ' + email + '\n' +
                'Téléphone: ' + (phone || 'Non spécifié') + '\n' +
                'Service: ' + (service || 'Non spécifié') + '\n\n' +
                'MESSAGE:\n' + message + '\n\n' +
                '==============================='
            );
            window.location.href = 'mailto:afrinovatech46@gmail.com?subject=' + emailSubject + '&body=' + emailBody;
        }
        
        // Feedback visuel
        var submitBtn = contactForm.querySelector('.submit-btn');
        var originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>✅ Message envoyé !</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #00FF88, #00CC66)';
        
        setTimeout(function() {
            submitBtn.innerHTML = originalHTML;
            submitBtn.style.background = 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%)';
            contactForm.reset();
        }, 3000);
    });
}

// ============ BOUTON RETOUR HAUT ============
var backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
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

// ============ INITIALISATION ============
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    createDots();
    animateCounters();
    
    console.log('🚀 Afrinova Tech - Site initialisé avec succès');
    console.log('📧 Contact: afrinovatech46@gmail.com');
    console.log('📱 Tél: +227 89 43 46 26');
    console.log('📍 Agadez, Niger');
    console.log('🔐 Admin: admin/index.html');
});
