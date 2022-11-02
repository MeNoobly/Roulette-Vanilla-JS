"use strict";

(function() {

    const roulette = {
        
        money: 1000,

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

    // let rouletteItems = document.querySelectorAll(".roulette__item");

    const prizes = [];
    
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
            text: item.textContent,
            color: colorOfElement
        });
    }
    );


    // создаём переменные для быстрого доступа ко всем объектам на странице — блоку в целом, колесу, кнопке и язычку
  const wheel = document.querySelector(".roulette__deal-wheel");
  const spinner = wheel.querySelector(".roulette__spinner");
  const trigger = wheel.querySelector(".roulette__btn-spin");
  
  // на сколько секторов нарезаем круг
  const prizeSlice = 360 / 10;
  // на какое расстояние смещаем сектора друг относительно друга
  const prizeOffset = Math.floor(180 / prizes.length);
  // прописываем CSS-классы, которые будем добавлять и убирать из стилей
//   const spinClass = "is-spinning";
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
  
  // расставляем текст по секторам
  const createPrizeNodes = () => {
    // обрабатываем каждую подпись
    prizes.forEach(({ text, color, reaction }, i) => {
      // каждой из них назначаем свой угол поворота
      const rotation = ((prizeSlice * i) * -1) - prizeOffset;
      // добавляем код с размещением текста на страницу в конец блока spinner
      spinner.insertAdjacentHTML(
        "beforeend",
        // текст при этом уже оформлен нужными стилями
        `<li class="prize" data-reaction=${reaction} style="--rotate: ${rotation}deg">
          <span class="text">${text}</span>
        </li>`
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
    // ticker.style.animation = "none";
    // запускаем анимацию вращение
    // runTickerAnimation();
  });


  setupWheel();
})();
