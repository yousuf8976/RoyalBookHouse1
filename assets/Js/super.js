 document.addEventListener('DOMContentLoaded', function() {
            
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            const superItems = document.querySelectorAll('.super-item');
            superItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(item);
            });

            const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
            learnMoreBtns.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const superTitle = this.closest('.super-item').querySelector('.super-title').textContent;
                    console.log(`Learn More clicked for: ${superTitle}`);
                    
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'translateY(-2px)';
                    }, 150);
                });
            });
        });