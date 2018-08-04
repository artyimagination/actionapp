import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View, Text } from 'react-native';
import { connect } from 'react-redux';

import { fetchAppliedUsersToProject } from '../../actions';
import { AppliedUserList } from './AppliedUserList';

class AppliedProjectUsers extends Component {

  componentWillMount() {
    this.props.fetchAppliedUsersToProject(this.props.navigation.state.params.id);
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ userlist }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(userlist);
  }

  renderRow(data) {
    return (<AppliedUserList data={data} />);
  }

  render() {
    console.log(this.props.navigation.state.params.id);
    return (
      <View style={{ flex: 1 }}>
        <ListView
          style={{ flex: 1 }}
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}


const mapStateToProps = state => {
  const userlist = _.map(state.appliedprojectlist, (val, uid) => {
          return { ...val, uid };
      });
  return { userlist };
};

const AppliedProjectUserComponent =
  connect(mapStateToProps, { fetchAppliedUsersToProject })(AppliedProjectUsers);

export { AppliedProjectUserComponent as AppliedProjectUsers };
