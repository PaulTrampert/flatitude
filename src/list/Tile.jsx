import React from 'react';
import PropTypes from 'prop-types';
import DropdownArea from '../util/DropdownArea.jsx';

class Tile extends React.Component {
  render() {
    let {
      actions,
      children,
      onSelect
    } = this.props;

    return (
      <div className="tile">
        <div className="tile-head">
          {onSelect && <input className="selector" type="checkbox" />}
          {actions && <DropdownArea className="fa fa-ellipsis-v actions" dropdown={actions} />}
        </div>
        {children}
      </div>
    );
  }
}

Tile.propTypes = {
  children: PropTypes.node,
  onSelect: PropTypes.func,
  actions: PropTypes.node
};

export default Tile;