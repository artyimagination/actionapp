import React from 'react';
import { Text, TouchableOpacity } from 'react-native';


const Button = ({ onPress, children, style, labelStyle }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
      <Text style={[textStyle, labelStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};


const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    width: 100,
    alignSelf: 'center',
    backgroundColor: 'rgb(234, 94, 32)',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgb(234, 94, 32)',
    marginLeft: 20,
    marginRight: 20
  }
};


export { Button };
