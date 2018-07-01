import React, { Component } from 'react';
import { View } from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import { Card, CardSection, Button, Input } from '../components/common';


class ForgotPasswordScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Forgot Password',
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
  });

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Card style={{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'center' }}>
          <CardSection>
            <Input
              label="Email/Mobile"
              placeHolder="Enter Email or Mobile Number"
            />
          </CardSection>
          <CardSection style={{ alignSelf: 'center' }}>
            <Button>
              Submit
            </Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

export default ForgotPasswordScreen;
