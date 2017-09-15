import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Table, TableHeader, TableBody, TableRow, Checkbox,
} from 'material-ui';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import Pagination from 'react-ultimate-pagination-material-ui';
import styled from 'styled-components';

import { SEARCH_RESULTS_COLUMN } from '../constants';
import { BORDER } from '../constants/styles';
import {
  ModuleTitle, TableHeaderColumn, TableRowColumn,
} from '../components/misc';
import * as searchActions from '../actions/search';


const flex = {
  [SEARCH_RESULTS_COLUMN.TITLE]: 5,
  [SEARCH_RESULTS_COLUMN.AUTHORS]: 2,
  [SEARCH_RESULTS_COLUMN.RATING]: 1,
  [SEARCH_RESULTS_COLUMN.YEAR]: 1,
  [SEARCH_RESULTS_COLUMN.DESIGN]: 2,
  [SEARCH_RESULTS_COLUMN.METHOD]: 2,
  [SEARCH_RESULTS_COLUMN.METHODOLOGY]: 2,
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
    height: 'auto',
  },
  column: {
    display: 'flex',
    alignItems: 'center',
    lineHeight: 1.5,
    padding: '10px 0',
    height: 'auto',
    minHeight: '48px',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
  },
  sortBy: {
    fontSize: '14px',
  },
};

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

    return items.map((item) => {
      return (
        <TableRow key={item.id} style={styles.bodyRow}>
          {_.values(SEARCH_RESULTS_COLUMN).map(key => (
            TableRowColumn({
              key,
              value: item[key],
              flex: flex[key],
              visibility: visibility[key],
              forceShow: key === SEARCH_RESULTS_COLUMN.TITLE,
              justifyContent: [
                SEARCH_RESULTS_COLUMN.YEAR, SEARCH_RESULTS_COLUMN.RATING,
              ].includes(key) && 'center',
            })
          ))}
        </TableRow>
      );
    });
  }

  renderSearchResults() {
    const { search: { visibility } } = this.props;

    const CustomizedHeaderColumn = ({ key, label, ...rest }) => {
      return TableHeaderColumn({
        flex: flex[key],
        visibility: visibility[key],
        label,
        ...rest,
      });
    };

    return (
      <Table selectable={false} style={styles.table}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow
            style={{
              ...styles.headerRow,
            }}
          >
            {CustomizedHeaderColumn({
              key: SEARCH_RESULTS_COLUMN.TITLE,
              label: 'Title',
              forceShow: true,
            })}
            {CustomizedHeaderColumn({
              key: SEARCH_RESULTS_COLUMN.AUTHORS,
              label: 'Authors',
            })}
            {CustomizedHeaderColumn({
              key: SEARCH_RESULTS_COLUMN.YEAR,
              label: 'Publish Year',
              justifyContent: 'center',
            })}
            {CustomizedHeaderColumn({
              key: SEARCH_RESULTS_COLUMN.RATING,
              label: 'Credibility Rating (0-5)',
              justifyContent: 'center',
            })}
            {CustomizedHeaderColumn({
              key: SEARCH_RESULTS_COLUMN.DESIGN,
              label: 'SE Method',
            })}
            {CustomizedHeaderColumn({
              key: SEARCH_RESULTS_COLUMN.METHOD,
              label: 'SE Method',
            })}
            {CustomizedHeaderColumn({
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
