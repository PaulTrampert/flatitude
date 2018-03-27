import React from 'react';
import PropTypes from 'prop-types';
import window from '../util/window.js';

class SearchBox extends React.Component {

  handleSearch = (event) => {
    event.preventDefault();
    let {
      onSearch
    } = this.props;
    onSearch();
  }

  handleChange = (event) => {
    let {
      onChange,
      onSearch,
      autosearch,
      autosearchDelayMs
    } = this.props;
    onChange(event.target.value);
    if (autosearch) {
      if (this.timeout) {
        window.clearTimeout(this.timeout);
      }
      this.timeout = window.setTimeout(() => {
        delete this.timeout;
        onSearch();
      }, autosearchDelayMs);
    }
  }

  render() {
    let {
      value,
    } = this.props;
    return (
      <form onSubmit={this.handleSearch} className="search-bar">
        <input value={value} onChange={this.handleChange} type="search" />
        <button type="submit" className="transparent fa fa-search"></button> 
      </form>
    );
  }
}

SearchBox.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  autosearch: PropTypes.bool,
  autosearchDelayMs: PropTypes.number
};

SearchBox.defaultProps = {
  autosearchDelayMs: 500
};

export default SearchBox;