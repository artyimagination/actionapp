import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { Button } from '../components/common';
import Logo from '../components/Logo';
import NavigationService from '../components/NavigationService';


class Home extends Component {
  static navigationOptions = ({
    header: null
  });

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        NavigationService.navigate('Home');
      }
    });
 }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <Logo />
        <View
          style={{ paddingBottom: 70, flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <Button
            style={{ width: 150 }}
           onPress={() => this.props.navigation.navigate('Login')}
          >
            Login
          </Button>
          <Button
            style={{ width: 150 }}
            onPress={() => this.props.navigation.navigate('SignUpScreen')}
          >
            Sign Up
          </Button>
        </View>
      </View>
    );
  }
}

export default connect(null)(Home);
