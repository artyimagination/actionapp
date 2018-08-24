import React from 'react';
import { View, Text } from 'react-native';


const LogoText = (props) => {
  return (
    <View style={styles.logoTextContainer}>
      <Text style={styles.textStyle}>
        {props.children}
      </Text>
    </View>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#ea5e20',
    fontFamily: 'Fonarto',
    fontSize: 40,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  logoTextContainer: {
    flex: 1,
    alignItems: 'center',
    fontFamily: 'Fonarto'
  }
};

export { LogoText };
