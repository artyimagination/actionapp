import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { CardSection } from '../../components/common';
import NavigationService from '../../components/NavigationService';

class DashboardList extends Component {


  onViewProjectClicked() {
    NavigationService.navigate('AppliedProjectScreen', { projectDetails: this.props });
  }

  render() {
    return (
        <CardSection style={styles.container}>
        <TouchableOpacity onPress={this.onViewProjectClicked.bind(this)} >
          <CardSection>
            <Text style={styles.titleStyle}>Artist Required</Text>
            <Text style={{ fontSize: 6, textAlign: 'center', paddingLeft: 10, paddingTop: 8 }}>
              {this.props.data.time} Ago
            </Text>
          </CardSection>
          <Text style={styles.labelStyle}>Status - Published</Text>
          <Text style={styles.labelStyle}>Description</Text>
          <Text style={styles.labelStyle}>{this.props.data.description}</Text>
        </TouchableOpacity>
        </CardSection>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
    flexDirection: 'column',
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  profileImageStyle: {
    alignSelf: 'flex-start',
    marginTop: 16,
    padding: 10,
    width: 40,
    height: 40,
    borderRadius: 75
  },
  titleStyle: {
    fontSize: 14,
    fontWeight: '600'
  },
  labelStyle: {
    fontSize: 10
  }
};

export { DashboardList };
