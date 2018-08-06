import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';

import { userProfile, signUpUser, signInWithGoogle, signInWithFacebook } from '../../actions';
import { TextButton, CardSection, Input, Button, Spinner, LogoText } from '../../components/common';
import { Validator, PasswordValidator } from '../../utils/Validator';
//import styles from '../../style/commonStyle';
//import { PhoneVerificationPopup } from './PhoneVerificationPopup';

class UserSignUp extends Component {

  static navigationOptions = ({
    header: null
  });

  onSignUpUser() {
    const { name, email, password, confirmPassword, mobile } = this.props;

    //const object = { 'name': name, 'email': email };
    const object = { confirmPassword, password };
    const error = Validator('name', name)
      || Validator('email', email)
      || Validator('password', password)
      || PasswordValidator(object)
      || Validator('mobile', mobile);
      //console.log(confirmPassword);
      //PasswordValidator(object);

    if (error != null) {
      console.log('Error in Email id : ', error);
      Alert.alert('Error', error);
    } else {
      this.props.signUpUser({ name, email, password, mobile });
    }
  }

  onGoogleSignIn() {
    this.props.signInWithGoogle();
  }

  onCancelClicked() {
    this.props.navigation.goBack();
  }

  facebookLoginIn() {
    this.props.signInWithFacebook();
  }

  renderLoading() {
    console.log('loading state :: ', this.props.loading);
    return (
      <Spinner size="large" isVisible={this.props.loading} />
    );
  }

  renderButton() {
    return (
      <Button onPress={this.onSignUpUser.bind(this)}>
        Sign Up
      </Button>
    );
  }

  renderCancelButton() {
    return (
      <Button
        style={{ backgroundColor: '#dedbdb', borderColor: '#dedbdb' }}
        labelStyle={{ color: '#000' }}
        onPress={this.onCancelClicked.bind(this)}
      >
        Cancel
      </Button>
    );
  }


  renderGoogleSignButton() {
    return (
      <TextButton
        style={styles.socialLoginButton}
        onPress={this.onGoogleSignIn.bind(this)}
      >
        Google
      </TextButton>
    );
  }

  renderFacebookLoginButton() {
    return (
      <TextButton
        style={styles.socialLoginButton}
        onPress={this.facebookLoginIn.bind(this)}
      >
        Facebook
      </TextButton>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
          {this.renderLoading()}
          <CardSection>
            <LogoText>
              Action
            </LogoText>
          </CardSection>
          <CardSection style={styles.cardSectionContainer}>
            <Text style={{ alignSelf: 'center' }}>
              Sign Up With
            </Text>
            {this.renderGoogleSignButton()}
            <Text style={{ alignSelf: 'center' }}>
              OR
            </Text>
            {this.renderFacebookLoginButton()}
          </CardSection>
          <CardSection>
            <Input
              label="Name"
              placeHolder="Enter Name"
              value={this.props.name}
              onChangeText={value => this.props.userProfile({ prop: 'name', value })}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Email"
              placeHolder="Enter Email"
              value={this.props.email}
              onChangeText={value => this.props.userProfile({ prop: 'email', value })}
            />
          </CardSection>

          <CardSection>
            <Input
              isPassword
              label="Password"
              placeHolder="Password"
              value={this.props.password}
              onChangeText={value => this.props.userProfile({ prop: 'password', value })}
            />
          </CardSection>

          <CardSection>
            <Input
              isPassword
              label="Re-enter Password"
              placeHolder="Password"
              value={this.props.confirmPassword}
              onChangeText={value => this.props.userProfile({ prop: 'confirmPassword', value })}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Mobile"
              placeHolder="Enter Number"
              keyboardType="phone-pad"
              value={this.props.mobile}
              onChangeText={value => this.props.userProfile({ prop: 'mobile', value })}
            />
          </CardSection>

          <CardSection style={styles.buttonStyle}>
            {this.renderButton()}
            {this.renderCancelButton()}
          </CardSection>
      </View>
    );
  }
}

const styles = {
  buttonStyle: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 15,
    justifyContent: 'space-between'
  },
  cardSectionContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 80,
  },
  socialLoginButton: {
    color: 'rgb(234, 94, 32)',
    // paddingLeft: 3,
    // paddingRight: 3
  }
};

const mapStateToProps = (state) => {
  const { name, email, password, confirmPassword, mobile, loading } = state.userprofile;
  return { name, email, password, confirmPassword, mobile, loading };
};

const SignUpComponent = connect(mapStateToProps, {
  userProfile, signUpUser, signInWithGoogle, signInWithFacebook })(UserSignUp);
export { SignUpComponent as UserSignUp };
