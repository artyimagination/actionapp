import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { CardSection, Card } from './common';
import { ViewActorProfileScreen } from '../scenes/mainscreens';

const ChatList = ({ user, onPress }) => {
  const { container, imageStyle, buttonStyle, textStyle } = styles;
  return (
      //  <View style={{ flex: 1, flexDirection: 'row' }}>
      //    <CardSection style={container}>
      //       <TouchableOpacity onPress={onPress} style={buttonStyle}>
      //           <Image
      //             style={imageStyle}
      //             source={require('../images/ic_person_24px.png')}
      //           />
      //           <CardSection style={{ flexDirection: 'row' }}>
      //               <Text style={{ color: 'grey' }}>
      //               {user.category}
      //               </Text>
      //               <Text style={{  }}>
      //               5.00 PM
      //               </Text>
      //           </CardSection>
      //           <CardSection style={{ flex: 1,
      //             flexDirection: 'row',
      //             justifyContent: 'space-between',
      //             paddingTop: 30,
      //             paddingRight: 100,
      //             alignItems: 'flex-start', }}>  
      //                 <Text >
      //                 {user.name}
      //                 </Text>
      //           </CardSection>
      //           </TouchableOpacity>
      //     </CardSection>
      //   </View>

        <View style={{ flexDirection: 'row'}}>
           <CardSection style={container}>
              <TouchableOpacity onPress={onPress} style={buttonStyle}>
                    <CardSection style={{ flexDirection: 'column', justifyContent: 'space-around'}}>
                    <Image
                   style={imageStyle}
                   source={require('../images/ic_person_24px.png')} /></CardSection>
                    <CardSection style={{flexDirection: 'row'}}>
                        <Text style={{ color: 'grey' }}>
                        {user.category}
                        </Text>
                        <Text style={{ color: 'grey'}}>
                          5:00 PM                       
                        </Text>
                        <CardSection style={{ paddingTop: 20, justifyContent: 'center'}}><Text>{user.name}</Text></CardSection>
                    </CardSection>   
                </TouchableOpacity>
          </CardSection>
        </View>
  
  );
};

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    
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
