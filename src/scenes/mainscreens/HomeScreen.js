import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { fetchUserDetails } from '../../actions';
import { CardSection, Button } from '../../components/common';
import NavigationService from '../../components/NavigationService';
import { HomeProject } from './HomeProject';

class HomeScreen extends Component {

  componentWillMount() {
    this.props.fetchUserDetails();
  }

  renderProjectButton() {
    const { category } = this.props.userprofile;
    if (category === 'Directors' || category === 'Producers') {
      return (
        <Button
          style={{ backgroundColor: '#ffffff' }}
          labelStyle={{ color: 'rgb(234, 94, 32)' }}
          onPress={() => NavigationService.navigate('Project')}
        >
          Add Project
        </Button>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <CardSection style={styles.projectBtn}>
          <Text>
            Hello... {this.props.userprofile.name}
          </Text>
          {this.renderProjectButton()}
        </CardSection>
        <HomeProject />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  projectBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
};

const mapStateToProps = state => {
  return state;
};

const HomeScreenComponent = connect(mapStateToProps, { fetchUserDetails })(HomeScreen);

export { HomeScreenComponent as HomeScreen };
