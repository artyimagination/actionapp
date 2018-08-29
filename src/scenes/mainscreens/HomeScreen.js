import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FloatingAction } from 'react-native-floating-action';

import { fetchUserDetails } from '../../actions';
import { CardSection, Button } from '../../components/common';
import NavigationService from '../../components/NavigationService';
import { HomeProject } from './HomeProject';

class HomeScreen extends Component {

  componentWillMount() {
    this.props.fetchUserDetails();
  }

  navigateToPath() {
    console.log('navigtor');
    NavigationService.navigate('Project');
  }

  renderProjectButton() {
    const { category } = this.props.userprofile;
    if (category === 'Directors' || category === 'Producers') {
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
        <FloatingAction
          color='rgb(234, 94, 32)'
          onPressItem={
            (name) => {
              console.log(`selected button: ${name}`);
              this.navigateToPath();
            }
          }
        />
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
  }
};

const mapStateToProps = state => {
  return state;
};

const HomeScreenComponent = connect(mapStateToProps, { fetchUserDetails })(HomeScreen);

export { HomeScreenComponent as HomeScreen };
