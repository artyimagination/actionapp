import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const IconButton = ({ onPress, lable, style, labelStyle, iconname, isApplied = false }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
      <Icon name={iconname} size={15} color={isApplied === false ? '#cccccc' : '#ff0000'} style={{ paddinLeft: 10 }} />
      <Text style={[textStyle, labelStyle]}>
        {lable}
      </Text>
    </TouchableOpacity>
  );
};


const styles = {
  textStyle: {
    paddinLeft: 10,
    color: '#000',
    fontSize: 9,
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
