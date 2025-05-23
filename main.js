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

let exportElement = document.querySelector("#exportBinary")
runElement.addEventListener("click", function() {
    exportCodeAsBinary()
})
// hello

function exportCodeAsIs() {
    let output = ""
    for(let i=0;i<memory.length;i++){
        output += memory[i] + "\n"
    }
    let blob = new Blob([output], {type: "text/plain"})
    let url = URL.createObjectURL(blob)
    let a = document.createElement("a")
    a.href = url
    a.download = "output.txt"
    a.click()
}

// converts any integer into a 16 bit binary string
function binary (key, length) {
    let binary = key
    binary = binary.toString(2)
    binary = binary.padStart(length, "0")
    return binary
}

function exportCodeAsBinary() {
    let output = []
    let blob = ""
    let isNumber = false
    for(let i=0;i<memory.length;i++){
        switch(true) {
            case memory[i][0] == "ADD":
                blob = "000001"
                break;
            case memory[i][0] == "SUB":
                blob = "000010"
                break;
            case memory[i][0] == "MUL":
                blob = "000011"
                break;
            case memory[i][0] == "INC":
                blob = "000100"
                break;
            case memory[i][0] == "DEC":
                blob = "000101"
                break;
            case memory[i][0] == "AND":
                blob = "000110"
                break;
            case memory[i][0] == "NOT":
                blob = "000111"
                break;
            case memory[i][0] == "LTH":
                blob = "001000"
                break;
            case memory[i][0] == "MTH":
                blob = "001001"
                break;
            case memory[i][0] == "CPR":
                blob = "001010"
                break;
            case memory[i][0] == "CPA":
                blob = "001011"
                break;
            case memory[i][0] == "JMP":
                blob = "001100"
                break;
            case memory[i][0] == "CJP":
                blob = "001101"
                break;
            case memory[i][0] == "CLR":
                blob = "001110"
                break;
            case memory[i][0] == "INV":
                blob = "001111"
                break;
            case memory[i][0] == "HLT":
                blob = "010000"
                break;
            default:
                blob = parseInt(memory[i])
                blob = binary(blob, 16)

                isNumber = true
                break;
        }

        if (isNumber != true) {
        let arg1 = parseInt(memory[i][1]) || 0
        let arg2 = parseInt(memory[i][2]) || 0
        blob += binary(arg1, 8)
        blob += binary(arg2, 2)
        }
        output.push(blob) 
    }
    document.querySelector("#output2").innerHTML = "machine code:" + output.join("\n")
    return output

    

}