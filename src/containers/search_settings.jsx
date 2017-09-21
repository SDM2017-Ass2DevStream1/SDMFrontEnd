import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  SelectField, MenuItem, Dialog, FlatButton,
} from 'material-ui';
import { ActionPrint, ContentSave } from 'material-ui/svg-icons';
import styled from 'styled-components';

import { SEARCH_RESULTS_COLUMN } from '../constants';
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
  constructor(props) {
    super(props);
    this.onSaveQuery = this.onSaveQuery.bind(this);
    this.onDialogClose = this.onDialogClose.bind(this);
  }

  state = {
    dialogOpen: false,
  }

  onChangeVisibility(values) {
    const columns = _.keys(_.pickBy(
      visibilityOptions, item => values.includes(item),
    ));

    this.props.actions.setVisibleColumns(columns);
  }

  onSaveQuery() {
    this.setState({
      dialogOpen: true,
    });
  }

  onDialogClose() {
    this.setState({
      dialogOpen: false,
    });
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
    `;

    const Content = styled.div`
      display: flex;
      align-items: center;
    `;

    const DialogContent = styled.p`
      line-height: 1.5;
    `;

    const dialogActions = [
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onClick={this.onDialogClose}
      />,
    ];

    return (
      <Container>
        <ModuleTitle>Search Results</ModuleTitle>
        <Content>
          {this.renderVisibility()}
          <IconButton
            label="Save"
            onClick={this.onSaveQuery}
            icon={<ContentSave />}
          />
          <IconButton
            label="Print"
            style={{ marginLeft: 10 }}
            onClick={() => window.print()}
            icon={<ActionPrint />}
          />
        </Content>
        <Dialog
          title="Search Query Has Been Saved Successfully"
          actions={dialogActions}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.onDialogClose}
        >
          <DialogContent>
            The query you searched has been successfully saved as a history.
            You can view all search histories and restore a specific search
            resluts via <b>HISTORY Tab</b> at the top of header bar.
          </DialogContent>
        </Dialog>
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
