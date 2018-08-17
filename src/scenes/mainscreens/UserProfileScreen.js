import React, { Component } from 'react';
import { ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { userProfile, updateUserProfile, uploadUserProfileImage } from '../../actions';
import { Validator } from '../../utils/Validator';
import { Button, Spinner } from '../../components/common';
import { UpdateOtherUserProfile } from './UpdateOtherUserProfile';
import { UpdateActorProfile } from './UpdateActorProfile';
import { UpdateProducerProfile } from './UpdateProducerProfile';

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
              onPress={this.onSaveClicked.bind(this)}
            >
              Save
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
