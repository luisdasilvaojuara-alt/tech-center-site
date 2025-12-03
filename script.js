window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

const scrollDown = document.querySelector('.scroll-down');
if (scrollDown) {
    scrollDown.addEventListener('click', () => {
        document.querySelector('#services').scrollIntoView({ behavior: 'smooth' });
    });
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        const serviceNames = {
            'infraestrutura': 'Infraestrutura de Redes',
            'bgp': 'Roteamento e BGP',
            'seguranca': 'Segurança da Informação',
            'hotspot': 'Hotspot e PPPoE',
            'servidores': 'Servidores e Cloud',
            'suporte': 'Suporte Técnico'
        };
        
        const whatsappMessage = `
*Nova solicitação do site - Tech Center TI*

*Nome:* ${name}
*E-mail:* ${email}
*Telefone:* ${phone}
*Serviço:* ${serviceNames[service] || service}

*Mensagem:*
${message}
        `.trim();
        
        const whatsappUrl = `https://wa.me/5598988280345?text=${encodeURIComponent(whatsappMessage)}`;
        
        window.open(whatsappUrl, '_blank');
        
        contactForm.reset();
        
        alert('Obrigado! Você será redirecionado para o WhatsApp.');
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .portfolio-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        document.getElementById('header').style.transform = 'translateY(-100%)';
    } else {
        document.getElementById('header').style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat h3');
    
    const animateCount = (element) => {
        const target = element.textContent;
        const isNumber = /^\d+$/.test(target.replace('+', ''));
        
        if (isNumber) {
            const finalNumber = parseInt(target.replace('+', ''));
            let current = 0;
            const increment = finalNumber / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= finalNumber) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current) + '+';
                }
            }, 30);
        }
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => statsObserver.observe(stat));
});

console.log('%cTech Center TI', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%cConectando sua empresa ao futuro', 'color: #764ba2; font-size: 16px;');
console.log('%cWhatsApp: (98) 98828-0345', 'color: #25D366; font-size: 14px;');
