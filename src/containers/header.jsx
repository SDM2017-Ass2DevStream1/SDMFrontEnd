import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import * as userActions from '../actions/user';


const styles = {
  title: {
    cursor: 'pointer',
  },
};

const Login = (props) => {
  return (
    <FlatButton label="Login" {...props} />
  );
};
Login.muiName = 'FlatButton';

const Logged = (props) => {
  return (
    <IconMenu
      iconButtonElement={
        <IconButton><MoreVertIcon /></IconButton>
      }
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      {...props}
    >
      <MenuItem primaryText="Refresh" />
      <MenuItem primaryText="Help" />
      <MenuItem primaryText="Sign out" />
    </IconMenu>
  );
};
Logged.muiName = 'IconMenu';

class Header extends Component {
  componentDidMount() {
    this.props.actions.getCurrentUser();
  }

  render() {
    const { user } = this.props;

    return (
      <AppBar
        title={<span style={styles.title}>SERLER</span>}
        iconStyleLeft={{
          display: 'none',
        }}
        iconElementRight={user ? <Logged /> : <Login />}
      />
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
