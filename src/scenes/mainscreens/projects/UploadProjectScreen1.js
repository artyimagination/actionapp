import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { CardSection, Button, Input, CheckboxGroup } from '../../../components/common';
//import NavigationService from '../../../components/NavigationService';
import { updateProjectDetails, onProjectSaved } from '../../../actions';

class UploadProjectScreen1 extends Component {
  static navigationOptions = ({
    header: null
  });

  onTypeSelected(values) {
    this.props.updateProjectDetails({ prop: 'type', value: values[0].value });
  }

  onNextButtonClicked() {
    const { title, type, description, language, cast, location } = this.props;
    this.props.onProjectSaved({
      title, type, description, language, cast, location, isDraft: false });
  }

  onSaveDraftClicked() {
    const { title, type, description, language, cast, location } = this.props;
    this.props.onProjectSaved({
      title, type, description, language, cast, location, isDraft: true });
  }

  renderNextButton() {
    return (
      <Button
        onPress={() => this.onNextButtonClicked()}
      >
        Next
      </Button>
    );
  }

  renderSaveDraftButton() {
    return (
      <Button
        style={{ borderWidth: 0, backgroundColor: '#ffffff' }}
        labelStyle={{ color: 'rgb(234, 94, 32)' }}
        onPress={() => this.onSaveDraftClicked()}
      >
        Save Draft
      </Button>
    );
  }


  render() {
    const items = [{
      key: 0,
      label: 'Ad Film',
      value: 'Ad Film'
    }, {
      key: 1,
      label: 'Documentory',
      value: 'Documentory'
    }, {
      key: 2,
      label: 'Feature Film',
      value: 'Feature Film'
    }];
    return (
      <ScrollView style={styles.container}>
        <CardSection>
          <Input
            label="Project Title"
            placeHolder="Untitled"
            onChangeText={value => this.props.updateProjectDetails({ prop: 'title', value })}
            value={this.props.title}
          />
        </CardSection>
        <CardSection style={{ paddingLeft: 40 }}>
          <CheckboxGroup
            label='Types'
            items={items}
            selectedItems={[0]}
            onSelect={(values) => this.onTypeSelected(values)}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Others - Mention other category"
            placeHolder=""
          />
        </CardSection>
        <CardSection>
          <Input
            label="Description - Optional"
            placeHolder=""
            onChangeText={value => this.props.updateProjectDetails({ prop: 'description', value })}
            value={this.props.description}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Location"
            placeHolder=""
            onChangeText={value => this.props.updateProjectDetails({ prop: 'location', value })}
            value={this.props.location}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Language"
            placeHolder=""
            onChangeText={value => this.props.updateProjectDetails({ prop: 'language', value })}
            value={this.props.language}
          />
        </CardSection>
        <CardSection style={{ justifyContent: 'space-around', marginBottom: 15 }}>
          {this.renderSaveDraftButton()}
          {this.renderNextButton()}
        </CardSection>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    borderWidth: 1,
    padding: 5,
    backgroundColor: '#ffffff'
  },
  imageContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#000000',
    alignSelf: 'center'
  }
};

const mapStateToProps = state => {
  const { projectdata } = state;
  return projectdata;
};

const UploadProjectScreenComponent =
    connect(mapStateToProps, { updateProjectDetails, onProjectSaved })(UploadProjectScreen1);

export { UploadProjectScreenComponent as UploadProjectScreen1 };
