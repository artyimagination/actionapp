import React from 'react';
import { TextInput, View, Text } from 'react-native';


const Input = ({ label, value, onChangeText, placeHolder, isPassword,
    keyboardType, style, editable, maxLength, multiline, numOfLines, iStyle, lStyle }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;
  return (
    <View style={[containerStyle, style]}>
      <Text style={[labelStyle, lStyle]}>{label}</Text>
      <TextInput
        secureTextEntry={isPassword}
        keyboardType={keyboardType}
        style={[inputStyle, iStyle]}
        placeholder={placeHolder}
        autoCorrect={false}
        value={value}
        editable={editable}
        maxLength={maxLength}
        multiline={multiline}
        numOfLines={numOfLines}
        onChangeText={onChangeText}
        onFocus={(e) => e.target.placeholder = ""} 
        onBlur={(e) => e.target.placeholder = " "}
        windowSoftInputMode="adjustResize"
        underlineColorAndroid='rgba(0,0,0,0)'
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    width: '80%',
    height: 50,
    alignSelf: 'center',
    paddingTop: 4,
    paddingBottom: 4,
    borderColor: '#D9D5DC',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 14,
    fontFamily: 'Roboto',
    lineHeight: 16,
    color: '#000'
  },
  labelStyle: {
    paddingLeft: 40,
    paddingTop: 10,
    paddingBottom: 4,
    fontSize: 12,
    textAlign: 'left'
  },
  containerStyle: {
    height: 80,
    flex: 1,
    paddingBottom: 10,
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
};

export { Input };
