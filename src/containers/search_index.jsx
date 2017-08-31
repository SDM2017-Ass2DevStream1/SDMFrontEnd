import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SearchResult from './search_result';
import * as searchActions from '../actions/search';


class SearchIndex extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.props.actions.searchArticles(this.searchInput.value);
  }

  render() {
    const { search: { items } } = this.props;

    return (
      <div>
        <form className="input-group" onSubmit={this.onFormSubmit}>
          <input
            type="text"
            ref={(input) => { this.searchInput = input; }}
            className="form-control"
            placeholder="Input article title or author names"
          />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-outline-secondary">
              Search
            </button>
          </span>
        </form>
        {!_.isEmpty(items) && <SearchResult />}
      </div>
    );
  }
}

SearchIndex.propTypes = {
  search: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = ({ search }) => {
  return { search };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(searchActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchIndex);
