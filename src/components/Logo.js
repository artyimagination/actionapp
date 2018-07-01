import React from 'react';
import { View, Image, Text } from 'react-native';


const Logo = () => {
  return (
    <View style={styles.logoStyle}>
      <Image
        style={{ width: 119, height: 118 }}
        source={require('../images/logo/logo.png')}
      />
      <Text style={styles.logoTextStyle}>
        action
      </Text>
    </View>
  );
};

const styles = {
  logoStyle: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 44
  },
  logoTextStyle: {
    width: 117,
    height: 80,
    fontFamily: 'Fonarto',
    fontSize: 40,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: 'rgb(234, 94, 32)'
  }
};

export default Logo;
