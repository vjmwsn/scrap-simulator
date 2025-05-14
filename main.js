let cpu = [0,0,0,0]
let memory = []

let pointer = 0

document.querySelector("#memory").innerText = memory

// create 256 zeroes
for(i=0;i<256;i++){memory.push(0)}

let runElement = document.querySelector("#run")
runElement.addEventListener("Click", simulate)

function simulate () {
    print("hello world!")
}
// converts any integer into a 16 bit binary string
function binary (key) {
    let binary = key
    binary = binary.toString(2) ; binary = binary.padStart(16, "0")
    return binary
}

function command (cmd, adress, register) {
    let result = 0
    switch(true) {
        // Arithmetics
        case cmd == "ADD":
            result = cpu[0] + cpu[1]
            cpu[3] = result
            break;
        case cmd == "SUB":
            result = cpu[0] + cpu[1]
            cpu[3] = result
            break;
        case cmd == "MUL":
            result = cpu[0] * cpu[1]
            cpu[3] = result
            break;
        case cmd == "INC":
            result = cpu[0]++
            cpu[3] = result
            break;
        case cmd == "DEC":
            result = cpu[0]--
            cpu[3] = result
            break;
        // Comparing
        case cmd == "AND":
            result = cpu[0] == cpu[1]
            cpu[3] = result
            break;
        case cmd == "NOT":
            result = cpu[0] !== cpu[1]
            cpu[3] = result
            break;
        case cmd == "LTH":
            result = cpu[0] < cpu[1]
            cpu[3] = result
            break;
        case cmd == "MTH":
            result = cpu[0] > cpu[1]
            cpu[3] = result
            break;
        // memory operations
        case cmd == "CPR":
            cpu[register] = memory[adress]
            break;
        case cmd == "CPA":
            memory[adress] = cpu[register]
            break;
        case cmd == "JMP":
            pointer = adress
            break;
        case cmd == "CJP":
            if(cpu[3]) {pointer = adress}
            break;
        case cmd == "CLR":
            cpu[register] = 0
            break;
        case cmd == "INV":
            break;
        // halt
        case cmd == "HLT":
            break;
    }
}