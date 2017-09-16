import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  RaisedButton, SelectField, MenuItem,
} from 'material-ui';
import { ContentAdd } from 'material-ui/svg-icons';
import styled from 'styled-components';

import {
  SEARCH_CONDITION_TYPES, SEARCH_CONDITION_FIELDS,
  SEARCH_FIELD_OPERATORS, SEARCH_CONDITION_FIELD_TYPE,
} from '../constants';
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

const renderMenuItems = items => items.map(item => (
  <MenuItem key={item.type} value={item.type} primaryText={item.name} />
));

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
    const Label = styled.label`
      margin-right: 10px;
      font-size: 16px;
      font-weight: bold;
    `;
    const ConditionSelectField = props => (
      <SelectField
        autoWidth
        style={styles.conditionOptions}
        {...props}
      >
        {props.children}
      </SelectField>
    );

    // return others.map(other => (
    return (
      <Container>
        <ConditionSelectField value={1}>
          {renderMenuItems(SEARCH_CONDITION_TYPES)}
        </ConditionSelectField>
        <Span>
          <Label>If</Label>
          <ConditionSelectField value={1}>
            {renderMenuItems(SEARCH_CONDITION_FIELDS)}
          </ConditionSelectField>
        </Span>
        <ConditionSelectField value={1}>
          {renderMenuItems(
            SEARCH_FIELD_OPERATORS[SEARCH_CONDITION_FIELD_TYPE.RATING].operators,
          )}
        </ConditionSelectField>
        <ConditionSelectField value={1}>
          {renderMenuItems(
            SEARCH_FIELD_OPERATORS[SEARCH_CONDITION_FIELD_TYPE.RATING].options,
          )}
        </ConditionSelectField>
      </Container>
    );
    // ));
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
