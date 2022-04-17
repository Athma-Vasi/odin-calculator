"use strict";
const mainApp = () => {
    const allBttns = document.querySelectorAll('.bttn');
    const displayElement = document.querySelector('.display');
    const decimalBttn = document.querySelector('.bttn-decimal');
    let firstOperand = '';
    let secondOperand = '';
    let operator = '';
    let result = '';
    let secondNumberFlag = false; //if false == NOT a secondNumber, true == YES a secondNumber
    const symbolsArr = ['AC', '/', '*', '-', '+', '=', '%'];
    function handleBttnClick() {
        const { textContent: bttnValue } = this;
        if (displayElement)
            displayElement.textContent = bttnValue ?? '';
        if (this.classList.contains('operator')) {
            if (bttnValue === '+/-')
                plusMinusFN();
            if (symbolsArr.includes(`${bttnValue}`)) {
                if (displayElement)
                    displayElement.textContent = '';
            }
            if (bttnValue === 'AC')
                clearAllFN(displayElement);
            if (!firstOperand && !secondOperand)
                return;
            else if (firstOperand && !secondOperand) {
                operator = bttnValue ?? '';
                secondNumberFlag = true;
            }
            else if (!firstOperand && secondOperand) {
                firstOperand = secondOperand;
                operator = bttnValue ?? '';
                secondOperand = '';
                secondNumberFlag = true;
            }
            if (firstOperand && secondOperand && operator) {
                if (bttnValue !== '=') {
                    result = solveFN();
                    if (displayElement)
                        displayElement.textContent = result;
                    operator = bttnValue ?? '';
                    firstOperand = result;
                    secondOperand = '';
                    secondNumberFlag = true;
                }
                else if (bttnValue === '=') {
                    result = solveFN();
                    if (displayElement)
                        displayElement.textContent = result;
                    operator = '';
                    firstOperand = result;
                    secondOperand = '';
                    secondNumberFlag = true;
                }
            }
            if (decimalBttn)
                decimalBttn.disabled = false;
        }
        else if (this.classList.contains('operand')) {
            if (bttnValue === '.') {
                if (decimalBttn)
                    decimalBttn.disabled = true;
            }
            if (!secondNumberFlag) {
                if (!firstOperand && bttnValue === '0')
                    return null;
                else {
                    firstOperand += bttnValue ?? '';
                    if (displayElement)
                        displayElement.textContent = firstOperand;
                }
            }
            else {
                if (!secondOperand && bttnValue === '0')
                    return null;
                else {
                    secondOperand += bttnValue ?? '';
                    if (displayElement)
                        displayElement.textContent = secondOperand;
                }
            }
        }
    }
    function plusMinusFN() {
        const tempDisplayValue = secondNumberFlag
            ? secondOperand?.split('')
            : firstOperand?.split('');
        let newTempDisplayValue;
        if (tempDisplayValue?.includes('-')) {
            newTempDisplayValue = tempDisplayValue?.slice(1).join('');
            if (displayElement) {
                displayElement.textContent = newTempDisplayValue;
                secondNumberFlag
                    ? (secondOperand = newTempDisplayValue)
                    : (firstOperand = newTempDisplayValue);
            }
        }
        else {
            newTempDisplayValue = ['-', ...(tempDisplayValue ?? '')].join('');
            if (displayElement) {
                displayElement.textContent = newTempDisplayValue;
                secondNumberFlag
                    ? (secondOperand = newTempDisplayValue)
                    : (firstOperand = newTempDisplayValue);
            }
        }
    }
    function clearAllFN(_displayElement) {
        firstOperand = '';
        secondOperand = '';
        operator = '';
        result = '';
        secondNumberFlag = false;
        if (_displayElement)
            _displayElement.textContent = '';
    }
    function solveFN() {
        const num1 = parseFloat(firstOperand);
        const num2 = parseFloat(secondOperand);
        const _operator = operator;
        let _result = '';
        if (num2 === 0 && _operator === '/')
            result = 'Halt, Citizen! Illegal Operation!';
        switch (_operator) {
            case '+':
                _result = (num1 + num2).toString();
                break;
            case '-':
                _result = (num1 - num2).toString();
                break;
            case '*':
                _result = (num1 * num2).toString();
                break;
            case '/':
                _result = (num1 / num2).toString();
                break;
            case '%':
                _result = (num1 % num2).toString();
                break;
            default:
                _result = 'Unknown command. Cannot compute.';
        }
        return _result.length > 13 ? _result.slice(0, 13) : _result;
    }
    allBttns.forEach((bttn) => bttn.addEventListener('click', handleBttnClick));
};
document.addEventListener('DOMContentLoaded', mainApp);
