/*js code*/

class Calculator {
	/*TO INITIALIZE THE TWO VALUE IN DISPLAY*/
	constructor(previousOperandTextElement, currentOperandTextElement){
		this.previousOperandTextElement = previousOperandTextElement 
		this.currentOperandTextElement = currentOperandTextElement
		this.clear()
	}
	
	//METHODS
	
	clear() {
		this.currentOperand = ''
		this.previousOperand = ''
		this.operation = undefined
	} 
	
	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1)
	}
	
	appendNumber(number){
		
		//THIS LINE OF CODE PREVENT PRESSING MORE THAN 1 . SYMBOLS
		if (number === '.' && this.currentOperand.includes('.')) {
			return //IF TRUE IT WON'T DISPLAY ANYTHING
		}
		
		
		
		this.currentOperand = this.currentOperand.toString() + number.toString() 
	}
	
	chooseOperation(operation) {
		//IF USER NOT ENTERED ANY NUMBER USER CON'T TYPE OPERATION
		if (this.currentOperand === ''){
			return
		}
		//THIS CODE FOR REMAIN TOTAL OF CURRENT CALCULATION AT TOP RATHER THEN DISPLAY AT "currentOperandTextElement" PLACE
		if(this.previousOperand !== ''){
			this.compute()
		}
		
		this.operation = operation
		this.previousOperand = this.currentOperand
		this.currentOperand = ''
	}
	
	compute() {
		let computation
		
		const prev = parseFloat(this.previousOperand)
		const current = parseFloat(this.currentOperand)
		if (isNaN(prev) || isNaN(current)) return
		
		switch (this.operation){
			case '+':
				computation = prev + current
				break
			case '-':
				computation = prev - current
				break
			case '*':
				computation = prev * current
				break
			case '÷':
				computation = prev / current
				break
			default:
				return
		}
		this.currentOperand = computation
		this.operation = undefined
		this.previousOperand = ''
	}
	
	getDisplayNumber(number) {
		const stringNumber = number.toString()
		const integerDigits = parseFloat(stringNumber.split('.')[0])
		const decimalDigit = stringNumber.split('.')[1]
		let integerDisplay
		if (isNaN(integerDigits)){
			integerDisplay = ''
		} else {
			integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0 })
		}
		
		if (decimalDigit != null) {
			return `${integerDisplay}.${decimalDigit}`
		}else {
			return integerDisplay
		}
	}
	
	
	updateDisplay() {
		this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
		
		if(this.operation != null){
			this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
		}else {
			this.previousOperandTextElement.innerText = ''
		}
		
	}
}



const numberButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButton.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText)
		calculator.updateDisplay()
	})
})

operationButton.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText)
		calculator.updateDisplay()
	})
})

equalsButton.addEventListener('click', button => {
		calculator.compute()
		calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
		calculator.clear()
		calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
	calculator.delete()
	calculator.updateDisplay()
})