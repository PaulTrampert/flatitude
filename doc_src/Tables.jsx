import React from 'react';
import Button from '../src/buttons/Button.jsx';
import Th from '../src/list/Th.jsx';

const data = new Array(100).fill(0).map(() =>({
  id: Math.random().toString(36).substring(2,7),
  number: Math.floor(Math.random() * 100),
}));

class Tables extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: data,
      sortDirection: '',
      sortBy: ''
    };
  }

  handleSort = (direction, name) => {
    let {
      data
    } = this.state;
    let newData = data.splice(0, data.length).sort((a, b) => {
      if (a[name] < b[name]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[name] > b[name]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    this.setState({
      data: newData,
      sortDirection: direction,
      sortBy: name
    });
  }

  render() {
    let {
      sortDirection,
      sortBy,
      data
    } = this.state;
    return (
      <div>
        <h1>Tables</h1>
        <table>
          <thead>
            <tr>
              <Th sortDirection={sortBy === 'id' ? sortDirection : ''} name="id" onSort={this.handleSort}>Id</Th>
              <Th className="right" sortDirection={sortBy === 'number' ? sortDirection : ''} name="number" onSort={this.handleSort}>Number</Th>
              <Th className="center">Action</Th>
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