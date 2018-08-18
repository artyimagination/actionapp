import React, { Component } from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { userProfile, updateUserProfile, uploadUserProfileImage } from '../../actions';
import { CardSection, Button, Input, Spinner, ProfilePicture,CheckboxGroup } from '../../components/common';
import { Validator } from '../../utils/Validator';
import NavigationService from '../../components/NavigationService';
import { items1, items2, items3, items4, items5 } from '../../utils/Items';



class ContctPageScreen extends Component {

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

  onGenderCategorySelected(values) {
    this.updateProjectId();
    this.props.updateCast({ prop: 'genderType', value: values[0].value });
  }

  onGenderSelected(values) {
    this.props.updateCast({ prop: 'type', value: values[0].value });
  }


  displayJsxMessage() {
    if (this.props.userprofile.category = 'Producers') {
        return <Text> Hello, JSX! </Text>;
    } else {
        return <Text> Goodbye, JSX! </Text>;
    }
}


  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
         
          <CardSection  style={{ paddingLeft: 40, justifyContent: 'space-between' }} >
          <CheckboxGroup
            items={items5}
            selectedItems={[]}
            onSelect={(values) => this.onGenderCategorySelected(values)}
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

const ContctetailsComponent = connect(mapStateToProps,
  { userProfile, updateUserProfile, uploadUserProfileImage })(ContctPageScreen);

export { ContctetailsComponent as ContctPageScreen };
