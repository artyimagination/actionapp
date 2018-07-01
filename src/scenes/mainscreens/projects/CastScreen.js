import React, { Component } from 'react';
import { ScrollView, Text, ListView } from 'react-native';
import { connect } from 'react-redux';

import { CardSection, Button, Input, CheckboxGroup } from '../../../components/common';
//import NavigationService from '../../../components/NavigationService';

import { addCast, updateCast, fetchCastList, onCastDataSaved, onProjectSaveToDraft } from '../../../actions';
import { items1, items2, items3, items4 } from '../../../utils/Items';
import CastList from './CastList';

class CastScreen extends Component {

  /*componentWillMount() {
    this.props.fetchCastList();
  }*/

  componentWillMount() {
    this.props.fetchCastList();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  onAddCast() {
    //this.props.updateCast({ prop: 'title', value: 'Ravi' });
    console.log('after update project id', this.props.currentcast.projectid);
    const { currentcast } = this.props;
    this.props.addCast({ currentcast });
  }

  onGenderCategorySelected(values) {
    this.updateProjectId();
    this.props.updateCast({ prop: 'genderType', value: values[0].value });
  }

  onGenderSelected(values) {
    this.props.updateCast({ prop: 'gender', value: values[0].value });
  }

  onCategorySelected(values) {
    this.props.updateCast({ prop: 'roles', value: values[0].value });
  }

  onExperienceSelected(values) {
    this.props.updateCast({ prop: 'experience', value: values[0].value });
  }

  onCastSaved() {
    const { cast, id } = this.props.projectdata;
    //console.log('cast data ', cast);
    this.props.onCastDataSaved({ cast, id });
  }

  onSaveDraftClicked() {
    const { id } = this.props.projectdata;
    this.props.onProjectSaveToDraft({ id });
  }

  updateProjectId() {
    const { id } = this.props.projectdata;
    console.log('project id', id);
    this.props.updateCast({ prop: 'projectid', value: id });
  }

  createDataSource({ projectdata }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(projectdata.cast);
  }

  renderNextButton() {
    return (
      <Button
        onPress={() => this.onCastSaved()}
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

  renderRow(cast) {
    return <CastList title={cast.title} />;
  }

  render() {
    return (
      <ScrollView style={styles.container}>
      <ListView
        style={{ flex: 1 }}
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
        <CardSection style={{ borderBottomWidth: 1, borderColor: '#000' }}>
          <Input
            label="Cast"
            placeHolder="Cast 1"
            value={this.props.currentcast.title}
            onChangeText={value => this.props.updateCast({ prop: 'title', value })}
          />
        </CardSection>
        <CardSection
          style={{ paddingLeft: 40, justifyContent: 'space-between' }}
        >
          <CheckboxGroup
            label="Gender"
            items={items1}
            selectedItems={[]}
            onSelect={(values) => this.onGenderCategorySelected(values)}
          />

          <CheckboxGroup
            label=""
            items={items2}
            selectedItems={[]}
            onSelect={(values) => this.onGenderSelected(values)}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Age"
            placeHolder="0"
            keyboardType="numeric"
            iStyle={{ width: 40 }}
            lStyle={{ paddingLeft: 40 }}
            value={this.props.currentcast.minAge}
            onChangeText={value => this.props.updateCast({ prop: 'minAge', value })}
          />
          <Text style={{ alignSelf: 'center' }}>
            To
          </Text>
          <Input
            label=" "
            placeHolder="0''"
            iStyle={{ width: 40 }}
            keyboardType="numeric"
            value={this.props.currentcast.maxAge}
            onChangeText={value => this.props.updateCast({ prop: 'maxAge', value })}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Language"
            value={this.props.currentcast.language}
            onChangeText={value => this.props.updateCast({ prop: 'language', value })}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Height(Optional)"
            placeHolder="0"
            keyboardType="numeric"
            iStyle={{ width: 40 }}
            lStyle={{ paddingLeft: 40 }}
            value={this.props.currentcast.minHeight}
            onChangeText={value => this.props.updateCast({ prop: 'minHeight', value })}
          />
          <Text style={{ alignSelf: 'center' }}>
            To
          </Text>
          <Input
            label=" "
            placeHolder="0''"
            iStyle={{ width: 40 }}
            keyboardType="numeric"
            value={this.props.currentcast.maxHeight}
            onChangeText={value => this.props.updateCast({ prop: 'maxHeight', value })}
          />
        </CardSection>

        <CardSection style={{ paddingLeft: 40 }}>
          <CheckboxGroup
            label='Category'
            items={items3}
            selectedItems={[0]}
            onSelect={(values) => this.onCategorySelected(values)}
          />
        </CardSection>

        <CardSection style={{ paddingLeft: 40 }}>
          <CheckboxGroup
            label='Experience'
            items={items4}
            selectedItems={[0]}
            onSelect={(values) => this.onExperienceSelected(values)}
          />
        </CardSection>

        <CardSection style={{ alignSelf: 'center', padding: 10 }}>
          <Button
            style={{ width: '80%' }}
            onPress={this.onAddCast.bind(this)}
          >
            Add Cast
          </Button>
        </CardSection>
        <CardSection style={{ justifyContent: 'space-between' }}>
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
  }
};

const mapStateToProps = state => {
  const { currentcast, projectdata } = state;
  return { currentcast, projectdata };
};

const CastScreenComponent =
  connect(mapStateToProps,
    { addCast, updateCast, fetchCastList, onCastDataSaved, onProjectSaveToDraft })(CastScreen);

export { CastScreenComponent as CastScreen };
