import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CalculatorButtons from './components/calculator_buttons';

import { BUTTONS } from './buttons_enum';

  // should allow keyboard input
class App extends Component {
  constructor(props) {
    super(props)

    this.state = { displayValue: "", isNeg: false }
  }

  /**
    * Converts chars to floats or keep the char if it is an operation
    * @param {array[char] chars}
    * @return {array[float or char] calculationSequence}
  */
  getCalculationString(chars) {
    let startIndex = 0;
    let calculationSequence = [];

    for (let i = 0; i < chars.length; i++) {
      let num = "";
      let operation = null;
      if (chars[i] === BUTTONS.DIVIDE || chars[i] === BUTTONS.MULTIPLY ||
          chars[i] === BUTTONS.SUBTRACT || chars[i] === BUTTONS.ADD) {
        if (startIndex !== i) {
          num = parseFloat(chars.slice(startIndex, i).join(""));
        }
        operation = chars[i];
      } else if (chars[i] === BUTTONS.PERCENT) {
        if (startIndex !== i) {
          num = parseFloat(chars.slice(startIndex, i).join("")) / 100.00;
        }
      }

      if (num !== "") {
        calculationSequence.push(num);
        startIndex = i + 1;
      }

      if (operation !== null) {
        calculationSequence.push(operation);
      }
    }

    if (startIndex !== chars.length) {
      calculationSequence.push(
        parseFloat(chars.slice(startIndex, chars.length).join(""))
      );
    }

    if (this.state.isNeg) {
      calculationSequence[0] *= -1;
    }

    this.setState({ isNeg: false });
    return calculationSequence;
  }

  /**
    * Calculates the result from the input array.
    * @param {array[float or char] calculationSequence}
    * @return {float num1}
  */
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
      if (operation === BUTTONS.ADD || operation === BUTTONS.SUBTRACT) {
        arr.push(num1, operation);
        i += 2;
        continue;
      }

      let num2 = calculationSequence[i + 2];
      calculationSequence[i + 2] = this.handleOperation(num1, num2, operation);
      i += 2;
    }

    // handle addition and subtraction
    let num1 = arr[0];
    let operation = null;
    let num2 = null;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] === BUTTONS.ADD || arr[i] === BUTTONS.SUBTRACT) {
        operation = arr[i];
        continue;
      }

      num2 = arr[i];
      let result = this.handleOperation(num1, num2, operation);
      num1 = result;
    }

    return num1;
  }

  /**
    * Performs a math operation
    * @param {float num1}
    * @param {float num2}
    * @param {char operation}
    * @return {?float}
  */
  handleOperation(num1, num2, operation) {
    switch (operation) {
      case BUTTONS.ADD:
        return num1 + num2;
      case BUTTONS.SUBTRACT:
        return num1 - num2;
      case BUTTONS.MULTIPLY:
        return num1 * num2;
      case BUTTONS.DIVIDE:
        return num1 / num2;
      default:
        return null;
    }
  }

  /**
    * Handles on click of a button
    * @param {@enum button}
  */
  handleClick(button) {
    let newDisplayValue = this.state.displayValue;
    if (this.state.displayValue === "Error") {
      newDisplayValue = "";
    }

    if (button === BUTTONS.SIGN) {
      if (this.state.isNeg) {
        this.setState({ isNeg: false })
      } else {
        this.setState({ isNeg: true })
      }
      return;
    }

    if (button === BUTTONS.CLEAR) {
      newDisplayValue = "";
      this.setState({ displayValue: newDisplayValue, isNeg: false });
      return;
    }

    if (button !== BUTTONS.EQUAL) {
      newDisplayValue += button.toString();
    } else {
      let chars = this.state.displayValue.split("");

      // error handling if beginning or end of char Array has invalid chars
      if (!Number.isInteger(parseInt(chars[0], 10)) ||
          (chars[chars.length - 1] === BUTTONS.PERCENT &&
              !Number.isInteger(parseInt(chars[chars.length - 2], 10))) ||
          (chars[chars.length - 1] !== BUTTONS.PERCENT &&
              !Number.isInteger(parseInt(chars[chars.length - 1], 10)))) {
        this.setState({ displayValue: "Error", isNeg: false });
        return;
      }

      let calculationSequence = this.getCalculationString(chars);
      newDisplayValue = calculationSequence.length > 2 ?
          this.calculateResult(calculationSequence).toString() :
          calculationSequence[0].toString();
    }

    this.setState({ displayValue: newDisplayValue });
  }

  render() {
    return (
      <div className="app-container">
        <h1>Basic Calculator</h1>
        <div className="calculator-container">
          <section className="calculator-display">
            { this.state.isNeg ? `-${this.state.displayValue}` : this.state.displayValue }
          </section>
          <CalculatorButtons
            onClick={ (i) => this.handleClick(i) }/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
