import React, { Fragment } from 'react';
import { useState, useEffect } from 'react'
import styled from 'styled-components';
import Head from 'components/Head';
import { useStore } from 'store';
import { sendGet } from 'utils/request';
import MatchupItemCard from './MatchupItemCard';
import Empty from 'components/Empty';
import { Spacing } from 'components/Layout';

const MatchupAttention = () => {
    const [{ auth }] = useStore();
    const [loading, setLoading] = useState(true);
    const [teamList, setTeamList] = useState([]);
    const [matchupList, setMatchupList] = useState([]);

    useEffect(() => {
        // getMatchupList();
        // getTeamsByUser();
        const p1 = new Promise((resolve, reject) => {
            sendGet('team/getListTeamsUser', { username: auth.user?.username }).then(rs => resolve(rs?.data?.data));
        });
        const p2 = new Promise((resolve, reject) => {
            sendGet('matchup/getAll').then(rs => resolve(rs?.data?.data));
        })

        Promise.all([p1, p2]).then(([teams, matchups]) => {
            const currentUserId = auth.user.id;
            const teamIds = teams.map(item => item.id);
            console.log("rs promise", { teams, matchups, teamIds })


            let matchupData = matchups.filter(item => {
                if(item.userCreate === currentUserId) return false;
                if(teamIds.includes(item.teamCreate._id)) return true;
                console.log( item.attentions.some(id => teamIds.includes(id)))
                return true;
            });
            
            setTeamList(teams);
            setMatchupList(matchupData);
            setLoading(false);
        })
    }, [])

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
                        <MatchupItemCard matchup={item} key={item._id} teamList={teamList} reload={getMatchupList} />
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

export default MatchupAttention;
