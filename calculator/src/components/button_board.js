import React, { Component } from 'react';
import Button from './button';

import { BUTTONS } from '../buttons_enum';

class ButtonBoard extends Component {
  /**
    * Returns a Button Component
    * @param {@enum button}
  */
  renderButton(button) {
    return(
      <Button
        value={ button }
        onClick={ this.props.onClick }
      />
    );
  }

  render() {
    return (
      <div>
        <div className="button-row">
          { this.renderButton(BUTTONS.CLEAR) }
          { this.renderButton(BUTTONS.SIGN) }
          { this.renderButton(BUTTONS.PERCENT) }
          { this.renderButton(BUTTONS.DIVIDE) }
        </div>
        <div className="button-row">
          { this.renderButton(BUTTONS.SEVEN) }
          { this.renderButton(BUTTONS.EIGHT) }
          { this.renderButton(BUTTONS.NINE) }
          { this.renderButton(BUTTONS.MULTIPLY) }
        </div>
        <div className="button-row">
          { this.renderButton(BUTTONS.FOUR) }
          { this.renderButton(BUTTONS.FIVE) }
          { this.renderButton(BUTTONS.SIX) }
          { this.renderButton(BUTTONS.SUBTRACT) }
        </div>
        <div className="button-row">
          { this.renderButton(BUTTONS.ONE) }
          { this.renderButton(BUTTONS.TWO) }
          { this.renderButton(BUTTONS.THREE) }
          { this.renderButton(BUTTONS.ADD) }
        </div>
        <div className="button-row">
          { this.renderButton(BUTTONS.ZERO) }
          { this.renderButton(BUTTONS.DECIMAL_POINT) }
          { this.renderButton(BUTTONS.EQUAL) }
        </div>
      </div>
    );
  }
}

export default ButtonBoard;
