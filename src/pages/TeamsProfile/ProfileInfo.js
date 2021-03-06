import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, generatePath } from 'react-router-dom';
import { useSubscription } from '@apollo/client';
import PostList from './PostList';
import MemberList from './MemberList';

import { IS_USER_ONLINE_SUBSCRIPTION } from 'graphql/user';

// import { H1 } from 'components/Text';
import { Spacing } from 'components/Layout';
import Follow from 'components/Follow';
import ProfileImageUpload from './ProfileImageUpload';
import ProfileCoverUpload from './ProfileCoverUpload';

import { useStore } from 'store';

import * as Routes from 'routes';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// const ProfileImage = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-top: -140px;
// `;

// const FullName = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   margin-top: ${(p) => p.theme.spacing.sm};
//   position: relative;

//   ${H1} {
//     font-size: ${(p) => p.theme.font.size.lg};
//   }

//   @media (min-width: ${(p) => p.theme.screen.md}) {
//     ${H1} {
//       font-size: ${(p) => p.theme.font.size.xl};
//     }
//   }
// `;

// const FollowAndMessage = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   margin-left: ${(p) => p.theme.spacing.sm};
// `;

// const Message = styled(Link)`
//   text-decoration: none;
//   font-size: ${(p) => p.theme.font.size.xs};
// `;

// const Online = styled.div`
//   width: 8px;
//   height: 8px;
//   background-color: ${(p) => p.theme.colors.success};
//   margin-left: ${(p) => p.theme.spacing.sm};
//   border-radius: 50%;
// `;

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
  cursor: pointer;
  &:hover{
    color: blue;
  }
  &.active{
    color: blue;
  }
  @media (min-width: ${(p) => p.theme.screen.md}) {
    padding: 0 ${(p) => p.theme.spacing.lg};
  }
`;

const Wrapper = styled.div`
  text-align: center;
  width: 100%;
  padding: 15px;
  background: #f1f1f1;
`;
const H1 = styled.div` 
  font-size: ${(p) => p.theme.font.size.xl};
  font-weight: bold;
  padding: 10px 0px;
`
const H5 = styled.div`
  font-size: ${(p) => p.theme.font.size.xs};
`
const HR = styled.div` 
  border-top: 1px solid #cccccc;
  margin: 15px 0px;
`

/**
 * Renders user information in profile page
 */
const ProfileInfo = ({ user, team, joined, isAdmin, reloadTeamInfo }) => {
  const [tab, setTab] = useState('posts');
  const changeTab = (tabId) => {
    if (tabId !== tab) setTab(tabId);
  }

  const renderTab = () => {
    switch (tab) {
      case 'members': return (
        <MemberList user={user}
          teamname={team.teamname}
          memberList={team.member}
          reloadTeamInfo={reloadTeamInfo}
          isAdmin={isAdmin}
        />
      )
      default: return (
        <PostList
          user={user}
          team={team}
          isAdmin={isAdmin}
        />
      )
    }
  }

  return (
    <Root>
      <ProfileCoverUpload userId={user.id} coverImage={user.coverImage} coverImagePublicId={user.coverImagePublicId} />
      <Wrapper>
        <H1>{team.fullname}</H1>
        <H5><b>@{team.teamname}</b> ?? {team.member.length} th??nh vi??n</H5>
        <HR />
        {joined
          ?
          <Info>
            <List className={tab === 'posts' ? 'active' : ''} onClick={changeTab.bind(this, 'posts')}>
              <b>L???ch s??? thi ?????u</b>
            </List>
            <List className={tab === 'members' ? 'active' : ''} onClick={changeTab.bind(this, 'members')}>
              <b>Th??nh vi??n</b>
            </List>
          </Info>
          :
          null
        }
      </Wrapper>
      <br />

      {joined && renderTab()}
    </Root>
  );
};

ProfileInfo.propTypes = {
  user: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
};

export default ProfileInfo;
