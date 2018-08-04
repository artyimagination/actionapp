import React, { Component } from 'react';
import { View, Image,Text } from 'react-native';

import { Button, CardSection, IconButton } from '../../components/common';

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

  onAppliedClicked() {
    this.setState({ isChanged: true });
    console.log('what is project id : ', this.props.data.uid);
    this.props.applyProject(this.props.data.uid);
  }
  renderProfileImage() {
    if (this.props.ProfilePic !== '') {
      console.log(this.props.ProfilePic);
      return (
        <Image
          style={styles.profileImageStyle}
          src={{ uri: this.props.ProfilePic }}
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

  renderProjectImage(){
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
        <CardSection style={styles.mainContainer}>
              <CardSection style={styles.container}>
                <CardSection>
                  {this.renderProfileImage()}
                </CardSection>
                <CardSection style={styles.descriptionStyle}>
                      <Text style={styles.labelStyle}> Required new {data.category} - {data.type}</Text>
                      <Text style={styles.titleStyle}>{data.title}</Text>
                      <Text style={styles.labelStyle}>Type - {data.type}</Text>
                      <Text style={styles.labelStyle}>Language : {data.language}</Text>
                      <Text style={styles.labelStyle}>Description</Text>
                      <Text style={styles.labelStyle}>{data.description}</Text>
                      <Text style={styles.labelStyle}>Height : {data.height}</Text>
                      <Text style={styles.labelStyle}>Age : {data.description}</Text>
                      <Text style={styles.labelStyle}>Category : {data.category}</Text>
                      <Text style={styles.labelStyle}>Experience : {data.experience}</Text>
                </CardSection>
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
                      onPress={() => this.onHideClicked()}
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
                      <IconButton
                        style={styles.iconStyle}
                        onPress={() => this.onAppliedClicked()}
                        iconname="check"
                        lable="Apply"
                        isApplied={this.state.isChanged}
                      />
                  </CardSection>
                </CardSection>
                <CardSection>
                {this.renderProjectImage()}
                </CardSection>
        </CardSection>
      </View>
    );
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
    flexDirection: 'column',
    padding: 10
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10
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
  },
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
