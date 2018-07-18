import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const IconButton = ({ onPress, lable, style, labelStyle, iconname }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
      <Icon name={iconname} size={15} />
      <Text style={[textStyle, labelStyle]}>
        {lable}
      </Text>
    </TouchableOpacity>
  );
};


const styles = {
  textStyle: {
    color: '#000',
    fontSize: 8,
    fontWeight: '600',
    textAlign: 'center'
  },
  buttonStyle: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff'
  }
};


export { IconButton };
