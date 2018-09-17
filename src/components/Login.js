import React, { Component } from 'react';
import { View, Text, Alert, ScrollView, TextInput } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import {

  passwordChanged,
  loginUser,
  cntChanged,
  emailChanged
} from '../actions';
import { Button, CardSection, Input, TextButton, Spinner } from './common';
import NavigationService from '../components/NavigationService';
import { Validator } from '../utils/Validator';
import CurrentUser from '../utils/CurrentUser';

class Login extends Component {

  constructor(props) {
    super(props);
    this.a = React.createRef();
    this.b = React.createRef();
    this.unsubscribe = null;
    this.state = {
      user: null,
      data: null
    };
  
  }


  componentDidMount() {
    //  user1 = firebase.auth().getInstance().getUid();
   
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.toJSON() });
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          message: '',
          codeInput: '',
          mobile: '+91',
          confirmResult: null,
        });
      }
    });
  }

  componentWillUnmount() {
     if (this.unsubscribe) this.unsubscribe();
  }  

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onContactChange(text) {
    this.props.cntChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }
      // onLoginBtnClicked() {

      //   const { email, contact, password } = this.props;
      //   //const error = Validator('password', password) || Validator('contact', contact);
      //    const error = Validator('email', email) || Validator('password', password);

      // console.log(email);
      // console.log(password);
      //   if (error !== null) {
      //     Alert.alert(error);
      //   } else {
      //         console.log('else');
      //        this.props.loginUser({ email, password });

            // const mobileNo = '+91'+contact;
            // firebase.auth().signInWithPhoneNumber(mobileNo)
            // .then(confirmResult =>
            //     console.log(confirmResult),
            //     curr = firebase.auth(),
            //     console.log("curr"+JSON.stringify(curr)),
            //     this.setState({ data: curr}),
            //     console.log(this.state.data),
            //     NavigationService.navigate('Home')
            // )
            // .catch(error => console(error.message) );
        //}
        
       // firebase.auth().onAuthStateChanged((user) => {
         // console.log('user'+user);
         // NavigationService.navigate('Home')
            
           //  if (user && !CurrentUser.isFirstTimeUser) {

           //     userRef = firebase.database().ref(`/users/`),
       
           //     userRef.on("value", (snapshot) => {
     
           //       console.log(snapshot.val());
           //       snapshot.forEach(function(item) {
           //         var itemVal = item.val();
           //         if(itemVal.mobile == contact){
           //                   NavigationService.navigate('Home');
           //         }
                 
           //       });
             
           //     }, (errorObject) => {
           //       console.log("The read failed: " + errorObject.code);
           //     })
           //     //NavigationService.navigate('Home');
           //  }
         // })
   // }

  // renderError() {
  //   if (this.props.error) {
  //     return (
  //       <View style={{ backgroundColor: 'white' }}>
  //         <Text style={styles.errorTextStyle}>
  //           {this.props.error}
  //         </Text>
  //       </View>
  //     );
  //   }
  // }

  onLoginBtnClicked() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
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
        <CardSection>
          <Input
            label="User Name"
            placeHolder="Enter User Name"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>
        <CardSection>
          <Input
            isPassword
            label="Password"
            placeHolder="Enter Password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>
        <CardSection style={{ paddingTop: 10, paddingLeft: 10 }}>
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
  const { email, password, error, loading, contact } = auth;
  return { email, password, error, loading, contact };
};

export default connect(mapStateToProps, { 
  emailChanged, cntChanged, passwordChanged, loginUser })(Login);
