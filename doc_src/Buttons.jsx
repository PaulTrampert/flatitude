import React from 'react';
import { ActionDropdown, DropdownButton } from '../src/flatitude.js';

function Buttons() {
  return (
    <div>
      <h1>Buttons</h1>
      <h2>Default</h2>
      <div style={{display: 'inline'}}>
        <button>Default</button>
        <button disabled={true}>Disabled</button>
      </div>
      <h2>Primary</h2>
      <div style={{display: 'inline'}}>
        <button className="primary">Primary</button>
        <button className="primary" disabled={true}>Disabled</button>
      </div>
      <h2>Danger</h2>
      <div style={{display: 'inline'}}>
        <button className="danger">Danger</button>
        <button className="danger" disabled={true}>Disabled</button>
      </div>

      <h2>Not Technically a button</h2>
      <div style={{display: 'inline'}}>
        <a className="btn">Link</a>
        <a className="btn" disabled={true}>Link</a>
      </div>

      <h2>Dropdown Buttons</h2>
      <DropdownButton type="primary" title="Click Me">
        <a href="">Menu Item 1</a>
        <hr/>
        <a href="">Menu Item 2</a>
        <a href="">Menu Item 3</a>
      </DropdownButton>

      <ActionDropdown type="danger" title="Action Dropdown">
        <a href="" onClick={() => alert('')}>Menu Item 1</a>
        <hr/>
        <a href="">Menu Item 2</a>
        <a href="">Menu Item 3</a>
      </ActionDropdown>
    </div>
  );
}

export default Buttons;