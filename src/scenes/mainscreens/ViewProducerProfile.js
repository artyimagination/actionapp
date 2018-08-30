import React, { Component } from 'react';
import { View, Text, ScrollView, Alert, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
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

import { Validator } from '../../utils/Validator';

class ViewProducerProfile extends Component {

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

  getInitialState() {
    return {
        showCancel: false,
    };
}

toggleCancel() {
    this.setState({
        showCancel: !this.state.showCancel
    });
}


  renderLoading() {
    return (
      <Spinner size="large" isVisible={this.props.userprofile.loading} />
    );
  }

  render() {
   
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
          {this.renderLoading()}
          <CardSection style={{ padding: 20}}>
            <ProfilePicture
              onPress={() => this.onProfileImgSelected()}
              picStyle={{ width: 100, height: 100 }}
              source={this.state.avtar || require('../../images/ic_person_24px.png')}
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

          <CardSection style={styles.uploadPicStyle}>
            <View style={{ flex: 1, paddingTop: 10 }}>
              <Text style={styles.labelStyle}>About details</Text>
              <IconButton iconname="pencil"  style={styles.iconStyle}
        onPress={() => this.onClicked()}></IconButton>
             <Text style={styles.textStyle}>i am Producer. Dummy copy please do not read this copy
                  Dummy copy please do not read this copy Dummy copy 
                  please do not read this copy</Text>
            </View>
          </CardSection>
          <CardSection style={styles.uploadPicStyle}>
            <View style={{ flex: 1, paddingTop: 10 }}>
            <IconButton iconname="contact"
        onPress={() => this.onClicked()}></IconButton>
             <Text style={styles.labelStyle}>Basic Details</Text>
              <IconButton iconname="pencil"  style={styles.iconStyle}
        onPress={() => this.onClicked()}></IconButton>
            
              <Text style={styles.textStyle}>Name : Aarti Patil</Text>
              <Text style={styles.textStyle}>Gender: Female</Text>
              <Text style={styles.textStyle}>Language:   Marathi, Hindi English</Text>
            </View>
          </CardSection>
          <CardSection style={styles.uploadPicStyle}>
          <View style={{ flex: 1, paddingTop: 10 }}>
          <IconButton iconname="graduation-cap"  
        onPress={() => this.onClicked()}></IconButton>
            <Text style={styles.labelStyle}>
            Professional Information
            </Text>
             <IconButton iconname="pencil"  style={styles.iconStyle}
        onPress={() => this.onClicked()}></IconButton>
            <Text style={styles.textStyle} >
              Category: Producer
            </Text>    
            </View>      
          </CardSection>
          <CardSection style={styles.uploadPicStyle}>
          <View style={{ flex: 1,  paddingTop: 10 }}>
          <IconButton iconname="map-marker"
        onPress={() => this.onClicked()}></IconButton>
            <Text style={styles.labelStyle} >
            Contacts
            </Text>
            <IconButton iconname="pencil"  style={styles.iconStyle}
        onPress={() => this.onClicked()}></IconButton>
            
            <Text  style={styles.textStyle}>
            Location:  Not defined
            </Text>
            
            <Text  style={styles.textStyle}>
           City: Mumbai
            </Text>
            
            <Text  style={styles.textStyle}>
            State: Maharashtra
            </Text>
            
            <Text  style={styles.textStyle}>
            Address: Not defined
            </Text>
            
            <Text  style={styles.textStyle} >
            Contact no: 9833117715
            </Text>
            </View>
          </CardSection>
          <CardSection style={styles.uploadPicStyle} >
          <View style={{ flex: 1,  paddingTop: 10 }}>
          <IconButton iconname="globe" 
        onPress={() => this.onClicked()}></IconButton>
            <Text style={styles.labelStyle}>
            Social
            </Text>
            <IconButton iconname="pencil"  style={styles.iconStyle}
        onPress={() => this.onClicked()}></IconButton>
            <Text style={styles.textStyle} >
            Facebook: Not defined
            </Text>  
            <Text style={styles.textStyle} >
            Youtube: https://www.youtube.com/?gl=IN
            </Text>  
            <Text style={styles.textStyle} >
            Instagram: Not defined
            </Text>      
            </View>    
          </CardSection>
          <CardSection style={styles.uploadPicStyle}>
          <View style={{ flex: 1,  paddingTop: 10 }}>
            <IconButton iconname="pencil"  style={styles.LableIconStyle}
             onPress={() => this.onClicked()}></IconButton>
          <Text style={styles.labelStyle}>
            Biodata
            </Text>
           
                <IconButton iconname="pencil"  style={styles.iconStyle}
                  onPress={() => this.onClicked()}></IconButton>  
          
            <Text  style={styles.textStyle}>
            xxxxxyyyyy.pdf
            </Text>     
            </View>     
          </CardSection>
      
      </ScrollView>
    );
  }
}

const styles = {
  LableIconStyle:{
      flex:1,
      flexDirection: 'row',
      paddingLeft: 10,
      justifyContent: 'flex-start'
  },
  uploadPicStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 10
  },
  textStyle:{
    fontSize: 12,
    paddingLeft: 10,
    paddingRight: 10
  },
  labelStyle: {
    fontSize: 14,
    fontWeight: '600',
    padding: 10
  },
  iconStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
   marginRight: 100
  },
};


const mapStateToProps = state => {
  return state;
};

const ViewProducerProfileComponent = connect(mapStateToProps,
  { userProfile, saveUserDetails, uploadUserProfileImage })(ViewProducerProfile);

export { ViewProducerProfileComponent as ViewProducerProfile };
