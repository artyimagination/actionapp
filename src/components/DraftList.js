import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const DraftList = ({ data, onPress }) => {
    console.log('passeddata', data);
  
  const { container, imageStyle, buttonStyle, textStyle } = styles;
  return (
    <View style={container}>
      <TouchableOpacity onPress={onPress} style={buttonStyle}>
        <Text style={textStyle}>
        {data.name}  {data.title}
      </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
 
  textStyle: {
    alignSelf: 'center',
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingLeft: 20,
    // marginLeft: 20,
    // marginRight: 20
  }
};

export default DraftList;
