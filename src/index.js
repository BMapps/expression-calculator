function eval() {
    // Do not use eval!!!
    return;
}
const LinkedList = require('./linked-list');
function expressionCalculator(expr) {
    for (let i=0;i<expr.length;i++){
        if (expr.charAt(i)==" ") {
            expr=expr.substring(0,i)+expr.substring(i+1,expr.length); 
            i--;  
        }     
    }
    let openingBracketStack=new LinkedList();
    let startLength=expr.length;
    for (let i=0; i<expr.length;i++){
        if (expr.charAt(i)=="(") openingBracketStack.append(i);
        if (expr.charAt(i)==")") {
            if (openingBracketStack.isEmpty()) throw new Error("ExpressionError: Brackets must be paired");
            expr=expr.substring(0 , openingBracketStack.tail())+
            process(expr.substring(openingBracketStack.tail()+1, i))+
            expr.substring(i+1,expr.length);
            openingBracketStack.deleteAt(openingBracketStack.length-1);
            if (expr.length!=startLength){
                i-=startLength-expr.length;
                startLength=expr.length;
            }
        }    
    
    }
    if (!openingBracketStack.isEmpty()) throw new Error("ExpressionError: Brackets must be paired");
    expr=process(expr);
    if (expr%1==0)return Number(expr);
    expr=parseFloat(expr).toFixed(4);
    for(let i=-3;i<0;i++)
    if (expr%10**i==0) expr=parseFloat(expr).toFixed(-i);
    return Number(expr);
    
}

function process(expression){
    console.log(expression);
    let nonNumberStack=new LinkedList();
    nonNumberStack.append(-1);
    let startLength=expression.length;
    
    for (let i=1;i<expression.length;i++){       
        if (check(expression)) return expression;
        if (!Number(expression.charAt(i))&&expression.charAt(i)!="."&&expression.charAt(i)!="0") nonNumberStack.append(i);
        if (expression.charAt(i)=="*"){
            nonNumberStack.deleteAt(nonNumberStack.length-1);
            expression=evaluate(expression, nonNumberStack.tail(),i, multiply);   
        }else if (expression.charAt(i)=="/"){
            nonNumberStack.deleteAt(nonNumberStack.length-1);
            expression=evaluate(expression, nonNumberStack.tail(),i, divide);    
        } 
        if (startLength!=expression.length){            
            i-=startLength-expression.length;
            startLength= expression.length;  
        }       
    }
    for (let i=1;i<expression.length;i++){
        if (check(expression)) return expression;
        if (expression.charCodeAt(i)=="+".charCodeAt(0)){
            expression=evaluate(expression, -1,i, sum);   
        } else if (expression.charAt(i)=="-"){  
            expression=evaluate(expression, -1,i, subtraction);            
        }
        if (startLength!=expression.length){            
            i-=startLength-expression.length;
            startLength=expression.length;  
        }
           
    }
    return expression;
}
function evaluate(expression, lastNonNumber,i,  operation ){
    let nextNonNumber=i+2;
    while((Number( expression.charAt(nextNonNumber))||expression.charAt(nextNonNumber)=="."||
        expression.charAt(nextNonNumber)=="0"||expression.charAt(nextNonNumber)=="e")
        &&nextNonNumber<expression.length) nextNonNumber++;
    return expression.substring(0, lastNonNumber+1) + 
    operation(expression.substring(lastNonNumber+1, i), expression.substring(i+1, nextNonNumber)) + 
    expression.substring(nextNonNumber, expression.length);
}
function multiply(a, b){
    return Number(a)*Number(b);
}
function divide(a, b){
    if (b==0) {
        throw new Error("TypeError: Division by zero.");
    }
     return parseFloat(Number(a)/Number(b)).toFixed(15);
}
function sum(a, b){
    return Number(a)+Number(b);
}
function subtraction(a, b){
    return Number(a)-Number(b);
}
function check(expr){
    return (Number(expr));
}

module.exports = {
    expressionCalculator
}