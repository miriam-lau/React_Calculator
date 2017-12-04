import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ButtonBoard from './components/button_board';
import { BUTTONS } from './buttons_enum';

/**
 *Array of valid key char codes.
 */
const VALID_KEY_CHARCODES = ['%', '+', '-', '*', '/', '.', '0', '1', '2', '3',
    '4', '5', '6', '7', '8', '9', "Shift", "Enter", "Backspace"];


class App extends Component {
  constructor(props) {
    super(props)

    this.state = { displayValue: "", isNeg: false }
  }

  /**
   * Converts chars to floats.
   * @param {char[]} chars
   * @return {Array.<float|char>} calculationSequence
   */
  getCalculationSequence(chars) {
    let startIndex = 0;
    let sequence = [];

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
        // Doing isNeg check here and then set state to false here does not work
        sequence.push(num);
        startIndex = i + 1;
      }

      if (operation !== null) {
        sequence.push(operation);
      }
    }

    if (startIndex !== chars.length) {
      sequence.push(
        parseFloat(chars.slice(startIndex, chars.length).join(""))
      );
    }

    if (this.state.isNeg) {
      sequence[0] *= -1;
    }

    // Set state here works.
    this.setState({ isNeg: false });
    return sequence;
  }

  /**
   * Calculates the result from the sequence.
   * @param {Array.<float|char>} calculationSequence
   * @return {float} num1
   */
  calculateResult(sequence) {
    // Handle division and multiplication first
    let i = 0;
    let arr = [];
    while (i < sequence.length) {
      let num1 = sequence[i];

      if (i === sequence.length - 1) {
        arr.push(num1);
        break;
      }

      let operation = sequence[i + 1];
      if (operation === BUTTONS.ADD || operation === BUTTONS.SUBTRACT) {
        arr.push(num1, operation);
        i += 2;
        continue;
      }

      let num2 = sequence[i + 2];
      sequence[i + 2] = this.handleOperation(num1, num2, operation);
      i += 2;
    }

    // Handle addition and subtraction
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
   * Computes a math operation.
   * @param {float} num1
   * @param {float} num2
   * @param {char} math operation
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
   * Checks if there are invalid chars at the beginning or end of char Array.
   * @param {char[]} chars
   * @return {boolean}
   */
  checkErrors(chars) {
    if (!Number.isInteger(parseInt(chars[0], 10)) ||
        (chars[chars.length - 1] === BUTTONS.PERCENT &&
            !Number.isInteger(parseInt(chars[chars.length - 2], 10))) ||
        (chars[chars.length - 1] !== BUTTONS.PERCENT &&
            !Number.isInteger(parseInt(chars[chars.length - 1], 10)))) {
      return true;
    }
    return false;
  }

  /**
   * Handles keyboard input.
   * @param {event{char}} key - char code for key
   */
  handleKeyPress(event) {
    let key = event.key;
    let hasKey = false;
    for (let i = 0; i < VALID_KEY_CHARCODES.length; i++) {
      if (key === VALID_KEY_CHARCODES[i]) {
        hasKey = true;
        break;
      }
    }

    if (!hasKey) {
      this.setState({ displayValue: "Error", isNeg: false });
      return;
    }

    let newDisplayValue = this.state.displayValue;

    if (key === '*') {
      key = 'x';
    } else if (key === '-' && newDisplayValue === "") {
      this.setState({ isNeg: true });
      return;
    } else if (key === "Shift") {
      return;
    } else if (key === "Backspace") {
      newDisplayValue = "";
      this.setState({ displayValue: newDisplayValue, isNeg: false });
      return;
    }

    if (this.state.displayValue === "Error") {
      newDisplayValue = "";
    }

    if (key !== "Enter") {
      newDisplayValue += key.toString();
    } else {
      let chars = this.state.displayValue.split("");

      if (this.checkErrors(chars)) {
        this.setState({ displayValue: "Error", isNeg: false });
        return;
      }

      let calculationSequence = this.getCalculationSequence(chars);
      newDisplayValue = calculationSequence.length > 2 ?
          this.calculateResult(calculationSequence).toString() :
          calculationSequence[0].toString();
    }

    this.setState({ displayValue: newDisplayValue });
  }

  /**
   * Handles the click event of a button.
   * @param {@enum} button
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

      if (this.checkErrors(chars)) {
        this.setState({ displayValue: "Error", isNeg: false });
        return;
      }

      let calculationSequence = this.getCalculationSequence(chars);
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
          <input className="calculator-display"
            onKeyUp={ event => this.handleKeyPress(event) }
            value={ this.state.isNeg ?
                `-${this.state.displayValue}` : this.state.displayValue }
          />
          <ButtonBoard
            onClick={ (i) => this.handleClick(i) }/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
