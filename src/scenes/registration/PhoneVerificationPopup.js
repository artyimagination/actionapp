import React, { Component } from 'react';
import { Modal, Text, View, ScrollView, Input } from 'react-native';
import { Button } from '../../components/common';

class PhoneVerificationPopup extends Component {

  state = {
    modalVisible: true,
    codeInput:'',
    modalVisible: false,
  };

  componentWillMount() {
    this.setState({ modalVisible: this.props.isVisible,
      codeInput: this.props.codeInput
     });
  }

  onBackClicked() {
    //const { modalVisible } = this.state;
    console.log('on back button clicked');
    this.setState({ modalVisible: false });
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
    
  confirmCode = () => {
    const { codeInput, confirmResult, message } = this.state;
    const { name, mobile } = this.props;
    if (confirmResult && codeInput.length) {
      confirmResult.confirm(codeInput)
     
        .then((user) => {
          console.log(confirmResult);
          this.setState({ message: 'Code Confirmed!' });
          console.log(message);
          const ref = firebase.database().ref(`/users/`)
          .push({ 'name': name,'mobile' :mobile});
          NavigationService.navigate('UserProfile');
        })
        .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
    }
  };

  render() {
    const { codeInput } = this.state;
    
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log('Modal has been closed');
          }}
        >
        
         {/* <ScrollView style={{ marginTop: 25, padding: 25 }}>
          <Text>Enter verification code below:</Text>
           <Input
             autoFocus
            style={{ height: 40, marginTop: 15, marginBottom: 15 }}
             onChangeText={value => this.setState({ codeInput: value })}
             placeholder={'Code ... '}
             value={codeInput}
           />
        
           <Button title="Confirm Code" color="#841584" onPress={this.confirmCode} />
         </ScrollView> */}
          <View style={{ marginTop: 22 }}>
            <Text>Hello World</Text>
            <Button
              onPress={this.onBackClicked.bind(this)}
            >
              Back
            </Button>
          </View>
        </Modal>
      </View>
    );
  }
}

export { PhoneVerificationPopup };
