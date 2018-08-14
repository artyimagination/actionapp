import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import DraftProjectList from '../../components/DraftProjectList';

class DraftList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <DraftProjectList />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  }
};
const DraftListComponent =
  connect(null)(DraftList);
export { DraftListComponent as DraftList };
