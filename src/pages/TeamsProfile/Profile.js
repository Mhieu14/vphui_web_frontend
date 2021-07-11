import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';

import Skeleton from 'components/Skeleton';
import { Container, Spacing } from 'components/Layout';
import ProfileInfo from './ProfileInfo';
import CreatePost from 'components/CreatePost';
import ProfilePosts from './ProfilePosts';
import NotFound from 'components/NotFound';
import Head from 'components/Head';
import { sendGet } from 'utils/request';
import { useStore } from 'store';

const Root = styled.div`
  width: 100%;
  min-height: 500px;
  @media (min-width: ${(p) => p.theme.screen.lg}) {
    margin-left: ${(p) => p.theme.spacing.lg};
    padding: 0;
  }
`;

/**
 * User Profile Page
 */
const Profile = ({ match }) => {
  const [{ auth }] = useStore();
  const { teamname } = match.params;
  const [loading, setLoading] = useState(true);
  const [teamInfo, setTeamInfo] = useState(null);
  const [joined, setJoined] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    getTeamDetail();
  }, [])

  const getTeamDetail = () => {
    const url = 'team/detail';
    const params = { teamname };

    sendGet(url, params)
      .then(rs => {
        const teamData = rs?.data?.data;

        const currentUser = teamData.member.find(i => i.username === auth.user.username);
        if(currentUser){
          setJoined(true);
          if(currentUser.role === 'admin') setIsAdmin(true);
        }else{
          setJoined(false);
          setIsAdmin(false);
        }
        setTeamInfo(teamData);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      })
  }

  const renderContent = () => {

    if (loading) {
      return (
        <Container padding="xxs">
          <Skeleton height={350} />
          <Container maxWidth="sm">
            <Spacing top="lg" bottom="lg">
              <Skeleton height={82} />
            </Spacing>
          </Container>
        </Container>
      );
    }

    if (!teamInfo) return <NotFound />;

    return (
      <Container padding="xxs">
        <ProfileInfo user={auth.user} team={teamInfo} joined={joined} isAdmin={isAdmin} reloadTeamInfo={getTeamDetail} />

        {/* <Container maxWidth="sm">
          <Spacing top="lg" bottom="lg">
            {teamname === auth.user.username && <CreatePost />}
          </Spacing>

          <ProfilePosts username={username} />
        </Container> */}
      </Container>
    );
  };

  return (
    <Root>
      <Head title={teamname} />

      {renderContent()}
    </Root>
  );
};

Profile.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(Profile);
