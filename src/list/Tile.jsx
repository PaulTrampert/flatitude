import React from 'react';
import PropTypes from 'prop-types';
import DropdownArea from '../util/DropdownArea.jsx';

class Tile extends React.Component {
  handleSelectorClick = () => {
    let {
      onSelect,
      isSelected
    } = this.props;

    onSelect(!isSelected);
  }

  render() {
    let {
      actions,
      children,
      onSelect,
      isSelected,
    } = this.props;

    return (
      <div className="tile">
        <div className="tile-head">
          {onSelect && <input className="selector" type="checkbox" checked={isSelected} onChange={this.handleSelectorClick} />}
          {actions && <DropdownArea className="fa fa-ellipsis-v actions" dropdown={actions} />}
        </div>
        <div className="tile-body">
          {children}
        </div>
      </div>
    );
  }
}

Tile.propTypes = {
  children: PropTypes.node,
  onSelect: PropTypes.func,
  actions: PropTypes.node,
  isSelected: PropTypes.bool
};

export default Tile;