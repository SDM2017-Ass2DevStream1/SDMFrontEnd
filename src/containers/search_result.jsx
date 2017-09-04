import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Table, TableHeader, TableBody, TableHeaderColumn,
  TableRow, TableRowColumn, Checkbox,
} from 'material-ui';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import Pagination from 'react-ultimate-pagination-material-ui';
import styled from 'styled-components';

import { BORDER } from '../constants/styles';
import { ModuleTitle } from '../components/misc';
import * as searchActions from '../actions/search';


const flex = {
  title: 5,
  authors: 2,
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


class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.onPaginationChange = this.onPaginationChange.bind(this);
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

  renderSettings() {
    const { search: { visibility } } = this.props;

    const OuterDiv = styled.div`
      padding-bottom: 20px;
      border-bottom: ${BORDER};
    `;

    const InnerDiv = styled.div`
      margin-right: -25px;
    `;

    const Span = styled.span`
      float: left;
      line-height: 24px;
      margin-right: 10px;
      height: 24px;
    `;

    return (
      <OuterDiv>
        <ModuleTitle>Search Results</ModuleTitle>
        <InnerDiv>
          <Span>Column Visibility: </Span>
          {[
            { column: 'title', label: 'Title' },
            { column: 'authors', label: 'Authors' },
            { column: 'year', label: 'Publish Year' },
            { column: 'rating', label: 'Rating' },
          ].map(({ column, label }) => {
            return (
              <VisibilityCheckbox
                key={`visibility-checkbox-${_.snakeCase(label)}`}
                label={label}
                checked={visibility[column]}
                onCheck={(e, checked) => {
                  this.onVisibilityCheck(column, checked);
                }}
              />
            );
          })}
        </InnerDiv>
      </OuterDiv>
    );
  }

  renderItems() {
    const { search: { items } } = this.props;

    return items.map((item) => {
      const renderRowColumn = (item, key, hasTitle = false) => {
        const value = item[key];

        return (
          <TableRowColumn
            style={{
              ...styles.column,
              flex: flex[key],
            }}
          >
            {hasTitle ?
              <ColumnContent title={value}>{value}</ColumnContent> :
              <ColumnContent>{value}</ColumnContent>
            }
          </TableRowColumn>
        );
      };

      return (
        <TableRow key={item.id} style={styles.bodyRow}>
          {renderRowColumn(item, 'title', true)}
          {renderRowColumn(item, 'authors', true)}
          {renderRowColumn(item, 'year')}
          {renderRowColumn(item, 'rating')}
        </TableRow>
      );
    });
  }

  renderSearchResults() {
    return (
      <Table selectable={false} style={styles.table}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow
            style={{
              ...styles.headerRow,
            }}
          >
            <TableHeaderColumn
              style={{
                ...styles.column,
                flex: flex.title,
              }}
            >
              Title
            </TableHeaderColumn>
            <TableHeaderColumn
              style={{
                ...styles.column,
                flex: flex.authors,
              }}
            >
              Authors
            </TableHeaderColumn>
            <TableHeaderColumn
              style={{
                ...styles.column,
                flex: flex.year,
              }}
            >
              Publish Year
            </TableHeaderColumn>
            <TableHeaderColumn
              style={{
                ...styles.column,
                flex: flex.rating,
              }}
            >
              Rating (out of 5 stars)
            </TableHeaderColumn>
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
