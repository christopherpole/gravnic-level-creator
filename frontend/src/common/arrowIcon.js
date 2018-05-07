import React from 'react';
import PropTypes from 'prop-types';
import { MOVE_UP, MOVE_RIGHT, MOVE_DOWN, MOVE_LEFT } from 'gravnic-game';

const ArrowIcon = ({ fillColor, size, direction }) => {
  let rotation;

  switch (direction) {
    case MOVE_LEFT:
      rotation = 90;
      break;
    case MOVE_UP:
      rotation = 180;
      break;
    case MOVE_RIGHT:
      rotation = 270;
      break;
    default:
      rotation = 0;
  }

  return (
    <svg
      x="0px"
      y="0px"
      width={size}
      viewBox="0 0 512.171 512.171"
      enableBackground="new 0 0 512.171 512.171"
      xmlSpace="preserve"
    >
      <g>
        <g>
          <path
            d="M479.046,283.925c-1.664-3.989-5.547-6.592-9.856-6.592H352.305V10.667C352.305,4.779,347.526,0,341.638,0H170.971
        c-5.888,0-10.667,4.779-10.667,10.667v266.667H42.971c-4.309,0-8.192,2.603-9.856,6.571c-1.643,3.989-0.747,8.576,2.304,11.627
        l212.8,213.504c2.005,2.005,4.715,3.136,7.552,3.136s5.547-1.131,7.552-3.115l213.419-213.504
        C479.793,292.501,480.71,287.915,479.046,283.925z"
            fill={fillColor}
            transform={`rotate(${rotation})`}
            transform-origin="50% 50%"
          />
        </g>
      </g>
    </svg>
  );
};

ArrowIcon.defaultProps = {
  fillColor: 'white',
  size: '100%',
};

ArrowIcon.propTypes = {
  fillColor: PropTypes.string,
  size: PropTypes.string,
  direction: PropTypes.oneOf([MOVE_UP, MOVE_RIGHT, MOVE_DOWN, MOVE_LEFT]).isRequired,
};

export default ArrowIcon;
