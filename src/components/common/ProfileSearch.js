// import React from 'react';
// import { View, Image, TouchableOpacity, Text } from 'react-native';

// import {
 
//     CardSection,
//     Card
   
//   } from '../../components/common';

// const ProfileSearch = (props) => {
//     const { labelStyle, container, buttonStyle, picStyle } = styles;
//   return (
   
//     <View style={styles.container}>
       
//         <Text style={styles.labelStyle}>Location</Text> 
//             <Text style={styles.labelStyle}>R1030556  - Artist</Text>
//             <Text style={styles.labelStyle}>R1030556  - Artist</Text>
//             <Text style={styles.labelStyle}>Location</Text> 
//              <Text style={styles.labelStyle}>Mumbai</Text>
//             <Image
//             style={styles.picStyle}
//             source={require('../images/ic_person_24px.png')}
//             />
//         {/* <CardSection> */}
//         <Text style={styles.labelStyle}>Location</Text> :  <Text style={styles.labelStyle}>Mumbai</Text>
//         {/* </CardSection> */}
    
//     </View>
   
//   );
// };

// const styles = {
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     height: 80,
//     width: 80
//   },
//   buttonStyle: {
//     alignSelf: 'center',
//   },
//   picStyle: {
//     alignSelf: 'center',
//     marginTop: 20,
//     // width: 100,
//     // height: 100,
//     borderRadius: 75
//   },
//    labelStyle: {
//     paddingLeft: 40,
//     flexDirection: 'row',
//     paddingTop: 10,
//     paddingBottom: 4,
//     fontSize: 12,
//     textAlign: 'left'
//   }
// };


// export { ProfileSearch };


import React from 'react';
import { View, Text,Image } from 'react-native';
import { Card } from './Card';


const ProfileSearch = (props) => {
  return (
    <View style={styles.logoTextContainer}>
    <Card style={styles.cardWrap}>
    
      <Text style={styles.textStyle}>R1030556  - Artist</Text>
      <Image
             style={styles.picStyle}
             source={require('../../images/ic_person_24px.png')}
             />
             <Text style={styles.labelStyle}>Location : Mumbai</Text>  
    </Card>
    <Card style={styles.cardWrap}>
    
    <Text style={styles.textStyle}>R1030556  - Artist</Text>
    <Image
           style={styles.picStyle}
           source={require('../../images/ic_person_24px.png')}
           />
           <Text style={styles.labelStyle}>Location : Mumbai</Text>  
         
          
  </Card>
 
      
    </View>
  );
};

const styles = {

    logoTextContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
      },
    cardWrap :{
        flex: 1,
        width:'50%',
        height:'80%',
        justifyContent: 'space-around',
        textAlign: 'center',
       
    },
  textStyle: {
    alignSelf: 'center',
    color: '#ea5e20',
    fontFamily: 'Fonarto',
    fontSize: 12,
    paddingTop: 10,
    paddingBottom: 10
  },
 
  labelStyle: {
         paddingLeft: 40,
         flexDirection: 'row',
         paddingTop: 10,
         paddingBottom: 4,
         fontSize: 12,
         textAlign: 'center',
         alignSelf: 'center'
       },
    picStyle: {
        alignSelf: 'center',
        marginTop: 20,
        width: 60,
        height: 60,
        borderRadius: 75,
        border: 1
    },
};

export { ProfileSearch };
