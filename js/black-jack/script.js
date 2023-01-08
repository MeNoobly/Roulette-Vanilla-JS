"use strict";

class Croupier {
    start() {
        let arrayOfCards = document.querySelectorAll(".card");
        this.users[0].create(this.users);
        let id = 0;
        let timerId = setInterval(() => {
            arrayOfCards = document.querySelectorAll(".card");
            if (id === arrayOfCards.length) {
                this.users.forEach(user => user.play(user.number, this));
                clearInterval(timerId);
            } else if (id === 1) {
                arrayOfCards[id].style = `background: url(../../img/black-jack/main-deck.png) center no-repeat;`;
            } else {
                let randomCard = this.cardRandomise();
                let usersInfo = document.querySelectorAll(".user__info");
                let usersAction = document.querySelectorAll(".user__action");
                arrayOfCards[id].style = `background: url(../../img/black-jack/cards/${randomCard}.png) center no-repeat;`;
                if (id > 2 && id % 2 !== 0) {
                    usersAction[(id - 3) / 2].classList.remove("opacity-off");
                    usersAction[(id - 3) / 2].classList.add("opacity-on");
                }
            }
            id++;
        }, 1000);
    }

    cardRandomise() {
        let randomNumber = Math.round(Math.random() * 51) + 1;
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
}

class User {
    constructor(number, name, money) {
        this.number = number;
        this.name = name;
        this.money = money;
    }

    play(player, croupier) {
        let arrayOfCards = document.querySelectorAll(".card");
    
        if (player === 0) {
            let randomCard = croupier.cardRandomise();
            croupier.firstCard = arrayOfCards[0].style.backgroundImage.split("/")[5].split(".")[0];
            croupier.secondCard = randomCard;
            let sumOfCroupierCards = cardsValues[croupier.firstCard] + cardsValues[croupier.secondCard];
            if (sumOfCroupierCards === 21) {
                arrayOfCards[1].style = `background: url(../../img/black-jack/cards/${croupier.secondCard}.png) center no-repeat;`;
                console.log("croupier win");
            }
        } else {
            let firstCard = arrayOfCards[player * 2].style.backgroundImage.split("/")[5].split(".")[0];
            let secondCard = arrayOfCards[player * 2 + 1].style.backgroundImage.split("/")[5].split(".")[0];
            let summaryOfCardsValues = cardsValues[firstCard.toString()] + cardsValues[secondCard.toString()];
        }
    }

    create(users) {
        for (let user of users) {
            let fieldPlayersDiv = document.querySelector(".field__players");
            let userDiv = document.createElement("div");
            let userDivAction = document.createElement("div");
            let userDivActionFirst = document.createElement("div");
            let userDivActionSecond = document.createElement("div");
            let userDivInfo = document.createElement("div");
            let playersCardsDiv = document.createElement("div");
            let cardsDivFirst = document.createElement("div");
            let cardsDivSecond= document.createElement("div");
            let userPName = document.createElement("p");
            let userPMoney = document.createElement("p");
            let userPState = document.createElement("p");
            let actionSeparateButtonSplit = document.createElement("button");
            let actionSeparateButtonMore = document.createElement("button");
            let actionSeparateButtonDouble = document.createElement("button");
            let actionSeparateButtonEnough = document.createElement("button");
    
            userDiv.classList.add("user");
            userDivAction.classList.add("user__action", "opacity-off");
            userDivInfo.classList.add("user__info");
            playersCardsDiv.classList.add("players__cards");
            userDivActionFirst.classList.add("action__separate");
            userDivActionSecond.classList.add("action__separate");
            actionSeparateButtonSplit.classList.add("action__button");
            actionSeparateButtonMore.classList.add("action__button");
            actionSeparateButtonDouble.classList.add("action__button");
            actionSeparateButtonEnough.classList.add("action__button");
            userPName.classList.add("user__name");
            userPMoney.classList.add("user__money");
            userPState.classList.add("user__state");
            cardsDivFirst.classList.add("card", "card__player");
            cardsDivSecond.classList.add("card");

            actionSeparateButtonSplit.textContent = "Разделить";
            actionSeparateButtonMore.textContent = "Еще";
            actionSeparateButtonDouble.textContent = "Удвоить";
            actionSeparateButtonEnough.textContent = "Хватит";
            userPName.textContent = `name: ${user.name}`;
            userPMoney.textContent = `money: ${user.money}`;
            userPState.textContent = "state: bet";

            playersCardsDiv.append(cardsDivFirst, cardsDivSecond);
            userDivInfo.append(userPName, userPMoney, userPState);
            userDivActionFirst.append(actionSeparateButtonSplit, actionSeparateButtonMore);
            userDivActionSecond.append(actionSeparateButtonDouble, actionSeparateButtonEnough);
            userDivAction.append(userDivActionFirst, userDivActionSecond);
            userDiv.append(userDivAction, userDivInfo, playersCardsDiv);
            fieldPlayersDiv.append(userDiv);
        }
    }
}

const cardsValues = {
    "2_club": 2,
    "3_club": 3,
    "4_club": 4,
    "5_club": 5,
    "6_club": 6,
    "7_club": 7,
    "8_club": 8,
    "9_club": 9,
    "10_club": 10,
    "a_club": 11,
    "j_club": 10,
    "q_club": 10,
    "k_club": 10,
    "2_diamond": 2,
    "3_diamond": 3,
    "4_diamond": 4,
    "5_diamond": 5,
    "6_diamond": 6,
    "7_diamond": 7,
    "8_diamond": 8,
    "9_diamond": 9,
    "10_diamond": 10,
    "a_diamond": 11,
    "j_diamond": 10,
    "q_diamond": 10,
    "k_diamond": 10,
    "2_spades": 2,
    "3_spades": 3,
    "4_spades": 4,
    "5_spades": 5,
    "6_spades": 6,
    "7_spades": 7,
    "8_spades": 8,
    "9_spades": 9,
    "10_spades": 10,
    "a_spades": 11,
    "j_spades": 10,
    "q_spades": 10,
    "k_spades": 10,
    "2_heart": 2,
    "3_heart": 3,
    "4_heart": 4,
    "5_heart": 5,
    "6_heart": 6,
    "7_heart": 7,
    "8_heart": 8,
    "9_heart": 9,
    "10_heart": 10,
    "a_heart": 11,
    "j_heart": 10,
    "q_heart": 10,
    "k_heart": 10,

};

let startButton = document.querySelector(".start");
let croupier = new Croupier();
croupier.users = [];
startButton.addEventListener("click", croupier.start.bind(croupier));

let User1 = new User(0, "1", 20000);
let User2 = new User(1, "2", 200000);
croupier.users.push(User1, User2);

