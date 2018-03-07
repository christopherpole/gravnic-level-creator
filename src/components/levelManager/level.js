import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectLevel } from '../../actions/levelManager';

export const Wrapper = styled.li`
  border: 2px solid white;
  cursor: pointer;
  list-style-type: none;
  margin-bottom: ${props => props.theme.structureSpacing};
  padding: ${props => props.theme.structureSpacing};

  &:last-child {
    margin-bottom: 0;
  }

  ${props =>
    props.isSelected &&
    css`
      border-color: yellow;
    `};
`;

export const Level = ({ id, name, isSelected, selectLevelAction }) => (
  <Wrapper
    onClick={() => {
      selectLevelAction(id);
    }}
    isSelected={isSelected}
  >
    <p>{name}</p>
  </Wrapper>
);

Level.defaultProps = {
  isSelected: false,
};

Level.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  selectLevelAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  selectLevelAction: bindActionCreators(selectLevel, dispatch),
});

export default connect(null, mapDispatchToProps)(Level);
