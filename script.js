const calDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.querySelector("#clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {
  if (awaitingNextValue) {
    calDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    const displayValue = calDisplay.textContent;
    calDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
  if (awaitingNextValue) return;

  if (!calDisplay.textContent.includes(".")) {
    calDisplay.textContent = `${calDisplay.textContent}.`;
  }
}

// calculate first and second value
const calculate = {
  "/": (firstNumer, secondNumber) => firstNumer / secondNumber,
  "*": (firstNumer, secondNumber) => firstNumer * secondNumber,
  "+": (firstNumer, secondNumber) => firstNumer + secondNumber,
  "-": (firstNumer, secondNumber) => firstNumer - secondNumber,
  "=": (firstNumer, secondNumber) => secondNumber,
};

function useOperator(operator) {
  const currentValue = Number(calDisplay.textContent);
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }

  if (!firstValue) {
    firstValue = currentValue;
  } else {
    console.log(firstValue, operatorValue, currentValue);
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calDisplay.textContent = calculation;
    firstValue = calculation;
  }
  awaitingNextValue = true;
  operatorValue = operator;
}

inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", addDecimal);
  }
});

function resetAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calDisplay.textContent = "0";
}
clearBtn.addEventListener("click", resetAll);
