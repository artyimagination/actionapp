import { Component } from 'react';

class CurrentUser extends Component {
  static currentUser = null;
  static isOtherUser = false;
  static isFirstTimeUser = false;

  static getCurrentUser() {
    return this.currentUser;
  }
}


export default CurrentUser;
