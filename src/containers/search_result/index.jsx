import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class SearchResult extends Component {
  renderItems() {
    const { search: { items } } = this.props;

    return items.map((item) => {
      return (
        <li key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </li>
      );
    });
  }

  render() {
    return (
      <ul>{this.renderItems()}</ul>
    );
  }
}

SearchResult.propTypes = {
  search: PropTypes.object.isRequired,
};

const mapStateToProps = ({ search }) => {
  return { search };
};

export default connect(
  mapStateToProps,
)(SearchResult);
