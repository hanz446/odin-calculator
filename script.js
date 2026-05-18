class Calculator {
    constructor() {
        this.mainDisplay = document.getElementById("main-display");
        this.secondaryDisplay = document.getElementById("secondary-display");
        this.buttonContainer = document.getElementById("button-container");

        this.currentNum = "";
        this.currOperation = "";
        this.storedNum = "";

        this.buttonContainer.addEventListener("click", (event) => this.handleClick(event));
    }

    handleClick(event) {
        const identifier = event.target.id.split("-")

        switch (identifier[0]) {
            case "n":
                this.currentNum += identifier[1];
                this.mainDisplay.textContent = this.currentNum;
                break;
            case "o":
                this.handleOperations(identifier[1]);
                break;
            case "m":
                this.handleMisc(identifier[1]);
                break;
        }
    }

    handleOperations(identifier) {
        if (this.currentNum && identifier !== "equals") {
            this.storedNum = Number(this.currentNum);
        }

        switch (identifier) {
            case "plus":
                this.currOperation = "+";
                this.currentNum = "";
                this.updateDisplay()
                break;
            case "subtract":
                this.currOperation = "-";
                this.currentNum = "";
                this.updateDisplay()
                break;
            case "multiply":
                this.currOperation = "\u00d7";
                this.currentNum = "";
                this.updateDisplay()
                break;
            case "divide":
                this.currOperation = "\u00F7";
                this.currentNum = "";
                this.updateDisplay()
                break;
            case "equals":
                this.currentNum = this.operate();
                this.secondaryDisplay.textContent = "";
                this.mainDisplay.textContent = Number(this.currentNum);
                this.currOperation = "";
                break;
        }
    }

    handleMisc(identifier) {
        switch (identifier) {
            case "clear":
                this.currentNum = "";
                this.currOperation = "";
                this.storedNum = "";
                this.updateDisplay();
                break;
            case "backspace":
                this.currentNum = this.currentNum.slice(0, -1);
                if (this.currentNum.length === 0) {
                    this.mainDisplay.textContent = "0";
                } else {
                    this.mainDisplay.textContent = this.currentNum;
                }
                
        }
    }

    updateDisplay() {
        this.secondaryDisplay.textContent = this.storedNum + " " + this.currOperation;
        this.mainDisplay.textContent = "0";
    }

    operate() {
        switch (this.currOperation) {
            case "+":
                return Number(this.storedNum) + Number(this.currentNum);
            case "-":
                return Number(this.storedNum) - Number(this.currentNum);
            case "\u00d7":
                return Number(this.storedNum) * Number(this.currentNum);
            case "\u00F7":
                return Number(this.storedNum) / Number(this.currentNum);
        }
        return this.currentNum;
    }
}

new Calculator();