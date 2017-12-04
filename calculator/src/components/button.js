import React from 'react';

const Button = (props) => {
  let zeroClassName = "";
  if (props.value === '0') {
    zeroClassName = "zero-button";
  }
  return (
    // why need an callback for the onClick function?
    // either need a callback, or pass in button in ButtonBoard, then:
    //  in ButtonBoard: onClick={ (e) => this.props.onClick(button) }
    //  in Button: onClick={ props.onClick }
    <div className={"button " + zeroClassName}
        onClick={ () => props.onClick(props.value) }>
      {props.value}
    </div>
  );
}

export default Button;
