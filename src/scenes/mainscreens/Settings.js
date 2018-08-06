import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CardSection, CustomRightCheckBox } from '../../components/common';

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
      <View style={styles.mainContainer}>
          <CardSection style={styles.cardSectionStyle}>
            <CustomRightCheckBox
              leftLabel="Notification"
              labelStyle={styles.labelStyle}
              onChange={() => this.OnNotifiCationChanged()}
              isSelected={this.state.isNotification}
              checkboxContainerStyle={styles.checkBoxStyle}
            />
          </CardSection>
          <CardSection style={styles.cardSectionStyle}>
            <CustomRightCheckBox
              leftLabel="Direct message"
              subLabel="Get Notification when you have new direct message"
              labelStyle={styles.labelStyle}
              onChange={() => this.OnDirectMessageClicked()}
              isSelected={this.state.isDirectMsg}
              checkboxContainerStyle={styles.checkBoxStyle}
            />
          </CardSection>
          <CardSection style={styles.cardSectionStyle}>
            <CustomRightCheckBox
              leftLabel="Vibrate"
              subLabel="Vibrate on incoming notification"
              labelStyle={styles.labelStyle}
              onChange={() => this.OnVibrateClicked()}
              isSelected={this.state.isVibrate}
              checkboxContainerStyle={styles.checkBoxStyle}
            />
          </CardSection>
          <CardSection style={styles.cardSectionStyle}>
            <CustomRightCheckBox
              leftLabel="Ringtone"
              subLabel="Get your notification ringtone"
              labelStyle={styles.labelStyle}
              onChange={() => this.OnVibrateClicked()}
              isSelected={this.state.isVibrate}
              checkboxContainerStyle={styles.checkBoxStyle}
            />
          </CardSection>
          <CardSection style={styles.cardSectionStyle}>
            <Text style={styles.headerStyle}>Privacy and Safety</Text>
          </CardSection>
          <CardSection style={styles.cardSectionStyle}>
            <CustomRightCheckBox
              leftLabel="Facebook"
              subLabel="Show your facebook profile to user"
              labelStyle={styles.labelStyle}
              onChange={() => this.OnFacebookClicked()}
              isSelected={this.state.isFacebook}
              checkboxContainerStyle={styles.checkBoxStyle}
            />
          </CardSection>
          <CardSection style={styles.cardSectionStyle}>
            <CustomRightCheckBox
              leftLabel="Instagram"
              subLabel="Show your Instagram profile to user"
              labelStyle={styles.labelStyle}
              onChange={() => this.OnInstagramClicked()}
              isSelected={this.state.isInstagram}
              checkboxContainerStyle={styles.checkBoxStyle}
            />
          </CardSection>
          <CardSection style={styles.cardSectionStyle}>
            <CustomRightCheckBox
              leftLabel="YouTube"
              subLabel="Show your YouTube Channel to user"
              labelStyle={styles.labelStyle}
              onChange={() => this.OnYouTubeClicked()}
              isSelected={this.state.isYouTube}
              checkboxContainerStyle={styles.checkBoxStyle}
            />
          </CardSection>
          <CardSection style={styles.cardSectionStyle}>
            <Text style={styles.headerStyle}>
              Blocked Account
            </Text>
          </CardSection>
          <CardSection style={styles.cardSectionStyle}>
            <Text style={styles.headerStyle}>
              Hide Requirements
            </Text>
          </CardSection>
          <CardSection style={styles.cardSectionStyle}>
            <Text style={styles.headerStyle}>
              Data Usaged
            </Text>
          </CardSection>
      </View>
    );
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
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
    paddingRight: 10
  },
  labelStyle: {
    paddingLeft: 16,
    paddingRight: 10,
    fontSize: 14,
    textAlign: 'left',
    color: '#95989a'
  },
  headerStyle: {
    paddingLeft: 16,
    paddingRight: 10,
    fontSize: 18,
    textAlign: 'left',
    color: '#000000'
  }
};


export { Settings };
