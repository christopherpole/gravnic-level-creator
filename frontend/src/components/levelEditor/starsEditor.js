import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import Button from '../common/button';
import StarIcon from '../common/starIcon';

export const Wrapper = styled.div`
  border: 1px solid ${props => props.theme.foregroundColor};
  margin-bottom: ${props => props.theme.structureSpacing};
  padding: ${props => props.theme.structureSpacing};
`;

export const StarsWrapper = styled.ul`
  display: flex;
`;

export const StarIconWrapper = styled.li`
  margin-right: 0.2em;
  list-style-type: none;

  &:last-child {
    margin-right: 0;
  }
`;

export const StarsList = styled.ul``;

export const StarListItem = styled.li`
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  align-items: center;
  margin-bottom: 0.3em;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const StarsLabel = styled.span`
  font-size: 1.2em;
`;

export const ControlsWrapper = styled.div`
  display: flex;
`;

export const ControlButton = styled(Button)`
  margin-right: 0.3em;
  padding: 0;
  height: 2em;
  width: 2em;
  line-height: 2em;

  &:last-child {
    margin-right: 0;
  }
`;

export const StarsEditor = () => (
  <Wrapper id="stars-editor">
    <StarsList>
      {[...Array(3)].map((_, i) => (
        <StarListItem key={i}>
          <StarsWrapper>
            {[...Array(3)].map((meh, j) => (
              <StarIconWrapper key={j}>
                <StarIcon fillColor={i > j ? 'transparent' : 'white'} size={20} />
              </StarIconWrapper>
            ))}
          </StarsWrapper>

          <StarsLabel>99</StarsLabel>

          <ControlsWrapper>
            <ControlButton>-</ControlButton>
            <ControlButton>+</ControlButton>
          </ControlsWrapper>
        </StarListItem>
      ))}
    </StarsList>
  </Wrapper>
);

StarsEditor.defaultProps = {};

StarsEditor.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(StarsEditor);
