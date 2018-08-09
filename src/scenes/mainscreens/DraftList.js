import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image,TextInput, TouchableOpacity } from 'react-native';
import { Button, CardSection, Input } from '../../components/common';

class DraftList extends Component {
  render() {
    return (
      <CardSection>
          <Button
          style={{ backgroundColor: '#fff', borderColor: '#fff' }}
          labelStyle={{ color: '#000' }}
          onPress={this.props.onPress}
        >
          {this.props.data.title}
        </Button>
          <TouchableOpacity onPress={() => console.log('Pressed')}>
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                marginTop: 8
              }}
              underlineColorAndroid="transparent"
              placeholder='test'
            />
          </TouchableOpacity>    
      </CardSection>
    );
  }
}


const DraftListComponent =
  connect(null)(DraftList);
export { DraftListComponent as DraftList };
