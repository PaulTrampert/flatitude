import React from 'react';
import {Checkbox} from '../src/flatitude.js';

function Forms() {
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
    </div>
  );
}

export default Forms;