import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Table, TableHeader, TableBody, TableHeaderColumn,
  TableRow, TableRowColumn, Checkbox, FlatButton,
} from 'material-ui';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
// import SortByAlpha from 'material-ui/svg-icons/av/sort-by-alpha';
import Sort from 'material-ui/svg-icons/content/sort';
import ArrowDropUp from 'material-ui/svg-icons/navigation/arrow-drop-up';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import Pagination from 'react-ultimate-pagination-material-ui';
import styled from 'styled-components';

import {
  SEARCH_RESULTS_COLUMN,
} from '../constants';
import { BORDER } from '../constants/styles';
import { ModuleTitle } from '../components/misc';
import * as searchActions from '../actions/search';


const flex = {
  title: 7,
  authors: 3,
  method: 3,
  year: 1,
  rating: 1,
};

const styles = {
  table: {
    borderBottom: BORDER,
  },
  checkbox: {
    style: {
      display: 'inline-block',
      marginRight: '25px',
      width: 'auto',
    },
    iconStyle: {
      marginRight: '10px',
    },
    labelStyle: {
      width: 'auto',
    },
  },
  headerRow: {
    display: 'flex',
    height: 'auto',
    marginBottom: '-1px',
  },
  bodyRow: {
    display: 'flex',
  },
  column: {
    display: 'flex',
    alignItems: 'center',
    // https://stackoverflow.com/questions/26465745/ellipsis-in-flexbox-container
    minWidth: 0,
  },
  sortBy: {
    fontSize: '14px',
  },
};

const ColumnContent = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const VisibilityCheckbox = props => (
  <Checkbox
    checkedIcon={<Visibility />}
    uncheckedIcon={<VisibilityOff />}
    {...styles.checkbox}
    {...props}
  />
);

const Label = styled.span`
  font-weight: bold;
  line-height: 24px;
  margin-right: 10px;
  height: 24px;
`;

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.onPaginationChange = this.onPaginationChange.bind(this);
    this.onChangeSortBy = this.onChangeSortBy.bind(this);
    this.onClickSortColumn = this.onClickSortColumn.bind(this);
  }

  onPaginationChange(page) {
    this.props.actions.searchArticles({
      ...this.props.query,
      page,
    });
  }

  onVisibilityCheck(column, checked) {
    this.props.actions.changeColumnVisibility(column, checked);
  }

  onChangeSortBy(sortBy) {
    this.props.actions.sortSearchResultsBy(sortBy);
    this.props.actions.searchArticles({
      ...this.props.search.query,
      sortBy,
    });
  }

  onClickSortColumn(e, highlight, key) {
    const newSortBy = {
      key: '',
      order: '',
    };
    const { search: { query: { sortBy } } } = this.props;
    if (highlight) {
      if (sortBy.order === 'ascend') {
        newSortBy.key = key;
        newSortBy.order = 'descend';
      } else {
        newSortBy.key = key;
        newSortBy.order = 'ascend';
      }
    } else {
      newSortBy.key = key;
      newSortBy.order = 'ascend';
    }

    this.props.actions.sortSearchResultsBy(newSortBy);
    this.props.actions.searchArticles({
      ...this.props.search.query,
      newSortBy,
    });
  }

  renderVisibility() {
    const { search: { visibility } } = this.props;

    const Container = styled.div`
      margin-right: -25px;
      flex: 1;
      display: flex;
      align-items: center;
    `;

    const options = [
      {
        column: SEARCH_RESULTS_COLUMN.AUTHORS,
        label: 'Authors',
      },
      {
        column: SEARCH_RESULTS_COLUMN.YEAR,
        label: 'Publish Year',
      },
      {
        column: SEARCH_RESULTS_COLUMN.RATING,
        label: 'Rating',
      },
      {
        column: SEARCH_RESULTS_COLUMN.METHOD,
        label: 'SE Method',
      },
    ];

    return (
      <Container>
        <Label>Column Visibility: </Label>
        {options.map(({ column, label }) => {
          return (
            <VisibilityCheckbox
              key={`visibility-checkbox-${column}`}
              label={label}
              checked={visibility[column]}
              onCheck={(e, checked) => {
                this.onVisibilityCheck(column, checked);
              }}
            />
          );
        })}
      </Container>
    );
  }

  renderSettings() {
    const Container = styled.div`
      padding-bottom: 20px;
      border-bottom: ${BORDER};
    `;

    const Content = styled.div`
      display: flex;
      align-items: center;
    `;

    return (
      <Container>
        <ModuleTitle>Search Results</ModuleTitle>
        <Content>
          {this.renderVisibility()}
        </Content>
      </Container>
    );
  }

  renderItems() {
    const { search: { items, visibility } } = this.props;

    const renderRowColumn = (options) => {
      const opts = {
        ...{
          key: '',
          item: null,
          hasTitle: false,
          forceShow: false,
          justifyContent: 'flex-start',
        },
        ...options,
      };
      const { key, item, showTitle, forceShow, justifyContent } = opts;
      const value = item[key];
      const props = {};

      if (showTitle) {
        props.title = value;
      }

      return (
        (forceShow || visibility[key]) && <TableRowColumn
          style={{
            ...styles.column,
            justifyContent,
            flex: flex[key],
          }}
        >
          <ColumnContent {...props}>{value}</ColumnContent>
        </TableRowColumn>
      );
    };

    return items.map((item) => {
      return (
        <TableRow key={item.id} style={styles.bodyRow}>
          {renderRowColumn({
            item,
            key: 'title',
            forceShow: true,
          })}
          {renderRowColumn({
            item,
            key: 'authors',
            showTitle: true,
          })}
          {renderRowColumn({
            item,
            key: 'method',
            showTitle: true,
          })}
          {renderRowColumn({
            item,
            key: 'year',
            justifyContent: 'center',
          })}
          {renderRowColumn({
            item,
            key: 'rating',
            justifyContent: 'center',
          })}
        </TableRow>
      );
    });
  }

  renderSearchResults() {
    const { search: { visibility } } = this.props;

    // const renderHeaderColumn = (options) => {
    //   const opts = {
    //     ...{
    //       key: '',
    //       label: '',
    //       forceShow: false,
    //     },
    //     ...options,
    //   };

    //   const { key, label, forceShow } = opts;

    //   return (
    //     (forceShow || visibility[key]) && <TableHeaderColumn
    //       style={{
    //         ...styles.column,
    //         flex: flex[key],
    //       }}
    //       title={label}
    //     >
    //       {label}
    //     </TableHeaderColumn>
    //   );
    // };

    // test for button
    const renderHeaderColumnButton = (options) => {
      const opts = {
        ...{
          key: '',
          label: '',
          forceShow: false,
        },
        ...options,
      };

      const { search: { query: { sortBy } } } = this.props;

      const { key, label, forceShow } = opts;
      const SortButtonSetting = {
        highlight: false,
        icon: {},
      };
      if (sortBy.key === key) {
        SortButtonSetting.highlight = true;
        if (sortBy.order === 'ascend') {
          SortButtonSetting.icon = ArrowDropDown;
        } else {
          SortButtonSetting.icon = ArrowDropUp;
        }
      } else {
        SortButtonSetting.highlight = false;
        SortButtonSetting.icon = Sort;
      }

      return (
        (forceShow || visibility[key]) && <TableHeaderColumn
          style={{
            ...styles.column,
            flex: flex[key],
          }}
          title={label}
        >
          <FlatButton
            label={label}
            labelPosition="before"
            primary={SortButtonSetting.highlight}
            icon={<SortButtonSetting.icon />}
            onClick={(e) => { this.onClickSortColumn(e, SortButtonSetting.highlight, key); }}
          />
        </TableHeaderColumn>
      );
    };

    return (
      <Table selectable={false} style={styles.table}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow
            style={{
              ...styles.headerRow,
            }}
          >
            {renderHeaderColumnButton({
              key: 'title',
              label: 'Title',
              forceShow: true,
            })}
            {renderHeaderColumnButton({
              key: 'authors',
              label: 'Authors',
            })}
            {renderHeaderColumnButton({
              key: 'method',
              label: 'SE Method',
            })}
            {renderHeaderColumnButton({
              key: 'year',
              label: 'Publish Year',
            })}
            {renderHeaderColumnButton({
              key: 'rating',
              label: 'Rating (out of 5)',
            })}
          </TableRow>
        </TableHeader>

        <TableBody
          displayRowCheckbox={false}
          showRowHover
        >
          {this.renderItems()}
        </TableBody>
      </Table>
    );
  }

  renderPagination() {
    const { search: { query, total } } = this.props;
    const Div = styled.div`
      margin-top: 25px;
    `;

    return (total &&
      <Div>
        <Pagination
          currentPage={query.page}
          totalPages={Math.ceil(total / query.limit)}
          onChange={this.onPaginationChange}
        />
      </Div>
    );
  }

  render() {
    return (
      <div>
        {this.renderSettings()}
        {this.renderSearchResults()}
        {this.renderPagination()}
      </div>
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
)(SearchResult);
