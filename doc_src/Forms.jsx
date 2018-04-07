import React from 'react';
import {Checkbox, RadioButton} from '../src/flatitude.js';

class Forms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      radioSelection: '',
    };
  }

  render() {
    return (
      <div>
        <h1>Forms</h1>
        <h2>Basic Inputs</h2>
        <div className="input-group">
          <label>Basic Input</label>
          <input />
          <div className="help">This is a basic form field</div>
        </div>
        <div className="input-group invalid">
          <label>Invalid Input</label>
          <input />
          <div className="help">
            <div className="error">This field is invalid</div>
            <div className="error">Another error</div>
          </div>
        </div>

        <h2>Checkbox</h2>
        <Checkbox>This is a checkbox</Checkbox>
        <Checkbox disabled>This is a disabled checkbox</Checkbox>
        <Checkbox indeterminate>This is an indeterminate checkbox</Checkbox>

        <h2>Radio Buttons</h2>
        <div>
          <strong>Selected Value:</strong> {this.state.radioSelection}
        </div>
        <RadioButton name="demo" value="value1" onChange={value => this.setState({radioSelection: value})}>Here&#39;s a radio button</RadioButton>
        <RadioButton name="demo" value="value2" onChange={value => this.setState({radioSelection: value})}>Here&#39;s another radio button</RadioButton>
        <RadioButton name="anotherdemo" disabled>Here&#39;s a disabled radio button</RadioButton>
        <RadioButton name="anotherdemo" disabled selected>Here&#39;s a disabled radio button</RadioButton>
      </div>
    );
  }
}

export default Forms;