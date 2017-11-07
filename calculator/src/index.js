import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CalculatorButtons from './components/calculator_buttons';

// have a enum in another file and have that accessible to index and calculator button
const BUTTONS = ['AC', '+/-', '%', '/', '7', '8', '9', 'x', '4', '5', '6', '-',
    '1', '2', '3', '+', '0', '.', '='];

const OPERATIONS = {
  ADD: '+',
  SUBTRACT: '-',
  MULTIPLY: 'x',
  DIVIDE: '/'
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { displayValue: ""}
  }

  handleOperation(num1, num2, operation) {
    switch (operation) {
      case OPERATIONS.ADD:
        return num1 + num2;
      case OPERATIONS.SUBTRACT:
        return num1 - num2;
      case OPERATIONS.MULTIPLY:
        return num1 * num2;
      case OPERATIONS.DIVIDE:
        return num1 / num2;
      default:
        return null;
    }
  }

  calculateResult(calculationSequence) {
    // handle division and multiplication first
    let i = 0;
    let arr = [];

    while (i < calculationSequence.length) {
      let num1 = calculationSequence[i];

      if (i === calculationSequence.length - 1) {
        arr.push(num1);
        break;
      }

      let operation = calculationSequence[i + 1];
      if (operation === '+' || operation === '-') {
        arr.push(num1, operation);
        i += 2;
        continue;
      }

      let num2 = calculationSequence[i + 2];

      calculationSequence[i + 2] = this.handleOperation(num1, num2, operation);
      i += 2;
    }

    console.log("NEW CALC SEQ", arr);

    // handle addition and subtraction
    let num1 = arr[0];
    let operation = null;
    let num2 = null;

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] === '+' || arr[i] === '-') {
        operation = arr[i];
        continue;
      }

      num2 = arr[i];

      let result = this.handleOperation(num1, num2, operation);
      num1 = result;
    }

    console.log("RESULT", num1);
    return num1;
  }

  // should allow keyboard input
  handleClick(i) {
    console.log("HANDLE CLICK", i);
    let newDisplayValue = this.state.displayValue;

    if (i === 'AC') {
      newDisplayValue = "";
      this.setState({ displayValue: newDisplayValue });
      return;
    }

    // what happens when there is a starting or trailing operation?
    // write a unit test for calculate function
    // formats display value in state
    if (i !== '=') {
      newDisplayValue += i.toString();
    } else {
      let chars = this.state.displayValue.split("");

      let isNeg = false;
      if (chars[0] === '-') {
        isNeg === true;
        chars = chars.slice(1);
      }

      let startIndex = 0;
      let calculationSequence = [];

      for (let i = 0; i < chars.length; i++) {
        // create toggle for +/-
        // handle %
        let num = "";
        let operation = null;
        if (chars[i] === '/' || chars[i] === 'x' ||
        chars[i] === '-' || chars[i] === '+') {
          num = parseFloat(chars.slice(startIndex, i).join(""));

          if (isNeg) {
            num *= -1;
            isNeg = false;
          }

          operation = chars[i];
          startIndex = i + 1;
          calculationSequence.push(num, operation);
        }
      }

      calculationSequence.push(parseFloat(chars.slice(startIndex, startIndex.length).join("")));
      console.log("CALCULATION SEQ", calculationSequence);

      newDisplayValue = this.calculateResult(calculationSequence).toString();
    }

    this.setState({ displayValue: newDisplayValue });
  }

  render() {
    return (
      <div className="app-container">
        <h1>Basic Calculator</h1>
        <div className="calculator-container">
          <section className="calculator-display">
            { this.state.displayValue }
          </section>
          <CalculatorButtons
            BUTTONS={ BUTTONS }
            onClick={ (i) => this.handleClick(i) }/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
