"use strict";

(function() {

    // объект для рулетки

    const roulette = {
        
        money: 100000, // все деньги
        amountBet: 0, // сумма ставки
        bet: [], // ставка
        extendedBet: [],
        values: { // различные значения рулетки
            // значения в месте выставления ставки
            values: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
            valuesFirstRow: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
            valuesSecondRow: [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
            valuesThirdRow: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
            valuesFirstTwelve: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            valuesSecondTwelve: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
            valuesThirdTwelve: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
            valuesOneForEighteen: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
            valuesNineteenForThirtySix: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
            valuesEven: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36],
            valuesOdd: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35],
            // значения колеса
            wheelValues: [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26],
            // какого цвета будет колесо
            green: [0],
            red: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36],
            black: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35],
        },

        generateRandomNumber() { // метод с генерацией рандомных чисел
            let number = Math.round(Math.random() * 36); // генерация рандомного числа от 0 до 36
            // какого цвета ячейка генерируемого числа
            let color = "black";
            if (this.values.green.includes(number)) {
                color = "green";
            } else if (this.values.red.includes(number)) {
                color = "red";
            }
            return number + " " + color; // возвращаем номер ячейки и её цвет
        },

        setBet(context, domElement) { // процесс выставления ставки
          return function () {
            // ищем нужные нам поля
            let rouletteBetInput = document.querySelector(".roulette__bet");
            let rouletteBetP = document.querySelector(".roulette__money-bet");
            let rouletteMoneyP = document.querySelector(".roulette__money");
            let rouletteResult = document.querySelector(".roulette__result");
            let rouletteTableElement = document.createElement("p");

            rouletteBetP.textContent = `Общая сумма ставки: ${context.amountBet + Number(rouletteBetInput.value)}`; // прописываем общую сумму ставки
            context.amountBet += Number(rouletteBetInput.value); // записываем общую сумму ставки
            context.money -= +rouletteBetInput.value; // из наших денег вычитаем сумму ставки
            rouletteMoneyP.textContent = context.money; // печатаем, сколько денег у нас осталось

            // в массив всех ставок заносим число, на которое поставили и сумму ставки
            context.bet.push(
              {
                [domElement.id]: +rouletteBetInput.value 
              });

            rouletteTableElement.textContent = `Ставка на ${domElement.id}, сумма ставки ${rouletteBetInput.value}`; // выводим то, на что поставили
            rouletteBetInput.value = ""; // очищаем поле со ставками
            rouletteTableElement.classList.add("roulette__table-element"); // добавляем стили к результату ставки
            rouletteResult.append(rouletteTableElement); // добавляем элемент в DOM
          };
        },

        setOtherBet(context, domElement) {
          return function () {
            // ищем нужные нам поля
            let rouletteBetInput = document.querySelector(".roulette__bet");
            let rouletteBetP = document.querySelector(".roulette__money-bet");
            let rouletteMoneyP = document.querySelector(".roulette__money");
            let rouletteResult = document.querySelector(".roulette__result");
            let rouletteTableElement = document.createElement("p");
            let rouletteOnExtendedBetElement = "";

            if (domElement.id === "roulette__div-right-side-up" || 
            domElement.id === "roulette__div-right-side-mid" ||
            domElement.id === "roulette__div-right-side-down") {
              let idOfPRightElement = domElement.id === "roulette__div-right-side-up" ? "roulette__p-right-side-up" : domElement.id === "roulette__div-right-side-mid" ? "roulette__p-right-side-mid" : "roulette__p-right-side-down";
            
              switch(idOfPRightElement) {
                case "roulette__p-right-side-up":
                  rouletteOnExtendedBetElement = "первый ряд";
                  break;
                case "roulette__p-right-side-mid":
                  rouletteOnExtendedBetElement = "второй ряд";
                  break;
                case "roulette__p-right-side-down":
                  rouletteOnExtendedBetElement = "третий ряд";
                  break;
              }

              context.extendedBet.push({
                [idOfPRightElement]: +rouletteBetInput.value
              });
            } else {
              switch(domElement.id) {
                case "roulette__p-central-first-first":
                  rouletteOnExtendedBetElement = "числа от 1 до 12";
                  break;
                case "roulette__p-central-first-second":
                  rouletteOnExtendedBetElement = "числа от 15 до 22";
                  break;
                case "roulette__p-central-first-third":
                  rouletteOnExtendedBetElement = "числа от 27 до 34";
                  break;
                case "roulette__p-central-second-1-18":
                  rouletteOnExtendedBetElement = "числа от 1 до 18";
                  break;
                case "roulette__p-central-second-even":
                  rouletteOnExtendedBetElement = "чётные числа";
                  break;
                case "roulette__p-central-second-red":
                  rouletteOnExtendedBetElement = "красные ячейки";
                  break;
                case "roulette__p-central-second-black":
                  rouletteOnExtendedBetElement = "чёрные ячейки";
                  break;
                case "roulette__p-central-second-odd":
                  rouletteOnExtendedBetElement = "нечётные числа";
                  break;
                case "roulette__p-central-second-19-36":
                  rouletteOnExtendedBetElement = "числа от 19 до 36";
                  break;
              }

              context.extendedBet.push({
                [domElement.id]: +rouletteBetInput.value
              });
            }
            
            rouletteBetP.textContent = `Общая сумма ставки: ${context.amountBet + Number(rouletteBetInput.value)}`; // прописываем общую сумму ставки
            context.amountBet += Number(rouletteBetInput.value); // записываем общую сумму ставки
            context.money -= +rouletteBetInput.value; // из наших денег вычитаем сумму ставки
            rouletteMoneyP.textContent = context.money; // печатаем, сколько денег у нас осталось

            // в массив всех ставок заносим число, на которое поставили и сумму ставки
            

            rouletteTableElement.textContent = `Ставка на ${rouletteOnExtendedBetElement}, сумма ставки ${rouletteBetInput.value}`; // выводим то, на что поставили
            rouletteBetInput.value = ""; // очищаем поле со ставками
            rouletteTableElement.classList.add("roulette__table-element"); // добавляем стили к результату ставки
            rouletteResult.append(rouletteTableElement); // добавляем элемент в DOM
          };
        },

        createRouletteApp() {
            // ищем DOM элементы
            let rouletteItems = document.querySelectorAll(".roulette__item");
            let rouletteList = document.querySelector(".roulette__list");
            let rouletteMoneyP = document.querySelector(".roulette__money");
            let rouletteDivRightSideUp = document.getElementById("roulette__div-right-side-up");
            let rouletteDivRightSideMid = document.getElementById("roulette__div-right-side-mid");
            let rouletteDivRightSideDown = document.getElementById("roulette__div-right-side-down");
            let roulettePCentralFirstFirst = document.getElementById("roulette__p-central-first-first");
            let roulettePCentralFirstSecond = document.getElementById("roulette__p-central-first-second");
            let roulettePCentralFirstThird = document.getElementById("roulette__p-central-first-third");
            let roulettePCentralSecondOneToEighteen = document.getElementById("roulette__p-central-second-1-18");
            let roulettePCentralSecondEven = document.getElementById("roulette__p-central-second-even");
            let roulettePCentralSecondRed = document.getElementById("roulette__p-central-second-red");
            let roulettePCentralSecondBlack = document.getElementById("roulette__p-central-second-black");
            let roulettePCentralSecondOdd = document.getElementById("roulette__p-central-second-odd");
            let roulettePCentralSecondNineteenToThirhtySix = document.getElementById("roulette__p-central-second-19-36");
            let elementsOfOtherBet = [rouletteDivRightSideUp, rouletteDivRightSideMid, rouletteDivRightSideDown, 
              roulettePCentralFirstFirst, roulettePCentralFirstSecond, roulettePCentralFirstThird, roulettePCentralSecondOneToEighteen,
              roulettePCentralSecondEven, roulettePCentralSecondRed, roulettePCentralSecondBlack, 
              roulettePCentralSecondOdd, roulettePCentralSecondNineteenToThirhtySix];
            let li, div, p;

            // добавляем значения и айди на каждый элемент
            p = document.querySelector(".roulette__div-zero");
            p.addEventListener("click", this.setBet(this, p));
            p.id = "0";
            for (let i = 1; i < 37; i++) {
                div = document.createElement("div");
                li = document.createElement("li");
                li.textContent = this.values.values[i - 1];
                li.addEventListener("click", this.setBet(this, li));
                li.id = `${this.values.values[i - 1]}`;
                div.classList.add("roulette__green-background");
                li.classList.add("roulette__item");
                div.append(li);
                rouletteList.append(div);
            }

            elementsOfOtherBet.forEach(item => item.addEventListener("click", this.setOtherBet(this, item)));

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

    // загатовка для колеса

    roulette.createRouletteApp();

    let prizes = [];
    
    // в массив prizes записываем все значения рулетки, чтобы нанести их на колесо
    roulette.values.wheelValues.forEach(item => {
        let colorOfElement;
        if (roulette.values.red.includes(+item)) {
            colorOfElement = "red";
        } else if (roulette.values.black.includes(+item)) {
            colorOfElement = "black";
        } else {
            colorOfElement = "green";
        }
        
        prizes.push({
            text: item,
            color: colorOfElement
        });
      }
    );

    prizes = prizes.reverse();

    // создание нужных переменных

    // создаём переменные для быстрого доступа ко всем объектам на странице — блоку в целом, колесу, кнопке и язычку
    const wheel = document.querySelector(".deal-wheel");
    const spinner = wheel.querySelector(".spinner");
    const ticker = wheel.querySelector(".ticker");
    const timerP = document.querySelector(".roulette__timer-p");
    // на сколько секторов нарезаем круг
    const prizeSlice = 360 / prizes.length;
    // на какое расстояние смещаем сектора друг относительно друга
    const prizeOffset = Math.floor(180 / prizes.length);
    // прописываем CSS-классы, которые будем добавлять и убирать из стилей
    const spinClass = "is-spinning";
    const selectedClass = "selected";
    // получаем все значения параметров стилей у секторов
    const spinnerStyles = window.getComputedStyle(spinner);
    // переменная для анимации
    let tickerAnim;
    // угол вращения
    let rotation = 0;
    // текущий сектор
    let currentSlice = 0;
    // переменная для текстовых подписей
    let prizeNodes;
    let timerID;
    let timerID2;
    let sec = 30;
    
    timerP.textContent = `Время до запуска колеса: ${sec}`;
    // все нужные функции

    // расставляем текст по секторамs
    const createPrizeNodes = () => {
      // обрабатываем каждую подпись
      prizes.forEach(({ text, color, reaction }, i) => {
        // каждой из них назначаем свой угол поворота
        const rotation = ((prizeSlice * i) * -1) - prizeOffset;
        // добавляем код с размещением текста на страницу в конец блока spinner
        spinner.insertAdjacentHTML(
          "beforeend",
          // текст при этом уже оформлен нужными стилями
          `
            <li class="prize" data-reaction=${reaction} style="--rotate: ${rotation}deg">
            <span class="text item-text">${text}</span>
            </li>
          
          `
        );
      });
    };

    // рисуем разноцветные секторы
    const createConicGradient = () => {
      // устанавливаем нужное значение стиля у элемента spinner
      spinner.setAttribute(
        "style",
        `background: conic-gradient(
          from -90deg,
          ${prizes
            // получаем цвет текущего сектора
            .map(({ color }, i) => `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`)
            .reverse()
          }
        );`
      );

    };

    // создаём функцию, которая нарисует колесо в сборе
    const setupWheel = () => {
      const timerP = document.querySelector(".roulette__timer-p");
      // сначала секторы
      createConicGradient();
      // потом текст
      createPrizeNodes();
      // а потом мы получим список всех призов на странице, чтобы работать с ними как с объектами
      prizeNodes = wheel.querySelectorAll(".prize");

      timerID2 = setInterval(() => {
        sec--;
        if (sec === 0) {
          timerP.textContent = "Пуск!";
        } else {
          timerP.textContent = `Время до запуска колеса: ${sec}`;
        }
       
      }, 1000);

      timerID = setInterval(() => {
        timingFunction();
      }, sec * 1000);
    };

    // определяем количество оборотов, которое сделает наше колесо
    const spinertia = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // функция запуска вращения с плавной остановкой
    const runTickerAnimation = () => {
      // взяли код анимации отсюда: https://css-tricks.com/get-value-of-css-rotation-through-javascript/
      const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
      const a = values[0];
      const b = values[1];  
      let rad = Math.atan2(b, a);
      
      if (rad < 0) {
        rad += (2 * Math.PI);
      }
      
      const angle = Math.round(rad * (180 / Math.PI));
      const slice = Math.floor(angle / prizeSlice);

      // анимация язычка, когда его задевает колесо при вращении
      // если появился новый сектор
      if (currentSlice !== slice) {
        // убираем анимацию язычка
        ticker.style.animation = "none";
        // и через 10 миллисекунд отменяем это, чтобы он вернулся в первоначальное положение
        setTimeout(() => ticker.style.animation = null, 10);
        // после того, как язычок прошёл сектор - делаем его текущим 
        currentSlice = slice;
      }
      // запускаем анимацию
      tickerAnim = requestAnimationFrame(runTickerAnimation);

      clearTimeout(timerID);
      clearInterval(timerID2);
    };

    // функция выбора призового сектора
    const selectPrize = () => {
      const selected = Math.floor(rotation / prizeSlice);
      prizeNodes[selected].classList.add(selectedClass);
      winOrLoose(+Array.from(prizeNodes[selected].childNodes)[1].textContent);
    };

    // функция победы или поражения
    function winOrLoose(position) {
      let rouletteMoneyP = document.querySelector(".roulette__money");
      let setValues = roulette.bet.map(item => +Object.keys(item)[0]);
      let rouletteState = document.querySelector(".roulette__bet-state");
      let amountOfWin = 0;
      
      for (let item of setValues) {
        if (item === position) {
          for (let element of roulette.bet) {
            if (+Object.keys(element)[0] === position) {
              amountOfWin += (+Object.values(element)[0] * 36);
              roulette.money += (+Object.values(element)[0] * 36);
            }
          }
        }
      }

      if (roulette.values.valuesFirstRow.includes(position)) {
        for (let item of roulette.extendedBet) {
          if (Object.keys(item)[0] === "roulette__p-right-side-up") {
            amountOfWin += (+Object.values(item)[0] * 3);
            roulette.money += (+Object.values(item)[0] * 3);
          }
        }
      } 

      if (roulette.values.valuesSecondRow.includes(position)) {
        for (let item of roulette.extendedBet) {
          if (Object.keys(item)[0] === "roulette__p-right-side-mid") {
            amountOfWin += (+Object.values(item)[0] * 3);
            roulette.money += (+Object.values(item)[0] * 3);
          }
        }
      } 

      if (roulette.values.valuesThirdRow.includes(position)) {
        for (let item of roulette.extendedBet) {
          if (Object.keys(item)[0] === "roulette__p-right-side-down") {
            amountOfWin += (+Object.values(item)[0] * 3);
            roulette.money += (+Object.values(item)[0] * 3);
          }
        }
      } 

      if (roulette.values.valuesFirstTwelve.includes(position)) {
        for (let item of roulette.extendedBet) {
          if (Object.keys(item)[0] === "roulette__p-central-first-first") {
            amountOfWin += (+Object.values(item)[0] * 3);
            roulette.money += (+Object.values(item)[0] * 3);
          }
        }
      } 

      if (roulette.values.valuesSecondTwelve.includes(position)) {
        for (let item of roulette.extendedBet) {
          if (Object.keys(item)[0] === "roulette__p-central-first-second") {
            amountOfWin += (+Object.values(item)[0] * 3);
            roulette.money += (+Object.values(item)[0] * 3);
          }
        }
      } 

      if (roulette.values.valuesThirdTwelve.includes(position)) {
        for (let item of roulette.extendedBet) {
          if (Object.keys(item)[0] === "roulette__p-central-first-third") {
            amountOfWin += (+Object.values(item)[0] * 3);
            roulette.money += (+Object.values(item)[0] * 3);
          }
        }
      } 

      if (roulette.values.valuesOneForEighteen.includes(position)) {
        for (let item of roulette.extendedBet) {
          if (Object.keys(item)[0] === "roulette__p-central-second-1-18") {
            amountOfWin += (+Object.values(item)[0] * 2);
            roulette.money += (+Object.values(item)[0] * 2);
          }
        }
      } 

      if (roulette.values.valuesNineteenForThirtySix.includes(position)) {
        for (let item of roulette.extendedBet) {
          if (Object.keys(item)[0] === "roulette__p-central-19-36") {
            amountOfWin += (+Object.values(item)[0] * 2);
            roulette.money += (+Object.values(item)[0] * 2);
          }
        }
      } 

      if (roulette.values.valuesEven.includes(position)) {
        for (let item of roulette.extendedBet) {
          if (Object.keys(item)[0] === "roulette__p-central-second-even") {
            amountOfWin += (+Object.values(item)[0] * 2);
            roulette.money += (+Object.values(item)[0] * 2);
          }
        }
      } 
      
      if (roulette.values.valuesOdd.includes(position)) {
        for (let item of roulette.extendedBet) {
          if (Object.keys(item)[0] === "roulette__p-central-second-odd") {
            amountOfWin += (+Object.values(item)[0] * 2);
            roulette.money += (+Object.values(item)[0] * 2);
          }
        }
      } 

      if (roulette.values.red.includes(position)) {
        for (let item of roulette.extendedBet) {
          if (Object.keys(item)[0] === "roulette__p-central-second-red") {
            amountOfWin += (+Object.values(item)[0] * 2);
            roulette.money += (+Object.values(item)[0] * 2);
          }
        }
      } 

      if (roulette.values.black.includes(position)) {
        for (let item of roulette.extendedBet) {
          if (Object.keys(item)[0] === "roulette__p-central-second-black") {
            amountOfWin += (+Object.values(item)[0] * 2);
            roulette.money += (+Object.values(item)[0] * 2);
          }
        }
      }

      if (roulette.amountBet < amountOfWin) {
        rouletteState.textContent = `Ставка - ${roulette.amountBet}, сумма выигрыша - ${amountOfWin}`;
      } else if (roulette.amountBet === amountOfWin) {
        rouletteState.textContent = `Вы ничего не выиграли и ничего не потеряли`;
      } else {
        rouletteState.textContent = `Ставка - ${roulette.amountBet}, потеряно - ${roulette.amountBet - amountOfWin}`;
      }

      roulette.bet = [];
      roulette.extendedBet = [];

      rouletteMoneyP.textContent = roulette.money;
    }
      
    //функция очищения элементов, после прокрутки колеса
    function clearElements() {
      let rouletteBetP = document.querySelector(".roulette__money-bet");
      let rouletteTableElement = document.querySelectorAll(".roulette__table-element");

      rouletteBetP.textContent = "Общая сумма ставки: 0"; // прописываем общую сумму ставки
      rouletteTableElement.forEach(e => e.remove()); // очищаем список всех ставок

      roulette.amountBet = 0; // очищаем сумму ставок
      
    }
    
    function timingFunction() {
      // задаём начальное вращение колеса
      rotation = Math.floor(Math.random() * 360 + spinertia(2000, 5000));
      // убираем прошлый приз
      prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
      // добавляем колесу класс is-spinning, с помощью которого реализуем нужную отрисовку
      wheel.classList.add(spinClass);
      // через CSS говорим секторам, как им повернуться
      spinner.style.setProperty("--rotate", rotation);
      // возвращаем язычок в горизонтальную позицию
      ticker.style.animation = "none";


      // запускаем анимацию вращение
      runTickerAnimation();
    }

    // события кнопок

    // отслеживаем, когда закончилась анимация вращения колеса
    spinner.addEventListener("transitionend", () => {
      const timerP = document.querySelector(".roulette__timer-p");
      sec = 30;
      timerP.textContent = `Время до запуска колеса: ${sec}`;
      // останавливаем отрисовку вращения
      cancelAnimationFrame(tickerAnim);
      // получаем текущее значение поворота колеса
      rotation %= 360;
      // выбираем приз
      selectPrize();
      // убираем класс, который отвечает за вращение
      wheel.classList.remove(spinClass);
      // отправляем в CSS новое положение поворота колеса
      spinner.style.setProperty("--rotate", rotation);
      clearElements();
      timerID2 = setInterval(() => {
        sec--;
        if (sec === 0) {
          timerP.textContent = "Пуск!";
        } else {
          timerP.textContent = `Время до запуска колеса: ${sec}`;
        }
      }, 1000);
      timerID = setInterval(() => {
        timingFunction();
      }, sec * 1000);
    });

    // запуск 

    setupWheel();
})(); 