import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from '../../style/commonStyle';

class UserProfileScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>User Profile Screen</Text>
      </View>
    );
  }
}

export { UserProfileScreen };
