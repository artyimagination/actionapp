import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { CheckboxGroup, CardSection, CustomCheckBox, Button } from '../../../components/common';
import { updateProjectDetails, postProject, onProjectSaveToDraft } from '../../../actions';

class OtherCategoryScreen extends Component {

  state = {

  };

  onCheckBoxClicked() {

  }

  onPostProject() {
    const { id } = this.props;
    console.log('what is id ', id);
    this.props.postProject({ id });
  }

  onSaveDraftClicked() {
    const { id } = this.props;
    this.props.onProjectSaveToDraft({ id });
  }

  renderNextButton() {
    return (
      <Button
        onPress={() => this.onPostProject()}
      >
        Post
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

  renderCheckBoxGroup() {
    const items = [{
      key: 0,
      label: 'Experience',
      value: 'experience'
    }, {
      key: 1,
      label: 'New Comer',
      value: 'newcomer'
    }];

    return (
      <CheckboxGroup
        items={items}
        selectedItems={[0]}
        checkboxGroupContainerStyle={{ flexDirection: 'row', margin: 0 }}
        onSelect={(values) => console.log(values)}
      />
    );
  }

  render() {
    const { cardSectionStyle } = styles;
    return (
      <ScrollView>
        <CardSection style={cardSectionStyle} >
      
          <Text style={{ paddingLeft: 6 }}>
            Category
          </Text>
          </CardSection>
          <CardSection style={cardSectionStyle} >
            <CustomCheckBox
              key={0}
              label="Producer"
              value="Producer"
              isSelected={false}
              onChange={this.onCheckBoxClicked()}
              checkboxContainerStyle={{ alignSelf: 'flex-start' }}
            />
            {this.renderCheckBoxGroup()}
        </CardSection>
        <CardSection style={cardSectionStyle} >
          <CustomCheckBox
            key={0}
            label="Director"
            value="Director"
            isSelected={false}
            onChange={this.onCheckBoxClicked()}
            checkboxContainerStyle={{ alignSelf: 'flex-start' }}
          />
          {this.renderCheckBoxGroup()}
        </CardSection>
        <CardSection style={{ justifyContent: 'space-between', marginBottom: 15 }}>
          {this.renderSaveDraftButton()}
          {this.renderNextButton()}
        </CardSection>
      </ScrollView>
    );
  }
}

const styles = {
  cardSectionStyle: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderColor: '#000',
    justifyContent: 'space-around',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10, 
    paddingBottom: 10
  }
};

const mapStateToProps = state => {
  const { projectdata } = state;
  return projectdata;
};

const OtherCategoryScreenComponent =
  connect(mapStateToProps,
    { updateProjectDetails, postProject, onProjectSaveToDraft })(OtherCategoryScreen);

export { OtherCategoryScreenComponent as OtherCategoryScreen };
