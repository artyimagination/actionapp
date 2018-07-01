import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../../components/Logo';
import { CardSection } from '../../components/common';

class HelpAndSupport extends Component {
  static navigationOptions = {
    drawerIcon: (
      <Icon name="question-circle" size={25} />
    )
  };
  render() {
    return (
      <View>
          <Logo />
          <CardSection>
            <Text>
              Text Goes Here
            </Text>
          </CardSection>
      </View>
    );
  }
}


export { HelpAndSupport };
