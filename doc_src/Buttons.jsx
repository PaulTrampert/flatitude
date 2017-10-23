import React from 'react';
import Button from '../src/Button.jsx';

function Buttons() {
  return (
    <div>
      <h1>Buttons</h1>
      <h2>Default</h2>
      <div style={{display: 'inline'}}>
        <Button>Default</Button>
        <Button disabled={true}>Disabled</Button>
      </div>
      <h2>Primary</h2>
      <div style={{display: 'inline'}}>
        <Button type="primary">Primary</Button>
        <Button type="primary" disabled={true}>Disabled</Button>
      </div>
      <h2>Danger</h2>
      <div style={{display: 'inline'}}>
        <Button type="danger">Danger</Button>
        <Button type="danger" disabled={true}>Disabled</Button>
      </div>
    </div>
  )
}

export default Buttons;