"use strict";

(function() {

    const roulette = {
        
        money: 1000,

        values: {
            values: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
            green: [0],
            red: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36],
            black: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35],
        },

        generateRandomNumber() {
            let number = Math.round(Math.random() * 36);
            let color = "black";
            if (this.values.green.includes(number)) {
                color = "green";
            } else if (this.values.red.includes(number)) {
                color = "red";
            }
            return number + " " + color;
        },

        setBet() {
            let rouletteBetInput = document.querySelector(".roulette__bet");
            let rouletteBetP = document.querySelector(".roulette__money-bet");
            let rouletteMoneyP = document.querySelector(".roulette__money");
            rouletteBetP.textContent = `Ставка: ${rouletteBetInput.value}`;
            this.money -= +rouletteBetInput.value;
            rouletteMoneyP.textContent = this.money;
            rouletteBetInput.value = "";
        },

        createRouletteApp() {
            let rouletteItems = document.querySelectorAll(".roulette__item");
            let rouletteList = document.querySelector(".roulette__list");
            let rouletteMoneyP = document.querySelector(".roulette__money");
            let li, div;

            for (let i = 0; i < 36; i++) {
                div = document.createElement("div");
                li = document.createElement("li");
                li.textContent = this.values.values[i];
                li.addEventListener("click", this.setBet.bind(this));
                div.classList.add("roulette__green-background");
                li.classList.add("roulette__item");
                div.append(li);
                rouletteList.append(div);
                
            }

            rouletteItems = document.querySelectorAll(".roulette__item");

            for (let item of rouletteItems) {
                if (this.values.red.includes(+item.textContent)) {
                    item.classList.add("roulette__red");
                } else if (this.values.black.includes(+item.textContent)) {
                    item.classList.add("roulette__black");
                }
            }
            rouletteMoneyP.textContent = this.money;
        },


    };

    roulette.createRouletteApp();
})();
