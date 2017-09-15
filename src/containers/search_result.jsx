import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Table, TableHeader, TableBody, TableRow, Checkbox, SelectField, MenuItem,
} from 'material-ui';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import Pagination from 'react-ultimate-pagination-material-ui';
import styled from 'styled-components';

import {
  SEARCH_RESULTS_COLUMN, SEARCH_SORT_BY,
} from '../constants';
import { BORDER } from '../constants/styles';
import {
  ModuleTitle, renderHeaderColumn, renderRowColumn,
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

    return items.map((item) => {
      return (
        <TableRow key={item.id} style={styles.bodyRow}>
          {_.values(SEARCH_RESULTS_COLUMN).map(key => (
            renderRowColumn({
              key,
              value: item[key],
              flex: flex[key],
              visibility: visibility[key],
              forceShow: key === SEARCH_RESULTS_COLUMN.TITLE,
            })
          ))}
        </TableRow>
      );
    });
  }

  renderSearchResults() {
    const { search: { visibility } } = this.props;

    return (
      <Table selectable={false} style={styles.table}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow
            style={{
              ...styles.headerRow,
            }}
          >
            {renderHeaderColumn({
              flex: flex[SEARCH_RESULTS_COLUMN.TITLE],
              visibility: visibility[SEARCH_RESULTS_COLUMN.TITLE],
              label: 'Title',
              forceShow: true,
            })}
            {renderHeaderColumn({
              flex: flex[SEARCH_RESULTS_COLUMN.AUTHORS],
              visibility: visibility[SEARCH_RESULTS_COLUMN.AUTHORS],
              label: 'Authors',
            })}
            {renderHeaderColumn({
              flex: flex[SEARCH_RESULTS_COLUMN.YEAR],
              visibility: visibility[SEARCH_RESULTS_COLUMN.YEAR],
              label: 'Publish Year',
              justifyContent: 'center',
            })}
            {renderHeaderColumn({
              flex: flex[SEARCH_RESULTS_COLUMN.RATING],
              visibility: visibility[SEARCH_RESULTS_COLUMN.RATING],
              label: 'Credibility Rating (0 to 5)',
              justifyContent: 'center',
            })}
            {renderHeaderColumn({
              flex: flex[SEARCH_RESULTS_COLUMN.DESIGN],
              visibility: visibility[SEARCH_RESULTS_COLUMN.DESIGN],
              label: 'SE Method',
            })}
            {renderHeaderColumn({
              flex: flex[SEARCH_RESULTS_COLUMN.METHOD],
              visibility: visibility[SEARCH_RESULTS_COLUMN.METHOD],
              label: 'SE Method',
            })}
            {renderHeaderColumn({
              flex: flex[SEARCH_RESULTS_COLUMN.METHODOLOGY],
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
