const form = document.querySelector('#calculatorForm');
const firstNumber = document.querySelector('#firstNumber');
const secondNumber = document.querySelector('#secondNumber');
const equation = document.querySelector('#equation');
const result = document.querySelector('#result');
const resultNote = document.querySelector('#resultNote');
const historyList = document.querySelector('#historyList');
const clearHistoryButton = document.querySelector('#clearHistory');

const operators = {
    add: { symbol: '+', label: 'addition' },
    subtract: { symbol: '−', label: 'subtraction' },
    multiply: { symbol: '×', label: 'multiplication' },
    divide: { symbol: '÷', label: 'division' }
};

let calculationCount = 0;

function formatNumber(value) {
    return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(8)));
}

function calculate(left, right, operation) {
    if (operation === 'add') return left + right;
    if (operation === 'subtract') return left - right;
    if (operation === 'multiply') return left * right;
    return left / right;
}

function addToHistory(expression, answer) {
    const emptyMessage = historyList.querySelector('.empty-history');
    if (emptyMessage) emptyMessage.remove();

    calculationCount += 1;
    const item = document.createElement('li');
    item.className = 'history-item';
    item.innerHTML = `
        <span class="history-number">${String(calculationCount).padStart(2, '0')}</span>
        <span class="history-expression">${expression}</span>
        <strong class="history-answer">= ${answer}</strong>
    `;
    historyList.prepend(item);
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const left = Number(firstNumber.value);
    const right = Number(secondNumber.value);
    const operation = document.querySelector('input[name="operation"]:checked').value;
    const { symbol, label } = operators[operation];

    if (!Number.isFinite(left) || !Number.isFinite(right)) {
        resultNote.textContent = 'Enter a number in both fields to continue.';
        firstNumber.focus();
        return;
    }

    if (operation === 'divide' && right === 0) {
        equation.innerHTML = `${formatNumber(left)} <span>${symbol}</span> 0`;
        result.textContent = 'ERROR';
        resultNote.textContent = 'Division by zero is not defined.';
        return;
    }

    const answer = calculate(left, right, operation);
    const formattedExpression = `${formatNumber(left)} ${symbol} ${formatNumber(right)}`;
    const formattedAnswer = formatNumber(answer);

    equation.innerHTML = `${formatNumber(left)} <span>${symbol}</span> ${formatNumber(right)}`;
    result.textContent = formattedAnswer;
    resultNote.textContent = `Result of ${label}. Saved to the session log.`;
    addToHistory(formattedExpression, formattedAnswer);
});

form.addEventListener('reset', () => {
    window.setTimeout(() => {
        equation.innerHTML = '— <span>?</span> —';
        result.textContent = '0';
        resultNote.textContent = 'Your answer will appear here.';
    }, 0);
});

clearHistoryButton.addEventListener('click', () => {
    historyList.innerHTML = '<li class="empty-history">No calculations yet. Your working will be logged here.</li>';
    calculationCount = 0;
});
