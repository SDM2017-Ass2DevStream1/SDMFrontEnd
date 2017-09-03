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


const styles = {
  tab: {
    tabItemContainerStyle: {
      width: '300px',
      marginLeft: '100px',
    },
    style: {
      background: lightGreen500,
    },
    inkBarStyle: {
      marginLeft: '100px',
      height: '3px',
      background: amber300,
    },
    contentContainerStyle: {
      background: '#fff',
    },
  },

  searchBar: {
    flex: 1,
    width: 'auto',
    marginRight: '20px',
  },
};

class SearchIndex extends Component {
  constructor(props) {
    super(props);
    this.onSearchFormSubmit = this.onSearchFormSubmit.bind(this);
  }

  onSearchFormSubmit(e) {
    e.preventDefault();
    this.props.actions.searchArticles({
      ...this.props.query,
      term: this.searchInput.input.value,
    });
  }

  render() {
    const { search: { query, items } } = this.props;
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
      <Tabs {...styles.tab}>
        <Tab label="Search">
          <TabContainer>
            <form onSubmit={this.onSearchFormSubmit}>
              <SearchBarContainer>
                <TextField
                  ref={(input) => { this.searchInput = input; }}
                  style={styles.searchBar}
                  hintText="Search for articles"
                  defaultValue={query.term}
                />
                <RaisedButton
                  type="submit"
                  label="Search"
                  secondary
                />
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
