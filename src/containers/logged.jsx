import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui/svg-icons/content/inbox';
import PowerSettingsNewIcon from 'material-ui/svg-icons/action/power-settings-new';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import * as userActions from '../actions/user';


class Logged extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    this.props.actions.userLogout();
  }

  render() {
    const { actions, ...rest } = this.props;

    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        {...rest}
      >
        <MenuItem
          primaryText="Account Settings"
          leftIcon={<SettingsIcon />}
        />
        <MenuItem
          primaryText="Saved Search"
          leftIcon={<InboxIcon />}
        />
        <Divider />
        <MenuItem
          primaryText="Logout"
          leftIcon={<PowerSettingsNewIcon />}
          onClick={this.onLogout}
        />
      </IconMenu>
    );
  }
}

Logged.muiName = 'IconMenu';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(Logged);
