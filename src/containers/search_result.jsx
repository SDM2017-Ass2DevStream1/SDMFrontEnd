import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Table, TableHeader, TableBody,
  TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui';
import { colors } from 'material-ui/styles';
import Pagination from 'react-ultimate-pagination-material-ui';
import styled from 'styled-components';

import * as searchActions from '../actions/search';


const flex = {
  title: 5,
  authors: 2,
  year: 1,
  rating: 1,
};

const styles = {
  table: {
    borderBottom: `1px solid ${colors.grey300}`,
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

  render() {
    return (
      <div>
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
