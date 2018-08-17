import React, { Component } from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { userProfile, updateUserProfile, uploadUserProfileImage } from '../../actions';
import { CardSection, Button, Input, Spinner, ProfilePicture } from '../../components/common';
import { Validator } from '../../utils/Validator';

class UpdateProducerProfile extends Component {

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


    return (
      <ProfilePicture
        onPress={() => this.onProfileImgSelected()}
        picStyle={{ width: 100, height: 100 }}
        source={require('../../images/ic_person_24px.png')}
      />
    );
  }

  displayJsxMessage() {
    if (this.props.userprofile.category = 'Producers') {
        return <Text> Hello, JSX! </Text>;
    } else {
        return <Text> Goodbye, JSX! </Text>;
    }
}

renderLoading() {
    return <Spinner size="large" isVisible={this.props.userprofile.loading} />;
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
  { userProfile, updateUserProfile, uploadUserProfileImage })(UpdateProducerProfile);

export { UserDetailsComponent as UpdateProducerProfile };
