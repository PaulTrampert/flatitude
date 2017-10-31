import React from 'react';

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
    </div>
  )
}

export default Buttons;