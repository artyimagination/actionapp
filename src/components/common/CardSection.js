import React from 'react';
import { View } from 'react-native';


const CardSection = (props) => {
  const { containerStyle } = styles;
  return (
    <View style={[containerStyle, props.style]}>
      {props.children}
    </View>
  );
};


const styles = {
  containerStyle: {
    padding: 0,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#fff',
    position: 'relative'
  }
};

export { CardSection };
