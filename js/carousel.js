export default class Carousel {
    constructor(carouselElement, listElement, btnRight, btnLeft) {
        this.carouselElement = carouselElement;
        this.listElement = listElement;
        this.btnRight = btnRight;
        this.btnLeft = btnLeft;
        this.currentIndex = 0;
        this.transformState = 0;
        this.listItemViewNum = 4; // default value
        this.carouselItems = Array.from(listElement.children);
        this.itemWidth = this.carouselItems[0].getBoundingClientRect().width;
        this.listGap = parseInt(getComputedStyle(listElement).gap);
        this.increment = this.itemWidth + this.listGap;
    }

    // Initialize all event listners
    init() {
        this.btnRight.addEventListener("click", () => this.moveCarouselList(1));
        this.btnLeft.addEventListener("click", () => this.moveCarouselList(-1));
        this.touchEventListners();
    }

    checkWindowSize() {
        const viewportWidth = window.innerWidth;
        if (viewportWidth <= 600) {
            this.listItemViewNum = 1;
        } else if (viewportWidth <= 900) {
            this.listItemViewNum = 2;
        } else if (viewportWidth <= 1200) {
            this.listItemViewNum = 3;
        }
    }

    // To remove or show the filler elements for the faded effect
    updateFillerElements() {
        if (this.currentIndex !== 0) {
            this.carouselElement.querySelector(".carousel__filler--left").classList.remove("carousel__filler--hidden");
        } else {
            this.carouselElement.querySelector(".carousel__filler--left").classList.add("carousel__filler--hidden");
        }

        if (this.currentIndex >= this.carouselItems.length - this.listItemViewNum) {
            this.carouselElement.querySelector(".carousel__filler--right").classList.add("carousel__filler--hidden");
        } else {
            this.carouselElement.querySelector(".carousel__filler--right").classList.remove("carousel__filler--hidden");
        }
    }

    // Translate the carousel list according to the transformState
    transformCarousel() {
        this.listElement.style.transform = `translateX(-${this.transformState}px)`;
    }

    // Apply infinite carousel effect
    loopCarousel(direction) {
        if (direction === 1) {
            this.transformState = 0;
            this.currentIndex = 0;
            this.transformCarousel();
        } else {
            console.log("hellooooo");
            this.transformState = this.increment * (this.carouselItems.length - this.listItemViewNum);
            this.currentIndex = this.carouselItems.length - this.listItemViewNum;
            this.transformCarousel();
        }
    }

    // To move the carousel list one items width at a time
    moveCarouselList(direction) {
        if (direction === 1 && this.currentIndex >= this.carouselItems.length - this.listItemViewNum) {
            // Loop to start
            this.loopCarousel(1);
        } else if (direction === -1 && this.currentIndex === 0) {
            // Loop to end
            this.loopCarousel(-1);
        } else {
            if (direction > 0) {
                this.transformState += this.increment;
                this.currentIndex++;
            } else {
                this.transformState -= this.increment;
                this.currentIndex--;
            }
            this.transformCarousel();
        }

        // To manipulate the fadded effect
        this.updateFillerElements();
    }

    // Initialize all the touch event listners for the swipe effect
    touchEventListners() {
        let startX;
        let endX;
        // Listen for when the user starts touching the screen
        this.carouselElement.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX; // Record the starting touch position (X-axis)
        });
        // Listen for when the user moves their finger on the screen
        this.carouselElement.addEventListener("touchmove", (e) => {
            endX = e.touches[0].clientX; // Record the current position as they move
        });
        // Listen for when the user lifts their finger off the screen
        this.carouselElement.addEventListener("touchend", () => {
            this.handleSwipe(startX, endX); // Trigger the function to handle swipe
        });
    }

    // Function to detect swipe direction and trigger carousel sliding
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        if (startX - endX > swipeThreshold) {
            // Swipe left to next card
            this.moveCarouselList(1);
        } else if (endX - startX > swipeThreshold) {
            // Swipe right to previous card
            this.moveCarouselList(-1);
        }
    }
}
