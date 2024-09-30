const carousel = document.querySelector(".carousel");
const list = document.querySelector(".carousel__list");
const btnRight = document.querySelector(".carousel__btn--right");
const btnLeft = document.querySelector(".carousel__btn--left");

const carouselItems = Array.from(list.children);
let listItemViewNum = 4; //the amount of items visible at a moment in time inside the carousel__list

function checkWidth() {}

let currentIndex = 0;

const itemWidth = carouselItems[0].getBoundingClientRect().width;
const listGap = parseInt(getComputedStyle(list).gap);
const increment = itemWidth + listGap; //the distance moved after one button click

let transformState = 0; //to help keep track of transformed position of the carousel__list

const checkWindowSize = () => {
    let viewportWidth = window.innerWidth;

    // Change the variable listItemViewNum when the width is <= 600px
    if (viewportWidth <= 600) {
        listItemViewNum = 1;
    }
    // Change the variable listItemViewNum when the width is <= 900px
    else if (viewportWidth <= 900) {
        listItemViewNum = 2;
    }
    // Change the variable listItemViewNum when the width is <= 900px
    else if (viewportWidth <= 1200) {
        listItemViewNum = 3;
    }
};

checkWindowSize();

const moveCarouselList = (direction) => {
    if (direction > 0) {
        transformState += increment;
        currentIndex++;
    } else {
        transformState -= increment;
        currentIndex--;
    }

    list.style.transform = `translateX(-${transformState}px)`;

    if (currentIndex !== 0) {
        carousel.querySelector(".carousel__filler--left").classList.remove("carousel__filler--hidden");
    } else {
        console.log(currentIndex);
        carousel.querySelector(".carousel__filler--left").classList.add("carousel__filler--hidden");
    }

    if (currentIndex >= carouselItems.length - listItemViewNum) {
        carousel.querySelector(".carousel__filler--right").classList.add("carousel__filler--hidden");
    } else {
        carousel.querySelector(".carousel__filler--right").classList.remove("carousel__filler--hidden");
    }
};

btnRight.addEventListener("click", () => {
    console.log(currentIndex, carouselItems.length - listItemViewNum);
    if (currentIndex >= carouselItems.length - listItemViewNum) return; //prevents the carousel from moving when it's at the last visible item
    moveCarouselList(1);
});

btnLeft.addEventListener("click", () => {
    if (currentIndex === 0) return;
    moveCarouselList(-1);
});
