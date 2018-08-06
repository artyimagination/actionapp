import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Button, CardSection } from '../../components/common';

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
        <Image src="" name={this.props.data.title} />
      </CardSection>
    );
  }
}


const DraftListComponent =
  connect(null)(DraftList);
export { DraftListComponent as DraftList };
