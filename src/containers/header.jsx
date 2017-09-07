import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppBar, FlatButton } from 'material-ui';

import Logged from './logged';
import * as userActions from '../actions/user';


const styles = {
  title: {
    cursor: 'pointer',
  },
};

// TODO: redirect to the login page
const Login = (props) => {
  return (
    <FlatButton label="Login" {...props} />
  );
};

Login.muiName = 'FlatButton';

class Header extends Component {
  componentDidMount() {
    this.props.actions.getCurrentUser();
  }

  render() {
    const { user } = this.props;

    return (
      <AppBar
        title={<span id="logo" className="logo" style={styles.title}>SERLER</span>}
        style={{
          boxShadow: 'none',
        }}
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
