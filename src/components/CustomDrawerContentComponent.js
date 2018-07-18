import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { DrawerItems } from 'react-navigation';
import { connect } from 'react-redux';

import { fetchUserDetails } from '../actions';

class CustomDrawerContentComponent extends Component {

  state = {
    uri: '',
    isfailed: ''
  }

  componentWillMount() {
    this.props.fetchUserDetails();
  }

  componentWillReceiveProps(nextProps) {
    let uri = '';
    if (nextProps.ProfilePic !== '') {
      uri = nextProps.ProfilePic;
      this.setState({ uri, isfailed: false });
    } else {
      uri = '../images/ic_person_24px.png';
      this.setState({ uri, isfailed: true });
    }

    this.setState({ uri });
  }

  renderProfileImage() {
    if (!this.state.isfailed) {
      return (
        <Image
          style={styles.profileImageStyle}
          source={{ uri: (this.state.uri) }}
        />
      );
    }
    return (
      <Image
        style={styles.profileImageStyle}
        source={require('../images/ic_person_24px.png')}
      />
    );
  }

  render() {
    console.log('Profile Pic :: ', this.props.ProfilePic);
    return (
      <View style={styles.container}>
        {this.renderProfileImage()}
        <Text style={styles.textStyle}>
          {this.props.name} - {this.props.category}
        </Text>
        <DrawerItems {...this.props} />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    paddingLeft: 10
  },
  textStyle: {
    fontSize: 14,
    textAlign: 'left',
    color: '#000000'
  },
  profileImageStyle: {
    alignSelf: 'flex-start',
    marginTop: 16,
    padding: 10,
    width: 40,
    height: 40,
    borderRadius: 75
  }
};

const mapStateToProps = state => {
  const { userprofile } = state;
  return userprofile;
};

export default connect(mapStateToProps, { fetchUserDetails })(CustomDrawerContentComponent);
