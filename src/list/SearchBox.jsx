import React from 'react';
import PropTypes from 'prop-types';

class SearchBox extends React.Component {

  render() {
    let {
      value,
      onChange
    } = this.props;
    return <input value={value} onChange={onChange} />;
  }
}

SearchBox.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func
};

export default SearchBox;