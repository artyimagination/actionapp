import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchDraftProject, updateProjectDetails } from '../../actions';
import { DraftList } from './DraftList';
import NavigationService from '../../components/NavigationService';

class Draft extends Component {
  static navigationOptions = {
    drawerIcon: (
      <Icon name="info" size={30} />
    )
  };

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount() {
    this.props.fetchDraftProject();
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

  gotoEditProject(data) {
    console.log('project data', data);
    _.each(data, (value, prop) => {
      //console.log('prop ', prop, 'value', value);
      this.props.updateProjectDetails({ prop, value });
    });
    NavigationService.navigate('Project');
  }

  renderRow(data) {
    if (data.isDraft === true) {
      return (<DraftList data={data} onPress={() => this.gotoEditProject(data)} />);
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
  return { projectlist };
};

const DraftComponent =
  connect(mapStateToProps, { fetchDraftProject, updateProjectDetails })(Draft);

export { DraftComponent as Draft };
