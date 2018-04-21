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
        <div className="form-fields">
          <label>Basic Input</label>
          <div className="input-group">
            <input />
            <div className="help">
              <div>This is a basic input field</div>
            </div>
          </div>

          <label>Validated Input</label>
          <div className="input-group">
            <input />
            <div className="help">
              <div className="success">This field has passed validation.</div>
            </div>
          </div>

          <label>Warning Input</label>
          <div className="input-group">
            <input />
            <div className="help">
              <div>Warnings should come after basic help text</div>
              <div className="warning">This field has a warning.</div>
            </div>
          </div>

          <label>Invalid Input</label>
          <div className="input-group invalid">
            <input />
            <div className="help">
              <div>Warnings should come after basic help text</div>
              <div className="danger">This field is invalid.</div>
            </div>
          </div>
          <Checkbox>This is a checkbox</Checkbox>
          <Checkbox disabled>This is a disabled checkbox</Checkbox>
          <Checkbox indeterminate>This is an indeterminate checkbox</Checkbox>

          <RadioButton name="demo" value="value1" onChange={value => this.setState({radioSelection: value})}>Here&#39;s a radio button</RadioButton>
          <RadioButton name="demo" value="value2" onChange={value => this.setState({radioSelection: value})}>Here&#39;s another radio button</RadioButton>
          <RadioButton name="anotherdemo" disabled>Here&#39;s a disabled radio button</RadioButton>
          <RadioButton name="anotherdemo" disabled selected>Here&#39;s a disabled radio button</RadioButton>
        </div>
      </div>
    );
  }
}

export default Forms;