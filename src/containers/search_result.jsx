import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table, TableBody, TableHeader, TableHeaderColumn,
  TableRow, TableRowColumn,
} from 'material-ui/Table';
import styled from 'styled-components';


const flex = {
  title: 5,
  authors: 2,
  year: 1,
  rating: 1,
};

const styles = {
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
      <Table selectable={false}>
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
}

const mapStateToProps = ({ search }) => {
  return { search };
};

export default connect(
  mapStateToProps,
)(SearchResult);
