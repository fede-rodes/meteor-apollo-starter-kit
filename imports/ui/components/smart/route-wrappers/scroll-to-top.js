import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary This component will scroll the window up on every navigation.
 */
class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

ScrollToTop.propTypes = {
  location: PropTypes.object.isRequired, // eslint-disable-line
};

// withRouter provides access to location
export default withRouter(ScrollToTop);
