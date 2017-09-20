import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Table, TableHeader, TableBody, TableRow,
} from 'material-ui';

import { SAVED_QUERIES_COLUMN } from '../constants';
import { tableStyles } from '../constants/styles';
import * as searchActions from '../actions/search';


const flexOptions = {
  [SAVED_QUERIES_COLUMN.QUERY]: 6,
  [SAVED_QUERIES_COLUMN.DATE]: 3,
  [SAVED_QUERIES_COLUMN.OPTS]: 2,
};

class SavedQueries extends Component {
  render() {
    return (
      <Table selectable={false} style={tableStyles.table}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow style={tableStyles.headerRow}>
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
