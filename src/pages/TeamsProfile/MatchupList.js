import React, { Fragment, useState, useEffect } from 'react';
import Empty from 'components/Empty';
import { Content } from 'components/Layout';
import { sendGet } from 'utils/request';
import MatchupItemCard from 'pages/Matchup/MatchupItemCard';
import { Loading } from 'components/Loading';


const MatchupList = ({ teamname }) => {
    const [matchupList, setMatchupList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMatchupList();
    }, [])

    const getMatchupList = () => {
        sendGet('matchup/getListMatchupTeam', { teamname }).then(rs => {
            console.log("teamname", rs.data.data)
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
                    <MatchupItemCard matchup={item} key={item._id} reload={getMatchupList} />
                )
                :
                <Empty text="Chưa có Kèo" />
            }
        </Content>
    );

};

export default MatchupList;
