import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const ChatList = ({ user, onPress }) => {
  const { container, imageStyle, buttonStyle, textStyle } = styles;
  return (
    <View style={container}>
      <TouchableOpacity onPress={onPress} style={buttonStyle}>
        <Image
          style={imageStyle}
          source={require('../images/ic_person_24px.png')}
        />
        <Text style={textStyle}>
          {user.name}
        </Text>
        <Text>
          Time
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  imageStyle: {
    width: 40,
    height: 40,
    borderRadius: 75
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
    marginLeft: 20,
    marginRight: 20
  }
};

export default ChatList;
