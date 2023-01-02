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
        let randomCard = cardRandomise();
        arrayOfCards[id].style = `background: url(../../img/black-jack/cards/${randomCard}.png) center no-repeat;`;
        arrayOfCards[id].classList.remove("opacity-off");
        arrayOfCards[id].classList.add("opacity-on");
       
        id++;
    }, 500);
}

function cardRandomise() {
    let randomNumber = Math.round(Math.random() * 52) + 1;
    switch(randomNumber) {
        case 1:
            return "2_club";
        case 2:
            return "3_club";
        case 3:
            return "4_club";
        case 4:
            return "5_club";
        case 5:
            return "6_club";
        case 6:
            return "7_club"; 
        case 7:
            return "8_club";
        case 8:
            return "9_club";
        case 9:
            return "10_club";
        case 10:
            return "j_club";
        case 11:
            return "q_club";
        case 12:
            return "k_club";
        case 52:
            return "a_club";
        case 13:
            return "2_diamond";
        case 14:
            return "3_diamond";
        case 15:
            return "4_diamond";
        case 16:
            return "5_diamond";
        case 17:
            return "6_diamond";
        case 18:
            return "7_diamond";
        case 19:
            return "8_diamond";
        case 20:
            return "9_diamond";
        case 21:
            return "10_diamond";
        case 22:
            return "j_diamond";
        case 23:
            return "q_diamond";
        case 50:
            return "k_diamond";
        case 51:
            return "a_diamond";
        case 24:
            return "2_heart";
        case 25:
            return "3_heart";
        case 26:
            return "4_heart"; 
        case 27:
            return "5_heart";
        case 28:
            return "6_heart";
        case 29:
            return "7_heart";
        case 30:
            return "8_heart";
        case 31:
            return "9_heart";
        case 32:
            return "10_heart";
        case 33:
            return "j_heart";
        case 34:
            return "q_heart";
        case 35:
            return "k_heart";
        case 36:
            return "a_heart";
        case 37:
            return "2_spades";
        case 38:
            return "a_spades";
        case 39:
            return "3_spades";
        case 40:
            return "4_spades";
        case 41:
            return "5_spades";
        case 42:
            return "6_spades";
        case 43:
            return "7_spades";
        case 44:
            return "8_spades";
        case 45:
            return "9_spades";
        case 46:
            return "10_spades"; 
        case 47:
            return "j_spades";
        case 48:
            return "q_spades";
        case 49:
            return "k_spades";
    }
}