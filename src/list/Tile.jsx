import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DropdownArea from '../util/DropdownArea.jsx';
import getPassthroughProps from '../util/getPassthroughProps.js';
import Checkbox from '../forms/Checkbox.jsx';

class Tile extends React.Component {
  handleSelectorClick = (isSelected) => {
    let {
      onSelect
    } = this.props;

    onSelect(isSelected);
  }

  render() {
    let {
      actions,
      children,
      onSelect,
      isSelected,
      onClick,
      className
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
      <div className={classnames(["tile", className])} {...getPassthroughProps(this.props)}>
        {
          (onSelect || actions) && (
            <div className="tile-head">
              {onSelect && <Checkbox value={isSelected} onChange={this.handleSelectorClick} className="selector" />}
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
  className: PropTypes.string,
  onSelect: PropTypes.func,
  actions: PropTypes.node,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func
};

export default Tile;