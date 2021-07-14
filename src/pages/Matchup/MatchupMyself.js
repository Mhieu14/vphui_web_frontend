import React, { Fragment } from 'react';
import { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Container } from 'components/Layout';
import Head from 'components/Head';
import { A } from 'components/Text';
import * as Routes from 'routes';
import { useStore } from 'store';
import { PencilIcon, PinMapIcon } from 'components/icons';
import MatchupCreate from './MatchupCreate';
import Modal from 'components/Modal';
import { sendGet } from 'utils/request';
import MatchupItemCard from './MatchupItemCard';
import Empty from 'components/Empty';

const Root = styled(Container)`
    margin-top: ${(p) => p.theme.spacing.lg};
    min-height: 500px;
    @media (min-width: ${(p) => p.theme.screen.lg}) {
      margin-left: ${(p) => p.theme.spacing.lg};
      padding: 0;
    }
`;

const WrapperIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${(p) => p.theme.colors.grey[200]};
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Flex = styled.div`
  display: flex;
  cursor: pointer;
  max-width: 200px;
  margin: 15px 0px;
`
const AlignSelf = styled.div`
  align-self: center;
  margin-left: 10px;
`

const List = styled.div`
  display: flex;
  overflow: hidden;
  border-radius: ${(p) => p.theme.radius.sm};
  border: 1px solid ${(p) => p.theme.colors.border.main};
`;

const Item = styled.div`
  // display: flex;
  // flex-direction: row;
  // justify-content: space-between;
  // align-items: center;
  padding: ${(p) => p.theme.spacing.xs};
  border-bottom: 1px solid ${(p) => p.theme.colors.border.main};
  font-size: ${(p) => p.theme.font.size.xxs};
  background-color: ${(p) => p.theme.colors.white};

  &:last-child {
    border-bottom: 0;
  }
`;

const UL = styled.ul`
  padding: 0px 20px;
  margin: 10px 0px;
`

/**
 * Matchup myself
 */
const MatchupMyself = () => {
  const [{ auth }] = useStore();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [matchupList, setMatchupList] = useState([]);
  const [teamList, setTeamList] = useState([]);

  useEffect(() => {
    getMatchupList();

    sendGet('team/getListTeamsUser', { username: auth.user?.username })
      .then(rs => {
        setTeamList(rs?.data?.data || [])
      });

  }, [])

  const getMatchupList = () => {
    const url = 'matchup/getAll';
    sendGet(url)
      .then(rs => {
        let { data } = rs.data;
        const currentUserId = auth.user.id;
        data = data.filter(item => item.userCreate === currentUserId || item.is_my_team_admin_matchup);
        setMatchupList(data.reverse());
        setIsOpen(false);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      })
  }

  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  const renderContent = () => {
    return (
      <Fragment>
        <Flex onClick={toggleModal}>
          <WrapperIcon>
            <PencilIcon />
          </WrapperIcon>
          <AlignSelf>Lập kèo</AlignSelf>
        </Flex>

        {!loading
          &&
          <Fragment>
            {matchupList?.length
              ?
              matchupList.map(item =>
                <MatchupItemCard matchup={item} key={item._id} reload={getMatchupList} />
              )
              :
              <Empty text="Chưa có Kèo" />
            }
          </Fragment>
        }

        <Modal open={isOpen} onClose={toggleModal}>
          <MatchupCreate teamList={teamList} onReload={getMatchupList} onCancel={toggleModal} />
        </Modal>

      </Fragment>
    );
  };

  return (
    <Fragment>
      <Head title="My Matchup" />
      {renderContent()}
    </Fragment>
  );
};

export default MatchupMyself;
