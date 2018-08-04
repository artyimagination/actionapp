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
    const { container, buttonContainer, buttonStyle } = styles;
    return (
      <View style={container}>
        <Logo />
        <View
          style={buttonContainer}
        >
          <Button
          style={buttonStyle}
           onPress={() => this.props.navigation.navigate('Login')}
          >
            Login
          </Button>
          <Button
            style={buttonStyle}
            onPress={() => this.props.navigation.navigate('SignUpScreen')}
          >
            Sign Up
          </Button>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  buttonContainer: {
    paddingBottom: 70,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonStyle: {
    width: 145,
    justifyContent: 'space-between'
  }
};

export default connect(null)(Home);
