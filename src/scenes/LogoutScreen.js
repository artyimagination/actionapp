import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';

class LogoutScreen extends Component {
static navigationOptions = {
  drawerIcon: (
    <Icon name="sign-out" size={25} />
  )
}
componentDidMount() {
    this.props.logoutUser();
 }
  render() {
    return (
      <View>
        <Text>This is logout Screen</Text>
      </View>
    );
  }
}

export default connect(null, { logoutUser })(LogoutScreen);
