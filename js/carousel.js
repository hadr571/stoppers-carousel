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

    moveCarouselList(direction) {
        if (direction === 1 && this.currentIndex >= this.carouselItems.length - this.listItemViewNum) {
            //prevents the carousel from moving further when the last item is visible
            return;
        } else if (direction === -1 && this.currentIndex === 0) {
            //prevents the carousel from moving backwards when it's at the first item
            return;
        }

        if (direction > 0) {
            this.transformState += this.increment;
            this.currentIndex++;
        } else {
            this.transformState -= this.increment;
            this.currentIndex--;
        }

        this.listElement.style.transform = `translateX(-${this.transformState}px)`;

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
