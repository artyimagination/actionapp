import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, IconButton } from '../../components/common';
import { fetchProjectUserDetails, applyProject } from '../../actions';
import NavigationService from '../../components/NavigationService';

class ProjectList extends Component {

  state ={
    isChanged: false,
    isVisible: false,
  };

  componentWillMount() {
    this.props.fetchProjectUserDetails(this.props.data.userid);
  }

  onStarButtonClicked() {
  }

  onChatClicked() {
  }

  onViewProjectClicked() {
    NavigationService.navigate('ProjectView', { projectDetails: this.props });
  }

  onHideClicked() {
    this.setState(this.isVisible, 'true');
  }
  onAppliedClicked() {
    if (!this.state.isChanged) {
      this.setState({ isChanged: true });
      console.log('what is project id : ', this.props.data.uid);
      this.props.applyProject(this.props.data.uid);
    }
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
    return (
        <View style={{ flex: 1 }}>
          <CardSection style={styles.mainContainer}>
            <TouchableOpacity onPress={this.onViewProjectClicked.bind(this)} >
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
              <CardSection style={styles.container}>
                    <Image source={require('../../images/logo/images.jpg')}  />
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
                      onPress={this.onHideClicked.bind(this)}
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
                      onPress={this.onViewProjectClicked.bind(this)}
                      iconname="eye"
                      lable="View"
                    />
                  </CardSection>
              </CardSection>
            </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: '600'
  },
  labelStyle: {
    fontSize: 12
  }
};

const mapStateToProps = (state) => {
  const { projectuser } = state;
  return projectuser;
};

const ProjectListComponent =
      connect(mapStateToProps, { fetchProjectUserDetails, applyProject })(ProjectList);

export { ProjectListComponent as ProjectList };
