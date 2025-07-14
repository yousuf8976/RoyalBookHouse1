
document.querySelectorAll('.btn-service-primary').forEach(button => {
    button.addEventListener('click', function() {
    
        const buttonText = this.textContent;
        
        if (buttonText === 'Learn More') {
       
            console.log('Learn More clicked for Amazon Publishing');
            
        } else if (buttonText === 'Get A Quote') {
          
            console.log('Get A Quote clicked');
      
            
            const consultationSection = document.querySelector('.consultation-section');
            if (consultationSection) {
                consultationSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});


const observeServiceCards = () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
};

document.addEventListener('DOMContentLoaded', function() {
    observeServiceCards();
});