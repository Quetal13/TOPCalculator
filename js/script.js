let displayText = document.querySelector(".display-span");
let numberButtons = document.querySelectorAll(".number");
let operatorButtons = document.querySelectorAll(".operator");
let equalButton = document.querySelector(".equal");
let clearButton = document.querySelector(".clearButton");

let firstNumber = "n";
let secondNumber = "n";
let operator = "n"

let result = "n";

function displayRefresh () {
    if (firstNumber === "n" && secondNumber === "n") {
        displayText.textContent = 0;
    } else if (operator === "n") {
        displayText.textContent = firstNumber;
    } else if (secondNumber === "n") {
        displayText.textContent = firstNumber + " " + operator;
    } else {
        displayText.textContent = firstNumber + " " + operator + " " + secondNumber;
    }
};

displayRefresh();

function add(first, second) {
    return +first + +second;
};

function subtract (first, second) {
    return +first - +second;
};

function multiply (first, second) {
    return +first * +second;
};

function divide (first, second) {
    return +first / +second;
};

function operate (a, operator, b) {
    if (operator === "+") {
        result = add(a, b);
    } else if (operator === "-") {
        result = subtract(a, b);
    } else if (operator === "*") {
        result = multiply(a, b);
    } else if (operator === "/") {
        result = divide(a, b);
    }
};

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (operator === "n") {  
        if (firstNumber === "n" && operator === "n") {
            firstNumber = button.value;
        } else {
            firstNumber += button.value;
        }
        displayRefresh();
        } else if (secondNumber === "n") {
            secondNumber = button.value;
            displayRefresh();
        } else {
            secondNumber += button.value;
            displayRefresh();
        }
    })
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        operator = button.value;

        displayRefresh();
    })
})

clearButton.addEventListener('click', () => {
    firstNumber = "n";
    secondNumber = "n";
    operator = "n";
    result = "n";
    displayRefresh();
})

equalButton.addEventListener('click', () => {
    if (secondNumber === "n") {
        return
    } else if (operator == "/" && secondNumber == 0) {
        displayText.textContent = "SYNTAX ERROR";
    } else {
    operate(firstNumber, operator, secondNumber);
    displayText.textContent = result;
    firstNumber = result;
    secondNumber = "n";
    operator = "n";
    }
})