import { Component } from 'react';

class CurrentUser extends Component {
  static currUser = null;
  static isOtherUser = false;
  static isFirstTimeUser = false;

  static getCurrentUser() {
    return this.CurrentUser;
  }
}


export default CurrentUser;
