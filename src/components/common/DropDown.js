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
    height: '5%',
    flex: 1,
    paddingLeft: 40,
    flexDirection: 'column',
    backgroundColor: '#ffffff'
  },
  labelStyle: {
    fontSize: 14,
    textAlign: 'left',
    paddingTop:10
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    width: '89%',
    
    height:'80%',
    borderColor: '#D9D5DC',
    borderRadius: 5,
   //alignItems: 'center',
    flexDirection: 'column',
    //justifyContent: 'center',
    backgroundColor: '#ffffff'
  },

  label:{
    fontSize:5
  },

  pickerStyle: {
    width: '100%',
    lineHeight:50
  }
};


export { DropDown };
