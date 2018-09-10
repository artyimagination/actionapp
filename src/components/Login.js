import React, { Component } from 'react';
import { View, Text, Alert, ScrollView, TextInput } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import {

  passwordChanged,
  loginUser,
  cntChanged,
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
  // onEmailChange(text) {
  //   this.props.emailChanged(text);
  // }
  onContactChange(text) {
    this.props.cntChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onLoginBtnClicked() {
   console.log('btn clicked');
    const { contact, password } = this.props;
    const mobileNo = '+91'+contact;
    const error =  Validator('password', password) ||  Validator('contact', contact);

   // const error = Validator('email', email) || Validator('password', password);
    if (error !== null) {
      Alert.alert(error);
    } else {
      //this.props.loginUser({ contact, password});
    console.log('else');
     firebase.auth().signInWithPhoneNumber(mobileNo)
     .then((confirmResult) => {
       console.log(confirmResult);
     
       // This means that the SMS has been sent to the user
       // You need to:
       //   1) Save the `confirmResult` object to use later
       this.setState({ confirmResult });
       //   2) Hide the phone number form
       //   3) Show the verification code form

       NavigationService.navigate('Home');
     })
     .catch((error) => {
       const { code, message } = error;
      // console.log('Error: '+error);
       // For details of error codes, see the docs
       // The message contains the default Firebase string
       // representation of the error
     });
    }
  }
  onLoginOrRegister = () => {
   
   // const { phoneNumber } = this.state;

   const { contact, password } = this.props;
   const mobileNo = '+91'+contact;
    firebase.auth().signInWithPhoneNumber(mobileNo)
      .then((confirmResult) => {
        // This means that the SMS has been sent to the user
        // You need to:
        //   1) Save the `confirmResult` object to use later
        this.setState({ confirmResult });
        //   2) Hide the phone number form
        //   3) Show the verification code form
      })
      .catch((error) => {
        const { code, message } = error;
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      });
  }
  onVerificationCode = () => {
    const { confirmResult, verificationCode } = this.state;
    confirmResult.confirm(verificationCode)
      .then((user) => {
        // If you need to do anything with the user, do it here
        // The user will be logged in automatically by the
        // `onAuthStateChanged` listener we set up in App.js earlier
      })
      .catch((error) => {
        const { code, message } = error;
        // For details of error codes, see the docs
        // The message contains the default Firebase string
        // representation of the error
      });
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
        style={{ color: 'rgb(234, 94, 32)' }}
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

  
  render() {
      return (
    
        <View style={this.props.style}>
                <CardSection style={{ paddingRight: 20}} >
                  <Input
                    label="Phone Number"
                    keyboardType="phone-pad"
                    placeHolder="Enter Contact Number"
                    onChangeText={this.onContactChange.bind(this)}
                    value={this.props.mobile}
                    onSubmitEditing={() => { 
                      this.refs.pwd.focus(); 
                    }}
            
                  />
                </CardSection>
                <CardSection style={{ paddingRight: 20}}>
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
                <CardSection style={{ paddingTop: 10, paddingLeft: 15 }}>
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
    justifyContent: 'space-around',
    paddingRight: 20
  },
  socialLoginButton: {
    color: 'rgb(234, 94, 32)',
    paddingLeft: 3,
    paddingRight: 3
  },
  cardSectionContainer: {
    flexDirection: 'row',
    alignSelf: 'center'

  }
};

const mapStateToProps = ({ auth }) => {
  const { password, error, loading, contact } = auth;
  return { password, error, loading, contact };
};

export default connect(mapStateToProps, {
  cntChanged, passwordChanged, loginUser })(Login);
