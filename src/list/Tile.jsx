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
      onClick
    } = this.props;

    let body;

    if (onClick) {
      body = (
        <a onClick={onClick} className="tile-body">
          {children}
        </a>
      );
    }
    else {
      body = (
        <div className="tile-body">
          {children}
        </div>
      );
    }

    return (
      <div className="tile">
        {
          (onSelect || actions) && (
            <div className="tile-head">
              {onSelect && <input className="selector" type="checkbox" checked={isSelected} onChange={this.handleSelectorClick} />}
              {actions && <DropdownArea className="fa fa-ellipsis-v actions" dropdown={actions} />}
            </div>
          )
        }
        {body}
      </div>
    );
  }
}

Tile.propTypes = {
  children: PropTypes.node,
  onSelect: PropTypes.func,
  actions: PropTypes.node,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func
};

export default Tile;