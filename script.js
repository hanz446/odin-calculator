class Calculator {
    constructor() {
        this.mainDisplay = document.getElementById("main-display");
        this.secondaryDisplay = document.getElementById("secondary-display");
        this.buttonContainer = document.getElementById("button-container");

        this.currentNum = "";
        this.currOperation = "";
        this.storedNum = "";
        this.consecutiveEquals = false;
        this.consecutiveOps = false;
        this.errorDisplayed = false;
        this.temp = 0;

        this.operations = {
            plus: "+",
            subtract: "-",
            multiply: "\u00d7",
            divide: "\u00F7",
        }

        this.buttonContainer.addEventListener("click", (event) => this.handleClick(event));
    }

    handleClick(event) {
        if (!event.target.classList.contains('button')) return;

        const dataType = event.target.dataset.type;
        const dataValue = event.target.dataset.value;

        switch (dataType) {
            case "number":
                this.handleNumber(dataValue);
                break;
            case "operator":
                this.handleOperations(dataValue);
                break;
            case "misc":
                this.handleMisc(dataValue);
                break;
            case "equals":
                this.handleEquals();
                break;
        }
    }

    handleNumber(dataValue) {
        if (this.consecutiveEquals || this.errorDisplayed) {
            this.reset();
        }
        if (this.currentNum.length < 12) this.currentNum = this.currentNum + dataValue;
        this.updateDisplay(this.currentNum, "bypass")
    }

    handleOperations(dataValue) {
        this.consecutiveEquals = false;

        if (this.currentNum === "-") this.currentNum = "-1";

        if (this.currentNum !== "") {
            this.consecutiveOps ? this.storedNum = this.operate(this.storedNum, this.currentNum) : this.storedNum = this.currentNum;
        }
        
        this.currOperation = this.operations[dataValue];
        this.currentNum = "";
        this.consecutiveOps = true;
        this.updateDisplay("0", "operation")
    }

    handleMisc(dataValue) {
        if (this.consecutiveEquals) {
            this.currentNum = "";
            this.consecutiveEquals = false;
        }
        switch (dataValue) {
            case "clear":
                this.reset();
                this.updateDisplay();
                break;
            case "backspace":
                this.currentNum = this.currentNum.slice(0, -1);
                this.updateDisplay(this.currentNum, "bypass");
                break;
            case "toggle":
                if (this.currentNum[0] === "-") {
                    this.currentNum = this.currentNum.slice(1);
                } else {
                    this.currentNum = "-" + this.currentNum;
                }
                this.updateDisplay(this.currentNum, "bypass");
                break;
            case "percent":
                this.currentNum = String(this.currentNum / 100);
                this.updateDisplay(this.currentNum, "bypass")
                break;
            case "decimal":
                if (!this.currentNum.includes(".")) this.currentNum += ".";
                this.updateDisplay(this.currentNum, "bypass")
        }
    }

    handleEquals() {
        this.consecutiveOps = false;
        if (this.consecutiveEquals) {
            this.currentNum = String(this.operate(this.currentNum, this.temp));
        } else {
            if (this.currentNum === "") this.currentNum = this.storedNum;
            this.temp = this.currentNum;
            this.currentNum = String(this.operate(this.storedNum, this.currentNum));
        }
        this.consecutiveEquals = true;
        if (this.errorDisplayed) return;
        this.updateDisplay(this.currentNum, "none")
    }

    reset() {
        this.currentNum = "";
        this.currOperation = "";
        this.storedNum = "";
        this.consecutiveEquals = false;
        this.consecutiveOps = false;
        this.errorDisplayed = false;
        this.temp = 0;
    }

    updateDisplay(mainContent="0", secondaryContent="none") {
        switch (mainContent) {
            case "bypass":
                break;
            case "":
                this.mainDisplay.textContent = "0";
                break;
            case ".":
                this.mainDisplay.textContent = "0.";
                break;
            case "-":
                this.mainDisplay.textContent = "-";
                break;
            case "error":
                this.mainDisplay.textContent = "Can't divide by 0";
                break;
            default:
                if (mainContent.at(-1) === ".") {
                    this.mainDisplay.textContent = Number(mainContent).toLocaleString('en-US') + ".";
                } else if (mainContent.includes(".")) {
                    const numSplit = mainContent.split(".");
                    if (numSplit[1].length > 6) {
                        numSplit[1] = numSplit[1].slice(0, 6);
                        this.currentNum = numSplit.join(".");
                    }
                    this.mainDisplay.textContent = Number(mainContent).toLocaleString('en-US', { minimumFractionDigits: numSplit[1].length });
                } else {
                    this.mainDisplay.textContent = Number(mainContent).toLocaleString('en-US');
                }
        }
        switch (secondaryContent) {
            case "none":
                this.secondaryDisplay.textContent = null;
                break;
            case "operation":
                this.secondaryDisplay.textContent = Number(this.storedNum).toLocaleString('en-US', { maximumFractionDigits: 5 }) + " " + this.currOperation;
                break;
            case "bypass":
                break;
        }
    }

    operate(numA, numB) {
        switch (this.currOperation) {
            case "+":
                return Number(numA) + Number(numB);
            case "-":
                return Number(numA) - Number(numB);
            case "\u00d7":
                return Number(numA) * Number(numB);
            case "\u00F7":
                if (Number(numB) === 0) {
                    this.errorDisplayed = true;
                    this.updateDisplay("error");
                    return "";
                }
                return Number(numA) / Number(numB);
        }
        return Number(numB);
    }
}

new Calculator();