import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { GoogleSigninButton } from 'react-native-google-signin';
import {
  emailChanged,
  passwordChanged,
  loginUser,
  signInWithGoogle,
  signInWithFacebook
} from '../actions';
import Logo from '../components/Logo';
import Login from '../components/Login';

class LoginScreen extends Component {

  static navigationOptions = ({
    header: null
  });
  render() {
    return (
      <View style={styles.root}>
        <Logo />
        <Login style={styles.loginStyle} />
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

const styles = {
  root: {
    backgroundColor: 'white',
    flex: 1
  },
  loginStyle: {
    justifyContent: 'center',
    position: 'absolute',
    top: 250.5,
    left: 10,
    height: 360,
    width: 360
  },
  logo: {
    position: 'absolute',
    top: 72,
    height: 86.33,
    width: 91.67
  }

};


export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, signInWithGoogle, signInWithFacebook })(LoginScreen);
