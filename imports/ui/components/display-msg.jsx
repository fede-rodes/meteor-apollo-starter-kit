import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'antd/lib/alert'; // for js
import 'antd/lib/alert/style/css'; // for css

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DisplayMsg = ({ type, msg }) => {
  if (msg && msg.length > 0) {
    return <Alert type={type} message={msg} className="mt1" banner />;
  }
  return null;
};

DisplayMsg.propTypes = {
  type: PropTypes.string.isRequired,
  msg: PropTypes.string,
};

DisplayMsg.defaultProps = {
  msg: '',
};

export default DisplayMsg;
