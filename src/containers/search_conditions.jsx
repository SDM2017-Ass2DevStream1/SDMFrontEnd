import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  RaisedButton, SelectField, MenuItem,
} from 'material-ui';
import { ContentAdd } from 'material-ui/svg-icons';
import styled from 'styled-components';

import { CONDITION_TYPES } from '../constants';
import * as searchActions from '../actions/search';


const styles = {
  buttonIcon: {
    marginLeft: '6px',
    marginTop: '-3px',
    marginRight: '-5px',
  },
  conditionOptions: {
    width: 'auto',
    fontSize: '14px',
    marginRight: '20px',
  },
};

class SearchConditions extends Component {
  constructor(props) {
    super(props);
    this.onAddCondition = this.onAddCondition.bind(this);
    this.onRemoveCondition = this.onRemoveCondition.bind(this);
  }

  onAddCondition() {
    this.props.actions.addCondition();
  }

  onRemoveCondition() {
    this.props.actions.removeCondition();
  }

  renderConditions(others) {
    const Container = styled.li`
      display: flex;
      align-items: center;
    `;

    const Span = Container.withComponent('span');

    return others.map(other => (
      <Container key={other.type}>
        <SelectField value={1} style={styles.conditionOptions}>
          {CONDITION_TYPES.map(item => (
            <MenuItem value={item.type} primaryText={item.name} />
          ))}
        </SelectField>
        <Span>
          If
          <SelectField
            value={1}
            style={{
              ...styles.conditionOptions,
              marginLeft: '10px',
            }}
          >
            <MenuItem value={1} primaryText="AND" />
            <MenuItem value={2} primaryText="OR" />
          </SelectField>
        </Span>
        <SelectField value={1} style={styles.conditionOptions}>
          <MenuItem value={1} primaryText="AND" />
          <MenuItem value={2} primaryText="OR" />
        </SelectField>
        <SelectField value={1} style={styles.conditionOptions}>
          <MenuItem value={1} primaryText="AND" />
          <MenuItem value={2} primaryText="OR" />
        </SelectField>
      </Container>
    ));
  }

  render() {
    const { search: { condition: { others } } } = this.props;

    if (_.isEmpty(others)) {
      return (
        <RaisedButton
          label="Add More Conditions"
          icon={<ContentAdd style={styles.buttonIcon} />}
          onClick={this.onAddCondition}
        />
      );
    }

    return (
      <ul>
        {this.renderConditions(others)}
      </ul>
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
)(SearchConditions);
