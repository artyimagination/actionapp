import React, { Component } from 'react';
import { ScrollView, View, Text, Alert, Image, Modal, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

import { userProfile, signUpUser } from '../../actions';
import { TextButton, CardSection, Input, Button, Spinner, LogoText } from '../../components/common';
import { Validator, PasswordValidator } from '../../utils/Validator';
//import NavigationService from '../../components/NavigationService';
//import PhoneVerificationPopup  from './PhoneVerificationPopup';
//import styles from '../../style/commonStyle';


class UserSignUp extends Component {

  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: '',
      codeInput: '',
      mobile: '+91',
      confirmResult: null,
      modalVisible: false
     
    };
  }
  

    static navigationOptions = ({
      header: null
    });


    componentDidMount() {
      this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ user: user.toJSON() });
        } else {
          // User has been signed out, reset the state
          this.setState({
            user: null,
            message: '',
            codeInput: '',
            mobile: '+91',
            confirmResult: null,
          });
        }
      });
    }
  
    componentWillUnmount() {
       if (this.unsubscribe) this.unsubscribe();
    }
  
    // signIn = () => {

    //   const { name,  password, confirmPassword, mobile } = this.props;

    //   const object = { confirmPassword, password };
    //   const error = Validator('name', name)
    //     || Validator('password', password)
    //     || PasswordValidator(object)
    //     || Validator('mobile', mobile);
        
    //  const mobileNo = '+91'+mobile;
  
    //   if (error != null) {
      
    //     Alert.alert('Error', error);
    //   } else {
    //     console.log('else');
    //     const mobile = this.props.mobile;
      
    //     const userRef = firebase.database().ref(`/users/`);
      
    //     userRef.once('value', function(snapshot) {
         
    //       //If user is existed redirect to login page
    //       if(snapshot.val().mobile == mobile){
    //         Alert.alert('Error', 'Phone number is already registered! Please login with your credentials');
    //           NavigationService.navigate('Login');
    //       }
     
    //     });
       
    //   }     
    //     // If user is not exist signup
    //     firebase.auth().signInWithPhoneNumber(mobileNo)
    //       .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' },
    //       this.renderVerificationCodeInput()
    //     ))
    //       .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
    // };
  
    // confirmCode = () => {
    //   const { codeInput, confirmResult, message } = this.state;
    //   if (confirmResult && codeInput.length) {
    //     confirmResult.confirm(codeInput)
       
    //       .then((user) => {
    //         console.log(confirmResult);
    //         this.setState({ message: 'Code Confirmed!' });
         
    //         NavigationService.navigate('UserProfile');
    //       })
    //       .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
    //   }
    // };
    onBackClicked() {
      //const { modalVisible } = this.state;
     // console.log('on back button clicked');
      this.setState({ modalVisible: false });
    }
    onCancelClicked() {
      this.props.navigation.goBack();
    }
  
    onSignUpUser() {
      const { email, name, password, confirmPassword, mobile } = this.props;
  
      const object = { confirmPassword, password };
      const error = Validator('name', name)
        || Validator('password', password)
        || PasswordValidator(object)
        || Validator('mobile', mobile);
        
      // const mobileNo = '+91'+mobile;
      // console.log(mobileNo);
      // console.log(name);
      if (error != null) {
        console.log('Error in Email id : ', error);
        Alert.alert('Error', error);
      } else {
        this.props.signUpUser({ email, name, password, mobile });
      }
    }
  
    setModalVisible(visible) {
      this.setState({ modalVisible: visible });
    }

    renderMessage() {
      const { message, confirmResult } = this.state;
      if (!message.length) return null;
    
      return (
        <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
      );
    }
    
    renderVerificationCodeInput() {
  
           console.log('code');
           const { codeInput } = this.state;
           this.setModalVisible(!this.state.modalVisible);
           console.log(this.state.modalVisible);
          // return (
          //       <PhoneVerificationPopup/>
          // )
   
      // return (
      //   <ScrollView style={{ marginTop: 25, padding: 25 }}>
      //     <Text>Enter verification code below:</Text>
      //     <Input
      //       autoFocus
      //       style={{ height: 40, marginTop: 15, marginBottom: 15 }}
      //       onChangeText={value => this.setState({ codeInput: value })}
      //       placeholder={'Code ... '}
      //       value={codeInput}
      //     />
      //     {/* <Button onPress={() => this.openHeaderModal()} vertical/> */}
      //     <Button title="Confirm Code" color="#841584" onPress={this.confirmCode} />
      //   </ScrollView>
      // );

      <View style={{  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0  }}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          console.log('Modal has been closed');
        }}
      >
      {console.log(this.state.modalVisible)}
       <View >
        <Text>Enter verification code below:</Text>
         <Input
           autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
           onChangeText={value => this.setState({ codeInput: value })}
           placeholder={'Code ... '}
           value={codeInput}
         />
      
         <Button title="Confirm Code" color="#841584" onPress={this.confirmCode} />
       </View>
     
      </Modal>
     
    </View>
    }

  renderLoading() {
    console.log('loading state :: ', this.props.loading);
    return (
      <Spinner size="large" isVisible={this.props.loading} />
    );
  }

  renderButton() {
    return (
      <Button onPress={this.onSignUpUser}>
        Sign Up
      </Button>
    );
  }

  renderCancelButton() {
    return (
      <Button
        style={{ backgroundColor: '#dedbdb', borderColor: '#dedbdb' }}
        labelStyle={{ color: '#000' }}
        onPress={this.onCancelClicked.bind(this)}
      >
        Cancel
      </Button>
    );
  }


  render() {
    const { user, confirmResult } = this.state;
    return (
      <View style={{ flex: 1 }}>
          {this.renderLoading()}
          <CardSection>
          <View style={styles.logoStyle}>
            <Text style={styles.logoTextStyle}>
              action
            </Text>
          </View>
          </CardSection>
          <CardSection>
            <Input
              label="Name"
              placeHolder="Enter Name"
              value={this.props.name}
              onChangeText={value => this.props.userProfile({ prop: 'name', value })}
            />
          </CardSection>
          <CardSection>
            <Input
              label="Mobile"
              placeHolder="Enter Number"
              keyboardType="phone-pad"
              value={this.props.mobile}
              onChangeText={value => this.props.userProfile({ prop: 'mobile', value })}
            />
          </CardSection>
         
         {/* <CardSection>
         {confirmResult && this.renderVerificationCodeInput()}
        
         </CardSection> */}
          <CardSection>
            <Input
              isPassword
              label="Password"
              placeHolder="Password"
              value={this.props.password}
              onChangeText={value => this.props.userProfile({ prop: 'password', value })}
            />
          </CardSection>
          <CardSection>
            <Input
              isPassword
              label="Re-enter Password"
              placeHolder="Password"
              value={this.props.confirmPassword}
              onChangeText={value => this.props.userProfile({ prop: 'confirmPassword', value })}
            />
          </CardSection>
          {this.renderMessage()}
          <CardSection style={styles.buttonStyle}>
            {this.renderButton()}
            {this.renderCancelButton()}
           
          </CardSection>
         
      </View>
      
    );
  }
}

const styles = {
  logoStyle: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50
  },
  logoTextStyle: {
    width: 170,
    height: 80,
    fontFamily: 'Fonarto',
    fontSize: 50,
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: 'rgb(234, 94, 32)'
  },
  buttonStyle: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 15,
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingBottom: 30
  },
  cardSectionContainer: {
    //flex: 1,
    flexDirection: 'row',
    paddingLeft: 80,
  },
  socialLoginButton: {
    color: 'rgb(234, 94, 32)', 
    paddingLeft: 3,
    paddingRight: 3
  },
};

const mapStateToProps = (state) => {
  const { name, password, confirmPassword, mobile, loading } = state.userprofile;
  return { name, password, confirmPassword, mobile, loading };
};

const SignUpComponent = connect(mapStateToProps, {
  userProfile, signUpUser })(UserSignUp);
export { SignUpComponent as UserSignUp };
