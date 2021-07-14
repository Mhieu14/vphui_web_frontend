import React, { Fragment } from 'react';
import { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Container, Spacing, Content } from 'components/Layout';
import Modal from 'components/Modal';
import Head from 'components/Head';
import { sendGet, sendPost } from 'utils/request';
import { useStore } from 'store';
import MatchCard from './MatchCard';
import Empty from 'components/Empty';
import { Loading } from 'components/Loading';


const Root = styled(Container)`
  margin-top: ${(p) => p.theme.spacing.lg};
  min-height: 500px;
  @media (min-width: ${(p) => p.theme.screen.lg}) {
    margin-left: ${(p) => p.theme.spacing.lg};
    padding: 0;
  }
`;

/**
 * Match
 */
const Match = () => {
  const [{ auth }] = useStore();
  const [matchList, setMatchList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMatchList();
  }, []);

  const getMatchList = () => {
    const url = "match/listMatchUser";
    const param = {
      username: auth.user.username,
    }
    sendGet(url, param).then(rs => {
      const matchData = rs?.data?.data || [];
      setMatchList(matchData.reverse());
      setLoading(false);
    })
  }


  const renderContent = () => {
    if (loading) return <Loading />;

    if (!matchList.length) return <Empty text="Không có lịch sử thi đấu" />

    return (
      <Fragment>
        {matchList.map(item =>
          <MatchCard key={item._id} match={item} reload={getMatchList} />
        )}
      </Fragment>
    );
  };

  return (
    <Root maxWidth="md">
      <Head title="Match" />
      {renderContent()}
    </Root>
  );
};

export default Match;
