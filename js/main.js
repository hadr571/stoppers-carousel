import Carousel from "./carousel.js";

const carousel = document.querySelector(".carousel");
const list = document.querySelector(".carousel__list");
const btnRight = document.querySelector(".carousel__btn--right");
const btnLeft = document.querySelector(".carousel__btn--left");

const carouselObj = new Carousel(carousel, list, btnRight, btnLeft);

//check for different viewport widths
carouselObj.checkWindowSize();

//listen for the left and right button clicks
carouselObj.btnRight.addEventListener("click", () => carouselObj.moveCarouselList(1));
carouselObj.btnLeft.addEventListener("click", () => carouselObj.moveCarouselList(-1));

//For mobile touch devices
let startX;
let endX;

// Listen for when the user starts touching the screen
carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX; // Record the starting touch position (X-axis)
});
// Listen for when the user moves their finger on the screen
carousel.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX; // Record the current position as they move
});
// Listen for when the user lifts their finger off the screen
carousel.addEventListener("touchend", () => {
    carouselObj.handleSwipe(startX, endX); // Trigger the function to handle swipe
});
