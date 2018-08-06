import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { fetchUserDetails } from '../../actions';
import { CardSection, Button, Card } from '../../components/common';
import NavigationService from '../../components/NavigationService';
import { HomeProject } from './HomeProject';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FloatingAction } from 'react-native-floating-action';

class HomeScreen extends Component {

  componentWillMount() {
    this.props.fetchUserDetails();
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
  renderProjectButton() {
    const { category } = this.props.userprofile;
    if (category === 'Directors' || category === 'Producers') {
      return (
          <Button
            style={{ backgroundColor: '#ffffff' }}
            labelStyle={{ color: 'rgb(234, 94, 32)' }}
            icon={<Icon
            name='plus'
            size={50}
            color='red'
              />
            }
            onPress={() => NavigationService.navigate('Project')}
          >
            Add Project
          </Button>
      );
    }
  }
  renderRow(data) {
    const { currentUser } = firebase.auth();
    console.log('currentuser id : ', currentUser.uid);
    console.log('project user id : ', data.uid);
    if (data.userid === currentUser.uid) {
        return (<HomeProject data={data} />);
    }
    return (
      <View>
        <Text />
        
      </View>
    );
  }
navigateToPath() {
  console.log('navigtor');
   NavigationService.navigate('Project');
}
  render() {
    return (
      <View style={styles.container}>
        <CardSection style={styles.projectBtn}>
          <Text style={styles.labelStyle}>
            Hello... {this.props.userprofile.name}
          </Text>
          {this.renderProjectButton()}
        </CardSection>

      <ListView
        style={{ flex: 1 }}
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
      <FloatingAction
      actions={actions}
      color='rgb(234, 94, 32)'
      onPressItem={
        (name) => {

          console.log(`selected button: ${name}`);
          this.navigateToPath();
        }
      }
    />
      </View>
    );
  }

  //<HomeProject />
}

const actions = [{
  text: 'Pending',
  color: 'rgb(234, 94, 32)',
  icon: 'bell',
  name: 'bt_pending',
  position: 2
}, {
  text: 'Shortlisted',
  color: 'rgb(234, 94, 32)',
  icon: 'home',
  name: 'bt_shortlisted',
  position: 1
}, {
  text: 'Selected',
  icon: 'pepole',
  color: 'rgb(234, 94, 32)',
  name: 'bt_selected',
  position: 3
}, {
  text: 'Rejected',
  color: 'rgb(234, 94, 32)',
  icon: 'plus',
  name: 'bt_rejected',
  position: 4
}];

const styles = {
  container: {
    flex: 1
  },
  projectBtn: {
    height: '7%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderColor: '#000',
    borderBottomWidth: 1
  },
  labelStyle: {
    fontSize: 14,
    fontWeight: '600',
    padding: 5
  }
};

const mapStateToProps = state => {
  return state;
};

const HomeScreenComponent = connect(mapStateToProps, { fetchUserDetails })(HomeScreen);

export { HomeScreenComponent as HomeScreen };
