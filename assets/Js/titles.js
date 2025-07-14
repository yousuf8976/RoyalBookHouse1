class GenresSlider {
    constructor() {
        this.slider = document.getElementById('genresSlider');
        this.track = document.getElementById('genresTrack');
        this.originalBooks = document.querySelectorAll('.book-item');
        this.currentIndex = 0;
        this.totalOriginalBooks = this.originalBooks.length;

        this.startX = 0;
        this.currentX = 0;
        this.isDragging = false;
        this.hasMoved = false;

        this.autoScrollInterval = null;
        this.autoScrollDelay = 4000;

        this.init();
    }

    init() {
        this.createInfiniteLoop();
        this.setupEventListeners();
        this.setInitialPosition();
        this.startAutoScroll();
    }

    createInfiniteLoop() {
        const trackHTML = this.track.innerHTML;

        this.track.innerHTML = trackHTML + trackHTML + trackHTML;

        this.allBooks = document.querySelectorAll('.book-item');
        this.totalBooks = this.allBooks.length;

        this.currentIndex = this.totalOriginalBooks;
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

        this.slider.addEventListener('mouseenter', () => this.stopAutoScroll());
        this.slider.addEventListener('mouseleave', () => {
            this.resetCursor();
            this.startAutoScroll();
        });

        window.addEventListener('resize', () => this.updateSliderPosition());

        this.track.addEventListener('transitionend', this.handleTransitionEnd.bind(this));
    }

    handleStart(e) {
        this.isDragging = true;
        this.hasMoved = false;
        this.startX = this.getEventX(e);
        this.stopAutoScroll();

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

        this.startAutoScroll();
    }

    getEventX(e) {
        return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    }

    resetCursor() {
        this.slider.style.cursor = 'grab';
        this.slider.style.userSelect = '';
    }

    getBookWidth() {
        const bookElement = this.allBooks[0];
        return bookElement.offsetWidth + 30;
    }

    setInitialPosition() {
        this.track.style.transition = 'none';
        const bookWidth = this.getBookWidth();
        const translateX = -this.currentIndex * bookWidth;
        this.track.style.transform = `translateX(${translateX}px)`;

        setTimeout(() => {
            this.track.style.transition = 'transform 0.5s ease-out';
        }, 50);
    }

    updateSliderPosition(withTransition = true) {
        const bookWidth = this.getBookWidth();
        const translateX = -this.currentIndex * bookWidth;

        this.track.style.transition = withTransition ? 'transform 0.5s ease-out' : 'none';
        this.track.style.transform = `translateX(${translateX}px)`;
    }

    nextSlide() {
        this.currentIndex++;
        this.updateSliderPosition();
    }

    previousSlide() {
        this.currentIndex--;
        this.updateSliderPosition();
    }

    handleTransitionEnd() {
        if (this.currentIndex >= this.totalOriginalBooks * 2) {
     
            this.currentIndex = this.totalOriginalBooks;
            this.updateSliderPosition(false);
        } else if (this.currentIndex < this.totalOriginalBooks) {
        
            this.currentIndex = this.totalOriginalBooks * 2 - 1;
            this.updateSliderPosition(false);
        }
    }

    autoScroll() {
        this.nextSlide();
    }

    startAutoScroll() {
        this.stopAutoScroll();
        this.autoScrollInterval = setInterval(() => {
            if (!this.isDragging) {
                this.autoScroll();
            }
        }, this.autoScrollDelay);
    }

    stopAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
            this.autoScrollInterval = null;
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    new GenresSlider();
});
