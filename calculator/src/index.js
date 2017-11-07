import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CalculatorButtons from './components/calculator_buttons';

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

  calculateResult(num1, num2, operation) {
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
    if (i === '=') {
      let chars = this.state.displayValue.split("");
      let sign = null;
      let startIndex = 0;
      let calculationSequence = [];
      console.log("CHARS", chars);
      for (let i = 0; i < chars.length; i++) {
        // need to handle negative numbers
        let num = "";
        let operation = null;
        if (chars[i] === '/' || chars[i] === 'x' ||
            chars[i] === '-' || chars[i] === '+') {
          num = chars.slice(startIndex, i).join("");
          operation = chars[i];
          startIndex = i + 1;
          calculationSequence.push (num, operation);
        }
      }

      calculationSequence.push(chars.slice(startIndex, startIndex.length).join(""));
      console.log("CALCULATION SEQ", calculationSequence);

      // should respect order of operations
      // how to evaluate or algorithm math order of operations
      let num1 = parseFloat(calculationSequence[0]);
      let i = 1;
      while (i < calculationSequence.length - 1) {
        console.log("RESULT i", i);
        let operation = calculationSequence[i];
        let num2 = parseFloat(calculationSequence[i + 1]);
        console.log("NUM2", num2);
        let result = this.calculateResult(num1, num2, operation);
        i += 2
        num1 = result;
      }

      console.log("RESULT", num1);
      newDisplayValue = num1.toString();
      this.setState({ displayValue: newDisplayValue });
    }

    if (i !== '=') {
      newDisplayValue += i.toString();
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
