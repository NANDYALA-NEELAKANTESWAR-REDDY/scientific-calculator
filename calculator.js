class Calculator {
    constructor() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = null;
        this.shouldResetScreen = false;
        this.memory = 0;
        this.updateDisplay();
    }

    updateDisplay() {
        document.getElementById('current-operand').textContent = this.currentOperand;
        document.getElementById('previous-operand').textContent = 
            this.previousOperand + (this.operation || '');
    }

    inputNumber(number) {
        if (this.shouldResetScreen) {
            this.currentOperand = '';
            this.shouldResetScreen = false;
        }
        
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
        this.updateDisplay();
    }

    inputDecimal() {
        if (this.shouldResetScreen) {
            this.currentOperand = '0';
            this.shouldResetScreen = false;
        }
        
        if (!this.currentOperand.includes('.')) {
            this.currentOperand += '.';
        }
        this.updateDisplay();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = null;
        this.shouldResetScreen = false;
        this.updateDisplay();
    }

    clearEntry() {
        this.currentOperand = '0';
        this.updateDisplay();
    }

    backspace() {
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
        this.updateDisplay();
    }

    toggleSign() {
        if (this.currentOperand === '0') return;
        
        if (this.currentOperand.startsWith('-')) {
            this.currentOperand = this.currentOperand.slice(1);
        } else {
            this.currentOperand = '-' + this.currentOperand;
        }
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.previousOperand !== '' && this.operation !== null) {
            this.calculate();
        }
        
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    calculate() {
        let result;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert('Cannot divide by zero');
                    this.clear();
                    return;
                }
                result = prev / current;
                break;
            case '^':
                result = Math.pow(prev, current);
                break;
            default:
                return;
        }
        
        this.currentOperand = this.roundResult(result).toString();
        this.operation = null;
        this.previousOperand = '';
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    calculateFunction(func) {
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(current)) return;
        
        let result;
        
        switch (func) {
            case 'sin':
                result = Math.sin(this.degreesToRadians(current));
                break;
            case 'cos':
                result = Math.cos(this.degreesToRadians(current));
                break;
            case 'tan':
                result = Math.tan(this.degreesToRadians(current));
                break;
            case 'log':
                if (current <= 0) {
                    alert('Logarithm undefined for non-positive numbers');
                    return;
                }
                result = Math.log10(current);
                break;
            case 'ln':
                if (current <= 0) {
                    alert('Natural logarithm undefined for non-positive numbers');
                    return;
                }
                result = Math.log(current);
                break;
            case 'sqrt':
                if (current < 0) {
                    alert('Square root undefined for negative numbers');
                    return;
                }
                result = Math.sqrt(current);
                break;
            default:
                return;
        }
        
        this.currentOperand = this.roundResult(result).toString();
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    roundResult(number) {
        return Math.round(number * 100000000000) / 100000000000;
    }

    // Memory functions
    memoryAdd() {
        const current = parseFloat(this.currentOperand);
        if (!isNaN(current)) {
            this.memory += current;
            this.showMemoryIndicator();
        }
    }

    memorySubtract() {
        const current = parseFloat(this.currentOperand);
        if (!isNaN(current)) {
            this.memory -= current;
            this.showMemoryIndicator();
        }
    }

    memoryRecall() {
        this.currentOperand = this.memory.toString();
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    memoryClear() {
        this.memory = 0;
        this.showMemoryIndicator();
    }

    showMemoryIndicator() {
        // Visual feedback that memory operation occurred
        const display = document.getElementById('current-operand');
        const originalText = display.textContent;
        display.textContent = `M: ${this.memory}`;
        setTimeout(() => {
            display.textContent = originalText;
        }, 500);
    }
}

// Initialize calculator
const calculator = new Calculator();

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        calculator.inputNumber(e.key);
    } else if (e.key === '.') {
        calculator.inputDecimal();
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        calculator.chooseOperation(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        calculator.calculate();
    } else if (e.key === 'Escape') {
        calculator.clear();
    } else if (e.key === 'Backspace') {
        calculator.backspace();
    }
});
