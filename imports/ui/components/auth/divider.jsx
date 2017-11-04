import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Text = styled.span`
  color: tomato;
`;

const Divider = ({ text }) => (
  <div className="full-width center p2">
    <Text>- {text} -</Text>
  </div>
);

Divider.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Divider;
