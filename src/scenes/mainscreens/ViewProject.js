import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Button, CardSection } from '../../components/common';

class ViewProject extends Component {

  state = {
    isVisible: false
  }

  componentWillMount() {
    const { isVisible } = this.props;
    this.setState({ isVisible });
    console.log('visibility :: ', this.props.isVisible);
  }

  onBackPress() {
    let isVisible = this.state.isVisible;
    isVisible = false;
    this.setState({ isVisible });
  }

  render() {
    console.log('render visibility :: ', this.props);
    const { projectDetails } = this.props.navigation.state.params;
    const { data } = this.props.navigation.state.params.projectDetails;
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
         <CardSection style={styles.descriptionStyle}>
           <Text style={styles.labelStyle}> {projectDetails.name} - {projectDetails.category}</Text>
           <Text style={styles.titleStyle}>{data.title}</Text>
           <Text style={styles.labelStyle}>Type - {data.type}</Text>
           <Text style={styles.labelStyle}>Language : {data.language}</Text>
           <Text style={styles.labelStyle}>Description</Text>
           <Text style={styles.labelStyle}>{data.description}</Text>
        </CardSection>
          <Button onPress={this.onBackPress.bind(this)}>
            Apply
          </Button>
        </View>
    );
  }
}

const styles = {
  descriptionStyle: {
    paddingTop: 6,
    paddingLeft: 10,
    flexDirection: 'column'
  },
  labelStyle: {
    fontSize: 18
  },
  titleStyle: {
    fontSize: 24,
    fontWeight: '600'
  }
};

export { ViewProject };
