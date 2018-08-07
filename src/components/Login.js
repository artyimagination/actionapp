import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { GoogleSigninButton } from 'react-native-google-signin';
import {
  emailChanged,
  passwordChanged,
  loginUser,
  signInWithGoogle,
  signInWithFacebook
} from '../actions';
import { Button, CardSection, Input, TextButton, Spinner } from './common';
import NavigationService from '../components/NavigationService';
import { Validator } from '../utils/Validator';

class Login extends Component {

  constructor(props) {
    super(props);
    this.a = React.createRef();
    this.b = React.createRef();
  
  }
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onLoginBtnClicked() {
    const { email, password } = this.props;
    const error = Validator('email', email) || Validator('password', password);
    if (error !== null) {
      Alert.alert(error);
    } else {
      this.props.loginUser({ email, password });
    }
  }

  onGoogleSignIn() {
    this.props.signInWithGoogle();
  }

  facebookLoginIn() {
    this.props.signInWithFacebook();
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  renderLoginButton() {
    if (this.props.loading) {
      return (
        <Spinner size="large" />
      );
    }

    return (
      <Button
      style={{ alignSelf: 'flex-start' }}
        onPress={this.onLoginBtnClicked.bind(this)}
      >
        Login
      </Button>
    );
  }

  renderSignupButton() {
    return (
      <TextButton
        onPress={() => NavigationService.navigate('SignUpScreen')}
      >
        Sign Up
      </TextButton>
    );
  }

  renderForgotPasswordButton() {
    return (
      <TextButton
        onPress={() => NavigationService.navigate('ForgotPassword')}
      >
        Forgot Password?
      </TextButton>
    );
  }

  // renderGoogleSignButton() {
  //   if (this.props.loading) {
  //     return <Spinner size="large" />;
  //   }

  //   return (
  //     <GoogleSigninButton
  //       style={{ width: 480, height: 480 }}
  //       size={GoogleSigninButton.Size.Icon}
  //       color={GoogleSigninButton.Color.Dark}
  //       onPress={this.onGoogleSignIn.bind(this)}
  //     />
  //   );
  // }

  // renderFacebookLoginButton() {
  //   if (this.props.loading) {
  //     return <Spinner size="large" />;
  //   }
  //   return (
  //     <Button
  //       onPress={this.facebookLoginIn.bind(this)}
  //     >
  //     Facebook Login
  //     </Button>
  //   );
  // }

  renderGoogleSignButton() {
    return (
      <Text
        style={styles.socialLoginButton}
        onPress={this.onGoogleSignIn.bind(this)}
      >
        Google
      </Text>
    );
  }
  renderFacebookLoginButton() {
    return (
      <Text
        style={styles.socialLoginButton}
        onPress={this.facebookLoginIn.bind(this)}
      >
        Facebook
      </Text>
    );
  }

  // focusNextField(id) {
  //   this.inputs[id].focus();
  // }

  
  render() {
      return (
        <View style={this.props.style}>
        <CardSection style={styles.cardSectionContainer} >
            <Text>
            Login With
            </Text>
            {this.renderGoogleSignButton()}
            <Text>
              OR
            </Text>
            {this.renderFacebookLoginButton()}
         </CardSection>
          <CardSection>
            <Input
              label="User Name"
              placeHolder="Enter User Name"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
              ref='eml'
              onSubmitEditing={() => { 
                this.refs.pwd.focus(); 
              }}
       
            />
          </CardSection>
          <CardSection>
            <Input
              isPassword
              ref='pwd'
              label="Password"
              placeHolder="Enter Password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
             //onSubmitEditing={() => this.b.current.focus()}
              
            />
          </CardSection>
          <CardSection style={{ paddingTop: 10, paddingLeft: 16 }}>
            {this.renderLoginButton()}
          </CardSection>
          <CardSection style={styles.buttonStyle}>
            {this.renderForgotPasswordButton()}
            {this.renderSignupButton()}
          </CardSection>
        </View>
      );
  }
}


const styles = {

  errorTextStyle: {
    color: 'red',
    fontSize: '14',
    fontWeight: '200',
    alignSelf: 'center'
  },
  buttonStyle: {
    flex: 1,
    flexDirection: 'row',
    //paddingLeft: 15,
    justifyContent: 'space-around'
  },
  socialLoginButton: {
    color: 'rgb(234, 94, 32)', 
    paddingLeft: 3,
    paddingRight: 3
  },
  cardSectionContainer: {
    //flex: 1,
    flexDirection: 'row',
    alignSelf: 'center'
   
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, signInWithGoogle, signInWithFacebook })(Login);
