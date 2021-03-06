import React, { Component } from 'react';
import {
  StyleSheet, View
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'react-native-firebase';

import { Button } from './common';
import { clearChatList } from '../actions';

let uid;
let name;
let avatar;

export default class Chat extends Component {

  static navigationOptions = () => ({
      header: null
  });

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };

    this.user = firebase.auth().currentUser;
    //console.log(`User:${this.user.uid}`);
    console.log('navigation data >>>> ', this.props.navigation);
    const { params } = this.props.navigation.state;
    uid = params.uid;
    name = params.name;
    avatar = params.avatar;
    /*name = params.name;
    email = params.email;
    console.log(`User:${uid}`);*/

    this.chatRef = this.getRef().child(`chat/${this.generateChatId()}`);
    this.chatRefData = this.chatRef.orderByChild('order');
    this.onSend = this.onSend.bind(this);
  }

  //generate ChatId works cause when you are the user sending chat you take user.uid
  //and your friend takes uid
  // when your friend is using the app to send message s/he takes user.uid
  //and you take the uid cause you are the friend

  componentDidMount() {
    this.listenForItems(this.chatRefData);
  }

  componentWillUnmount() {
    this.chatRefData.off();
  }
  onSend(messages = []) { 
    // this.setState({
    //     messages: GiftedChat.append(this.state.messages, messages),
    // });
    messages.forEach(message => {
      //var message = message[0];
      const now = new Date().getTime();
      this.chatRef.push({
        _id: now,
        name,
        avatar,
        text: message.text,
        createdAt: now,
        uid: this.user.uid,
        fuid: uid,
        order: -1 * now
      });
    });
  }

  onBackPressed() {

    this.props.navigation.goBack(null);
  }

  getRef() {
    return firebase.database().ref();
  }

  listenForItems(chatRef) {
    chatRef.on('value', snap => {
      // get children as an array
      const items = [];
      snap.forEach(child => {
        //var name = child.val().uid == this.user.uid ? this.user.name : name1;
        items.push({
          _id: child.val().createdAt,
          text: child.val().text,
          createdAt: new Date(child.val().createdAt),
          user: {
            _id: child.val().uid,
            name: child.val().name,
            avatar: child.val().avatar
          }
        });
      });

      this.setState({
        loading: false,
        messages: items
      });
    });
  }

  generateChatId() {
    if (this.user.uid > uid) return `${this.user.uid}-${uid}`;
    return `${uid}-${this.user.uid}`;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
      <Button onPress={this.onBackPressed.bind(this)}>
        Back
      </Button>
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend.bind(this)}
        user={{
          _id: this.user.uid
        }}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    marginRight: 10,
    marginLeft: 10
  }
});
