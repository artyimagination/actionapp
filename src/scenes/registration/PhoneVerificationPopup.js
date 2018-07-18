import React, { Component } from 'react';
import { Modal, Text, View } from 'react-native';

import { Button } from '../../components/common';

class PhoneVerificationPopup extends Component {

  state = {
    modalVisible: true
  };

  componentWillMount() {
    //this.setState({ modalVisible: this.props.isVisible });
  }

  onBackClicked() {
    //const { modalVisible } = this.state;
    console.log('on back button clicked');
    this.setState({ modalVisible: false });
  }

  render() {
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
