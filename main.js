let cpu = [0,0,0,0]
let memory = []

let pointer = 0

// create 256 zeroes
for(i=0;i<256;i++){memory.push(0)}

let inputElement = document.querySelector("#inputarea")

function simulate () {
    memory = inputElement.value.split("\n")

    
    for(pointer=0;pointer<memory.length;pointer++){memory[pointer] = memory[pointer].split(" "); command(memory[pointer][0], memory[pointer][1], memory[pointer][2]);}
    // kinda pround of this loop    

    console.log("CPU: " + cpu)
    console.log("Memory: " + memory)
    console.log("Pointer: " + pointer)
    // update the output
    let outputElement = document.querySelector("#output")
    outputElement.innerHTML = ""
    for(i=0;i<cpu.length;i++){
        let div = document.createElement("div")
        div.innerHTML = "R" + i + ": " + cpu[i]
        outputElement.appendChild(div)
    }
    for(i=0;i<memory.length;i++){
        let div = document.createElement("div")
        div.innerHTML = "M" + i + ": " + memory[i]
        outputElement.appendChild(div)
    }
    // update the pointer
    let pointerElement = document.querySelector("#pointer") 

}
// converts any integer into a 16 bit binary string
function binary (key) {
    let binary = key
    binary = binary.toString(2)
    binary = binary.padStart(16, "0")
    return binary
}

function command (cmd, adress, register) {
    let result = 0
    // convert adress and register to integers
    adress = parseInt(adress)
    register = parseInt(register)
    // convert cmd to string
    cmd = cmd.toString()
    // ensuere that the adress and register are in range
    if(adress > 255 || adress < 0) {adress = 0}
    if(register > 3 || register < 0) {register = 0}
    // ensure that the cmd is in range
    if(cmd.length > 3) {cmd = cmd.slice(0,3)}
    // ensure that cpu[register] is an integer
    let cpu0 = parseInt(cpu[0])
    let cpu1 = parseInt(cpu[1])
    let cpu2 = parseInt(cpu[2])
    let cpu3 = parseInt(cpu[3])

    switch(true) {
        // Arithmetics
        case cmd == "ADD":
            result = cpu0 + cpu1
            cpu[3] = result
            break;
        case cmd == "SUB":
            result = cpu0 + cpu1
            cpu[3] = result
            break;
        case cmd == "MUL":
            result = cpu0 * cpu1
            cpu[3] = result
            break;
        case cmd == "INC":
            result = cpu0++
            cpu[3] = result
            break;
        case cmd == "DEC":
            result = cpu0--
            cpu[3] = result
            break;
        // Comparing
        case cmd == "AND":
            result = cpu0 == cpu1
            cpu[3] = result
            break;
        case cmd == "NOT":
            result = cpu0 !== cpu1
            cpu[3] = result
            break;
        case cmd == "LTH":
            result = cpu0 < cpu1
            cpu[3] = result
            break;
        case cmd == "MTH":
            result = cpu0 > cpu1
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
            if(cpu3) {pointer = adress}
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

let runElement = document.querySelector("#run")
runElement.addEventListener("click", function() {
    simulate()
})