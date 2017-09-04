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
    display: 'inline-block',
    marginLeft: '20px',
    width: 'auto',
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
    style={styles.checkbox}
    checkedIcon={<Visibility />}
    uncheckedIcon={<VisibilityOff />}
    defaultChecked
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

  renderSettings() {
    const Div = styled.div`
      padding-bottom: 20px;
      border-bottom: ${BORDER};
    `;

    const Span = styled.span`
      float: left;
      line-height: 24px;
      height: 24px;
    `;

    return (
      <Div>
        <ModuleTitle>Search Results</ModuleTitle>
        <div>
          <Span>Column Visibility: </Span>
          <VisibilityCheckbox label="Title" />
          <VisibilityCheckbox label="Authors" />
          <VisibilityCheckbox label="Publish Year" />
          <VisibilityCheckbox label="Rating" />
        </div>
      </Div>
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

  renderItems() {
    const { search: { items } } = this.props;

    return items.map((item) => {
      const { title } = item;
      const authors = item.authors.join(', ');

      return (
        <TableRow key={item.id} style={styles.bodyRow}>
          <TableRowColumn
            style={{
              ...styles.column,
              flex: flex.title,
            }}
          >
            <ColumnContent title={title}>
              {title}
            </ColumnContent>
          </TableRowColumn>
          <TableRowColumn
            style={{
              ...styles.column,
              flex: flex.authors,
            }}
          >
            <ColumnContent title={authors}>
              {authors}
            </ColumnContent>
          </TableRowColumn>
          <TableRowColumn
            style={{
              ...styles.column,
              flex: flex.year,
            }}
          >
            <ColumnContent>
              {item.year}
            </ColumnContent>
          </TableRowColumn>
          <TableRowColumn
            style={{
              ...styles.column,
              flex: flex.rating,
            }}
          >
            <ColumnContent>
              {item.rating}
            </ColumnContent>
          </TableRowColumn>
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
