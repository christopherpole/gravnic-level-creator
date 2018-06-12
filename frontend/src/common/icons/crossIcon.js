import React from 'react';
import PropTypes from 'prop-types';

const CrossIcon = ({ fillColor, size }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24">
    <path
      d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
      fill={fillColor}
    />
  </svg>
);

CrossIcon.defaultProps = {
  fillColor: 'red',
  size: 15,
};

CrossIcon.propTypes = {
  fillColor: PropTypes.string,
  size: PropTypes.number,
};

export default CrossIcon;
