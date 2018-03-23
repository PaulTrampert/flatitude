import React from 'react';
import Button from '../src/buttons/Button.jsx';

const data = new Array(100).map(() =>({
  id: Math.random().toString(36).substring(2,7),
  number: Math.floor(Math.random()),
}))

class Tables extends React.Component {
  render() {
    return (
      <div>
        <h1>Tables</h1>
        <table>
          <thead>
            <th>Id</th>
            <th>Number</th>
            <th>Action</th>
          </thead>
          <tbody>
            {data.map(d => (
              <tr>
                <td>{d.id}</td>
                <td>{d.number}</td>
                <td><Button type="danger"><i className="fa fa-trash"></i></Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Tables;