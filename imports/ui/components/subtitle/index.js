import React from 'react';
import PropTypes from 'prop-types';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Subtitle = ({ text, linkTo, linkLabel, onLinkClick }) => (
  <p className="center">
    <span dangerouslySetInnerHTML={{ __html: text }} />
    {linkTo && linkLabel && (
      <a href={`/${linkTo}`} onClick={onLinkClick}>
        {linkLabel}
      </a>
    )}
  </p>
);

Subtitle.propTypes = {
  text: PropTypes.string.isRequired,
  linkTo: PropTypes.string,
  linkLabel: PropTypes.string,
  onLinkClick: PropTypes.func,
};

Subtitle.defaultProps = {
  linkTo: '',
  linkLabel: '',
  onLinkClick: () => {},
};

export default Subtitle;
