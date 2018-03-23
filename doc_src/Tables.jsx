import React from 'react';
import Button from '../src/buttons/Button.jsx';

const data = new Array(100).fill(0).map(() =>({
  id: Math.random().toString(36).substring(2,7),
  number: Math.floor(Math.random() * 100),
}));

class Tables extends React.Component {
  render() {
    return (
      <div>
        <h1>Tables</h1>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th className="right">Number</th>
              <th className="center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map(d => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td className="right">{d.number}</td>
                <td className="center"><Button type="danger"><i className="fa fa-trash"></i></Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Tables;