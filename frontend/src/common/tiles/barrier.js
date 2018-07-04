import React from 'react';
import PropTypes from 'prop-types';

const BarrierTile = ({ color, powered }) => (
  <svg width="100%" height="100%" viewBox="0 0 100 100" version="1.1">
    <defs />
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="aaa">
        <rect fill="#fff" fillRule="evenodd" x="0" y="0" width="100" height="100" />
        {powered && <rect fill={color} fillRule="evenodd" x="25" y="25" width="50" height="50" />}
        <rect stroke={color} strokeWidth="2" x="13.5" y="13.5" width="74" height="74" />
      </g>
    </g>
  </svg>
);

BarrierTile.defaultProps = {
  color: 'black',
};

BarrierTile.propTypes = {
  color: PropTypes.string,
  powered: PropTypes.bool.isRequired,
};

export default BarrierTile;
