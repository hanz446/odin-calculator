class Calculator {
    constructor() {
        this.mainDisplay = document.getElementById("main-display");
        this.secondaryDisplay = document.getElementById("secondary-display");
        this.buttonContainer = document.getElementById("button-container");

        this.currentNum = [];
        this.currOperation = [];

        this.buttonContainer.addEventListener("click", (event) => this.handleClick(event));
    }

    handleClick(event) {
        const identifier = event.target.id.split("-")

        switch (identifier[0]) {
            case "n":
                this.currentNum.push(identifier[1]);
                this.mainDisplay.textContent = this.currentNum.join("");
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
        if (typeof this.currOperation[1] === "string" && identifier !== "equals") {
            this.currOperation.pop();
        } else {
            this.currOperation.push(Number(this.currentNum.join("")));
        }

        switch (identifier) {
            case "plus":
                this.currOperation.push("+")
                this.updateDisplay()
                break;
            case "subtract":
                this.currOperation.push("-")
                this.updateDisplay()
                break;
            case "multiply":
                this.currOperation.push("\u00d7")
                this.updateDisplay()
                break;
            case "divide":
                this.currOperation.push("\u00F7")
                this.updateDisplay()
                break;
            case "equals":
                this.currentNum = this.operate();
                this.secondaryDisplay.textContent = "";
                this.mainDisplay.textContent = this.currentNum.join("");
                this.currOperation = []
                break;
        }
    }

    handleMisc(identifier) {
        switch (identifier) {
            case "clear":
                this.currentNum = [];
                this.currOperation = [];
                this.secondaryDisplay.textContent = "";
                this.mainDisplay.textContent = "0";
                break;
            case "backspace":
                this.currentNum.pop();
                if (this.currentNum.length === 0) {
                    this.mainDisplay.textContent = "0";
                } else {
                    this.mainDisplay.textContent = this.currentNum.join("");
                }
                
        }
    }

    updateDisplay() {
        this.secondaryDisplay.textContent = this.currOperation.join(" ");
        this.currentNum = [];
        this.mainDisplay.textContent = "0";
    }

    operate() {
        switch (this.currOperation[1]) {
            case "+":
                return String(Number(this.currOperation[0]) + Number(this.currentNum.join(""))).split("");
                break;
            case "-":
                return String(Number(this.currOperation[0]) - Number(this.currentNum.join(""))).split("");
                break;
            case "\u00d7":
                return String(Number(this.currOperation[0]) * Number(this.currentNum.join(""))).split("");
                break;
            case "\u00F7":
                return String(Number(this.currOperation[0]) / Number(this.currentNum.join(""))).split("");
                break;
        }
    }
}

new Calculator();