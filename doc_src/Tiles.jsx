import React from 'react';
import Tile from '../src/list/Tile.jsx';

const defaultData = new Array(100).fill(1).map(() => ({
  body: Math.random().toString(36).substring(2, 7),
  isSelected: false
}));

class Tiles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [...defaultData]
    };
  }

  selectTile = (d, isSelected) => {
    let {
      data
    } = this.state;
    let newData = data.slice();
    newData[newData.indexOf(d)] = {
      ...d,
      isSelected
    };
    this.setState({
      data: newData
    });
  }

  render() {
    let {
      data
    } = this.state;

    return (
      <div>
        <h1>Tiles</h1>

        <div className="tile-list">
          {
            data.map(d => (
              <Tile
                key={d.body}
                onClick={() => alert(`${d.body} clicked`)}
                onSelect={isSelected => this.selectTile(d, isSelected)}
                actions={[
                  <a key="view">View</a>,
                  <a key="modify">Modify</a>,
                  <a key="delete">Delete</a>
                ]}
              >
                {d.body}
              </Tile>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Tiles;