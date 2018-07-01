import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import firebase, { Notification } from 'react-native-firebase';
//import firebase from 'react-native-firebase';

import { CardSection } from '../../components/common';

class NotificationScreen extends Component {

  static navigationOptions = ({
    title: 'Notification'
  });


  componentWillMount() {
    firebase.messaging().hasPermission()
    .then(enabled => {
      console.log('user has permissions >>>>> ', enabled);
      if (enabled) {
        // user has permissions
        this.showNotification();
      } else {
        try {
            firebase.messaging().requestPermission()
            .then(() => {
              // User has authorised
              this.showNotification();
            })
            .catch(error => {
              // User has rejected permissions
              console.log(error);
            });
        } catch (error) {
            // User has rejected permissions
            console.log(error);
        }
      }
    });

    this.notificationDisplayedListener =
    firebase.notifications().onNotificationDisplayed((notification: Notification) => {
        console.log('received notification >>>> ', notification);
    });
  }

  showNotification() {
    /*const channel = new firebase.notifications.Android.Channel(
      'notifyme',
      'Notify Me',
      firebase.notifications.Android.Importance.Max
    ).setDescription('A natural description of the channel');
    firebase.notifications().android.createChannel(channel);
    // the listener returns a function you can use to unsubscribe
    this.unsubscribeFromNotificationListener =
    firebase.notifications().onNotification(() => {
      //if (Platform.OS === 'android') {
        console.log(' is platform android  >>>>>> ');
        const localNotification = new firebase.notifications.Notification({
            sound: 'default',
            show_in_foreground: true,
          })
          .setNotificationId('notifcationid')
          .setTitle('hellotitle')
          .setSubtitle('hellosubtitle')
          .setBody('iamimpreesesss')
          .setData({
            key1: 'value',
            key2: 'value'
          })
          .android.setChannelId('notifyme') // e.g. the id you chose above
          .android.setSmallIcon('../../images/logo.png') // create this icon in Android Studio
          .android.setColor('#000000') // you can set a color here
          .android.setPriority(firebase.notifications.Android.Priority.High);

        firebase.notifications()
          .displayNotification(localNotification)
          .catch(err => console.log(err));
      //}
    });*/

    const notification = new firebase.notifications.Notification()
      .setNotificationId('notisdfnskjklsdaficationId')
      .setTitle('hellosdfnsdkf')
      .setBody('hellosdfnsdkflksdjfkjs')
      .setData({
        key1: 'value1',
        key2: 'value2',
      });

    notification
    .android.setChannelId('hellochannel')
    .android.setSmallIcon('../../images/logo.png');

    firebase.notifications()
    .displayNotification(notification)
    .then(() => {
      console.log('notification display');
    })
    .catch(err => console.log(err));

    //console.log(' is platform android ', this.unsubscribeFromNotificationListener);
  }

  render() {
    return (
      <View>
        <CardSection>
          <Text>
            show notification here
          </Text>
        </CardSection>
      </View>
    );
  }
}

export { NotificationScreen };
