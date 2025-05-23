## Arithmetic functions - Always adds, subtracts or multiplies register 00 to register 01 uses the register pointer to choose the output register. in the case of increment or decrement the register pointer is used to choose the register that gets incremented / decremented
- ADD addition
- SUB subtraction
- MUL multiplication
- INC increment
- DEC decrement
## Comparative functions - compares the first and second register and outputs a 1 in the register pointed to with the register pointer if comparation is true.
- AND if reg1 and reg2 are the same
- NOT if reg1 and reg2 are not the same
- MTH if reg1 is more than reg2
- LTH if reg1 is less than reg2
## Memory operations
- CPR copies data from the specified memory adress to the specified register
- CPA copies data from the specified register to the specified memory adress.
- JMP jumps to a specific place in memory using the memory pointer
- CJP conditional jump, jumps to the specified memory adress if the data in the specified register is 1.
- CLR clears a specific CPU register
