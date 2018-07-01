import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      </CardSection>
    );
  }
}


const DraftListComponent =
  connect(null)(DraftList);
export { DraftListComponent as DraftList };
