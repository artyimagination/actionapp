import React, { Component } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { userProfile, saveUserDetails, uploadUserProfileImage } from '../../actions';
import {
  CardSection,
  Button, Input,
  Spinner,
  UploadPicture,
  ProfilePicture,
  CheckboxGroup
} from '../../components/common';

import { Validator } from '../../utils/Validator';
import FileUploader from 'react-native-file-uploader';

class UpdateActorProfile extends Component {

  state = {
    avtar: '',
    pics: [
      '',
      '',
      ''
    ]
  }


  onProfileImgSelected() {
    //console.log('Select image from device');
    const imagePicker = require('react-native-image-picker');

    imagePicker.showImagePicker(null, (response) => {
      //console.log('Response = ', response);
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
    const error = Validator('height', userprofile.height)
                  || Validator('weight', userprofile.weight)
                  || Validator('waist', userprofile.waist)
                  || Validator('experience', userprofile.experience);

    if (error !== null) {
      Alert.alert('Error', error);
    } else {
      this.props.saveUserDetails({ userprofile });
    }
  }

  onComplexationChanged(values) {
    //console.log('value of complexation :: ', values[0].value);
    this.props.userProfile({ prop: 'complexation', value: values[0].value });
  }

  picUpload(value) {
    console.log('picupload :: ', value);
    const { pics } = this.state;
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
        pics[value] = source;
        this.props.uploadUserProfileImage({ uri: response.uri, name: `pic${value}` });
      }
    });

    this.setState({
      pics
    });
  }

  renderLoading() {
    return (
      <Spinner size="large" isVisible={this.props.userprofile.loading} />
    );
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

  // renderFileUploader() {
  //   const settings = {

  //     method: 'post', // default to 'POST'
  //     fieldName: 'file', // default to 'file'
  //     contentType: 'image/jpeg', // default to 'application/octet-stream'
  //     data: {
  //       // extra fields to send in the multipart payload
  //     }
  //   };
  //   FileUploader.upload(settings, (err, res) => {
  //     // handle result
  // }, (sent, expectedToSend) => {
  //     // handle progress
  // });
  // }

  render() {
    
    const items = [{
      key: 0,
      label: 'Fair',
      value: 'Fair'
    }, {
      key: 1,
      label: 'Wheaty',
      value: 'Wheaty'
    }, {
      key: 2,
      label: 'Dark',
      value: 'Dark'
    }];
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#ffffff'}}>
          {this.renderLoading()}
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
          <CardSection style={{ justifyContent: 'space-between' }}>
            <Input
              label="Height"
              placeHolder="0'"
              keyboardType="numeric"
              onChangeText={value => this.props.userProfile({ prop: 'height', value })}
              value={this.props.userprofile.height}
              iStyle={{ width: 40 }}
              lStyle={{ paddingLeft: 28 }}
            />
            <Input
              label=" "
              placeHolder="0''"
              iStyle={{ width: 40 }}
              keyboardType="numeric"
            />
            <Input
              label="Weight"
              keyboardType="numeric"
              onChangeText={value => this.props.userProfile({ prop: 'weight', value })}
              value={this.props.userprofile.weight}
              iStyle={{ width: 40 }}
              lStyle={{ paddingLeft: 25 }}
            />
            <Text style={{ alignSelf: 'center' }}>
              KG
            </Text>
            <Input
              label="Waist"
              keyboardType="numeric"
              onChangeText={value => this.props.userProfile({ prop: 'waist', value })}
              value={this.props.userprofile.waist}
              iStyle={{ width: 40 }}
              lStyle={{ paddingLeft: 25 }}
            />
          </CardSection>
          <CardSection 
          style={{  
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingLeft: 50,
            paddingRight: 25 
          }}
          >
            <CheckboxGroup
              label='Complexion'
              items={items}
              selectedItems={[0]}
              onSelect={(values) => this.onComplexationChanged(values)}
            />
          </CardSection>
          <CardSection>
            <Input
              label="Language Prefered"
              placeHolder="Enter Language"
              keyboardType="text"
              onChangeText={value => this.props.userProfile({ prop: 'language', value })}
              value={this.props.userprofile.language}
            />
          </CardSection>
          <CardSection>
            <Input
              label="Description"
              editable
              maxLength={40}
              multiline
              numOfLines={10}
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
          <CardSection style={styles.uploadPicStyle}>
            <UploadPicture
              onPress={() => this.picUpload(0)}
              source={this.state.pics[0] || require('../../images/ic_person_24px.png')}
            />
            <UploadPicture
              onPress={() => this.picUpload(1)}
              source={this.state.pics[1] || require('../../images/ic_person_24px.png')}
            />
            <UploadPicture
              onPress={() => this.picUpload(2)}
              source={this.state.pics[2] || require('../../images/ic_person_24px.png')}
            />
          </CardSection>
          <CardSection>
          
          test
        </CardSection>
      </ScrollView>
    );
  }
}

const styles = {
  uploadPicStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 25,
    paddingRight: 25
  },
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
  { userProfile, saveUserDetails, uploadUserProfileImage })(UpdateActorProfile);

export { UserDetailsComponent as UpdateActorProfile };
