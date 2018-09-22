import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchUserDetails } from '../../actions';
import { CardSection, Button } from '../../components/common';
import NavigationService from '../../components/NavigationService';
import { HomeProject } from './HomeProject';


class HomeScreen extends Component {

constructor(prop) {
    super(prop);
    this.state = {
      filterValue: {}
    };
  }
  componentWillMount() {
    this.props.fetchUserDetails();
  }
  
  onFilterCallback(filterValue) {
    console.log('-> Callback value:', filterValue);
    this.setState({ filterValue: filterValue });
  }
  renderProjectButton() {
    const { category } = this.props.userprofile;
    if (category === 'Director' || category === 'Producer') {
  
      return (
        <CardSection>
            <Button
            style={{ backgroundColor: '#ffffff', fontSize: 2, borderRadius: 5, height: 35, }}
            labelStyle={{ color: 'rgb(234, 94, 32)' }}
            onPress={() => NavigationService.navigate('Project')}
            > <Icon name="plus" size={10} />
            Add Project
          </Button>
        </CardSection>

      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <CardSection style={styles.projectBtn}>
          <Text style={styles.labelStyle}>
            Hello... {this.props.userprofile.name}
          </Text>
          {this.renderProjectButton()}
        </CardSection>
        <HomeProject />
        <View>
          <TouchableOpacity
            style={styles.addButton}
            underlayColor='#ff7043' onPress={() => NavigationService.navigate('Filters', { filterCallback: filterValue => this.onFilterCallback(filterValue) })}>
            <Text style={{ fontSize: 20, color: 'white' }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  //<HomeProject />
}


const styles = {
  container: {
    flex: 1
  },
  projectBtn: {
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    borderColor: '#000',
    borderBottomWidth: 1
  },
  labelStyle: {
    fontSize: 14,
    fontWeight: '600',
    padding: 10
  },
  addButton: {
    backgroundColor: '#ff5722',
    borderColor: '#ff5722',
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  }

};

const mapStateToProps = state => {
  return state;
};

const HomeScreenComponent = connect(mapStateToProps, { fetchUserDetails })(HomeScreen);

export { HomeScreenComponent as HomeScreen };
