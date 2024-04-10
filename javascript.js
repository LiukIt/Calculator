// Define the Calculator basic operation.
const sum = function(a, b) {
    return (a + b);
}

const subtract = function(a, b) {
    return (a - b);
}

const multiply = function(a, b) {
    return (a * b);
}

const divide = function(a, b) {
    return (a / b);
}

// Define the decimal number at eight. 
function roundToEightDecimals(number) {
    return Number(number.toFixed(8));
}

// Call the operate
function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return sum(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return "not valid";
    }
}

// Function to evaluate the expression following the rules of mathematics
function evaluateExpression(expression) {
    // Split the expression into numbers and operators
    const parts = expression.split(/(\+|\-|\*|\/)/);

    // Define the order of operations
    const orderOfOperations = [
        ['*', '/'],
        ['+', '-']
    ];

    // Iterate through the order of operations
    orderOfOperations.forEach(operationSet => {
        for (let i = 0; i < parts.length; i++) {
            if (operationSet.includes(parts[i])) {
                // Perform the operation and replace the parts with the result
                const result = operate(parts[i], parseFloat(parts[i - 1]), parseFloat(parts[i + 1]));
                parts.splice(i - 1, 3, result.toString());
                // Decrement the index to account for the removal of elements
                i--;
            }
        }
    });

    // Return the final result
    return parseFloat(parts[0]);
}

// Declare displayValue globally
let displayValue = '';
let operator = ''; // Define operator globally
let firstNumber = ''; // Define firstNumber globally

// Function to update the display content
function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = displayValue;
}

// Add listener to the basic operation.
document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');

    // Function to add a number or operator to the display
    function addToDisplay(value) {
        displayValue += value;
        updateDisplay();
    }

    // Function to clear the contents of the display
    function clearDisplay() {
        displayValue = ''; // Clears the contents of the displayValue
        updateDisplay();
    }

    // Get all numeric and operator buttons
    const buttons = document.querySelectorAll('.number, .operator');

    // Add an event listener to each button
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.textContent;
            if (!isNaN(value) || value === '.') {
                addToDisplay(value);
            } else {
                operator = value;
                firstNumber = parseFloat(displayValue);
                addToDisplay(value);
            }
        });
    });

    // Add an event listener to the "C" (clear) button
    document.getElementById('clear').addEventListener('click', function() {
        clearDisplay();
    });

    // Add an event listener to the "=" button
    document.getElementById('equals').addEventListener('click', function() {
        console.log("Equals button clicked");
        calculate();
    });
});

function calculate() {
    console.log("Inside calculate function");
    // Evaluate the expression using the new function
    const result = evaluateExpression(displayValue);

    // Update the display with the result
    displayValue = result.toString();
    updateDisplay();
}



