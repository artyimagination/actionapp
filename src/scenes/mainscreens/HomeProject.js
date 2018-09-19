import _ from 'lodash';
import React, { Component } from 'react';
import { View, ListView, Text } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { fetchProjectList } from '../../actions';
import { ProjectList } from './ProjectList';
import NavigationService from '../../components/NavigationService';


class HomeProject extends Component {

  componentWillMount() {

    this.props.fetchProjectList();
    this.createDataSource(this.props);
    //const { navigation } = this.props;
  //const type1 = navigation.getParam(type);
  //console.log(" Home type :"+type1 );
   //const type = NavigationService.getParams('type');
    //console.log(" Home type :"+type  );
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);

       const { navigation } = this.props;
  const type1 = navigation.getParam(type);
  console.log(" Home type1 :"+type1 );
   const type = NavigationService.getParams('type');
    console.log(" Home type :"+type  );
     
  }

  createDataSource({ projectlist }) {
    console.log('111'+JSON.stringify(projectlist));
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(projectlist);
  }

  renderRow(data) {
    console.log('222');
    const { currentUser } = firebase.auth();
  //  if (data.userid !== currentUser.uid && !data.isDraft) {
        return (<ProjectList data={data} />);
  //  }
    return (
      <View>
        <Text />
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
  return { projectlist };
};

const HomeProjectComponent =
  connect(mapStateToProps, { fetchProjectList })(HomeProject);

export { HomeProjectComponent as HomeProject };
