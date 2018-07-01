import React from 'react';
import { Text, TouchableOpacity } from 'react-native';


const TextButton = ({ onPress, children, style }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: 20,
    paddingLeft: 5,
    paddingRight: 5
  },
  textStyle: {
    fontSize: 14,
    fontWeight: '200',
    fontFamily: 'Roboto',
    color: '#3F51B5'
  }
};

export { TextButton };
