import React, { Fragment } from 'react';
import { useState, useEffect } from 'react'
import styled from 'styled-components';
import Head from 'components/Head';
import { useStore } from 'store';
import { sendGet } from 'utils/request';
import MatchupItemCard from './MatchupItemCard';
import Empty from 'components/Empty';
import { Spacing } from 'components/Layout';


/**
 * Matchup suggest
 */
const MatchupAll = () => {
    const [{ auth }] = useStore();
    const [loading, setLoading] = useState(true);
    const [matchupList, setMatchupList] = useState([]);
    const [teamList, setTeamList] = useState([]);

    useEffect(() => {
        getMatchupList();
        getTeamsByUser();
    }, [])

    const getTeamsByUser = () => {
        sendGet('team/getListTeamsUser', { username: auth.user?.username }).then(rs => {
            setTeamList(rs?.data?.data || []);
        });
    }

    const getMatchupList = () => {
        const url = 'matchup/getAll';
        sendGet(url)
            .then(rs => {
                let { data } = rs.data;
                const currentUserId = auth.user.id;
                data = data.filter(item => item.userCreate !== currentUserId);
                setMatchupList(data.reverse());
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            })
    }

    const renderContent = () => {
        if (loading) return;

        return (
            <Fragment>
                <Spacing top="lg" />
                {matchupList?.length
                    ?
                    matchupList.map(item =>
                        <MatchupItemCard matchup={item} teamList={teamList} key={item._id} reload={getMatchupList} />
                    )
                    :
                    <Empty text="Chưa có Kèo" />
                }
            </Fragment>
        );
    };

    return (
        <Fragment>
            <Head title="All matchup" />
            {renderContent()}
        </Fragment>
    );
};

export default MatchupAll;
