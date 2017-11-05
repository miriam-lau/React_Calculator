import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CalculatorButtons from './components/calculator_buttons';



class App extends Component {
  render() {
    return (
      <div>
        <h1>Basic Calculator</h1>
        <div className="calculator-container">
          <section className="calculator-display">Calculator Display</section>
          <CalculatorButtons />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
