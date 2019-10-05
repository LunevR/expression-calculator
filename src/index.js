function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.replace(/(\d)(\+|\-|\*|\/)(\d)/, '$1 $2 $3')
    expr = calculateInBrackets(expr)
    expr = calculateFIrstStepAction(expr)
    expr = calculateSecondStepAction(expr)

    return +expr
}

function calculateInBrackets(expr) {
    let match = expr.match(/\([^()]*\)/)

    if (match) {
        substr = match[0].replace(/\(|\)/g, '')
        substr = calculateFIrstStepAction(substr)
        substr = calculateSecondStepAction(substr)

        expr = expr.replace(match[0], substr)
        expr = calculateInBrackets(expr)
    } else {
        if (expr.match(/\(|\)/)) {
            throw 'ExpressionError: Brackets must be paired'
        }
    }

    return expr
}

function calculateFIrstStepAction(expr) {
    let action = expr.match(/\-?[0-9.\-e]+\s*(\*|\/)\s*\-?[0-9.e\-]+/)

    if (action) {
        let numbers = action[0].split(' ' + action[1] + ' ')

        switch (action[1]) {
            case '/':
                if (+numbers[1] === 0) {
                    throw 'TypeError: Division by zero.'
                }

                result = numbers[0] / numbers[1]
                break

            case '*':
                result = numbers[0] * numbers[1]
                break
        }

        expr = expr.replace(action[0], result)
        expr = expr.replace(/ - +-/g, ' + ')
        expr = calculateFIrstStepAction(expr)
    }

    return expr
}

function calculateSecondStepAction(expr) {
    let action = expr.match(/\-?[0-9.\-e]+\s*(\+|\-)\s*\-?[0-9.e\-]+/)

    if (action) {
        let numbers = action[0].split(' ' + action[1] + ' ')

        switch (action[1]) {
            case '+':
                result = +numbers[0] + +numbers[1]
                break

            case '-':
                if (numbers[0] === '') {
                    result = -numbers[1] - +numbers[2]
                } else {
                    result = +numbers[0] - +numbers[1]
                }
                break
        }

        expr = expr.replace(action[0], result)
        expr = expr.replace(/ - +-/g, ' + ')
        expr = calculateSecondStepAction(expr)
    }

    return expr
}

module.exports = {
    expressionCalculator
}
