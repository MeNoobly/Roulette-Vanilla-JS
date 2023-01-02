"use strict";

const user = {
    money: 1000
};

let startButton = document.querySelector(".start");

startButton.addEventListener("click", start);

function start() {
    let arrayOfCards = document.querySelectorAll(".card");
    let id = 0;
    let timerId = setInterval(() => {
        if (id === arrayOfCards.length - 1) {
            clearInterval(timerId);
        }

        arrayOfCards[id].classList.remove("opacity-off");
        arrayOfCards[id].classList.add("opacity-on");
        id++;
    }, 500);
}