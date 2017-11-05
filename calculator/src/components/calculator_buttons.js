import React, { Component } from 'react';
import Button from './button';

const BUTTONS = ['7', '8', '9', '/', '4', '5', '6', 'x', '1', '2', '3', '-',
    '0', '.', '=', '+'];

class CalculatorButtons extends Component {
  renderButton(i) {
    return(
      <Button
        index={ i }
        value={ BUTTONS[i] }
      />
    );
  }

  renderCalculatorRow(startIndex, endIndex) {
    for (let i = startIndex; i <= endIndex; i++) {
      this.renderButton(i, BUTTONS[i]);
    }
    // how to return with 3 buttons?
  }

  render() {
    return (
      <div>
        <div className="button-row">
          { this.renderButton(0) }
          { this.renderButton(1) }
          { this.renderButton(2) }
          { this.renderButton(3) }
        </div>
        <div className="button-row">
          { this.renderButton(4) }
          { this.renderButton(5) }
          { this.renderButton(6) }
          { this.renderButton(7) }
        </div>
        <div className="button-row">
          { this.renderButton(8) }
          { this.renderButton(9) }
          { this.renderButton(10) }
          { this.renderButton(11) }
        </div>
        <div className="button-row">
          { this.renderButton(12) }
          { this.renderButton(13) }
          { this.renderButton(14) }
          { this.renderButton(15) }
        </div>
      </div>
    );
  }
}

export default CalculatorButtons;
