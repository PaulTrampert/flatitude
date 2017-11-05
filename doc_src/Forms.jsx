import React from 'react';

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
        <div className="help">This field is invalid</div>
      </div>
    </div>
  );
}

export default Forms;