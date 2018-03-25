import React from 'react';
import Spinner from '../src/loading/Spinner.jsx';

function Loading() {
  return (
    <div>
      <h1>Loading States</h1>
      <dl>
        <dt>Spinner</dt>
        <dd><Spinner /></dd>
      </dl>
    </div>
  );
}

export default Loading;