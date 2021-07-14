import React, { Fragment, useState, useEffect } from 'react';
import Empty from 'components/Empty';
import { Content } from 'components/Layout';
import { sendGet } from 'utils/request';
import MatchupItemCard from 'pages/Matchup/MatchupItemCard';
import { Loading } from 'components/Loading';


const MatchupList = ({ teamname, user }) => {
    const [matchupList, setMatchupList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [teamList, setTeamList] = useState([]);

    useEffect(() => {
        getMatchupList();
        sendGet('team/getListTeamsUser', { username: user?.username })
        .then(rs => {
            console.log("team list", rs.data.data)
            setTeamList(rs?.data?.data || []);
        });

    }, [])

    const getMatchupList = () => {
        sendGet('matchup/getListMatchupTeam', { teamname }).then(rs => {
            setMatchupList(rs?.data?.data || []);
            setLoading(false);
        });
    }

    if (loading) return <Loading />;

    return (
        <Content>
            {matchupList?.length
                ?
                matchupList.map(item =>
                    <MatchupItemCard key={item._id} teamList={teamList} matchup={item} reload={getMatchupList} />
                )
                :
                <Empty text="Chưa có Kèo" />
            }
        </Content>
    );

};

export default MatchupList;
