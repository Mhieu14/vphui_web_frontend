import React, { useState, useEffect } from 'react';
import Empty from 'components/Empty';
import { sendGet } from 'utils/request';
import MatchCard from 'pages/Match/MatchCard';
import { Container } from 'components/Layout';
import styled from 'styled-components';
import { Loading } from 'components/Loading';


const Root = styled.div`
  width: 100%;
`;

const MatchList = ({ teamname }) => {
    const [matchList, setMatchList] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getMatchList();
    }, []);

    const getMatchList = () => {
        const url = "match/listMatchTeam";
        sendGet(url, { teamname }).then(rs => {
            const matchData = rs?.data?.data || [];
            console.log("matchData", matchData);
            setMatchList(matchData.reverse());
            setLoading(false);
        })
    }


    if (loading) return <Loading />;

    return (
        <Root>
            {matchList.map(item =>
                <MatchCard key={item._id} match={item} reload={getMatchList} />
            )}
            {!matchList.length
            &&
                <Empty text="Chưa có hoạt động!" />
            }
        </Root>
    );

};

export default MatchList;
