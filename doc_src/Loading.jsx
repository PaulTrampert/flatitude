import React from 'react';
import Spinner from '../src/loading/Spinner.jsx';
import ProgressBar from '../src/loading/ProgressBar.jsx';
import LoadingField from '../src/loading/LoadingField.jsx';

function Loading() {
  return (
    <div>
      <h1>Loading States</h1>
      <dl>
        <dt>Spinner</dt>
        <dd><Spinner className="primary" /></dd>

        <dt>Progress Bar</dt>
        <dd><ProgressBar progress={1} total={2} type="primary" style={{width: '500px'}}/></dd>

        <dt>Loading Field</dt>
        <dd><LoadingField height={25} width={250}/></dd>
      </dl>
    </div>
  );
}

export default Loading;