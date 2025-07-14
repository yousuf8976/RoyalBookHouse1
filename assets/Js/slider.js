class BrandsSlider {
    constructor() {
        this.slider = document.getElementById('brandsSlider');
        this.track = document.getElementById('brandsTrack');
        this.originalCards = document.querySelectorAll('.brand-card');
        this.currentIndex = 0;
        this.totalOriginalBrands = this.originalCards.length;
        this.autoSlideInterval = null;
        this.slideDelay = 4000; 
        this.isTransitioning = false;
        
       
        this.startX = 0;
        this.currentX = 0;
        this.isDragging = false;
        this.hasMoved = false;
        
        this.init();
    }
    
    init() {
        this.createInfiniteLoop();
        this.setupEventListeners();
        this.setInitialPosition();
        this.startAutoSlide();
    }
    
    createInfiniteLoop() {
        const trackHTML = this.track.innerHTML;
        
        this.track.innerHTML = trackHTML + trackHTML + trackHTML;
        
        this.allCards = document.querySelectorAll('.brand-card');
        this.totalBrands = this.allCards.length;
        
       
        this.currentIndex = this.totalOriginalBrands;
    }
    
    setupEventListeners() {
        this.slider.addEventListener('contextmenu', (e) => e.preventDefault());
        this.slider.addEventListener('selectstart', (e) => e.preventDefault());
        this.slider.addEventListener('dragstart', (e) => e.preventDefault());
        
        this.slider.addEventListener('mousedown', this.handleStart.bind(this));
        document.addEventListener('mousemove', this.handleMove.bind(this));
        document.addEventListener('mouseup', this.handleEnd.bind(this));
        
      
        this.slider.addEventListener('touchstart', this.handleStart.bind(this), { passive: true });
        this.slider.addEventListener('touchmove', this.handleMove.bind(this), { passive: true });
        this.slider.addEventListener('touchend', this.handleEnd.bind(this));
        

        this.slider.addEventListener('mouseenter', () => this.stopAutoSlide());
        this.slider.addEventListener('mouseleave', () => {
            this.resetCursor();
            this.startAutoSlide();
        });
        
        window.addEventListener('resize', () => this.updateSliderPosition());
        
    
        this.track.addEventListener('transitionend', this.handleTransitionEnd.bind(this));
    }
    
    handleStart(e) {
        if (this.isTransitioning) return;
        
        this.isDragging = true;
        this.hasMoved = false;
        this.startX = this.getEventX(e);
        this.stopAutoSlide();
        
        this.slider.style.cursor = 'grabbing';
        this.slider.style.userSelect = 'none';
    }
    
    handleMove(e) {
        if (!this.isDragging) return;
        
        this.currentX = this.getEventX(e);
        const deltaX = this.currentX - this.startX;
        
        if (Math.abs(deltaX) > 5) {
            this.hasMoved = true;
        }
    }
    
    handleEnd(e) {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        this.resetCursor();
        
        if (this.hasMoved) {
            const deltaX = this.currentX - this.startX;
            const threshold = 50; 
            
            if (Math.abs(deltaX) > threshold) {
                if (deltaX > 0) {
                    this.previousSlide();
                } else {
                    this.nextSlide();
                }
            }
        }
        
        this.startAutoSlide();
    }
    
    getEventX(e) {
        return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    }
    
    resetCursor() {
        this.slider.style.cursor = 'grab';
        this.slider.style.userSelect = '';
    }
    
    getCardWidth() {
        const cardElement = this.allCards[0];
        return cardElement.offsetWidth + 30; 
    }
    
    setInitialPosition() {
      
        this.track.style.transition = 'none';
        const cardWidth = this.getCardWidth();
        const translateX = -this.currentIndex * cardWidth;
        this.track.style.transform = `translateX(${translateX}px)`;
        
       
        setTimeout(() => {
            this.track.style.transition = 'transform 0.5s ease';
        }, 50);
    }
    
    updateSliderPosition(withTransition = true) {
        const cardWidth = this.getCardWidth();
        const translateX = -this.currentIndex * cardWidth;
        
        if (withTransition) {
            this.track.style.transition = 'transform 0.5s ease';
        } else {
            this.track.style.transition = 'none';
        }
        
        this.track.style.transform = `translateX(${translateX}px)`;
    }
    
    nextSlide() {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.currentIndex++;
        this.updateSliderPosition();
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
    }
    
    previousSlide() {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.currentIndex--;
        this.updateSliderPosition();
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
    }
    
    handleTransitionEnd() {
        
        if (this.currentIndex >= this.totalOriginalBrands * 2) {
           
            this.currentIndex = this.totalOriginalBrands;
            this.updateSliderPosition(false);
        } else if (this.currentIndex < this.totalOriginalBrands) {
           
            this.currentIndex = this.totalOriginalBrands * 2 - 1;
            this.updateSliderPosition(false);
        }
    }
    
    startAutoSlide() {
        this.stopAutoSlide();
        this.autoSlideInterval = setInterval(() => {
            if (!this.isDragging) {
                this.nextSlide();
            }
        }, this.slideDelay);
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new BrandsSlider();
});