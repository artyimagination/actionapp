import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import { Button, CardSection, IconButton } from '../../components/common';
import {  applyProject } from '../../actions';

class ViewProject extends Component {

  state = {
    isVisible: false
  }

  componentWillMount() {
    const { isVisible } = this.props;
    this.setState({ isVisible });
    console.log('visibility :: ', this.props.isVisible);
  }

  onAppliedClicked() {
    if (!this.state.isChanged) {
      this.setState({ isChanged: true });
      //console.log('what is project id : ', this.props.data.uid);
      this.props.applyProject(this.props.data.uid);
    }
  }
  onHideClicked() {

  }

  onStarButtonClicked() {

  }

  onChatClicked() {

  }
  onBackPress() {
    let isVisible = this.state.isVisible;
    isVisible = false;
    this.setState({ isVisible });
  }
  renderAppliedButton() {
    return (
      <IconButton
        style={styles.iconStyle}
        onPress={() => this.onAppliedClicked()}
        iconname="check"
        lable="Apply"
        isApplied={this.state.isChanged}
      />
    );
  }
  renderProfileImage() {
    if (this.props.ProfilePic !== '') {
      return (
        <Image
          style={styles.profileImageStyle}
          source={{ uri: this.props.ProfilePic }}
        />
      );
    }

    return (
      <Image
        style={styles.profileImageStyle}
        source={require('../../images/ic_person_24px.png')}
      />
    );
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
           <Text style={styles.labelStyle}>Description</Text>
           <Text style={styles.labelStyle}>{data.description}</Text>
        </CardSection>
        <CardSection style={styles.iconContainer}>
        <CardSection>
          <IconButton
              style={styles.iconStyle}
              onPress={() => this.onStarButtonClicked()}
              iconname="star"
              lable="Shortlist"
          />
          <IconButton
              style={styles.iconStyle}
              onPress={this.onHideClicked()}
              iconname="eye-slash"
              lable="Hide"
          />
            <IconButton
              style={styles.iconStyle}
              onPress={() => this.onChatClicked()}
              iconname="comment"
              lable="chat"
            />
          </CardSection>
          <CardSection style={styles.iconStyle}>
            {this.renderAppliedButton()}
          </CardSection>
      </CardSection>
         
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
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconStyle: {
    padding: 5
  },
  profileImageStyle: {
    alignSelf: 'flex-start',
    marginTop: 16,
    padding: 10,
    width: 40,
    height: 40,
    borderRadius: 75,
    borderColor: '#000'
  }
};

export { ViewProject };
