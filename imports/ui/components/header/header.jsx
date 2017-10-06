import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { debounce } from 'lodash';
// import { createContainer } from 'meteor/react-meteor-data';
/* import Form from 'antd/lib/form'; // for js
import 'antd/lib/form/style/css'; // for css
import Icon from 'antd/lib/icon'; // for js
import 'antd/lib/icon/style/css'; // for css */
// import Constants from '../../../api/constants';
// import AuxFunctions from '../../../api/aux-functions';
// import Actions from '../../../api/redux/client/actions';
// import InputControlled from '../forms/input-controlled';
// import style from './style.scss';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
/* const debounced = debounce(() => {
  // Zoom out view port to default values & hide keyboard on mobile
  AuxFunctions.zoomOutMobile();
  AuxFunctions.hideVirtualKeyboard();
}, 1000); */
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class Header extends Component {
  // See ES6 Classes section at: https://facebook.github.io/react/docs/reusable-components.html
  constructor(props) {
    super(props);
    // this.handleGoIndexLinkClick = this.handleGoIndexLinkClick.bind(this);
    // this.handleInputChange = this.handleInputChange.bind(this);
  }

  /*handleGoIndexLinkClick(evt) {
    evt.preventDefault();
    const { reduxActions, history } = this.props;

    reduxActions.dispatchUpdateTextField('itemType', 'piece');
    reduxActions.dispatchUpdateTextField('searchText', 'jeans'); // should be ''
    reduxActions.dispatchSetNumericField('pageNumber', 1);
    history.push('/jeans'); // should be '/'
  }

  handleInputChange({ fieldName, value }) { // { fieldName: 'searchText', value: 'someTag' }
    // This method is triggered when the user enters some text in the search box
    const { reduxState, reduxActions } = this.props;
    const { errors } = reduxState;

    // TODO set params q=value (replace space with dash)
    reduxActions.dispatchUpdateTextField(fieldName, value);
    reduxActions.dispatchSetNumericField('pageNumber', 1);

    // Reset flipped card state
    reduxActions.dispatchUpdateTextField('flippedCardId', '');

    // Scroll to the top of the page
    window.scrollTo(0, 0); // eslint-disable-line

    // Zoom out view port to default values & hide keyboard on mobile after the
    // users finishes typing
    // debounced();

    // Clear errors if any
    if (errors[fieldName].length > 0) {
      reduxActions.dispatchClearErrors(fieldName);
    }
  } */

  render() {
    // const { reduxState, meteorData } = this.props;
    // const { searchText } = reduxState;
    // const { curRoute } = meteorData;

    return (
      <header className="style.Header">
        header
      </header>
    );
  }
}

/* Header.propTypes = {
  reduxState: PropTypes.shape({
    // itemType: PropTypes.oneOf(Constants.ITEM_TYPES).isRequired,
    searchText: PropTypes.string.isRequired,
    errors: PropTypes.shape({
      searchText: PropTypes.array.isRequired,
    }).isRequired,
  }).isRequired,
  reduxActions: PropTypes.object.isRequired,
  meteorData: PropTypes.shape({
    curRoute: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.object.isRequired,
}; */
//------------------------------------------------------------------------------
// REDUX INTEGRATION:
//------------------------------------------------------------------------------
/**
* @summary Wrapper around the 'Page' component to handle Domain State Meteor
* reactivity (component-level subscriptions etc etc), and pass data down to
* 'Page' component.
*/
/* const namespace = 'search';

function mapStateToProps(state) {
  return {
    reduxState: state[namespace],
  };
}

function mapDispatchToProps(dispatch) {
  // Bind actions to current Page (namespace).
  const reduxActions = {
    dispatchUpdateTextField(fieldName, value) {
      return dispatch(Actions.updateTextField(namespace, fieldName, value));
    },
    dispatchSetBooleanField(fieldName, value) {
      return dispatch(Actions.setBooleanField(namespace, fieldName, value));
    },
    dispatchSetNumericField(fieldName, value) {
      return dispatch(
        Actions.setNumericField(namespace, fieldName, value)
      );
    },
    dispatchIncrementNumericField(fieldName, value) {
      return dispatch(
        Actions.incrementNumericField(namespace, fieldName, value)
      );
    },
    dispatchSetErrors(errorsObj) {
      return dispatch(Actions.setErrors(namespace, errorsObj));
    },
    dispatchClearErrors(fieldName) {
      return dispatch(Actions.clearErrors(namespace, fieldName));
    },
    dispatchSetInitialState() {
      return dispatch(Actions.setInitialState(namespace));
    },
  };

  return { reduxActions };
}

// Enhancer function
const withRedux = connect(mapStateToProps, mapDispatchToProps); */
//------------------------------------------------------------------------------
// PAGE CONTAINER DEFINITION:
//------------------------------------------------------------------------------
/**
* @summary Wrapper around the 'Page' component to handle Domain State Meteor
* reactivity (component-level subscriptions etc etc), and pass data down to
* 'Page' component.
*/
/* const HeaderContainer = createContainer(({ history }) => {
  const curRoute = history.location.pathname;

  return {
    meteorData: {
      curRoute,
    },
    history,
  };
}, Header);
//------------------------------------------------------------------------------
export default withRouter(withRedux(HeaderContainer)); */

export default Header;
