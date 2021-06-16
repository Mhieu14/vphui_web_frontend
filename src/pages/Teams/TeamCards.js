import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { generatePath } from 'react-router-dom';

import { A } from 'components/Text';
import { Spacing } from 'components/Layout';

import theme from 'theme';

import * as Routes from 'routes';

const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 280px;
  background-color: white;
  padding: ${(p) => p.theme.spacing.sm};
  border-radius: ${(p) => p.theme.radius.sm};
  border: 1px solid ${(p) => p.theme.colors.border.main};
  transition: border-color 0.1s;
`;

const ImageContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InitialLetters = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-transform: uppercase;
  color: ${(p) => p.theme.colors.white};
  font-size: ${(p) => p.theme.font.size.lg};
  background-color: ${(p) => p.color};
`;

const FullName = styled.span`
  max-width: 200px;
  font-weight: ${(p) => p.theme.font.weight.bold};
`;

const UserName = styled.span`
  font-size: ${(p) => p.theme.font.size.xs};
`;

/**
 * Card component for rendering team info, meant to be used in Teams page
 */
const TeamsCard = ({ team, role }) => {
  const [color, setColor] = useState('');

  

  useEffect(() => {
    const { primary, secondary, success, error } = theme.colors;
    const colors = [primary.main, secondary.main, success, error.main];
    const randomColor = Math.floor(Math.random() * colors.length);
    setColor(colors[randomColor]);
  }, []);

  
  return (
    <Root>
      

      <Spacing top="sm" bottom="xs">
        <A >
          <FullName>{team}</FullName>
        </A>
      </Spacing>
      <Spacing top="sm" bottom="xs">
        <A >
          <FullName>Vai trò: {role}</FullName>
        </A>
      </Spacing>
     

      

      <Spacing top="lg" />

      
    </Root>
  );
};

TeamsCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default TeamsCard;