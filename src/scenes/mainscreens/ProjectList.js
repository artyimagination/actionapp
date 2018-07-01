import React, { Component } from 'react';
import { Text, Image } from 'react-native';

import { CardSection, IconButton } from '../../components/common';

class ProjectList extends Component {

  onStarButtonClicked() {

  }

  onChatClicked() {

  }

  onAppliedClicked() {

  }
  render() {
    return (
        <CardSection style={styles.container}>
        <CardSection style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Image
            style={styles.profileImageStyle}
            source={require('../../images/ic_person_24px.png')}
          />
          <Text> Ravi Oza - Director </Text>
          <Text>{this.props.data.title}</Text>
        </CardSection>
          <Text>{this.props.data.description}</Text>
          <CardSection style={{ justifyContent: 'space-between' }}>
            <IconButton
              onPress={() => this.onStarButtonClicked()}
              iconname="star"
              lable="Shortlist"
            />
            <IconButton
              onPress={() => this.onChatClicked()}
              iconname="comment"
              lable="chat"
            />
            <IconButton
              onPress={() => this.onAppliedClicked()}
              iconname="check"
              lable="Apply"
            />
          </CardSection>
        </CardSection>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
    flexDirection: 'column'
  },
  profileImageStyle: {
    alignSelf: 'flex-start',
    marginTop: 16,
    padding: 10,
    width: 40,
    height: 40,
    borderRadius: 75
  }
};


export { ProjectList };
