import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { generatePath } from 'react-router-dom';

import { A } from 'components/Text';
import { Spacing } from 'components/Layout';
import Follow from 'components/Follow';
import theme from 'theme';
import { useStore } from 'store';
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

const ButtonMarkAdmin = styled.button`
  height: 27px;
  cursor: pointer;
  outline: none;
  font-size: ${(p) => p.theme.font.size.xxs};
  font-weight: ${(p) => p.theme.font.weight.bold};
  transition: background-color 0.2s, border-color 0.1s;
  border-radius: ${(p) => p.theme.radius.sm};
  color: ${(p) => !p.isFollowing && p.theme.colors.white};
  padding: ${(p) => p.theme.spacing.xxs} ${(p) => p.theme.spacing.xs};
  border: ${(p) => (p.isFollowing ? `1px solid ${p.theme.colors.border.main}` : '0')};
  background-color: ${(p) => p.theme.colors.primary.main};
  width: 100%;

  &:hover {
    border-color: ${(p) => p.theme.colors.border.dark};
  }
`;

const ButtonRemove = styled.button`
  height: 27px;
  cursor: pointer;
  outline: none;
  font-size: ${(p) => p.theme.font.size.xxs};
  font-weight: ${(p) => p.theme.font.weight.bold};
  transition: background-color 0.2s, border-color 0.1s;
  border-radius: ${(p) => p.theme.radius.sm};
  color: ${(p) => !p.isFollowing && p.theme.colors.white};
  padding: ${(p) => p.theme.spacing.xxs} ${(p) => p.theme.spacing.xs};
  border: ${(p) => (p.isFollowing ? `1px solid ${p.theme.colors.border.main}` : '0')};
  background-color:  ${(p) => p.theme.colors.error.main};
  width: 100%;
  &:hover {
    border-color: ${(p) => p.theme.colors.border.dark};
  }
`;

/**
 * Card component for rendering user info, meant to be used in Peoples page
 */
const MemberCard = ({ user, isAdmin, removeUser, markAdmin }) => {
  const [{ auth }] = useStore();
  const [color, setColor] = useState('');

  const { fullname, username, image, role } = user;

  useEffect(() => {
    const { primary, secondary, success, error } = theme.colors;
    const colors = [primary.main, secondary.main, success, error.main];
    const randomColor = Math.floor(Math.random() * colors.length);
    setColor(colors[randomColor]);
  }, []);

  const splitFullName = () => {
    // If a fullname contains more word than two, take first two word
    const splitWords = fullname.split(' ').slice(0, 2).join(' ');

    // Take only first letters from split words
    const firstLetters = splitWords
      .split(' ')
      .map((a) => a.charAt(0))
      .join(' ');

    return firstLetters;
  };

  const handleMarkAdmin = () => {
    markAdmin(user);
  }

  const handleRemove = () => {
    removeUser(user);
  }

  return (
    <Root>
      <A to={generatePath(Routes.USER_PROFILE, { username })}>
        <ImageContainer>
          {image
            ?
            <Image src={image} />
            :
            <RenderInitialLetters text={fullname} />
          }
        </ImageContainer>
      </A>

      <Spacing top="sm" bottom="xs">
        <A to={generatePath(Routes.USER_PROFILE, { username })}>
          <FullName>{fullname}</FullName>
        </A>
      </Spacing>
      <UserName>@{username} - {user.role}</UserName>

      <Spacing top="md" />
      {isAdmin
        ?
        <>
          {role !== 'admin'
            &&
            <ButtonMarkAdmin onClick={handleMarkAdmin}>Thêm làm Admin</ButtonMarkAdmin>
          }
          <Spacing top="xs" />
          {auth.user.username !== username
            &&
            <ButtonRemove onClick={handleRemove}>Xóa thành viên</ButtonRemove>
          }
        </>
        :
        null
      }

      {auth.user.username === username
        &&
        <ButtonRemove onClick={handleRemove}>Rời khỏi đội</ButtonRemove>
      }
    </Root>
  );
};

const RenderInitialLetters = ({ text = " " }) => {
  const idColor = text.length % 7;
  const color = COLOR_MAPPING[idColor];

  // If a fullName contains more word than two, take first two word
  const splitWords = text.split(' ').slice(0, 2).join(' ');
  // Take only first letters from split words
  const firstLetters = splitWords
    .split(' ')
    .map((a) => a.charAt(0))
    .join(' ');

  return (
    <ImageContainer>
      {<InitialLetters color={color}>{firstLetters}</InitialLetters>}
    </ImageContainer>
  )
}

const COLOR_MAPPING = {
  0: 'red',
  1: 'orange',
  2: 'pink',
  3: 'green',
  4: 'blue',
  5: 'indigo',
  6: 'violet'
}

export default MemberCard;
