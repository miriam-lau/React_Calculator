import React, { Component } from 'react';
import Button from './button';

class CalculatorButtons extends Component {
  renderButton(i) {
    const BUTTONS = this.props.BUTTONS;
    return(
      <Button
        index={ i }
        value={ BUTTONS[i] }
        onClick={ this.props.onClick }
      />
    );
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
        <div className="button-row">
          { this.renderButton(16) }
          { this.renderButton(17) }
          { this.renderButton(18) }
        </div>
      </div>
    );
  }
}

export default CalculatorButtons;
