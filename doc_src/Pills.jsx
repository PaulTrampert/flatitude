import React from 'react';
import {Pill} from '../src/flatitude.js';

function Pills() {
  return (
    <div>
      <h1>Pills</h1>
      <Pill type="info">Info Pill</Pill>
      <Pill type="warning">Warning Pill</Pill>
      <Pill type="danger">Danger Pill</Pill>
      <Pill type="success">Success Pill</Pill>
      <Pill type="primary">Primary Pill</Pill>
    </div>
  );
}

export default Pills;