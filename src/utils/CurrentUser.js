import { Component } from 'react';

class currUser extends Component {
  static currUser = null;
  static isOtherUser = false;
  static isFirstTimeUser = false;

  static getCurrentUser() {
    return this.currUser;
  }
}


export default currUser;
