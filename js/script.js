//HTML objects variables

let displayText = document.querySelector(".display-span");
let numberButtons = document.querySelectorAll(".number");
let operatorButtons = document.querySelectorAll(".operator");
let floatButton = document.querySelector(".floating")
let equalButton = document.querySelector(".equal");
let clearButton = document.querySelector(".clearButton");
let backspaceButton = document.querySelector(".backspace");

//Variables for store calculator's data
let firstNumber = "n";
let secondNumber = "n";
let operator = "n";
let firstFloatNumber = false;
let secondFloatNumber = false;

let result = "n";

//Function for update the display on each change
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

//Functions for basics operations (Add, subtract, multiply and divide)
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

//Function for call all the operations functions previously created
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

//Function for modify the first button variable
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (operator === "n") {  //Check if the operator variable don't have none data stored
        if (firstNumber === "n" && operator === "n") { //Check if don't exist the first number yet
            firstNumber = button.value;
        } else {
            firstNumber += button.value; //Concat more numbers to firstNumber variable
        }
        displayRefresh(); //updates the display on each change
        } else if (secondNumber === "n") { //If already exist an operator then all the numbers will be stored in secondNumber variable
            secondNumber = button.value;
            displayRefresh();
        } else {
            secondNumber += button.value;
            displayRefresh();
        }
    })
});

//Function for modify the operator variable
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        operator = button.value;

        displayRefresh();
    })
});

//Function for floating numbers button
floatButton.addEventListener('click', () => {
    if (operator === "n" && firstFloatNumber === false) {
        firstNumber += floatButton.value
        firstFloatNumber = true;
        displayRefresh();
    } else if (secondFloatNumber === false) {
        secondNumber += floatButton.value;
        secondFloatNumber = true;
        displayRefresh();
    }
});

//Function for backspace button
backspaceButton.addEventListener('click', () => {
    if (firstNumber !== "n" && secondNumber === "n") {
        firstNumber = firstNumber.slice(0, -1);
        displayRefresh();
    } else if (secondNumber !== "n") {
        secondNumber = secondNumber.slice(0, -1);
        displayRefresh();
    }
});

//Function for clear the display
clearButton.addEventListener('click', () => {
    firstNumber = "n";
    secondNumber = "n";
    operator = "n";
    result = "n";
    firstFloatNumber = false;
    secondFloatNumber = false;
    displayRefresh();
});

//Function for call the operate function
equalButton.addEventListener('click', () => {
    if (secondNumber === "n") { //If the secondNumber don't have any data then return nothing
        return
    } else if (operator == "/" && secondNumber == 0) { //If the user try divide by 0 then will appear an error message
        displayText.textContent = "SYNTAX ERROR";
    } else {
    operate(firstNumber, operator, secondNumber);
    displayText.textContent = result; //Change the display text to result
    //Prepares all variables for operate with result
    firstNumber = result;
    secondNumber = "n";
    operator = "n";
    secondFloatNumber = false;
    }
});

//Functions for keyboard support

//Function for add keyboard support on number buttons
document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') {
        const number = parseInt(event.key);
        if (operator === "n") {
            if (firstNumber === "n") {
                firstNumber = number.toString();
            } else {
                firstNumber += number.toString();
            }
            displayRefresh();
        } else if (secondNumber === "n") {
            secondNumber = number.toString();
        } else {
            secondNumber += number.toString();
        }
        displayRefresh();
    }
});

//Function for add keyboard support for operators
document.addEventListener('keydown', (event) => {
    if (event.key === "+") {
        operator = "+";
    } else if (event.key === "-") {
        operator = "-";
    } else if (event.key === "*") {
        operator = "*";
    } else if (event.key === "/") {
        operator = "/";
    } else if (event.key === "=" || event.key === "Enter") {
        if (secondNumber === "n") { //If the secondNumber don't have any data then return nothing
            return
        } else if (operator == "/" && secondNumber == 0) { //If the user try divide by 0 then will appear an error message
            displayText.textContent = "SYNTAX ERROR";
        } else {
        operate(firstNumber, operator, secondNumber);
        displayText.textContent = result; //Change the display text to result
        //Prepares all variables for operate with result
        firstNumber = result;
        secondNumber = "n";
        operator = "n";
        secondFloatNumber = false;
        }
    }
    displayRefresh();
});

//Function for add keyboard support for floating numbers
document.addEventListener('keydown', (event) => {
    if (event.key === ".") {
        if (operator === "n" && firstFloatNumber === false) {
            firstNumber += floatButton.value
            firstFloatNumber = true;
            displayRefresh();
        } else if (secondFloatNumber === false) {
            secondNumber += floatButton.value;
            secondFloatNumber = true;
            displayRefresh();
        }
    }
});

//Function for add keyboard support for clear buttons
document.addEventListener('keydown', (event) => {
    if (event.key === "Backspace") {
        if (firstNumber !== "n" && secondNumber === "n") {
            firstNumber = firstNumber.slice(0, -1);
            displayRefresh();
        } else if (secondNumber !== "n") {
            secondNumber = secondNumber.slice(0, -1);
            displayRefresh();
        }
    } else if (event.key === "Delete" || event.key === "Del") {
        firstNumber = "n";
        secondNumber = "n";
        operator = "n";
        result = "n";
        firstFloatNumber = false;
        secondFloatNumber = false;
        displayRefresh();
    }
});