import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Table, TableHeader, TableBody, TableRow,
} from 'material-ui';

import { SAVED_QUERIES_COLUMN } from '../constants';
import { tableStyles } from '../constants/styles';
import { TableHeaderColumn, TableRowColumn } from '../components/misc';
import * as searchActions from '../actions/search';


const flexOptions = {
  [SAVED_QUERIES_COLUMN.QUERY]: 5,
  [SAVED_QUERIES_COLUMN.DATE]: 1,
  [SAVED_QUERIES_COLUMN.ACTION]: 1,
};

class SavedQueries extends Component {
  render() {
    return (
      <Table selectable={false} style={tableStyles.table}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow style={tableStyles.headerRow}>
            {TableHeaderColumn({
              flex: flexOptions[SAVED_QUERIES_COLUMN.QUERY],
              value: 'Query',
            })}
            {TableHeaderColumn({
              flex: flexOptions[SAVED_QUERIES_COLUMN.DATE],
              value: 'Date Last Run',
            })}
            {TableHeaderColumn({
              flex: flexOptions[SAVED_QUERIES_COLUMN.ACTIONS],
              value: 'Actions',
            })}
          </TableRow>
        </TableHeader>
      </Table>
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
)(SavedQueries);
