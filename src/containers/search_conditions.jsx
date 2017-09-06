import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';
import AddIcon from 'material-ui/svg-icons/content/add';

import * as searchActions from '../actions/search';


const styles = {
  buttonIcon: {
    marginLeft: '6px',
    marginTop: '-3px',
    marginRight: '-5px',
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
    return others.map(other => (
      <li key={other.type}>{other.type}</li>
    ));
  }

  render() {
    const { search: { condition: { others } } } = this.props;

    if (_.isEmpty(others)) {
      return (
        <RaisedButton
          label="Add More Conditions"
          icon={<AddIcon style={styles.buttonIcon} />}
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
