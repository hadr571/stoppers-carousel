import Carousel from "./carousel.js";

const carousel = document.querySelector(".carousel");
const list = document.querySelector(".carousel__list");
const btnRight = document.querySelector(".carousel__btn--right");
const btnLeft = document.querySelector(".carousel__btn--left");

const carouselObj = new Carousel(carousel, list, btnRight, btnLeft);

// Check for different viewport widths
carouselObj.checkWindowSize();

// Initialize event listeners
carouselObj.init();
