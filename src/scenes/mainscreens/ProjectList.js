import React, { Component } from 'react';
import { Text, Image, View } from 'react-native';
import { connect } from 'react-redux';

import { CardSection, IconButton } from '../../components/common';
import { fetchProjectUserDetails, applyProject } from '../../actions';
import NavigationService from '../../components/NavigationService';

class ProjectList extends Component {

  componentWillMount() {
    this.props.fetchProjectUserDetails(this.props.data.userid);
  }

  onStarButtonClicked() {

  }

  onChatClicked() {
   
  }

  onAppliedClicked() {
    this.setState({ isChanged: true });
    console.log('what is project id : ', this.props.data.uid);
    this.props.applyProject(this.props.data.uid);
  }
  onViewProjectClicked() {
   console.log('test');
    NavigationService.navigate('ProjectView', { projectDetails: this.props });
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
    return (
      <View style={{ flex: 1 }}>
      <CardSection style={styles.mainContainer}>
        <CardSection style={styles.container}>
          <CardSection>
            {this.renderProfileImage()}
          </CardSection>
          <CardSection style={styles.descriptionStyle}>
            <Text style={styles.labelStyle}> {this.props.name} - {this.props.category}</Text>
            <Text style={styles.titleStyle}>{this.props.data.title}</Text>
            <Text style={styles.labelStyle}>Type - {this.props.data.type}</Text>
            <Text style={styles.labelStyle}>Language : {this.props.data.language}</Text>
            <Text style={styles.labelStyle}>Description</Text>
            <Text style={styles.labelStyle}>{this.props.data.description}</Text>
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
                onPress={() => this.onStarButtonClicked()}
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
                onPress={() => this.onViewProjectClicked()}
                iconname="eye"
                lable="View"
              />
              <IconButton
              style={styles.iconStyle}
              onPress={() => this.onAppliedClicked()}
              iconname="check"
              lable="Apply"
            />
            </CardSection>
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
  titleStyle: {
    fontSize: 16,
    fontWeight: '600'
  },
  labelStyle: {
    fontSize: 8
  }
};

const mapStateToProps = (state) => {
  const { projectuser } = state;
  return projectuser;
};

const ProjectListComponent =
      connect(mapStateToProps, { fetchProjectUserDetails, applyProject })(ProjectList);

export { ProjectListComponent as ProjectList };
