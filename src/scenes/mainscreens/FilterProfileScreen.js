import _ from 'lodash';
import React, { Component } from 'react';
import { View, ListView, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import NavigationService from '../../components/NavigationService';
import { ProfileSearch } from '../../components/common/ProfileSearch';


class FilterProfileScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 ,backgroundColor: '#ffffff'  }}>
      <ProfileSearch/>
         
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
 
  return { state };
};

const FilterProfileScreenComponent =
  connect(mapStateToProps)(FilterProfileScreen);

export { FilterProfileScreenComponent as FilterProfileScreen };
