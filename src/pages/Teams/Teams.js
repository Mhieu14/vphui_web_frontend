import React, { Fragment } from 'react';
import { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Container, Spacing } from 'components/Layout';
import Modal from 'components/Modal';
import Head from 'components/Head';
import TeamsCard from './TeamCards';
import { sendGet, sendPost } from 'utils/request';
import { useStore } from 'store';
import TeamCreate from './TeamCreate';
import { PencilIcon } from 'components/icons';

const Root = styled(Container)`
  margin-top: ${(p) => p.theme.spacing.lg};
  min-height: 500px;
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

const TeamCardCreate = styled.div`
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
  cursor: pointer;
`;

const WrapperIcon = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(p) => p.theme.colors.grey[200]};
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Text = styled.span`
  transition: color 0.1s;
  display: inline-block;
  color: ${(p) => (p.color ? p.theme.colors[p.color] : p.theme.colors.text.secondary)};
  font-weight: ${(p) => (p.weight ? p.theme.font.weight[p.weight] : p.theme.font.weight.normal)};
  font-size: ${(p) => (p.size ? p.theme.font.size[p.size] : p.theme.font.size.xs)};
  max-width: 200px;
  font-weight: ${(p) => p.theme.font.weight.bold};
`
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
    sendPost(url, null, data)
      .then(rs => {
        getTeams();
      })
      .catch(err => {
        if(err?.response?.data?.error === "conflict"){
          alert("Teamname bị trùng!")
        }
      })

    setIsOpen(false);
  }

  const renderContent = () => {
    return (
      <Fragment>
        <TeamsContainer>

          <TeamCardCreate onClick={toggleModal}>
            <WrapperIcon>
              <PencilIcon width={50} />
            </WrapperIcon>
            <Spacing top="sm" bottom="xs">
              <Text>Tạo đội bóng</Text>
            </Spacing>
          </TeamCardCreate>

          {teams.map((team) => (
            <TeamsCard key={team.id} team={team.fullname} teamname={team.teamname} role={team.role} user={auth.user} />
          ))}

        </TeamsContainer>
        <Modal open={isOpen} onClose={toggleModal}>
          <TeamCreate onSubmit={handleCreate} onCancel={toggleModal} />
        </Modal>
      </Fragment>
    );
  };

  return (
    <Root maxWidth="md">
      <Head title="Find new Team" />
      {renderContent()}
    </Root>
  );
};

export default Teams;
