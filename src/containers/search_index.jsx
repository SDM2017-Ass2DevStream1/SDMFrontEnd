import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tabs, Tab, TextField } from 'material-ui';
import { ActionSearch } from 'material-ui/svg-icons';
import { colors } from 'material-ui/styles';
import styled from 'styled-components';

import {
  Categories, SavedQueries, SearchResult,
  SearchConditions, SearchDateRangeCondition,
} from '.';
import { muiTheme } from '../constants/styles';
import { Paper, ModuleTitle, IconButton } from '../components/misc';
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

    console.log(props.match);
    const { match: { params } } = props;

    if (!_.isEmpty(params)) {
      this.props.actions.fetchArticles(params);
    }
  }

  onSearchFormSubmit(e) {
    e.preventDefault();
    this.props.actions.fetchArticles({
      ...this.props.query,
      term: this.searchInput.input.value,
    });
  }

  render() {
    const { search: { query, results } } = this.props;

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
                  <IconButton
                    primary={false}
                    secondary
                    type="submit"
                    label="Search"
                    icon={<ActionSearch />}
                  />
                </SearchBarContainer>

                <ModuleTitle>To Apply Conditions</ModuleTitle>
                <SearchDateRangeCondition />
                <SearchConditions />
              </form>
            </Paper>

            {!_.isEmpty(results.items) && <SearchResult />}
          </TabContainer>
        </Tab>

        <Tab label="Categories">
          <TabContainer>
            <Categories />
          </TabContainer>
        </Tab>

        <Tab label="History">
          <TabContainer>
            <SavedQueries />
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
