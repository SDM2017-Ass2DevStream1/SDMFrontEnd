import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tabs, Tab, TextField, RaisedButton } from 'material-ui';
import { colors } from 'material-ui/styles';
import styled from 'styled-components';

import SearchResult from './search_result';
import SearchConditions from './search_conditions';
import SearchDateRangeCondition from './search_date_range_condition';
import { muiTheme } from '../constants/styles';
import { Paper, ModuleTitle } from '../components/misc';
import * as searchActions from '../actions/search';


const styles = {
  tab: {
    tabItemContainerStyle: {
      width: '300px',
      marginLeft: '100px',
    },
    style: {
      background: muiTheme.palette.primary1Color,
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

const TabContainer = styled.div`
  padding: 40px 100px;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

class SearchIndex extends Component {
  constructor(props) {
    super(props);
    this.onSearchFormSubmit = this.onSearchFormSubmit.bind(this);
  }

  onSearchFormSubmit(e) {
    e.preventDefault();
    this.props.actions.fetchArticles({
      ...this.props.query,
      term: this.searchInput.input.value,
    });
  }

  render() {
    const { search: { query, items } } = this.props;

    return (
      // https://stackoverflow.com/questions/37928419/how-to-resize-material-uis-tabs
      <Tabs {...styles.tab}>
        <Tab label="Search">
          <TabContainer>
            <Paper style={styles.paper}>
              <form onSubmit={this.onSearchFormSubmit}>
                <SearchBarContainer>
                  <TextField
                    ref={(field) => { this.searchInput = field; }}
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

                <ModuleTitle>To Apply Conditions</ModuleTitle>
                <SearchDateRangeCondition />
                <SearchConditions />
              </form>
            </Paper>

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
