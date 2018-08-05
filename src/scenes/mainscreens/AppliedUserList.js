import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { CardSection, IconButton } from '../../components/common';
import { createChatUsers } from '../../actions';

class AppliedUserList extends Component {

  onChatClicked() {
    console.log('chat button clicked...', this.props.data);
    this.props.createChatUsers(this.props.data.uid);
  }

  render() {
    return (
      <View>
      <CardSection style={styles.container}>
        <Text>{this.props.data.name}</Text>
          <Text style={styles.titleStyle}>{this.props.data.category}</Text>
          <Text style={styles.labelStyle}>
            Gender - {this.props.data.gender}
          </Text>
        <Text style={styles.labelStyle}>Email - {this.props.data.email}</Text>
        <Text style={styles.labelStyle}>Address - {this.props.data.address}</Text>
        <Text style={styles.labelStyle}>Language : {this.props.data.language}</Text>
        <Text style={styles.labelStyle}>Number - {this.props.data.mobile}</Text>
        <Text style={styles.labelStyle}>{this.props.data.description}</Text>
        <IconButton
          onPress={this.onChatClicked.bind(this)}
          iconname="comment"
          lable="chat"
        />
      </CardSection>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
    flexDirection: 'column',
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  profileImageStyle: {
    alignSelf: 'flex-start',
    marginTop: 16,
    padding: 10,
    width: 40,
    height: 40,
    borderRadius: 75
  },
  titleStyle: {
    fontSize: 14,
    fontWeight: '600'
  },
  labelStyle: {
    fontSize: 10
  }
};

const AppliedUserListCompnent = connect(null, { createChatUsers })(AppliedUserList);
export { AppliedUserListCompnent as AppliedUserList };
