import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
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
    this.props.actions.searchArticles(this.searchInput.input.value);
  }

  render() {
    const { search: { items } } = this.props;
    const TabContainer = styled.div`
      padding: 40px 100px;
    `;
    const SearchBarContainer = styled.div`
      display: flex;
      align-items: center;
      margin-bottom: 20px;
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
          height: '3px',
          background: amber300,
        }}
        contentContainerStyle={{
          background: '#fff',
        }}
      >
        <Tab label="Search">
          <TabContainer>
            <form onSubmit={this.onFormSubmit}>
              <SearchBarContainer>
                <TextField
                  ref={(input) => { this.searchInput = input; }}
                  style={{
                    flex: 1,
                    width: 'auto',
                    marginRight: '20px',
                  }}
                  hintText="Search for articles"
                />
                <RaisedButton type="submit" label="Search" />
              </SearchBarContainer>
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
