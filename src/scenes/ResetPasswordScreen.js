import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button } from '../components/common';
import { passcodeText, newPassword, confirmPassword } from '../actions';

class ResetPasswordScreen extends Component {
  render() {
    return (
      <View>
        <Card>
          <CardSection>
            <Input
              label="Passcode"
              placeHolder="****"
            />
          </CardSection>
          <CardSection>
            <Button>
              Submit
            </Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

export default connect(null, { passcodeText, newPassword, confirmPassword })(ResetPasswordScreen);
