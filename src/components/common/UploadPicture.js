import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';


const UploadPicture = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress} style={[styles.buttonStyle, props.style]}>
        <Image
          style={[styles.picStyle, props.picStyle]}
          source={props.source}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    width: 84,
    height: 84,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 6,
    borderStyle: 'solid',
    borderWidth: 0.7,
    borderColor: '#95989a'
  },
  buttonStyle: {
    alignSelf: 'center',
  },
  picStyle: {
    alignSelf: 'center',
    marginTop: 20,
    width: 50,
    height: 50,
    borderRadius: 6
  }
};

export { UploadPicture };
