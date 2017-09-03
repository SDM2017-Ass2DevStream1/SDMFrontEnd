import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tabs, Tab, TextField, RaisedButton } from 'material-ui';
import { colors } from 'material-ui/styles';
import styled from 'styled-components';

import SearchResult from './search_result';
import { MiscPaper, MiscTitle } from '../components/misc';
import * as searchActions from '../actions/search';


const styles = {
  tab: {
    tabItemContainerStyle: {
      width: '300px',
      marginLeft: '100px',
    },
    style: {
      background: colors.lightGreen500,
    },
    inkBarStyle: {
      marginLeft: '100px',
      height: '3px',
      background: colors.amber300,
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
    `;

    return (
      // https://stackoverflow.com/questions/37928419/how-to-resize-material-uis-tabs
      <Tabs {...styles.tab}>
        <Tab label="Search">
          <TabContainer>
            <MiscPaper style={styles.paper}>
              <form onSubmit={this.onSearchFormSubmit}>
                <MiscTitle>Search Functions</MiscTitle>

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
            </MiscPaper>

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
