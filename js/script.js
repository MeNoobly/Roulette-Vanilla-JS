"use strict";

(function() {

    const roulette = {
        
        money: 1000,
        amountBet: 0,
        bet: [],
        values: {
            values: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
            wheelValues: [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26],
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

        setBet(context, domElement) {
          return function () {
            let rouletteBetInput = document.querySelector(".roulette__bet");
            let rouletteBetP = document.querySelector(".roulette__money-bet");
            let rouletteMoneyP = document.querySelector(".roulette__money");
            let rouletteResult = document.querySelector(".roulette__result");
            let rouletteTableElement = document.createElement("p");

            rouletteBetP.textContent = `Общая сумма ставки: ${context.amountBet + Number(rouletteBetInput.value)}`;
            context.amountBet += Number(rouletteBetInput.value);
            context.money -= +rouletteBetInput.value;
            rouletteMoneyP.textContent = context.money;

            context.bet.push(
              {
                [domElement.id]: +rouletteBetInput.value
              });

            rouletteTableElement.textContent = `Ставка на ${domElement.id}, сумма ставки ${rouletteBetInput.value}`;
            rouletteBetInput.value = "";
            rouletteResult.classList.add("roulette__table-element");
            rouletteResult.append(rouletteTableElement);
          };
        },

        createRouletteApp() {
            let rouletteItems = document.querySelectorAll(".roulette__item");
            let rouletteList = document.querySelector(".roulette__list");
            let rouletteMoneyP = document.querySelector(".roulette__money");
            let rouletteField = document.querySelector(".roulette__field");
            let li, div, p;

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

    let prizes = [];
    
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

     // создаём переменные для быстрого доступа ко всем объектам на странице — блоку в целом, колесу, кнопке и язычку
    const wheel = document.querySelector(".deal-wheel");
    const spinner = wheel.querySelector(".spinner");
    const trigger = wheel.querySelector(".btn-spin");
    const ticker = wheel.querySelector(".ticker");

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

    function winOrLoose(position) {

      let setValues = roulette.bet.map(item => Object.keys(item)[0]);
      console.log(setValues);
      console.log(roulette.bet);
      console.log(position);
    }

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
      // сначала секторы
      createConicGradient();
      // потом текст
      createPrizeNodes();
      // а потом мы получим список всех призов на странице, чтобы работать с ними как с объектами
      prizeNodes = wheel.querySelectorAll(".prize");
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
    };

    // функция выбора призового сектора
    const selectPrize = () => {
      const selected = Math.floor(rotation / prizeSlice);
      prizeNodes[selected].classList.add(selectedClass);
      winOrLoose(Array.from(prizeNodes[selected].childNodes)[1].textContent);
    };

    // отслеживаем нажатие на кнопку
    trigger.addEventListener("click", () => {
      // делаем её недоступной для нажатия
      trigger.disabled = true;
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
    });

    // отслеживаем, когда закончилась анимация вращения колеса
    spinner.addEventListener("transitionend", () => {
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
      // делаем кнопку снова активной
      trigger.disabled = false;
    });

    // подготавливаем всё к первому запуску
    setupWheel();
})(); 