import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { userProfile, signUpUser, signInWithGoogle, signInWithFacebook } from '../../actions';

import { TextButton, CardSection, Input, Button, Spinner, LogoText } from '../../components/common';
//import styles from '../../style/commonStyle';

class UserSignUp extends Component {

  static navigationOptions = ({
    header: null
  });

  onSignUpUser() {
    const { name, email, password, mobile } = this.props;
    this.props.signUpUser({ name, email, password, mobile });
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

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

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
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <TextButton
        onPress={this.onGoogleSignIn.bind(this)}
      >
        Google
      </TextButton>
    );
  }

  renderFacebookLoginButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <TextButton
        onPress={this.facebookLoginIn.bind(this)}
      >
        Facebook
      </TextButton>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
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
              value={this.props.password}
              onChangeText={value => this.props.userProfile({ prop: 'password', value })}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Mobile"
              placeHolder="Enter Number"
              keyboardType="numeric"
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
  }
};

const mapStateToProps = (state) => {
  const { name, email, password, mobile, loading } = state.userprofile;
  return { name, email, password, mobile, loading };
};

const SignUpComponent = connect(mapStateToProps, {
  userProfile, signUpUser, signInWithGoogle, signInWithFacebook })(UserSignUp);
export { SignUpComponent as UserSignUp };
