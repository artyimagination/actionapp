import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CardSection, CustomCheckBox } from '../../components/common';

class Settings extends Component {

  static navigationOptions = {
    drawerIcon: (
      <Icon name="cog" size={25} />
    )
  };

  state = {
    isNotification: false,
    isDirectMsg: false,
    isVibrate: false,
    isFacebook: false,
    isInstagram: false
  }

  OnNotifiCationChanged() {
    if (this.state.isNotification) {
      this.setState({ isNotification: false });
    } else {
      this.setState({ isNotification: true });
    }
  }

  OnDirectMessageClicked() {
    if (this.state.isDirectMsg) {
      this.setState({ isDirectMsg: false });
    } else {
      this.setState({ isDirectMsg: true });
    }
  }

  OnVibrateClicked() {
    if (this.state.isVibrate) {
      this.setState({ isVibrate: false });
    } else {
      this.setState({ isVibrate: true });
    }
  }

  OnFacebookClicked() {
    if (this.state.isFacebook) {
      this.setState({ isFacebook: false });
    } else {
      this.setState({ isFacebook: true });
    }
  }

  OnInstagramClicked() {
    if (this.state.isInstagram) {
      this.setState({ isInstagram: false });
    } else {
      this.setState({ isInstagram: true });
    }
  }

  OnYouTubeClicked() {
    if (this.state.isYouTube) {
      this.setState({ isYouTube: false });
    } else {
      this.setState({ isYouTube: true });
    }
  }

  render() {
    return (
      <View>
          <CardSection style={styles.cardSectionStyle}>
            <CustomCheckBox
              leftLabel="Notification"
              onChange={() => this.OnNotifiCationChanged()}
              isSelected={this.state.isNotification}
              checkboxContainerStyle={styles.checkBoxStyle}
            />
          </CardSection>
          <CardSection style={styles.cardSectionStyle}>
            <CustomCheckBox
              leftLabel="Direct message"
              onChange={() => this.OnDirectMessageClicked()}
              isSelected={this.state.isDirectMsg}
              checkboxContainerStyle={styles.checkBoxStyle}
            />
          </CardSection>
          <CardSection style={styles.cardSectionStyle}>
            <CustomCheckBox
              leftLabel="Vibrate"
              onChange={() => this.OnVibrateClicked()}
              isSelected={this.state.isVibrate}
              checkboxContainerStyle={styles.checkBoxStyle}
            />
          </CardSection>
          <CardSection style={styles.cardSectionStyle}>
            <Text>Privacy and Safety</Text>
          </CardSection>
          <CardSection style={styles.cardSectionStyle}>
            <CustomCheckBox
              leftLabel="Facebook"
              onChange={() => this.OnFacebookClicked()}
              isSelected={this.state.isFacebook}
              checkboxContainerStyle={styles.checkBoxStyle}
            />
          </CardSection>
          <CardSection style={styles.cardSectionStyle}>
            <CustomCheckBox
              leftLabel="Instagram"
              onChange={() => this.OnInstagramClicked()}
              isSelected={this.state.isInstagram}
              checkboxContainerStyle={styles.checkBoxStyle}
            />
          </CardSection>
          <CardSection style={styles.cardSectionStyle}>
            <CustomCheckBox
              leftLabel="YouTube"
              onChange={() => this.OnYouTubeClicked()}
              isSelected={this.state.isYouTube}
              checkboxContainerStyle={styles.checkBoxStyle}
            />
          </CardSection>
      </View>
    );
  }
}

const styles = {
  cardSectionStyle: {
    height: 46,
    borderBottomWidth: 1,
    borderColor: '#000',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  checkBoxStyle: {
    width: '100%',
    justifyContent: 'space-between',
  }
};


export { Settings };
