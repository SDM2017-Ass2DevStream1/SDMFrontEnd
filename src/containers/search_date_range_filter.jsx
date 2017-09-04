import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FlatButton, Checkbox, DatePicker } from 'material-ui';
import moment from 'moment';
import styled from 'styled-components';

import * as searchActions from '../actions/search';


const styles = {
  checkbox: {
    style: {
      display: 'inline-block',
      width: 'auto',
      marginRight: '20px',
    },
    iconStyle: {
      marginRight: '10px',
    },
    labelStyle: {
      width: 'auto',
    },
  },
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const minDate = moment('1950-01-01', 'YYYY-MM-DD').toDate();
const maxDate = moment().toDate();
const formatDate = (date) => {
  return moment(date).format('MM/YYYY');
};

const CustomizedDatePicker = (props) => {
  const Span = styled.span`
    display: inline-block;
    margin-right: 20px;
  `;

  return (
    <Span>
      <DatePicker
        autoOk
        openToYearSelection
        formatDate={formatDate}
        {...props}
      />
    </Span>
  );
};

class SearchDateRangeFilter extends Component {
  render() {
    return (
      <Container>
        <Checkbox label="Date Range" {...styles.checkbox} />
        <CustomizedDatePicker
          hintText="From"
          minDate={minDate}
          value={minDate}
        />
        <CustomizedDatePicker
          hintText="To"
          maxDate={maxDate}
          value={maxDate}
        />
        <FlatButton label="Reset" />
      </Container>
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
)(SearchDateRangeFilter);
