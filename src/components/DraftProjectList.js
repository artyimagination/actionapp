import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { openChat, fetchDraftProject, updateProjectDetails, fetchChatUsers } from '../actions';
import DraftList from './DraftList';
import NavigationService from '../components/NavigationService';

class DraftProjectList extends Component {

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.onChatClicked = this.onChatClicked.bind(this);
  }

  componentWillMount() {

   // this.props.fetchDraftProject();
   this.props.fetchProjectDetails();
    // this.props.fetchChatUsers();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  onChatClicked(user) {
    console.log('onChatClicke', this.props.users);
    this.props.openChat(user);
  }

  createDataSource({ userList }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(userList);
  }
  gotoEditProject(data) {
    console.log('project data', data);
    _.each(data, (value, prop) => {
      //console.log('prop ', prop, 'value', value);
      this.props.updateProjectDetails({ prop, value });
    });
    NavigationService.navigate('Project');
  }


//   renderRow(data) {
//     if (data.isDraft === true) {
//         //console.log('data :', data);
//       return (<DraftList data={data} onPress={() => this.gotoEditProject(data)} />);
//     }

//     return (
//       <View>
//         <Text />
//       </View>
//     );
//   }

renderRow(user) {
    return <DraftList data={user} onPress={() => this.gotoEditProject(user)} />;
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
  /*const chatdata = _.map(state.chatdata, (val, uid) => {
    return { ...val, uid };
  });*/
  const { userList } = state.chatdata;
  return { userList };
};

export default connect(mapStateToProps, { fetchDraftProject, fetchChatUsers, openChat, updateProjectDetails })(DraftProjectList);
