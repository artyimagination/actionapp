import React, { Component } from 'react';
import { ScrollView, Text, Picker, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { fetchCategories, userProfile, saveUserProfile } from '../../actions';
import { CardSection, Button, Input, Spinner, DropDown } from '../../components/common';
import { Validator } from '../../utils/Validator';

class UserProfileScreen extends Component {

  componentWillMount() {
    this.props.fetchCategories();
  }

  onSaveClicked() {
    const { userprofile } = this.props;
    const
    { name, category, language, gender, address, selectedstate, city, mobile } = userprofile;
    console.log('selected category :: ', category);
    const error = Validator('name', name) ||
                  Validator('category', category) ||
                  Validator('language', language) ||
                  Validator('gender', gender) ||
                  Validator('address', address) ||
                  Validator('selectedstate', selectedstate) ||
                  Validator('city', city) ||
                  Validator('mobile', mobile);

    if (error !== null) {
      Alert.alert('Error', error);
    } else {
        this.props.saveUserProfile({ userprofile });
    }
  }

  renderLoading() {
    return <Spinner size="large" isVisible={this.props.userprofile.loading} />;
  }


  renderButton() {
    return (
      <Button
        style={{ alignItems: 'center' }}
        onPress={this.onSaveClicked.bind(this)}
      >
        Save
      </Button>
    );
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
          {this.renderLoading()}
          <CardSection>
            <Input
              label="Name"
              placeHolder="Your Name"
              value={this.props.userprofile.name}
              onChangeText={(value) => this.props.userProfile({ prop: 'name', value })}
            />
          </CardSection>

            <DropDown
              label="Category"
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

            <Text style={{ paddingLeft: 40, paddingTop: 0 }}>Date of Birth</Text>
            <DatePicker
              style={{ width: 200, paddingLeft: 40 }}
              date={this.props.userprofile.date}
              mode="date"
              format="YYYY-MM-DD"
              placeholder="Select Birth Date"
              minDate="1920-01-01"
              maxDate="2020-01-01"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={(value) => this.props.userProfile({ prop: 'date', value })}
            />

          <DropDown
            label="Language"
            style={{ flex: 1, paddingTop: 0, paddingBottom: 20 }}
            onValueChange={(value) => this.props.userProfile({ prop: 'language', value })}
            selectedValue={this.props.userprofile.language}
          >
            <Picker.Item label="Hindi" value="hindi" key="H" />
            <Picker.Item label="English" value="english" key="E" />
            <Picker.Item label="Other" value="other" key="O" />
          </DropDown>

          <DropDown
            label="Gender"
            style={{ flex: 1, paddingTop: 0, paddingBottom: 20 }}
            onValueChange={(value) => this.props.userProfile({ prop: 'gender', value })}
            selectedValue={this.props.userprofile.gender}
          >
            <Picker.Item label="Male" value="male" key="M" />
            <Picker.Item label="Female" value="female" key="F" />
            <Picker.Item label="Other" value="other" key="O" />
          </DropDown>

          <CardSection>
            <Input
              label="Address"
              placeHolder="Enter Address"
              onChangeText={(value) => this.props.userProfile({ prop: 'address', value })}
              value={this.props.userprofile.address}
            />
          </CardSection>

          <DropDown
            label="State"
            style={{ flex: 1, paddingTop: 0, paddingBottom: 20 }}
            onValueChange={(value) => this.props.userProfile({ prop: 'selectedstate', value })}
            selectedValue={this.props.userprofile.selectedstate}
          >
            {Object.keys(this.props.statesandcities).map((key) => {
                return (<Picker.Item
                  label={key} value={key} key={key}
                />);
            })}
          </DropDown>

          <DropDown
            label="City"
            style={{ flex: 1, paddingTop: 0, paddingBottom: 20 }}
            onValueChange={(value) => this.props.userProfile({ prop: 'city', value })}
            selectedValue={this.props.userprofile.city}
          >
            {Object.keys(this.props.statesandcities[this.props.userprofile.selectedstate])
              .map((key) => {
                return (<Picker.Item
                  label={this.props.statesandcities[this.props.userprofile.selectedstate][key]}
                  value={this.props.statesandcities[this.props.userprofile.selectedstate][key]}
                  key={key}
                />);
            })}
          </DropDown>

          <CardSection>
            <Input
              label="Mobile"
              placeHolder="Enter Mobile"
              keyboardType="numeric"
              onChangeText={(value) => this.props.userProfile({ prop: 'mobile', value })}
              value={this.props.userprofile.mobile}
            />
          </CardSection>
          {this.renderButton()}
      </ScrollView>
    );
  }
}


const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20
    
  }
};

const mapStateToProps = state => {
  return state;
};

const UserProfileComponent = connect(mapStateToProps,
  { fetchCategories, userProfile, saveUserProfile })(UserProfileScreen);

export { UserProfileComponent as UserProfileScreen };
