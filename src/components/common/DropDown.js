import React from 'react';
import { View, Text, Picker } from 'react-native';


const DropDown = ({ children, label, onValueChange, selectedValue, mode, style }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelStyle}>
        {label}
      </Text>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.pickerStyle}
          itemStyle={{ flex: 1 }}
          mode={mode}
          selectedValue={selectedValue}
          onValueChange={onValueChange}
        >
          {children}
        </Picker>
      </View>
    </View>
  );
};

const styles = {
  container: {
    //height: '7%',
    flex: 1,
    paddingLeft: 40,
    flexDirection: 'column',
    backgroundColor: '#ffffff'
  },
  labelStyle: {
    //paddingLeft: 40,
    //paddingTop: 0,
    fontSize: 12,
    textAlign: 'left'
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    width: '88%',
    borderColor: '#D9D5DC',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  pickerStyle: {
    width: '80%',

  }
};


export { DropDown };
