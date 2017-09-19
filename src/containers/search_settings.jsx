import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SelectField, MenuItem } from 'material-ui';
import { ActionPrint, ContentSave } from 'material-ui/svg-icons';
import styled from 'styled-components';

import { SEARCH_RESULTS_COLUMN } from '../constants';
import { BORDER } from '../constants/styles';
import { ModuleTitle, IconButton } from '../components/misc';
import * as searchActions from '../actions/search';


const visibilityOptions = {
  [SEARCH_RESULTS_COLUMN.AUTHORS]: 'Authors',
  [SEARCH_RESULTS_COLUMN.YEAR]: 'Publish Year',
  [SEARCH_RESULTS_COLUMN.RATING]: 'Credibility Rating',
  [SEARCH_RESULTS_COLUMN.DESIGN]: 'Research Design',
  [SEARCH_RESULTS_COLUMN.METHOD]: 'SE Method',
  [SEARCH_RESULTS_COLUMN.METHODOLOGY]: 'SE Methodology',
};

class SearchSettings extends Component {
  onChangeVisibility(values) {
    const columns = _.keys(_.pickBy(
      visibilityOptions, item => values.includes(item),
    ));

    this.props.actions.setVisibleColumns(columns);
  }

  onSave() {
  }

  renderVisibility() {
    const { search: { visibility } } = this.props;

    const Container = styled.div`
      margin-right: -25px;
      flex: 1;
      display: flex;
      align-items: center;
    `;

    const Label = styled.span`
      font-weight: bold;
      line-height: 24px;
      margin-right: 10px;
      height: 24px;
    `;

    const values = _.values(_.pick(visibilityOptions, _.keys(_.pickBy(visibility))));

    return (
      <Container>
        <Label>Visible Columns: </Label>
        <SelectField
          multiple
          value={values}
          hintText="Select visible columns"
          onChange={(e, key, values) => this.onChangeVisibility(values)}
        >
          {_.toPairs(visibilityOptions).map(([key, value]) => (
            <MenuItem
              key={key}
              insetChildren
              checked={visibility[key]}
              value={value}
              primaryText={value}
            />
          ))}
        </SelectField>
      </Container>
    );
  }

  render() {
    const Container = styled.div`
      padding-bottom: 20px;
      border-bottom: ${BORDER};
    `;

    const Content = styled.div`
      display: flex;
      align-items: center;
    `;

    return (
      <Container>
        <ModuleTitle>Search Results</ModuleTitle>
        <Content>
          {this.renderVisibility()}
          <IconButton
            label="Save"
            onClick={this.onSave}
            icon={<ContentSave />}
          />
          <IconButton
            label="Print"
            style={{ marginLeft: 10 }}
            onClick={() => window.print()}
            icon={<ActionPrint />}
          />
        </Content>
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
)(SearchSettings);
