import React, { useEffect, useState } from 'react';
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
import { GET_USER } from 'graphql/user';
import TeamsCard from 'pages/Teams/TeamCards';
import { useStore } from 'store';

const Root = styled.div`
  width: 100%;

  @media (min-width: ${(p) => p.theme.screen.lg}) {
    margin-left: ${(p) => p.theme.spacing.lg};
    padding: 0;
  }
`;

const TeamsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 3fr));
  grid-auto-rows: auto;
  grid-gap: 20px;
  margin-bottom: ${(p) => p.theme.spacing.lg};
`;

/**
 * User Profile Page
 */
const Profile = ({ match }) => {
  const [{ auth }] = useStore();
  const { username } = match.params;
  const [teams, setTeams] = useState([]);
  const [nav, setNav] = useState('actions');

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { username },
  });
  useEffect(() => {
    getTeams()
  }, [])

  const getTeams = () => {
    const url = 'team/getListTeamsUser';
    const { username } = auth?.user || {};

    sendGet(url, { username }).then(rs => {
      setTeams(rs?.data?.data || []);
    })
  }

  const changeNav = (type) => {
    setNav(type);
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

    if (error || !data.getUser) return <NotFound />;

    return (
      <Container padding="xxs">
        <ProfileInfo user={data.getUser} teams={teams} nav={nav} changeNav={changeNav} />

        {nav === 'actions'
          ?
          <Container maxWidth="sm">
            <Spacing top="lg" bottom="lg">
              {username === auth.user.username && <CreatePost />}
            </Spacing>

            <ProfilePosts username={username} />
          </Container>
          :
          <Container maxWidth="sm">
            <Spacing top="xl" />
            <TeamsContainer>
              {teams.map((team) => (
                <TeamsCard key={team.id} team={team.fullname} teamname={team.teamname} role={team.role} />
              ))}
            </TeamsContainer>
          </Container>
        }
      </Container >
    );
  };

  return (
    <Root>
      <Head title={username} />

      {renderContent()}
    </Root>
  );
};

Profile.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(Profile);
