import React, { Component } from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { userProfile, updateUserProfile, uploadUserProfileImage } from '../../actions';
import { CardSection, Button, Input, Spinner, ProfilePicture } from '../../components/common';
import { Validator } from '../../utils/Validator';

class UpdateOtherUserProfile extends Component {

  state = {
    avtar: ''
  }

  onProfileImgSelected() {
    console.log('Select image from device');
    const imagePicker = require('react-native-image-picker');

    imagePicker.showImagePicker(null, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        this.setState({
          avtar: source
        });

        this.props.uploadUserProfileImage({ uri: response.uri });
      }
    });
  }

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

  renderButton() {
    return (
      <Button
        onPress={this.onSaveClicked.bind(this)}
      >
        Save
      </Button>
    );
  }

  renderProfilePic() {
    if (this.props.userprofile.ProfilePic !== '') {
      return (
        <ProfilePicture
          onPress={() => this.onProfileImgSelected()}
          picStyle={{ width: 100, height: 100 }}
          source={{ uri: this.props.userprofile.ProfilePic }}
        />
      );
    }

    return (
      <ProfilePicture
        onPress={() => this.onProfileImgSelected()}
        picStyle={{ width: 100, height: 100 }}
        source={require('../../images/ic_person_24px.png')}
      />
    );
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
          <CardSection>
            {this.renderProfilePic()}
          </CardSection>
          <CardSection>
            <View style={{ flex: 1, alignSelf: 'center', paddingTop: 10 }}>
              <Text style={styles.textStyle}>{this.props.userprofile.name}</Text>
            </View>
          </CardSection>
          <CardSection>
            <View style={{ flex: 1, alignSelf: 'center', paddingTop: 10 }}>
              <Text style={styles.textStyle}>{this.props.userprofile.category}</Text>
            </View>
          </CardSection>
          <CardSection>
            <Input
              label="Experience"
              placeHolder="Enter Experience"
              keyboardType="numeric"
              onChangeText={value => this.props.userProfile({ prop: 'experience', value })}
              value={this.props.userprofile.experience}
            />
          </CardSection>
          <CardSection>
            <Input
              label="Description"
              editable
              maxLength={40}
              multiline
              numOfLines={4}
              placeHolder="Description"
              onChangeText={value => this.props.userProfile({ prop: 'description', value })}
              value={this.props.userprofile.description}
            />
          </CardSection>
          <CardSection>
            <Input
              label="YouTube"
              placeHolder="Youtube Link"
              onChangeText={value => this.props.userProfile({ prop: 'youtubelink', value })}
              value={this.props.userprofile.youtubelink}
            />
          </CardSection>
          <CardSection>
            <Input
              label="Facebook"
              placeHolder="Facebook Link"
              onChangeText={value => this.props.userProfile({ prop: 'fblink', value })}
              value={this.props.userprofile.fblink}
            />
          </CardSection>
          <CardSection>
            <Input
              label="Instagram"
              placeHolder="Instagram Link"
              onChangeText={value => this.props.userProfile({ prop: 'instalink', value })}
              value={this.props.userprofile.instalink}
            />
          </CardSection>
      </ScrollView>
    );
  }
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    fontSize: 16,
    textAlign: 'center'
  }
};

const mapStateToProps = state => {
  return state;
};

const UserDetailsComponent = connect(mapStateToProps,
  { userProfile, updateUserProfile, uploadUserProfileImage })(UpdateOtherUserProfile);

export { UserDetailsComponent as UpdateOtherUserProfile };
