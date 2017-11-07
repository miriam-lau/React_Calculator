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

  handleClick(i) {
    console.log("HANDLE CLICK", i);
    let newDisplayValue = this.state.displayValue;

    if (i === 'AC') {
      newDisplayValue = "";
      this.setState({ displayValue: newDisplayValue });
      return;
    }

    // need to handle multiple operations
    if (i === '=') {
      let chars = this.state.displayValue.split("");
      let startIndex = 0;
      let result = null;
      let num1 = null;
      let num2 = null;
      let operation = null;
      for (let i = 0; i < chars.length; i++) {
        if (num1 === null && (chars[i] === '/' || chars[i] === 'x' ||
            chars[i] === '-' || chars[i] === '+')) {
          num1 = parseFloat(chars.slice(startIndex, i));
          operation = chars[i];
          startIndex = i + 1;
        }
      }
      num2 = parseFloat(chars.slice(startIndex, chars.length));
      result = this.calculateResult(num1, num2, operation);

      newDisplayValue = result.toString();
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
