import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import window from '../util/window.js';
import getPassthroughProps from '../util/getPassthroughProps.js';

class SearchBox extends React.Component {

  handleSearch = (event) => {
    if (event) {
      event.preventDefault();
    }
    if (this.timeout) {
      window.clearTimeout(this.timeout);
      delete this.timeout;
    }
    let {
      onSearch
    } = this.props;
    onSearch();
  }

  handleChange = (event) => {
    let {
      onChange,
      autosearch,
      autosearchDelayMs
    } = this.props;
    onChange(event.target.value);
    if (autosearch) {
      if (this.timeout) {
        window.clearTimeout(this.timeout);
      }
      this.timeout = window.setTimeout(this.handleSearch, autosearchDelayMs);
    }
  }

  render() {
    let {
      value,
      className
    } = this.props;
    return (
      <form onSubmit={this.handleSearch} className={classnames(["search-bar", className])} {...getPassthroughProps(this)}>
        <button type="submit" className="transparent fa fa-search"></button> 
        <input value={value} onChange={this.handleChange} type="search" />
      </form>
    );
  }
}

SearchBox.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  autosearch: PropTypes.bool,
  autosearchDelayMs: PropTypes.number,
  className: PropTypes.string
};

SearchBox.defaultProps = {
  autosearchDelayMs: 500
};

export default SearchBox;