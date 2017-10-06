import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppBar, FlatButton } from 'material-ui';

import Logged from './logged';
import * as userActions from '../actions/user';


const commonBarStyles = {
  display: 'flex',
  height: '120px',
};

const styles = {
  title: {
    cursor: 'pointer',
  },

  appBar: {
    style: {
      boxShadow: 'none',
      ...commonBarStyles,
    },
    titleStyle: {
      ...commonBarStyles,
    },
    iconStyleLeft: {
      display: 'none',
    },
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

    const Logo = () => (
      <Link
        id="logo"
        style={styles.title}
        to="/"
      >
        <i />SERLER
      </Link>
    );

    return (
      <AppBar
        title={<Logo />}
        iconElementRight={user ? <Logged /> : <Login />}
        {...styles.appBar}
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
