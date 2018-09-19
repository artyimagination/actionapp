import React from 'react';
import { View, Text } from 'react-native';

import { Button } from '../../../components/common';

const CastList = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Button>
        <Text>
          {props.title}
        </Text>
      </Button>
    </View>
  );
};

export default CastList;