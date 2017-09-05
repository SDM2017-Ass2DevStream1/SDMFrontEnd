import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FlatButton, Checkbox, DatePicker } from 'material-ui';
import moment from 'moment';
import styled from 'styled-components';

import { initialState as searchInitialState } from '../reducers/search'
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
        openToYearSelection
        formatDate={formatDate}
        {...props}
      />
    </Span>
  );
};

const initialDate = searchInitialState.query.date;

class SearchDateRangeFilter extends Component {
  constructor(props) {
    super(props);
    this.onFromChange = this.onFromChange.bind(this);
    this.onToChange = this.onToChange.bind(this);
  }

  onFromChange(e, date) {
    this.props.actions.updateSearchQuery({
      date: { from: date },
    });
  }

  onToChange(e, date) {
    this.props.actions.updateSearchQuery({
      date: { to: date },
    });
  }

  render() {
    const { search: { query: { date } } } = this.props;

    return (
      <Container>
        <Checkbox label="Date Range" {...styles.checkbox} />
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
