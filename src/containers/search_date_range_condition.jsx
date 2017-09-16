import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FlatButton, Checkbox, DatePicker } from 'material-ui';
import moment from 'moment';
import styled from 'styled-components';

import { initialState as searchInitialState } from '../reducers/search';
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
  margin-bottom: 25px;
`;

const formatDate = (date) => {
  return moment(date).format('MM/YYYY');
};

const CustomizedDatePicker = (props) => {
  const Span = styled.span`
    display: flex;
    align-items: center;
    margin-right: 30px;
  `;

  const styles = {
    style: {
      marginLeft: '10px',
    },
    textFieldStyle: {
      width: '5em',
      cursor: 'pointer',
    },
  };

  return (
    <Span>
      {props.hintText}
      <DatePicker
        openToYearSelection
        formatDate={formatDate}
        {...styles}
        {...props}
      />
    </Span>
  );
};

const initialDate = searchInitialState.condition.date;

class SearchDateRangeCondition extends Component {
  constructor(props) {
    super(props);
    this.onApplyDateRange = this.onApplyDateRange.bind(this);
    this.onFromChange = this.onFromChange.bind(this);
    this.onToChange = this.onToChange.bind(this);
    this.onResetDateRange = this.onResetDateRange.bind(this);
  }

  onApplyDateRange(e, checked) {
    const { actions } = this.props;
    (checked ? actions.addDateRange : actions.removeDateRange)();
  }

  onFromChange(e, date) {
    this.props.actions.setSearchCondition({
      date: { from: date },
    });
  }

  onToChange(e, date) {
    this.props.actions.setSearchCondition({
      date: { to: date },
    });
  }

  onResetDateRange() {
    this.props.actions.resetDateRange();
  }

  render() {
    const { search: { condition: { date } } } = this.props;

    return (
      <Container>
        <Checkbox
          label="Date Range"
          {...styles.checkbox}
          onCheck={this.onApplyDateRange}
        />
        <CustomizedDatePicker
          hintText="From"
          minDate={initialDate.from}
          maxDate={date.to}
          value={date.from}
          onChange={this.onFromChange}
        />
        <CustomizedDatePicker
          hintText="To"
          minDate={date.from}
          maxDate={initialDate.to}
          value={date.to}
          onChange={this.onToChange}
        />
        <FlatButton label="Reset" onClick={this.onResetDateRange} />
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
)(SearchDateRangeCondition);
