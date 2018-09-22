import React, { Component } from 'react';
import { View, Text, ScrollView, Picker, TextInput } from 'react-native';
// import RangeSlider from 'react-native-range-slider'
// import {MultiSlider} from 'react-native-multi-slider';
import NavigationService from '../../components/NavigationService';

import { connect } from 'react-redux';
import { userProfile, } from '../../actions';
import {
 
  CardSection,
  Button, 
  Spinner,
  DropDown,
  Input
 
} from '../../components/common';


class SearchScreen extends Component {
  componentWillMount() {
  
    
  }
  enableScroll = () => this.setState({ scrollEnabled: true });
 disableScroll = () => this.setState({ scrollEnabled: false });
 

  onSaveClicked() {
    
    console.log('Filter is in progress');

    // const { userprofile } = this.props;
    // console.log(userprofile);
    // const { type } = userprofile;
    // this.props.filteredProjectByTypes(type);
    // this.params = this.props.navigation.state.params;
   
    NavigationService.navigate('FiltersProfile');
    
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
      <ScrollView style={styles.container}>
          {this.renderLoading()}
         
            <CardSection>
              <Input
                label="Location"
                placeHolder="Location"              
                value={this.props.locaton}
              />
            </CardSection>
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
            <CardSection> 
              <Text style={styles.labelStyle}>Height</Text>
            </CardSection>
            <CardSection style={{  justifyContent: 'space-between'}}>
          
              <TextInput
                style={styles.inputStyle}
                autoCorrect={false}
                keyboardType="numeric"
                value={this.props.minheight}
                onFocus={(e) => e.target.placeholder = ""} 
                onBlur={(e) => e.target.placeholder = " "}
                windowSoftInputMode="adjustResize"
                underlineColorAndroid='rgba(0,0,0,0)'
              />
              <Text style={styles.subLabelStyle}>Min</Text>

              <TextInput
                style={styles.inputStyle}
                autoCorrect={false}
                keyboardType="numeric"
                value={this.props.maxheight}
                onFocus={(e) => e.target.placeholder = ""} 
                onBlur={(e) => e.target.placeholder = " "}
                windowSoftInputMode="adjustResize"
                underlineColorAndroid='rgba(0,0,0,0)'
              />
              <Text style={styles.subLabelStyle}>Max</Text>
              {/* <Input
                label="Max"
                iStyle={{ width: 40 }}
                keyboardType="numeric"
              /> */}
            </CardSection> 
             {/* <MultiSlider
          
              onValuesChangeStart={this.disableScroll}
              onValuesChangeFinish={this.enableScroll}
            /> */}
            {/* <CardSection>
                <RangeSlider
                  minValue={0}
                  maxValue={100}
                  tintColor={'#da0f22'}
                  handleBorderWidth={1}
                  handleBorderColor="#454d55"
                  selectedMinimum={20}
                  selectedMaximum={40}
                  style={{ flex: 1, height: 70, padding: 10, backgroundColor: '#ddd' }}
                  onChange={ (data)=>{ console.log(data);} }
                />
            </CardSection> */}
            <CardSection style={styles.filterBtnStyle}>
               {this.renderButton()}
            </CardSection>
      </ScrollView>
    );
  }
}

const styles = {

  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  labelStyle: {
    paddingLeft: 40,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 4,
    fontSize: 12,
    textAlign: 'left'
  },
  subLabelStyle :{
    flex: 1,
    flexDirection: 'column',
  },
  filterBtnStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingTop: 10
  },
  inputStyle: {
    flexDirection: 'row',
    width: '20%',
    height: 50,
    alignSelf: 'center',
    paddingTop: 4,
    paddingBottom: 4,
    borderColor: '#D9D5DC',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 14,
    fontFamily: 'Roboto',
    lineHeight: 16,
    marginLeft: 43,
    color: '#000'
  },
};


const mapStateToProps = state => {
  return state;
};

const SearchScreenComponent = connect(mapStateToProps,
  { userProfile })(SearchScreen);

export {SearchScreenComponent as SearchScreen };
