1) What is the difference between var, let, and const?
=> *var can be redeclared, which sometimes causes unexpected bugs.
   *let can be reassigned, but not redeclared in the same scope.
   *is also block-scoped, but its value cannot be reassigned after initialization.

2) What is the difference between map(), forEach(), and filter()?
=>  *map() Loops through an array, transforms each item, and returns a
     new array of the same length.
    *forEach() Loops through an array but does not return anything
    *filter() Loops through an array and returns a new array with only   the items that pass a condition.

3) What are arrow functions in ES6?
=>  *Arrow functions in ES6 are a shorter way to write functions using 
     the => syntax. Also they are anonymous by default.

4) How does destructuring assignment work in ES6?
=>  *It works by matching the structure (keys or positions) of the source 
     data with the variables you define.

5) Explain template literals in ES6. How are they different from string  concatenation?
=>  *Template literals in ES6 are strings written with backticks ( ` ` ) 
    that allow embedding variables and expressions using ${...}.
    They also support multi-line strings without needing \n, making code more readable.
    The key difference from normal string concatenation is that template literals are more concise, cleaner, and readable when mixing text with variables or expressions.
    With concatenation, you must use + and quotes, which can get messy for complex strings.