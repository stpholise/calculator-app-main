const slider = document.getElementById("slider")
const previousTextElement = document.getElementById("previous")
const currentTextElement = document.getElementById("current")
const numbersBtn = document.querySelectorAll("[data-number]");
const operationsBtn = document.querySelectorAll("[data-operation]");
const equalsBtn = document.getElementById("equals");
const deleteBtn = document.getElementById("delete-btn");
const resetBtn = document.getElementById("reset-btn");



// TO HANDLE THE TOGGLE OF BACKGROUND FUNCTONALLITY
// =============================================
const sliderArr = [0, 15, 30]
    let x = 0 
const bgs = ["one", "two", "three"]
    
slider.addEventListener("click", ()=>{
    let ball = document.querySelector(".ball")
  

   x++
  
   if( x > sliderArr.length-1){
    x = 0
   }
   let body = document.body
   if(x === 0){
        if(body.classList.contains("three") || body.classList.contains("two") || body.classList.contains("one")){
            body.classList.remove("two")
            body.classList.remove("three")
            body.classList.remove("one")
        }
    slider.style.backgroundColor = " hsl(223, 31%, 20%)";
    ball.style.backgroundColor = "hsl(6, 63%, 50%)"
    document.body.classList.add("one")
   }
   else if (x === 1){
    if(body.classList.contains("three") || body.classList.contains("two") || body.classList.contains("one")){
        body.classList.remove("two")
        body.classList.remove("three")
        body.classList.remove("one")
    }
    slider.style.backgroundColor = "  hsl(0, 5%, 81%)";
    ball.style.backgroundColor = "hsl(25, 98%, 40%)"
    document.body.classList.add("two")
}else{
    if(body.classList.contains("three") || body.classList.contains("two") || body.classList.contains("one")){
        body.classList.remove("two")
        body.classList.remove("three")
        body.classList.remove("one")
    }
    slider.style.backgroundColor = "hsl(268, 71%, 12%)";
    ball.style.backgroundColor = "hsl(176, 100%, 44%)"
    document.body.classList.add("three")
   }
   ball.style.transform = `translateX(${sliderArr[x]}px)`
})
// END OF TOGGLE FUNCTIONALLITY


class Calculator{
    constructor(currentTextElement, previousTextElement){
        this.currentTextElement = currentTextElement;
        this.previousTextElement = previousTextElement
        this.resetFn()
    }
    
    resetFn(){
        this.currentVal = "";
        this.previousVal = "";
        this.operation = undefined;
    }
    deleteFn(){
        this.currentVal = this.currentVal.toString().slice(0, -1)
    }
    appendNumber(number){
        if(number === "." && this.currentVal.includes("."))return
        this.currentVal = this.currentVal.toString() + number.toString()
    }
    chooseOperation(operation){
        if(this.currentVal === "") return
        if(this.previousVal != null){
            this.compute()
        }
        this.operation = operation;
        this.previousVal = this.currentVal;
        this.currentVal = ""

    }
    
    compute(){
        let computation 
        const prev = parseFloat(this.previousVal)
        const current = parseFloat(this.currentVal)
        if(isNaN(prev) || isNaN(current)) return 
        switch(this.operation){
            case "+":
                computation = prev + current
                break
            case "-":
                computation = prev - current
                break
            case "X":
                computation = prev * current
                break
            case "/":
                computation = prev / current
                break
            default:
                return
        }
        this.currentVal = computation
        this.previousVal = "";
        this.operation = undefined;
        
    }
    getNumberDisplay(num){
        const stringNum = num.toString()
        const integerDegit  = parseFloat(stringNum.split(".")[0])
        const decimalDigit  = stringNum.split(".")[1]
        let integerDisplay
        if(isNaN(integerDegit)){
            integerDisplay = ""
        }else{
            integerDisplay = integerDegit.toLocaleString("en", {maxmumFraction: 0})

        }
        if(decimalDigit != null){
           return   `${integerDisplay}.${decimalDigit}`
        }else{
            return   `${integerDisplay}`
        }
    }
    updateDisplay(){
        currentTextElement.innerHTML = this.getNumberDisplay(this.currentVal)
        if(this.operation != null){
        previousTextElement.innerHTML = `${this.getNumberDisplay(this.previousVal)} ${this.operation}`
    }
    else{
        previousTextElement.innerHTML = ""
    }
    }
}

const calculator = new Calculator(currentTextElement, previousTextElement)

numbersBtn.forEach(btn =>{
    btn.addEventListener("click", () =>{
        calculator.appendNumber(btn.textContent);
        calculator.updateDisplay()
       
    })
})

deleteBtn.addEventListener("click", ()=>{
    calculator.deleteFn()
    calculator.updateDisplay()
})


resetBtn.addEventListener("click", ()=>{
    calculator.resetFn()
    calculator.updateDisplay()
})


operationsBtn.forEach(btn =>{
    btn.addEventListener("click",() =>{
        calculator.chooseOperation(btn.textContent);
        calculator.updateDisplay()
    })
})
equalsBtn.addEventListener("click", ()=>{
    calculator.compute()
    calculator.updateDisplay()
})