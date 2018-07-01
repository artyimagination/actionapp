import React, { Component } from 'react';
import { View, Text } from 'react-native';

import ChatUserList from '../../components/ChatUserList';

class ChatScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ChatUserList />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  }
};

export { ChatScreen };
