import _ from 'lodash';
import React, { Component } from 'react';
import { View, ListView, Text } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { fetchProjectList } from '../../actions';
import { ProjectList } from './ProjectList';
import NavigationService from '../../components/NavigationService';


class HomeProject extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
   this.props.fetchProjectList();
    this.createDataSource(this.props);
    console.log(this.props.filterValue);
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps' + JSON.stringify(nextProps));
    console.log('receive' + JSON.stringify(nextProps.filterValue));
    // this.createDataSource(nextProps);
     if (nextProps.filterValue !== '') {
       console.log('if');
      this.createDataSource(nextProps.filterValue);
     } else {
      console.log('else');
      this.createDataSource(nextProps);
     }
  }

  createDataSource({ projectlist }) {
    console.log('111');
    console.log('projetclist' + projectlist);
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
  //   return (
  //     <View>
  //       <Text />
  //     </View>
  //   );
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
