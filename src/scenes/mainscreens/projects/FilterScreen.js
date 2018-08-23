import _ from 'lodash';
import React, { Component } from 'react';
import { View, ListView, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { fetchProjectList } from '../../actions';
import { DashboardList } from './DashboardList';
import { CardSection } from '../../components/common';

class FilterScreen extends Component {
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
    //console.log('currentuser id : ', currentUser.uid);
    //console.log('project user id : ', data.uid);
    if (data.userid === currentUser.uid) {
        return (<DashboardList data={data} />);
    }
    return (
      <View>
        <Text />
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
          <CardSection style={styles.headingStyle}>
            <Icon name='star' size={15} color='rgb(234, 94, 32)' />
            <Text style={styles.labelStyle}>My Projects</Text>
          </CardSection>
          <ListView
            style={{ flex: 1 }}
            dataSource={this.dataSource}
            renderRow={this.renderRow}
          />
      </View>
    );
  }
}

const styles = {
  headingStyle: {
    height: '7%',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    borderColor: '#000',
    borderBottomWidth: 1,
    paddingLeft: 10
  },
  labelStyle: {
    fontSize: 14,
    fontWeight: '600',
    padding: 10,
    color: 'rgb(234, 94, 32)'
  }
};

const mapStateToProps = (state) => {
  const projectlist = _.map(state.projectlist, (val, uid) => {
          return { ...val, uid };
      });
      //const { userDetails } = this.state;
      //console.log('project list array', projectlist);
  return { projectlist };
};

const FilterScreenComponent =
  connect(mapStateToProps, { fetchProjectList })(FilterScreen);

export { FilterScreenComponent as FilterScreen };
