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
      <View style={styles.containerStyle}>
          <Logo />
          <CardSection style={styles.textContainer}>
          <Text style={styles.labelStyle}>
            Application details and version Application details and version
            Application details and version Application details and version 
            Application details and version Application details and version
            Application details and version Application details and version
            Application details and version Application details and version
            Application details and version Application details and version
            Application details and version Application details and version
          </Text>
      </CardSection>
      </View>
    );
  }
}



const styles = {
  containerStyle: {
    flex: 1,
    paddingTop: 20
  },
  textContainer: {
    alignSelf: 'center',
    width: 326,
    height: 290,
    opacity: 0.4,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 0.7,
    borderColor: '#95989a',
    padding: 10,
   
  },
  labelStyle: {
    fontSize: 10,
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: '#95989a'
  },
  drawerIconStyle: {
    color: '#e91e63'
  }
};


export { HelpAndSupport };
