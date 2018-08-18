import React, { Component } from 'react';
import { ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { userProfile, updateUserProfile, uploadUserProfileImage } from '../../actions';
import { Validator } from '../../utils/Validator';
import { Button, Spinner } from '../../components/common';
import { UpdateOtherUserProfile } from './UpdateOtherUserProfile';
import { UpdateActorProfile } from './UpdateActorProfile';
import { UpdateProducerProfile } from './UpdateProducerProfile';
import NavigationService from '../../components/NavigationService';

class UserProfileScreen extends Component {

  onSaveClicked() {
    const { userprofile } = this.props;

    const error = Validator('experience', userprofile.experience);
    console.log('user experience ', userprofile.experience);
    if (error !== null) {
      Alert.alert('Error', error);
    } else {
      this.props.updateUserProfile({ userprofile });
    }
  }

  onNextClicked() {
     NavigationService.navigate('Contact')
  }
  renderLoading() {
    return <Spinner size="large" isVisible={this.props.userprofile.loading} />;
  }

  renderUserProfile() {
    const { userprofile } = this.props;
      if (userprofile.category === 'Actor(Male)' ||
          userprofile.category === 'Actor(Female)' ||
          userprofile.category === 'Child Actor(Male)' ||
          userprofile.category === 'Child Actor(Female)'
          ) {
            return <UpdateActorProfile {...this.props} />;
      } else if (userprofile.category === 'Producers') {
         // return <UpdateActorProfile {...this.props} />;
             return <UpdateProducerProfile {...this.props} />;
      } else {
        return <UpdateOtherUserProfile {...this.props} />;
      }
    }
  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
          {this.renderLoading()}
          {this.renderUserProfile()}
            <Button 
              style={{ marginTop: 15, marginBottom: 10 }}
              onPress={this.onSaveClicked.bind(this)}
            >
              Save
            </Button>
            <Button 
              style={{ marginTop: 15, marginBottom: 10 }}
              onPress={this.onNextClicked.bind(this)}
            >
              Next
            </Button>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

const UserDetailsComponent = connect(mapStateToProps,
  { userProfile, updateUserProfile, uploadUserProfileImage })(UserProfileScreen);

export { UserDetailsComponent as UserProfileScreen };
