import React, { Fragment } from 'react';
import { useState, useEffect } from 'react'
import styled from 'styled-components';
import axios from 'axios'
import { Container, } from 'components/Layout';
import { useQuery } from '@apollo/client';
import Empty from 'components/Empty';
import InfiniteScroll from 'components/InfiniteScroll';
import Modal from 'components/Modal';
import Head from 'components/Head';
import TeamsCard from './TeamCards';
import { GET_AUTH_USER } from 'graphql/user';
import { sendGet, sendPost } from 'utils/request';
import { useStore } from 'store';
import TeamCreate from './TeamCreate';

const Root = styled(Container)`
  margin-top: ${(p) => p.theme.spacing.lg};

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

const Button = styled.button`
  height: 27px;
  cursor: pointer;
  outline: none;
  font-size: ${(p) => p.theme.font.size.xxs};
  font-weight: ${(p) => p.theme.font.weight.bold};
  transition: background-color 0.2s, border-color 0.1s;
  border-radius: ${(p) => p.theme.radius.sm};
  color: ${(p) => p.theme.colors.white};
  padding: ${(p) => p.theme.spacing.xxs} ${(p) => p.theme.spacing.xs};
  border: 0;
  background-color: ${(p) => p.theme.colors.primary.main};
  margin-bottom: 15px;
  &:hover {
    border-color: ${(p) => p.theme.colors.border.dark};
  }
`;


export const Wrapper = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  min-height: 500px;
`;

/**
 * Teams
 */
const Teams = () => {
  const [{ auth }] = useStore();
  const [teams, setTeams] = useState([])
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  const handleCreate = (params) => {
    const url = 'team/create';
    const data = {
      ...params,
      elo: 1000
    }
    sendPost(url, null, data).then(rs => {
      getTeams();
    })

    setIsOpen(false);
  }

  const renderContent = () => {
    if (!teams.length > 0) return <Empty text="No Team yet." />

    return (
      <>
        <Button onClick={toggleModal}>Tạo đội bóng</Button>

        <TeamsContainer>
          {teams.map((team) => (
            <TeamsCard key={team.id} team={team.fullname} teamname={team.teamname} role={team.role} user={auth.user} />
          ))}
        </TeamsContainer>

        <Modal open={isOpen} onClose={toggleModal}>
          <TeamCreate onSubmit={handleCreate} onCancel={toggleModal} />
        </Modal>
      </>
    );
  };

  return (
    <Wrapper>
      <Root maxWidth="md">
        <Head title="Find new People" />
        {renderContent()}
      </Root>
    </Wrapper>
  );
};

export default Teams;
