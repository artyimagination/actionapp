import React, { Component } from 'react';
import { ScrollView, View, Text, Image, TextInput, Alert } from 'react-native';
import { connect } from 'react-redux';
import { userProfile, saveUserDetails, uploadUserProfileImage } from '../../actions';
import { Card, CardSection, Button, Input, Spinner, ProfilePicture } from '../../components/common';
import { Validator } from '../../utils/Validator';

class UserDetailsScreen extends Component {

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
    /*imagePicker.open({
      takePhoto: true,
      useLastPhoto: true,
      chooseFromLibrary: true
    }).then
    ;*/
    /*CameraRoll.getPhotos({
      first: 1000,
    }).then(res => console.log(res, 'image data'));*/
  }

  onSaveClicked() {
    const { userprofile } = this.props;

    const error = Validator('experience', userprofile.experience);
    console.log('user experience ', userprofile.experience);
    if (error !== null) {
      Alert.alert('Error', error);
    } else {
      this.props.saveUserDetails({ userprofile });
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

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
          {this.renderLoading()}
          <CardSection>
            <ProfilePicture
              onPress={() => this.onProfileImgSelected()}
              picStyle={{ width: 100, height: 100 }}
              source={this.state.avtar || require('../../images/ic_person_24px.png')}
            />
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
            <Button
              onPress={this.onSaveClicked.bind(this)}
            >
              Save
            </Button>
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
  { userProfile, saveUserDetails, uploadUserProfileImage })(UserDetailsScreen);

export { UserDetailsComponent as UserDetailsScreen };
