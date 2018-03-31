import React from 'react';
import PropTypes from 'prop-types';

class PagingControls extends React.Component {

  render() {
    let {
      offset,
      size,
      total,
      pageSizes,
      onPageSelected
    } = this.props;
    return (
      <div className="paging-controls">
        <span>
          {offset + 1} - {Math.min(offset+size, total)} of {total}
        </span>
        <span className="pages">
          {(offset > 0) && <a onClick={() => onPageSelected(0, size)}>&lt;&lt;</a>}
          {(offset > 0) && <a onClick={() => onPageSelected(offset-size, size)}>&lt;</a>}
          {(offset + size < total) && <a onClick={() => onPageSelected(offset+size, size)}>&gt;</a>}
          {(offset + size < total) && <a onClick={() => onPageSelected(total-size, size)}>&gt;&gt;</a>}
        </span>
        <span className="page-sizes">
          {pageSizes.map(s => 
            s === size ? <span key={s}>{s}</span> : <a key={s} onClick={() => onPageSelected(0, s)}>{s}</a>
          )}
        </span>
      </div>
    );
  }
}

PagingControls.propTypes = {
  offset: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  pageSizes: PropTypes.arrayOf(PropTypes.number),
  onPageSelected: PropTypes.func.isRequired
};

PagingControls.defaultProps = {
  pageSizes: [10, 25, 50]
};

export default PagingControls;