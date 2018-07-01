import _ from 'lodash';
import React, { Component } from 'react';
import { View, ListView, Text } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { fetchProjectList } from '../../actions';
import { DashboardList } from './DashboardList';

class DashboardScreen extends Component {
  componentWillMount() {
    this.props.fetchProjectList();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ projectlist }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(projectlist);
  }

  renderRow(data) {
    const { currentUser } = firebase.auth();
    console.log('currentuser id : ', currentUser.uid);
    console.log('project user id : ', data.uid);
    if (data.userid === currentUser.uid) {
        return (<DashboardList data={data} />);
    }
    return (
      <View>
        <Text>Nothing to show</Text>
      </View>
    );
  }

  render() {
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

const mapStateToProps = (state) => {
  const projectlist = _.map(state.projectlist, (val, uid) => {
          return { ...val, uid };
      });
      console.log('project list array', projectlist);
  return { projectlist };
};

const DashboardScreenComponent =
  connect(mapStateToProps, { fetchProjectList })(DashboardScreen);

export { DashboardScreenComponent as DashboardScreen };
