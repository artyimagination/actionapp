import React from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';


const Spinner = ({ isVisible, size }) => {
  return (
    <Modal
      animationType={'none'}
      transparent
      visible={isVisible}
      onRequestClose={() => {
          console.log('Modal has been closed.');
      }}
    >
      <View style={styles.spinnerStyle}>
          <ActivityIndicator size={size || 'large'} />
      </View>
    </Modal>
  );
};

const styles = {
  spinnerStyle: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export { Spinner };
