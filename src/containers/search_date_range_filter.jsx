import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Checkbox, DatePicker } from 'material-ui';
import styled from 'styled-components';

import * as searchActions from '../actions/search';


const styles = {
  checkbox: {
    style: {
      display: 'inline-block',
      width: 'auto',
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

const Span = styled.span`
  display: inline-block;
  margin-left: 20px;
`;

class SearchDateRangeFilter extends Component {
  render() {
    return (
      <Container>
        <Checkbox label="Date Range" {...styles.checkbox} />
        <Span>
          <DatePicker
            hintText="From"
            autoOk
            openToYearSelection
          />
        </Span>
        <Span>
          <DatePicker
            hintText="To"
            autoOk
            openToYearSelection
          />
        </Span>
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
