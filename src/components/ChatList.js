import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { CardSection, Card } from './common';

const ChatList = ({ user, onPress }) => {
  const { container, imageStyle, buttonStyle, textStyle } = styles;
  return (
    <CardSection style={container}>
       <View tyle={{ flex: 1, flexDirection: 'row' }}>
          <TouchableOpacity onPress={onPress} style={buttonStyle}>
            <Image
              style={imageStyle}
              source={require('../images/ic_person_24px.png')}
            />
            <Text style={{ color: 'grey' }}>
            {user.category}
            </Text>
            <Text style={{ paddingLeft: 60, flexDirection: 'row' }}>
            5.00 PM
            </Text>
            <Card>  
              <Text >
              {user.name}
              </Text>
            </Card>
           
          
          </TouchableOpacity>
        </View>
    </CardSection>
    
   
  );
};

const styles = {
  container: {
    flex: 1,
   
  },
  imageStyle: {
    width: 40,
    height: 40,
    borderRadius: 75,
    margin: 10
  },
  textStyle: {
    flexDirection: 'column',
   
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 15,
    paddingBottom: 10,
    marginLeft: 0,
    paddingLeft: 0
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
