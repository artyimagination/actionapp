import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { userProfile, saveUserDetails, uploadUserProfileImage } from '../../actions';
import {
 
  CardSection,
  Button, Input,
  Spinner,
  UploadPicture,
  ProfilePicture,
  Card,
  IconButton
} from '../../components/common';
class ViewActorProfileScreen extends Component {

 
  state = {
    isVisible: false,
    avtar: '',
    pics: [
      '',
      '',
      ''
    ]
  }
  componentWillMount() {
    const { isVisible } = this.props;
    this.setState({ isVisible });
    console.log('visibility :: ', this.props.isVisible);
  }

  onAppliedClicked() {
    if (!this.state.isChanged) {
      this.setState({ isChanged: true });
      //console.log('what is project id : ', this.props.data.uid);
      this.props.applyProject(this.props.data.uid);
    }
  }
  onHideClicked() {

  }

  onStarButtonClicked() {

  }

  onChatClicked() {

  }
  onBackPress() {
    let isVisible = this.state.isVisible;
    isVisible = false;
    this.setState({ isVisible });
  }
  renderAppliedButton() {
    return (
      <IconButton
        style={styles.iconStyle}
        onPress={() => this.onAppliedClicked()}
        iconname="check"
        lable="Apply"
        isApplied={this.state.isChanged}
      />
    );
  }
  renderProfileImage() {
    if (this.props.ProfilePic !== '') {
      return (
        <Image
          style={styles.profileImageStyle}
          source={{ uri: this.props.ProfilePic }}
        />
      );
    }

    return (
      <Image
        style={styles.profileImageStyle}
        source={require('../../images/ic_person_24px.png')}
      />
    );
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
  renderLoading() {
    return (
      <Spinner size="large" isVisible={this.props.userprofile.loading} />
    );
  }
  render() {
    console.log('render visibility :: ', this.props);
   // const { projectDetails } = this.props.navigation.state.params;
   // const { data } = this.props.navigation.state.params.projectDetails;
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#ffffff'}}>
          <CardSection>
              <ProfilePicture
                onPress={() => this.onProfileImgSelected()}
                picStyle={{ width: 100, height: 100 }}
                source={this.state.avtar || require('../../images/ic_person_24px.png')}
              />
          </CardSection>
          <CardSection  style={{flex: 1, flexDirection: 'row', paddingBottom: 10}}>
              <CardSection  style={{flex: 1, flexDirection: 'column', marginLeft: 30 }}>
                  <CardSection  style={styles.textContainer} >
                    <View>
                      <Text style={styles.textStyle}>Xxxxx Yyyyyy</Text>
                    </View>
                  </CardSection>
                  <CardSection  style={styles.textContainer} >
                    <View style={{ flex: 1, alignSelf: 'center', paddingTop: 10 }}>
                      <Text style={styles.textStyle}>Director - 12 years experience </Text>
                    </View>
                  </CardSection>
              </CardSection>
              <CardSection style={styles.iconContainer}>
                    <IconButton
                      style={styles.iconStyle}
                      onPress={() => this.onChatClicked()}
                      iconname="comment"
                      lable="Message"
                    />
                    <IconButton
                        style={styles.iconStyle}
                        onPress={() => this.onStarButtonClicked()}
                        iconname="star"
                        lable="Shortlist"
                    />
              </CardSection>
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
            <CardSection style={styles.Container}>
                <View style={{ flex: 1, alignSelf: 'center', paddingTop: 10 }}>
                  <Text style={styles.titleStyle}><Icon name="info-circle" style={styles.iconStyle}></Icon>About us</Text>
                  <Text style={styles.descriptionStyle}>I am Producer. Dummy copy please do not read this copy
                          Dummy copy please do not read this copy Dummy copy 
                        please do not read this copy</Text>
                </View>
            </CardSection>
            <CardSection style={styles.Container}>
                <View style={{ flex: 1, alignSelf: 'center', paddingTop: 10 }}>
                    <Text style={styles.titleStyle}><Icon name="address-book" style={styles.iconStyle}></Icon>Basic Details</Text>
                    <Text style={styles.descriptionStyle}>Name : Aarti Patil</Text>
                    <Text style={styles.descriptionStyle}>Age: 00</Text>
                    <Text style={styles.descriptionStyle}>Gender: Female</Text>
                    <Text style={styles.descriptionStyle}>Age: 00</Text>
                    <Text style={styles.descriptionStyle}>Language:   Marathi, Hindi English</Text>
                </View>
            </CardSection>
            <CardSection style={styles.Container}>
                <View style={{ flex: 1, alignSelf: 'center', paddingTop: 10 }}>
                <Text style={styles.titleStyle}><Icon name="graduation-cap" style={styles.iconStyle}></Icon>Professional information</Text>
                  <Text style={styles.descriptionStyle}>Category: Producer</Text>
                  <Text style={styles.descriptionStyle}>Experience in Industry: 12 yrs</Text>
                </View>
            </CardSection>
            <CardSection style={styles.Container}>
                <View style={{ flex: 1, alignSelf: 'center', paddingTop: 10 }}>
                <Text style={styles.titleStyle}><Icon name="map-marker" style={styles.iconStyle}></Icon>Contact Us</Text>
                  <Text style={styles.descriptionStyle}>Location:  Not defined</Text>
                  <Text style={styles.descriptionStyle}>City: Mumbai</Text>
                  <Text style={styles.descriptionStyle}>State: Maharashtra</Text>
                  <Text style={styles.descriptionStyle}>Address: Not defined</Text>
                  <Text style={styles.descriptionStyle}>Contact no: 9833117715</Text>
                </View>
            </CardSection>
            <CardSection style={styles.Container}>
                <View style={{ flex: 1, alignSelf: 'center', paddingTop: 10 }}>
                  <Text style={styles.titleStyle}><Icon name="globe" style={styles.iconStyle}></Icon>Social</Text>
                    <Text style={styles.descriptionStyle}>Facebook: Not defined</Text>
                    <Text style={styles.descriptionStyle}>Youtube: https://www.youtube.com/?gl=IN</Text>
                    <Text style={styles.descriptionStyle}> Instagram: Not defined</Text>
                </View>
            </CardSection>
            <CardSection style={styles.Container}>
                <View style={{ flex: 1, alignSelf: 'center', paddingTop: 10 }}>
                <Text style={styles.titleStyle}><Icon name="file" style={styles.iconStyle}></Icon>Biodata</Text>
                  <Text style={styles.descriptionStyle}>xxxxxyyyyy.pdf</Text>
                </View>
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
  descriptionStyle: {
    paddingTop: 6,
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
 
  titleStyle: {
    fontSize: 16,
    fontWeight: '600'
  },
  iconStyle: {
    padding: 10,
    fontSize: 16,
    fontWeight: '600'
  },
  textStyle: {
    fontSize: 14
  },
  iconContainer: {
    marginRight: 30,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'space-around',
  },
 textContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'space-around',
  },
  Container: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: 30,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
 
  profileImageStyle: {
    alignSelf: 'flex-start',
    marginTop: 16,
    padding: 10,
    width: 40,
    height: 40,
    borderRadius: 75,
    borderColor: '#000'
  }
};

export { ViewActorProfileScreen };
