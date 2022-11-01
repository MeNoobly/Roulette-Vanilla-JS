"use strict";

(function() {

    const roulete = {
        
        colors: {
            green: [0],
            red: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36],
            black: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35],
        },

        generateRandomNumber() {
            let number = Math.round(Math.random() * 36);
            let color = "black";
            if (this.colors.green.includes(number)) {
                color = "green";
            } else if (this.colors.red.includes(number)) {
                color = "red";
            }
            return number + " " + color;
        }
    };

    console.log(roulete.generateRandomNumber());
})();
