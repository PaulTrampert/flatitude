import React from 'react';
import Th from '../src/list/Th.jsx';
import PagingControls from '../src/list/PagingControls.jsx';
import SearchBox from '../src/list/SearchBox.jsx';

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
      sortBy: '',
      offset: 0,
      size: 10,
      pendingSearchTerm: '',
      searchTerm: ''
    };
  }

  handleSearchTermChange = (searchTerm) => {
    this.setState({
      pendingSearchTerm: searchTerm
    });
  }

  handleSearch = () => {
    this.setState({
      searchTerm: this.state.pendingSearchTerm,
      offset: 0,
    });
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
      sortBy: name,
      offset: 0,
    });
  }

  handlePageSelected = (offset, size) => {
    this.setState({
      offset,
      size
    });
  }

  render() {
    let {
      sortDirection,
      sortBy,
      data,
      offset,
      size,
      pendingSearchTerm,
      searchTerm
    } = this.state;

    let searchedData = data.filter(d => d.id.includes(searchTerm));
    let pagedData = searchedData.slice(offset, offset + size);
    return (
      <div>
        <h1>Tables</h1>
        <div>
          <SearchBox value={pendingSearchTerm} onChange={this.handleSearchTermChange} onSearch={this.handleSearch} autosearch style={{float: 'right', width: '500px'}}/>
        </div>
        <table>
          <thead>
            <tr>
              <Th sortDirection={sortBy === 'id' ? sortDirection : ''} name="id" onSort={this.handleSort}>Id</Th>
              <Th className="right" sortDirection={sortBy === 'number' ? sortDirection : ''} name="number" onSort={this.handleSort}>Number</Th>
              <Th className="center">Action</Th>
            </tr>
          </thead>
          <tbody>
            {
              pagedData
                .map(d => (
                  <tr key={d.id}>
                    <td>{d.id}</td>
                    <td className="right">{d.number}</td>
                    <td className="center"><button className="danger"><i className="fa fa-trash"></i></button></td>
                  </tr>
                ))
            }
          </tbody>
        </table>
        <PagingControls offset={offset} size={size} total={searchedData.length} onPageSelected={this.handlePageSelected} />
      </div>
    );
  }
}

export default Tables;