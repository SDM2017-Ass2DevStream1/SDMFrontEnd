import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Table, TableHeader, TableBody, TableHeaderColumn,
  TableRow, TableRowColumn, Checkbox, SelectField, MenuItem,
} from 'material-ui';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import Pagination from 'react-ultimate-pagination-material-ui';
import styled from 'styled-components';

import {
  SEARCH_RESULTS_COLUMN, SEARCH_SORT_BY,
} from '../constants';
import { BORDER } from '../constants/styles';
import { ModuleTitle } from '../components/misc';
import * as searchActions from '../actions/search';


const flex = {
  title: 5,
  authors: 2,
  rating: 1,
  year: 1,
  design: 2,
  method: 2,
  methodology: 2,
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
    // height: 'auto',
    // minHeight: '48px',
    // whiteSpace: 'normal',
    // wordWrap: 'break-word',
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
        label: 'Credibility Rating',
      },
      {
        column: SEARCH_RESULTS_COLUMN.DESIGN,
        label: 'Research Design',
      },
      {
        column: SEARCH_RESULTS_COLUMN.METHOD,
        label: 'SE Method',
      },
      {
        column: SEARCH_RESULTS_COLUMN.METHODOLOGY,
        label: 'SE Methodology',
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

  renderSortBy() {
    const { search: { query } } = this.props;

    const Container = styled.div`
      display: flex;
      align-items: center;
    `;

    const options = [
      {
        value: SEARCH_SORT_BY.RELEVANCE,
        primaryText: 'Relevance',
      },
      {
        value: SEARCH_SORT_BY.DATE_NEWEST,
        primaryText: 'Date: Newest',
      },
      {
        value: SEARCH_SORT_BY.DATE_OLDEST,
        primaryText: 'Date: Oldest',
      },
      {
        value: SEARCH_SORT_BY.RATING_HIGHEST,
        primaryText: 'Rating: Highest',
      },
    ];

    return (
      <Container>
        <Label>Sort by: </Label>
        <SelectField
          value={query.sortBy}
          onChange={(e, index, value) => { this.onChangeSortBy(value); }}
          style={styles.sortBy}
        >
          {options.map(props => (
            <MenuItem
              key={`sortby-select-${props.value}`}
              style={styles.sortBy}
              {...props}
            />
          ))}
        </SelectField>
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
          {this.renderSortBy()}
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
            key: SEARCH_RESULTS_COLUMN.TITLE,
            forceShow: true,
          })}
          {renderRowColumn({
            item,
            key: SEARCH_RESULTS_COLUMN.AUTHORS,
            showTitle: true,
          })}
          {renderRowColumn({
            item,
            key: SEARCH_RESULTS_COLUMN.YEAR,
            justifyContent: 'center',
          })}
          {renderRowColumn({
            item,
            key: SEARCH_RESULTS_COLUMN.RATING,
            justifyContent: 'center',
          })}
          {renderRowColumn({
            item,
            key: SEARCH_RESULTS_COLUMN.DESIGN,
          })}
          {renderRowColumn({
            item,
            key: SEARCH_RESULTS_COLUMN.METHOD,
          })}
          {renderRowColumn({
            item,
            key: SEARCH_RESULTS_COLUMN.METHODOLOGY,
          })}
        </TableRow>
      );
    });
  }

  renderSearchResults() {
    const { search: { visibility } } = this.props;

    const renderHeaderColumn = (options) => {
      const opts = {
        ...{
          key: '',
          label: '',
          forceShow: false,
        },
        ...options,
      };

      const { key, label, forceShow } = opts;

      return (
        (forceShow || visibility[key]) && <TableHeaderColumn
          style={{
            ...styles.column,
            flex: flex[key],
          }}
          title={label}
        >
          {label}
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
            {renderHeaderColumn({
              key: SEARCH_RESULTS_COLUMN.TITLE,
              label: 'Title',
              forceShow: true,
            })}
            {renderHeaderColumn({
              key: SEARCH_RESULTS_COLUMN.AUTHORS,
              label: 'Authors',
            })}
            {renderHeaderColumn({
              key: SEARCH_RESULTS_COLUMN.YEAR,
              label: 'Publish Year',
            })}
            {renderHeaderColumn({
              key: SEARCH_RESULTS_COLUMN.RATING,
              label: 'Credibility Rating (0 to 5)',
            })}
            {renderHeaderColumn({
              key: SEARCH_RESULTS_COLUMN.DESIGN,
              label: 'SE Method',
            })}
            {renderHeaderColumn({
              key: SEARCH_RESULTS_COLUMN.METHOD,
              label: 'SE Method',
            })}
            {renderHeaderColumn({
              key: SEARCH_RESULTS_COLUMN.METHODOLOGY,
              label: 'SE Methodology',
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
