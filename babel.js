const fs = require('fs');
const parser = require("@babel/parser")
const traverse = require("@babel/traverse").default
const generator = require("@babel/generator").default
const types = require("@babel/types");


const code = fs.readFileSync("source_code.js", "utf-8");
//convert code to AST (Abstract Syntax Tree)
let ast = parser.parse(code);

//Changing what is needed
const changeOperatorVistor = {
    // BinaryExpression(path) {
    //     if (path.node.operator == '+') {
    //         path.node.operator = '*'
    //         return;
    //     }
    //     else {
    //         return;
    //     }
    // },
    // Identifier(path) {
    //     if (path.node.name == "step1") {
    //         path.node.name = 'concat'
    //     }
    //     else {
    //         return;
    //     }

    // }
  VariableDeclarator(path) {
    const init = path.node.init;

    if (types.isBinaryExpression(init) && init.operator === '+') {
      // Replace '+' with '*'
      // init.operator = '*';

      // Optionally rename variable
      path.node.id.name = 'concat';
    }
  }
};

//Traversing the tree
traverse(ast, changeOperatorVistor)

//Generating the code from the updated tree
let finalCode = generator(ast).code;

console.log(finalCode)
