import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'redux';
import { HeaderBackButton } from 'react-navigation';

import { Button, CardSection } from '../../components/common';
import { fetchAppliedUsersToProject, clearProjectList } from '../../actions';
import { AppliedUserList } from './AppliedUserList';


class AppliedProjectUsers extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerLeft: <HeaderBackButton
      onPress={() => navigation.goBack(null)}
    />
  });

  static onBack() {
    //console.log(Actions);
    //const c = new AppliedProjectUsers();
    //c.onBackPress();
  }

  componentWillMount() {
    this.props.fetchAppliedUsersToProject(this.props.navigation.state.params.id);
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  onBackPress() {
    //console.log('back presssedddd', this.props);
    this.props.clearProjectList();
    this.props.navigation.goBack(null);
    //this.props.clearProjectList();
  }

  createDataSource({ userList }) {
    console.log('userList :: ', userList);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(userList);
  }

  renderRow(data) {
    return (<AppliedUserList data={data} />);
  }
//<AppliedUserList data={data} />
  render() {
    console.log(this.props.navigation.state.params.id);
    return (
      <View style={{ flex: 1 }}>
        <ListView
          style={{ flex: 1 }}
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
        <CardSection>
          <Button
            onPress={this.onBackPress.bind(this)}
          >
            GoBack
          </Button>
        </CardSection>
      </View>
    );
  }
}


const mapStateToProps = state => {
  /*const userlist = _.map(state.appliedprojectlist, (val, uid) => {
          return { ...val, uid };
      });*/
  const { userList } = state.appliedprojectlist;
  console.log('what is state :: ', userList);
  return { userList };
};

const AppliedProjectUserComponent =
  connect(mapStateToProps,
    { fetchAppliedUsersToProject, clearProjectList })(AppliedProjectUsers);

export { AppliedProjectUserComponent as AppliedProjectUsers };
