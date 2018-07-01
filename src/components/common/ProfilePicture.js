import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';


const ProfilePicture = (props) => {
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
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 75,
  },
  buttonStyle: {
    alignSelf: 'center',
  },
  picStyle: {
    alignSelf: 'center',
    marginTop: 20,
    width: 100,
    height: 100,
    borderRadius: 75
  }
};


export { ProfilePicture };
