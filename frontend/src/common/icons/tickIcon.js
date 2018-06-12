import React from 'react';
import PropTypes from 'prop-types';

const TickIcon = ({ fillColor, size }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24">
    <path
      d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
      fill={fillColor}
    />
  </svg>
);

TickIcon.defaultProps = {
  fillColor: 'green',
  size: 15,
};

TickIcon.propTypes = {
  fillColor: PropTypes.string,
  size: PropTypes.number,
};

export default TickIcon;
