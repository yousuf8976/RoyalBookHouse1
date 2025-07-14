

        document.addEventListener('DOMContentLoaded', function() {
            const navbarToggler = document.querySelector('.custom-toggler');
            const navbarCollapse = document.getElementById('navbarNav');
            // Initialize Bootstrap Collapse without auto-toggle
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });

            // Manually toggle menu when toggler is clicked
            navbarToggler.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent this click from bubbling up to the document listener

                if (navbarCollapse.classList.contains('show')) {
                    bsCollapse.hide();
                    navbarToggler.setAttribute('aria-expanded', 'false');
                } else {
                    bsCollapse.show();
                    navbarToggler.setAttribute('aria-expanded', 'true');
                }
            });

            document.addEventListener('click', function(event) {
                const isClickInsideNav = navbarCollapse.contains(event.target);
                const isClickOnToggler = navbarToggler.contains(event.target);

                if (navbarCollapse.classList.contains('show') && !isClickInsideNav && !isClickOnToggler) {
                    bsCollapse.hide();
                    navbarToggler.setAttribute('aria-expanded', 'false'); 
                }
            });
            
            const navLinks = document.querySelectorAll('#navbarNav .nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
               
                    if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                        bsCollapse.hide();
                        navbarToggler.setAttribute('aria-expanded', 'false'); 
                    }
                });
            });

            // Top Contact Bar Interactions
            const whatsappItem = document.querySelector('.top-contact-bar .contact-bar-item:first-child');
            if (whatsappItem) {
                whatsappItem.addEventListener('click', function() {
                    const phoneNumber = '+13239168484'; 
                    const message = 'Hello! I would like to inquire about your services.';
                    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                });
            }

            const emailItem = document.querySelector('.top-contact-bar .contact-bar-item:last-child');
            if (emailItem) {
                emailItem.addEventListener('click', function() {
                    const email = 'contact@thehouseofbestsellers.com';
                    const subject = 'Inquiry about your services';
                    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
                    window.location.href = mailtoUrl;
                });
            }

            
            const footerLinks = document.querySelectorAll('.footer-link');
            footerLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href.startsWith('#')) {
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

     
            const socialLinks = document.querySelectorAll('.social-link');
            socialLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const platform = this.querySelector('i').className;
                    console.log(`Social media click: ${platform}`);
                    
                });
            });

            
            document.querySelectorAll('.custom-footer .contact-item').forEach((item, index) => {
                if (index === 0) { // Phone
                    item.addEventListener('click', function() {
                        const phoneNumber = this.querySelector('.contact-text').textContent;
                        window.location.href = `tel:${phoneNumber.replace(/\D/g, '')}`;
                    });
                    item.style.cursor = 'pointer';
                } else if (index === 1) { 
                    item.addEventListener('click', function() {
                        const email = this.querySelector('.contact-text').textContent;
                        window.location.href = `mailto:${email}`;
                    });
                    item.style.cursor = 'pointer';
                }
            });

            const currentYear = new Date().getFullYear();
            const copyrightText = document.querySelector('.copyright-text');
            if (copyrightText) {
                copyrightText.innerHTML = copyrightText.innerHTML.replace('2025', currentYear);
            }
        });
   