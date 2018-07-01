import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View, Text } from 'react-native';
import { connect } from 'react-redux';

import { fetchChatUsers, openChat } from '../actions';
import ChatList from './ChatList';

class ChatUserList extends Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    //this.onChatClicked = this.onChatClicked.bind(this);
  }

  componentWillMount() {
    this.props.fetchChatUsers();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  onChatClicked(chatdata) {
    //console.log('onChatClicke', this.props.userprofile);
    this.props.openChat({ chatdata });
  }

  createDataSource({ chatdata }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(chatdata);
  }

  renderRow(chatdata) {
    return <ChatList user={chatdata} onPress={() => this.onChatClicked(chatdata)} />;
  }

  render() {
    return (
      <ListView
        style={{ flex: 1 }}
        enableEmplySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  //const { userprofile } = state.userprofile;
  const chatdata = _.map(state.chatdata, (val, uid) => {
    return { ...val, uid };
  });
  return { chatdata };
};

export default connect(mapStateToProps, { fetchChatUsers, openChat })(ChatUserList);
