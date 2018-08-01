import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Input} from '../components/common';
import { enterEmail, confirmForgotPassword } from '../actions';

class ForgotPasswordScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Forgot Password',
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
  });

  onEmailSubmitClicked() {
    console.log('onEmailSubmitClicked ', this.props.resetPassword);
    const { email } = this.props.resetPassword;
    if (email !== '') {
      this.props.confirmForgotPassword(email);
    } else {
      Alert.alert(
        'Error',
        'Email id can not be empty'
      );
    }
  }

  onForgotPassword(text) {
    this.props.enterEmail(text);
  }
 
  render() {
    return (
      <View style={{ flex: 1 }}>
    
     
        <Card style={{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'center' }}>
        <CardSection style={{ alignSelf: 'center', paddingBottom: 5, color: '#000' }}>
          <Text style={{ textAlign: 'center', fontSize: 18 }}>
            Forgot Password?
          </Text>
        </CardSection>
        <CardSection style={{ alignSelf: 'center', padding: 20 }}>
          <Text style={{ textAlign: 'center', fontSize: 14 }}>
            Enter your email below to receive link to reset your password
          </Text>
        </CardSection>
          <CardSection>
            <Input
              label="Email"
              placeHolder="example@example.com"
              onChangeText={this.onForgotPassword.bind(this)}
              value={this.props.resetPassword.email}
            />
          </CardSection>
          <CardSection style={{ alignSelf: 'center' }}>
            <Button
              style={{ width: '50%' }}
              onPress={this.onEmailSubmitClicked.bind(this)}
            >
              Send Passcode
            </Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = state => {
   const { resetPassword } = state;
  return { resetPassword };
};

export default
connect(mapStateToProps, { enterEmail, confirmForgotPassword })(ForgotPasswordScreen);
