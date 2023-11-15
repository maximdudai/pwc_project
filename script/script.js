'use strict'

const carouselItem = document.querySelectorAll(".carousel-item");

carouselItem.forEach((item) => {
    item.addEventListener("click", (e) => {
        const carouselItemActive = document.querySelector(".carousel-item.active");
        
        carouselItemActive.classList.remove("active");
        item.classList.add("active");
    });
});