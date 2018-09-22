import React, { Component } from 'react';
import { View, Text, ScrollView, Alert, TouchableHighlight, Picker } from 'react-native';
import { connect } from 'react-redux';
import { userProfile, saveUserDetails, fetchTypes, fetchCategories, filteredProjectByTypes } from '../../actions';
import {
 
  CardSection,
  Button, 
  Spinner,
  DropDown,
 
} from '../../components/common';
import { Validator } from '../../utils/Validator';
import NavigationService from '../../components/NavigationService';


class FilterScreen extends Component {
  componentWillMount() {
    this.props.fetchTypes();
    this.props.fetchCategories(); 
  }

  onSaveClicked() {
    
    console.log('Filter is in progress');

    // const { userprofile } = this.props;
    // console.log(userprofile);
    // const { type } = userprofile;
    // this.props.filteredProjectByTypes(type);
    // this.params = this.props.navigation.state.params;
   
    // NavigationService.navigate('HomeStackScreen1');
    
  }

  renderButton() {
    return (
      <Button
        style={{ alignItems: 'center' }}
        onPress={this.onSaveClicked.bind(this)}
      >
        Filter
      </Button>
    );
  }

  renderLoading() {
    return (
      <Spinner size="large" isVisible={this.props.userprofile.loading} />
    );
  }

  render() {
    const { navigate } = this.props.navigation

    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }}>
          {this.renderLoading()}
         
            <DropDown
                label="Project Type"
                containerStyle={{
                  width: 100, 
                  //zIndex: 60,
                  top: 20,

                  }}
                onValueChange={(value) => this.props.userProfile({ prop: 'type', value })}
                selectedValue={this.props.userprofile.type}
              >
                {Object.keys(this.props.types).map((key) => {

                    return (<Picker.Item
                      label={this.props.types[key]}
                      value={this.props.types[key]}
                      key={key}
                    />);
                })}
            </DropDown>
            
            <DropDown
              label="Language"
              containerStyle={{
                width: 140, 
                //zIndex: 60,
                top: 20,

                }}
              onValueChange={(value) => this.props.userProfile({ prop: 'category', value })}
              selectedValue={this.props.userprofile.category}
            >
              {Object.keys(this.props.categories).map((key) => {

                  return (<Picker.Item
                    label={this.props.categories[key]}
                    value={this.props.categories[key]}
                    key={key}
                  />);
              })}
            </DropDown>
               
            <DropDown
              label="Keywords"
              containerStyle={{
                width: 140, 
                //zIndex: 60,
                top: 20,

                }}
              onValueChange={(value) => this.props.userProfile({ prop: 'category', value })}
              selectedValue={this.props.userprofile.category}
            >
              {Object.keys(this.props.categories).map((key) => {

                  return (<Picker.Item
                    label={this.props.categories[key]}
                    value={this.props.categories[key]}
                    key={key}
                  />);
              })}
            </DropDown>

            <CardSection style={styles.filterBtnStyle}>
            {this.renderButton()}
            </CardSection>
      </ScrollView>
    );
  }
}

const styles = {

  uploadPicStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 10
  },
  textStyle:{
    fontSize: 12,
      flexDirection: 'column',
  },
  labelStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    flexDirection: 'row',
    flexWrap: 'wrap',
   
  },
  iconStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: 290,
    color: 'rgb(0,0,0)'
  },
  filterBtnStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingTop: 10
    // marginLeft: 270
  },
};


const mapStateToProps = state => {
  return state;
};

const FilterScreenComponent = connect(mapStateToProps,
  { userProfile, saveUserDetails, fetchTypes, fetchCategories,filteredProjectByTypes })(FilterScreen);

export { FilterScreenComponent as FilterScreen };
