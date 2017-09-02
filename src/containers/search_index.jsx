import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import { lightGreen500, amber300 } from 'material-ui/styles/colors';
import styled from 'styled-components';

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
    const TabContainer = styled.div`
      padding: 40px 100px;
    `;

    return (
      // https://stackoverflow.com/questions/37928419/how-to-resize-material-uis-tabs
      <Tabs
        tabItemContainerStyle={{
          width: '300px',
          marginLeft: '100px',
        }}
        style={{
          background: lightGreen500,
        }}
        inkBarStyle={{
          marginLeft: '100px',
          background: amber300,
        }}
        contentContainerStyle={{
          background: '#fff',
        }}
      >
        <Tab label="Search">
          <TabContainer>
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
          </TabContainer>
        </Tab>
        <Tab label="History">
          <TabContainer>
            History
          </TabContainer>
        </Tab>
      </Tabs>
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
