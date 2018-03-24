import React from 'react';

const data = new Array(100).fill(1).map(() => Math.random().toString(36).substring(2, 7));

class Tiles extends React.Component {
  render() {
    return (
      <div>
        <h1>Tiles</h1>

        <div className="tile-list">
          {
            data.map(d => <div className="tile">{d}</div>)
          }
        </div>
      </div>
    );
  }
}

export default Tiles;