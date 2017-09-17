import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  RaisedButton, SelectField, MenuItem, IconButton,
} from 'material-ui';
import {
  ContentAdd, ContentAddCircle, ContentRemoveCircle,
} from 'material-ui/svg-icons';
import styled from 'styled-components';

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
  typeCondition: {
    width: '85px',
  },
  fieldCondition: {
    width: '165px',
  },
  operatorCondition: {
    width: '205px',
  },
  addAndRemove: {
    width: '32px',
    height: '32px',
    marginTop: '-4px',
    marginLeft: '-4px',
  },
};

const AddOrRemove = props => (
  <IconButton
    iconStyle={styles.addAndRemove}
    {...props}
  >
    {props.children}
  </IconButton>
);

const renderMenuItems = items => items.map(item => (
  <MenuItem key={item.type} value={item.type} primaryText={item.name} />
));

class SearchConditions extends Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.onAddCondition = this.onAddCondition.bind(this);
    this.onRemoveCondition = this.onRemoveCondition.bind(this);
  }

  onSelect(type, value, index) {
    this.props.actions.selectCondition(type, value, index);
  }

  onAddCondition() {
    this.props.actions.addCondition();
  }

  onRemoveCondition(index) {
    this.props.actions.removeCondition(index);
  }

  renderConditions() {
    const { search: {
      query: { conditions },
      condition: { others },
    } } = this.props;

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

    const renderSelectField = (index, type) => {
      const condition = conditions[index];
      const other = others[index];

      return (
        <SelectField
          value={condition[type] || 1}
          autoWidth
          style={{
            ...styles.conditionOptions,
            ...styles[`${type}Condition`],
          }}
          onChange={(e, i, value) => {
            this.onSelect(type, value, index);
          }}
        >
          {renderMenuItems(other[`${type}s`])}
        </SelectField>
      );
    };

    return others.map((item, index) => {
      return (
        <Container key={index}>
          {renderSelectField(index, 'type')}
          <Span>
            <Label>If</Label>
            {renderSelectField(index, 'field')}
          </Span>
          {renderSelectField(index, 'operator')}
          {renderSelectField(index, 'option')}
          <AddOrRemove
            tooltip="add a new condition"
            onClick={this.onAddCondition}
          >
            <ContentAddCircle />
          </AddOrRemove>
          <AddOrRemove
            tooltip="remove this condition"
            onClick={() => this.onRemoveCondition(index)}
          >
            <ContentRemoveCircle />
          </AddOrRemove>
        </Container>
      );
    });
  }

  render() {
    if (_.isEmpty(this.props.search.condition.others)) {
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
        {this.renderConditions()}
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
