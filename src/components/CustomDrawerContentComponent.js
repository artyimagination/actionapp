import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { DrawerItems } from 'react-navigation';
import { connect } from 'react-redux';

import { fetchUserDetails } from '../actions';

class CustomDrawerContentComponent extends Component {

  componentWillMount() {
    this.props.fetchUserDetails();
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.profileImageStyle}
          source={{ uri: (this.props.ProfilePic) } || require('../images/ic_person_24px.png')}
        />
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
