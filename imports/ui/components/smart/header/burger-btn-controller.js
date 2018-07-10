import React from 'react';
import { propType } from 'graphql-anywhere';
import userFragment from '../../../apollo-client/user/fragment/user';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const showHideBurgerBtn = (curUser) => {
  // Get the reference to the app's shell burger button
  const menuIconElement = document.querySelector('.header__burger');
  // Display burger button for logged in users only
  menuIconElement.classList[curUser ? 'add' : 'remove']('header__burger--show');
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class BurgerBtnController extends React.Component {
  componentWillMount() {
    const { curUser } = this.props;
    // Get current user and display burger button if necessary
    showHideBurgerBtn(curUser);
  }

  componentDidUpdate(prevProps) {
    const { curUser } = this.props;
    // Listen to current user logged in state changes. Display burger button
    // accordingly
    if ('curUser' in prevProps && curUser !== prevProps.curUser) {
      showHideBurgerBtn(curUser);
    }
  }

  render() {
    return null;
  }
}

BurgerBtnController.propTypes = {
  curUser: propType(userFragment),
};

BurgerBtnController.defaultProps = {
  curUser: null,
};

export default BurgerBtnController;
