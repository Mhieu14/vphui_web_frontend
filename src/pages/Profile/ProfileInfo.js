import { useSubscription } from '@apollo/client';
import Follow from 'components/Follow';
import { Spacing } from 'components/Layout';
import { H1 } from 'components/Text';
import { IS_USER_ONLINE_SUBSCRIPTION } from 'graphql/user';
import PropTypes from 'prop-types';
import React from 'react';
import { generatePath, Link } from 'react-router-dom';
import * as Routes from 'routes';
import { useStore } from 'store';
import styled from 'styled-components';
import ProfileCoverUpload from './ProfileCoverUpload';
import ProfileImageUpload from './ProfileImageUpload';





const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -140px;
`;

const FullName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: ${(p) => p.theme.spacing.sm};
  position: relative;

  ${H1} {
    font-size: ${(p) => p.theme.font.size.lg};
  }

  @media (min-width: ${(p) => p.theme.screen.md}) {
    ${H1} {
      font-size: ${(p) => p.theme.font.size.xl};
    }
  }
`;

const FollowAndMessage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: ${(p) => p.theme.spacing.sm};
`;

const Message = styled(Link)`
  text-decoration: none;
  font-size: ${(p) => p.theme.font.size.xs};
`;

const Online = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${(p) => p.theme.colors.success};
  margin-left: ${(p) => p.theme.spacing.sm};
  border-radius: 50%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: ${(p) => p.theme.font.size.xs};
  margin-top: ${(p) => p.theme.spacing.sm};
`;

const List = styled.div`
  padding: 0 ${(p) => p.theme.spacing.xs};
  color: ${(p) => p.theme.colors.grey[800]};
  white-space: nowrap;

  @media (min-width: ${(p) => p.theme.screen.md}) {
    padding: 0 ${(p) => p.theme.spacing.lg};
  }
`;
const Nav = styled.div`
  cursor: pointer;
  &.active{
    color: ${(p) => p.theme.colors.primary.main};
    pointer-events: none;
  }
  &:hover{
    color: ${(p) => p.theme.colors.primary.main};
  }
`
/**
 * Renders user information in profile page
 */
const ProfileInfo = ({ user, teams, nav, changeNav = () => { } }) => {
  const [{ auth }] = useStore();

  const { data, loading } = useSubscription(IS_USER_ONLINE_SUBSCRIPTION, {
    variables: { authUserId: auth.user.id, userId: user.id },
  });

  const selectNav = (type) => {
    changeNav(type);
  }

  let isUserOnline = user.isOnline;
  if (!loading && data) {
    isUserOnline = data.isUserOnline.isOnline;
  }

  return (
    <Root>
      <ProfileCoverUpload userId={user.id} coverImage={user.coverImage} coverImagePublicId={user.coverImagePublicId} />

      <ProfileImage>
        <ProfileImageUpload
          userId={user.id}
          image={user.image}
          imagePublicId={user.imagePublicId}
          username={user.username}
        />

        <FullName>
          <H1>{user.fullName}</H1>

          {isUserOnline && auth.user.id !== user.id && <Online />}

          {auth.user.id !== user.id && (
            <FollowAndMessage>
              <Follow user={user} />

              <Spacing left="sm" />
              <Message to={generatePath(Routes.MESSAGES, { userId: user.id })}>Nhắn tin</Message>
            </FollowAndMessage>
          )}
        </FullName>
      </ProfileImage>

      <Info>
        <List>
          <Nav onClick={selectNav.bind(this, 'actions')} className={nav === 'actions' && 'active'}>
            <b>{user.posts.length} </b> hoạt động
          </Nav>
        </List>
        <List>
          <Nav onClick={selectNav.bind(this, 'teams')} className={nav === 'teams' && 'active'}>
            <b>{teams.length} </b> đội bóng
          </Nav>
        </List>
        <List>
          <b>{user.followers.length} </b> người theo dõi
        </List>
        <List>
          <b>{user.following.length} </b> đang theo dõi
        </List>
      </Info>
    </Root>
  );
};

ProfileInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProfileInfo;
