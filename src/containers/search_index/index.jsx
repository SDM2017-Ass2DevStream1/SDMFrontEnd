import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchActions from '../../actions/search';


class SearchIndex extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    console.log(this.searchInput.value);
  }

  render() {
    return (
      <form className="input-group" onSubmit={this.onFormSubmit}>
        <input
          type="text"
          ref={(input) => { this.searchInput = input; }}
          className="form-control"
          placeholder="Input article title or author names"
        />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-outline-primary">
            Search
          </button>
        </span>
      </form>
    );
  }
}

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
